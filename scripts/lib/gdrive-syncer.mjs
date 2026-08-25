// Google Drive automated photo sync for Tepat Laser workshop uploads.
// Fetches new photos from the shared Google Drive folder, saves them locally to
// public/images/workshop/, and tracks synced IDs in data/gdrive-synced.json.
//
// Uses the real Drive API v3 with Service Account JWT Bearer authentication
// (Node's built-in crypto module, zero external SDK/npm dependencies).
// Matches gsc-client.mjs's proven architecture.
//
// Required env var: GDRIVE_SERVICE_ACCOUNT_JSON (or GSC_SERVICE_ACCOUNT_JSON as fallback).
// The Google Drive API must be enabled on the GCP project, and the Drive folder
// must be shared with the Service Account client_email (Viewer access).

import fs from 'fs';
import path from 'path';
import crypto from 'crypto';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = path.resolve(__dirname, '..', '..');
const SYNC_DIR = path.join(REPO_ROOT, 'public', 'images', 'workshop');
const TRACKING_FILE = path.join(REPO_ROOT, 'data', 'gdrive-synced.json');

const DEFAULT_FOLDER_ID = process.env.GDRIVE_WORKSHOP_FOLDER_ID || '1whpVatGSjhpGNiBsK6q6XbzzM3o4UQqp';
const TOKEN_ENDPOINT = 'https://oauth2.googleapis.com/token';
const DRIVE_API_BASE = 'https://www.googleapis.com/drive/v3';

const MIME_EXTENSIONS = {
  'image/jpeg': '.jpg',
  'image/png': '.png',
  'image/webp': '.webp',
  'image/heic': '.heic'
};

let cachedDriveToken = null; // { accessToken, expiresAt }

function loadServiceAccount() {
  const raw = process.env.GDRIVE_SERVICE_ACCOUNT_JSON || process.env.GSC_SERVICE_ACCOUNT_JSON || process.env.GOOGLE_SERVICE_ACCOUNT_JSON;
  if (!raw) return null;
  try {
    return JSON.parse(raw);
  } catch (e) {
    throw new Error(`Service Account JSON is not valid JSON: ${e.message}`);
  }
}

export function isConfigured() {
  return !!(process.env.GDRIVE_SERVICE_ACCOUNT_JSON || process.env.GSC_SERVICE_ACCOUNT_JSON || process.env.GOOGLE_SERVICE_ACCOUNT_JSON);
}

async function getAccessToken() {
  if (cachedDriveToken && cachedDriveToken.expiresAt > Date.now() + 30_000) {
    return cachedDriveToken.accessToken;
  }

  const account = loadServiceAccount();
  if (!account) {
    throw new Error('GDRIVE_SERVICE_ACCOUNT_JSON / GSC_SERVICE_ACCOUNT_JSON is not configured');
  }

  const nowSec = Math.floor(Date.now() / 1000);
  const header = { alg: 'RS256', typ: 'JWT' };
  const claim = {
    iss: account.client_email,
    scope: 'https://www.googleapis.com/auth/drive.readonly',
    aud: TOKEN_ENDPOINT,
    iat: nowSec,
    exp: nowSec + 3600
  };

  const unsigned = `${Buffer.from(JSON.stringify(header)).toString('base64url')}.${Buffer.from(JSON.stringify(claim)).toString('base64url')}`;
  const signature = crypto.createSign('RSA-SHA256').update(unsigned).end().sign(account.private_key).toString('base64url');
  const assertion = `${unsigned}.${signature}`;

  const res = await fetch(TOKEN_ENDPOINT, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer',
      assertion
    })
  });
  const data = await res.json();
  if (!res.ok) {
    throw new Error(`Google Drive auth failed: ${data.error_description || data.error || res.status}`);
  }

  cachedDriveToken = { accessToken: data.access_token, expiresAt: Date.now() + data.expires_in * 1000 };
  return cachedDriveToken.accessToken;
}

function loadSyncedIds() {
  if (!fs.existsSync(TRACKING_FILE)) return new Set();
  try {
    const data = JSON.parse(fs.readFileSync(TRACKING_FILE, 'utf8'));
    return new Set(data.syncedIds || []);
  } catch {
    return new Set();
  }
}

