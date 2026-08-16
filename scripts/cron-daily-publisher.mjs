import { publishNextArticle } from './auto-blog-publisher.mjs';

let lastPublishedDate = null;
const TARGET_HOUR = 7; // Jam 07:00 pagi setiap hari

console.log('🤖 AUTONOMOUS DAILY BLOG SCHEDULER ACTIVE 24/7...');
console.log(`⏰ Jadwal Penerbitan Otomatis: Setiap Hari Jam ${TARGET_HOUR}:00 WIB`);
console.log('📱 Laporan Telegram: Otomatis Dikirim Setiap Selesai Publish\n');

async function checkAndPublish() {
  const now = new Date();
  const todayStr = now.toISOString().split('T')[0];
  const currentHour = now.getHours();

  if (currentHour >= TARGET_HOUR && lastPublishedDate !== todayStr) {
    console.log(`[${now.toLocaleTimeString('id-ID')}] 🎯 Waktunya menerbitkan artikel harian baru (${todayStr})...`);
    try {
      await publishNextArticle();
      lastPublishedDate = todayStr;
      console.log(`[${now.toLocaleTimeString('id-ID')}] ✅ Artikel hari ini (${todayStr}) berhasil diterbitkan dan dilaporkan ke Telegram.`);
    } catch (err) {
      console.error(`[${now.toLocaleTimeString('id-ID')}] ❌ Gagal menerbitkan artikel:`, err.message);
    }
  }
}

// Jalankan pengecekan pertama saat start
checkAndPublish();

// Loop cek setiap 30 menit
setInterval(checkAndPublish, 30 * 60 * 1000);
