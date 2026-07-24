# Tepat Laser V10 — Realism & Portfolio Patch

Release: `v10-2026-07-24`

## Perubahan yang diminta

- Mengganti ikon balon chat pada CTA menjadi glyph WhatsApp yang benar, berwarna hijau pada lingkaran gelap.
- Menambah Stainless Steel sebagai material kedelapan.
- Mengembalikan grid material menjadi komposisi desktop 4 × 2; GRC tidak lagi melebar dua kolom.
- Mengganti hero beranda dengan visual workshop Fiber Laser yang lebih realistis.
- Mengganti visual utama Laser CO₂, Laser Fiber, dan Galvo Engraving dengan fotografi industrial realistis.
- Memakai foto produk/material nyata yang sudah tersedia untuk galeri lanjutan.
- Mengubah seluruh delapan kartu portofolio menjadi link yang dapat dibuka.
- Membuat delapan halaman detail portofolio, masing-masing dengan konteks, risiko, keputusan teknis, galeri, data brief, QC, FAQ, related projects, dan CTA.
- Membuat tiga showcase portofolio di beranda ikut membuka halaman detail terkait.

## Route portofolio baru

1. `/portfolio/pagar-panel-geometris/`
2. `/portfolio/reling-tangga-berpola/`
3. `/portfolio/fasad-panel-custom/`
4. `/portfolio/pintu-panel-geometris/`
5. `/portfolio/panel-acp-beralur/`
6. `/portfolio/display-akrilik-custom/`
7. `/portfolio/komponen-stainless/`
8. `/portfolio/signage-identitas-ruang/`

## Guardrail baru

Build otomatis gagal bila:

- grid beranda tidak berisi tepat delapan material;
- indeks portofolio tidak berisi tepat delapan kartu detail;
- CTA beranda kehilangan ikon WhatsApp;
- halaman CO₂, Fiber, atau Galvo kembali memakai visual mesin generatif lama;
- halaman non-blog kurang dari 4.000 karakter atau kurang dari lima section.
