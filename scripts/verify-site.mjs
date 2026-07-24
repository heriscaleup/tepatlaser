import { existsSync, readdirSync, readFileSync, statSync } from 'node:fs';
import { dirname, extname, join, relative, resolve, sep } from 'node:path';

const root = resolve('dist');
const releaseFile = join(root, 'release.json');
const expectedRelease = existsSync(releaseFile) ? JSON.parse(readFileSync(releaseFile, 'utf8')).release : '';
const htmlFiles = [];
const walk = (dir) => {
  for (const name of readdirSync(dir)) {
    const file = join(dir, name);
    if (statSync(file).isDirectory()) walk(file);
    else if (extname(file) === '.html') htmlFiles.push(file);
  }
};
walk(root);

const failures = [];
let checkedLinks = 0;
const resolveLocal = (value, fromFile) => {
  const clean = decodeURIComponent(value.split('#')[0].split('?')[0]);
  if (!clean || /^(?:https?:|mailto:|tel:|data:|javascript:|\/\/)/i.test(clean)) return null;
  const target = clean.startsWith('/') ? join(root, clean) : resolve(dirname(fromFile), clean);
  if (existsSync(target) && statSync(target).isDirectory()) return join(target, 'index.html');
  if (existsSync(target)) return target;
  if (!extname(target)) return join(target, 'index.html');
  return target;
};

