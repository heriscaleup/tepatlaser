# Tepat Laser — Redesign V5 Industrial System

Basis patch: `b0e74901a0b30b3c05877e625e4418b93a1c1d66` (`main`, 17 Juli 2026).

Paket ini mengganti sistem desain lintas semua template Tepat Laser. Arah visual dikunci ke identitas industrial charcoal/deep-green dengan acid lime `#b8ff3d`, bukan campuran biru, oranye, dan tema lama.

## Perubahan utama

- Semua halaman memakai satu `Header`, `Footer`, logo `/images/logo.webp`, navigasi, CTA, WhatsApp, token warna, tipografi Clash Display, dan aturan layout responsif.
- Homepage, halaman umum, jasa, material, lokasi, aplikasi, portofolio, indeks blog, dan artikel memakai satu shell visual yang sama.
- Hero dan kartu layanan/material memakai lima aset industrial baru yang dioptimalkan ke WebP (28–76 KB per gambar).
- Motion global mencakup page wipe, staggered entrance, scroll reveal, kinetic production ticker, parallax terbatas, hover lift, dan microinteraction tombol.
- Kontras teks diperbaiki: off-white untuk copy utama, muted sage untuk copy sekunder, acid lime hanya sebagai aksen berkontras tinggi.
- Landing pagar dan railing yang sebelumnya berupa HTML mandiri dipindah ke layout Astro bersama.
- Empat URL lama ditangani sebagai redirect Astro dan tidak lagi menyimpan dokumen HTML desain lama.
- Deployment memakai state FTP V5 dan release marker untuk memaksa upload lengkap serta mendeteksi deployment parsial.
- HTML dan release marker memakai aturan `no-store` agar versi navbar/template lama tidak tertahan cache.

## Verifikasi

- `astro build`: 70 halaman Astro berhasil dibuat.
- Validator statis: 74 dokumen HTML dan 4.688 referensi lokal, 0 kegagalan.
- Browser crawl final memeriksa 74 route (70 halaman konten + 4 redirect) pada desktop dan mobile, dengan 0 kegagalan.
- Pemeriksaan browser meliputi release marker, header/footer/logo, urutan nav, font dan skala heading, overflow, gambar gagal, copy/layout lama, motion system, kontras teks, token tema, console error, scroll reveal, dan menu mobile.
- 16 screenshot lintas homepage, jasa, material, blog, artikel, aplikasi, dan tentang diperiksa di desktop/mobile.
- Lighthouse homepage: mobile 99/100/100/100; desktop 100/100/100/100.
- Lighthouse blog: mobile 96/100/100/100; desktop 100/100/100/100.
- Lighthouse halaman layanan: mobile dan desktop 100/100/100/100.
- `astro check`: 0 error dan 0 warning (hanya hint deprecation dari API schema Astro).

## Catatan penerapan

File lama berikut harus ikut terhapus saat patch diterapkan:

- `public/pagar-laser-cutting/index.html`
- `public/railing-laser-cutting/index.html`

Gunakan full-source ZIP pada checkout bersih atau terapkan patch Git agar penghapusan file tercatat. Setelah deployment, `https://tepatlaser.com/release.json` harus menampilkan `v5-2026-07-17`.

## Bukti versi terpasang

1. Hero beranda berbunyi “Potongan presisi. Proyek berjalan pasti.” dan memakai visual mesin fiber laser.
2. Semua navbar menampilkan logo yang sama serta menu: Beranda, Tentang, Layanan, Portofolio, Wawasan.
3. Semua halaman memakai palet charcoal/deep-green + acid lime; tema biru/oranye tidak muncul.
4. Halaman jasa/material memiliki ticker produksi dan visual industrial konsisten.
5. `release.json` menampilkan release V5.
