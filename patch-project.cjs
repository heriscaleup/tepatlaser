// D:\code\tepatlaser\patch-project.cjs
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

console.log("=== STARTING TEPAT LASER AUTOMATION PATCH ===");

const PROJECT_DIR = __dirname;
const SRC_DIR = path.join(PROJECT_DIR, 'src');

// Helper to write files
function writeFile(filePath, content) {
  const dir = path.dirname(filePath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`Written: ${path.relative(PROJECT_DIR, filePath)}`);
}

// Helper to delete files
function deleteFile(filePath) {
  if (fs.existsSync(filePath)) {
    fs.unlinkSync(filePath);
    console.log(`Deleted: ${path.relative(PROJECT_DIR, filePath)}`);
  }
}

// 1. UPDATE CONSTANTS.JS
const constantsPath = path.join(SRC_DIR, 'utils', 'constants.js');
if (fs.existsSync(constantsPath)) {
  let constantsContent = fs.readFileSync(constantsPath, 'utf8');
  
  // Replace slugs and navigations
  constantsContent = constantsContent
    .replace(/'\/jasa-laser-cutting-stainless\/'/g, "'/laser-stainless-bintaro/'")
    .replace(/'\/jasa-laser-cutting-akrilik\/'/g, "'/laser-cutting-akrilik/'")
    .replace(/'\/jasa-laser-cutting-mdf\/'/g, "'/jasa-laser-cutting-mdf-ai/'")
    .replace(/'\/material-metal\/'/g, "'/jasa-laser-cutting-metal/'")
    .replace(/"jasa-laser-cutting-akrilik"/g, '"laser-cutting-akrilik"')
    .replace(/"jasa-laser-cutting-mdf"/g, '"jasa-laser-cutting-mdf-ai"')
    .replace(/"jasa-laser-cutting-stainless"/g, '"laser-stainless-bintaro"')
    .replace(/"material-metal"/g, '"jasa-laser-cutting-metal"')
    .replace(/slug:\s*"material-metal"/g, 'slug: "jasa-laser-cutting-metal"')
    .replace(/slug:\s*"jasa-laser-cutting-stainless"/g, 'slug: "laser-stainless-bintaro"')
    .replace(/slug:\s*"jasa-laser-cutting-mdf"/g, 'slug: "jasa-laser-cutting-mdf-ai"')
    .replace(/slug:\s*"jasa-laser-cutting-akrilik"/g, 'slug: "laser-cutting-akrilik"');
    
  writeFile(constantsPath, constantsContent);
  console.log("Updated constants.js");
}

// 2. RECURSIVE SEARCH AND REPLACE FOR OLD SLUGS IN THE SRC DIR
function walkDir(dir, callback) {
  fs.readdirSync(dir).forEach(f => {
    let dirPath = path.join(dir, f);
    let isDirectory = fs.statSync(dirPath).isDirectory();
    if (isDirectory) {
      if (f !== 'node_modules' && f !== '.git' && f !== '.astro' && f !== 'dist') {
        walkDir(dirPath, callback);
      }
    } else {
      callback(dirPath);
    }
  });
}

