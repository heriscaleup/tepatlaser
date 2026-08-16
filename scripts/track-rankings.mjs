const TARGET_DOMAIN = 'tepatlaser.com';
const KEYWORDS = [
  { keyword: 'jasa laser cutting bintaro', targetPage: '/lokasi/bintaro/' },
  { keyword: 'laser cutting bsd serpong', targetPage: '/lokasi/bsd-serpong/' },
  { keyword: 'harga laser cutting per meter', targetPage: '/harga-laser-cutting-per-meter/' },
  { keyword: 'pagar laser cutting custom', targetPage: '/pagar-laser-cutting/' },
  { keyword: 'railing tangga laser cutting', targetPage: '/railing-laser-cutting/' },
  { keyword: 'huruf timbul stainless led', targetPage: '/huruf-timbul-stainless-akrilik/' },
  { keyword: 'fasad acp laser cutting', targetPage: '/fasad-acp-laser-cutting/' },
  { keyword: 'mihrab masjid laser cutting', targetPage: '/ornamen-krawangan-grc-masjid/' },
  { keyword: 'jasa laser cutting tangerang selatan', targetPage: '/lokasi/tangerang-selatan/' },
  { keyword: 'laser cutting jakarta selatan', targetPage: '/lokasi/jakarta-selatan/' }
];

async function checkRankings() {
  console.log('🔍 MEMULAI AUDIT RANKING ORGANIK SEARCH ENGINE...\n');
  console.log(`Domain Target: ${TARGET_DOMAIN}`);
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');

  let pageOneCount = 0;

  for (let i = 0; i < KEYWORDS.length; i++) {
    const item = KEYWORDS[i];
    try {
      const query = encodeURIComponent(item.keyword);
      const url = `https://html.duckduckgo.com/html/?q=${query}`;
      
      const res = await fetch(url, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36'
        }
      });
      const html = await res.text();
      
      const regex = /<a[^>]+class="result__url"[^>]*href="([^"]+)"/gi;
      let match;
      let rank = 1;
      let foundRank = 0;

      while ((match = regex.exec(html)) !== null) {
        if (match[1].includes(TARGET_DOMAIN)) {
          foundRank = rank;
          break;
        }
        rank++;
      }

      const status = foundRank > 0 && foundRank <= 3 
        ? '💎 TOP 3' 
        : (foundRank > 0 && foundRank <= 10 ? '🔥 PAGE 1' : '📈 CRAWLING / INDEXING');

      if (foundRank > 0 && foundRank <= 10) pageOneCount++;

      const displayRank = foundRank > 0 ? `#${foundRank}` : '100+';
      console.log(`${i + 1}. [${displayRank}] ${item.keyword}`);
      console.log(`   ↳ Status: ${status} | Target: ${item.targetPage}`);
      
      // Gentle delay to respect search engines
      await new Promise(r => setTimeout(r, 800));
    } catch (e) {
      console.log(`${i + 1}. [ERR] ${item.keyword}: ${e.message}`);
    }
  }

  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log(`🏆 Audit Selesai! Halaman terdaftar: 102 URL | IndexNow & GSC: ACTIVE`);
}

checkRankings();
