# Graph Report - tepatlaser  (2026-08-28)

## Corpus Check
- 180 files · ~2,591,484 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 1179 nodes · 1343 edges · 99 communities (95 shown, 4 thin omitted)
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS · INFERRED: 2 edges (avg confidence: 0.5)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `d63d1f61`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- BaseLayout.astro
- constants.js
- seo.js
- dependencies
- auto-blog-publisher.mjs
- ApplicationLandingPage.astro
- manifest.json
- audit-browser.mjs
- wa-tracker.js
- portfolio/[slug].astro
- tsconfig.json
- verify-site.mjs
- capabilityContent.js
- tracking.js
- content.config.ts
- env.d.ts
- rank-tracker.mjs
- analisis-biaya-laser-cutting-vs-tradisional.md
- pertanyaan-penting-sebelum-memilih-provider-laser-cutting.md
- 2025-08-29-040101-laser-cutting-jakarta-solusi-terbai.md
- panduan-file-desain-laser-cutting-akurat.md
- Tepat Laser V7 — QA Report
- cnc-router-industri-furniture-custom-indonesia.md
- Tujuh data minimum
- 2025-08-23-091129-panduan-lengkap-laser-cutting-mater.md
- perbedaan-laser-cutting-cnc-router-galvo-engraving.md
- teknik-laser-engraving-personalisasi-massal.md
- Design Pillars
- 2025-08-30-040102-laser-cutting-jakarta-solusi-tepat-.md
- cara-memilih-material-laser-cutting-indonesia.md
- laser-cutting-solusi-presisi-dan-efisien-untuk-ber.md
- panduan-memilih-ketebalan-akrilik.md
- panduan-request-cutting-order-2026-07.md
- perbedaan-laser-co2-dan-laser-fiber.md
- studi-kasus-custom-part-industri-berat-2026-07.md
- 10-ide-kreatif-laser-cutting-dekorasi-rumah.md
- 2025-08-26-040106-laser-cutting-panduan-bahan-biaya-d.md
- analisis-mendalam-mengoptimalkan-hasil-las-604173.md
- aplikasi-laser-cutting-furniture-interior-design.md
- Komponen pembentuk harga
- laser-cutting-solusi-presisi-untuk-berbagai-kebutu.md
- perbandingan-mdf-vs-plywood-dekorasi-dinding.md
- tren-industri-kreatif-indonesia-2025.md
- SERVICES
- 2025-08-27-040113-panduan-lengkap-laser-cutting-untuk.md
- cara-menilai-kualitas-hasil-laser-cutting.md
- checklist-memilih-jasa-laser-cutting-jakarta.md
- faktor-mempengaruhi-kualitas-laser-cutting.md
- Aplikasi laser cutting otomotif
- material-baru-fiber-laser-update-2026-06.md
- mengapa-laser-cutting-lebih-presisi.md
- panduan-finishing-metal-setelah-laser-cutting.md
- panduan-request-cutting-order-2026-08.md
- Header.astro
- 2025-08-28-040117-panduan-lengkap-laser-cutting-untuk.md
- Dari listrik menjadi sinar terfokus
- kapan-menggunakan-laser-fiber-vs-co2.md
- karakteristik-keunggulan-acp-fasad-gedung.md
- kenapa-presisi-laser-cutting-penting-industri-manufaktur-2026-07.md
- faktor-harga-jasa-laser-cutting-jabodetabek.md
- jasa-laser-cutting-bintaro.md
- kesalahan-umum-memilih-jasa-laser-cutting-indonesia.md
- perbandingan-harga-laser-cutting-vs-manual.md
- tren-laser-cutting-arsitektur-modern-indonesia.md
- cara-menghitung-biaya-laser-cutting-kompleksitas-desain.md
- cutting-acp-2.md
- tips-audit-kualitas-hasil-laser-cutting-2026-07.md
- audit-blog-images.mjs
- panduan-hitung-biaya-laser-cutting-plat-besi-per-meter.md
- perbedaan-huruf-timbul-stainless-304-vs-201-outdoor.md
- tips-memilih-material-secondary-skin-fasad-acp-seven-marks.md
- verify-no-regression.mjs
- cutting-acp.md
- fiber-laser-terbaru-2026-teknologi-terbaru-2026-07.md
- Tepat Laser — Awwwards-oriented redesign
- Tepat Laser V10 — QA Report
- Tepat Laser V6 — QA Report
- Tepat Laser V9 — QA Report
- Tepat Laser — Redesign V5 Industrial System
- panduan-memilih-mesin-cnc-router-vs-laser.md
- Tepat Laser V9 — Image & Content Matrix
- Tepat Laser V10 — Realism & Portfolio Patch
- Tepat Laser V8 — Patch Notes
- Tepat Laser V9 — Complete Patch
- Tepat Laser V8 — QA Report
- Tepat Laser — Redesign V6 Brand Spectrum
- Sitemap Verification and Submission Guide
- Cara Memakai Patch Tepat Laser V8
- Cara Memakai Tepat Laser V10
- Cara Memakai Tepat Laser V9
- ping-indexnow.mjs
- studi-kasus-pemasangan-fasad-laser-cutting.md
- Tepat Laser V10 — Realistic Image Asset Manifest
- fix-blog-schema.mjs