console.log("Replacing old slug references in src directory...");
walkDir(SRC_DIR, (filePath) => {
  if (path.extname(filePath) === '.astro' || path.extname(filePath) === '.js' || path.extname(filePath) === '.ts') {
    let content = fs.readFileSync(filePath, 'utf8');
    let original = content;
    
    content = content
      .replace(/\/jasa-laser-cutting-stainless\//g, '/laser-stainless-bintaro/')
      .replace(/\/jasa-laser-cutting-akrilik\//g, '/laser-cutting-akrilik/')
      .replace(/\/jasa-laser-cutting-mdf\//g, '/jasa-laser-cutting-mdf-ai/')
      .replace(/\/material-metal\//g, '/jasa-laser-cutting-metal/')
      .replace(/jasa-laser-cutting-stainless\.astro/g, 'laser-stainless-bintaro.astro')
      .replace(/jasa-laser-cutting-akrilik\.astro/g, 'laser-cutting-akrilik.astro')
      .replace(/jasa-laser-cutting-mdf\.astro/g, 'jasa-laser-cutting-mdf-ai.astro')
      .replace(/material-metal\.astro/g, 'jasa-laser-cutting-metal.astro');
      
    if (content !== original) {
      fs.writeFileSync(filePath, content, 'utf8');
      console.log(`Replaced references in: ${path.relative(PROJECT_DIR, filePath)}`);
    }
  }
});

// 3. DEFINE ASTRO PAGE CONTENTS

// --- A. INDEX.ASTRO (REDESIGNED HOME PAGE) ---
const indexAstroContent = `---
// src/pages/index.astro
import BaseLayout from '../components/BaseLayout.astro';
import Header from '../components/Header.astro';
import Footer from '../components/Footer.astro';
import BeforeAfter from '../components/BeforeAfter.astro';
import { SERVICES, MATERIALS, TESTIMONIALS, FAQ, SITE_CONFIG, WHATSAPP_MESSAGES } from '../utils/constants.js';
import { generateFAQSchema, generateReviewSchema } from '../utils/seo.js';

const meta = {
  title: "Jasa Laser Cutting Metal & Non-Metal Terbaik #1 | Tepat Laser",
  description: "Jasa laser cutting profesional 24 Jam dapat ditunggu. Potong plat besi, stainless steel, akrilik, MDF, ACP, GRC presisi tinggi, free design, free ongkir Jabodetabek!",
  keywords: "jasa laser cutting, laser cutting metal, laser cutting akrilik, laser cutting mdf, laser stainless bintaro, laser cutting tangerang",
  url: "/",
  type: "website",
  image: "/images/logo.webp",
  author: SITE_CONFIG.author,
  jsonLd: [generateFAQSchema(FAQ), generateReviewSchema(TESTIMONIALS)]
};

const WA = SITE_CONFIG.whatsapp;
const WA_LINK = \`https://wa.me/\${WA}?text=\${encodeURIComponent("Halo Tepat Laser, saya ingin tanya penawaran jasa laser cutting.")}\`;
---

<BaseLayout {...meta}>
  <Header slot="header" />

  <main class="overflow-x-hidden">
    <!-- HERO SECTION (Stripe/Fintech Elite Sect - Vibrant Gradients & Glowing Borders) -->
    <section class="relative min-h-[90vh] flex items-center justify-center bg-[#070e17] text-white pt-28 pb-20 overflow-hidden">
      <!-- Glow effect background -->
      <div class="absolute top-1/4 left-1/4 w-[400px] h-[400px] bg-blue-600/10 rounded-full blur-[100px] pointer-events-none"></div>
      <div class="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-emerald-500/10 rounded-full blur-[100px] pointer-events-none"></div>

      <div class="container-custom relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        <div class="lg:col-span-7 text-left">
          <div class="inline-flex items-center gap-2 bg-blue-500/15 border border-blue-500/30 rounded-full px-4 py-1.5 mb-6">
            <span class="w-2.5 h-2.5 bg-[#00FF7F] rounded-full animate-ping"></span>
            <span class="text-blue-300 text-sm font-semibold tracking-wider">WORKSHOP UTAMA · JASA LASER 24 JAM</span>
          </div>

          <h1 class="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight tracking-tight text-white mb-6">
            Potong Plat Besi, <span class="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-[#00FF7F]">Stainless</span>, dan Part Custom <span class="text-white">Lebih Rapi & Presisi</span>
          </h1>

          <p class="text-lg sm:text-xl text-slate-300 mb-8 max-w-2xl leading-relaxed">
            Tepat Laser melayani jasa laser cutting metal untuk kebutuhan part custom, panel box, perforated, cover, ornamen pagar, railing, facade, dan kebutuhan proyek lainnya sesuai file dan ukuran Anda.
          </p>

          <div class="space-y-4 mb-8">
            <div class="flex items-center gap-3 text-slate-200">
              <div class="w-6 h-6 rounded-full bg-emerald-500/20 flex items-center justify-center text-[#00FF7F] flex-shrink-0">✓</div>
              <span>Cocok untuk kontraktor, fabricator, vendor signage, workshop, dan proyek</span>
            </div>
            <div class="flex items-center gap-3 text-slate-200">
              <div class="w-6 h-6 rounded-full bg-emerald-500/20 flex items-center justify-center text-[#00FF7F] flex-shrink-0">✓</div>
              <span>Bisa jasa cutting saja atau paket pengerjaan produk jadi</span>
            </div>
            <div class="flex items-center gap-3 text-slate-200">
              <div class="w-6 h-6 rounded-full bg-emerald-500/20 flex items-center justify-center text-[#00FF7F] flex-shrink-0">✓</div>
              <span>Kirim file, ukuran, bahan, dan ketebalan untuk review instan</span>
            </div>
          </div>

          <div class="flex flex-col sm:flex-row gap-4">
            <a href={WA_LINK} target="_blank" rel="noopener noreferrer" 
               class="inline-flex items-center justify-center gap-3 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-bold px-8 py-4 rounded-xl text-lg transition-all shadow-lg shadow-emerald-500/30 transform hover:-translate-y-1">
              <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
              </svg>
              Konsultasi WhatsApp Sekarang
            </a>
            <a href="#layanan-metal" class="inline-flex items-center justify-center border-2 border-slate-700 hover:border-slate-500 text-white font-semibold px-8 py-4 rounded-xl text-lg transition-all hover:bg-slate-800">
              Lihat Layanan Kami
            </a>
          </div>
        </div>
        <div class="lg:col-span-5 relative">
          <!-- Glassmorphism Container with image -->
          <div class="relative rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-md shadow-2xl">
            <img src="/images/metal.webp" alt="Laser Cutting Machine Tepat Laser" class="w-full h-auto rounded-xl object-cover" />
            <!-- Floating badge -->
            <div class="absolute -bottom-6 -left-6 bg-slate-900 border border-white/10 rounded-2xl p-4 flex items-center gap-3 shadow-xl">
              <div class="w-12 h-12 bg-blue-600/20 rounded-xl flex items-center justify-center text-blue-400 font-bold text-xl">10+</div>
              <div>
                <p class="text-xs text-slate-400 font-medium leading-none">PENGALAMAN</p>
                <p class="text-sm font-bold text-white mt-1">Tahun di Industri</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- PILAR KERJA / "Yang paling sering kami kerjakan" -->
    <section id="layanan-metal" class="py-24 bg-white text-slate-900">
      <div class="container-custom">
        <div class="text-center mb-16">
          <h2 class="text-3xl md:text-4xl font-bold tracking-tight text-slate-900 mb-4">Pekerjaan Metal & Non-Metal yang Paling Sering Kami Tangani</h2>
          <p class="text-lg text-slate-600 max-w-3xl mx-auto">Kami berfokus pada kebutuhan pemotongan laser yang paling umum dicari pelanggan dengan kualitas mesin fiber & CO2 terbaik.</p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <!-- Card 1 -->
          <div class="group bg-slate-50 border border-slate-200/80 rounded-2xl p-6 hover:shadow-xl transition-all duration-300">
            <div class="h-44 overflow-hidden rounded-xl mb-6 bg-slate-200">
              <img src="/images/stainlesssteel (2).webp" alt="Perforated Stainless" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
            </div>
            <h3 class="text-xl font-bold mb-3">Perforated Stainless</h3>
            <p class="text-slate-600 text-sm mb-4">Untuk cover, ventilasi, panel dekoratif, dan kebutuhan pola custom pada material stainless.</p>
            <a href="/laser-stainless-bintaro/" class="text-blue-600 font-semibold text-sm hover:underline">Selengkapnya →</a>
          </div>

          <!-- Card 2 -->
          <div class="group bg-slate-50 border border-slate-200/80 rounded-2xl p-6 hover:shadow-xl transition-all duration-300">
            <div class="h-44 overflow-hidden rounded-xl mb-6 bg-slate-200">
              <img src="/images/metal.webp" alt="Part Custom & Plate" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
            </div>
            <h3 class="text-xl font-bold mb-3">Part Custom & Plate</h3>
            <p class="text-slate-600 text-sm mb-4">Untuk bracket, cover, sparepart, plate custom, dan komponen lain sesuai file ukuran gambar.</p>
            <a href="/jasa-laser-cutting-metal/" class="text-blue-600 font-semibold text-sm hover:underline">Selengkapnya →</a>
          </div>

          <!-- Card 3 -->
          <div class="group bg-slate-50 border border-slate-200/80 rounded-2xl p-6 hover:shadow-xl transition-all duration-300">
            <div class="h-44 overflow-hidden rounded-xl mb-6 bg-slate-200">
              <img src="/images/mdf (1).webp" alt="MDF & Kayu" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
            </div>
            <h3 class="text-xl font-bold mb-3">Panel MDF & Kayu</h3>
            <p class="text-slate-600 text-sm mb-4">Untuk partisi ruangan, ornamen dinding MDF, furniture custom, dan ukiran kayu presisi tinggi.</p>
            <a href="/jasa-laser-cutting-mdf-ai/" class="text-blue-600 font-semibold text-sm hover:underline">Selengkapnya →</a>
          </div>

          <!-- Card 4 -->
          <div class="group bg-slate-50 border border-slate-200/80 rounded-2xl p-6 hover:shadow-xl transition-all duration-300">
            <div class="h-44 overflow-hidden rounded-xl mb-6 bg-slate-200">
              <img src="/images/Acrylic.webp" alt="Ornamen Akrilik" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
            </div>
            <h3 class="text-xl font-bold mb-3">Ornamen Akrilik</h3>
            <p class="text-slate-600 text-sm mb-4">Untuk huruf timbul, signage akrilik toko, display acrylic box, produk promosi, dan dekorasi pajangan.</p>
            <a href="/laser-cutting-akrilik/" class="text-blue-600 font-semibold text-sm hover:underline">Selengkapnya →</a>
          </div>
        </div>
      </div>
    </section>

    <!-- BEFORE AFTER COMPONENT -->
    <BeforeAfter />

    <!-- KENAPA TEPAT LASER (Apple Bento Box style) -->
    <section class="py-24 bg-slate-50 text-slate-900 border-t border-slate-200">
      <div class="container-custom">
        <div class="text-center mb-16">
          <h2 class="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Lebih Mudah Digunakan untuk Kebutuhan Custom & Proyek</h2>
          <p class="text-lg text-slate-600 max-w-2xl mx-auto">Yang paling penting untuk pekerjaan laser bukan sekadar bisa potong, tapi komunikasi jelas dan file ter-review dengan benar.</p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div class="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between">
            <div>
              <div class="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center text-blue-600 font-bold mb-6">01</div>
              <h3 class="text-xl font-bold mb-4">Bisa Mulai dari Jasa Cutting</h3>
              <p class="text-slate-600">Kalau Anda hanya butuh jasa cutting saja sesuai dengan file yang sudah disiapkan, kami siap proses tanpa paksaan harus beli paket produk jadi.</p>
            </div>
          </div>
          <div class="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between">
            <div>
              <div class="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center text-emerald-600 font-bold mb-6">02</div>
              <h3 class="text-xl font-bold mb-4">Sangat Cocok untuk Job Custom</h3>
              <p class="text-slate-600">Sangat direkomendasikan untuk pembuatan part custom, bracket, panel, cover, perforated, dan barang custom yang ukurannya tidak seragam.</p>
            </div>
          </div>
          <div class="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between">
            <div>
              <div class="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center text-purple-600 font-bold mb-6">03</div>
              <h3 class="text-xl font-bold mb-4">Review Detail Sebelum Proses</h3>
              <p class="text-slate-600">Bahan, ketebalan, toleransi ukuran, dan scope pengerjaan kami cek dulu di awal agar pengerjaan presisi dan bebas salah paham.</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- CARA ORDER & TIMELINE -->
    <section class="py-24 bg-white text-slate-900 border-t border-slate-200">
      <div class="container-custom grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <div>
          <h2 class="text-3xl md:text-4xl font-bold mb-6">Supaya Cepat Diproses, Kirim Detail yang Dibutuhkan</h2>
          <p class="text-lg text-slate-600 mb-8">Alur pemesanan kami rancang sesederhana mungkin agar Anda tidak perlu bolak-balik menjelaskan detail secara berulang-ulang.</p>
          <div class="p-6 rounded-2xl bg-blue-50 border border-blue-200">
            <h4 class="font-bold text-blue-900 mb-2">💡 Info Cepat Tanya Quote</h4>
            <p class="text-blue-800 text-sm">Siapkan data: Jenis Bahan, Ketebalan (mm), Dimensi Ukuran, Jumlah (pcs), dan file format CAD/Vector jika sudah ada.</p>
          </div>
        </div>
        <div class="space-y-8">
          <div class="flex gap-6">
            <div class="w-12 h-12 rounded-full bg-slate-900 text-white font-bold flex items-center justify-center flex-shrink-0">1</div>
            <div>
              <h3 class="text-xl font-bold mb-2">Kirim File atau Gambar Ukuran</h3>
              <p class="text-slate-600 text-sm">Sertakan bahan, ketebalan, ukuran, jumlah, dan detail hasil akhir yang Anda inginkan ke admin WhatsApp kami.</p>
            </div>
          </div>
          <div class="flex gap-6">
            <div class="w-12 h-12 rounded-full bg-slate-900 text-white font-bold flex items-center justify-center flex-shrink-0">2</div>
            <div>
              <h3 class="text-xl font-bold mb-2">Kami Review Kelayakan Job</h3>
              <p class="text-slate-600 text-sm">Tim teknis kami akan langsung memeriksa kesesuaian bahan, ketebalan plat, lekukan desain, dan toleransi potong.</p>
            </div>
          </div>
          <div class="flex gap-6">
            <div class="w-12 h-12 rounded-full bg-slate-900 text-white font-bold flex items-center justify-center flex-shrink-0">3</div>
            <div>
              <h3 class="text-xl font-bold mb-2">Lanjut ke Penawaran & Pengerjaan</h3>
              <p class="text-slate-600 text-sm">Begitu detail oke, harga penawaran final dikirim. Invoice disetujui, pengerjaan langsung masuk antrean mesin.</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- TESTIMONIALS (Original Andi, Elizabeth, Ferdian) -->
    <section class="py-24 bg-slate-50 text-slate-900 border-t border-slate-200">
      <div class="container-custom">
        <div class="text-center mb-16">
          <h2 class="text-3xl md:text-4xl font-bold mb-4">Pengalaman Nyata Pelanggan Tepat Laser</h2>
          <p class="text-lg text-slate-600 max-w-2xl mx-auto">Kami menjaga reputasi lewat presisi hasil dan kecepatan pengiriman.</p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div class="bg-white p-8 rounded-2xl border border-slate-200/80 shadow-sm flex flex-col justify-between">
            <p class="text-slate-700 italic mb-6">"Hasil potong laser sangat presisi dan rapi. Cocok untuk proyek pagar metal kami, komunikasinya juga enak dan fast response."</p>
            <div>
              <p class="font-bold text-slate-900">Pak Andi</p>
              <p class="text-slate-500 text-xs font-semibold">Project Manager Kontraktor</p>
            </div>
          </div>
          <div class="bg-white p-8 rounded-2xl border border-slate-200/80 shadow-sm flex flex-col justify-between">
            <p class="text-slate-700 italic mb-6">"Puas dengan kualitas laser cutting plat besi untuk railing tangga. Hasil bersih, toleransi akurat, dan harga masih kompetitif."</p>
            <div>
              <p class="font-bold text-slate-900">Elizabeth</p>
              <p class="text-slate-500 text-xs font-semibold">Owner Kontraktor Sipil</p>
            </div>
          </div>
          <div class="bg-white p-8 rounded-2xl border border-slate-200/80 shadow-sm flex flex-col justify-between">
            <p class="text-slate-700 italic mb-6">"Cocok untuk project yang waktunya mepet. Enak untuk diskusi kebutuhan dan hasilnya sesuai kebutuhan interior custom."</p>
            <div>
              <p class="font-bold text-slate-900">Ferdian</p>
              <p class="text-slate-500 text-xs font-semibold">Interior Designer</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- FAQ SECTION -->
    <section class="py-24 bg-white text-slate-900 border-t border-slate-200">
      <div class="container-custom">
        <div class="text-center mb-16">
          <h2 class="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Pertanyaan yang Sering Diajukan (FAQ)</h2>
          <p class="text-lg text-slate-600">Jawaban cepat untuk pertanyaan teknis seputar pemesanan laser cutting.</p>
        </div>

        <div class="max-w-4xl mx-auto space-y-6">
          {FAQ.map((item, index) => (
            <div class="bg-slate-50 rounded-2xl border border-slate-200 p-6">
              <h3 class="text-lg font-bold text-slate-900 mb-2">{item.question}</h3>
              <p class="text-slate-600 text-sm leading-relaxed">{item.answer}</p>
            </div>
          ))}
        </div>
      </div>
    </section>

    <!-- LOCATION MAPS -->
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
          <h3 class="text-xl font-bold mb-4">Workshop Bintaro</h3>
          <p class="text-slate-600 text-sm mb-6">{SITE_CONFIG.address}</p>
          <h4 class="font-bold text-sm text-slate-900 mb-2">Jam Operasional:</h4>
          <p class="text-slate-600 text-sm mb-6">{SITE_CONFIG.businessHours}</p>
          <a href={WA_LINK} target="_blank" rel="noopener noreferrer" class="inline-flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white font-bold px-6 py-3 rounded-lg text-sm w-full">
            Kunjungi Workshop Kami
          </a>
        </div>
      </div>
    </section>
  </main>

  <Footer slot="footer" />
</BaseLayout>
`;
writeFile(path.join(SRC_DIR, 'pages', 'index.astro'), indexAstroContent);


// --- B. JASA-LASER-CUTTING-METAL.ASTRO (METAL PAGE) ---
const metalAstroContent = `---
// src/pages/jasa-laser-cutting-metal.astro
import BaseLayout from '../components/BaseLayout.astro';
import Header from '../components/Header.astro';
import Footer from '../components/Footer.astro';
import Breadcrumbs from '../components/Breadcrumbs.astro';
import { MATERIALS, SITE_CONFIG } from '../utils/constants.js';
import { generateFAQSchema, generateBreadcrumbSchema } from '../utils/seo.js';

const material = MATERIALS.find(m => m.id === 'metal') || { image: '/images/metal.webp', slug: 'jasa-laser-cutting-metal' };
const WA = SITE_CONFIG.whatsapp;
const WA_LINK = \`https://wa.me/\${WA}?text=\${encodeURIComponent("Halo Tepat Laser, saya ingin tanya penawaran jasa laser cutting metal.")}\`;

const faqs = [
  {
    question: "Material metal apa saja yang bisa dipotong?",
    answer: "Kami melayani pemotongan plat besi (mild steel/carbon steel), stainless steel (tipe SS201, SS304, SS316), aluminium, kuningan, dan tembaga dengan presisi laser fiber."
  },
  {
    question: "Berapa ketebalan plat metal yang bisa dipotong?",
    answer: "Mesin laser fiber kami dapat memotong plat besi hingga ketebalan 12mm, stainless steel hingga 10mm, and aluminium alloy hingga 8mm."
  },
  {
    question: "Apakah bisa membawa bahan sendiri?",
    answer: "Tentu saja. Anda bisa membawa bahan metal sendiri ke workshop kami dan kami hanya mengenakan jasa pemotongan saja berdasarkan panjang cutting."
  }
];

const pageTitle = "Jasa Laser Cutting Metal & Plat Besi Murah Presisi | Tepat Laser";
const pageDesc = "Spesialis jasa laser cutting metal & plat besi terdekat Bintaro. Potong plat besi, aluminium, stainless steel rapi & cepat. Konsultasi & review file gratis!";
const pageKw = "jasa laser cutting metal, potong plat besi laser, laser cutting mild steel, harga laser cutting metal";

const breadcrumbSchema = generateBreadcrumbSchema([
  { name: 'Beranda', url: '/' },
  { name: 'Laser Cutting Metal', url: '/jasa-laser-cutting-metal/' }
]);

const meta = {
  title: pageTitle,
  description: pageDesc,
  keywords: pageKw,
  url: '/jasa-laser-cutting-metal/',
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
    <section class="relative bg-slate-900 text-white py-24 overflow-hidden">
      <div class="absolute inset-0 opacity-20" style="background-image:url('/images/metal.webp'); background-size:cover; background-position:center;"></div>
      <div class="absolute inset-0 bg-gradient-to-r from-slate-900 via-slate-900/90 to-transparent"></div>
      <div class="container-custom relative z-10">
        <div class="max-w-3xl">
          <span class="inline-block bg-blue-500/20 text-blue-400 font-semibold px-4 py-1.5 rounded-full text-sm mb-6 border border-blue-500/30">PRESUPER LASER FIBER</span>
          <h1 class="text-4xl sm:text-5xl font-extrabold leading-tight mb-6">
            Jasa Laser Cutting Metal & Potong Plat Besi Presisi
          </h1>
          <p class="text-lg sm:text-xl text-slate-300 mb-8">
            Penyedia jasa laser fiber cutting metal tercepat untuk keperluan industri, sparepart custom, bracket plat, panel box, pagar, dan railing ornamen besi.
          </p>
          <div class="flex flex-col sm:flex-row gap-4">
            <a href={WA_LINK} target="_blank" rel="noopener noreferrer" class="inline-flex items-center justify-center bg-green-500 hover:bg-green-600 text-white font-bold px-8 py-4 rounded-xl text-lg shadow-lg shadow-green-500/20">
              Kirim File Desain ke WA
            </a>
            <a href="tel:6282121292937" class="inline-flex items-center justify-center border-2 border-slate-700 hover:border-slate-500 text-white font-semibold px-8 py-4 rounded-xl text-lg hover:bg-slate-800">
              Hubungi Sales Metal
            </a>
          </div>
        </div>
      </div>
    </section>

    <!-- CONTENT DETAILS -->
    <section class="py-20 bg-white text-slate-900">
      <div class="container-custom grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div>
          <h2 class="text-3xl font-bold mb-6">Potong Logam Presisi Tinggi dengan Teknologi Laser Fiber</h2>
          <p class="text-slate-600 mb-6 leading-relaxed">
            Mesin Fiber Laser cutting kami menjamin akurasi potongan hingga ±0.02mm. Sangat direkomendasikan untuk part custom industri kecil maupun besar yang membutuhkan ketepatan dimensi tinggi tanpa deformasi panas.
          </p>
          <div class="grid grid-cols-2 gap-6 mb-8">
            <div class="p-4 rounded-xl bg-slate-50 border border-slate-200">
              <h4 class="font-bold text-lg mb-1">Mild Steel</h4>
              <p class="text-slate-500 text-sm">Besi hitam/plat besi hingga ketebalan 12mm.</p>
            </div>
            <div class="p-4 rounded-xl bg-slate-50 border border-slate-200">
              <h4 class="font-bold text-lg mb-1">Aluminium</h4>
              <p class="text-slate-500 text-sm">Plat aluminium hingga ketebalan 8mm.</p>
            </div>
          </div>
        </div>
        <div>
          <img src="/images/laserfiber.webp" alt="Fiber Laser Cutting Machine" class="rounded-2xl shadow-xl object-cover w-full h-[350px]" />
        </div>
      </div>
    </section>

    <!-- ACCORDION FAQ -->
    <section class="py-20 bg-slate-50 border-t border-slate-200">
      <div class="container-custom max-w-4xl">
        <h2 class="text-3xl font-bold text-center mb-12">Tanya Jawab Seputar Laser Metal</h2>
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
writeFile(path.join(SRC_DIR, 'pages', 'jasa-laser-cutting-metal.astro'), metalAstroContent);


// --- C. LASER-STAINLESS-BINTARO.ASTRO (STAINLESS PAGE) ---
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
    question: "Tipe stainless steel apa saja yang bisa dicutting?",
    answer: "Kami memotong berbagai grade stainless steel, termasuk SS201 (indoor), SS304 (standard outdoor/food grade), dan SS316 (tahan korosi tinggi/marine grade)."
  },
  {
    question: "Apakah hasil potongannya bersih dan tidak gosong?",
    answer: "Ya, dengan hembusan gas nitrogen bertekanan tinggi pada mesin fiber kami, tepi potongan stainless steel akan mengkilap, bersih, dan bebas dari bekas kerak hitam (gosong)."
  },
  {
    question: "Dimana lokasi workshop Tepat Laser?",
    answer: "Workshop kami berlokasi di Parigi Bintaro, dekat Sekolah Mentari Internasional. Anda bisa datang langsung untuk membawa bahan atau berdiskusi dengan desainer kami."
  }
];

const pageTitle = "Laser Stainless Bintaro Terdekat Presisi Tinggi | Tepat Laser";
const pageDesc = "Jasa laser cutting stainless steel terdekat di Bintaro, BSD, Serpong. Hasil potong bersih, mengkilap, toleransi rapat. Cepat & free ongkir Jabodetabek!";
const pageKw = "laser stainless bintaro, laser cutting stainless tangerang, jasa potong stainless terdekat, cutting plat stainless";

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
    <section class="relative bg-slate-950 text-white py-24 overflow-hidden">
      <div class="absolute inset-0 opacity-20" style="background-image:url('/images/metal.webp'); background-size:cover; background-position:center;"></div>
      <div class="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/80 to-transparent"></div>
      <div class="container-custom relative z-10">
        <div class="max-w-3xl">
          <span class="inline-block bg-[#00FF7F]/20 text-[#00FF7F] font-semibold px-4 py-1.5 rounded-full text-sm mb-6 border border-[#00FF7F]/30">STAINLESS SPECIALIST BINTARO</span>
          <h1 class="text-4xl sm:text-5xl font-extrabold leading-tight mb-6">
            Jasa Laser Cutting Stainless Steel Terdekat Bintaro
          </h1>
          <p class="text-lg sm:text-xl text-slate-300 mb-8">
            Dapatkan hasil potong plat stainless steel mengkilap and presisi tinggi (toleransi ±0.02mm) untuk huruf timbul, ornamen pagar mewah, railing tangga, dan produk interior lainnya.
          </p>
          <div class="flex flex-col sm:flex-row gap-4">
            <a href={WA_LINK} target="_blank" rel="noopener noreferrer" class="inline-flex items-center justify-center bg-green-500 hover:bg-green-600 text-white font-bold px-8 py-4 rounded-xl text-lg shadow-lg shadow-green-500/20">
              Konsultasi Stainless WA
            </a>
            <a href="tel:6282121292937" class="inline-flex items-center justify-center border-2 border-slate-700 hover:border-slate-500 text-white font-semibold px-8 py-4 rounded-xl text-lg hover:bg-slate-800">
              Telepon Admin
            </a>
          </div>
        </div>
      </div>
    </section>

    <!-- DETAILED CONTENT -->
    <section class="py-20 bg-white text-slate-900">
      <div class="container-custom grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div>
          <h2 class="text-3xl font-bold mb-6">Mengapa Memilih Jasa Potong Stainless Kami?</h2>
          <p class="text-slate-600 mb-6 leading-relaxed">
            Potongan stainless memerlukan penanganan khusus agar tidak terjadi karat di kemudian hari pada bekas potongan. Kami menggunakan mesin pemotong fiber modern berkecepatan tinggi dengan gas nitrogen murni untuk menjamin kualitas pemotongan terbaik tanpa mengubah sifat logam.
          </p>
          <ul class="space-y-4 mb-6">
            <li class="flex items-center gap-2"><span class="text-[#00FF7F] font-bold">✓</span> SS201, SS304, & SS316 Berkualitas tinggi</li>
            <li class="flex items-center gap-2"><span class="text-[#00FF7F] font-bold">✓</span> Pengerjaan Cepat (Dapat ditunggu untuk file siap potong)</li>
            <li class="flex items-center gap-2"><span class="text-[#00FF7F] font-bold">✓</span> Pengiriman Aman langsung ke lokasi proyek Anda</li>
          </ul>
        </div>
        <div>
          <img src="/images/stainlesssteel (2).webp" alt="Laser Cutting Stainless Plate" class="rounded-2xl shadow-xl object-cover w-full h-[350px]" />
        </div>
      </div>
    </section>

    <!-- FAQ SECTION -->
    <section class="py-20 bg-slate-50 border-t border-slate-200">
      <div class="container-custom max-w-4xl">
        <h2 class="text-3xl font-bold text-center mb-12">FAQ Laser Stainless Steel</h2>
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
writeFile(path.join(SRC_DIR, 'pages', 'laser-stainless-bintaro.astro'), stainlessAstroContent);


// --- D. JASA-LASER-CUTTING-MDF-AI.ASTRO (MDF PAGE) ---
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
    question: "Ketebalan papan MDF berapa saja yang bisa dipotong?",
    answer: "Kami dapat memotong MDF dari ketebalan tipis 3mm, 6mm, 9mm, hingga ketebalan tebal 18mm dan 25mm dengan tingkat kepresisian tinggi."
  },
  {
    question: "Apakah bisa untuk engraving (grafir) gambar di atas MDF?",
    answer: "Bisa. Menggunakan mesin laser CO2 kami, Anda bisa melakukan cutting sekalian grafir ornamen bermotif rumit di atas permukaan kayu MDF."
  },
  {
    question: "Apakah MDF cocok untuk penggunaan luar ruangan?",
    answer: "MDF kurang direkomendasikan untuk area basah/outdoor kecuali telah melalui finishing pelapis anti air khusus. Untuk fasad luar ruangan, kami lebih menyarankan menggunakan ACP atau GRC."
  }
];

const pageTitle = "Jasa Laser Cutting MDF Custom Murah Presisi | Tepat Laser";
const pageDesc = "Jasa laser cutting MDF, HMR, dan triplek custom di Bintaro Tangerang. Pengerjaan cepat untuk partisi ruangan, kisi-kisi, kerajinan kayu, free design!";
const pageKw = "jasa laser cutting mdf, potong mdf custom, laser cutting kayu mdf, partisi mdf laser";

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
    <section class="relative bg-amber-950 text-white py-24 overflow-hidden">
      <div class="absolute inset-0 opacity-20" style="background-image:url('/images/mdf.webp'); background-size:cover; background-position:center;"></div>
      <div class="absolute inset-0 bg-gradient-to-r from-amber-950 via-amber-950/80 to-transparent"></div>
      <div class="container-custom relative z-10">
        <div class="max-w-3xl">
          <span class="inline-block bg-amber-500/20 text-amber-300 font-semibold px-4 py-1.5 rounded-full text-sm mb-6 border border-amber-500/30">WOODEN INTERIOR EXPERT</span>
          <h1 class="text-4xl sm:text-5xl font-extrabold leading-tight mb-6">
            Jasa Laser Cutting MDF & Kayu Custom
          </h1>
          <p class="text-lg sm:text-xl text-amber-100/90 mb-8">
            Solusi pembuatan partisi ruangan dekoratif (kisi-kisi), wall panel motif, souvenir kayu unik, dan komponen furniture menggunakan material MDF & Plywood.
          </p>
          <div class="flex flex-col sm:flex-row gap-4">
            <a href={WA_LINK} target="_blank" rel="noopener noreferrer" class="inline-flex items-center justify-center bg-green-500 hover:bg-green-600 text-white font-bold px-8 py-4 rounded-xl text-lg shadow-lg shadow-green-500/20">
              Tanya Harga Cutting MDF
            </a>
            <a href="tel:6282121292937" class="inline-flex items-center justify-center border-2 border-amber-700/50 hover:border-amber-500 text-white font-semibold px-8 py-4 rounded-xl text-lg hover:bg-amber-900/30">
              Hubungi Admin Workshop
            </a>
          </div>
        </div>
      </div>
    </section>

    <!-- DETAILS CONTENT -->
    <section class="py-20 bg-white text-slate-900">
      <div class="container-custom grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div>
          <h2 class="text-3xl font-bold mb-6">Pemotongan Kayu Olahan Rapi Tanpa Gosong Berlebih</h2>
          <p class="text-slate-600 mb-6 leading-relaxed">
            Dengan setting parameter mesin CO2 laser yang presisi oleh operator berpengalaman kami, noda terbakar (gosong) pada pinggiran MDF hasil potong dapat diminimalisir serendah mungkin, mempermudah tahap pengecatan (finishing duco/melamik).
          </p>
          <ul class="space-y-4 mb-6">
            <li class="flex items-center gap-2"><span class="text-amber-600 font-bold">✓</span> Tepian potongan bersih & halus</li>
            <li class="flex items-center gap-2"><span class="text-amber-600 font-bold">✓</span> Desain ornamen kerawang/floral sangat detail</li>
            <li class="flex items-center gap-2"><span class="text-amber-600 font-bold">✓</span> Harga bersahabat untuk pemborong & kontraktor</li>
          </ul>
        </div>
        <div>
          <img src="/images/mdf (1).webp" alt="MDF Laser Cutting Products" class="rounded-2xl shadow-xl object-cover w-full h-[350px]" />
        </div>
      </div>
    </section>

    <!-- FAQ SECTION -->
    <section class="py-20 bg-slate-50 border-t border-slate-200">
      <div class="container-custom max-w-4xl">
        <h2 class="text-3xl font-bold text-center mb-12">FAQ Laser Cutting MDF</h2>
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
writeFile(path.join(SRC_DIR, 'pages', 'jasa-laser-cutting-mdf-ai.astro'), mdfAstroContent);


// --- E. LASER-CUTTING-AKRILIK.ASTRO (AKRILIK PAGE) ---
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
const WA_LINK = \`https://wa.me/\${WA}?text=\${encodeURIComponent("Halo Tepat Laser, saya mau tanya tentang jasa laser cutting akrilik.")}\`;

const faqs = [
  {
    question: "Ketebalan akrilik berapa yang bisa dipotong laser?",
    answer: "Kami memotong lembaran akrilik dari ketebalan tipis 1.5mm, 2mm, 3mm, hingga akrilik tebal 15mm dan 20mm."
  },
  {
    question: "Apakah tepi potongan akrilik menjadi mengkilap?",
    answer: "Ya, laser CO2 memotong akrilik dengan cara melelehkan jalurnya, menghasilkan tepian potongan yang licin, bening, dan mengkilap (polished edge) tanpa perlu diamplas lagi."
  },
  {
    question: "Berapa lama estimasi pengerjaan akrilik custom?",
    answer: "Pekerjaan akrilik standar seperti potongan huruf timbul atau box display diselesaikan dalam waktu 1-2 hari kerja."
  }
];

const pageTitle = "Jasa Laser Cutting Akrilik Terdekat Bening & Presisi | Tepat Laser";
const pageDesc = "Jasa laser cutting akrilik terdekat di Tangerang Selatan & Bintaro. Spesialis huruf timbul akrilik, plakat, box display, pengerjaan cepat 24 jam!";
const pageKw = "laser cutting akrilik, jasa potong akrilik terdekat, acrylic laser cutting tangerang, huruf timbul akrilik";

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
    <section class="relative bg-[#0d1b2a] text-white py-24 overflow-hidden">
      <div class="absolute inset-0 opacity-20" style="background-image:url('/images/Acrylic.webp'); background-size:cover; background-position:center;"></div>
      <div class="absolute inset-0 bg-gradient-to-r from-[#0d1b2a] via-[#0d1b2a]/80 to-transparent"></div>
      <div class="container-custom relative z-10">
        <div class="max-w-3xl">
          <span class="inline-block bg-blue-500/20 text-blue-300 font-semibold px-4 py-1.5 rounded-full text-sm mb-6 border border-blue-500/30">ACRYLIC BRANDING SPECIALIST</span>
          <h1 class="text-4xl sm:text-5xl font-extrabold leading-tight mb-6">
            Jasa Laser Cutting Akrilik & Plakat Custom
          </h1>
          <p class="text-lg sm:text-xl text-blue-100/90 mb-8">
            Dapatkan hasil potong akrilik bening (polished edge) super rapi untuk kebutuhan advertising, nomor rumah, signage toko, podium, maupun kerajinan akrilik custom.
          </p>
          <div class="flex flex-col sm:flex-row gap-4">
            <a href={WA_LINK} target="_blank" rel="noopener noreferrer" class="inline-flex items-center justify-center bg-green-500 hover:bg-green-600 text-white font-bold px-8 py-4 rounded-xl text-lg shadow-lg shadow-green-500/20">
              Order Potong Akrilik WA
            </a>
            <a href="tel:6282121292937" class="inline-flex items-center justify-center border-2 border-slate-700 hover:border-slate-500 text-white font-semibold px-8 py-4 rounded-xl text-lg hover:bg-slate-800">
              Konsultasi Desain & Bahan
            </a>
          </div>
        </div>
      </div>
    </section>

    <!-- DETAILED CONTENT -->
    <section class="py-20 bg-white text-slate-900">
      <div class="container-custom grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div>
          <h2 class="text-3xl font-bold mb-6">Kualitas Potongan Bening Kristal Bebas Crack</h2>
          <p class="text-slate-600 mb-6 leading-relaxed">
            Mesin laser CO2 modern kami memotong lembaran akrilik dengan sangat halus tanpa menyebabkan pecah rambut (crack) di tepian potongan. Sempurna untuk produk premium seperti box display kosmetik, signage lampu LED, dan souvenir plakat perusahaan.
          </p>
          <ul class="space-y-4 mb-6">
            <li class="flex items-center gap-2"><span class="text-blue-600 font-bold">✓</span> Pilihan bahan lengkap (Akrilik Bening, Susu, Warna, Marga Cipta/Astari)</li>
            <li class="flex items-center gap-2"><span class="text-blue-600 font-bold">✓</span> Tepian potong bening siap rakit</li>
            <li class="flex items-center gap-2"><span class="text-blue-600 font-bold">✓</span> Harga nego untuk jumlah besar / project advertising</li>
          </ul>
        </div>
        <div>
          <img src="/images/Acrylic.webp" alt="Laser Cutting Acrylic Showcase" class="rounded-2xl shadow-xl object-cover w-full h-[350px]" />
        </div>
      </div>
    </section>

    <!-- FAQ SECTION -->
    <section class="py-20 bg-slate-50 border-t border-slate-200">
      <div class="container-custom max-w-4xl">
        <h2 class="text-3xl font-bold text-center mb-12">FAQ Laser Cutting Akrilik</h2>
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
writeFile(path.join(SRC_DIR, 'pages', 'laser-cutting-akrilik.astro'), acrylicAstroContent);

console.log("Written all new Astro pages.");

// 4. DELETE THE OLD DUPLICATE PAGES TO PREVENT ROUTING ERRORS ON BUILD
console.log("Deleting old duplicate pages...");
deleteFile(path.join(SRC_DIR, 'pages', 'material-metal.astro'));
deleteFile(path.join(SRC_DIR, 'pages', 'jasa-laser-cutting-stainless.astro'));
deleteFile(path.join(SRC_DIR, 'pages', 'jasa-laser-cutting-mdf.astro'));
deleteFile(path.join(SRC_DIR, 'pages', 'jasa-laser-cutting-akrilik.astro'));

// 5. RUN BUILD TO ENSURE ABSOLUTELY NO COMPILATION ERRORS
console.log("Running npm run build to verify...");
try {
  const buildOutput = execSync("npm run build", { cwd: PROJECT_DIR, encoding: 'utf8' });
  console.log("Build Success!");
  console.log(buildOutput);

  // 6. GIT OPERATIONS (ADD, COMMIT, PUSH)
  console.log("Running git operations...");
  execSync("git config user.name 'Ddos-spec'", { cwd: PROJECT_DIR });
  execSync("git config user.email 'setgraph@gmail.com'", { cwd: PROJECT_DIR });
  execSync("git add .", { cwd: PROJECT_DIR });
  execSync("git commit -m \"Redesign home & materials pages, update permalinks, optimize SEO, resolve duplicate routes\"", { cwd: PROJECT_DIR });
  console.log("Changes committed. Pushing to repository...");
  execSync("git push", { cwd: PROJECT_DIR });
  console.log("Git push successful! All tasks complete!");
  
} catch (error) {
  console.error("--- ERROR ENCOUNTERED DURING BUILD OR GIT OPERATIONS ---");
  console.error(error.stdout || error.message);
  process.exit(1);
}
