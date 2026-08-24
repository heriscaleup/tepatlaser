// Real keyword ranking tracker — replaces the old DuckDuckGo-HTML-scraping
// approach (fragile, not authoritative, and easily blocked) with live Google
// Search Console data via gsc-client.mjs.
//
// This is the ground-truth signal the agentic publisher (auto-blog-publisher.mjs)
// uses to decide what to work on next: it answers "where do we actually rank
// today for each target keyword" so opportunity-picker.mjs can prioritize.

import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import { isConfigured, queryKeywordPosition } from './gsc-client.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const HISTORY_PATH = path.resolve(__dirname, '..', '..', 'data', 'rankings', 'history.json');
const MAX_HISTORY_SNAPSHOTS = 200;

export const SITE_URL = 'https://tepatlaser.com/';

// Canonical target-keyword registry. Seeded from the original track-rankings.mjs
// list. Grow this over time as new pages/silos are published — this list is
// what opportunity-picker.mjs treats as "keywords we care about ranking #1 for".
export const TARGET_KEYWORDS = [
  { keyword: 'jasa laser cutting bintaro', targetPage: '/lokasi/bintaro/' },
  { keyword: 'laser cutting bsd serpong', targetPage: '/lokasi/bsd-serpong/' },
  { keyword: 'harga laser cutting per meter', targetPage: '/harga-laser-cutting-per-meter/' },
  { keyword: 'pagar laser cutting custom', targetPage: '/pagar-laser-cutting/' },
  { keyword: 'railing tangga laser cutting', targetPage: '/railing-laser-cutting/' },
  { keyword: 'huruf timbul stainless led', targetPage: '/huruf-timbul-stainless-akrilik/' },
  { keyword: 'fasad acp laser cutting', targetPage: '/fasad-acp-laser-cutting/' },
  { keyword: 'mihrab masjid laser cutting', targetPage: '/ornamen-krawangan-grc-masjid/' },
  { keyword: 'jasa laser cutting tangerang selatan', targetPage: '/lokasi/tangerang-selatan/' },
  { keyword: 'laser cutting jakarta selatan', targetPage: '/lokasi/jakarta-selatan/' }
];

export function classifyStatus(position) {
  if (position == null) return 'NOT_RANKING';
  if (position <= 1.5) return 'RANK_1';
  if (position <= 3) return 'TOP_3';
  if (position <= 10) return 'PAGE_1';
  if (position <= 30) return 'PAGE_2_3';
  return 'DEEP';
}

/**
 * Queries GSC for every tracked keyword and returns a single snapshot.
 * Never throws — a GSC failure (or missing credentials) degrades individual
 * rows to status UNAVAILABLE rather than aborting the whole run, so a bad
 * day for one keyword can't block the publisher.
 */
export async function checkAllRankings() {
  const checkedAt = new Date().toISOString();
  const configured = isConfigured();

  const results = [];
  for (const item of TARGET_KEYWORDS) {
    if (!configured) {
      results.push({ ...item, found: false, position: null, clicks: 0, impressions: 0, page: null, status: 'UNAVAILABLE', error: 'GSC_SERVICE_ACCOUNT_JSON not configured' });
      continue;
    }
    try {
      const metrics = await queryKeywordPosition(SITE_URL, item.keyword);
      results.push({
        ...item,
        found: metrics.found,
        position: metrics.position,
        clicks: metrics.clicks,
        impressions: metrics.impressions,
        page: metrics.page,
        status: metrics.found ? classifyStatus(metrics.position) : 'NOT_RANKING',
        error: null
      });
    } catch (error) {
      results.push({ ...item, found: false, position: null, clicks: 0, impressions: 0, page: null, status: 'UNAVAILABLE', error: error.message });
    }
  }

  const rankOneCount = results.filter(r => r.status === 'RANK_1').length;
  const pageOneCount = results.filter(r => ['RANK_1', 'TOP_3', 'PAGE_1'].includes(r.status)).length;

  return { checkedAt, siteUrl: SITE_URL, gscConfigured: configured, results, rankOneCount, pageOneCount, totalTracked: results.length };
}

async function readHistory() {
  try {
    const parsed = JSON.parse(await fs.readFile(HISTORY_PATH, 'utf8'));
    return Array.isArray(parsed.snapshots) ? parsed.snapshots : [];
  } catch (error) {
    if (error.code === 'ENOENT') return [];
    throw new Error(`rank-tracker: failed to read history: ${error.message}`);
  }
}

/** Appends a snapshot to data/rankings/history.json (atomic write, capped length). */
export async function persistSnapshot(snapshot) {
  const snapshots = await readHistory();
  snapshots.push(snapshot);
  const capped = snapshots.slice(-MAX_HISTORY_SNAPSHOTS);

  await fs.mkdir(path.dirname(HISTORY_PATH), { recursive: true });
  const tempPath = `${HISTORY_PATH}.${process.pid}.${Date.now()}.tmp`;
  const payload = JSON.stringify({ schemaVersion: 1, updatedAt: new Date().toISOString(), snapshots: capped }, null, 2);
  await fs.writeFile(tempPath, payload, { encoding: 'utf8', flag: 'wx' });
  await fs.rename(tempPath, HISTORY_PATH);
  return capped;
}

export async function getLatestSnapshot() {
  const snapshots = await readHistory();
  return snapshots.length ? snapshots[snapshots.length - 1] : null;
}

export async function getPreviousSnapshot() {
  const snapshots = await readHistory();
  return snapshots.length >= 2 ? snapshots[snapshots.length - 2] : null;
}
