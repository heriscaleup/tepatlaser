// D:\code\tepatlaser\update-all-pages.cjs
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

console.log("=== STARTING FULL SITE SEO & DESIGN UPDATE ===");

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

const WA = "6282121292937";
const WA_LINK = `https://wa.me/${WA}?text=${encodeURIComponent("Halo Tepat Laser, saya ingin tanya penawaran jasa laser cutting.")}`;

// --- 1. JASA-CNC-ROUTER.ASTRO ---
const cncRouterContent = `---
// src/pages/jasa-cnc-router.astro
import BaseLayout from '../components/BaseLayout.astro';
import Header from '../components/Header.astro';
import Footer from '../components/Footer.astro';
import Breadcrumbs from '../components/Breadcrumbs.astro';
import { SITE_CONFIG } from '../utils/constants.js';
import { generateFAQSchema, generateBreadcrumbSchema } from '../utils/seo.js';

const faqs = [
  {
    question: "Material apa saja yang bisa dipotong dengan CNC Router?",
    answer: "CNC Router kami sangat andal memotong material non-metal tebal dan keras seperti ACP (Aluminium Composite Panel), PVC board, GRC panel, kayu solid, MDF, plywood/multiplex, akrilik tebal, hingga resin dan plastik teknis."
  },
  {
    question: "Berapa ukuran maksimal area kerja (working area) CNC Router?",
    answer: "Mesin CNC Router kami memiliki area kerja maksimal 1220mm x 2440mm (ukuran standar triplek/ACP satu lembar utuh). Hal ini memungkinkan kami memotong fasad besar atau partisi utuh tanpa sambungan."
  },
  {
    question: "Apa perbedaan utama CNC Router dengan Laser Cutting CO2?",
    answer: "CNC Router menggunakan mata bor fisik (router bit) berputar kecepatan tinggi untuk meraut material, sehingga mampu memotong material sangat tebal tanpa efek gosong (seperti pada kayu) atau lengket. Sedangkan laser menggunakan sinar panas terfokus yang ideal untuk pemotongan sangat tipis dan detail tajam."
  }
];

const pageTitle = "Jasa CNC Router ACP, PVC, & Kayu Bintaro Murah | Tepat Laser";
const pageDesc = "Jasa CNC router murah di Tangerang Selatan & Bintaro. Melayani pemotongan & 3D carving ACP, PVC board, GRC, MDF, dan Plywood tebal presisi tinggi. Hubungi kami!";
const pageKw = "jasa cnc router, cnc router acp, potong pvc board cnc, cnc router kayu, jasa cnc router tangerang, cnc router bintaro";

const breadcrumbSchema = generateBreadcrumbSchema([
  { name: 'Beranda', url: '/' },
  { name: 'Jasa CNC Router', url: '/jasa-cnc-router/' }
]);

const meta = {
  title: pageTitle,
  description: pageDesc,
  keywords: pageKw,
  url: '/jasa-cnc-router/',
  image: '/images/cncrouter.webp',
  type: "website",
  jsonLd: [breadcrumbSchema, generateFAQSchema(faqs)]
};

const crumbs = breadcrumbSchema.itemListElement;
---

<BaseLayout {...meta}>
  <Header slot="header" />

  <main class="mt-16 overflow-x-hidden">
    <Breadcrumbs crumbs={crumbs} />

    <!-- HERO -->
    <section class="relative bg-slate-900 text-white py-24 overflow-hidden">
      <div class="absolute inset-0 opacity-20" style="background-image:url('/images/cncrouter.webp'); background-size:cover; background-position:center;"></div>
      <div class="absolute inset-0 bg-gradient-to-r from-slate-900 via-slate-900/90 to-transparent"></div>
      <div class="container-custom relative z-10">
        <div class="max-w-3xl">
          <span class="inline-block bg-blue-500/20 text-blue-400 font-semibold px-4 py-1.5 rounded-full text-xs mb-6 border border-blue-500/30">HEAVY DUTY MACHINING</span>
          <h1 class="text-4xl sm:text-5xl font-extrabold mb-6">Jasa CNC Router ACP, PVC & Kayu Tebal</h1>
          <p class="text-lg text-slate-300 mb-8 leading-relaxed">
            Potong dan ukir (3D carving) material tebal seperti ACP, GRC, PVC Board, dan Kayu Keras tanpa gosong. Presisi tinggi dengan kapasitas pengerjaan massal lembaran utuh.
          </p>
          <a href="${WA_LINK}" target="_blank" rel="noopener noreferrer" class="bg-green-500 hover:bg-green-600 text-white font-bold px-8 py-4 rounded-xl text-lg shadow-lg">Konsultasi CNC Router WA</a>
        </div>
      </div>
    </section>

    <!-- CONTENT -->
    <section class="py-20 bg-white text-slate-900">
      <div class="container-custom grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div>
          <h2 class="text-3xl font-bold mb-6">Ukir & Potong Material Lembaran Tanpa Batas</h2>
          <p class="text-slate-600 mb-6 leading-relaxed">
            Jasa CNC Router kami menggunakan mata pisau potong solid carbide berkualitas untuk menjamin kerapian tepi potong pada material tebal. Sangat direkomendasikan untuk pembuatan ornamen fasad gedung berbahan ACP, panel dinding 3D bermotif timbul, sekat pembatas PVC Board, serta ukiran kayu solid tebal.
          </p>
          <ul class="space-y-3 mb-6 text-slate-700">
            <li>✓ Area potong luas: muat 1 lembar triplek/ACP utuh (122x244 cm)</li>
            <li>✓ Pengerjaan 3D engraving & relief (ukiran timbul kayu)</li>
            <li>✓ Hasil potong sisi tegak lurus bersih tanpa gosong/leleh</li>
          </ul>
        </div>
        <div>
          <img src="/images/cncrouter.webp" alt="CNC Router Machine" class="rounded-2xl shadow-xl object-cover w-full h-[350px]" />
        </div>
      </div>
    </section>

    <!-- FAQ -->
    <section class="py-20 bg-slate-50 border-t border-slate-200">
      <div class="container-custom max-w-4xl">
        <h2 class="text-3xl font-bold text-center mb-12">FAQ CNC Router</h2>
        <div class="space-y-6">
          {faqs.map(faq => (
            <div class="bg-white p-6 rounded-2xl border border-slate-200">
              <h3 class="text-lg font-bold mb-2">{faq.question}</h3>
              <p class="text-slate-600 text-sm leading-relaxed">{faq.answer}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  </main>

  <Footer slot="footer" />
</BaseLayout>
`;
writeFile(path.join(SRC_DIR, 'pages', 'jasa-cnc-router.astro'), cncRouterContent);

