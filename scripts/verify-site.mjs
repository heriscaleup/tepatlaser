import { existsSync, readdirSync, readFileSync, statSync } from 'node:fs';
import { dirname, extname, join, relative, resolve, sep } from 'node:path';

const root = resolve('dist');
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
  if (!clean || /^(?:https?:|mailto:|tel:|data:|javascript:)/i.test(clean)) return null;
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
  if (!redirect && !/<html[^>]+lang=["']id["']/i.test(html)) failures.push(`${page}: lang bukan id`);
  if (titleCount !== 1) failures.push(`${page}: title=${titleCount}`);
  if (!redirect && h1Count !== 1) failures.push(`${page}: h1=${h1Count}`);
  if (!redirect && descCount !== 1) failures.push(`${page}: meta description=${descCount}`);
  if (!redirect && headerCount !== 1) failures.push(`${page}: header utama=${headerCount}`);
  if (!redirect && footerCount !== 1) failures.push(`${page}: footer utama=${footerCount}`);
  if (!redirect && !/<img[^>]+class=["'][^"']*brand-logo[^>]+src=["']\/images\/tepat-laser-mark\.svg["']/i.test(html)) failures.push(`${page}: logo navbar tidak konsisten`);
  if (!redirect && !/aria-label=["']Navigasi utama["']/i.test(html)) failures.push(`${page}: navigasi utama hilang`);
  if (!redirect && !/<meta[^>]+name=["']tepat-release["'][^>]+content=["']v6-2026-07-21["']/i.test(html)) failures.push(`${page}: release marker V6.1 hilang`);
  for (const match of html.matchAll(/<(?:a|link|img|script)[^>]+(?:href|src)=["']([^"']+)["']/gi)) {
    const target = resolveLocal(match[1], file);
    if (!target) continue;
    checkedLinks++;
    if (!existsSync(target)) failures.push(`${page}: referensi lokal hilang ${match[1]}`);
  }
  for (const match of html.matchAll(/<img\b([^>]*)>/gi)) {
    if (!/\balt=["'][^"']*["']/i.test(match[1])) failures.push(`${page}: gambar tanpa alt`);
  }
  if (/Make\s*the\s*cut|Choose the right route|Read the process|Send the brief|Before we cut|Precision is a way|Jasa Cutting Laser|Production Log|Explore capability/i.test(html)) failures.push(`${page}: copy atau layout lama masih muncul`);
  if (/class=["'][^"']*brand-mark/i.test(html)) failures.push(`${page}: logo TL lama masih muncul`);
  if (/#a6ff00|#b6ff2e|#adff2f/i.test(html)) failures.push(`${page}: warna neon lama masih muncul`);
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

const releaseFile = join(root, 'release.json');
if (!existsSync(releaseFile)) failures.push('/release.json: release marker hilang');
else if (JSON.parse(readFileSync(releaseFile, 'utf8')).release !== 'v6-2026-07-21') failures.push('/release.json: release marker bukan V6.1');

console.log(JSON.stringify({ htmlPages: htmlFiles.length, localReferencesChecked: checkedLinks, failures: failures.length }, null, 2));
if (failures.length) {
  console.error(failures.slice(0, 100).join('\n'));
  process.exitCode = 1;
} else {
  console.log('Semua halaman HTML lolos pemeriksaan struktur dan referensi lokal.');
}
