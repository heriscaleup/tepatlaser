import { test } from 'node:test';
import assert from 'node:assert/strict';
import { classifyStatus } from '../scripts/lib/rank-tracker.mjs';

test('classifyStatus: null position is NOT_RANKING', () => {
  assert.equal(classifyStatus(null), 'NOT_RANKING');
});

test('classifyStatus: position 1 is RANK_1', () => {
  assert.equal(classifyStatus(1), 'RANK_1');
  assert.equal(classifyStatus(1.4), 'RANK_1');
});

test('classifyStatus: position 2-3 is TOP_3', () => {
  assert.equal(classifyStatus(2), 'TOP_3');
  assert.equal(classifyStatus(3), 'TOP_3');
});

test('classifyStatus: position 4-10 is PAGE_1', () => {
  assert.equal(classifyStatus(4), 'PAGE_1');
  assert.equal(classifyStatus(10), 'PAGE_1');
});

test('classifyStatus: position 11-30 is PAGE_2_3', () => {
  assert.equal(classifyStatus(11), 'PAGE_2_3');
  assert.equal(classifyStatus(30), 'PAGE_2_3');
});

test('classifyStatus: position beyond 30 is DEEP', () => {
  assert.equal(classifyStatus(31), 'DEEP');
  assert.equal(classifyStatus(95), 'DEEP');
});