// --- 2. JASA-GALVO-ENGRAVING.ASTRO ---
const galvoContent = `---
// src/pages/jasa-galvo-engraving.astro
import BaseLayout from '../components/BaseLayout.astro';
import Header from '../components/Header.astro';
import Footer from '../components/Footer.astro';
import Breadcrumbs from '../components/Breadcrumbs.astro';
import { SITE_CONFIG } from '../utils/constants.js';
import { generateFAQSchema, generateBreadcrumbSchema } from '../utils/seo.js';

const faqs = [
  {
    question: "Material apa saja yang bisa digrafir dengan Galvo Laser?",
    answer: "Kami menggunakan dua jenis mesin Galvo: Fiber Galvo untuk menandai logam (stainless steel, besi, aluminium, emas, perak) dan CO2 Galvo untuk menandai material non-logam (kulit, kayu, akrilik, kertas, jeans)."
  },
  {
    question: "Berapa lama proses pengerjaan marking/engraving?",
    answer: "Proses penandaan Galvo sangat kilat, berkisar antara 1 hingga 5 detik per item tergantung kerumitan gambar. Sangat cocok untuk produksi massal ribuan pcs sehari."
  }
];

const pageTitle = "Jasa Laser Engraving & Marking Galvo Kilat Bintaro | Tepat Laser";
const pageDesc = "Jasa laser engraving & marking Galvo super cepat di Bintaro, Tangerang Selatan. Grafir logo, QR code, nomor seri pada souvenir, logam, kulit, tumbler.";
const pageKw = "jasa laser engraving, laser marking galvo, jasa grafir tumbler bintaro, laser marking logam, grafir laser akrilik";

const breadcrumbSchema = generateBreadcrumbSchema([
  { name: 'Beranda', url: '/' },
  { name: 'Jasa Galvo Engraving', url: '/jasa-galvo-engraving/' }
]);

const meta = {
  title: pageTitle,
  description: pageDesc,
  keywords: pageKw,
  url: '/jasa-galvo-engraving/',
  image: '/images/galvo.webp',
  type: "website",
  jsonLd: [breadcrumbSchema, generateFAQSchema(faqs)]
};

const crumbs = breadcrumbSchema.itemListElement;
---

<BaseLayout {...meta}>
  <Header slot="header" />

  <main class="mt-16 overflow-x-hidden">
    <Breadcrumbs crumbs={crumbs} />

    <!-- HERO -->
    <section class="relative bg-slate-950 text-white py-24 overflow-hidden">
      <div class="absolute inset-0 opacity-20" style="background-image:url('/images/galvo.webp'); background-size:cover; background-position:center;"></div>
      <div class="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/90 to-transparent"></div>
      <div class="container-custom relative z-10">
        <div class="max-w-3xl">
          <span class="inline-block bg-blue-500/20 text-blue-400 font-semibold px-4 py-1.5 rounded-full text-xs mb-6 border border-blue-500/30">HIGH SPEED MARKING</span>
          <h1 class="text-4xl sm:text-5xl font-extrabold mb-6">Jasa Laser Engraving & Marking Galvo Kilat</h1>
          <p class="text-lg text-slate-300 mb-8 leading-relaxed">
            Grafir logo, QR code, barcode, serial number, atau nama custom pada tumbler, plakat logam, gantungan kunci kulit, dan aksesoris lainnya dalam hitungan detik.
          </p>
          <a href="${WA_LINK}" target="_blank" rel="noopener noreferrer" class="bg-green-500 hover:bg-green-600 text-white font-bold px-8 py-4 rounded-xl text-lg shadow-lg">Konsultasi Grafir WA</a>
        </div>
      </div>
    </section>

    <!-- CONTENT -->
    <section class="py-20 bg-white text-slate-900">
      <div class="container-custom grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div>
          <h2 class="text-3xl font-bold mb-6">Grafir Detail Presisi Kecepatan Tinggi</h2>
          <p class="text-slate-600 mb-6 leading-relaxed">
            Berbeda dengan laser gantry biasa, mesin Galvo Laser menggunakan lensa pemindai cermin berkecepatan ultra tinggi untuk mengarahkan sinar laser. Hasil penandaannya permanen, kontras tinggi, tidak luntur, dan sangat presisi bahkan pada tulisan berukuran mikro di bawah 1mm.
          </p>
          <ul class="space-y-3 mb-6 text-slate-700">
            <li>✓ Ideal untuk branding merchandise massal (pulpen, tumbler, logam)</li>
            <li>✓ Hasil grafir tahan gesek, air, dan suhu tinggi</li>
            <li>✓ Bisa custom nama yang berbeda-beda untuk tiap item</li>
          </ul>
        </div>
        <div>
          <img src="/images/engraving.webp" alt="Laser Engraving Custom" class="rounded-2xl shadow-xl object-cover w-full h-[350px]" />
        </div>
      </div>
    </section>

    <!-- FAQ -->
    <section class="py-20 bg-slate-50 border-t border-slate-200">
      <div class="container-custom max-w-4xl">
        <h2 class="text-3xl font-bold text-center mb-12">FAQ Laser Engraving</h2>
        <div class="space-y-6">
          {faqs.map(faq => (
            <div class="bg-white p-6 rounded-2xl border border-slate-200">
              <h3 class="text-lg font-bold mb-2">{faq.question}</h3>
              <p class="text-slate-600 text-sm leading-relaxed">{faq.answer}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  </main>

  <Footer slot="footer" />
</BaseLayout>
`;
writeFile(path.join(SRC_DIR, 'pages', 'jasa-galvo-engraving.astro'), galvoContent);

