// Discovery tool: finds every REAL search query (already getting at least
// one GSC impression) matching a substring filter. Use this instead of
// guessing keyword variants by hand — it answers "what are people actually
// searching that finds us?" for a topic, so nothing gets missed and nothing
// gets added that has zero real search evidence.
//
// Usage: node scripts/discover-keywords.mjs <substring> [--min-impressions=1]

import { queryTopQueries } from './lib/gsc-client.mjs';
import { SITE_URL } from './lib/rank-tracker.mjs';

const filter = (process.argv[2] || '').toLowerCase().trim();
const minImpressionsArg = process.argv.find(a => a.startsWith('--min-impressions='));
const minImpressions = minImpressionsArg ? Number(minImpressionsArg.split('=')[1]) : 1;

if (!filter) {
  console.error('Usage: node scripts/discover-keywords.mjs <substring> [--min-impressions=N]');
  process.exit(1);
}

async function main() {
  console.log(`🔍 Menarik semua query real dari Search Console yang mengandung "${filter}"...`);
  console.log(`   Site: ${SITE_URL}\n`);

  const { rows, dateRange } = await queryTopQueries(SITE_URL, { windowDays: 90, rowLimit: 5000 });
  console.log(`   Total query unik (90 hari terakhir, ${dateRange.startDate} s/d ${dateRange.endDate}): ${rows.length}\n`);

  const matches = rows.filter(r => r.query.toLowerCase().includes(filter) && r.impressions >= minImpressions);

  if (matches.length === 0) {
    console.log(`❌ Tidak ada query real yang mengandung "${filter}" dengan minimal ${minImpressions} impression.`);
    return;
  }

  console.log(`✅ Ditemukan ${matches.length} query real:\n`);
  console.log('Posisi | Klik | Impresi | CTR    | Query');
  console.log('-------|------|---------|--------|------');
  for (const m of matches) {
    console.log(`${String(m.position).padEnd(6)} | ${String(m.clicks).padEnd(4)} | ${String(m.impressions).padEnd(7)} | ${(m.ctr * 100).toFixed(1)}%  | ${m.query}`);
  }
}

main().catch(err => {
  console.error('❌ discover-keywords gagal:', err.message);
  process.exitCode = 1;
});
