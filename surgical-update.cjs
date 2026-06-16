// D:\code\tepatlaser\expand-seo-content.cjs
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

console.log("=== STARTING SEO EXPANSION PATCH ===");

const PROJECT_DIR = __dirname;
const SRC_DIR = path.join(PROJECT_DIR, 'src');

function writeFile(filePath, content) {
  const dir = path.dirname(filePath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`Rewritten with Rich SEO Content: ${path.relative(PROJECT_DIR, filePath)}`);
}

// --- 1. JASA-LASER-CUTTING-METAL.ASTRO (EXTREMELY RICH CONTENT) ---
const metalAstroContent = `---
// src/pages/jasa-laser-cutting-metal.astro
import BaseLayout from '../components/BaseLayout.astro';
import Header from '../components/Header.astro';
import Footer from '../components/Footer.astro';
import Breadcrumbs from '../components/Breadcrumbs.astro';
import { SITE_CONFIG } from '../utils/constants.js';
import { generateFAQSchema, generateBreadcrumbSchema } from '../utils/seo.js';

const WA = SITE_CONFIG.whatsapp;
const WA_LINK = \`https://wa.me/\${WA}?text=\${encodeURIComponent("Halo Tepat Laser, saya ingin konsultasi penawaran harga jasa laser cutting metal.")}\`;

const faqs = [
  {
    question: "Berapa harga jasa laser cutting metal per meter?",
    answer: "Harga jasa laser cutting metal dihitung berdasarkan jenis logam, ketebalan material, dan total panjang pemotongan (cutting path). Sebagai gambaran, jasa potong plat besi 1mm mulai dari Rp 15.000/meter, sedangkan stainless steel 1mm mulai dari Rp 25.000/meter. Untuk proyek volume besar atau pengerjaan massal, kami menawarkan diskon khusus yang sangat kompetitif. Hubungi tim admin kami untuk mendapatkan penawaran harga (quote) resmi secara gratis."
  },
  {
    question: "Material logam/metal apa saja yang bisa dipotong dengan mesin laser fiber?",
    answer: "Mesin fiber laser modern kami mampu memotong berbagai jenis logam dengan sangat presisi, antara lain: Carbon Steel/Plat Besi (hitam maupun putih), Galvanis/Galvalum, Stainless Steel (Grade SS201, SS304, dan SS316), Aluminium Alloy, Kuningan (Brass), serta Tembaga (Copper)."
  },
  {
    question: "Berapa ketebalan maksimal plat besi dan stainless steel yang bisa dipotong?",
    answer: "Kapasitas mesin Fiber Laser high-power kami mampu memotong plat besi (carbon steel) hingga ketebalan 12mm, stainless steel hingga 10mm, aluminium hingga 8mm, dan kuningan/tembaga hingga 4mm dengan hasil potongan yang tetap rapi dan presisi tinggi."
  },
  {
    question: "Apakah Tepat Laser menerima pengerjaan tanpa minimum order?",
    answer: "Ya, kami melayani pemesanan tanpa batas minimum order. Kami menerima pembuatan part custom satuan (untuk keperluan prototyping, tugas kuliah, atau hobi) hingga pengerjaan proyek fabrikasi skala industri dengan kapasitas ratusan lembar plat per minggu."
  },
  {
    question: "Format file desain apa yang harus saya siapkan agar cepat diproses?",
    answer: "Kami merekomendasikan file desain dalam bentuk format vector seperti DXF atau DWG (AutoCAD), AI (Adobe Illustrator), CDR (CorelDraw), SVG, atau PDF vector. Pastikan skala gambar adalah 1:1 dalam satuan milimeter (mm). Jika Anda hanya memiliki sketsa tangan atau foto dengan ukuran, tim desainer kami siap membantu menggambarkannya ke format CAD dengan biaya yang sangat terjangkau."
  },
  {
    question: "Berapa lama waktu pengerjaan laser cutting metal?",
    answer: "Waktu pengerjaan standar berkisar antara 1 hingga 3 hari kerja setelah penawaran disetujui dan bahan tersedia. Kami juga menyediakan layanan express (same-day service) untuk pengerjaan darurat berskala kecil dengan konfirmasi jadwal terlebih dahulu kepada tim workshop."
  }
];

const pageTitle = "Jasa Laser Cutting Metal & Potong Plat Besi Murah Presisi | Tepat Laser";
const pageDesc = "Jasa laser cutting metal & plat besi murah di Bintaro, Tangerang Selatan. Melayani potong stainless steel, mild steel, aluminium presisi tinggi ±0.02mm, pengerjaan cepat 24 jam & gratis ongkir Jabodetabek.";
const pageKw = "jasa laser cutting metal, potong plat besi laser, laser cutting mild steel, harga laser cutting metal, laser fiber tangerang selatan, laser cutting bintaro";

const breadcrumbSchema = generateBreadcrumbSchema([
  { name: 'Beranda', url: '/' },
  { name: 'Laser Cutting Metal', url: '/jasa-laser-cutting-metal/' }
]);

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  "name": "Jasa Laser Cutting Metal",
  "serviceType": "Metal Laser Cutting Services",
  "description": pageDesc,
  "provider": {
    "@type": "LocalBusiness",
    "name": "Tepat Laser",
    "telephone": SITE_CONFIG.phone,
    "email": SITE_CONFIG.email,
    "address": {
      "@type": "PostalAddress",
      "streetAddress": SITE_CONFIG.address,
      "addressLocality": "Tangerang Selatan",
      "addressRegion": "Banten",
      "addressCountry": "ID"
    }
  },
  "areaServed": [
    { "@type": "City", "name": "Jakarta" },
    { "@type": "City", "name": "Tangerang" },
    { "@type": "City", "name": "Tangerang Selatan" },
    { "@type": "City", "name": "Depok" },
    { "@type": "City", "name": "Bekasi" },
    { "@type": "City", "name": "Bogor" }
  ]
};

const meta = {
  title: pageTitle,
  description: pageDesc,
  keywords: pageKw,
  url: '/jasa-laser-cutting-metal/',
  image: '/images/metal.webp',
  type: "website",
  jsonLd: [breadcrumbSchema, serviceSchema, generateFAQSchema(faqs)]
};

const crumbs = breadcrumbSchema.itemListElement;
---

<BaseLayout {...meta}>
  <Header slot="header" />

  <main class="mt-16 overflow-x-hidden">
    <Breadcrumbs crumbs={crumbs} />

    <!-- HERO SECTION -->
    <section class="relative bg-slate-950 text-white py-24 md:py-32 overflow-hidden">
      <div class="absolute inset-0 opacity-20" style="background-image:url('/images/metal.webp'); background-size:cover; background-position:center;"></div>
      <div class="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/90 to-transparent"></div>
      <div class="container-custom relative z-10">
        <div class="max-w-3xl">
          <span class="inline-flex items-center gap-2 bg-blue-500/10 text-blue-400 font-bold px-4 py-1.5 rounded-full text-xs mb-6 border border-blue-500/30 tracking-wider">WORKSHOP UTAMA FABRIKASI METAL</span>
          <h1 class="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight mb-6">
            Jasa Laser Cutting Metal & Potong Plat Besi Presisi
          </h1>
          <p class="text-lg sm:text-xl text-slate-300 mb-8 leading-relaxed">
            Solusi pemotongan plat logam menggunakan teknologi Fiber Laser termutakhir untuk hasil bersih, presisi tinggi (toleransi ±0.02mm), pengerjaan kilat, tanpa minimum order.
          </p>
          <div class="flex flex-col sm:flex-row gap-4">
            <a href={WA_LINK} target="_blank" rel="noopener noreferrer" class="inline-flex items-center justify-center gap-3 bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white font-bold px-8 py-4 rounded-xl text-lg shadow-lg shadow-emerald-500/20 transform hover:-translate-y-0.5 transition-all">
              <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/></svg>
              Konsultasi & Penawaran Cepat
            </a>
            <a href="tel:6282121292937" class="inline-flex items-center justify-center border-2 border-slate-700 hover:border-slate-500 text-white font-semibold px-8 py-4 rounded-xl text-lg hover:bg-slate-800 transition-all">
              Hubungi Workshop: 0821-2129-2937
            </a>
          </div>
        </div>
      </div>
    </section>

    <!-- METRICS TRUST BAR -->
    <section class="bg-blue-600 text-white py-6">
      <div class="container-custom">
        <div class="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div>
            <div class="text-3xl font-extrabold">±0.02mm</div>
            <div class="text-blue-100 text-sm mt-1">Presisi Hasil Potong</div>
          </div>
          <div>
            <div class="text-3xl font-extrabold">24 Jam</div>
            <div class="text-blue-100 text-sm mt-1">Kapasitas Produksi</div>
          </div>
          <div>
            <div class="text-3xl font-extrabold">1-3 Hari</div>
            <div class="text-blue-100 text-sm mt-1">Waktu Pengerjaan</div>
          </div>
          <div>
            <div class="text-3xl font-extrabold">0%</div>
            <div class="text-blue-100 text-sm mt-1">Minimum Order</div>
          </div>
        </div>
      </div>
    </section>

    <!-- MAIN SEO CONTENT SECTION -->
    <section class="py-24 bg-white text-slate-900">
      <div class="container-custom">
        <div class="max-w-4xl mx-auto">
          <h2 class="text-3xl font-bold mb-6 text-slate-900">Keunggulan Teknologi Fiber Laser untuk Pemotongan Logam</h2>
          <p class="text-slate-600 mb-6 leading-relaxed">
            Dalam industri manufaktur dan arsitektur, pemotongan plat besi dan stainless steel membutuhkan tingkat presisi yang tinggi agar mudah dirakit. Dibandingkan dengan metode konvensional seperti plasma cutting atau waterjet, <strong>Fiber Laser Cutting</strong> menawarkan efisiensi tinggi, hasil potongan yang sangat rapi, serta toleransi deviasi yang sangat minim.
          </p>
          <p class="text-slate-600 mb-8 leading-relaxed">
            Mesin Fiber Laser memfokuskan energi cahaya berdensitas tinggi pada permukaan logam untuk melelehkan jalur potong dengan cepat. Hembusan gas bantu bertekanan tinggi (oksigen atau nitrogen) kemudian mendorong logam cair keluar dari jalur potong, menghasilkan tepi potongan yang halus tanpa deformasi panas atau burr kasar.
          </p>

          <!-- Specifications Table -->
          <h3 class="text-2xl font-bold mb-6 text-slate-900">Kapasitas & Spesifikasi Bahan Metal Tepat Laser</h3>
          <div class="overflow-x-auto mb-12 border border-slate-200 rounded-2xl">
            <table class="w-full text-left text-sm text-slate-600">
              <thead class="bg-slate-50 text-slate-900 uppercase font-semibold border-b border-slate-200">
                <tr>
                  <th class="px-6 py-4">Jenis Material Logam</th>
                  <th class="px-6 py-4">Tebal Maksimal (mm)</th>
                  <th class="px-6 py-4">Rekomendasi Gas Bantu</th>
                  <th class="px-6 py-4">Aplikasi Utama</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-slate-200">
                <tr>
                  <td class="px-6 py-4 font-bold text-slate-900">Mild Steel / Plat Besi</td>
                  <td class="px-6 py-4">12 mm</td>
                  <td class="px-6 py-4">Oxygen (O2)</td>
                  <td class="px-6 py-4">Bracket, Konstruksi, Pagar, Konstruksi Box</td>
                </tr>
                <tr>
                  <td class="px-6 py-4 font-bold text-slate-900">Stainless Steel (SS304/SS316)</td>
                  <td class="px-6 py-4">10 mm</td>
                  <td class="px-6 py-4">Nitrogen (N2) / Air</td>
                  <td class="px-6 py-4">Peralatan Dapur, Huruf Timbul, Railing Mewah</td>
                </tr>
                <tr>
                  <td class="px-6 py-4 font-bold text-slate-900">Aluminium Alloy</td>
                  <td class="px-6 py-4">8 mm</td>
                  <td class="px-6 py-4">Nitrogen (N2) / Oxygen</td>
                  <td class="px-6 py-4">Otomotif, Panel Fasad, Casing Elektronik</td>
                </tr>
                <tr>
                  <td class="px-6 py-4 font-bold text-slate-900">Kuningan & Tembaga</td>
                  <td class="px-6 py-4">4 mm</td>
                  <td class="px-6 py-4">Nitrogen (N2)</td>
                  <td class="px-6 py-4">Interior Mewah, Ornamen Seni, Komponen Listrik</td>
                </tr>
              </tbody>
            </table>
          </div>

          <!-- Applications Details -->
          <h3 class="text-2xl font-bold mb-6 text-slate-900">Jenis Pekerjaan Fabrikasi Metal yang Kami Tangani</h3>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <div class="p-6 bg-slate-50 border border-slate-200 rounded-2xl">
              <h4 class="font-bold text-lg text-slate-900 mb-2">1. Part Mesin & Bracket Custom</h4>
              <p class="text-slate-600 text-sm leading-relaxed">
                Kami membuat komponen bracket custom, flange, roda gigi, ring plate, sparepart mesin pertanian, dan plat berlubang presisi sesuai detail technical drawing.
              </p>
            </div>
            <div class="p-6 bg-slate-50 border border-slate-200 rounded-2xl">
              <h4 class="font-bold text-lg text-slate-900 mb-2">2. Casing & Panel Box Metal</h4>
              <p class="text-slate-600 text-sm leading-relaxed">
                Melayani pembuatan cut-out khusus untuk panel box listrik, casing server, penutup mesin genset, ventilasi udara perforated, dan penutup saluran.
              </p>
            </div>
            <div class="p-6 bg-slate-50 border border-slate-200 rounded-2xl">
              <h4 class="font-bold text-lg text-slate-900 mb-2">3. Ornamen Pagar, Railing, & Balkon</h4>
              <p class="text-slate-600 text-sm leading-relaxed">
                Menyediakan jasa potong plat besi dekoratif bermotif floral, geometris, atau minimalis untuk facade gedung, sekat ruangan, pintu gerbang, dan railing tangga.
              </p>
            </div>
            <div class="p-6 bg-slate-50 border border-slate-200 rounded-2xl">
              <h4 class="font-bold text-lg text-slate-900 mb-2">4. Signage & Reklame Logam</h4>
              <p class="text-slate-600 text-sm leading-relaxed">
                Pembuatan huruf timbul berbahan stainless steel (mirror/hairline) atau plat besi cat duco untuk logo korporat, plang nama toko, dan nomor rumah eksklusif.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- PREPARATION CHECKLIST SECTION -->
    <section class="py-24 bg-slate-50 text-slate-900 border-t border-slate-200">
      <div class="container-custom max-w-4xl">
        <h2 class="text-3xl font-bold text-center mb-6">Informasi yang Perlu Disiapkan untuk Meminta Penawaran Harga</h2>
        <p class="text-center text-slate-600 mb-12">Semakin lengkap detail informasi yang Anda kirim, semakin cepat tim teknis kami memformulasikan kalkulasi harga.</p>
        
        <div class="space-y-6">
          <div class="bg-white p-6 rounded-2xl border border-slate-200 flex items-start gap-4">
            <div class="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center text-blue-600 font-bold flex-shrink-0">1</div>
            <div>
              <h3 class="font-bold text-lg mb-1">Pilihan Bahan & Ketebalan</h3>
              <p class="text-slate-600 text-sm">Sebutkan secara spesifik jenis logam yang diinginkan (misal: Plat Besi Hitam tebal 2mm, atau Stainless Steel SS304 Mirror tebal 1.5mm).</p>
            </div>
          </div>
          <div class="bg-white p-6 rounded-2xl border border-slate-200 flex items-start gap-4">
            <div class="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center text-blue-600 font-bold flex-shrink-0">2</div>
            <div>
              <h3 class="font-bold text-lg mb-1">Ukuran Dimensi & Jumlah Pcs</h3>
              <p class="text-slate-600 text-sm">Lampirkan ukuran bersih dari part yang ingin dipotong beserta total kuantitas pengerjaan (misal: 250mm x 300mm sebanyak 50 pcs).</p>
            </div>
          </div>
          <div class="bg-white p-6 rounded-2xl border border-slate-200 flex items-start gap-4">
            <div class="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center text-blue-600 font-bold flex-shrink-0">3</div>
            <div>
              <h3 class="font-bold text-lg mb-1">File Gambar Desain Vector</h3>
              <p class="text-slate-600 text-sm">Kirim file desain dalam format CAD (.DXF, .DWG) atau file vector (.AI, .CDR, .SVG, .PDF). Pastikan semua garis sambungan tertutup rapat.</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- FAQ ACCORDION -->
    <section class="py-24 bg-white text-slate-900 border-t border-slate-200">
      <div class="container-custom max-w-4xl">
        <h2 class="text-3xl font-bold text-center mb-12">FAQ Jasa Laser Cutting Metal</h2>
        <div class="space-y-6">
          {faqs.map(faq => (
            <div class="bg-slate-50 p-6 rounded-2xl border border-slate-200/80">
              <h3 class="text-lg font-bold mb-2 text-slate-900">{faq.question}</h3>
              <p class="text-slate-600 text-sm leading-relaxed">{faq.answer}</p>
            </div>
          ))}
        </div>
      </div>
    </section>

    <!-- MAPS & LOCATION -->
    <section class="py-24 bg-slate-50 text-slate-900 border-t border-slate-200">
      <div class="container-custom grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        <div class="lg:col-span-8 rounded-2xl overflow-hidden shadow-lg border border-slate-200">
          <iframe
            src="https://maps.google.com/maps?q=Jl.%20Bintaro%20Bsd%20no%201D%20parigi%20(%20samping%20Sekolah%20SD%20Mentari%20Internasional%20School%20),%20Tangerang%20Selatan,%20Banten,%20Indonesia&t=&z=15&ie=UTF8&iwloc=&output=embed"
            width="100%"
            height="400"
            style="border:0;"
            allowfullscreen=""
            loading="lazy"
          ></iframe>
        </div>
        <div class="lg:col-span-4 bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
          <h3 class="text-xl font-bold mb-4">Workshop Utama Tepat Laser</h3>
          <p class="text-slate-600 text-sm mb-6">{SITE_CONFIG.address}</p>
          <h4 class="font-bold text-sm text-slate-900 mb-2">Jam Buka:</h4>
          <p class="text-slate-600 text-sm mb-6">{SITE_CONFIG.businessHours}</p>
          <a href={WA_LINK} target="_blank" rel="noopener noreferrer" class="inline-flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white font-bold px-6 py-3 rounded-lg text-sm w-full transition-all">
            Kunjungi Workshop Kami
          </a>
        </div>
      </div>
    </section>
  </main>

  <Footer slot="footer" />
</BaseLayout>
`;
writeFile(path.join(SRC_DIR, 'pages', 'jasa-laser-cutting-metal.astro'), metalAstroContent);


