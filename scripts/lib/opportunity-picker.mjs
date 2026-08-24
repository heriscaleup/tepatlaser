// Picks the single best target for today's publish run, given a rank
// snapshot from rank-tracker.mjs. This is the "keep chasing #1" brain:
// it always prefers the cheapest lever toward more #1 rankings, not just
// round-robining through a static list.
//
// Priority order (cheapest → most expensive path to rank #1):
//   1. PAGE_1 (position 2-10)   — already on page 1, push it over the top
//   2. PAGE_2_3 (position 11-30) — close, needs a real content push
//   3. NOT_RANKING / DEEP / UNAVAILABLE — no meaningful presence yet, needs new content
// RANK_1 keywords are excluded — nothing to chase there (still worth a periodic
// refresh pass in a later phase, but not today's single pick).
//
// Within a tier, the keyword with the most impressions wins (biggest reach
// already, so improving its rank has the largest traffic payoff).

const TIER_RANK = Object.freeze({
  PAGE_1: 0,
  PAGE_2_3: 1,
  NOT_RANKING: 2,
  DEEP: 2,
  UNAVAILABLE: 3
});

/**
 * @param {object} snapshot - result of rank-tracker.mjs#checkAllRankings()
 * @returns {{ action: 'improve'|'new'|'none', target: object|null, reason: string }}
 */
export function pickOpportunity(snapshot) {
  if (!snapshot || !Array.isArray(snapshot.results) || snapshot.results.length === 0) {
    return { action: 'none', target: null, reason: 'No ranking snapshot available.' };
  }

  const candidates = snapshot.results.filter(r => r.status !== 'RANK_1');
  if (candidates.length === 0) {
    return { action: 'none', target: null, reason: 'All tracked keywords are already #1.' };
  }

  const sorted = [...candidates].sort((a, b) => {
    const tierDiff = (TIER_RANK[a.status] ?? 9) - (TIER_RANK[b.status] ?? 9);
    if (tierDiff !== 0) return tierDiff;
    return (b.impressions || 0) - (a.impressions || 0);
  });

  const best = sorted[0];
  const action = (best.status === 'NOT_RANKING' || best.status === 'DEEP' || best.status === 'UNAVAILABLE') ? 'new' : 'improve';
  const reason = action === 'improve'
    ? `"${best.keyword}" is at position ${best.position} (${best.status}) with ${best.impressions} impressions — closest to #1.`
    : `"${best.keyword}" has no meaningful ranking yet (${best.status}) — needs dedicated content.`;

  return { action, target: best, reason };
}
