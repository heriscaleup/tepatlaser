import fs from 'fs';
import path from 'path';

const SITE_HOST = 'tepatlaser.com';
const INDEXNOW_KEY = 'tepatlaser-indexnow-2026';
const KEY_LOCATION = `https://${SITE_HOST}/${INDEXNOW_KEY}.txt`;

// Read all generated URLs from dist or sitemap
const distDir = path.resolve('dist');

function getAllHtmlFiles(dir, baseDir = dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    if (stat && stat.isDirectory()) {
      results = results.concat(getAllHtmlFiles(filePath, baseDir));
    } else if (file === 'index.html') {
      const relPath = path.relative(baseDir, dir).replace(/\\/g, '/');
      const url = relPath ? `https://${SITE_HOST}/${relPath}/` : `https://${SITE_HOST}/`;
      results.push(url);
    }
  } );
  return results;
}

async function pingIndexNow() {
  if (!fs.existsSync(distDir)) {
    console.error('❌ Folder dist belum dibuat. Jalankan npm run build dulu!');
    process.exit(1);
  }

  const urlList = getAllHtmlFiles(distDir);
  console.log(`📡 Ditemukan ${urlList.length} halaman untuk di-submit ke IndexNow...`);

  // Write key file to dist and public if not exists
  const keyContent = INDEXNOW_KEY;
  fs.writeFileSync(path.join('public', `${INDEXNOW_KEY}.txt`), keyContent);
  fs.writeFileSync(path.join('dist', `${INDEXNOW_KEY}.txt`), keyContent);

  const payload = {
    host: SITE_HOST,
    key: INDEXNOW_KEY,
    keyLocation: KEY_LOCATION,
    urlList: urlList
  };

  try {
    const response = await fetch('https://api.indexnow.org/indexnow', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=utf-8'
      },
      body: JSON.stringify(payload)
    });

    if (response.ok || response.status === 200 || response.status === 202) {
      console.log(`✅ BERHASIL! ${urlList.length} URL sudah dikirim langsung ke protokol IndexNow (Bing/Yandex/Search Engines).`);
      console.log(`HTTP Status: ${response.status}`);
    } else {
      console.log(`ℹ️ Response status: ${response.status} (${response.statusText})`);
    }
  } catch (err) {
    console.error('❌ Gagal menghubungi API IndexNow:', err.message);
  }
}

pingIndexNow();
