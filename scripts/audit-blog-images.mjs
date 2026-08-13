import { createHash } from 'node:crypto';
import { readdir, readFile, stat } from 'node:fs/promises';
import path from 'node:path';

const root = process.cwd();
const blogDir = path.join(root, 'src', 'content', 'blog');

function parseFrontmatter(text) {
  if (!text.startsWith('---')) return {};
  const end = text.indexOf('\n---', 3);
  if (end < 0) return {};
  const fm = text.slice(3, end);
  const data = {};
  for (const line of fm.split('\n')) {
    const m = line.match(/^([A-Za-z0-9_]+):\s*(.*)$/);
    if (!m) continue;
    let v = m[2].trim();
    v = v.replace(/^["']|["']$/g, '');
    data[m[1]] = v;
  }
  return data;
}

const files = (await readdir(blogDir)).filter(f => f.endsWith('.md')).sort();
const byPath = new Map();
const byHash = new Map();
const errors = [];

for (const file of files) {
  const raw = await readFile(path.join(blogDir, file), 'utf8');
  const data = parseFrontmatter(raw);
  if (!data.image) {
    errors.push(`${file}: image field missing`);
    continue;
  }
  const image = data.image;
  const prevPath = byPath.get(image);
  if (prevPath) errors.push(`${file}: duplicate image path with ${prevPath}: ${image}`);
  else byPath.set(image, file);

  if (/^https?:\/\//i.test(image)) continue;
  const disk = path.join(root, 'public', image.replace(/^\//, ''));
  try {
    const st = await stat(disk);
    if (st.size < 1000) errors.push(`${file}: suspiciously small image (${st.size} bytes): ${image}`);
    const hash = createHash('sha256').update(await readFile(disk)).digest('hex');
    const prevHash = byHash.get(hash);
    if (prevHash) errors.push(`${file}: duplicate image bytes with ${prevHash}: ${image}`);
    else byHash.set(hash, file);
  } catch {
    errors.push(`${file}: image file missing: ${image}`);
  }
}

if (errors.length) {
  console.error(`Blog image audit failed (${errors.length} issue(s))`);
  for (const e of errors) console.error(`- ${e}`);
  process.exit(1);
}
console.log(JSON.stringify({articles: files.length, uniqueImagePaths: byPath.size, uniqueLocalImageHashes: byHash.size}, null, 2));
