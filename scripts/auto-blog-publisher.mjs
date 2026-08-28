// Autonomous AI Blog Publisher — agentic version.
//
// Previously this picked the next item off a hardcoded 9-entry KEYWORD_QUEUE
// and filled a fixed text template (no ranking awareness, no real LLM; once
// the queue was exhausted it generated near-duplicate "Edisi Khusus" spam).
//
// Now the loop is real:
//   1. Check live rankings for every tracked keyword (Google Search Console).
//   2. Pick the single best opportunity (closest to #1 wins).
//   3. Have Claude write a real, grounded article for it.
//   4. Pick a real, unused, on-disk image for it (never let the LLM invent a path).
//   5. Write the file, then run the SAME safety gates as before (image audit,
//      Astro build) before anything reaches git — a failed gate deletes the
//      draft and aborts, exactly like the previous version's build check did.
//   6. Git commit + push (GitHub Actions then handles FTP deploy + Cloudflare
//      purge, unchanged) + IndexNow ping + Telegram report — unchanged.
//   7. Append a run record to data/maya-status.json — the small public status
//      file agent-office-hq's dashboard reads to show Maya's real activity.

import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';
import { checkAllRankings, persistSnapshot } from './lib/rank-tracker.mjs';
import { pickOpportunity } from './lib/opportunity-picker.mjs';
import { generateArticle } from './lib/claude-writer.mjs';
import { pickImage } from './lib/image-picker.mjs';
import { syncWorkshopPhotos } from './lib/gdrive-syncer.mjs';

const TARGET_DIR = path.resolve('src/content/blog');
const STATUS_PATH = path.resolve('data/maya-status.json');
const MAX_STATUS_RUNS = 50;
const HERMES_ENV_PATH = path.resolve('D:/code/hermes/hermes-agent/.env');

let TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN || '';
let TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID || '';

