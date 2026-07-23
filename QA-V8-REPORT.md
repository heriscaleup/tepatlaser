# Tepat Laser V8 — QA Report

Tanggal audit: 24 Juli 2026

## Cakupan

| Pemeriksaan | Hasil |
|---|---:|
| Route Astro yang dibangun | 72 |
| File HTML termasuk redirect/404 | 76 |
| Pemeriksaan browser desktop + mobile | 144 |
| Referensi lokal yang diperiksa | 4.889 |
| Error build/check | 0 |
| Error struktur/referensi | 0 |
| Error browser/console/overflow/gambar | 0 |

Browser crawl memeriksa status respons, jumlah `h1`, header, footer, landmark utama, isi halaman, horizontal overflow, gambar gagal, alt text, link kosong, console error, dan page error.

## Lighthouse lab

Audit dijalankan dari build produksi lokal menggunakan Lighthouse 13 dan emulasi mobile standar, kecuali baris desktop.

| Sampel | Performance | Accessibility | Best Practices | SEO | LCP | CLS | TBT |
|---|---:|---:|---:|---:|---:|---:|---:|
| Homepage — mobile | 94 | 100 | 100 | 100 | 3,0 dtk | 0 | 60 ms |
| Homepage — desktop | 100 | 100 | 100 | 100 | 0,6 dtk | 0 | 0 ms |
| Jasa Laser Fiber — mobile | 99 | 100 | 100 | 100 | 2,1 dtk | 0 | 40 ms |
| Artikel panduan file — mobile | 99 | 100 | 100 | 100 | 2,0 dtk | 0 | 0 ms |

Skor lab dapat berubah sesuai mesin, jaringan, hosting, cache, dan script pihak ketiga. Data Core Web Vitals lapangan baru tersedia setelah versi ini dideploy dan menerima traffic nyata.

## Perintah reproduksi

```bash
npm ci
npm run check
npm run build
npm run verify
```

Untuk browser crawl dan Lighthouse, set `CHROME_PATH` ke executable Chrome/Chromium lalu jalankan:

```bash
npm run audit:browser
npm run audit:lighthouse
```

Raw report tersedia di direktori `qa-v8/`.
