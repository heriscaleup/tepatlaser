export const SERVICE_EDITORIAL_GUIDES = {
  'jasa-laser-co2': {
    intro: 'Laser CO2 paling berguna ketika file, material, dan target permukaan sudah cukup jelas sebelum produksi. Dua lembaran yang sama-sama disebut akrilik atau kayu dapat memberi respons berbeda terhadap panas, sehingga estimasi yang baik tidak hanya membaca ukuran luar. Ketebalan aktual, jenis bahan, protective film, kepadatan detail, area engraving, dan cara komponen akan dirakit ikut menentukan rute pengerjaan.',
    fileChecklist: [
      { title: 'Ukuran akhir dan satuan', detail: 'Pastikan drawing menyebut mm atau cm dan memiliki minimal satu dimensi acuan. File tanpa skala mudah menghasilkan salah tafsir.' },
      { title: 'Pisahkan cutting dan engraving', detail: 'Gunakan layer, warna, atau catatan yang jelas untuk membedakan garis potong, engraving, marking, dan area yang tidak boleh diproses.' },
      { title: 'Sebut jenis bahan, bukan hanya warnanya', detail: 'Akrilik cast dan extruded, plywood dengan lem berbeda, MDF, kertas, kain, dan material lain tidak selalu memakai parameter yang sama.' },
      { title: 'Tandai sisi kosmetik', detail: 'Beri tahu sisi yang akan terlihat saat produk terpasang agar orientasi material, film, dan penanganan permukaan bisa direncanakan.' },
      { title: 'Jelaskan sambungan', detail: 'Jika ada slot, tab, press-fit, baut, atau bagian yang akan dilem, sertakan pasangannya atau ukuran kritis supaya kerf dan ketebalan aktual dapat dipertimbangkan.' },
      { title: 'Jumlah per desain', detail: 'Pisahkan jumlah setiap varian. Informasi ini memengaruhi nesting, kebutuhan material, waktu setup, dan cara packing.' }
    ],
    commonMistakes: [
      'Menganggap semua akrilik dengan ketebalan nominal yang sama memiliki ukuran aktual identik.',
      'Mengirim file dengan garis ganda atau objek bertumpuk sehingga jalur yang sama berpotensi diproses lebih dari sekali.',
      'Membuat jembatan pola terlalu tipis tanpa mempertimbangkan panas, handling, dan proses pemasangan.',
      'Meminta tepi sangat bening tetapi tidak menjelaskan apakah polishing atau proses finishing lain termasuk scope.',
      'Mengirim foto referensi tanpa ukuran dan berharap foto tersebut cukup menjadi file produksi.'
    ],
    briefExample: {
      weak: '“Potong akrilik 5 mm seperti foto ini, 20 pcs. Berapa harganya?”',
      strong: '“Akrilik bening 5 mm, 20 pcs satu desain. Ukuran akhir 180 × 60 mm. File AI terlampir, layer merah untuk cut dan hitam untuk engraving. Sisi depan kosmetik, protective film jangan dilepas. Ada dua slot untuk dirakit dengan part lain; ukuran slot sudah ditandai di drawing. Target diterima sebelum Jumat.”'
    },
    faqs: [
      { question: 'Apakah semua plastik aman diproses dengan laser CO2?', answer: 'Tidak. Jenis material perlu diketahui sebelum produksi. Bahan yang mengandung klorin seperti PVC tidak boleh diperlakukan sebagai material laser biasa; tim perlu mengarahkan ke proses yang sesuai.' },
      { question: 'Mengapa hasil engraving akrilik bisa berbeda walau filenya sama?', answer: 'Jenis akrilik, warna, permukaan, fokus, parameter, dan kondisi lembaran memengaruhi kontras serta tekstur. Sampel pada bahan aktual lebih berguna daripada menjanjikan satu hasil untuk semua material.' }
    ]
  },
  'jasa-laser-fiber': {
    intro: 'Laser fiber untuk lembaran metal sebaiknya dibahas sebagai bagian dari alur fabrikasi, bukan hanya proses memotong bentuk. Grade material, ketebalan, kondisi permukaan, geometri lubang, jumlah pierce, kebutuhan bending, welding, deburring, coating, dan datum perakitan dapat mengubah cara file disiapkan serta cara hasil diperiksa.',
    fileChecklist: [
      { title: 'Grade dan ketebalan metal', detail: 'Tuliskan jenis material yang benar-benar dibutuhkan, misalnya stainless, mild steel, galvanis, atau material lain yang sudah ditentukan oleh desain.' },
      { title: 'Dimensi kritis dan datum', detail: 'Tandai lubang, slot, jarak pusat, sisi referensi, atau area sambungan yang memengaruhi fungsi. Tidak semua sisi perlu diperlakukan sebagai dimensi kritis.' },
      { title: 'Proses setelah cutting', detail: 'Sebutkan sejak awal jika part akan dibending, dilas, ditap, dicat, powder coating, atau dirakit dengan komponen lain.' },
      { title: 'Arah permukaan kosmetik', detail: 'Untuk stainless atau lembaran dengan sisi visual, tunjukkan muka yang perlu dijaga dan orientasi yang perlu dipertahankan.' },
      { title: 'Jumlah dan variasi part', detail: 'Beri nama atau part number pada setiap bentuk bila satu file berisi banyak komponen. Ini membantu nesting, sorting, QC, dan packing.' },
      { title: 'Format kerja yang bersih', detail: 'DXF atau DWG sebaiknya tidak berisi garis ganda, dimensi yang ikut menjadi jalur potong, atau geometri terbuka yang tidak disengaja.' }
    ],
    commonMistakes: [
      'Meminta “presisi tinggi” tanpa menunjukkan dimensi mana yang benar-benar kritis untuk fungsi komponen.',
      'Mengubah proses lanjutan setelah file cutting final, padahal bending atau welding dapat membutuhkan allowance dan urutan berbeda.',
      'Mencampur beberapa revisi file dengan nama yang hampir sama sehingga versi produksi tidak jelas.',
      'Mengabaikan finishing tepi atau deburring lalu menganggap hasil cutting otomatis siap untuk semua jenis perakitan.',
      'Mengirim gambar raster atau screenshot untuk komponen yang seharusnya memiliki geometri dan ukuran terukur.'
    ],
    briefExample: {
      weak: '“Potong plat 3 mm, sekitar 100 pcs. Yang penting presisi.”',
      strong: '“Mild steel 3 mm, 100 pcs part A dan 40 pcs part B. DXF revisi R03 terlampir. Dua lubang pada part A adalah datum untuk baut dan dimensinya ditandai pada PDF. Setelah cutting part akan dibending 90°, lalu powder coating. Deburring termasuk scope. Pisahkan part A/B saat packing.”'
    },
    faqs: [
      { question: 'Apakah toleransi laser cutting bisa ditentukan hanya dari ketebalan material?', answer: 'Tidak. Toleransi yang relevan bergantung pada fungsi part, geometri, material, kondisi lembaran, proses lanjutan, dan metode pemeriksaan. Drawing sebaiknya menunjukkan dimensi yang benar-benar penting.' },
      { question: 'Apakah hasil laser fiber selalu langsung siap dirakit?', answer: 'Belum tentu. Beberapa pekerjaan membutuhkan deburring, cleaning, bending, welding, coating, atau pemeriksaan tambahan. Scope tersebut perlu disepakati agar penawaran dan lead time tidak dibangun dari asumsi.' }
    ]
  },
  'jasa-cnc-router': {
    intro: 'CNC router bekerja dengan tool yang memiliki diameter fisik. Karena itu desain tidak bisa dipisahkan dari radius sudut, kedalaman pocket, strategi pemakanan, arah serat, hold-down, dan ruang yang tersedia untuk tool. Untuk panel, pertanyaan “bisa dipotong?” sering kurang berguna dibanding “detail ini masih realistis dikerjakan dengan tool dan material yang dipilih?”',
    fileChecklist: [
      { title: 'Bedakan cut-through dan pocket', detail: 'Tandai kontur yang harus tembus, area pocket, engraving, V-groove, chamfer, atau relief. Kedalaman proses perlu dinyatakan.' },
      { title: 'Perhatikan radius sudut dalam', detail: 'Sudut dalam mengikuti radius cutter. Jika sambungan membutuhkan sudut tajam, desain mungkin memerlukan dog-bone, perubahan slot, atau strategi lain.' },
      { title: 'Sebut muka dan arah material', detail: 'Untuk plywood, kayu, ACP, atau panel bertekstur, orientasi serat, coating, dan muka visual dapat memengaruhi nesting serta finishing.' },
      { title: 'Berikan ukuran panel awal', detail: 'Ukuran material membantu menentukan clamping, posisi nol, sisa tepi, dan apakah geometri perlu dipecah menjadi beberapa bagian.' },
      { title: 'Tentukan kedalaman dan ketebalan aktual', detail: 'Pocket 3 mm pada material nominal 12 mm berbeda risikonya dengan cut-through. Ketebalan aktual lebih berguna untuk sambungan daripada angka katalog saja.' },
      { title: 'Jelaskan tahap setelah routing', detail: 'Sanding, bending ACP, assembly, coating, pemasangan insert, atau finishing perlu diketahui agar arah proses dan allowance tidak saling bertabrakan.' }
    ],
    commonMistakes: [
      'Mendesain sudut dalam sangat tajam tanpa mempertimbangkan diameter tool.',
      'Tidak membedakan pocket, engraving, dan cut-through pada file.',
      'Membuat bagian kecil tanpa area cukup untuk hold-down atau tab sehingga part mudah bergeser saat proses.',
      'Menganggap permukaan hasil router selalu langsung siap finishing tanpa sanding atau cleanup.',
      'Mengirim panel besar tanpa menjelaskan orientasi pola, muka visual, dan urutan pemasangan.'
    ],
    briefExample: {
      weak: '“CNC panel ini sampai bolong, ukuran kira-kira 1 lembar. Bisa?”',
      strong: '“ACP 4 mm ukuran lembar 1220 × 2440 mm. Pola fasad pada DXF terlampir. Garis hijau cut-through, garis biru V-groove di sisi belakang. Muka coating warna hitam adalah sisi kosmetik. Panel diberi nomor sesuai layout pemasangan 01-12 dan perlu dipacking sesuai urutan.”'
    },
    faqs: [
      { question: 'Mengapa sudut dalam hasil CNC tidak bisa selalu setajam gambar?', answer: 'Cutter memiliki diameter, sehingga sudut internal meninggalkan radius. Jika bentuk sambungan membutuhkan ruang tambahan, file perlu menyesuaikan tool yang digunakan.' },
      { question: 'Apakah PVC board dan GRC sebaiknya diproses dengan laser?', answer: 'Tidak otomatis. Rute proses harus mengikuti karakter serta keselamatan material. Untuk material tertentu, CNC router merupakan pilihan yang lebih masuk akal daripada laser. Nama URL lama tidak boleh dijadikan dasar memilih proses.' }
    ]
  },
  'jasa-galvo-engraving': {
    intro: 'Galvo engraving cocok untuk identitas produk, marking, serial number, logo, QR code, dan data variabel ketika posisi serta keterbacaan harus konsisten antarunit. Hasil tidak hanya ditentukan file grafis. Permukaan, coating, fokus, jig, datum posisi, bentuk benda, dan data yang berubah per unit perlu masuk ke brief sejak awal.',
    fileChecklist: [
      { title: 'Area marking dan datum', detail: 'Tentukan posisi marking dari sisi, lubang, centerline, atau fitur fisik yang dapat dipakai sebagai acuan pemasangan jig.' },
      { title: 'Ukuran minimum teks/kode', detail: 'Sebut ukuran aktual dan jarak baca yang diharapkan. Teks sangat kecil atau QR padat perlu diuji pada material sebenarnya.' },
      { title: 'Jenis permukaan', detail: 'Coating, anodize, stainless, cat, warna, dan tekstur dapat mengubah kontras. Foto material membantu konsultasi, tetapi sampel aktual tetap lebih kuat.' },
      { title: 'Data variabel', detail: 'Untuk nomor seri, nama, tanggal, atau QR berbeda per unit, kirim tabel yang memiliki urutan dan ID yang dapat dicocokkan dengan barang.' },
      { title: 'Bentuk benda', detail: 'Permukaan datar, silinder, melengkung, atau memiliki bibir tinggi membutuhkan setup dan kemungkinan jig yang berbeda.' },
      { title: 'Standar keterbacaan', detail: 'Jika kode akan dipindai, sebutkan aplikasi atau perangkat yang digunakan untuk validasi sehingga QC tidak hanya mengandalkan tampilan visual.' }
    ],
    commonMistakes: [
      'Mengirim logo tanpa ukuran dan posisi lalu berharap operator menentukan layout akhir.',
      'Menggunakan QR atau data matrix yang terlalu padat tanpa uji keterbacaan pada permukaan aktual.',
      'Tidak memberikan urutan data variabel sehingga risiko salah pasangan antara barang dan serial number meningkat.',
      'Menganggap warna marking akan sama pada semua coating atau grade material.',
      'Mengirim benda melengkung tanpa informasi diameter, area marking, atau kebutuhan rotary/jig.'
    ],
    briefExample: {
      weak: '“Engrave logo dan nomor seri di 200 pcs. Pokoknya sama semua posisinya.”',
      strong: '“200 pcs nameplate stainless. Logo 22 mm lebar, center 18 mm dari tepi kiri. Serial number berbeda per unit, daftar CSV terlampir dan harus mengikuti ID pada kemasan. QR perlu bisa dipindai dengan kamera ponsel. Mohon sample 1 pcs untuk konfirmasi kontras sebelum batch.”'
    },
    faqs: [
      { question: 'Apakah QR code yang terlihat jelas pasti dapat dipindai?', answer: 'Tidak selalu. Ukuran modul, kontras, permukaan, distorsi, dan kepadatan data memengaruhi pembacaan. Jika fungsi scan penting, QC perlu memasukkan pengujian dengan perangkat yang relevan.' },
      { question: 'Mengapa sample penting untuk marking?', answer: 'Material dan coating dapat merespons parameter secara berbeda. Sample membantu menyepakati kontras, posisi, ukuran, serta efek permukaan sebelum batch diproses.' }
    ]
  }
};

export function getServiceEditorialGuide(slug) {
  return SERVICE_EDITORIAL_GUIDES[slug] || null;
}
