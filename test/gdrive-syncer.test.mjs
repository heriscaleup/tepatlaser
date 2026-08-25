import { test } from 'node:test';
import assert from 'node:assert/strict';

process.env.GOOGLE_API_KEY = 'test-key';

const { parseFolderFiles, syncWorkshopPhotos } = await import('../scripts/lib/gdrive-syncer.mjs');

function mockFetchSequence(responses) {
  let call = 0;
  global.fetch = async (url) => {
    const resp = responses[Math.min(call, responses.length - 1)];
    call += 1;
    return {
      ok: resp.ok !== false,
      status: resp.status || 200,
      json: async () => resp.json,
      text: async () => JSON.stringify(resp.json || {}),
      arrayBuffer: async () => resp.buffer || new ArrayBuffer(0)
    };
  };
}

test('parseFolderFiles: returns files from a single page', async () => {
  mockFetchSequence([
    { json: { files: [{ id: 'abc123', name: 'foto1.jpg', mimeType: 'image/jpeg', size: '2048' }] } }
  ]);
  const files = await parseFolderFiles('folder1');
  assert.equal(files.length, 1);
  assert.equal(files[0].id, 'abc123');
  assert.equal(files[0].mimeType, 'image/jpeg');
});

test('parseFolderFiles: follows nextPageToken across pages', async () => {
  mockFetchSequence([
    { json: { files: [{ id: 'p1', name: 'a.jpg', mimeType: 'image/jpeg', size: '10' }], nextPageToken: 'tok2' } },
    { json: { files: [{ id: 'p2', name: 'b.png', mimeType: 'image/png', size: '10' }] } }
  ]);
  const files = await parseFolderFiles('folder1');
  assert.equal(files.length, 2);
  assert.deepEqual(files.map(f => f.id), ['p1', 'p2']);
});

test('parseFolderFiles: throws a clear error on API failure', async () => {
  mockFetchSequence([{ ok: false, status: 400, json: { error: { message: 'API key not valid.' } } }]);
  await assert.rejects(() => parseFolderFiles('folder1'), /API key not valid/);
});

test('syncWorkshopPhotos: skips suspiciously small downloads instead of saving them', async () => {
  // A too-small buffer (e.g. an interstitial error page instead of real
  // image bytes) must never be written to disk or marked as synced.
  mockFetchSequence([
    { json: { files: [{ id: 'small1', name: 'broken.jpg', mimeType: 'image/jpeg', size: '5' }] } },
    { buffer: new ArrayBuffer(5) }
  ]);

  const result = await syncWorkshopPhotos('folder1');
  assert.equal(result.newlySynced, 0);
});
