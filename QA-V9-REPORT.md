# Tepat Laser V9 — QA Report

Tanggal: 24 Juli 2026

Release: `v9-2026-07-24`

## Build dan static verification

- Astro check: 0 error, 0 warning, 0 hint.
- Build: 72 route.
- HTML diperiksa: 76.
- Referensi lokal diperiksa: 4.932.
- Kegagalan struktur/referensi: 0.
- Batas konten non-blog: minimum 4.000 karakter dan 5 section.
- Halaman non-blog terpendek: lebih dari 4.300 karakter pada hasil build.
- Halaman kapabilitas: sekitar 7.700–8.200 karakter dan 14 section.

## Browser verification

Viewport:

- Desktop: 1440 × 900.
- Mobile: 390 × 844.

Hasil crawler final:

- 72 halaman × 2 viewport.
- 1 pemeriksaan mega-menu terbuka.
- Total: 145 pemeriksaan.
- Kegagalan: 0.

Yang diperiksa: status HTTP, satu H1, header/footer, logo asli, release marker, konten utama terlihat, overflow horizontal, gambar gagal, alt gambar, link kosong, error console, posisi mega-menu, dan keterbacaan seluruh item mega-menu.

## Lighthouse

| Sampel | Performance | Accessibility | Best Practices | SEO |
| --- | ---: | ---: | ---: | ---: |
| Beranda mobile | 91 | 100 | 100 | 100 |
| Beranda desktop | 100 | 100 | 100 | 100 |
| Laser CO2 mobile | 97 | 100 | 100 | 100 |
| Pagar mobile | 89 | 100 | 100 | 100 |

Nilai Lighthouse lokal dapat berubah beberapa poin antar-run. Semua sampel memiliki CLS 0 dan tidak menunjukkan masalah aksesibilitas, best practices, atau SEO.

## Artefak QA

- `qa-v9/browser-report.json`
- `qa-v9/lighthouse-home-mobile.json`
- `qa-v9/lighthouse-home-desktop.json`
- `qa-v9/lighthouse-service-mobile.json`
- `qa-v9/lighthouse-application-mobile.json`
