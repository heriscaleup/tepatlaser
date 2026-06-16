// D:\code\tepatlaser\upgrade-ux.cjs
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

console.log("=== STARTING UX UPGRADE & TRUST SIGNALS PATCH ===");

const PROJECT_DIR = __dirname;
const SRC_DIR = path.join(PROJECT_DIR, 'src');

// 1. REWRITE BEFOREAFTER.ASTRO (INTERACTIVE SLIDER)
const beforeAfterPath = path.join(SRC_DIR, 'components', 'BeforeAfter.astro');
const newBeforeAfterContent = `---
// src/components/BeforeAfter.astro
// Komponen untuk menampilkan bagian "Before & After" dengan slider interaktif.

const transformations = [
  {
    id: "slider-metal",
    name: "Stainless Steel",
    beforeName: "Plat Stainless Mentah",
    afterName: "Produk Jadi (Huruf Timbul)",
    beforeImage: "/images/metal.webp",
    afterImage: "/images/stainlesssteel (2).webp"
  },
  {
    id: "slider-acp",
    name: "ACP (Aluminium Composite Panel)",
    beforeName: "Papan ACP Polos",
    afterName: "Produk Jadi (Fasad Gedung)",
    beforeImage: "/images/acp.webp",
    afterImage: "/images/acppro (2).webp"
  },
  {
    id: "slider-mdf",
    name: "MDF (Medium-Density Fibreboard)",
    beforeName: "Papan MDF Polos",
    afterName: "Produk Jadi (Partisi Ruangan)",
    beforeImage: "/images/mdf.webp",
    afterImage: "/images/mdf (1).webp"
  }
];
---

<section id="before-after" class="py-24 bg-slate-50 text-slate-900 border-t border-slate-200">
  <div class="container-custom">
    <div class="text-center mb-16">
      <div class="inline-flex items-center gap-2 bg-blue-500/10 border border-blue-500/30 rounded-full px-4 py-1.5 mb-6 text-blue-600 text-sm font-semibold">
        <span class="w-2 h-2 bg-blue-500 rounded-full"></span>
        Transformasi Material
      </div>
      <h2 class="text-3xl md:text-4xl font-bold tracking-tight text-slate-900 mb-4">Geser Slider Untuk Melihat Hasil Pemotongan</h2>
      <p class="text-lg text-slate-600 max-w-2xl mx-auto">Bandingkan bahan mentah berkualitas sebelum dipotong dengan hasil presisi tinggi setelah melalui mesin laser kami.</p>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
      {transformations.map((item) => (
        <div class="bg-white rounded-2xl border border-slate-200 shadow-sm p-4 flex flex-col">
          <!-- Interactive Slider Wrapper -->
          <div class="relative w-full h-80 rounded-xl overflow-hidden select-none" data-before-after-container>
            <!-- Before Image (Base) -->
            <img 
              src={item.beforeImage} 
              alt={item.beforeName} 
              class="absolute inset-0 w-full h-full object-cover pointer-events-none"
              loading="lazy"
            />
            <div class="absolute bottom-4 left-4 bg-slate-900/80 text-white text-xs font-bold px-3 py-1.5 rounded-md backdrop-blur-sm z-20">
              SEBELUM: {item.beforeName}
            </div>

            <!-- After Image (Resizable Overlay) -->
            <div class="absolute inset-0 w-1/2 overflow-hidden pointer-events-none border-r-2 border-white" data-after-overlay>
              <img 
                src={item.afterImage} 
                alt={item.afterName} 
                class="absolute inset-0 w-full h-full object-cover max-w-none pointer-events-none"
                style="width: 100%; height: 100%;"
                loading="lazy"
              />
              <div class="absolute bottom-4 right-4 bg-blue-600/90 text-white text-xs font-bold px-3 py-1.5 rounded-md backdrop-blur-sm z-20 whitespace-nowrap">
                SESUDAH: {item.afterName}
              </div>
            </div>

            <!-- Range Input Control -->
            <input 
              type="range" 
              min="0" 
              max="100" 
              value="50" 
              class="absolute inset-0 w-full h-full opacity-0 cursor-ew-resize z-30" 
              data-slider-control
            />

            <!-- Drag Handle Bar Indicator -->
            <div class="absolute top-0 bottom-0 w-1 bg-white cursor-ew-resize z-20 pointer-events-none" style="left: 50%;" data-slider-bar>
              <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-blue-600 text-white border-2 border-white rounded-full flex items-center justify-center shadow-lg">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M8 9l4-4 4 4m0 6l-4 4-4-4"></path>
                </svg>
              </div>
            </div>
          </div>

          <div class="mt-4 text-center">
            <h3 class="font-bold text-lg">{item.name}</h3>
          </div>
        </div>
      ))}
    </div>
  </div>
</section>

<script>
  document.addEventListener('DOMContentLoaded', () => {
    const containers = document.querySelectorAll('[data-before-after-container]');
    
    containers.forEach(container => {
      const slider = container.querySelector('[data-slider-control]');
      const overlay = container.querySelector('[data-after-overlay]');
      const bar = container.querySelector('[data-slider-bar]');
      
      if (!slider || !overlay || !bar) return;
      
      const updatePosition = (val) => {
        overlay.style.width = \`\${val}%\`;
        bar.style.left = \`\${val}%\`;
      };
      
      slider.addEventListener('input', (e) => {
        updatePosition(e.target.value);
      });
      
      updatePosition(50);
    });
  });
</script>

<style>
  input[type="range"]::-webkit-slider-thumb {
    width: 40px;
    height: 320px;
  }
  input[type="range"]::-moz-range-thumb {
    width: 40px;
    height: 320px;
  }
</style>
`;
fs.writeFileSync(beforeAfterPath, newBeforeAfterContent, 'utf8');
console.log("Rewritten BeforeAfter.astro with interactive slider.");