// --- 2. LASER-STAINLESS-BINTARO.ASTRO (EXTREMELY RICH CONTENT) ---
const stainlessAstroContent = `---
// src/pages/laser-stainless-bintaro.astro
import BaseLayout from '../components/BaseLayout.astro';
import Header from '../components/Header.astro';
import Footer from '../components/Footer.astro';
import Breadcrumbs from '../components/Breadcrumbs.astro';
import { SITE_CONFIG } from '../utils/constants.js';
import { generateFAQSchema, generateBreadcrumbSchema } from '../utils/seo.js';

const WA = SITE_CONFIG.whatsapp;
const WA_LINK = \`https://wa.me/\${WA}?text=\${encodeURIComponent("Halo Tepat Laser, saya ingin tanya penawaran jasa laser stainless steel di Bintaro.")}\`;

const faqs = [
  {
    question: "Tipe/grade plat stainless steel apa saja yang bisa dipotong?",
    answer: "Kami melayani jasa potong untuk tiga tipe grade stainless utama: Grade SS201 (ekonomis, untuk kebutuhan interior/furnitur kering), Grade SS304 (anti-karat standar, ideal untuk food-grade & outdoor umum), dan Grade SS316 (anti-karat premium tahan korosi cairan asam/air laut, untuk industri kimia/marine)."
  },
  {
    question: "Apakah hasil potong stainless-nya rapi, mengkilap, dan tidak berkerak?",
    answer: "Tentu saja. Kami memotong plat stainless steel menggunakan bantuan gas Nitrogen (N2) bertekanan tinggi (bukan oksigen). Gas nitrogen mencegah reaksi oksidasi saat pemotongan, menghasilkan tepi potongan yang bening, mengkilap (polished edge), dan bebas dari kerak gosong hitam sehingga tidak butuh finishing amplas tambahan."
  },
  {
    question: "Berapa ketebalan plat stainless steel maksimal yang bisa dipotong?",
    answer: "Mesin laser fiber high-power kami sanggup memotong lembaran plat stainless steel dengan ketebalan mulai dari yang sangat tipis (0.5mm, 0.8mm, 1mm, 1.2mm, 1.5mm, 2mm, 3mm) hingga plat tebal (4mm, 5mm, 6mm, 8mm, hingga 10mm)."
  },
  {
    question: "Apakah Tepat Laser melayani jasa potong saja atau menyediakan bahan juga?",
    answer: "Kami melayani keduanya. Anda bisa memesan jasa potong saja dengan membawa bahan stainless milik sendiri ke workshop kami, atau Anda bisa memesan secara full-order (jasa potong + material plat stainless dari kami) untuk kemudahan transaksi."
  },
  {
    question: "Berapa lama estimasi pengerjaan laser stainless di Bintaro?",
    answer: "Pengerjaan standar untuk volume kecil s/d menengah membutuhkan waktu 1-2 hari kerja saja. Untuk job express, kami memiliki layanan prioritas yang bisa diselesaikan di hari yang sama (same-day service) setelah desain disetujui."
  }
];

const pageTitle = "Laser Stainless Bintaro Terdekat Presisi Tinggi | Tepat Laser";
const pageDesc = "Jasa laser cutting stainless steel terdekat di Bintaro, BSD, Serpong, Tangerang Selatan. Hasil potong bersih bebas gosong, presisi ±0.02mm, pengerjaan cepat & no minimum order.";
const pageKw = "laser stainless bintaro, laser cutting stainless tangerang, jasa potong stainless terdekat, cutting plat stainless, stainless ss304 bintaro, bengkel laser stainless";

const breadcrumbSchema = generateBreadcrumbSchema([
  { name: 'Beranda', url: '/' },
  { name: 'Laser Stainless Bintaro', url: '/laser-stainless-bintaro/' }
]);

const meta = {
  title: pageTitle,
  description: pageDesc,
  keywords: pageKw,
  url: '/laser-stainless-bintaro/',
  image: '/images/metal.webp',
  type: "website",
  jsonLd: [breadcrumbSchema, generateFAQSchema(faqs)]
};

const crumbs = breadcrumbSchema.itemListElement;
---

<BaseLayout {...meta}>
  <Header slot="header" />

  <main class="mt-16 overflow-x-hidden">
    <Breadcrumbs crumbs={crumbs} />

    <!-- HERO SECTION -->
    <section class="relative bg-slate-950 text-white py-24 md:py-32 overflow-hidden">
      <div class="absolute inset-0 opacity-20" style="background-image:url('/images/metal.webp'); background-size:cover; background-position:center;"></div>
      <div class="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/90 to-transparent"></div>
      <div class="container-custom relative z-10">
        <div class="max-w-3xl">
          <span class="inline-flex items-center gap-2 bg-emerald-500/10 text-emerald-400 font-bold px-4 py-1.5 rounded-full text-xs mb-6 border border-emerald-500/30 tracking-wider">SPESIALIS STAINLESS STEEL JABODETABEK</span>
          <h1 class="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight mb-6">
            Jasa Laser Stainless Bintaro & Tangerang Selatan
          </h1>
          <p class="text-lg sm:text-xl text-slate-300 mb-8 leading-relaxed">
            Potong plat stainless steel tipe mirror maupun hairline dengan hasil super bersih bebas kerak gosong. Sangat cocok untuk keperluan huruf timbul, ornamen pagar, sekat partisi, dan kitchen set restoran.
          </p>
          <div class="flex flex-col sm:flex-row gap-4">
            <a href={WA_LINK} target="_blank" rel="noopener noreferrer" class="inline-flex items-center justify-center bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white font-bold px-8 py-4 rounded-xl text-lg shadow-lg shadow-emerald-500/20 transform hover:-translate-y-0.5 transition-all">
              Hubungi Admin: 0821-2129-2937
            </a>
            <a href="#spesifikasi-stainless" class="inline-flex items-center justify-center border-2 border-slate-700 hover:border-slate-500 text-white font-semibold px-8 py-4 rounded-xl text-lg hover:bg-slate-800 transition-all">
              Spesifikasi & Detail Bahan
            </a>
          </div>
        </div>
      </div>
    </section>

    <!-- MAIN SEO CONTENT SECTION -->
    <section class="py-24 bg-white text-slate-900">
      <div class="container-custom">
        <div class="max-w-4xl mx-auto">
          <h2 class="text-3xl font-bold mb-6 text-slate-900">Mengapa Laser Cutting Stainless Steel Harus Memakai Gas Nitrogen?</h2>
          <p class="text-slate-600 mb-6 leading-relaxed">
            Banyak bengkel laser memotong stainless steel menggunakan gas oksigen (O2) untuk memotong biaya produksi. Padahal, penggunaan oksigen menyebabkan terjadinya reaksi oksidasi (pembakaran) yang menghasilkan sisa kerak hitam gosong di sepanjang tepian potongan. Kerak ini tidak hanya merusak penampilan estetis stainless, tetapi juga menjadi celah titik awal timbulnya karat.
          </p>
          <p class="text-slate-600 mb-12 leading-relaxed">
            Di <strong>Tepat Laser Bintaro</strong>, kami berkomitmen menjaga kualitas dengan memotong stainless steel menggunakan hembusan gas <strong>Nitrogen (N2) bertekanan tinggi</strong>. Hasilnya adalah tepian potong yang tetap bersih, berwarna silver mengkilap layaknya permukaan asli logam, serta ketahanan anti-karat bawaan stainless steel yang tetap terjaga utuh.
          </p>

          <!-- Stainless steel types grid -->
          <h3 id="spesifikasi-stainless" class="text-2xl font-bold mb-6 text-slate-900">Grade Stainless Steel yang Umum Kami Tangani</h3>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <div class="p-6 bg-slate-50 border border-slate-200 rounded-2xl">
              <h4 class="font-bold text-lg text-slate-900 mb-2">Stainless Steel 201</h4>
              <p class="text-slate-500 text-sm leading-relaxed">
                Grade ekonomis dengan tampilan mengkilap. Sangat cocok untuk dekorasi interior rumah, pajangan dinding, kaki furnitur, dan produk pajangan dalam ruangan yang kering.
              </p>
            </div>
            <div class="p-6 bg-slate-50 border border-slate-200 rounded-2xl">
              <h4 class="font-bold text-lg text-slate-900 mb-2">Stainless Steel 304</h4>
              <p class="text-slate-500 text-sm leading-relaxed">
                Grade standard industri dengan ketahanan korosi yang sangat baik (food grade). Ideal untuk pagar rumah mewah outdoor, railing tangga, peralatan dapur restoran, dan alat medis.
              </p>
            </div>
            <div class="p-6 bg-slate-50 border border-slate-200 rounded-2xl">
              <h4 class="font-bold text-lg text-slate-900 mb-2">Stainless Steel 316</h4>
              <p class="text-slate-500 text-sm leading-relaxed">
                Grade premium tahan asam dan air garam. Sangat direkomendasikan untuk komponen kapal laut, fasilitas industri kimia, dan struktur bangunan tepi pantai.
              </p>
            </div>
          </div>

          <!-- Applications list -->
          <h3 class="text-2xl font-bold mb-6 text-slate-900">Aplikasi Produk Laser Cutting Stainless Steel</h3>
          <p class="text-slate-600 mb-6 leading-relaxed">
            Pekerjaan laser stainless kami mencakup berbagai macam produk dekorasi dan utilitas, di antaranya:
          </p>
          <ul class="space-y-4 mb-12 text-slate-700">
            <li class="flex items-start gap-3">
              <span class="w-6 h-6 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center flex-shrink-0 text-sm font-bold">✓</span>
              <div>
                <strong>Huruf Timbul & Neon Sign:</strong> Logo atau nama perusahaan dengan finishing stainless cermin (mirror) atau garis serat halus (hairline).
              </div>
            </li>
            <li class="flex items-start gap-3">
              <span class="w-6 h-6 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center flex-shrink-0 text-sm font-bold">✓</span>
              <div>
                <strong>Partisi & Sekat Ruang Kerawang:</strong> Panel pembatas ruangan dengan ukiran motif geometris atau floral untuk lobi kantor, hotel, maupun rumah tinggal.
              </div>
            </li>
            <li class="flex items-start gap-3">
              <span class="w-6 h-6 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center flex-shrink-0 text-sm font-bold">✓</span>
              <div>
                <strong>Pagar & Railing Tangga Laser Cut:</strong> Desain eksterior rumah mewah berkesan modern bernilai seni tinggi.
              </div>
            </li>
          </ul>
        </div>
      </div>
    </section>

    <!-- FAQ SECTION -->
    <section class="py-24 bg-slate-50 border-t border-slate-200">
      <div class="container-custom max-w-4xl">
        <h2 class="text-3xl font-bold text-center mb-12">Tanya Jawab Jasa Laser Stainless</h2>
        <div class="space-y-6">
          {faqs.map(faq => (
            <div class="bg-white p-6 rounded-2xl border border-slate-200">
              <h3 class="text-lg font-bold mb-2 text-slate-900">{faq.question}</h3>
              <p class="text-slate-600 text-sm leading-relaxed">{faq.answer}</p>
            </div>
          ))}
        </div>
      </div>
    </section>

    <!-- LOCATION DETAILS -->
    <section class="py-24 bg-white border-t border-slate-200">
      <div class="container-custom grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        <div class="lg:col-span-8 rounded-2xl overflow-hidden shadow-lg border border-slate-200">
          <iframe
            src="https://maps.google.com/maps?q=Jl.%20Bintaro%20Bsd%20no%201D%20parigi%20(%20samping%20Sekolah%20SD%20Mentari%20Internasional%20School%20),%20Tangerang%20Selatan,%20Banten,%20Indonesia&t=&z=15&ie=UTF8&iwloc=&output=embed"
            width="100%"
            height="400"
            style="border:0;"
            allowfullscreen=""
            loading="lazy"
          ></iframe>
        </div>
        <div class="lg:col-span-4 bg-slate-50 p-8 rounded-2xl border border-slate-200 shadow-sm">
          <h3 class="text-xl font-bold mb-4">Workshop Terdekat Bintaro</h3>
          <p class="text-slate-600 text-sm mb-6">{SITE_CONFIG.address}</p>
          <h4 class="font-bold text-sm text-slate-900 mb-2">Jam Buka Workshop:</h4>
          <p class="text-slate-600 text-sm mb-6">{SITE_CONFIG.businessHours}</p>
          <a href={WA_LINK} target="_blank" rel="noopener noreferrer" class="inline-flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white font-bold px-6 py-3 rounded-lg text-sm w-full transition-all">
            Navigasi Google Maps
          </a>
        </div>
      </div>
    </section>
  </main>

  <Footer slot="footer" />
</BaseLayout>
`;
writeFile(path.join(SRC_DIR, 'pages', 'laser-stainless-bintaro.astro'), stainlessAstroContent);