// --- 3. JASA-LASER-CO2.ASTRO ---
const co2Content = `---
// src/pages/jasa-laser-co2.astro
import BaseLayout from '../components/BaseLayout.astro';
import Header from '../components/Header.astro';
import Footer from '../components/Footer.astro';
import Breadcrumbs from '../components/Breadcrumbs.astro';
import { SITE_CONFIG } from '../utils/constants.js';
import { generateFAQSchema, generateBreadcrumbSchema } from '../utils/seo.js';

const faqs = [
  {
    question: "Bisa memotong bahan apa saja dengan Laser CO2?",
    answer: "Laser CO2 sangat andal untuk memotong dan mengukir material organik dan non-metal seperti akrilik, MDF, plywood, kertas karton tebal, kulit asli/sintetis, kain flanel, jeans, spons, dan silikon."
  },
  {
    question: "Apakah bisa untuk memotong plat besi dengan mesin CO2?",
    answer: "Mesin Laser CO2 kami dikonfigurasi khusus untuk pemotongan material non-metal demi hasil tepi potong yang higienis dan halus. Untuk material logam, kami menggunakan mesin Fiber Laser."
  }
];

const pageTitle = "Jasa Laser Cutting CO2 Non-Metal Presisi Bintaro | Tepat Laser";
const pageDesc = "Jasa laser cutting CO2 untuk material non-metal (akrilik, kayu, MDF, plywood, kulit, kain) presisi tinggi, hasil potong bersih tanpa amplas terdekat di Bintaro.";
const pageKw = "jasa laser co2, laser cutting akrilik bintaro, laser cutting mdf tangerang, laser cutting kain, grafir kulit laser";

const breadcrumbSchema = generateBreadcrumbSchema([
  { name: 'Beranda', url: '/' },
  { name: 'Jasa Laser CO2', url: '/jasa-laser-co2/' }
]);

const meta = {
  title: pageTitle,
  description: pageDesc,
  keywords: pageKw,
  url: '/jasa-laser-co2/',
  image: '/images/co2.webp',
  type: "website",
  jsonLd: [breadcrumbSchema, generateFAQSchema(faqs)]
};

const crumbs = breadcrumbSchema.itemListElement;
---

<BaseLayout {...meta}>
  <Header slot="header" />

  <main class="mt-16 overflow-x-hidden">
    <Breadcrumbs crumbs={crumbs} />

    <!-- HERO -->
    <section class="relative bg-slate-900 text-white py-24 overflow-hidden">
      <div class="absolute inset-0 opacity-20" style="background-image:url('/images/co2.webp'); background-size:cover; background-position:center;"></div>
      <div class="absolute inset-0 bg-gradient-to-r from-slate-900 via-slate-900/90 to-transparent"></div>
      <div class="container-custom relative z-10">
        <div class="max-w-3xl">
          <span class="inline-block bg-blue-500/20 text-blue-400 font-semibold px-4 py-1.5 rounded-full text-xs mb-6 border border-blue-500/30">NON-METAL PRECISION</span>
          <h1 class="text-4xl sm:text-5xl font-extrabold mb-6">Jasa Laser Cutting CO2 Non-Metal</h1>
          <p class="text-lg text-slate-300 mb-8 leading-relaxed">
            Potong akrilik bening mengkilap, MDF bebas gergaji kasar, dan kain/kulit motif rumit dengan teknologi pemotong panas gas karbon dioksida (CO2) presisi 0.1mm.
          </p>
          <a href="${WA_LINK}" target="_blank" rel="noopener noreferrer" class="bg-green-500 hover:bg-green-600 text-white font-bold px-8 py-4 rounded-xl text-lg shadow-lg">Konsultasi Laser CO2 WA</a>
        </div>
      </div>
    </section>

    <!-- CONTENT -->
    <section class="py-20 bg-white text-slate-900">
      <div class="container-custom grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div>
          <h2 class="text-3xl font-bold mb-6">Hasil Potong Bening Tanpa Finishing Tambahan</h2>
          <p class="text-slate-600 mb-6 leading-relaxed">
            Mesin CO2 Laser kami melayani pemotongan lembaran akrilik dengan hasil tepi yang lumer mengkilap (*flame-polished look*), sehingga tidak memerlukan tahap gosok amplas lagi. Sangat ideal untuk pembuatan plakat penghargaan, rak display akrilik pajangan kosmetik, undangan pernikahan unik, sekat meja kantor, dan komponen maket/arsitektur.
          </p>
          <ul class="space-y-3 mb-6 text-slate-700">
            <li>✓ Presisi detail tajam hingga ukuran milimeter</li>
            <li>✓ Sangat minim debu/serpihan dibanding gergaji manual</li>
            <li>✓ Kapasitas ketebalan akrilik hingga 20mm</li>
          </ul>
        </div>
        <div>
          <img src="/images/co2.webp" alt="CO2 Laser Cutting Machine" class="rounded-2xl shadow-xl object-cover w-full h-[350px]" />
        </div>
      </div>
    </section>

    <!-- FAQ -->
    <section class="py-20 bg-slate-50 border-t border-slate-200">
      <div class="container-custom max-w-4xl">
        <h2 class="text-3xl font-bold text-center mb-12">FAQ Laser CO2</h2>
        <div class="space-y-6">
          {faqs.map(faq => (
            <div class="bg-white p-6 rounded-2xl border border-slate-200">
              <h3 class="text-lg font-bold mb-2">{faq.question}</h3>
              <p class="text-slate-600 text-sm leading-relaxed">{faq.answer}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  </main>

  <Footer slot="footer" />
</BaseLayout>
`;
writeFile(path.join(SRC_DIR, 'pages', 'jasa-laser-co2.astro'), co2Content);

// --- 4. JASA-LASER-FIBER.ASTRO ---
const fiberContent = `---
// src/pages/jasa-laser-fiber.astro
import BaseLayout from '../components/BaseLayout.astro';
import Header from '../components/Header.astro';
import Footer from '../components/Footer.astro';
import Breadcrumbs from '../components/Breadcrumbs.astro';
import { SITE_CONFIG } from '../utils/constants.js';
import { generateFAQSchema, generateBreadcrumbSchema } from '../utils/seo.js';

const faqs = [
  {
    question: "Mengapa memilih Laser Fiber dibanding Plasma cutting?",
    answer: "Laser fiber memotong dengan diameter sinar yang sangat kecil, menghasilkan celah kerf yang sangat sempit (di bawah 0.2mm). Hal ini menjamin detail lubang-lubang baut kecil terpotong bulat sempurna tanpa kerucut atau kerak kasar di bawah plat, sangat berbeda dengan plasma yang cenderung gosong kasar."
  },
  {
    question: "Berapa kapasitas ketebalan potong mesin Fiber Laser?",
    answer: "Mesin kami sanggup memotong plat besi baja carbon steel s/d tebal 12mm dan plat stainless steel s/d 10mm dengan hembusan nitrogen bertekanan tinggi."
  }
];

const pageTitle = "Jasa Laser Fiber Cutting Logam Cepat Bintaro | Tepat Laser";
const pageDesc = "Jasa laser fiber cutting plat logam murah presisi tinggi terdekat di Bintaro Tangerang. Spesialis potong stainless steel, plat besi baja, aluminium alloy.";
const pageKw = "jasa laser fiber, fiber laser cutting metal, potong plat besi bintaro, laser cutting stainless tangerang, jasa potong plat cnc";

const breadcrumbSchema = generateBreadcrumbSchema([
  { name: 'Beranda', url: '/' },
  { name: 'Jasa Laser Fiber', url: '/jasa-laser-fiber/' }
]);

const meta = {
  title: pageTitle,
  description: pageDesc,
  keywords: pageKw,
  url: '/jasa-laser-fiber/',
  image: '/images/laserfiber.webp',
  type: "website",
  jsonLd: [breadcrumbSchema, generateFAQSchema(faqs)]
};

const crumbs = breadcrumbSchema.itemListElement;
---

<BaseLayout {...meta}>
  <Header slot="header" />

  <main class="mt-16 overflow-x-hidden">
    <Breadcrumbs crumbs={crumbs} />

    <!-- HERO -->
    <section class="relative bg-slate-950 text-white py-24 overflow-hidden">
      <div class="absolute inset-0 opacity-20" style="background-image:url('/images/laserfiber.webp'); background-size:cover; background-position:center;"></div>
      <div class="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/90 to-transparent"></div>
      <div class="container-custom relative z-10">
        <div class="max-w-3xl">
          <span class="inline-block bg-blue-500/20 text-blue-400 font-semibold px-4 py-1.5 rounded-full text-xs mb-6 border border-blue-500/30">METAL FIBER TECHNOLOGY</span>
          <h1 class="text-4xl sm:text-5xl font-extrabold mb-6">Jasa Laser Fiber Cutting Logam Presisi</h1>
          <p class="text-lg text-slate-300 mb-8 leading-relaxed">
            Teknologi pemotongan plat logam tercepat dan terakurat untuk plat besi baja, stainless steel, kuningan, tembaga, dan aluminium lembaran.
          </p>
          <a href="${WA_LINK}" target="_blank" rel="noopener noreferrer" class="bg-green-500 hover:bg-green-600 text-white font-bold px-8 py-4 rounded-xl text-lg shadow-lg">Konsultasi Laser Fiber WA</a>
        </div>
      </div>
    </section>

    <!-- CONTENT -->
    <section class="py-20 bg-white text-slate-900">
      <div class="container-custom grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div>
          <h2 class="text-3xl font-bold mb-6">Kecepatan Tinggi & Efisiensi Biaya Produksi</h2>
          <p class="text-slate-600 mb-6 leading-relaxed">
            Mesin Fiber Laser cutting bekerja dengan menyalurkan sinar laser solid melintasi serat kaca serat optik. Teknologi ini menghasilkan sinar yang lebih terkonsentrasi dengan tingkat penyerapan logam yang jauh lebih tinggi dibanding laser gas CO2 konvensional, sehingga pengerjaan potong plat besi, flange custom, bracket sparepart industri, dan ornamen gerbang stainless bisa diselesaikan 3x lipat lebih cepat dengan biaya yang sangat ekonomis.
          </p>
          <ul class="space-y-3 mb-6 text-slate-700">
            <li>✓ Kecepatan pengerjaan kilat dapat ditunggu</li>
            <li>✓ Tidak ada deformasi panas berlebih pada tepi potong</li>
            <li>✓ Akurasi pemosisian lubang di bawah 0.05mm</li>
          </ul>
        </div>
        <div>
          <img src="/images/laserfiber.webp" alt="Fiber Laser Cutting Machine" class="rounded-2xl shadow-xl object-cover w-full h-[350px]" />
        </div>
      </div>
    </section>

    <!-- FAQ -->
    <section class="py-20 bg-slate-50 border-t border-slate-200">
      <div class="container-custom max-w-4xl">
        <h2 class="text-3xl font-bold text-center mb-12">FAQ Laser Fiber</h2>
        <div class="space-y-6">
          {faqs.map(faq => (
            <div class="bg-white p-6 rounded-2xl border border-slate-200">
              <h3 class="text-lg font-bold mb-2">{faq.question}</h3>
              <p class="text-slate-600 text-sm leading-relaxed">{faq.answer}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  </main>

  <Footer slot="footer" />
</BaseLayout>
`;
writeFile(path.join(SRC_DIR, 'pages', 'jasa-laser-fiber.astro'), fiberContent);