## God Nodes (most connected - your core abstractions)
1. `MATERIALS` - 15 edges
2. `publishNextArticle()` - 14 edges
3. `SITE_CONFIG` - 13 edges
4. `SERVICES` - 12 edges
5. `generateBreadcrumbSchema()` - 12 edges
6. `scripts` - 10 edges
7. `Tepat Laser V7 — QA Report` - 9 edges
8. `generateArticle()` - 8 edges
9. `syncWorkshopPhotos()` - 8 edges
10. `checkAllRankings()` - 8 edges

## Surprising Connections (you probably didn't know these)
- `publishNextArticle()` --calls--> `checkAllRankings()`  [EXTRACTED]
  scripts/auto-blog-publisher.mjs → scripts/lib/rank-tracker.mjs
- `publishNextArticle()` --calls--> `persistSnapshot()`  [EXTRACTED]
  scripts/auto-blog-publisher.mjs → scripts/lib/rank-tracker.mjs
- `checkAndPublish()` --calls--> `publishNextArticle()`  [EXTRACTED]
  scripts/cron-daily-publisher.mjs → scripts/auto-blog-publisher.mjs
- `main()` --calls--> `queryTopQueries()`  [EXTRACTED]
  scripts/discover-keywords.mjs → scripts/lib/gsc-client.mjs
- `publishNextArticle()` --calls--> `generateArticle()`  [EXTRACTED]
  scripts/auto-blog-publisher.mjs → scripts/lib/claude-writer.mjs

## Import Cycles
- None detected.

## Communities (99 total, 4 thin omitted)

### Community 0 - "BaseLayout.astro"
Cohesion: 0.11
Nodes (24): siteUrl, aboutDepth, contactDepth, allFaqs, breadcrumb, extras, faqDepth, breadcrumb (+16 more)

### Community 1 - "constants.js"
Cohesion: 0.07
Nodes (24): item, base, item, base, item, item, item, item (+16 more)

### Community 2 - "seo.js"
Cohesion: 0.11
Nodes (12): crumbs, faqSchema, jsonLd, relatedPosts, calculateAverageRating(), generateBlogFaqSchema(), generateBlogPostSchema(), generateProductSchema() (+4 more)

### Community 3 - "dependencies"
Cohesion: 0.05
Nodes (39): astro, @astrojs/check, @astrojs/sitemap, @astrojs/tailwind, lighthouse, dependencies, astro, @astrojs/check (+31 more)

### Community 4 - "auto-blog-publisher.mjs"
Cohesion: 0.06
Nodes (46): appendMayaStatus(), assembleMarkdown(), estimateReadTime(), HERMES_ENV_PATH, publishNextArticle(), readStatusFile(), sendTelegramReport(), slugify() (+38 more)

### Community 5 - "ApplicationLandingPage.astro"
Cohesion: 0.04
Nodes (42): breadcrumbs, schema, benefits, faqs, fit, gallery, notFit, priceFactors (+34 more)

### Community 6 - "manifest.json"
Cohesion: 0.12
Nodes (15): background_color, categories, description, display, icons, lang, name, orientation (+7 more)

### Community 7 - "audit-browser.mjs"
Cohesion: 0.17
Nodes (10): failures, htmlFiles, pages, profiles, report, reportDir, results, root (+2 more)

### Community 8 - "wa-tracker.js"
Cohesion: 0.40
Nodes (9): buildPayload(), captureAndStore(), getStored(), getUrlParams(), handleClick(), hookButtons(), injectCodeIntoWaUrl(), preRegisterCode() (+1 more)

### Community 9 - "portfolio/[slug].astro"
Cohesion: 0.20
Nodes (7): PORTFOLIO_PROJECTS_V10, portfolioDepth, schema, breadcrumbs, faq, related, schema

