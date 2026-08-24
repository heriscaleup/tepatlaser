import { test } from 'node:test';
import assert from 'node:assert/strict';
import { pickOpportunity } from '../scripts/lib/opportunity-picker.mjs';

function row(overrides) {
  return { keyword: 'k', targetPage: '/p/', found: true, position: 5, impressions: 100, status: 'PAGE_1', ...overrides };
}

test('pickOpportunity: no snapshot returns none', () => {
  const result = pickOpportunity(null);
  assert.equal(result.action, 'none');
});

test('pickOpportunity: all RANK_1 returns none', () => {
  const snapshot = { results: [row({ status: 'RANK_1', position: 1 }), row({ status: 'RANK_1', position: 1 })] };
  const result = pickOpportunity(snapshot);
  assert.equal(result.action, 'none');
});

test('pickOpportunity: prefers PAGE_1 over PAGE_2_3 regardless of impressions', () => {
  const snapshot = {
    results: [
      row({ keyword: 'deep-but-huge', status: 'PAGE_2_3', position: 20, impressions: 10000 }),
      row({ keyword: 'close-to-top', status: 'PAGE_1', position: 4, impressions: 10 })
    ]
  };
  const result = pickOpportunity(snapshot);
  assert.equal(result.action, 'improve');
  assert.equal(result.target.keyword, 'close-to-top');
});

test('pickOpportunity: within same tier, picks highest impressions', () => {
  const snapshot = {
    results: [
      row({ keyword: 'low-impressions', status: 'PAGE_1', position: 6, impressions: 50 }),
      row({ keyword: 'high-impressions', status: 'PAGE_1', position: 8, impressions: 500 })
    ]
  };
  const result = pickOpportunity(snapshot);
  assert.equal(result.target.keyword, 'high-impressions');
});

test('pickOpportunity: NOT_RANKING classified as action "new"', () => {
  const snapshot = { results: [row({ keyword: 'fresh', status: 'NOT_RANKING', found: false, position: null, impressions: 0 })] };
  const result = pickOpportunity(snapshot);
  assert.equal(result.action, 'new');
  assert.equal(result.target.keyword, 'fresh');
});