// --- 5. JASA-LASER-CUTTING-ACP.ASTRO ---
const acpContent = `---
// src/pages/jasa-laser-cutting-acp.astro
import BaseLayout from '../components/BaseLayout.astro';
import Header from '../components/Header.astro';
import Footer from '../components/Footer.astro';
import Breadcrumbs from '../components/Breadcrumbs.astro';
import { SITE_CONFIG } from '../utils/constants.js';
import { generateFAQSchema, generateBreadcrumbSchema } from '../utils/seo.js';

const faqs = [
  {
    question: "Merk ACP apa saja yang biasa dikerjakan?",
    answer: "Kami mengerjakan pemotongan dan perlubangan lembaran ACP dari berbagai merk terkenal di pasaran, seperti Seven, Alustar, Goldstar, Luminate, Decobond, dan Alcopan."
  },
  {
    question: "Mengapa ACP dipotong dengan CNC Router, bukan Laser?",
    answer: "ACP terdiri dari lapisan komposit polietilena di bagian tengah yang diapit dua lembar aluminium tipis. Penggunaan laser panas tinggi dapat membakar bahan plastik di tengahnya, menghasilkan lelehan hitam berasap. Oleh karena itu, CNC Router bermata pisau mekanis dingin adalah metode teraman dan terbersih untuk ACP."
  }
];

const pageTitle = "Jasa Cutting ACP Cladding & Fasad Bintaro | Tepat Laser";
const pageDesc = "Jasa pemotongan & perforasi ACP (Aluminium Composite Panel) motif kerawang dekoratif terdekat di Bintaro Tangerang Selatan untuk eksterior fasad gedung, partisi, spandrel.";
const pageKw = "jasa cutting acp, potong acp cnc, acp motif kerawang, fasad acp bintaro, cutting acp tangerang selatan";

const breadcrumbSchema = generateBreadcrumbSchema([
  { name: 'Beranda', url: '/' },
  { name: 'Laser Cutting ACP', url: '/jasa-laser-cutting-acp/' }
]);

const meta = {
  title: pageTitle,
  description: pageDesc,
  keywords: pageKw,
  url: '/jasa-laser-cutting-acp/',
  image: '/images/acp.webp',
  type: "website",
  jsonLd: [breadcrumbSchema, generateFAQSchema(faqs)]
};

const crumbs = breadcrumbSchema.itemListElement;
---

<BaseLayout {...meta}>
  <Header slot="header" />

  <main class="mt-16 overflow-x-hidden">
    <Breadcrumbs crumbs={crumbs} />

    <!-- HERO -->
    <section class="relative bg-slate-900 text-white py-24 overflow-hidden">
      <div class="absolute inset-0 opacity-20" style="background-image:url('/images/acp.webp'); background-size:cover; background-position:center;"></div>
      <div class="absolute inset-0 bg-gradient-to-r from-slate-900 via-slate-900/90 to-transparent"></div>
      <div class="container-custom relative z-10">
        <div class="max-w-3xl">
          <span class="inline-block bg-blue-500/20 text-blue-400 font-semibold px-4 py-1.5 rounded-full text-xs mb-6 border border-blue-500/30">ARCHITECTURAL CLADDING</span>
          <h1 class="text-4xl sm:text-5xl font-extrabold mb-6">Jasa Cutting ACP Fasad Gedung</h1>
          <p class="text-lg text-slate-300 mb-8 leading-relaxed">
            Potong dan lubangi (perforated) panel ACP bermotif kustom untuk pelapis eksterior dinding gedung modern, pintu pagar minimalis, dan pembatas balkon ruko.
          </p>
          <a href="${WA_LINK}" target="_blank" rel="noopener noreferrer" class="bg-green-500 hover:bg-green-600 text-white font-bold px-8 py-4 rounded-xl text-lg shadow-lg">Konsultasi Cutting ACP WA</a>
        </div>
      </div>
    </section>

    <!-- CONTENT -->
    <section class="py-20 bg-white text-slate-900">
      <div class="container-custom grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div>
          <h2 class="text-3xl font-bold mb-6">Fasad Bangunan Modern dengan Sentuhan Estetis</h2>
          <p class="text-slate-600 mb-6 leading-relaxed">
            Aluminium Composite Panel (ACP) merupakan bahan cladding eksterior paling populer karena bobotnya ringan, tahan cuaca ekstrem, dan minim perawatan. Dengan memotong pola ukiran kustom pada ACP menggunakan mesin CNC Router presisi tinggi kami, Anda dapat mewujudkan tampilan bangunan berkesan mewah, futuristik, dan memiliki sirkulasi udara ornamen berpori (*perforated panel*) yang baik.
          </p>
          <ul class="space-y-3 mb-6 text-slate-700">
            <li>✓ Presisi radius tikungan & pola keluk rumit</li>
            <li>✓ Menyediakan lembaran ACP merk premium standar proyek</li>
            <li>✓ Siap menerima jasa grooving/folding lipat sisi ACP</li>
          </ul>
        </div>
        <div>
          <img src="/images/acppro (2).webp" alt="ACP Cladding Exterior" class="rounded-2xl shadow-xl object-cover w-full h-[350px]" />
        </div>
      </div>
    </section>

    <!-- FAQ -->
    <section class="py-20 bg-slate-50 border-t border-slate-200">
      <div class="container-custom max-w-4xl">
        <h2 class="text-3xl font-bold text-center mb-12">FAQ Cutting ACP</h2>
        <div class="space-y-6">
          {faqs.map(faq => (
            <div class="bg-white p-6 rounded-2xl border border-slate-200">
              <h3 class="text-lg font-bold mb-2">{faq.question}</h3>
              <p class="text-slate-600 text-sm leading-relaxed">{faq.answer}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  </main>

  <Footer slot="footer" />
</BaseLayout>
`;
writeFile(path.join(SRC_DIR, 'pages', 'jasa-laser-cutting-acp.astro'), acpContent);