function saveSyncedIds(syncedSet, newRecords = []) {
  fs.mkdirSync(path.dirname(TRACKING_FILE), { recursive: true });
  let existingRecords = [];
  try {
    if (fs.existsSync(TRACKING_FILE)) {
      const data = JSON.parse(fs.readFileSync(TRACKING_FILE, 'utf8'));
      existingRecords = data.history || [];
    }
  } catch {}

  const payload = {
    updatedAt: new Date().toISOString(),
    totalSynced: syncedSet.size,
    syncedIds: Array.from(syncedSet),
    history: [...existingRecords, ...newRecords].slice(-500)
  };
  fs.writeFileSync(TRACKING_FILE, JSON.stringify(payload, null, 2), 'utf8');
}

function sanitizeFilename(name, id, mimeType) {
  const ext = MIME_EXTENSIONS[mimeType] || path.extname(name).toLowerCase() || '.jpg';
  const base = path.basename(name, path.extname(name))
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
  const cleanBase = base || 'workshop-photo';
  return `workshop-${cleanBase}-${id.slice(0, 8)}${ext}`;
}

/**
 * Lists image files directly inside the given Drive folder via Drive API v3.
 */
export async function parseFolderFiles(folderId = DEFAULT_FOLDER_ID) {
  const token = await getAccessToken();
  const files = [];
  let pageToken = null;

  do {
    const params = new URLSearchParams({
      q: `'${folderId}' in parents and trashed = false and mimeType contains 'image/'`,
      fields: 'nextPageToken, files(id, name, mimeType, size)',
      pageSize: '1000'
    });
    if (pageToken) params.set('pageToken', pageToken);

    const res = await fetch(`${DRIVE_API_BASE}/files?${params.toString()}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    const data = await res.json();
    if (!res.ok) {
      throw new Error(`Drive API list failed: ${data.error?.message || res.status}`);
    }

    for (const file of data.files || []) {
      files.push({ id: file.id, name: file.name, mimeType: file.mimeType, size: Number(file.size) || 0 });
    }
    pageToken = data.nextPageToken || null;
  } while (pageToken);

  return files;
}

async function downloadFile(fileId, token) {
  const res = await fetch(`${DRIVE_API_BASE}/files/${fileId}?alt=media`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  if (!res.ok) {
    const body = await res.text().catch(() => '');
    throw new Error(`Drive API download failed: HTTP ${res.status} ${body.slice(0, 200)}`);
  }
  return Buffer.from(await res.arrayBuffer());
}

export async function syncWorkshopPhotos(folderId = DEFAULT_FOLDER_ID) {
  console.log(`📡 Memeriksa folder Google Drive via Drive API (ID: ${folderId})...`);
  if (!isConfigured()) {
    console.warn('⚠️ GSC_SERVICE_ACCOUNT_JSON belum dikonfigurasi — melewati sinkronisasi foto Google Drive.');
    return { syncedCount: 0, newFiles: [], error: 'Service Account not configured' };
  }

  const syncedSet = loadSyncedIds();
  fs.mkdirSync(SYNC_DIR, { recursive: true });

  let remoteFiles = [];
  let token;
  try {
    token = await getAccessToken();
    remoteFiles = await parseFolderFiles(folderId);
  } catch (err) {
    console.warn(`⚠️ GDrive fetch warning: ${err.message}`);
    return { syncedCount: 0, newFiles: [], error: err.message };
  }

  const pending = remoteFiles.filter(f => !syncedSet.has(f.id));
  console.log(`   Ditemukan ${remoteFiles.length} foto di Drive (${pending.length} foto baru).`);

  const newRecords = [];
  for (const item of pending) {
    try {
      const fileName = sanitizeFilename(item.name, item.id, item.mimeType);
      const destPath = path.join(SYNC_DIR, fileName);

      console.log(`   📥 Mengunduh "${item.name}" (${item.mimeType}) ➔ ${fileName}...`);
      const buffer = await downloadFile(item.id, token);
      if (buffer.length < 1000) {
        console.warn(`   ⚠️ File terlalu kecil (${buffer.length} bytes), kemungkinan bukan foto asli — dilewati: ${item.id}`);
        continue;
      }
      fs.writeFileSync(destPath, buffer);

      syncedSet.add(item.id);
      newRecords.push({
        id: item.id,
        originalName: item.name,
        mimeType: item.mimeType,
        localFile: `/images/workshop/${fileName}`,
        syncedAt: new Date().toISOString()
      });
      console.log(`   ✅ Tersimpan: ${destPath}`);
    } catch (e) {
      console.error(`   ❌ Error downloading ${item.id}:`, e.message);
    }
  }

  if (newRecords.length > 0) {
    saveSyncedIds(syncedSet, newRecords);
  }

  return {
    totalInDrive: remoteFiles.length,
    newlySynced: newRecords.length,
    files: newRecords
  };
}
