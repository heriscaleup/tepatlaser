// Google Drive automated photo sync for Tepat Laser workshop uploads.
// Fetches new photos from the shared Google Drive folder, saves them locally to
// public/images/workshop/, and tracks synced IDs in data/gdrive-synced.json.

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
  const ext = path.extname(name).toLowerCase() || '.webp';
  const base = path.basename(name, ext)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
  const cleanBase = base || 'workshop-photo';
  return `workshop-${cleanBase}-${id.slice(0, 8)}${ext}`;
}

export async function parseFolderFiles(folderId = DEFAULT_FOLDER_ID) {
  const url = `https://drive.google.com/drive/folders/${folderId}`;
  const res = await fetch(url, {
    headers: {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
    }
  });
  if (!res.ok) {
    throw new Error(`Failed to access Google Drive folder: HTTP ${res.status}`);
  }
  const html = await res.text();

  const fileRegex = /\["([a-zA-Z0-9_-]{25,})",\["([^"]+\.(?:jpg|jpeg|png|webp))"/gi;
  const files = [];
  const seen = new Set();
  let match;
  while ((match = fileRegex.exec(html)) !== null) {
    const id = match[1];
    const name = match[2];
    if (!seen.has(id)) {
      seen.add(id);
      files.push({ id, name });
    }
  }
  return files;
}

export async function syncWorkshopPhotos(folderId = DEFAULT_FOLDER_ID) {
  console.log(`📡 Memeriksa folder Google Drive (ID: ${folderId})...`);
  const syncedSet = loadSyncedIds();
  fs.mkdirSync(SYNC_DIR, { recursive: true });

  let remoteFiles = [];
  try {
    remoteFiles = await parseFolderFiles(folderId);
  } catch (err) {
    console.warn(`⚠️ GDrive fetch warning: ${err.message}`);
    return { syncedCount: 0, newFiles: [], error: err.message };
  }

  const pending = remoteFiles.filter(f => !syncedSet.has(f.id));
  console.log(`   Ditemukan ${remoteFiles.length} file di Drive (${pending.length} file baru).`);

  const newRecords = [];
  for (const item of pending) {
    try {
      const fileName = sanitizeFilename(item.name, item.id);
      const destPath = path.join(SYNC_DIR, fileName);
      const downloadUrl = `https://drive.google.com/uc?export=download&id=${item.id}`;

      console.log(`   📥 Mengunduh "${item.name}" ➔ ${fileName}...`);
      const dlRes = await fetch(downloadUrl);
      if (!dlRes.ok) {
        console.warn(`   ⚠️ Gagal download file ${item.id}: HTTP ${dlRes.status}`);
        continue;
      }
      const buffer = Buffer.from(await dlRes.arrayBuffer());
      fs.writeFileSync(destPath, buffer);

      syncedSet.add(item.id);
      newRecords.push({
        id: item.id,
        originalName: item.name,
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
