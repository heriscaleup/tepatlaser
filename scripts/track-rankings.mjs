// CLI entry point — real ranking audit backed by Google Search Console
// (see scripts/lib/rank-tracker.mjs and scripts/lib/gsc-client.mjs).
// Previously scraped DuckDuckGo HTML results, which was fragile and not an
// authoritative ranking source. Now also persists every run to
// data/rankings/history.json so opportunity-picker.mjs can track trends.

import { checkAllRankings, persistSnapshot } from './lib/rank-tracker.mjs';

const STATUS_LABEL = {
  RANK_1: '👑 RANK #1',
  TOP_3: '💎 TOP 3',
  PAGE_1: '🔥 PAGE 1',
  PAGE_2_3: '📈 PAGE 2-3',
  DEEP: '📉 DEEP (30+)',
  NOT_RANKING: '❓ NOT RANKING (no GSC impressions)',
  UNAVAILABLE: '⚠️ UNAVAILABLE'
};

async function main() {
  console.log('🔍 MEMULAI AUDIT RANKING ORGANIK (Google Search Console)...\n');

  const snapshot = await checkAllRankings();
  console.log(`Domain Target: tepatlaser.com`);
  console.log(`GSC Configured: ${snapshot.gscConfigured ? 'YA' : 'TIDAK — set GSC_SERVICE_ACCOUNT_JSON'}`);
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');

  snapshot.results.forEach((item, i) => {
    const displayRank = item.position != null ? `#${item.position}` : '—';
    console.log(`${i + 1}. [${displayRank}] ${item.keyword}`);
    console.log(`   ↳ Status: ${STATUS_LABEL[item.status] || item.status} | Target: ${item.targetPage}${item.error ? ` | Error: ${item.error}` : ''}`);
  });

  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log(`🏆 Audit Selesai! Rank #1: ${snapshot.rankOneCount}/${snapshot.totalTracked} | Page 1: ${snapshot.pageOneCount}/${snapshot.totalTracked}`);

  await persistSnapshot(snapshot);
  console.log('💾 Snapshot tersimpan ke data/rankings/history.json');

  return snapshot;
}

if (process.argv[1] && process.argv[1].endsWith('track-rankings.mjs')) {
  main().catch(err => {
    console.error('❌ track-rankings gagal:', err.message);
    process.exitCode = 1;
  });
}

export { main };