// --- 6. JASA-LASER-CUTTING-GRC.ASTRO ---
const grcContent = `---
// src/pages/jasa-laser-cutting-grc.astro
import BaseLayout from '../components/BaseLayout.astro';
import Header from '../components/Header.astro';
import Footer from '../components/Footer.astro';
import Breadcrumbs from '../components/Breadcrumbs.astro';
import { SITE_CONFIG } from '../utils/constants.js';
import { generateFAQSchema, generateBreadcrumbSchema } from '../utils/seo.js';

const faqs = [
  {
    question: "Ketebalan GRC board berapa saja yang bisa dipotong?",
    answer: "Kami memotong papan semen GRC mulai tebal 6mm, 8mm, 9mm, hingga panel tebal 12mm dan 15mm untuk kebutuhan eksterior bangunan."
  },
  {
    question: "Mengapa memotong GRC menggunakan mesin CNC Router?",
    answer: "GRC (Glassfibre Reinforced Concrete) terbuat dari campuran semen dan serat fiber semen yang sangat keras dan berdebu tebal jika dibakar dengan laser. CNC Router bermata potong berlian (*diamond bit*) khusus mampu meraut GRC dengan cepat tanpa menimbulkan keretakan struktural pada panel semen."
  }
];

const pageTitle = "Jasa Cutting GRC Fasad & Sekat Rumah Bintaro | Tepat Laser";
const pageDesc = "Jasa potong & ukir GRC Board (semen serat fiber) custom terdekat di Bintaro. Melayani pembuatan panel dekoratif fasad luar ruangan, kisi-kisi angin, pagar GRC.";
const pageKw = "jasa cutting grc, potong grc board, fasad grc semen, panel grc kerawang, bengkel cnc router grc";

const breadcrumbSchema = generateBreadcrumbSchema([
  { name: 'Beranda', url: '/' },
  { name: 'Laser Cutting GRC', url: '/jasa-laser-cutting-grc/' }
]);

const meta = {
  title: pageTitle,
  description: pageDesc,
  keywords: pageKw,
  url: '/jasa-laser-cutting-grc/',
  image: '/images/grc.webp',
  type: "website",
  jsonLd: [breadcrumbSchema, generateFAQSchema(faqs)]
};

const crumbs = breadcrumbSchema.itemListElement;
---

<BaseLayout {...meta}>
  <Header slot="header" />

  <main class="mt-16 overflow-x-hidden">
    <Breadcrumbs crumbs={crumbs} />

    <!-- HERO -->
    <section class="relative bg-slate-900 text-white py-24 overflow-hidden">
      <div class="absolute inset-0 opacity-20" style="background-image:url('/images/grc.webp'); background-size:cover; background-position:center;"></div>
      <div class="absolute inset-0 bg-gradient-to-r from-slate-900 via-slate-900/90 to-transparent"></div>
      <div class="container-custom relative z-10">
        <div class="max-w-3xl">
          <span class="inline-block bg-blue-500/20 text-blue-400 font-semibold px-4 py-1.5 rounded-full text-xs mb-6 border border-blue-500/30">CEMENT BOARD CNC SPECIALIST</span>
          <h1 class="text-4xl sm:text-5xl font-extrabold mb-6">Jasa Cutting GRC Fasad & Eksterior</h1>
          <p class="text-lg text-slate-300 mb-8 leading-relaxed">
            Potong panel semen serat GRC board untuk keperluan kisi-kisi angin eksterior rumah, plafon bermotif ukir kerawang, pagar semen, dan fasad luar ruangan anti air & api.
          </p>
          <a href="${WA_LINK}" target="_blank" rel="noopener noreferrer" class="bg-green-500 hover:bg-green-600 text-white font-bold px-8 py-4 rounded-xl text-lg shadow-lg">Konsultasi Cutting GRC WA</a>
        </div>
      </div>
    </section>

    <!-- CONTENT -->
    <section class="py-20 bg-white text-slate-900">
      <div class="container-custom grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div>
          <h2 class="text-3xl font-bold mb-6">Fasad Ornamen Semen Kokoh Tahan Segala Cuaca</h2>
          <p class="text-slate-600 mb-6 leading-relaxed">
            GRC Board (Glassfibre Reinforced Concrete) dikenal luas sebagai bahan panel yang sangat kokoh, anti-rayap, tahan air, dan tahan api, menjadikannya pilihan nomor satu untuk ornamen dinding eksterior bangunan di Indonesia. Menggunakan teknologi mesin router modern kami, tepi potongan GRC akan halus tegak lurus, siap diaplikasikan di lokasi proyek tanpa khawatir retak rambut di tepi motif ornamen.
          </p>
          <ul class="space-y-3 mb-6 text-slate-700">
            <li>✓ Sangat awet untuk aplikasi eksterior outdoor bertahun-tahun</li>
            <li>✓ Desain ornamen bernuansa klasik islami/mushola & masjid</li>
            <li>✓ Potongan presisi memudahkan proses pemasangan (fitting)</li>
          </ul>
        </div>
        <div>
          <img src="/images/grcpro (1).webp" alt="GRC Laser Cutting Application" class="rounded-2xl shadow-xl object-cover w-full h-[350px]" />
        </div>
      </div>
    </section>

    <!-- FAQ -->
    <section class="py-20 bg-slate-50 border-t border-slate-200">
      <div class="container-custom max-w-4xl">
        <h2 class="text-3xl font-bold text-center mb-12">FAQ Cutting GRC</h2>
        <div class="space-y-6">
          {faqs.map(faq => (
            <div class="bg-white p-6 rounded-2xl border border-slate-200">
              <h3 class="text-lg font-bold mb-2">{faq.question}</h3>
              <p class="text-slate-600 text-sm leading-relaxed">{faq.answer}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  </main>

  <Footer slot="footer" />
</BaseLayout>
`;
writeFile(path.join(SRC_DIR, 'pages', 'jasa-laser-cutting-grc.astro'), grcContent);