for (const file of htmlFiles) {
  const html = readFileSync(file, 'utf8');
  const page = '/' + relative(root, file).split(sep).join('/').replace(/index\.html$/, '');
  const redirect = /http-equiv=["']refresh["']/i.test(html);
  const titleCount = (html.match(/<title(?:\s|>)/gi) || []).length;
  const h1Count = (html.match(/<h1(?:\s|>)/gi) || []).length;
  const descCount = (html.match(/<meta[^>]+name=["']description["']/gi) || []).length;
  const headerCount = (html.match(/<header[^>]+id=["']main-header["']/gi) || []).length;
  const footerCount = (html.match(/<footer[^>]+class=["'][^"']*site-footer/gi) || []).length;
  const canonicalCount = (html.match(/<link[^>]+rel=["']canonical["']/gi) || []).length;
  const ogTitleCount = (html.match(/<meta[^>]+property=["']og:title["']/gi) || []).length;
  const viewportCount = (html.match(/<meta[^>]+name=["']viewport["']/gi) || []).length;
  const sectionCount = (html.match(/<section(?:\s|>)/gi) || []).length;
  const visibleText = html.replace(/<script[\s\S]*?<\/script>/gi, ' ').replace(/<style[\s\S]*?<\/style>/gi, ' ').replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
  const isBlog = page === '/blog/' || page.startsWith('/blog/');
  const isContentPage = !redirect && page !== '/404.html' && page !== '/404/';
  if (!redirect && !/<html[^>]+lang=["']id["']/i.test(html)) failures.push(`${page}: lang bukan id`);
  if (titleCount !== 1) failures.push(`${page}: title=${titleCount}`);
  if (!redirect && h1Count !== 1) failures.push(`${page}: h1=${h1Count}`);
  if (!redirect && descCount !== 1) failures.push(`${page}: meta description=${descCount}`);
  if (!redirect && canonicalCount !== 1) failures.push(`${page}: canonical=${canonicalCount}`);
  if (!redirect && ogTitleCount !== 1) failures.push(`${page}: og:title=${ogTitleCount}`);
  if (!redirect && viewportCount !== 1) failures.push(`${page}: viewport=${viewportCount}`);
  if (!redirect && headerCount !== 1) failures.push(`${page}: header utama=${headerCount}`);
  if (!redirect && footerCount !== 1) failures.push(`${page}: footer utama=${footerCount}`);
  if (!redirect && !/<img[^>]+class=["'][^"']*brand-logo[^>]+src=["']\/images\/logo-transparent\.webp["']/i.test(html)) failures.push(`${page}: logo navbar tidak konsisten`);
  if (!redirect && !/aria-label=["']Navigasi utama["']/i.test(html)) failures.push(`${page}: navigasi utama hilang`);
  if (!redirect && (!expectedRelease || !html.includes(`name="tepat-release" content="${expectedRelease}"`))) failures.push(`${page}: release marker tidak sinkron`);
  if (isContentPage && isBlog && visibleText.length < 900) failures.push(`${page}: isi artikel terlalu tipis (${visibleText.length} karakter)`);
  if (isContentPage && !isBlog && visibleText.length < 4000) failures.push(`${page}: isi halaman non-blog terlalu tipis (${visibleText.length} karakter, minimum 4000)`);
  if (isContentPage && !isBlog && sectionCount < 5) failures.push(`${page}: struktur halaman non-blog terlalu ringkas (${sectionCount} section, minimum 5)`);
  if (!redirect && html.length > 250_000) failures.push(`${page}: HTML melebihi budget 250 KB`);
  for (const match of html.matchAll(/<(?:a|link|img|script)[^>]+(?:href|src)=["']([^"']+)["']/gi)) {
    const target = resolveLocal(match[1], file);
    if (!target) continue;
    checkedLinks++;
    if (!existsSync(target)) failures.push(`${page}: referensi lokal hilang ${match[1]}`);
  }
  for (const match of html.matchAll(/<img\b([^>]*)>/gi)) {
    if (!/\balt=["'][^"']*["']/i.test(match[1])) failures.push(`${page}: gambar tanpa alt`);
    if (!/\bwidth=["'][^"']+["']/i.test(match[1]) || !/\bheight=["'][^"']+["']/i.test(match[1])) failures.push(`${page}: gambar tanpa dimensi intrinsik`);
  }
  for (const match of html.matchAll(/<a\b([^>]*)>/gi)) {
    if (/\btarget=["']_blank["']/i.test(match[1]) && !/\brel=["'][^"']*noopener/i.test(match[1])) failures.push(`${page}: target blank tanpa noopener`);
  }
  if (/Make\s*the\s*cut|Choose the right route|Read the process|Send the brief|Before we cut|Precision is a way|Jasa Cutting Laser|Production Log|Explore capability/i.test(html)) failures.push(`${page}: copy atau layout lama masih muncul`);
  if (/class=["'][^"']*brand-mark/i.test(html)) failures.push(`${page}: logo TL lama masih muncul`);
  if (/#a6ff00|#b6ff2e|#adff2f/i.test(html)) failures.push(`${page}: warna neon lama masih muncul`);
  if (/\/tepatlaser\/|±0\.02|FIBER LASER CUTTING 12KW|custom-cursor|page-wipe|grain-overlay/i.test(html)) failures.push(`${page}: artefak atau klaim lama masih muncul`);
}

const manifestFile = join(root, 'manifest.json');
if (existsSync(manifestFile)) {
  const manifest = JSON.parse(readFileSync(manifestFile, 'utf8'));
  if (!/^Tepat Laser/i.test(manifest.name || '') || !/^Tepat Laser/i.test(manifest.short_name || '')) failures.push('/manifest.json: nama brand tidak konsisten');
  for (const item of [...(manifest.icons || []), ...(manifest.screenshots || [])]) {
    const target = resolveLocal(item.src || '', manifestFile);
    if (target && !existsSync(target)) failures.push(`/manifest.json: aset hilang ${item.src}`);
  }
}

if (!existsSync(releaseFile)) failures.push('/release.json: release marker hilang');
else if (!/^v9-\d{4}-\d{2}-\d{2}$/.test(expectedRelease)) failures.push('/release.json: format release V9 tidak valid');

console.log(JSON.stringify({ htmlPages: htmlFiles.length, localReferencesChecked: checkedLinks, failures: failures.length }, null, 2));
if (failures.length) {
  console.error(failures.slice(0, 100).join('\n'));
  process.exitCode = 1;
} else {
  console.log('Semua halaman HTML lolos pemeriksaan struktur dan referensi lokal.');
}
