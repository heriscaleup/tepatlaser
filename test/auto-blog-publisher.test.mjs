import { test } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'fs';
import os from 'os';
import path from 'path';
import { slugify, findArticleByKeyword, parseFrontmatter } from '../scripts/auto-blog-publisher.mjs';

function writeArticle(dir, slug, { primaryKeyword, publishDate = '2026-08-26' }) {
  fs.writeFileSync(path.join(dir, `${slug}.md`), `---
title: "placeholder"
primaryKeyword: "${primaryKeyword}"
publishDate: "${publishDate}"
---

body
`, 'utf8');
}

test('findArticleByKeyword: returns null when no article targets this keyword yet', () => {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'blog-'));
  writeArticle(dir, 'unrelated-article', { primaryKeyword: 'something else' });

  assert.equal(findArticleByKeyword('cutting acp', dir), null);
  fs.rmSync(dir, { recursive: true, force: true });
});

test('findArticleByKeyword: finds the canonical base-slug article for a keyword', () => {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'blog-'));
  writeArticle(dir, slugify('cutting acp'), { primaryKeyword: 'cutting acp', publishDate: '2026-08-20' });

  const found = findArticleByKeyword('cutting acp', dir);
  assert.equal(found.slug, 'cutting-acp');
  assert.equal(found.publishDate, '2026-08-20');
  fs.rmSync(dir, { recursive: true, force: true });
});

test('findArticleByKeyword: regression for the cutting-acp cannibalization bug — with 4 pre-existing duplicates, resolves to the original slug instead of piling on a 5th', () => {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'blog-'));
  // Exact shape the bug produced in production: one keyword, four competing URLs.
  writeArticle(dir, 'cutting-acp', { primaryKeyword: 'cutting acp', publishDate: '2026-08-26' });
  writeArticle(dir, 'cutting-acp-2', { primaryKeyword: 'cutting acp', publishDate: '2026-08-27' });
  writeArticle(dir, 'cutting-acp-3', { primaryKeyword: 'cutting acp', publishDate: '2026-08-27' });
  writeArticle(dir, 'cutting-acp-4', { primaryKeyword: 'cutting acp', publishDate: '2026-08-28' });

  const found = findArticleByKeyword('cutting acp', dir);
  assert.equal(found.slug, 'cutting-acp', 'must converge on the original slug, not mint a 5th duplicate');
  assert.equal(found.publishDate, '2026-08-26');
  fs.rmSync(dir, { recursive: true, force: true });
});

test('findArticleByKeyword: keyword match is exact, not substring — a different keyword sharing a slug prefix must not match', () => {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'blog-'));
  writeArticle(dir, 'cutting-acp-fasad', { primaryKeyword: 'cutting acp fasad' });

  assert.equal(findArticleByKeyword('cutting acp', dir), null);
  fs.rmSync(dir, { recursive: true, force: true });
});

test('parseFrontmatter: regression — CRLF line endings (how these blog files are actually checked in) must still parse every field, not just silently return undefined', () => {
  const crlfText = '---\r\nprimaryKeyword: "cutting acp"\r\npublishDate: "2026-08-26"\r\n---\r\n\r\nbody\r\n';
  const data = parseFrontmatter(crlfText);
  assert.equal(data.primaryKeyword, 'cutting acp');
  assert.equal(data.publishDate, '2026-08-26');
});
