import { existsSync, mkdirSync, readdirSync, readFileSync, statSync, writeFileSync } from 'node:fs';
import { extname, join, relative, resolve, sep } from 'node:path';
import puppeteer from 'puppeteer-core';

const root = resolve('dist');
const baseUrl = process.env.AUDIT_BASE_URL || 'http://127.0.0.1:4321';
const chromePath = process.env.CHROME_PATH;
const reportDir = resolve(process.env.AUDIT_REPORT_DIR || 'qa-v8');
const screenshotDir = resolve(process.env.AUDIT_SCREENSHOT_DIR || '/tmp/tepatlaser-browser-audit');

if (!chromePath || !existsSync(chromePath)) {
  throw new Error('Set CHROME_PATH to a Chrome or Chromium executable before running the browser audit.');
}

mkdirSync(reportDir, { recursive: true });
mkdirSync(screenshotDir, { recursive: true });

const htmlFiles = [];
const walk = (dir) => {
  for (const name of readdirSync(dir)) {
    const file = join(dir, name);
    if (statSync(file).isDirectory()) walk(file);
    else if (extname(file) === '.html') htmlFiles.push(file);
  }
};
walk(root);

const pages = htmlFiles
  .filter((file) => !/http-equiv=["']refresh["']/i.test(readFileSync(file, 'utf8')))
  .map((file) => {
    const path = '/' + relative(root, file).split(sep).join('/').replace(/index\.html$/, '').replace(/\.html$/, '');
    return path === '/404' ? '/404.html' : path;
  })
  .sort();

const profiles = [
  { name: 'desktop', width: 1440, height: 900, deviceScaleFactor: 1 },
  { name: 'mobile', width: 390, height: 844, deviceScaleFactor: 1 }
];

const sampleRoutes = new Set([
  '/',
  '/jasa-laser-fiber/',
  '/pagar-laser-cutting/',
  '/portfolio/',
  '/contact/',
  '/blog/',
  '/blog/panduan-file-desain-laser-cutting-akurat/',
  '/lokasi/jakarta/'
]);

const browser = await puppeteer.launch({
  executablePath: chromePath,
  headless: true,
  args: ['--no-sandbox', '--disable-dev-shm-usage', '--disable-gpu', '--font-render-hinting=none']
});

const results = [];

try {
  for (const profile of profiles) {
    const page = await browser.newPage();
    await page.setViewport(profile);
    page.setDefaultNavigationTimeout(20_000);

    const consoleErrors = [];
    page.on('console', (message) => {
      if (message.type() === 'error') consoleErrors.push(message.text());
    });
    page.on('pageerror', (error) => consoleErrors.push(error.message));

    for (const route of pages) {
      consoleErrors.length = 0;
      const response = await page.goto(`${baseUrl}${route}`, { waitUntil: 'domcontentloaded' });
      await new Promise((resolvePromise) => setTimeout(resolvePromise, 80));

      const audit = await page.evaluate(() => {
        const images = [...document.images];
        const main = document.querySelector('main');
        const interactive = [...document.querySelectorAll('a[href],button,input,select,textarea,summary')]
          .filter((element) => {
            const style = getComputedStyle(element);
            const rect = element.getBoundingClientRect();
            return style.display !== 'none' && style.visibility !== 'hidden' && rect.width > 0 && rect.height > 0;
          });
        return {
          title: document.title,
          h1: document.querySelectorAll('h1').length,
          header: Boolean(document.querySelector('#main-header')),
          footer: Boolean(document.querySelector('.site-footer')),
          bodyText: document.body.innerText.trim().length,
          horizontalOverflow: Math.max(0, document.documentElement.scrollWidth - document.documentElement.clientWidth),
          failedImages: images.filter((image) => image.complete && image.naturalWidth === 0).map((image) => image.currentSrc || image.src),
          missingImageAlt: images.filter((image) => !image.hasAttribute('alt')).length,
          emptyLinks: interactive.filter((element) => element.tagName === 'A' && !element.textContent.trim() && !element.getAttribute('aria-label')).length,
          mainVisible: Boolean(main) && getComputedStyle(main).visibility !== 'hidden' && getComputedStyle(main).display !== 'none',
          release: document.querySelector('meta[name="tepat-release"]')?.content || null
        };
      });

      const result = {
        profile: profile.name,
        route,
        status: response?.status() || 0,
        consoleErrors: [...new Set(consoleErrors)],
        ...audit
      };
      results.push(result);

      if (sampleRoutes.has(route)) {
        await page.evaluate(async () => {
          for (const image of document.images) {
            image.loading = 'eager';
            const source = image.getAttribute('src');
            if (source && !image.currentSrc) image.src = source;
          }
          const step = Math.max(500, Math.floor(innerHeight * 0.75));
          for (let y = 0; y < document.documentElement.scrollHeight; y += step) {
            scrollTo(0, y);
            await new Promise((resolvePromise) => setTimeout(resolvePromise, 60));
          }
          await Promise.all(
            [...document.images].map((image) => image.complete
              ? Promise.resolve()
              : new Promise((resolvePromise) => {
                  image.addEventListener('load', resolvePromise, { once: true });
                  image.addEventListener('error', resolvePromise, { once: true });
                }))
          );
          scrollTo(0, 0);
          await new Promise((resolvePromise) => setTimeout(resolvePromise, 150));
        });
        const slug = route === '/' ? 'home' : route.replace(/^\/|\/$/g, '').replaceAll('/', '--');
        await page.screenshot({ path: join(screenshotDir, `${profile.name}-${slug}.png`), fullPage: true });
      }
    }
    await page.close();
  }
} finally {
  await browser.close();
}

const failures = results.filter((item) =>
  item.status >= 400 ||
  item.h1 !== 1 ||
  !item.header ||
  !item.footer ||
  !item.mainVisible ||
  item.horizontalOverflow > 1 ||
  item.failedImages.length ||
  item.missingImageAlt ||
  item.emptyLinks ||
  item.consoleErrors.length
);

const report = {
  generatedAt: new Date().toISOString(),
  baseUrl,
  pages: pages.length,
  profiles: profiles.map(({ name, width, height }) => ({ name, width, height })),
  checks: results.length,
  failures: failures.length,
  results
};

writeFileSync(join(reportDir, 'browser-report.json'), JSON.stringify(report, null, 2));
console.log(JSON.stringify({ pages: pages.length, checks: results.length, failures: failures.length, screenshots: screenshotDir }, null, 2));
if (failures.length) {
  console.error(failures.slice(0, 30).map((item) => `${item.profile} ${item.route}: ${JSON.stringify(item)}`).join('\n'));
  process.exitCode = 1;
}
