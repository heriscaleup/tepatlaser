// Picks a real, on-disk, not-yet-used image for a new article instead of
// letting the LLM invent an image path (which could point to a file that
// doesn't exist, or duplicate a path/bytes another article already claims —
// exactly what scripts/audit-blog-images.mjs checks for). This is one of the
// automatic safety rails that make full-auto publishing safe: bad image
// selection is prevented up front rather than caught after the fact.

import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = path.resolve(__dirname, '..', '..');
const IMAGE_ROOTS = ['public/gambar', 'public/images'];
const BLOG_DIR = path.join(REPO_ROOT, 'src', 'content', 'blog');
const IMAGE_EXT = /\.(jpg|jpeg|png|webp)$/i;

async function walk(dir) {
  const out = [];
  let entries;
  try {
    entries = await fs.readdir(dir, { withFileTypes: true });
  } catch {
    return out;
  }
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) out.push(...await walk(full));
    else if (IMAGE_EXT.test(entry.name)) out.push(full);
  }
  return out;
}

function toPublicPath(absPath) {
  return '/' + path.relative(path.join(REPO_ROOT, 'public'), absPath).split(path.sep).join('/');
}

function tokenize(value) {
  return String(value || '')
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, ' ')
    .split(/\s+/)
    .filter(t => t.length > 2);
}

function parseFrontmatterImage(raw) {
  if (!raw.startsWith('---')) return null;
  const end = raw.indexOf('\n---', 3);
  if (end < 0) return null;
  const fm = raw.slice(3, end);
  const match = fm.match(/^image:\s*"?(.*?)"?\s*$/m);
  return match ? match[1] : null;
}

async function getUsedImagePaths() {
  const used = new Set();
  let files = [];
  try {
    files = (await fs.readdir(BLOG_DIR)).filter(f => f.endsWith('.md'));
  } catch {
    return used;
  }
  for (const file of files) {
    const raw = await fs.readFile(path.join(BLOG_DIR, file), 'utf8');
    const image = parseFrontmatterImage(raw);
    if (image) used.add(image);
  }
  return used;
}

/**
 * @param {{ keyword: string, category: string }} target
 * @returns {Promise<{ image: string, imageAlt: string }>}
 */
export async function pickImage(target) {
  const allAbsPaths = (await Promise.all(IMAGE_ROOTS.map(r => walk(path.join(REPO_ROOT, r))))).flat();
  const used = await getUsedImagePaths();

  const candidates = allAbsPaths
    .map(toPublicPath)
    .filter(p => !used.has(p));

  if (candidates.length === 0) {
    throw new Error('image-picker: no unused candidate images left under public/gambar or public/images.');
  }

  const queryTokens = new Set([...tokenize(target.keyword), ...tokenize(target.category)]);
  let best = null;
  let bestScore = -1;
  for (const candidate of candidates) {
    const candidateTokens = tokenize(candidate);
    const score = candidateTokens.reduce((sum, t) => sum + (queryTokens.has(t) ? 1 : 0), 0);
    if (score > bestScore) {
      bestScore = score;
      best = candidate;
    }
  }

  const chosen = best || candidates[0];
  return {
    image: chosen,
    imageAlt: `${target.keyword} — Tepat Laser`
  };
}
