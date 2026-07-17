# Tepat Laser V6 — QA Report

Tanggal pemeriksaan: 17 Juli 2026 (Asia/Jakarta)

## Build dan struktur

- Astro build: 70 halaman berhasil dibuat.
- Validator statis: 74 dokumen HTML dan 4.688 referensi lokal diperiksa, 0 kegagalan.
- Astro check: 0 error, 0 warning, 24 hint deprecation dari API schema Astro.

## Browser crawl

- 74 route diuji pada desktop 1440×900.
- 74 route diuji pada mobile 390×844.
- Total 148 render, 0 kegagalan.
- Pemeriksaan meliputi release marker V6, Header/Footer/logo, heading dan font, overflow horizontal, gambar gagal, ukuran kontrol sentuh, page wipe, token palet, motion system, serta error console.
- 12 screenshot representatif diambil untuk homepage, layanan, material, blog, aplikasi, dan tentang pada desktop/mobile.
- Inspeksi visual menemukan dan memperbaiki dua isu sebelum final: opacity section yang berisiko membuat teks tampak gelap, serta overlap heading mobile saat reveal belum aktif.

Laporan mesin: `qa-v6/browser-report.json`.

## Lighthouse final

| Halaman | Mode | Performance | Accessibility | Best Practices | SEO |
|---|---:|---:|---:|---:|---:|
| Homepage | Mobile | 92 | 100 | 100 | 100 |
| Homepage | Desktop | 100 | 100 | 100 | 100 |
| Layanan | Mobile | 100 | 100 | 100 | 100 |
| Layanan | Desktop | 100 | 100 | 100 | 100 |
| Blog | Mobile | 93 | 100 | 100 | 100 |
| Blog | Desktop | 100 | 100 | 100 | 100 |

Semua kategori berada di zona hijau. Laporan JSON final tersimpan sebagai `qa-v6/lighthouse-{home,services,blog}-{mobile,desktop}.json`.

## Identitas release

- Release marker: `v6-2026-07-17`.
- Design marker: `industrial-brand-spectrum`.
- Palet logo: merah `#EA314F`, emas `#D3B15D`, hijau `#50874F`, violet `#A559AE`, biru `#3672AC`.
