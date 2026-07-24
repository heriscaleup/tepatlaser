# Tepat Laser V10 — QA Report

Tanggal: 24 Juli 2026

Release: `v10-2026-07-24`

## Static verification

- Astro check: 0 error, 0 warning, 0 hint.
- Route dibangun: 80.
- HTML diperiksa: 84.
- Referensi lokal diperiksa: 5.841.
- Kegagalan struktur, konten, atau aset: 0.
- Delapan route detail portofolio berhasil dibangun.
- Grid material: 8 item.
- Kartu portofolio yang dapat dibuka: 8 item.

## Browser verification

Viewport:

- Desktop: 1440 × 900.
- Mobile: 390 × 844.

Hasil:

- 80 route × 2 viewport.
- 1 pemeriksaan mega-menu dalam keadaan terbuka.
- Total: 161 pemeriksaan.
- Kegagalan: 0.

Pemeriksaan meliputi status HTTP, H1, header/footer, logo, release marker, overflow horizontal, gambar gagal, alt gambar, link kosong, error console, keterbacaan mega-menu, serta screenshot sampel halaman yang berubah.

## Lighthouse

| Sampel final | Performance | Accessibility | Best Practices | SEO |
| --- | ---: | ---: | ---: | ---: |
| Beranda mobile | 94 | 100 | 100 | 100 |
| Beranda desktop | 100 | 100 | 100 | 100 |
| Laser CO₂ mobile | 94 | 100 | 100 | 100 |
| Detail portofolio mobile | 96 | 100 | 100 | 100 |

Seluruh sampel memiliki CLS 0. Nilai lokal dapat berubah beberapa poin antarrun, tetapi tidak ditemukan kegagalan aksesibilitas, best practices, atau SEO.

## Artefak

- `qa-v10/browser-report.json`
- `qa-v10/lighthouse-home-mobile.json`
- `qa-v10/lighthouse-home-desktop.json`
- `qa-v10/lighthouse-laser-mobile.json`
- `qa-v10/lighthouse-portfolio-detail-mobile.json`