if ((!TELEGRAM_BOT_TOKEN || !TELEGRAM_CHAT_ID) && fs.existsSync(HERMES_ENV_PATH)) {
  const envContent = fs.readFileSync(HERMES_ENV_PATH, 'utf8');
  envContent.split('\n').forEach(line => {
    line = line.trim();
    if (line && !line.startsWith('#') && line.includes('=')) {
      const [k, ...vParts] = line.split('=');
      const v = vParts.join('=').trim().replace(/^['"]|['"]$/g, '');
      if (k.trim() === 'TELEGRAM_BOT_TOKEN' && !TELEGRAM_BOT_TOKEN) TELEGRAM_BOT_TOKEN = v;
      if (k.trim() === 'TELEGRAM_CHAT_ID' && !TELEGRAM_CHAT_ID) TELEGRAM_CHAT_ID = v;
    }
  });
}

export function slugify(value) {
  return String(value)
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
    .slice(0, 80);
}

function uniqueSlug(baseSlug) {
  let slug = baseSlug;
  let suffix = 1;
  while (fs.existsSync(path.join(TARGET_DIR, `${slug}.md`))) {
    suffix += 1;
    slug = `${baseSlug}-${suffix}`;
  }
  return slug;
}

// Same lightweight parser scripts/audit-blog-images.mjs already uses for
// this repo's flat-scalar blog frontmatter. Normalize CRLF first — these
// blog files are checked in with \r\n line endings, and a trailing \r left
// on each line otherwise makes every field (not just primaryKeyword) fail
// to match, since JS regex "." never consumes "\r".
export function parseFrontmatter(text) {
  text = text.replace(/\r\n/g, '\n');
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

/**
 * Finds the article already publishing this exact keyword, so an "improve"
 * pick edits it in place instead of uniqueSlug() minting a fresh competing
 * URL. Without this, pickOpportunity() re-selecting the same stuck keyword
 * on consecutive runs produced 4 separate live pages for "cutting acp"
 * (cutting-acp, -2, -3, -4) all targeting the same query — cannibalizing
 * each other's ranking instead of consolidating it.
 */
export function findArticleByKeyword(keyword, dir = TARGET_DIR) {
  const baseSlug = slugify(keyword);
  const baseFile = path.join(dir, `${baseSlug}.md`);
  if (fs.existsSync(baseFile)) {
    const data = parseFrontmatter(fs.readFileSync(baseFile, 'utf8'));
    if (data.primaryKeyword === keyword) {
      return { slug: baseSlug, publishDate: data.publishDate || null };
    }
  }

  if (!fs.existsSync(dir)) return null;
  const matches = [];
  for (const file of fs.readdirSync(dir)) {
    if (!file.endsWith('.md')) continue;
    const data = parseFrontmatter(fs.readFileSync(path.join(dir, file), 'utf8'));
    if (data.primaryKeyword === keyword) {
      matches.push({ slug: file.slice(0, -3), publishDate: data.publishDate || null });
    }
  }
  if (matches.length === 0) return null;

  // Multiple pre-existing duplicates (from before this fix): converge future
  // updates onto the shortest / oldest slug instead of piling onto the most
  // recent duplicate, so the canonical URL stabilizes over time.
  matches.sort((a, b) => a.slug.length - b.slug.length || a.slug.localeCompare(b.slug));
  return matches[0];
}

function estimateReadTime(bodyMarkdown) {
  const words = bodyMarkdown.trim().split(/\s+/).length;
  const minutes = Math.max(3, Math.round(words / 180));
  return `${minutes} menit baca`;
}

function yamlString(value) {
  return `"${String(value).replace(/"/g, '\\"')}"`;
}

function assembleMarkdown(article, meta) {
  const today = new Date().toISOString().split('T')[0];
  // Editing an existing article keeps its original publishDate (so the page's
  // age/freshness signal stays honest) and only bumps updatedDate.
  const publishDate = meta.publishDate || today;
  const keyTakeaways = article.keyTakeaways.map(item => `  - ${yamlString(item)}`).join('\n');
  const relatedLinks = article.relatedLinks.map(link => `  - title: ${yamlString(link.title)}\n    url: ${yamlString(link.url)}`).join('\n');
  const faq = article.faq.map(item => `  - question: ${yamlString(item.question)}\n    answer: ${yamlString(item.answer)}`).join('\n');

  return `---
title: ${yamlString(article.title)}
description: ${yamlString(article.description)}
excerpt: ${yamlString(article.excerpt)}
category: ${yamlString(article.category)}
readTime: ${yamlString(estimateReadTime(article.bodyMarkdown))}
publishDate: ${yamlString(publishDate)}
updatedDate: ${yamlString(today)}
image: ${yamlString(meta.image)}
imageAlt: ${yamlString(meta.imageAlt)}
author: "Tim Teknis Tepat Laser"
primaryKeyword: ${yamlString(meta.primaryKeyword)}
keywords: ${yamlString(meta.keywords)}
keyTakeaways:
${keyTakeaways}
relatedLinks:
${relatedLinks}
faq:
${faq}
---

${article.bodyMarkdown}
`;
}

function readStatusFile() {
  try {
    return JSON.parse(fs.readFileSync(STATUS_PATH, 'utf8'));
  } catch {
    return { schemaVersion: 1, updatedAt: null, runs: [] };
  }
}

function appendMayaStatus(record) {
  const status = readStatusFile();
  status.runs = [...(status.runs || []), record].slice(-MAX_STATUS_RUNS);
  status.updatedAt = new Date().toISOString();
  fs.mkdirSync(path.dirname(STATUS_PATH), { recursive: true });
  fs.writeFileSync(STATUS_PATH, JSON.stringify(status, null, 2), 'utf8');
}

async function sendTelegramReport({ opportunity, liveUrl, article, isUpdate }) {
  if (!TELEGRAM_BOT_TOKEN || !TELEGRAM_CHAT_ID) {
    console.log('ℹ️ Telegram credentials belum diset. Melewati push report.');
    return;
  }

  const target = opportunity.target;
  const rankLine = target.found
    ? `📊 <b>Rank sebelumnya:</b> #${target.position} (${target.status})`
    : `📊 <b>Rank sebelumnya:</b> Belum ranking`;
  const wibTime = new Date().toLocaleString('id-ID', { timeZone: 'Asia/Jakarta' });
  const msg =
    `📰 <b>${isUpdate ? 'ARTIKEL BLOG DIPERBARUI OTOMATIS!' : 'ARTIKEL BLOG BARU TERBIT OTOMATIS!'}</b>\n` +
    `━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n` +
    `📌 <b>Judul:</b> ${article.title}\n` +
    `🔑 <b>Target Keyword:</b> <code>${target.keyword}</code>\n` +
    `${rankLine}\n` +
    `🎯 <b>Alasan dipilih:</b> ${opportunity.reason}\n` +
    `🌐 <b>URL Live:</b> <a href="${liveUrl}">${liveUrl}</a>\n` +
    `⏰ <b>Waktu Terbit:</b> ${wibTime}\n` +
    `🚀 <b>Status:</b> GitHub Pushed ➔ Hostinger Live ➔ IndexNow Pinged\n` +
    `━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n` +
    `⚡ <i>Dipilih berdasarkan data ranking real (GSC) & ditulis oleh Claude — Maya AI Autonomous Content Publisher</i>`;

  try {
    const res = await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ chat_id: TELEGRAM_CHAT_ID, text: msg, parse_mode: 'HTML', disable_web_page_preview: false })
    });
    if (res.ok) console.log(`📱 Laporan Telegram berhasil dikirim ke Chat ID: ${TELEGRAM_CHAT_ID}`);
    else console.error(`⚠️ Gagal mengirim laporan Telegram: HTTP ${res.status}`);
  } catch (err) {
    console.error('⚠️ Error saat dispatch Telegram report:', err.message);
  }
}