// --- 7. JASA-LASER-CUTTING-PLYWOOD.ASTRO ---
const plywoodContent = `---
// src/pages/jasa-laser-cutting-plywood.astro
import BaseLayout from '../components/BaseLayout.astro';
import Header from '../components/Header.astro';
import Footer from '../components/Footer.astro';
import Breadcrumbs from '../components/Breadcrumbs.astro';
import { SITE_CONFIG } from '../utils/constants.js';
import { generateFAQSchema, generateBreadcrumbSchema } from '../utils/seo.js';

const faqs = [
  {
    question: "Ketebalan triplek/multiplex berapa saja yang bisa dipotong?",
    answer: "Kami dapat memotong plywood (multiplex/triplek) mulai dari ketebalan tipis 3mm, 4mm, 5mm, 6mm, 9mm, hingga ketebalan tebal 12mm, 15mm, dan 18mm."
  },
  {
    question: "Apakah tepi potongan kayu plywood akan menghitam?",
    answer: "Karena proses pemotongan laser CO2 menggunakan energi panas, tepian kayu plywood akan berwarna cokelat hangus terbakar. Sisi artistik ini justru sering dicari untuk efek kontras bayangan ornamen kayu. Sisi hitam arang halus ini gampang ditimpa cat atau diamplas ringan."
  }
];

const pageTitle = "Jasa Laser Cutting Plywood & Triplek Custom Bintaro | Tepat Laser";
const pageDesc = "Jasa laser cutting plywood, multiplex, triplek, MDF custom terdekat di Bintaro. Solusi pembuatan sekat dinding, box hampers kayu, merchandise estetik.";
const pageKw = "jasa potong triplek laser, laser cutting plywood bintaro, potong multiplex custom, laser cutting kayu tangerang";

const breadcrumbSchema = generateBreadcrumbSchema([
  { name: 'Beranda', url: '/' },
  { name: 'Laser Cutting Plywood', url: '/jasa-laser-cutting-plywood/' }
]);

const meta = {
  title: pageTitle,
  description: pageDesc,
  keywords: pageKw,
  url: '/jasa-laser-cutting-plywood/',
  image: '/images/Ply Wood.webp',
  type: "website",
  jsonLd: [breadcrumbSchema, generateFAQSchema(faqs)]
};

const crumbs = breadcrumbSchema.itemListElement;
---

<BaseLayout {...meta}>
  <Header slot="header" />

  <main class="mt-16 overflow-x-hidden">
    <Breadcrumbs crumbs={crumbs} />

    <!-- HERO -->
    <section class="relative bg-amber-950 text-white py-24 overflow-hidden">
      <div class="absolute inset-0 opacity-20" style="background-image:url('/images/Ply Wood.webp'); background-size:cover; background-position:center;"></div>
      <div class="absolute inset-0 bg-gradient-to-r from-amber-950 via-amber-950/90 to-transparent"></div>
      <div class="container-custom relative z-10">
        <div class="max-w-3xl">
          <span class="inline-block bg-amber-500/20 text-amber-300 font-semibold px-4 py-1.5 rounded-full text-xs mb-6 border border-amber-500/30">NATURAL WOOD ARTISTRY</span>
          <h1 class="text-4xl sm:text-5xl font-extrabold mb-6">Jasa Laser Cutting Plywood & Multiplex</h1>
          <p class="text-lg text-amber-100/90 mb-8 leading-relaxed">
            Ukir dan potong papan triplek/multiplex berkualitas untuk kebutuhan display pajangan dinding bermotif urat kayu alami, box hampers premium, dan furnitur minimalis.
          </p>
          <a href="${WA_LINK}" target="_blank" rel="noopener noreferrer" class="bg-green-500 hover:bg-green-600 text-white font-bold px-8 py-4 rounded-xl text-lg shadow-lg">Konsultasi Potong Triplek WA</a>
        </div>
      </div>
    </section>

    <!-- CONTENT -->
    <section class="py-20 bg-white text-slate-900">
      <div class="container-custom grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div>
          <h2 class="text-3xl font-bold mb-6">Urat Kayu Alami Bernilai Seni & Kekuatan Tinggi</h2>
          <p class="text-slate-600 mb-6 leading-relaxed">
            Berbeda dengan MDF yang merupakan bubur kayu padat rekayasa, Plywood (Multiplex/Triplek) terbuat dari lembaran serat kayu alami berlapis-lapis silang yang direkatkan tekanan tinggi. Hal ini memberikan kekuatan struktural yang lebih baik dan ketahanan sekrup yang kokoh. Laser cutting CO2 kami memotong pola motif kerawang dekoratif pada triplek dengan sangat lurus, menghasilkan ornamen bermotif kayu natural yang estetik untuk interior cafe, masjid, hotel, maupun kantor.
          </p>
          <ul class="space-y-3 mb-6 text-slate-700">
            <li>✓ Serat urat kayu asli memberikan kesan natural & hangat</li>
            <li>✓ Sangat kokoh untuk gantungan pajangan dinding & partisi</li>
            <li>✓ Siap menerima plywood jenis sengon, meranti, maupun semi-meranti</li>
          </ul>
        </div>
        <div>
          <img src="/images/plywood (2).webp" alt="Plywood Laser Cut Products" class="rounded-2xl shadow-xl object-cover w-full h-[350px]" />
        </div>
      </div>
    </section>

    <!-- FAQ -->
    <section class="py-20 bg-slate-50 border-t border-slate-200">
      <div class="container-custom max-w-4xl">
        <h2 class="text-3xl font-bold text-center mb-12">FAQ Laser Plywood</h2>
        <div class="space-y-6">
          {faqs.map(faq => (
            <div class="bg-white p-6 rounded-2xl border border-slate-200">
              <h3 class="text-lg font-bold mb-2">{faq.question}</h3>
              <p class="text-slate-600 text-sm leading-relaxed">{faq.answer}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  </main>

  <Footer slot="footer" />
</BaseLayout>
`;
writeFile(path.join(SRC_DIR, 'pages', 'jasa-laser-cutting-plywood.astro'), plywoodContent);

// --- 8. JASA-LASER-CUTTING-PVC.ASTRO ---
const pvcContent = `---
// src/pages/jasa-laser-cutting-pvc.astro
import BaseLayout from '../components/BaseLayout.astro';
import Header from '../components/Header.astro';
import Footer from '../components/Footer.astro';
import Breadcrumbs from '../components/Breadcrumbs.astro';
import { SITE_CONFIG } from '../utils/constants.js';
import { generateFAQSchema, generateBreadcrumbSchema } from '../utils/seo.js';

const faqs = [
  {
    question: "Apa itu material PVC Board?",
    answer: "PVC Board (Polyvinyl Chloride Board / Forex) adalah lembaran plastik padat busa ringan yang tahan air, anti-rayap, tidak merambatkan api, dan sangat stabil. Sangat populer untuk sekat toilet, huruf timbul outdoor, dan dekorasi dinding."
  },
  {
    question: "Mengapa PVC board dipotong menggunakan CNC Router, bukan Laser?",
    answer: "PVC terbuat dari bahan vinil/klorida. Pemotongan laser menggunakan panas tinggi akan membakar PVC dan menghasilkan gas asam klorida beracun yang sangat berbahaya bagi kesehatan operator serta merusak komponen optik mesin laser. Oleh karena itu, PVC board 100% dipotong secara mekanis menggunakan CNC Router di workshop kami."
  }
];

const pageTitle = "Jasa Cutting PVC Board Sekat Toilet Bintaro | Tepat Laser";
const pageDesc = "Jasa pemotongan & ukir PVC Board / Forex kustom terdekat di Bintaro Tangerang Selatan menggunakan CNC router presisi tinggi. Tahan air & anti-rayap.";
const pageKw = "jasa cutting pvc board, sekat toilet pvc cnc, pvc board motif kerawang, cutting forex terdekat, cnc router pvc tangerang";

const breadcrumbSchema = generateBreadcrumbSchema([
  { name: 'Beranda', url: '/' },
  { name: 'Laser Cutting PVC', url: '/jasa-laser-cutting-pvc/' }
]);

const meta = {
  title: pageTitle,
  description: pageDesc,
  keywords: pageKw,
  url: '/jasa-laser-cutting-pvc/',
  image: '/images/pvc.webp',
  type: "website",
  jsonLd: [breadcrumbSchema, generateFAQSchema(faqs)]
};

const crumbs = breadcrumbSchema.itemListElement;
---

<BaseLayout {...meta}>
  <Header slot="header" />

  <main class="mt-16 overflow-x-hidden">
    <Breadcrumbs crumbs={crumbs} />

    <!-- HERO -->
    <section class="relative bg-slate-900 text-white py-24 overflow-hidden">
      <div class="absolute inset-0 opacity-20" style="background-image:url('/images/pvc.webp'); background-size:cover; background-position:center;"></div>
      <div class="absolute inset-0 bg-gradient-to-r from-slate-900 via-slate-900/90 to-transparent"></div>
      <div class="container-custom relative z-10">
        <div class="max-w-3xl">
          <span class="inline-block bg-blue-500/20 text-blue-400 font-semibold px-4 py-1.5 rounded-full text-xs mb-6 border border-blue-500/30">LIGHTWEIGHT WATERPROOF PANEL</span>
          <h1 class="text-4xl sm:text-5xl font-extrabold mb-6">Jasa Cutting PVC Board & Forex</h1>
          <p class="text-lg text-slate-300 mb-8 leading-relaxed">
            Potong sekat toilet cubicle, huruf timbul billboard luar ruangan, dan panel dinding pembatas ruangan berbahan PVC Board ringan anti-lapuk.
          </p>
          <a href="${WA_LINK}" target="_blank" rel="noopener noreferrer" class="bg-green-500 hover:bg-green-600 text-white font-bold px-8 py-4 rounded-xl text-lg shadow-lg">Konsultasi Cutting PVC WA</a>
        </div>
      </div>
    </section>

    <!-- CONTENT -->
    <section class="py-20 bg-white text-slate-900">
      <div class="container-custom grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div>
          <h2 class="text-3xl font-bold mb-6">Material Plastik Busa Pengganti Kayu yang Higienis</h2>
          <p class="text-slate-600 mb-6 leading-relaxed">
            PVC Board memiliki keunggulan mutlak dibanding kayu olahan: 100% tahan air, tidak lapuk di area lembab, anti-rayap, dan bobotnya sangat ringan. CNC Router kami memotong pola motif ornamen kustom pada papan PVC dengan sangat rapi dan bebas dari bekas sisa abu lelehan hitam. Sangat direkomendasikan untuk pembatas urinal toilet umum, hiasan sekat estetik di taman/outdoor, serta papan petunjuk reklame luar ruangan.
          </p>
          <ul class="space-y-3 mb-6 text-slate-700">
            <li>✓ Tepian potong rapi tanpa abu hangus</li>
            <li>✓ Tersedia ketebalan papan PVC 3mm hingga 20mm</li>
            <li>✓ Sangat gampang dipasang menggunakan lem silikon atau sekrup</li>
          </ul>
        </div>
        <div>
          <img src="/images/pcvboard (3).webp" alt="PVC Board CNC Cut Products" class="rounded-2xl shadow-xl object-cover w-full h-[350px]" />
        </div>
      </div>
    </section>

    <!-- FAQ -->
    <section class="py-20 bg-slate-50 border-t border-slate-200">
      <div class="container-custom max-w-4xl">
        <h2 class="text-3xl font-bold text-center mb-12">FAQ Cutting PVC</h2>
        <div class="space-y-6">
          {faqs.map(faq => (
            <div class="bg-white p-6 rounded-2xl border border-slate-200">
              <h3 class="text-lg font-bold mb-2">{faq.question}</h3>
              <p class="text-slate-600 text-sm leading-relaxed">{faq.answer}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  </main>

  <Footer slot="footer" />
</BaseLayout>
`;
writeFile(path.join(SRC_DIR, 'pages', 'jasa-laser-cutting-pvc.astro'), pvcContent);

