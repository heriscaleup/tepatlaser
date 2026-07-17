# Tepat Laser — Redesign V6 Brand Spectrum

Basis: redesign V5 yang sudah menyatukan seluruh template Tepat Laser.

V6 mengubah sistem visual agar selaras dengan identitas warna logo: merah `#EA314F`, emas `#D3B15D`, hijau `#50874F`, violet `#A559AE`, dan biru `#3672AC`. Warna dipakai sebagai aksen terkontrol di atas dasar charcoal, bukan sebagai pelangi dekoratif, sehingga tampil premium dan tetap terbaca.

## Perubahan utama

- Warna lime V5 diganti sistem brand spectrum lengkap dengan varian aksesibel untuk teks dan state interaktif.
- Navbar, menu desktop/mobile, tombol, progress bar, page wipe, ticker, footer, kartu, nomor langkah, dan hover state mengikuti satu bahasa warna.
- Copywriting homepage, layanan, material, aplikasi, tentang, portofolio, kontak, FAQ, proses, blog, serta lokasi diperkuat agar lebih spesifik, meyakinkan, dan berorientasi pada keputusan produksi.
- Semua halaman tetap memakai satu Header, Footer, logo, navigasi, CTA, WhatsApp, tipografi, grid, serta motion system yang sama.
- Motion mencakup page wipe tiga warna, staggered entrance, scroll reveal, kinetic ticker, parallax terbatas, hover lift, dan microinteraction tombol dengan dukungan `prefers-reduced-motion`.
- Release marker berubah ke `v6-2026-07-17` dan state deployment baru memaksa unggahan penuh agar cache versi lama tidak tertahan.

## Cara memeriksa versi terpasang

1. `release.json` menampilkan `v6-2026-07-17`.
2. Hero beranda berbunyi “Presisi bukan soal angka. Hasilnya harus benar-benar pas.”
3. Navbar aktif memakai garis spektrum warna logo.
4. Semua halaman memakai dasar charcoal dengan aksen merah, emas, hijau, violet, dan biru yang konsisten.
5. Halaman jasa, material, aplikasi, blog, dan halaman umum memakai Header/Footer serta motion system yang sama.

## Penerapan

Gunakan full-source ZIP pada checkout bersih atau terapkan patch Git agar penghapusan dua HTML landing lama ikut tercatat. Setelah deployment, buka `https://tepatlaser.com/release.json` dengan query parameter acak untuk memastikan release V6 sudah aktif.
