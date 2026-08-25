// Google Drive automated photo sync for Tepat Laser workshop uploads.
// Fetches new photos recursively from the shared Google Drive folder, saves them locally to
// public/images/workshop/, and tracks synced IDs in data/gdrive-synced.json.
//
// Zero-config: works directly on public shared folders without requiring
// Google Cloud IAM, Service Accounts, or OAuth setup.

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = path.resolve(__dirname, '..', '..');
const SYNC_DIR = path.join(REPO_ROOT, 'public', 'images', 'workshop');
const TRACKING_FILE = path.join(REPO_ROOT, 'data', 'gdrive-synced.json');

const DEFAULT_FOLDER_ID = process.env.GDRIVE_WORKSHOP_FOLDER_ID || '1whpVatGSjhpGNiBsK6q6XbzzM3o4UQqp';

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

function sanitizeFilename(name, id) {
  let ext = path.extname(name).toLowerCase();
  if (!ext || ext.length < 2) ext = '.jpg';
  const base = path.basename(name, path.extname(name))
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
  const cleanBase = base || 'workshop-photo';
  return `workshop-${cleanBase}-${id.slice(0, 8)}${ext}`;
}

async function getFolderItems(folderId) {
  const url = `https://drive.google.com/embeddedfolderview?id=${folderId}#list`;
  const res = await fetch(url, {
    headers: {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
    }
  });
  if (!res.ok) {
    throw new Error(`Failed to fetch folderview: HTTP ${res.status}`);
  }
  const html = await res.text();

  const itemRegex = /class="flip-entry"[^>]*id="entry-([^"]+)"[\s\S]*?class="flip-entry-title">([^<]+)<\/div>/g;
  const items = [];
  let m;
  while ((m = itemRegex.exec(html)) !== null) {
    const id = m[1];
    const name = m[2].trim();
    const isFolder = !/\.[a-zA-Z0-9]{2,5}$/.test(name) && !name.startsWith('VID-') && !name.startsWith('VID_') && !name.startsWith('IMG-') && !name.startsWith('Dipindai_');
    items.push({ id, name, isFolder });
  }
  return items;
}

export async function scanFolderRecursive(folderId = DEFAULT_FOLDER_ID, depth = 0) {
  if (depth > 4) return [];
  const items = await getFolderItems(folderId);
  const files = [];

  for (const item of items) {
    if (item.name.startsWith('_')) continue;
    if (item.isFolder) {
      const subFiles = await scanFolderRecursive(item.id, depth + 1);
      files.push(...subFiles);
    } else {
      const isImg = /\.(jpg|jpeg|png|webp)$/i.test(item.name) || item.name.startsWith('IMG-');
      if (isImg) {
        files.push(item);
      }
    }
  }
  return files;
}

async function downloadFile(fileId) {
  const downloadUrl = `https://drive.google.com/uc?export=download&id=${fileId}`;
  const res = await fetch(downloadUrl, {
    headers: {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
    }
  });
  if (!res.ok) {
    throw new Error(`Drive download failed: HTTP ${res.status}`);
  }
  return Buffer.from(await res.arrayBuffer());
}

export async function syncWorkshopPhotos(folderId = DEFAULT_FOLDER_ID) {
  console.log(`📡 Memeriksa folder Google Drive (ID: ${folderId})...`);
  const syncedSet = loadSyncedIds();
  fs.mkdirSync(SYNC_DIR, { recursive: true });

  let remoteImages = [];
  try {
    remoteImages = await scanFolderRecursive(folderId);
  } catch (err) {
    console.warn(`⚠️ GDrive fetch warning: ${err.message}`);
    return { syncedCount: 0, newFiles: [], error: err.message };
  }

  const pending = remoteImages.filter(f => !syncedSet.has(f.id));
  console.log(`   Ditemukan ${remoteImages.length} foto di Drive (${pending.length} foto baru).`);

  const newRecords = [];
  for (const item of pending) {
    try {
      const fileName = sanitizeFilename(item.name, item.id);
      const destPath = path.join(SYNC_DIR, fileName);

      console.log(`   📥 Mengunduh "${item.name}" ➔ ${fileName}...`);
      const buffer = await downloadFile(item.id);
      if (buffer.length < 1000) {
        console.warn(`   ⚠️ File terlalu kecil (${buffer.length} bytes), dilewati: ${item.id}`);
        continue;
      }
      fs.writeFileSync(destPath, buffer);

      syncedSet.add(item.id);
      newRecords.push({
        id: item.id,
        originalName: item.name,
        localFile: `/images/workshop/${fileName}`,
        syncedAt: new Date().toISOString()
      });
      console.log(`   ✅ Tersimpan di lokal: ${destPath}`);
    } catch (e) {
      console.error(`   ❌ Error downloading ${item.id}:`, e.message);
    }
  }

  if (newRecords.length > 0) {
    saveSyncedIds(syncedSet, newRecords);
  }

  return {
    totalInDrive: remoteImages.length,
    newlySynced: newRecords.length,
    files: newRecords
  };
}