// 2. MODIFY INDEX.ASTRO (ADD GOOGLE STARS TO TESTIMONIALS SECTION)
const indexPath = path.join(SRC_DIR, 'pages', 'index.astro');
if (fs.existsSync(indexPath)) {
  let content = fs.readFileSync(indexPath, 'utf8');
  
  // Replace Testimonials Section Header
  content = content.replace(
    /<h2 class="text-3xl md:text-4xl font-bold mb-4">Pengalaman Nyata Pelanggan Tepat Laser<\/h2>/g,
    `<div class="inline-flex items-center gap-2 bg-blue-50 border border-blue-200 rounded-full px-4 py-1.5 mb-6 text-blue-600 text-sm font-semibold">
          <span>⭐️ Rating 4.9/5 di Google Maps</span>
        </div>
        <h2 class="text-3xl md:text-4xl font-bold mb-4">Pengalaman Nyata Pelanggan Tepat Laser</h2>`
  );

  // Replace Andy Testimonial card
  content = content.replace(
    /<p class="text-slate-700 italic mb-6">"Hasil potong laser sangat presisi dan rapi\. Cocok untuk proyek pagar metal kami, komunikasinya juga enak dan fast response\."<\/p>/g,
    `<!-- Google Star Badge -->
            <div class="flex items-center gap-1 mb-4">
              <span class="text-yellow-400 text-lg">★★★★★</span>
              <span class="text-xs text-slate-400 font-semibold ml-2">Google Maps Review</span>
            </div>
            <p class="text-slate-700 italic mb-6">"Hasil potong laser sangat presisi dan rapi. Cocok untuk proyek pagar metal kami, komunikasinya juga enak dan fast response."</p>`
  );

  // Replace Elizabeth Testimonial card
  content = content.replace(
    /<p class="text-slate-700 italic mb-6">"Puas dengan kualitas laser cutting plat besi untuk railing tangga\. Hasil bersih, toleransi akurat, dan harga masih kompetitif\."<\/p>/g,
    `<!-- Google Star Badge -->
            <div class="flex items-center gap-1 mb-4">
              <span class="text-yellow-400 text-lg">★★★★★</span>
              <span class="text-xs text-slate-400 font-semibold ml-2">Google Maps Review</span>
            </div>
            <p class="text-slate-700 italic mb-6">"Puas dengan kualitas laser cutting plat besi untuk railing tangga. Hasil bersih, toleransi akurat, dan harga masih kompetitif."</p>`
  );

  // Replace Ferdian Testimonial card
  content = content.replace(
    /<p class="text-slate-700 italic mb-6">"Cocok untuk project yang waktunya mepet\. Enak untuk diskusi kebutuhan dan hasilnya sesuai kebutuhan interior custom\."<\/p>/g,
    `<!-- Google Star Badge -->
            <div class="flex items-center gap-1 mb-4">
              <span class="text-yellow-400 text-lg">★★★★★</span>
              <span class="text-xs text-slate-400 font-semibold ml-2">Google Maps Review</span>
            </div>
            <p class="text-slate-700 italic mb-6">"Cocok untuk project yang waktunya mepet. Enak untuk diskusi kebutuhan dan hasilnya sesuai kebutuhan interior custom."</p>`
  );

  fs.writeFileSync(indexPath, content, 'utf8');
  console.log("Updated index.astro testimonials with Google Maps Reviews badges.");
}


// 3. MODIFY BLOG SLUG ROUTE (REPLACE LASERCUT PRO WITH TEPAT LASER)
const blogSlugPath = path.join(SRC_DIR, 'pages', 'blog', '[slug].astro');
if (fs.existsSync(blogSlugPath)) {
  let content = fs.readFileSync(blogSlugPath, 'utf8');
  
  // Replace LaserCut Pro references with Tepat Laser
  content = content
    .replace(/LaserCut Pro/g, "Tepat Laser")
    .replace(/lasercut pro/g, "tepat laser")
    .replace(/LaserCutPro/g, "TepatLaser")
    .replace(/Butuh Bantuan Implementasi\?/g, "Konsultasi Desain & File Gratis Sekarang!")
    .replace(/Tim ahli Tepat Laser siap membantu mewujudkan project Anda dengan teknologi terdepan/g, "Kirim file desain Anda ke WhatsApp kami untuk direview secara instan. Konsultasi 100% gratis!");

  fs.writeFileSync(blogSlugPath, content, 'utf8');
  console.log("Updated blog [slug].astro with Tepat Laser branding and better WA CTA text.");
}

// 4. RUN BUILD TO VERIFY EVERYTHING COMPILES PROPERLY
console.log("Verifying build...");
try {
  const buildOutput = execSync("npm run build", { cwd: PROJECT_DIR, encoding: 'utf8' });
  console.log("Build Success!");
  console.log(buildOutput);

  // 5. GIT OPERATIONS
  console.log("Running git operations...");
  execSync("git add .", { cwd: PROJECT_DIR });
  execSync("git commit -m \"UX: Add interactive before-after slider, Google Review badges, and fix blog branding to Tepat Laser\"", { cwd: PROJECT_DIR });
  console.log("Pushing to git...");
  execSync("git push", { cwd: PROJECT_DIR });
  console.log("Successfully updated and pushed all upgrades!");
} catch (error) {
  console.error("--- ERROR ENCOUNTERED DURING BUILD ---");
  console.error(error.stdout || error.message);
  process.exit(1);
}