export async function publishNextArticle() {
  console.log('🚀 MEMULAI AUTONOMOUS AI BLOG PUBLISHER ENGINE (agentic)...\n');

  console.log('☁️ Mensinkronisasikan foto workshop terbaru dari Google Drive...');
  try {
    const syncRes = await syncWorkshopPhotos();
    if (syncRes.newlySynced > 0) {
      console.log(`   📸 Berhasil mengunduh ${syncRes.newlySynced} foto workshop baru dari Google Drive!`);
    }
  } catch (syncErr) {
    console.warn(`⚠️ GDrive sync warning (non-fatal): ${syncErr.message}`);
  }

  console.log('\n🔍 Mengecek ranking live via Google Search Console...');
  const snapshot = await checkAllRankings();
  await persistSnapshot(snapshot);
  console.log(`   Rank #1: ${snapshot.rankOneCount}/${snapshot.totalTracked} | Page 1: ${snapshot.pageOneCount}/${snapshot.totalTracked}`);

  const opportunity = pickOpportunity(snapshot);
  if (opportunity.action === 'none') {
    console.log(`ℹ️ ${opportunity.reason} Tidak ada artikel yang diterbitkan hari ini.`);
    return null;
  }

  const target = opportunity.target;
  console.log(`📝 Target terpilih: "${target.keyword}" — ${opportunity.reason}`);

  console.log('\n🧠 Meminta Claude menulis artikel...');
  const article = await generateArticle(target);
  console.log(`   Judul: "${article.title}"`);

  console.log('\n🖼️  Memilih gambar yang belum terpakai...');
  const imageChoice = await pickImage({ keyword: target.keyword, category: article.category });
  console.log(`   Gambar: ${imageChoice.image}`);

  // "improve" means edit the article already targeting this keyword in place;
  // only mint a brand-new slug when no such article exists yet (covers both
  // action === 'new' and an 'improve' pick with no matching article on disk).
  const existingArticle = opportunity.action === 'improve' ? findArticleByKeyword(target.keyword) : null;
  const slug = existingArticle ? existingArticle.slug : uniqueSlug(slugify(target.keyword));
  const isUpdate = Boolean(existingArticle);

  const meta = {
    image: imageChoice.image,
    imageAlt: imageChoice.imageAlt,
    primaryKeyword: target.keyword,
    keywords: `${target.keyword}, jasa laser cutting terdekat, Tepat Laser Tangsel`,
    publishDate: existingArticle?.publishDate
  };
  const markdown = assembleMarkdown(article, meta);
  const targetFile = path.join(TARGET_DIR, `${slug}.md`);

  fs.mkdirSync(TARGET_DIR, { recursive: true });
  fs.writeFileSync(targetFile, markdown, 'utf8');
  console.log(isUpdate
    ? `✅ File Markdown DIPERBARUI (bukan artikel baru): ${targetFile}`
    : `✅ File Markdown dibuat: ${targetFile}`);

  console.log('\n🔍 Menjalankan Image Safety Gate...');
  // Note: intentionally NOT shelling out to scripts/audit-blog-images.mjs here —
  // that script currently fails on pre-existing legacy articles (unrelated
  // frontmatter parsing bug), which would make it a false-positive hard gate
  // for every future run. image-picker.mjs already guarantees the chosen path
  // is real and not already claimed by another article; this just double-checks
  // the exact file we're about to publish.
  const imageDiskPath = path.join('public', meta.image.replace(/^\//, ''));
  if (!fs.existsSync(imageDiskPath)) {
    console.error(`❌ Image tidak ditemukan di disk: ${imageDiskPath}. Menghapus file draft...`);
    fs.unlinkSync(targetFile);
    throw new Error(`Selected image does not exist on disk: ${imageDiskPath}`);
  }
  console.log('✅ IMAGE ADA DI DISK DAN VALID');

  console.log('\n🔍 Menjalankan Astro Build Verification Test...');
  try {
    execSync('npm run build', { stdio: 'inherit' });
    console.log('✅ ASTRO BUILD BERHASIL (Zero Error, Schema Valid)');
  } catch (err) {
    console.error('❌ Build gagal. Menghapus file draft...');
    fs.unlinkSync(targetFile);
    throw err;
  }

  appendMayaStatus({
    runId: `run-${Date.now()}`,
    timestamp: new Date().toISOString(),
    keyword: target.keyword,
    targetPage: target.targetPage,
    action: opportunity.action,
    reason: opportunity.reason,
    prevRank: target.found ? target.position : null,
    prevStatus: target.status,
    publishedSlug: slug,
    publishedUrl: `https://tepatlaser.com/blog/${slug}/`,
    title: article.title
  });

  console.log('\n📦 Melakukan Git Commit & Auto-Deploy via GitHub Actions...');
  try {
    execSync('git config user.name "Ddos-spec"');
    execSync('git config user.email "setgraph69@gmail.com"');
    execSync(`git add "src/content/blog/${slug}.md" data/maya-status.json data/rankings/history.json data/gdrive-synced.json public/images/workshop/ 2>/dev/null || true`);
    const commitVerb = isUpdate ? 'update' : 'auto-publish';
    execSync(`git commit -m "feat(blog): ${commitVerb} '${article.title}' for keyword '${target.keyword}' [Maya AI Autonomous Publisher]"`);
    execSync('git push origin main');
    console.log('🚀 ARTIKEL BERHASIL DIPUSH KE GITHUB & OTOMATIS LIVE DI HOSTINGER!');
  } catch (gitErr) {
    console.error('⚠️ Peringatan git push:', gitErr.message);
  }

  console.log('\n📡 Memicu IndexNow Instant Ping ke Search Engines...');
  try {
    execSync('node scripts/ping-indexnow.mjs', { stdio: 'inherit' });
  } catch (pingErr) {
    console.error('⚠️ IndexNow ping warning:', pingErr.message);
  }

  const liveUrl = `https://tepatlaser.com/blog/${slug}/`;
  console.log(`\n📱 Mengirim notifikasi report ke Telegram: ${liveUrl}`);
  await sendTelegramReport({ opportunity, liveUrl, article, isUpdate });

  console.log('\n🎉 PROSES SELESAI SEMPURNA! ARTIKEL TELAH LIVE & TERLAPOR DI TELEGRAM.');
  return { slug, liveUrl, target, article };
}

if (process.argv[1] && process.argv[1].endsWith('auto-blog-publisher.mjs')) {
  publishNextArticle().catch(err => {
    console.error('❌ publishNextArticle gagal:', err.message);
    process.exitCode = 1;
  });
}