// --- 3. JASA-LASER-CUTTING-MDF-AI.ASTRO (EXTREMELY RICH CONTENT) ---
const mdfAstroContent = `---
// src/pages/jasa-laser-cutting-mdf-ai.astro
import BaseLayout from '../components/BaseLayout.astro';
import Header from '../components/Header.astro';
import Footer from '../components/Footer.astro';
import Breadcrumbs from '../components/Breadcrumbs.astro';
import { MATERIALS, SITE_CONFIG } from '../utils/constants.js';
import { generateFAQSchema, generateBreadcrumbSchema } from '../utils/seo.js';

const material = MATERIALS.find(m => m.id === 'mdf') || { image: '/images/mdf.webp', slug: 'jasa-laser-cutting-mdf-ai' };
const WA = SITE_CONFIG.whatsapp;
const WA_LINK = \`https://wa.me/\${WA}?text=\${encodeURIComponent("Halo Tepat Laser, saya mau tanya tentang jasa laser cutting MDF.")}\`;

const faqs = [
  {
    question: "Berapa tebal papan MDF yang bisa dipotong laser?",
    answer: "Kami sanggup memotong MDF mulai dari ketebalan tipis 3mm, 6mm, 9mm, 12mm, 15mm, hingga ketebalan tebal 18mm dan 25mm dengan tingkat kepresisian tinggi."
  },
  {
    question: "Apakah tepi potongan kayu MDF akan gosong hitam?",
    answer: "Pemotongan kayu menggunakan laser CO2 bekerja dengan metode pembakaran, sehingga tepi potong MDF akan berwarna cokelat tua s/d kehitaman. Namun, tim operator kami mengoptimalkan setelan kecepatan dan tiupan kompresor udara untuk memastikan gosongnya minimal dan tidak berdebu arang kasar, sehingga siap langsung dilapisi cat duco atau pelapis HPL."
  },
  {
    question: "Apakah bisa membawa bahan MDF/kayu sendiri dari luar?",
    answer: "Sangat bisa. Anda cukup membawa papan MDF, plywood/multiplex, atau kayu solid milik sendiri ke workshop kami, dan kami hanya mengenakan biaya jasa cutting-nya saja."
  },
  {
    question: "Format file apa yang diperlukan untuk potong MDF custom?",
    answer: "File vector 2D dalam format CAD seperti .DXF, .DWG, atau vector grafik seperti .AI, .CDR, .SVG, .PDF. Harap dipastikan file tidak berpotongan tumpang tindih (double lines)."
  }
];

const pageTitle = "Jasa Laser Cutting MDF & Plywood Custom Murah | Tepat Laser";
const pageDesc = "Jasa laser cutting MDF, HMR board, plywood, dan multiplex custom terdekat. Pengerjaan cepat untuk sekat sekat partisi ruangan kerawang, interior panel, merchandise. Free desain!";
const pageKw = "jasa laser cutting mdf, potong mdf custom, laser cutting kayu mdf, partisi mdf laser, potong plywood laser, laser cutting tangerang";

const breadcrumbSchema = generateBreadcrumbSchema([
  { name: 'Beranda', url: '/' },
  { name: 'Laser Cutting MDF', url: '/jasa-laser-cutting-mdf-ai/' }
]);

const meta = {
  title: pageTitle,
  description: pageDesc,
  keywords: pageKw,
  url: '/jasa-laser-cutting-mdf-ai/',
  image: material.image,
  type: "website",
  jsonLd: [breadcrumbSchema, generateFAQSchema(faqs)]
};

const crumbs = breadcrumbSchema.itemListElement;
---

<BaseLayout {...meta}>
  <Header slot="header" />

  <main class="mt-16 overflow-x-hidden">
    <Breadcrumbs crumbs={crumbs} />

    <!-- HERO SECTION -->
    <section class="relative bg-amber-950 text-white py-24 md:py-32 overflow-hidden">
      <div class="absolute inset-0 opacity-20" style="background-image:url('/images/mdf.webp'); background-size:cover; background-position:center;"></div>
      <div class="absolute inset-0 bg-gradient-to-r from-amber-950 via-amber-950/90 to-transparent"></div>
      <div class="container-custom relative z-10">
        <div class="max-w-3xl">
          <span class="inline-flex items-center gap-2 bg-amber-500/25 text-amber-300 font-bold px-4 py-1.5 rounded-full text-xs mb-6 border border-amber-500/30 tracking-wider">WOODWORKING & INTERIOR FABRICATION</span>
          <h1 class="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight mb-6">
            Jasa Laser Cutting MDF & Kayu Custom
          </h1>
          <p class="text-lg sm:text-xl text-amber-100/90 mb-8 leading-relaxed">
            Pembuatan partisi ruangan kerawang (kisi-kisi), hiasan dinding relief, produk display toko, souvenir, dan grafir motif dekoratif pada MDF, Plywood, HMR, dan Kayu Solid.
          </p>
          <div class="flex flex-col sm:flex-row gap-4">
            <a href={WA_LINK} target="_blank" rel="noopener noreferrer" class="inline-flex items-center justify-center bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white font-bold px-8 py-4 rounded-xl text-lg shadow-lg shadow-emerald-500/20 transform hover:-translate-y-0.5 transition-all">
              Hubungi CS Kayu MDF
            </a>
            <a href="#detail-kayu" class="inline-flex items-center justify-center border-2 border-amber-700/50 hover:border-amber-500 text-white font-semibold px-8 py-4 rounded-xl text-lg hover:bg-amber-900/30 transition-all">
              Detail Material & Aplikasi
            </a>
          </div>
        </div>
      </div>
    </section>

    <!-- MAIN SEO CONTENT SECTION -->
    <section id="detail-kayu" class="py-24 bg-white text-slate-900">
      <div class="container-custom">
        <div class="max-w-4xl mx-auto">
          <h2 class="text-3xl font-bold mb-6 text-slate-900">Pemanfaatan Laser Cutting untuk Dekorasi Kayu MDF & Plywood</h2>
          <p class="text-slate-600 mb-6 leading-relaxed">
            Kayu olahan seperti <strong>MDF (Medium Density Fibreboard)</strong> dan <strong>Plywood (Multiplex)</strong> adalah bahan yang sangat populer untuk interior karena harganya terjangkau dan permukaannya stabil. Namun, memotong motif ornamen yang meliuk-liuk (kerawang) di atas papan kayu tebal dengan metode gergaji manual atau jig-saw sangatlah menyita waktu dan berisiko gompal.
          </p>
          <p class="text-slate-600 mb-12 leading-relaxed">
            Menggunakan mesin <strong>CO2 Laser Cutting</strong> berkapasitas besar, kami dapat memotong motif dekoratif berkerumitan tinggi dengan tingkat kepresisian setara garis komputer. Tepi hasil potongan dijamin tegak lurus, halus, dan siap masuk ke tahap finishing pelapisan cat duko, melamik, atau HPL.
          </p>

          <!-- Wood Specifications table -->
          <h3 class="text-2xl font-bold mb-6 text-slate-900">Spesifikasi Material Kayu Olahan Tepat Laser</h3>
          <div class="overflow-x-auto mb-12 border border-slate-200 rounded-2xl">
            <table class="w-full text-left text-sm text-slate-600">
              <thead class="bg-slate-50 text-slate-900 uppercase font-semibold border-b border-slate-200">
                <tr>
                  <th class="px-6 py-4">Nama Material</th>
                  <th class="px-6 py-4">Ketebalan Umum</th>
                  <th class="px-6 py-4">Kelebihan Utama</th>
                  <th class="px-6 py-4">Rekomendasi Aplikasi</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-slate-200">
                <tr>
                  <td class="px-6 py-4 font-bold text-slate-900">MDF Cokelat Standard</td>
                  <td class="px-6 py-4">3mm - 25mm</td>
                  <td class="px-6 py-4">Padat, permukaan halus, gampang dicat duco</td>
                  <td class="px-6 py-4">Partisi, ornamen dinding indoor, souvenir</td>
                </tr>
                <tr>
                  <td class="px-6 py-4 font-bold text-slate-900">HMR Board (MDF Hijau)</td>
                  <td class="px-6 py-4">6mm - 18mm</td>
                  <td class="px-6 py-4">Tahan lembab, tidak mudah mengembang kena air</td>
                  <td class="px-6 py-4">Kitchen set, sekat kamar mandi kering, wall panel</td>
                </tr>
                <tr>
                  <td class="px-6 py-4 font-bold text-slate-900">Plywood / Multiplex</td>
                  <td class="px-6 py-4">3mm - 18mm</td>
                  <td class="px-6 py-4">Kekuatan struktural tinggi, serat urat kayu alami</td>
                  <td class="px-6 py-4">Kotak merchandise, furnitur, huruf timbul kayu</td>
                </tr>
              </tbody>
            </table>
          </div>

          <!-- Applications wood list -->
          <h3 class="text-2xl font-bold mb-6 text-slate-900">Aplikasi Kayu MDF Hasil Laser Cutting</h3>
          <ul class="space-y-4 mb-12 text-slate-700">
            <li class="flex items-start gap-3">
              <span class="w-6 h-6 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center flex-shrink-0 text-sm font-bold">✓</span>
              <div>
                <strong>Partisi Penyekat Ruangan Kerawang:</strong> Solusi sekat pembatas ruangan estetik bermotif ukiran arabesque, floral, atau minimalis modern untuk rumah ibadah, lobi hotel, dan rumah pribadi.
              </div>
            </li>
            <li class="flex items-start gap-3">
              <span class="w-6 h-6 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center flex-shrink-0 text-sm font-bold">✓</span>
              <div>
                <strong>Souvenir & Kotak Box Kayu Eksklusif:</strong> Pemotongan sekalian grafir logo perusahaan pada kotak kemasan premium, plakat kayu, gantungan kunci, dan pajangan kreatif.
              </div>
            </li>
            <li class="flex items-start gap-3">
              <span class="w-6 h-6 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center flex-shrink-0 text-sm font-bold">✓</span>
              <div>
                <strong>Kisi-Kisi & Kisi Ventilasi:</strong> Ornamen kisi kayu minimalis penutup kisi AC atau lubang angin dekoratif.
              </div>
            </li>
          </ul>
        </div>
      </div>
    </section>

    <!-- FAQ SECTION -->
    <section class="py-24 bg-slate-50 border-t border-slate-200">
      <div class="container-custom max-w-4xl">
        <h2 class="text-3xl font-bold text-center mb-12">FAQ Jasa Laser MDF & Kayu</h2>
        <div class="space-y-6">
          {faqs.map(faq => (
            <div class="bg-white p-6 rounded-2xl border border-slate-200">
              <h3 class="text-lg font-bold mb-2 text-slate-900">{faq.question}</h3>
              <p class="text-slate-600 text-sm leading-relaxed">{faq.answer}</p>
            </div>
          ))}
        </div>
      </div>
    </section>

    <!-- LOCATION MAPS -->
    <section class="py-24 bg-white border-t border-slate-200">
      <div class="container-custom grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        <div class="lg:col-span-8 rounded-2xl overflow-hidden shadow-lg border border-slate-200">
          <iframe
            src="https://maps.google.com/maps?q=Jl.%20Bintaro%20Bsd%20no%201D%20parigi%20(%20samping%20Sekolah%20SD%20Mentari%20Internasional%20School%20),%20Tangerang%20Selatan,%20Banten,%20Indonesia&t=&z=15&ie=UTF8&iwloc=&output=embed"
            width="100%"
            height="400"
            style="border:0;"
            allowfullscreen=""
            loading="lazy"
          ></iframe>
        </div>
        <div class="lg:col-span-4 bg-slate-50 p-8 rounded-2xl border border-slate-200 shadow-sm">
          <h3 class="text-xl font-bold mb-4">Workshop MDF Bintaro</h3>
          <p class="text-slate-600 text-sm mb-6">{SITE_CONFIG.address}</p>
          <h4 class="font-bold text-sm text-slate-900 mb-2">Jam Buka:</h4>
          <p class="text-slate-600 text-sm mb-6">{SITE_CONFIG.businessHours}</p>
          <a href={WA_LINK} target="_blank" rel="noopener noreferrer" class="inline-flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white font-bold px-6 py-3 rounded-lg text-sm w-full transition-all">
            Rute Google Maps
          </a>
        </div>
      </div>
    </section>
  </main>

  <Footer slot="footer" />
</BaseLayout>
`;
writeFile(path.join(SRC_DIR, 'pages', 'jasa-laser-cutting-mdf-ai.astro'), mdfAstroContent);