// --- 9. ABOUT.ASTRO ---
const aboutContent = `---
// src/pages/about.astro
import BaseLayout from '../components/BaseLayout.astro';
import Header from '../components/Header.astro';
import Footer from '../components/Footer.astro';
import Breadcrumbs from '../components/Breadcrumbs.astro';
import { SITE_CONFIG } from '../utils/constants.js';
import { generateBreadcrumbSchema } from '../utils/seo.js';

const pageTitle = "Tentang Workshop Tepat Laser Bintaro | Tepat Laser";
const pageDesc = "Mengenal workshop jasa laser cutting Tepat Laser di Parigi Bintaro. Didukung mesin fiber laser dan CO2 mutakhir, operator handal, siap melayani skala proyek.";
const pageKw = "profil tepat laser, workshop laser bintaro, jasa potong laser tangerang selatan, laser cutting terdekat";

const breadcrumbSchema = generateBreadcrumbSchema([
  { name: 'Beranda', url: '/' },
  { name: 'Tentang Kami', url: '/about/' }
]);

const crumbs = breadcrumbSchema.itemListElement;
---

<BaseLayout title={pageTitle} description={pageDesc} keywords={pageKw} url="/about/">
  <Header slot="header" />

  <main class="mt-16 overflow-x-hidden">
    <Breadcrumbs crumbs={crumbs} />

    <!-- HERO -->
    <section class="relative bg-slate-900 text-white py-24 overflow-hidden">
      <div class="absolute inset-0 bg-[#070e17] opacity-85"></div>
      <div class="container-custom relative z-10 text-center">
        <h1 class="text-4xl sm:text-5xl font-extrabold mb-6">Tentang Workshop Tepat Laser</h1>
        <p class="text-lg text-slate-300 max-w-2xl mx-auto">
          Mendedikasikan presisi tinggi dan pengerjaan cepat untuk memajukan industri manufaktur, dekorasi interior, dan periklanan di Jabodetabek.
        </p>
      </div>
    </section>

    <!-- WORKSHOP DETAILS -->
    <section class="py-20 bg-white text-slate-900">
      <div class="container-custom grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <div>
          <h2 class="text-3xl font-bold mb-6">Mitra Terpercaya Fabrikasi Presisi Anda</h2>
          <p class="text-slate-600 mb-6 leading-relaxed">
            Didirikan dengan komitmen memberikan solusi pemotongan laser metal dan non-metal terbaik, <strong>Tepat Laser</strong> kini menjadi bengkel fabrikasi kepercayaan ratusan kontraktor sipil, pembuat furnitur interior, industri manufaktur, serta wirausaha advertising di wilayah Bintaro dan sekitarnya.
          </p>
          <p class="text-slate-600 mb-6 leading-relaxed">
            Workshop kami dilengkapi dengan deretan mesin canggih: <strong>Fiber Laser High-Power</strong> untuk lembaran logam tebal, mesin <strong>Laser CO2</strong> berkecepatan tinggi untuk akrilik dan kayu, serta mesin <strong>CNC Router Heavy-Duty</strong> untuk lembaran ACP, GRC, dan PVC Board utuh.
          </p>
          <p class="text-slate-600 leading-relaxed">
            Dukungan tim desainer CAD dan operator mesin bersertifikat memastikan setiap detail potongan memiliki deviasi toleransi di bawah ±0.02mm, dengan lead-time pengerjaan super cepat 1-3 hari kerja tanpa minimum order.
          </p>
        </div>
        <div class="space-y-6">
          <div class="p-6 rounded-2xl bg-slate-50 border border-slate-200">
            <h4 class="font-bold text-lg mb-2">📍 Lokasi Parigi Bintaro Tangsel</h4>
            <p class="text-slate-500 text-sm">{SITE_CONFIG.address}</p>
          </div>
          <div class="p-6 rounded-2xl bg-slate-50 border border-slate-200">
            <h4 class="font-bold text-lg mb-2">⏱ Jam Kerja Workshop</h4>
            <p class="text-slate-500 text-sm">{SITE_CONFIG.businessHours}</p>
          </div>
          <div class="p-6 rounded-2xl bg-slate-50 border border-slate-200">
            <h4 class="font-bold text-lg mb-2">📞 Whatsapp Hotline Support</h4>
            <p class="text-slate-500 text-sm">Hubungi Sales & Review Desain: +62 821-2129-2937</p>
          </div>
        </div>
      </div>
    </section>
  </main>

  <Footer slot="footer" />
</BaseLayout>
`;
writeFile(path.join(SRC_DIR, 'pages', 'about.astro'), aboutContent);

