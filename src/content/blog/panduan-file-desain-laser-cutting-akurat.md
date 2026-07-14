---
title: "File Laser Cutting: Panduan DXF, DWG, AI, CDR, SVG, PDF"
description: "Panduan menyiapkan file laser cutting DXF, DWG, AI, CDR, SVG, dan PDF: skala, unit, contour, garis ganda, kerf, layer, font, revisi, dan preflight."
excerpt: "File bersih mempercepat quotation, mengurangi waktu setup, dan mencegah mesin mengikuti kesalahan desain dengan sangat presisi."
category: "Panduan File & Desain"
readTime: "11 menit baca"
publishDate: "2025-01-18"
updatedDate: "2026-07-15"
image: "/images/blog/panduan-file-desain-laser-cutting-akurat.webp"
imageAlt: "File DXF laser cutting dengan contour, dimensi, dan layer produksi"
keywords: "file laser cutting, format DXF laser cutting, cara membuat file cutting, file CDR laser, desain laser cutting, preflight DXF"
primaryKeyword: "file laser cutting"
author: "Tim Teknis Tepat Laser"
keyTakeaways:
  - "Gunakan vektor skala 1:1, unit jelas, contour tertutup, dan tanpa garis ganda."
  - "Pisahkan cutting, engraving, marking, dan bend line ke layer."
  - "Kirim file mesin bersama PDF preview/drawing dan revision code."
relatedLinks:
  - title: "Sebelum order laser cutting"
    url: "/blog/hal-disiapkan-sebelum-order-laser-cutting/"
  - title: "Cara menghitung biaya desain"
    url: "/blog/cara-menghitung-biaya-laser-cutting-kompleksitas-desain/"
  - title: "Hubungi tim untuk review file"
    url: "/contact/"
faq:
  - question: "Format file terbaik untuk laser cutting apa?"
    answer: "DXF atau DWG lazim untuk part teknis. AI, CDR, SVG, dan PDF vektor cocok untuk grafis setelah skala serta contour diverifikasi."
  - question: "Apakah JPG atau PNG bisa dipotong?"
    answer: "Gambar raster perlu ditracing menjadi vektor untuk cutting. Untuk engraving foto, raster dapat digunakan dengan workflow berbeda."
  - question: "Siapa yang mengompensasi kerf?"
    answer: "Umumnya vendor mengatur kompensasi di CAM. Jangan offset file tanpa koordinasi agar kerf tidak dikompensasi dua kali."
---

Mesin cutting membaca jalur. File yang terlihat benar di layar dapat menyimpan garis tumpang tindih, skala salah, atau contour terbuka. Preflight mencegah mesin mengikuti error tersebut.

## Pilih format yang sesuai

### DXF dan DWG

Pilihan utama untuk part engineering. Simpan geometri 2D, gunakan unit mm, dan hindari object proxy yang tidak terbaca software lain.

### AI dan CDR

Cocok untuk logo, signage, dan desain grafis. Convert font menjadi outlines/curve. Hapus clipping mask serta efek yang tidak menjadi jalur.

### SVG

Format vektor terbuka yang baik untuk desain 2D. Verifikasi unit karena software dapat menafsirkan pixel dan mm berbeda.

### PDF

PDF dapat berisi vektor atau raster. Jangan berasumsi semuanya siap cutting. Zoom dan periksa apakah path tetap tajam, lalu konfirmasi skala.

### JPG dan PNG

Raster tidak memiliki contour mesin. Gunakan sebagai referensi visual atau engraving foto. Untuk cutting, lakukan tracing.

## Gunakan skala 1:1

Gambar part pada ukuran sebenarnya. Tulis unit di nama file atau drawing. Kesalahan inch–mm dapat membuat part 25,4 kali salah.

Tambahkan satu dimensi referensi di PDF preview.

## Satu garis untuk satu potongan

Garis ganda membuat mesin melewati jalur dua kali. Akibatnya:

- edge terbakar,
- waktu bertambah,
- part melengkung,
- dan biaya naik.

Gunakan duplicate detection, overkill, atau clean-up sesuai software.

## Tutup contour

Contour terbuka dapat membuat jalur berhenti, kompensasi gagal, atau bentuk tidak terpisah. Join endpoint dengan toleransi wajar.

Jangan menutup celah besar otomatis tanpa memeriksa bentuk.

## Kurangi node

Curve hasil auto-trace sering berisi ribuan node. Simplify dengan tetap menjaga geometri. Kurva halus menghasilkan gerakan lebih stabil dan file ringan.

## Pisahkan layer

Contoh:

- CUT_OUTER,
- CUT_INNER,
- ENGRAVE,
- MARK,
- BEND_LINE,
- DIMENSION.

Gunakan warna sebagai bantuan visual, tetapi jangan mengandalkan warna tanpa nama layer.

## Convert font

Font yang tidak tersedia dapat berubah. Convert menjadi curve/outlines, lalu periksa counter huruf seperti A, B, D, O, dan P.

Untuk stencil, tambahkan bridge agar bagian tengah tidak lepas.

## Pertimbangkan kerf

Kerf adalah material yang hilang. Diskusikan kompensasi dengan vendor. Biasanya offset dilakukan di CAM berdasarkan proses.

Untuk press-fit, kirim ukuran nominal dan buat test coupon. Jangan menebak offset final.

## Detail minimum

Aturan dipengaruhi material dan ketebalan. Periksa:

- diameter lubang,
- slot,
- lebar jembatan,
- jarak antarcontour,
- radius,
- dan jarak lubang ke edge.

Vendor perlu melihat file untuk memberi batas yang relevan.

## Order of operations

Fitur internal umumnya dipotong sebelum contour luar. Designer tidak selalu perlu mengatur urutan, tetapi layer dan hierarki geometri harus jelas.

## Revision control

Gunakan nama seperti:

> PROJECT-PART-REV03-2026-07-15.dxf

Kirim PDF dengan nama revisi sama. Setelah approval, beri status Approved for Production.

## Sertakan drawing

DXF menyimpan geometri. PDF drawing menyimpan:

- material,
- ketebalan,
- jumlah,
- dimensi kritis,
- toleransi,
- finish,
- grain,
- dan catatan proses.

Keduanya saling melengkapi.

## Preflight 12 poin

- [ ] Skala 1:1.
- [ ] Unit jelas.
- [ ] Geometri 2D pada plane yang benar.
- [ ] Garis ganda dihapus.
- [ ] Contour tertutup.
- [ ] Node disederhanakan.
- [ ] Font menjadi curve.
- [ ] Layer proses terpisah.
- [ ] Detail minimum direview.
- [ ] Kerf belum dikompensasi ganda.
- [ ] Revisi tertulis.
- [ ] PDF preview disertakan.

File yang rapi bukan hanya mempercepat mesin. Ia mempercepat seluruh komunikasi dari quotation sampai QC.