// --- 4. LASER-CUTTING-AKRILIK.ASTRO (EXTREMELY RICH CONTENT) ---
const acrylicAstroContent = `---
// src/pages/laser-cutting-akrilik.astro
import BaseLayout from '../components/BaseLayout.astro';
import Header from '../components/Header.astro';
import Footer from '../components/Footer.astro';
import Breadcrumbs from '../components/Breadcrumbs.astro';
import { MATERIALS, SITE_CONFIG } from '../utils/constants.js';
import { generateFAQSchema, generateBreadcrumbSchema } from '../utils/seo.js';

const material = MATERIALS.find(m => m.id === 'acrylic') || { image: '/images/Acrylic.webp', slug: 'laser-cutting-akrilik' };
const WA = SITE_CONFIG.whatsapp;
const WA_LINK = \`https://wa.me/\${WA}?text=\${encodeURIComponent("Halo Tepat Laser, saya ingin tanya penawaran jasa laser cutting akrilik.")}\`;

const faqs = [
  {
    question: "Ketebalan lembaran akrilik berapa saja yang bisa dipotong laser?",
    answer: "Kami melayani pemotongan untuk akrilik dengan ketebalan tipis (1.5mm, 2mm, 3mm, 4mm, 5mm) hingga ketebalan tebal (8mm, 10mm, 12mm, 15mm, dan 20mm)."
  },
  {
    question: "Apakah tepi potongan akrilik menjadi kusam atau bening mengkilap?",
    answer: "Potongan akrilik menggunakan mesin laser CO2 bekerja dengan melelehkan jalurnya secara cepat dan terfokus. Metode ini menghasilkan tepi potongan yang sangat bening, licin, dan mengkilap (polished edge) layaknya kaca kristal, sehingga Anda tidak perlu melakukan tahap pengamplasan atau poles lagi."
  },
  {
    question: "Apakah Tepat Laser menerima pengerjaan grafir (engraving) akrilik?",
    answer: "Ya. Mesin laser kami mendukung fitur dual-function (cutting & engraving). Kami bisa memotong bentuk luar akrilik sekaligus menggrafir logo, tulisan detail, foto, atau serial number di atas permukaan akrilik dalam sekali jalan pengerjaan."
  },
  {
    question: "Jenis akrilik apa saja yang tersedia di workshop Tepat Laser?",
    answer: "Kami menyediakan berbagai pilihan lembaran akrilik berkualitas (seperti merk Marga Cipta/Astari), antara lain: Akrilik Bening (clear), Akrilik Putih Susu (opal), Akrilik Hitam, Akrilik Warna Solid (merah, biru, kuning, hijau, dll), serta Akrilik Cermin (Mirror Gold & Mirror Silver)."
  },
  {
    question: "Berapa lama waktu pengerjaan akrilik custom satuan?",
    answer: "Untuk pengerjaan akrilik standar tanpa perakitan rumit (seperti plang nama potong kotak atau plakat satuan), estimasi pengerjaan adalah 1 hari kerja (bisa ditunggu). Pekerjaan bervolume besar atau rakitan kompleks berkisar 2-3 hari kerja."
  }
];

const pageTitle = "Jasa Laser Cutting Akrilik Terdekat Bening & Presisi | Tepat Laser";
const pageDesc = "Jasa laser cutting akrilik & potong acrylic lembaran terdekat di Bintaro, BSD, Tangerang. Hasil potong bening mengkilap bebas crack, plakat custom & huruf timbul cepat 24 jam.";
const pageKw = "laser cutting akrilik, jasa potong akrilik terdekat, acrylic laser cutting tangerang, huruf timbul akrilik bintaro, plakat akrilik custom";

const breadcrumbSchema = generateBreadcrumbSchema([
  { name: 'Beranda', url: '/' },
  { name: 'Laser Cutting Akrilik', url: '/laser-cutting-akrilik/' }
]);

const meta = {
  title: pageTitle,
  description: pageDesc,
  keywords: pageKw,
  url: '/laser-cutting-akrilik/',
  image: material.image,
  type: "website",
  jsonLd: [breadcrumbSchema, generateFAQSchema(faqs)]
};

const crumbs = breadcrumbSchema.itemListElement;
---

<BaseLayout {...meta}>
  <Header slot="header" />

  <main class="mt-16 overflow-x-hidden">
    <Breadcrumbs crumbs={crumbs} />

    <!-- HERO SECTION -->
    <section class="relative bg-slate-900 text-white py-24 md:py-32 overflow-hidden">
      <div class="absolute inset-0 opacity-20" style="background-image:url('/images/Acrylic.webp'); background-size:cover; background-position:center;"></div>
      <div class="absolute inset-0 bg-gradient-to-r from-slate-900 via-slate-900/90 to-transparent"></div>
      <div class="container-custom relative z-10">
        <div class="max-w-3xl">
          <span class="inline-flex items-center gap-2 bg-blue-500/20 text-blue-400 font-bold px-4 py-1.5 rounded-full text-xs mb-6 border border-blue-500/30 tracking-wider">ACRYLIC BRANDING & ADVERTISING</span>
          <h1 class="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight mb-6">
            Jasa Laser Cutting Akrilik & Plakat Custom
          </h1>
          <p class="text-lg sm:text-xl text-slate-300 mb-8 leading-relaxed">
            Dapatkan hasil potong akrilik kristal (polished edge) rapi tanpa pecah rambut. Melayani pembuatan huruf timbul akrilik lampu led, papan nama toko, dan box display kosmetik.
          </p>
          <div class="flex flex-col sm:flex-row gap-4">
            <a href={WA_LINK} target="_blank" rel="noopener noreferrer" class="inline-flex items-center justify-center bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white font-bold px-8 py-4 rounded-xl text-lg shadow-lg shadow-emerald-500/20 transform hover:-translate-y-0.5 transition-all">
              Hubungi Admin Akrilik WA
            </a>
            <a href="#keunggulan-akrilik" class="inline-flex items-center justify-center border-2 border-slate-700 hover:border-slate-500 text-white font-semibold px-8 py-4 rounded-xl text-lg hover:bg-slate-800 transition-all">
              Keunggulan Potong Laser
            </a>
          </div>
        </div>
      </div>
    </section>

    <!-- MAIN SEO CONTENT SECTION -->
    <section id="keunggulan-akrilik" class="py-24 bg-white text-slate-900">
      <div class="container-custom">
        <div class="max-w-4xl mx-auto">
          <h2 class="text-3xl font-bold mb-6 text-slate-900">Kelebihan Memotong Lembaran Akrilik dengan Laser CO2</h2>
          <p class="text-slate-600 mb-6 leading-relaxed">
            Memotong akrilik secara manual dengan gergaji tangan atau pisau potong akrilik gores berisiko tinggi menimbulkan retak rambut di tepian dan hasil potong yang tidak rata. Untuk pengerjaan produk display premium atau tulisan signage akrilik yang kecil dan detail, penggunaan mesin <strong>CO2 Laser Cutting</strong> adalah standar wajib.
          </p>
          <p class="text-slate-600 mb-12 leading-relaxed">
            Sinar laser bekerja tanpa kontak fisik langsung, melainkan mencairkan lembaran akrilik di sepanjang jalur pemotongan secara instan. Kecepatan dan temperatur yang diatur dengan presisi tinggi menghasilkan <strong> polished edge (tepi bening mengkilap seperti kaca polos)</strong>. Tepi potongan sangat halus, tumpul aman, dan tidak membutuhkan proses finishing pengamplasan manual atau nyala api (*flame polishing*).
          </p>

          <!-- Acrylic types specifications table -->
          <h3 class="text-2xl font-bold mb-6 text-slate-900">Pilihan Bahan & Ketebalan Lembar Akrilik</h3>
          <div class="overflow-x-auto mb-12 border border-slate-200 rounded-2xl">
            <table class="w-full text-left text-sm text-slate-600">
              <thead class="bg-slate-50 text-slate-900 uppercase font-semibold border-b border-slate-200">
                <tr>
                  <th class="px-6 py-4">Tipe Akrilik</th>
                  <th class="px-6 py-4">Pilihan Ketebalan</th>
                  <th class="px-6 py-4">Karakteristik Visual</th>
                  <th class="px-6 py-4">Paling Sering Dibuat</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-slate-200">
                <tr>
                  <td class="px-6 py-4 font-bold text-slate-900">Akrilik Bening (Clear)</td>
                  <td class="px-6 py-4">1.5mm - 20mm</td>
                  <td class="px-6 py-4">Bening tembus pandang 92% transmisi cahaya</td>
                  <td class="px-6 py-4">Plakat, trofi, sekat meja kantor, box display, face shield</td>
                </tr>
                <tr>
                  <td class="px-6 py-4 font-bold text-slate-900">Akrilik Putih Susu (Opal)</td>
                  <td class="px-6 py-4">2mm - 10mm</td>
                  <td class="px-6 py-4">Susu semi-transparan, meredam cahaya lampu secara rata</td>
                  <td class="px-6 py-4">Muka neon box, sekat lampu LED, huruf timbul backlit</td>
                </tr>
                <tr>
                  <td class="px-6 py-4 font-bold text-slate-900">Akrilik Cermin (Mirror Gold/Silver)</td>
                  <td class="px-6 py-4">2mm - 3mm</td>
                  <td class="px-6 py-4">Memantulkan bayangan seperti cermin kaca asli</td>
                  <td class="px-6 py-4">Nomor rumah mewah, logo dinding resepsionis hotel</td>
                </tr>
              </tbody>
            </table>
          </div>

          <!-- Applications list acrylic -->
          <h3 class="text-2xl font-bold mb-6 text-slate-900">Pekerjaan Akrilik Custom yang Paling Sering Kami Buat</h3>
          <ul class="space-y-4 mb-12 text-slate-700">
            <li class="flex items-start gap-3">
              <span class="w-6 h-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center flex-shrink-0 text-sm font-bold">✓</span>
              <div>
                <strong>Huruf Timbul & Papan Nama Akrilik:</strong> Logo korporat 3D timbul, plang nama ruang rapat, nomor meja restoran, dan nomor rumah akrilik minimalis.
              </div>
            </li>
            <li class="flex items-start gap-3">
              <span class="w-6 h-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center flex-shrink-0 text-sm font-bold">✓</span>
              <div>
                <strong>Box Display & Tempat Brosur:</strong> Display kosmetik, wadah organizer makeup, etalase mainan action figure, dan kotak undian saran.
              </div>
            </li>
            <li class="flex items-start gap-3">
              <span class="w-6 h-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center flex-shrink-0 text-sm font-bold">✓</span>
              <div>
                <strong>Plakat Trofi & Souvenir:</strong> Plakat akrilik wisuda, cinderamata kenang-kenangan kantor, gantungan kunci print custom, dan medali event lari.
              </div>
            </li>
          </ul>
        </div>
      </div>
    </section>

    <!-- FAQ SECTION -->
    <section class="py-24 bg-slate-50 border-t border-slate-200">
      <div class="container-custom max-w-4xl">
        <h2 class="text-3xl font-bold text-center mb-12">FAQ Laser Cutting Akrilik</h2>
        <div class="space-y-6">
          {faqs.map(faq => (
            <div class="bg-white p-6 rounded-2xl border border-slate-200">
              <h3 class="text-lg font-bold mb-2 text-slate-900">{faq.question}</h3>
              <p class="text-slate-600 text-sm leading-relaxed">{faq.answer}</p>
            </div>
          ))}
        </div>
      </div>
    </section>

    <!-- LOCATION MAPS -->
    <section class="py-24 bg-white border-t border-slate-200">
      <div class="container-custom grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        <div class="lg:col-span-8 rounded-2xl overflow-hidden shadow-lg border border-slate-200">
          <iframe
            src="https://maps.google.com/maps?q=Jl.%20Bintaro%20Bsd%20no%201D%20parigi%20(%20samping%20Sekolah%20SD%20Mentari%20Internasional%20School%20),%20Tangerang%20Selatan,%20Banten,%20Indonesia&t=&z=15&ie=UTF8&iwloc=&output=embed"
            width="100%"
            height="400"
            style="border:0;"
            allowfullscreen=""
            loading="lazy"
          ></iframe>
        </div>
        <div class="lg:col-span-4 bg-slate-50 p-8 rounded-2xl border border-slate-200 shadow-sm">
          <h3 class="text-xl font-bold mb-4">Workshop Akrilik Bintaro</h3>
          <p class="text-slate-600 text-sm mb-6">{SITE_CONFIG.address}</p>
          <h4 class="font-bold text-sm text-slate-900 mb-2">Jam Operasional:</h4>
          <p class="text-slate-600 text-sm mb-6">{SITE_CONFIG.businessHours}</p>
          <a href={WA_LINK} target="_blank" rel="noopener noreferrer" class="inline-flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white font-bold px-6 py-3 rounded-lg text-sm w-full transition-all">
            Navigasi Google Maps
          </a>
        </div>
      </div>
    </section>
  </main>

  <Footer slot="footer" />
</BaseLayout>
`;
writeFile(path.join(SRC_DIR, 'pages', 'laser-cutting-akrilik.astro'), acrylicAstroContent);

console.log("Rewritten all pages with rich SEO content successfully!");

// Run Astro build to verify
console.log("Verifying build...");
try {
  const buildOutput = execSync("npm run build", { cwd: PROJECT_DIR, encoding: 'utf8' });
  console.log("Build Success!");
  console.log(buildOutput);

  // Commit and push
  console.log("Committing to repository...");
  execSync("git add .", { cwd: PROJECT_DIR });
  execSync("git commit -m \"SEO: Expand content on metal, stainless, mdf, and acrylic pages with detailed copy and tables\"", { cwd: PROJECT_DIR });
  console.log("Pushing...");
  execSync("git push", { cwd: PROJECT_DIR });
  console.log("Push Complete!");

} catch (error) {
  console.error("--- ERROR ENCOUNTERED ---");
  console.error(error.stdout || error.message);
  process.exit(1);
}