// --- 10. FAQ.ASTRO ---
const faqContent = `---
// src/pages/faq.astro
import BaseLayout from '../components/BaseLayout.astro';
import Header from '../components/Header.astro';
import Footer from '../components/Footer.astro';
import Breadcrumbs from '../components/Breadcrumbs.astro';
import { FAQ, SITE_CONFIG } from '../utils/constants.js';
import { generateFAQSchema, generateBreadcrumbSchema } from '../utils/seo.js';

const pageTitle = "FAQ Teknis & Tanya Jawab Jasa Laser Cutting | Tepat Laser";
const pageDesc = "Daftar tanya jawab terlengkap seputar kapasitas mesin laser fiber & CO2, ketebalan logam/kayu, format file desain CAD, dan biaya pengiriman Bintaro.";
const pageKw = "faq laser cutting, ketentuan potong laser, format file dxf autocad, harga laser cutting per meter";

const breadcrumbSchema = generateBreadcrumbSchema([
  { name: 'Beranda', url: '/' },
  { name: 'FAQ', url: '/faq/' }
]);

const meta = {
  title: pageTitle,
  description: pageDesc,
  keywords: pageKw,
  url: '/faq/',
  type: "website",
  jsonLd: [breadcrumbSchema, generateFAQSchema(FAQ)]
};

const crumbs = breadcrumbSchema.itemListElement;
---

<BaseLayout {...meta}>
  <Header slot="header" />

  <main class="mt-16 overflow-x-hidden">
    <Breadcrumbs crumbs={crumbs} />

    <!-- HERO -->
    <section class="relative bg-slate-900 text-white py-20 text-center">
      <div class="container-custom relative z-10">
        <h1 class="text-4xl font-extrabold mb-4">Pusat Bantuan & FAQ Teknis</h1>
        <p class="text-slate-300 max-w-2xl mx-auto">Temukan jawaban cepat untuk pertanyaan operasional dan kapasitas bengkel Tepat Laser.</p>
      </div>
    </section>

    <!-- FAQ LIST -->
    <section class="py-20 bg-white text-slate-900">
      <div class="container-custom max-w-4xl">
        <div class="space-y-8">
          {FAQ.map(faq => (
            <div class="p-8 rounded-2xl bg-slate-50 border border-slate-200">
              <h3 class="text-xl font-bold mb-3 text-slate-900">❓ {faq.question}</h3>
              <p class="text-slate-600 leading-relaxed text-sm md:text-base">{faq.answer}</p>
            </div>
          ))}
          <!-- Additional general questions -->
          <div class="p-8 rounded-2xl bg-slate-50 border border-slate-200">
            <h3 class="text-xl font-bold mb-3 text-slate-900">❓ Apakah Tepat Laser menyediakan jasa pengiriman barang?</h3>
            <p class="text-slate-600 leading-relaxed text-sm">Ya, kami melayani pengiriman hasil jadi laser cutting ke seluruh Jabodetabek menggunakan armada pickup internal kami maupun ekspedisi kargo pihak ketiga. Untuk pemesanan dengan volume tertentu, kami menyediakan **layanan free ongkir** langsung ke lokasi proyek Anda.</p>
          </div>
          <div class="p-8 rounded-2xl bg-slate-50 border border-slate-200">
            <h3 class="text-xl font-bold mb-3 text-slate-900">❓ Bagaimana cara melakukan pembayaran order?</h3>
            <p class="text-slate-600 leading-relaxed text-sm">Pembayaran dilakukan dengan deposit (down payment) sebesar 50% sebelum proses pemotongan dimulai, dan pelunasan 50% sisanya dilakukan setelah pengerjaan selesai sebelum barang dikirim atau diambil di workshop.</p>
          </div>
        </div>
      </div>
    </section>
  </main>

  <Footer slot="footer" />
</BaseLayout>
`;
writeFile(path.join(SRC_DIR, 'pages', 'faq.astro'), faqContent);

// --- 11. PORTFOLIO.ASTRO ---
const portfolioContent = `---
// src/pages/portfolio.astro
import BaseLayout from '../components/BaseLayout.astro';
import Header from '../components/Header.astro';
import Footer from '../components/Footer.astro';
import Breadcrumbs from '../components/Breadcrumbs.astro';
import { PORTFOLIO_PROJECTS, SITE_CONFIG } from '../utils/constants.js';
import { generateBreadcrumbSchema } from '../utils/seo.js';

const pageTitle = "Galeri Portfolio & Proyek Fabrikasi Laser Cutting | Tepat Laser";
const pageDesc = "Lihat galeri hasil kerja pengerjaan laser cutting metal & non-metal terbaik kami: pagar motif laser besi, partisi ruangan stainless steel mirror, signage akrilik.";
const pageKw = "portfolio laser cutting, hasil kerja tepat laser, contoh gerbang laser besi, foto huruf timbul stainless";

const breadcrumbSchema = generateBreadcrumbSchema([
  { name: 'Beranda', url: '/' },
  { name: 'Portfolio', url: '/portfolio/' }
]);

const crumbs = breadcrumbSchema.itemListElement;
---

<BaseLayout title={pageTitle} description={pageDesc} keywords={pageKw} url="/portfolio/">
  <Header slot="header" />

  <main class="mt-16 overflow-x-hidden">
    <Breadcrumbs crumbs={crumbs} />

    <!-- HERO -->
    <section class="relative bg-slate-900 text-white py-20 text-center">
      <div class="container-custom relative z-10">
        <h1 class="text-4xl font-extrabold mb-4">Galeri Portfolio Hasil Karya</h1>
        <p class="text-slate-300 max-w-2xl mx-auto">Kumpulan bukti pengerjaan riil untuk klien korporat, kontraktor arsitektur, dan perorangan presisi tinggi.</p>
      </div>
    </section>

    <!-- GRID -->
    <section class="py-20 bg-white text-slate-900">
      <div class="container-custom">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {PORTFOLIO_PROJECTS.map(project => (
            <div class="group bg-slate-50 border border-slate-200 rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300">
              <div class="h-64 overflow-hidden bg-slate-200">
                <img src={project.image} alt={project.title} class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              </div>
              <div class="p-6">
                <span class="text-xs font-bold uppercase tracking-wider text-blue-600 bg-blue-100/50 px-3 py-1 rounded-full">{project.category}</span>
                <h3 class="text-xl font-bold mt-4 mb-2 text-slate-900">{project.title}</h3>
                <p class="text-slate-500 text-sm mb-4">{project.description}</p>
                <div class="border-t border-slate-200 pt-4 text-xs text-slate-400 space-y-1">
                  <div><strong>Klien:</strong> {project.client}</div>
                  <div><strong>Bahan:</strong> {project.material}</div>
                  <div><strong>Metode:</strong> {project.technique}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  </main>

  <Footer slot="footer" />
</BaseLayout>
`;
writeFile(path.join(SRC_DIR, 'pages', 'portfolio.astro'), portfolioContent);

console.log("Rewritten all remaining pages with extremely rich SEO and design system components!");

// 5. RUN BUILD TO VERIFY EVERYTHING COMPILES PROPERLY
console.log("Running npm run build to verify...");
try {
  const buildOutput = execSync("npm run build", { cwd: PROJECT_DIR, encoding: 'utf8' });
  console.log("Build Success!");
  console.log(buildOutput);

  // 6. GIT OPERATIONS
  console.log("Running git operations...");
  execSync("git add .", { cwd: PROJECT_DIR });
  execSync("git commit -m \"SEO: Expand all remaining services, materials, about, faq, and portfolio pages with rich content\"", { cwd: PROJECT_DIR });
  console.log("Pushing to git...");
  execSync("git push", { cwd: PROJECT_DIR });
  console.log("Successfully updated and pushed all pages!");
} catch (error) {
  console.error("--- ERROR ENCOUNTERED DURING BUILD ---");
  console.error(error.stdout || error.message);
  process.exit(1);
}
