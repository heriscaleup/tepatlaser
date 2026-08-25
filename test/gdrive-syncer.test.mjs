import { test } from 'node:test';
import assert from 'node:assert/strict';

const { scanFolderRecursive, syncWorkshopPhotos } = await import('../scripts/lib/gdrive-syncer.mjs');

function entryHtml(id, name) {
  return `<div class="flip-entry" id="entry-${id}"><div class="flip-entry-title">${name}</div></div>`;
}

function mockFetchSequence(responses) {
  let call = 0;
  global.fetch = async () => {
    const resp = responses[Math.min(call, responses.length - 1)];
    call += 1;
    return {
      ok: resp.ok !== false,
      status: resp.status || 200,
      text: async () => resp.html || '',
      arrayBuffer: async () => resp.buffer || new ArrayBuffer(0)
    };
  };
}

test('scanFolderRecursive: finds a direct image file and skips a video', async () => {
  mockFetchSequence([
    { html: entryHtml('img1', 'IMG-20260101-WA0001.jpg') + entryHtml('vid1', 'VID_20260101_120000.mp4') }
  ]);
  const files = await scanFolderRecursive('root');
  assert.equal(files.length, 1);
  assert.equal(files[0].id, 'img1');
});

test('scanFolderRecursive: recurses into subfolders (entries without a file extension)', async () => {
  mockFetchSequence([
    { html: entryHtml('sub1', 'projek partisi') }, // top level: one subfolder, no extension
    { html: entryHtml('img2', 'IMG-20260102-WA0002.jpg') } // inside the subfolder
  ]);
  const files = await scanFolderRecursive('root');
  assert.equal(files.length, 1);
  assert.equal(files[0].id, 'img2');
});

test('scanFolderRecursive: skips folders whose name starts with underscore', async () => {
  mockFetchSequence([
    { html: entryHtml('logs1', '_omnirank-agent-logs') }
  ]);
  const files = await scanFolderRecursive('root');
  assert.equal(files.length, 0);
});

test('syncWorkshopPhotos: skips suspiciously small downloads instead of saving them', async () => {
  // A too-small buffer (e.g. an interstitial error page instead of real
  // image bytes) must never be written to disk or marked as synced.
  mockFetchSequence([
    { html: entryHtml('small1', 'IMG-broken-WA0099.jpg') },
    { buffer: new ArrayBuffer(5) }
  ]);
  const result = await syncWorkshopPhotos('folder1');
  assert.equal(result.newlySynced, 0);
});