### Community 10 - "tsconfig.json"
Cohesion: 0.25
Nodes (7): **/*, astro/tsconfigs/strict, .astro/types.d.ts, dist, exclude, extends, include

### Community 11 - "verify-site.mjs"
Cohesion: 0.22
Nodes (6): failures, htmlFiles, manifestFile, releaseFile, root, summary

### Community 12 - "capabilityContent.js"
Cohesion: 0.60
Nodes (4): CAPABILITY_CONTENT, decision(), getCapabilityContent(), image()

### Community 13 - "tracking.js"
Cohesion: 0.60
Nodes (4): initializeEnhancedConversionTracking(), IMPORTANT:, sha256(), trackEnhancedConversion()

### Community 20 - "rank-tracker.mjs"
Cohesion: 0.14
Nodes (22): filter, main(), minImpressionsArg, formatDate(), getAccessToken(), isConfigured(), loadServiceAccount(), queryKeywordMetrics() (+14 more)

### Community 21 - "analisis-biaya-laser-cutting-vs-tradisional.md"
Cohesion: 0.09
Nodes (22): Biaya yang perlu dihitung, Blank untuk machining, CNC machining, Finishing, Gergaji, gerinda, dan jigsaw, Hidden cost yang sering hilang, Inventory, Kekuatan ekonomi (+14 more)

### Community 22 - "pertanyaan-penting-sebelum-memilih-provider-laser-cutting.md"
Cohesion: 0.09
Nodes (21): 10. Berapa sampling rate?, 11. Bagaimana penanganan part tidak sesuai?, 12. Apa saja yang termasuk harga?, 13. Apa yang dapat mengubah harga setelah quotation?, 14. Kapan barang benar-benar diterima?, 15. Bagaimana file dan material saya disimpan?, 1. Proses apa yang akan digunakan untuk material saya?, 2. Apakah material dan ketebalan ini berada dalam kapasitas optimal? (+13 more)

### Community 23 - "2025-08-29-040101-laser-cutting-jakarta-solusi-terbai.md"
Cohesion: 0.11
Nodes (18): Bukti hasil, Cara membandingkan vendor lokal, Checklist cepat, CNC router, Data yang perlu dikirim, Galvo, Harga, Kapabilitas (+10 more)

### Community 24 - "panduan-file-desain-laser-cutting-akurat.md"
Cohesion: 0.11
Nodes (18): AI dan CDR, Convert font, Detail minimum, DXF dan DWG, Gunakan skala 1:1, JPG dan PNG, Kurangi node, Order of operations (+10 more)

### Community 25 - "Tepat Laser V7 — QA Report"
Cohesion: 0.11
Nodes (17): Aksesibilitas, Assets, Build dan struktur, Copywriting Improvements, Core System, CTA Component, Features Implemented, Files Modified in V7 (+9 more)

### Community 26 - "cnc-router-industri-furniture-custom-indonesia.md"
Cohesion: 0.11
Nodes (17): ACP, PVC board, dan akrilik, Arah serat, Cara meminta quotation, Design for CNC, Holding dan tabs, Kayu solid, Ketebalan aktual, Lebar fitur (+9 more)

### Community 27 - "Tujuh data minimum"
Cohesion: 0.12
Nodes (16): 1. Material, 2. Ketebalan, 3. Dimensi, 4. Kuantitas, 5. File, 6. Lingkup pekerjaan, 7. Deadline dan lokasi, Cek file sebelum kirim (+8 more)

### Community 28 - "2025-08-23-091129-panduan-lengkap-laser-cutting-mater.md"
Cohesion: 0.12
Nodes (15): 10. Periksa hasil, 1. Kenali empat proses utama, 2. Pilih material berdasarkan fungsi, 3. Pahami material yang tidak aman, 4. Siapkan file yang benar, 5. Rancang sesuai proses, 6. Hitung biaya secara benar, 7. Tentukan toleransi secara realistis (+7 more)

### Community 29 - "perbedaan-laser-cutting-cnc-router-galvo-engraving.md"
Cohesion: 0.12
Nodes (15): CNC router, Cocok untuk, Cocok untuk, Cocok untuk, Contoh kombinasi proses, Galvo engraving, Kelebihan, Kelebihan (+7 more)

### Community 30 - "teknik-laser-engraving-personalisasi-massal.md"
Cohesion: 0.13
Nodes (14): Buat jig, CO2, Definisikan hasil, Fiber galvo, Hitung cycle time nyata, Kelola data variabel, Optimasi throughput, Pilih source yang tepat (+6 more)

### Community 31 - "Design Pillars"
Cohesion: 0.14
Nodes (13): 1. Industrial Premium Aesthetic, 2. Motion System V7, 3. Copywriting Conversion-First, 4. Technical Excellence, 5. Accessibility Supreme, Assets, Core System, Design Pillars (+5 more)

### Community 32 - "2025-08-30-040102-laser-cutting-jakarta-solusi-tepat-.md"
Cohesion: 0.14
Nodes (13): Desain agar mudah diproduksi, Display produk, Hitung harga jual lengkap, Konten dan foto yang menjual, Merchandise personal, Mulai dari problem niche, Packaging insert, Pilih material dari use case (+5 more)

### Community 33 - "cara-memilih-material-laser-cutting-indonesia.md"
Cohesion: 0.14
Nodes (13): ACP, GRC, dan PVC board, Akrilik, Data ke vendor, Langkah 1: definisikan fungsi, Langkah 2: pilih proses, Langkah 3: tentukan ketebalan, Langkah 4: pertimbangkan finishing, Langkah 5: cek keamanan (+5 more)

### Community 34 - "laser-cutting-solusi-presisi-dan-efisien-untuk-ber.md"
Cohesion: 0.14
Nodes (13): Engineering prototype, Gunakan test coupon, Kesalahan prototyping, Lakukan DFM review, Looks-like, Pilih material secara sadar, Produksi first article, Revisi berdasarkan data (+5 more)

### Community 35 - "panduan-memilih-ketebalan-akrilik.md"
Cohesion: 0.14
Nodes (13): 1. Ukuran dan bentang, 2. Beban, 3. Lokasi indoor atau outdoor, 4. Metode pemasangan, 5. Efek visual, 6. Cast vs extruded, Contoh pilihan praktis, Display produk (+5 more)

### Community 36 - "panduan-request-cutting-order-2026-07.md"
Cohesion: 0.14
Nodes (13): Checklist File Sebelum Dikirim, Format File yang Diterima Tepat Laser, Langkah 1 — Siapkan File Desain yang Benar, Langkah 2 — Tentukan Spesifikasi Material, Langkah 3 — Hubungi Tim dan Minta Estimasi, Langkah 4 — Verifikasi Estimasi dan Konfirmasi, Langkah 5 — Proses Produksi dan Quality Control, Langkah 6 — Pengiriman atau Pengambilan (+5 more)

### Community 37 - "perbedaan-laser-co2-dan-laser-fiber.md"
Cohesion: 0.14
Nodes (13): Biaya investasi, CO2, Efisiensi listrik, Fiber, Fiber laser, Kecepatan dan ketebalan, Keputusan bagi pelanggan jasa, Keselamatan (+5 more)

### Community 38 - "studi-kasus-custom-part-industri-berat-2026-07.md"
Cohesion: 0.14
Nodes (13): Approval dan batch pilot, Brief, Design for manufacturing review, First article, Jangan produksi dari DXF saja, Laser bukan proses akhir, Masalah pada file awal, Pelajaran (+5 more)

### Community 39 - "10-ide-kreatif-laser-cutting-dekorasi-rumah.md"
Cohesion: 0.15
Nodes (12): 10. Pagar atau screen balkon, 1. Wall art peta kota, 2. Nomor rumah dan papan nama, 3. Panel partisi dekoratif, 4. Lampu akrilik bergrafir, 5. Kisi-kisi penutup area servis, 6. Rak display modular, 7. Panel kepala tempat tidur (+4 more)

### Community 40 - "2025-08-26-040106-laser-cutting-panduan-bahan-biaya-d.md"
Cohesion: 0.15
Nodes (12): Tahap 10: proses lanjutan, Tahap 11: packing dan pengiriman, Tahap 1: brief kebutuhan, Tahap 2: review file, Tahap 3: validasi material dan proses, Tahap 4: estimasi dan quotation, Tahap 5: engineering dan nesting, Tahap 6: test cut (+4 more)

### Community 41 - "analisis-mendalam-mengoptimalkan-hasil-las-604173.md"
Cohesion: 0.15
Nodes (12): 10. Masukkan finishing sejak desain, 11. QC berdasarkan risiko, 12. Belajar dari batch, 1. Definisikan output, 2. Pilih material yang teridentifikasi, 3. Sederhanakan geometri, 4. Bersihkan file, 5. Rencanakan kerf dan sambungan (+4 more)

### Community 42 - "aplikasi-laser-cutting-furniture-interior-design.md"
Cohesion: 0.15
Nodes (12): Aplikasi yang paling relevan, Aturan desain agar siap produksi, Finishing adalah bagian dari desain, Hindari detail yang terlalu rapuh, Inlay, marquetry, dan detail permukaan, Komponen furniture berulang, Partisi dan panel dekoratif, Pilih proses berdasarkan pekerjaan (+4 more)

### Community 43 - "Komponen pembentuk harga"
Cohesion: 0.15
Nodes (12): 1. Material, 2. Waktu mesin, 3. Persiapan file, 4. Kuantitas dan nesting, 5. Finishing, 6. Deadline, Cara membandingkan quotation, Contoh budgeting sederhana (+4 more)

### Community 44 - "laser-cutting-solusi-presisi-untuk-berbagai-kebutu.md"
Cohesion: 0.15
Nodes (12): Common-line, Contoh keputusan, Distribusi panas, Faktor bentuk, KPI nesting, Margin dan clamp, Part kecil dan micro-joint, Remnant management (+4 more)

### Community 45 - "perbandingan-mdf-vs-plywood-dekorasi-dinding.md"
Cohesion: 0.15
Nodes (12): Apa itu MDF?, Apa itu plywood?, Kelebihan, Kelebihan, Kesalahan desain yang umum, Keterbatasan, Keterbatasan, Laser CO2 atau CNC router? (+4 more)

### Community 46 - "tren-industri-kreatif-indonesia-2025.md"
Cohesion: 0.15
Nodes (12): 10. Automation ringan, 1. Personalisasi terstruktur, 2. Batch kecil dan on-demand, 3. Produk B2B niche, 4. Desain modular, 5. Local production, 6. Material transparency, 7. Hybrid material (+4 more)

### Community 47 - "SERVICES"
Cohesion: 0.15
Nodes (8): item, item, item, faqItems, schemaFaq, schemaLocalBusiness, item, SERVICES

### Community 48 - "2025-08-27-040113-panduan-lengkap-laser-cutting-untuk.md"
Cohesion: 0.17
Nodes (11): Bandingkan total cost, Biaya membeli mesin, Biaya outsourcing, Framework keputusan, Kapabilitas proses, Kapan membeli mesin layak?, Kapan outsourcing lebih masuk akal?, Kecepatan dan kapasitas (+3 more)

### Community 49 - "cara-menilai-kualitas-hasil-laser-cutting.md"
Cohesion: 0.17
Nodes (11): 1. Periksa dimensi utama, 2. Lihat kerf dan geometri detail, 3. Nilai edge sesuai material, 4. Periksa HAZ dan deformasi, 5. Cek kondisi permukaan, 6. Ambil sampel dari seluruh batch, Akrilik, Checklist penerimaan singkat (+3 more)

### Community 50 - "checklist-memilih-jasa-laser-cutting-jakarta.md"
Cohesion: 0.17
Nodes (11): 10. Nilai komunikasi dan keamanan data, 1. Pastikan prosesnya cocok dengan material, 2. Cocokkan kapasitas dengan ketebalan, 3. Minta contoh yang relevan, 4. Bahas toleransi secara spesifik, 5. Evaluasi persiapan file, 6. Minta struktur harga yang dapat dibandingkan, 7. Periksa proses quality control (+3 more)

### Community 51 - "faktor-mempengaruhi-kualitas-laser-cutting.md"
Cohesion: 0.17
Nodes (11): 10. Quality control, 1. Karakter material, 2. Posisi fokus, 3. Daya dan kecepatan, 4. Gas bantu dan alirannya, 5. Kondisi optik dan mekanik, 6. Kualitas file, 7. Nesting dan urutan potong (+3 more)

### Community 52 - "Aplikasi laser cutting otomotif"
Cohesion: 0.17
Nodes (11): Aplikasi laser cutting otomotif, Batas yang perlu dihormati, Bracket dan mounting plate, Data yang diperlukan untuk custom part, Jig, fixture, dan template, Marking dan traceability, Material interior, Panel ventilasi dan enclosure (+3 more)

### Community 53 - "material-baru-fiber-laser-update-2026-06.md"
Cohesion: 0.17
Nodes (11): Brass, Checklist evaluasi material, Coated metal, Copper, Kapasitas Tepat Laser, Material berlapis dan composite metal, Mild steel, Nickel alloy (+3 more)

### Community 54 - "mengapa-laser-cutting-lebih-presisi.md"
Cohesion: 0.17
Nodes (11): Akumulasi panas, Bandingkan dengan proses lain secara adil, Cara menentukan toleransi, Gerakan CNC dan repeatability, Kerf yang relatif kecil, Material, Mengapa hasil masih bisa meleset?, Piercing (+3 more)

### Community 55 - "panduan-finishing-metal-setelah-laser-cutting.md"
Cohesion: 0.17
Nodes (11): 1. Deburring & Descaling: Pembersihan Awal Wajib, 2. Powder Coating (Pengecatan Serbuk), 3. Anodizing (Khusus Material Aluminium), 4. Mechanical Polishing: Hairline & Mirror Finish (Stainless Steel), Kesimpulan, Keunggulan Utama:, Keunggulan Utama:, Matriks Pemilihan Finishing Berdasarkan Material (+3 more)

### Community 56 - "panduan-request-cutting-order-2026-08.md"
Cohesion: 0.17
Nodes (11): Format File yang Diterima, Langkah 1: Persiapkan File Desain yang Benar, Langkah 2: Tentukan Spesifikasi Material, Langkah 3: Tentukan Jumlah dan Spesifikasi Produksi, Langkah 4: Proses Kalkulasi dan Penawaran Harga, Langkah 5: Konfirmasi Order dan Down Payment, Langkah 6: Produksi dan Quality Control, Langkah 7: Pengiriman atau Pickup (+3 more)

### Community 57 - "Header.astro"
Cohesion: 0.18
Nodes (5): dropdowns, menu, menuButton, blogSchema, posts

### Community 58 - "2025-08-28-040117-panduan-lengkap-laser-cutting-untuk.md"
Cohesion: 0.18
Nodes (10): 1. Susun paket RFQ, 2. Kualifikasi supplier, 3. Normalisasi quotation, 4. Technical clarification, 5. Purchase order dan referensi dokumen, 6. First article, 7. Change control, 8. Incoming inspection (+2 more)

### Community 59 - "Dari listrik menjadi sinar terfokus"
Cohesion: 0.18
Nodes (10): 1. Laser source menghasilkan energi, 2. Serat optik membawa sinar, 3. Cutting head memfokuskan energi, 4. Gas bantu mengeluarkan lelehan, 5. CNC mengikuti jalur file, Alur produksi singkat, Apa arti 1,5 kW, 3 kW, dan 12 kW?, Dari listrik menjadi sinar terfokus (+2 more)

### Community 60 - "kapan-menggunakan-laser-fiber-vs-co2.md"
Cohesion: 0.18
Nodes (10): Detail desain, Faktor selain material, Flow keputusan praktis, Kapan memilih laser CO2?, Kapan memilih laser fiber?, Ketebalan, Material yang tidak boleh ditebak, Ringkasnya: fiber untuk metal, CO2 untuk non-metal (+2 more)

### Community 61 - "karakteristik-keunggulan-acp-fasad-gedung.md"
Cohesion: 0.18
Nodes (10): Cara cutting ACP yang tepat, Checklist sebelum memilih ACP, Coating PE dan PVDF, Core, Desain perforasi dan fasad dekoratif, Kelebihan ACP untuk fasad, Keterbatasan yang perlu dihitung, Skin aluminium (+2 more)

### Community 62 - "kenapa-presisi-laser-cutting-penting-industri-manufaktur-2026-07.md"
Cohesion: 0.18
Nodes (10): 1. Keberhasilan Proses Assembly, 2. Pengurangan Material Waste, 3. Konsistensi Antar-Batch Produksi, 4. Kompleksitas Geometri Tanpa Kompromi, Apa Artinya "Presisi" dalam Laser Cutting?, Dampak Presisi terhadap Efisiensi Biaya Produksi, Industri yang Paling Merasakan Manfaat Presisi Laser Cutting, Kesimpulan: Presisi Adalah Investasi, Bukan Biaya Tambahan (+2 more)

### Community 63 - "faktor-harga-jasa-laser-cutting-jabodetabek.md"
Cohesion: 0.20
Nodes (9): 1. Jenis proses dan kapasitas mesin, 2. Material, grade, dan ketebalan, 3. Kompleksitas desain, 4. Volume dan efisiensi nesting, 5. Standar kualitas dan dokumentasi, 6. Finishing dan proses tambahan, 7. Lead time dan logistik, Cara menormalisasi quotation (+1 more)

### Community 64 - "jasa-laser-cutting-bintaro.md"
Cohesion: 0.20
Nodes (9): 1. Pagar, Gerbang, dan Railing Balkon Custom, 2. Fasad ACP dan Partisi Ruangan (Krawangan), 3. Signage, Huruf Timbul, & Logo Perusahaan, Aplikasi Laser Cutting untuk Proyek Hunian & Komersial di Bintaro, Cara Pemesanan Jasa Laser Cutting Bintaro, Keunggulan Teknologi Fiber Laser 12kW & CNC Router Tepat Laser, Keuntungan Order Laser Cutting Dekat Bintaro di Tepat Laser, Solusi Jasa Laser Cutting Bintaro yang Presisi dan Cepat (+1 more)

### Community 65 - "kesalahan-umum-memilih-jasa-laser-cutting-indonesia.md"
Cohesion: 0.20
Nodes (9): 1. Memilih hanya dari harga termurah, 2. Tidak memastikan proses yang dipakai, 3. Mengirim screenshot tanpa ukuran, 4. Memakai istilah toleransi yang ambigu, 5. Melewatkan sampel, 6. Tidak mengunci scope dan lead time, 7. Mengubah file tanpa revision control, Bonus: mengabaikan proses setelah cutting (+1 more)

### Community 66 - "perbandingan-harga-laser-cutting-vs-manual.md"
Cohesion: 0.20
Nodes (9): Break-even tidak hanya ditentukan kuantitas, Contoh perbandingan, Hitung biaya yang sering tersembunyi, Kapan cutting manual masuk akal?, Kapan laser cutting unggul?, Komponen biaya yang harus dibandingkan, Laser cutting, Metode manual (+1 more)

### Community 67 - "tren-laser-cutting-arsitektur-modern-indonesia.md"
Cohesion: 0.20
Nodes (9): 1. Secondary skin yang performatif, 2. Fasad modular, 3. Pagar dan gerbang sebagai identitas, 4. Railing dan screen tangga, 5. Partisi interior berlapis, 6. Panel akustik dan ventilasi, 7. Signage yang menyatu dengan bangunan, Memilih material dan proses (+1 more)

### Community 68 - "cara-menghitung-biaya-laser-cutting-kompleksitas-desain.md"
Cohesion: 0.22
Nodes (8): 1. Material terpakai, 2. Panjang cutting path, 3. Jumlah piercing, 4. Kecepatan berdasarkan material dan ketebalan, 5. Setup dan persiapan file, Cara mengoptimalkan biaya, Contoh: desain sederhana vs desain detail, Kisaran model harga Tepat Laser

### Community 69 - "cutting-acp-2.md"
Cohesion: 0.22
Nodes (8): 1. Mesin CNC Router (Potong & Grooving V-Cut), 2. Mesin Laser CO2, Faktor yang Memengaruhi Biaya Cutting ACP, Jenis Material ACP yang Biasa Dipotong, Mengapa Memilih Tepat Laser?, Mengenal Cutting ACP: Solusi Fasad & Interior Modern, Metode Cutting ACP: CNC Router vs Laser Cutting, Solusi Jasa Cutting ACP Presisi di Tepat Laser Tangsel

### Community 70 - "tips-audit-kualitas-hasil-laser-cutting-2026-07.md"
Cohesion: 0.22
Nodes (8): Langkah 1: Periksa Dimensi dengan Alat Ukur yang Tepat, Langkah 2: Inspeksi Visual Tepi Potongan, Langkah 3: Verifikasi Geometri dan Kelurusan, Langkah 4: Uji Fit dengan Assembly Test, Langkah 5: Periksa Kualitas Permukaan Material, Langkah 6: Dokumentasikan Semua Temuan, Mengapa Audit Kualitas Wajib Dilakukan?, Tepat Laser: Kualitas yang Bisa Kamu Verifikasi

### Community 71 - "audit-blog-images.mjs"
Cohesion: 0.25
Nodes (6): blogDir, byHash, byPath, errors, files, root

### Community 72 - "panduan-hitung-biaya-laser-cutting-plat-besi-per-meter.md"
Cohesion: 0.25
Nodes (7): 1. Kesesuaian Tebal Material terhadap Beban Struktur, 2. Penggunaan Gas Bantu (Nitrogen vs Oksigen), 3 Parameter Kritis yang Wajib Diperhatikan, 3. Simulasi Nesting CAD untuk Efisiensi Biaya, Solusi Fabrikasi Presisi di Tepat Laser, Tabel Panduan Parameter Teknis Material, Urgensi Presisi pada Panduan Menghitung Biaya Laser Cutting Plat Besi Per Meter untuk Pagar dan Partisi

### Community 73 - "perbedaan-huruf-timbul-stainless-304-vs-201-outdoor.md"
Cohesion: 0.25
Nodes (7): 1. Kesesuaian Tebal Material terhadap Beban Struktur, 2. Penggunaan Gas Bantu (Nitrogen vs Oksigen), 3 Parameter Kritis yang Wajib Diperhatikan, 3. Simulasi Nesting CAD untuk Efisiensi Biaya, Solusi Fabrikasi Presisi di Tepat Laser, Tabel Panduan Parameter Teknis Material, Urgensi Presisi pada Perbedaan Huruf Timbul Stainless Steel 304 vs 201: Mana yang Lebih Tahan Karat Outdoor?

### Community 74 - "tips-memilih-material-secondary-skin-fasad-acp-seven-marks.md"
Cohesion: 0.25
Nodes (7): 1. Kesesuaian Tebal Material terhadap Beban Struktur, 2. Penggunaan Gas Bantu (Nitrogen vs Oksigen), 3 Parameter Kritis yang Wajib Diperhatikan, 3. Simulasi Nesting CAD untuk Efisiensi Biaya, Solusi Fabrikasi Presisi di Tepat Laser, Tabel Panduan Parameter Teknis Material, Urgensi Presisi pada Tips Memilih Material Secondary Skin Fasad ACP: Perbandingan Merk Seven vs Marks PVDF

### Community 75 - "verify-no-regression.mjs"
Cohesion: 0.29
Nodes (5): allowance, baseline, [baselinePath, candidatePath], candidate, regressions

### Community 76 - "cutting-acp.md"
Cohesion: 0.29
Nodes (6): Aplikasi Populer Hasil Cutting ACP, Efisiensi Bahan Melalui Nesting CAD Otomatis, Kenapa Mempercayakan Cutting ACP Anda di Tepat Laser?, Keunggulan Metode Potong Presisi pada Material ACP, Mengenal Cutting ACP untuk Arsitektur dan Dekorasional, Spesifikasi Ketebalan dan Jenis ACP yang Sering Dipotong

### Community 77 - "fiber-laser-terbaru-2026-teknologi-terbaru-2026-07.md"
Cohesion: 0.29
Nodes (6): 1. Daya Laser yang Semakin Tinggi — Hingga 30kW, 2. Teknologi Beam Shaping — Kendali Bentuk Sinar Laser, 3. Integrasi AI untuk Optimasi Parameter Cutting, 4. Cutting Tembaga Tanpa Hambatan, 5. Efisiensi Energi 45–50%, Apa yang Harus Kamu Lakukan Sekarang?

### Community 78 - "Tepat Laser — Awwwards-oriented redesign"
Cohesion: 0.33
Nodes (5): Direction, Main fixes, Note, Tepat Laser — Awwwards-oriented redesign, Verification completed

### Community 79 - "Tepat Laser V10 — QA Report"
Cohesion: 0.33
Nodes (5): Artefak, Browser verification, Lighthouse, Static verification, Tepat Laser V10 — QA Report

### Community 80 - "Tepat Laser V6 — QA Report"
Cohesion: 0.33
Nodes (5): Browser crawl, Build dan struktur, Identitas release, Lighthouse final, Tepat Laser V6 — QA Report

### Community 81 - "Tepat Laser V9 — QA Report"
Cohesion: 0.33
Nodes (5): Artefak QA, Browser verification, Build dan static verification, Lighthouse, Tepat Laser V9 — QA Report

### Community 82 - "Tepat Laser — Redesign V5 Industrial System"
Cohesion: 0.33
Nodes (5): Bukti versi terpasang, Catatan penerapan, Perubahan utama, Tepat Laser — Redesign V5 Industrial System, Verifikasi

### Community 83 - "panduan-memilih-mesin-cnc-router-vs-laser.md"
Cohesion: 0.33
Nodes (5): 1. Prinsip Kerja Utama, 2. Perbandingan Karakteristik Kerja, 3. Kapan Harus Memilih CNC Router?, 4. Kapan Harus Memilih Laser Cutting?, Kesimpulan

### Community 84 - "Tepat Laser V9 — Image & Content Matrix"
Cohesion: 0.40
Nodes (4): Aplikasi, lokasi, dan halaman inti, Material dan produk, Mesin dan proses, Tepat Laser V9 — Image & Content Matrix

### Community 85 - "Tepat Laser V10 — Realism & Portfolio Patch"
Cohesion: 0.40
Nodes (4): Guardrail baru, Perubahan yang diminta, Route portofolio baru, Tepat Laser V10 — Realism & Portfolio Patch

### Community 86 - "Tepat Laser V8 — Patch Notes"
Cohesion: 0.40
Nodes (4): Hasil akhir, Perbaikan nonvisual, Tepat Laser V8 — Patch Notes, Verifikasi

### Community 87 - "Tepat Laser V9 — Complete Patch"
Cohesion: 0.40
Nodes (4): Cakupan, Klaim yang sengaja tidak dibuat, Perubahan utama, Tepat Laser V9 — Complete Patch

### Community 88 - "Tepat Laser V8 — QA Report"
Cohesion: 0.40
Nodes (4): Cakupan, Lighthouse lab, Perintah reproduksi, Tepat Laser V8 — QA Report

### Community 89 - "Tepat Laser — Redesign V6 Brand Spectrum"
Cohesion: 0.40
Nodes (4): Cara memeriksa versi terpasang, Penerapan, Perubahan utama, Tepat Laser — Redesign V6 Brand Spectrum

### Community 90 - "Sitemap Verification and Submission Guide"
Cohesion: 0.40
Nodes (4): 1. Automatic Sitemap Generation, 2. How to Verify the Sitemap, 3. How to Submit to Google Search Console, Sitemap Verification and Submission Guide

### Community 91 - "Cara Memakai Patch Tepat Laser V8"
Cohesion: 0.50
Nodes (3): Cara Memakai Patch Tepat Laser V8, Opsi 1 — Terapkan patch Git, Opsi 2 — Gunakan source siap pakai

### Community 92 - "Cara Memakai Tepat Laser V10"
Cohesion: 0.50
Nodes (3): Cara Memakai Tepat Laser V10, Git patch, Ready source

### Community 93 - "Cara Memakai Tepat Laser V9"
Cohesion: 0.50
Nodes (3): Cara Memakai Tepat Laser V9, Opsi paling aman: ready source, Opsi patch Git

### Community 94 - "ping-indexnow.mjs"
Cohesion: 0.67
Nodes (3): distDir, getAllHtmlFiles(), pingIndexNow()

### Community 95 - "studi-kasus-pemasangan-fasad-laser-cutting.md"
Cohesion: 0.50
Nodes (3): 1. Pemilihan Material & Ketebalan Fasad, 2. Rasio Kerapatan Motif (Porositas Fasad), 3. Sistem Rangka dan Metode Pemasangan

## Knowledge Gaps
- **820 isolated node(s):** `name`, `type`, `version`, `dev`, `build` (+815 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **4 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **What connects `name`, `type`, `version` to the rest of the system?**
  _820 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `BaseLayout.astro` be split into smaller, more focused modules?**
  _Cohesion score 0.10609756097560975 - nodes in this community are weakly interconnected._
- **Should `constants.js` be split into smaller, more focused modules?**
  _Cohesion score 0.07087486157253599 - nodes in this community are weakly interconnected._
- **Should `seo.js` be split into smaller, more focused modules?**
  _Cohesion score 0.11255411255411256 - nodes in this community are weakly interconnected._
- **Should `dependencies` be split into smaller, more focused modules?**
  _Cohesion score 0.05 - nodes in this community are weakly interconnected._
- **Should `auto-blog-publisher.mjs` be split into smaller, more focused modules?**
  _Cohesion score 0.05952380952380952 - nodes in this community are weakly interconnected._
- **Should `ApplicationLandingPage.astro` be split into smaller, more focused modules?**
  _Cohesion score 0.04081632653061224 - nodes in this community are weakly interconnected._