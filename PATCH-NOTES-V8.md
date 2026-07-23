# Tepat Laser V8 — Patch Notes

Release: `v8-2026-07-24`

## Hasil akhir

- Seluruh 72 route produksi dibangun dan diperiksa pada viewport desktop 1440×900 serta mobile 390×844.
- Sistem visual disatukan menjadi industrial-editorial yang responsif, dengan hierarki tipografi, spacing, warna, komponen tombol, navigasi, footer, dan CTA yang konsisten.
- Konten selalu tampil tanpa bergantung pada JavaScript atau observer animasi. Ini menghilangkan risiko section kosong saat script terlambat, gagal, atau pengguna scroll cepat.
- Template kapabilitas diperdalam dengan data kebutuhan quotation, alur produksi, FAQ, related capability, breadcrumb, Service schema, dan FAQ schema.
- Halaman lokasi Jakarta, Depok, dan Bekasi mendapat konteks area, alur kolaborasi jarak jauh, pickup/pengiriman, dan FAQ yang relevan.
- Portfolio, kontak, proses produksi, homepage, services, about, blog index, seluruh artikel, CTA, serta halaman 404 diperiksa dan dirapikan.
- Klaim teknis yang tidak dapat diverifikasi—toleransi absolut, daya mesin 12 kW, lead time tetap, testimoni/statistik semu, dan jaminan hasil tanpa review file—dihapus atau diberi konteks yang benar.
- FAQ material membedakan laser CO2, laser fiber, dan CNC router; PVC tidak diposisikan sebagai material laser.
- Tag pemasaran tetap tersedia tetapi ditunda agar tidak menghambat render awal.

## Perbaikan nonvisual

- Satu `h1`, canonical, description, Open Graph, viewport, header, footer, logo, dan release marker diverifikasi per halaman.
- Seluruh referensi aset lokal, dimensi gambar, alt text, dan keamanan link `_blank` diperiksa otomatis.
- Navigasi keyboard, skip link, focus state, contrast, reduced-motion, dan semantic landmark ditangani.
- Structured data dipertahankan atau ditambahkan untuk breadcrumb, FAQ, layanan, artikel, dan bisnis.
- Custom cursor, page wipe, grain overlay, parallax runtime, magnetic JavaScript, dan listener scroll berat dihapus.
- Halaman backup lama yang berisi copy usang dihapus.

## Verifikasi

Lihat `QA-V8-REPORT.md` untuk hasil build, crawl browser, dan Lighthouse.
