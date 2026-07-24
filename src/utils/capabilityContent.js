const image = (src, alt, label, caption) => ({ src, alt, label, caption });
const decision = (title, description) => ({ title, description });

export const CAPABILITY_CONTENT = {
  'jasa-laser-co2': {
    lead: 'Laser CO2 tepat untuk pekerjaan non-metal ketika bentuk, kualitas tepi, dan kondisi permukaan sama pentingnya dengan kecepatan potong. Tim tidak langsung menyalakan mesin: jenis bahan, ketebalan, protective film, kepadatan detail, dan target finishing dibaca lebih dahulu.',
    decisions: [
      decision('Kenali bahan sebenarnya', 'Akrilik cast dan extruded, MDF, plywood, kertas, kain, serta karet merespons panas secara berbeda. Nama bahan saja belum cukup.'),
      decision('Pisahkan cut dan engrave', 'Warna layer, urutan proses, serta area engraving perlu jelas agar operator tidak menafsirkan file saat material sudah berada di meja mesin.'),
      decision('Tentukan kualitas tepi', 'Tepi bening, tepi siap cat, atau komponen yang akan dirakit membutuhkan parameter dan pemeriksaan yang berbeda.')
    ],
    fit: ['Signage dan display akrilik', 'Panel dekoratif MDF atau plywood', 'Template, kemasan, dan prototipe non-metal', 'Engraving identitas pada kayu atau akrilik'],
    notFit: ['PVC dan material berklorin', 'Plat metal yang membutuhkan laser fiber', 'Komponen dengan pocket atau profil bertingkat yang lebih tepat dikerjakan CNC router'],
    gallery: [
      image('/images/generated/co2-acrylic-v5.webp', 'Laser CO2 memotong lembaran akrilik', 'Proses', 'Sinar terfokus mengikuti jalur vektor pada material non-metal.'),
      image('/images/akrilik (3).webp', 'Contoh produk akrilik hasil laser cutting dan engraving', 'Hasil aplikasi', 'Akrilik dapat dipotong, diukir, dan dirakit menjadi display atau produk identitas.'),
      image('/images/mdf (2).webp', 'Panel MDF dekoratif hasil pemotongan laser', 'Material', 'Detail pola harus mempertimbangkan ketebalan jembatan dan bekas panas pada tepi.')
    ],
    priceFactors: ['Jenis dan ketebalan bahan', 'Panjang total jalur potong', 'Luas serta kepadatan engraving', 'Jumlah desain dan jumlah unit', 'Kebutuhan masking, cleaning, atau perakitan'],
    qualityChecks: ['Dimensi acuan dibandingkan dengan file final', 'Garis ganda dan bagian kecil diperiksa sebelum nesting', 'Tepi, noda asap, dan protective film diperiksa visual', 'Bagian yang dirakit diuji pada titik sambungan penting', 'Jumlah dan orientasi komponen diverifikasi sebelum packing']
  },
  'jasa-laser-fiber': {
    lead: 'Laser fiber 1500 W digunakan untuk memotong lembaran metal berdasarkan file digital. Daya mesin bukan satu-satunya penentu hasil; grade material, kondisi lembaran, fokus, gas bantu, geometri, dan cara part ditahan ikut menentukan tepi serta konsistensi dimensi.',
    decisions: [
      decision('Kunci grade dan ketebalan', 'Stainless, mild steel, dan aluminium tidak boleh diperlakukan sebagai satu material yang sama. Grade memengaruhi parameter serta proses berikutnya.'),
      decision('Tandai dimensi kritis', 'Tidak semua sisi membutuhkan toleransi yang sama. Titik sambungan, lubang baut, dan datum perlu ditunjukkan pada drawing.'),
      decision('Rencanakan proses lanjutan', 'Bending, welding, deburring, powder coating, atau pemasangan dapat mengubah allowance dan urutan produksi.')
    ],
    fit: ['Bracket dan komponen lembaran', 'Panel, cover, dan enclosure', 'Elemen arsitektur metal', 'Produksi batch berbasis DXF atau DWG'],
    notFit: ['Material non-metal seperti MDF dan akrilik', 'Pekerjaan bubut atau milling tiga dimensi', 'Desain tanpa ukuran yang masih harus ditentukan di lapangan'],
    gallery: [
      image('/images/generated/fiber-laser-v5.webp', 'Mesin laser fiber memotong lembaran metal', 'Proses', 'Cutting head, fokus, dan parameter dipilih menurut jenis serta ketebalan metal.'),
      image('/images/stainlesssteel (3).webp', 'Lembaran stainless berpola setelah laser cutting', 'Hasil potong', 'Kepadatan pola, jembatan, dan potensi deformasi perlu dinilai sebelum produksi.'),
      image('/images/furnituremetal.webp', 'Lembaran metal pada meja mesin laser fiber', 'Area produksi', 'Nesting yang baik membantu penggunaan bahan dan urutan pengambilan part.')
    ],
    priceFactors: ['Grade dan ketebalan metal', 'Ukuran lembaran serta utilisasi nesting', 'Panjang jalur dan jumlah pierce', 'Jumlah part dan variasi desain', 'Deburring, bending, welding, atau finishing'],
    qualityChecks: ['Material dan ketebalan dicocokkan dengan brief', 'Lubang, slot, dan datum penting diperiksa', 'Dross, burr, serta bekas panas dievaluasi', 'Part kecil dipisahkan dan dihitung', 'Arah serat atau permukaan dekoratif dijaga saat packing']
  },
  'jasa-cnc-router': {
    lead: 'CNC router dipilih ketika pekerjaan membutuhkan pemakanan mekanis: memotong panel tebal, membuat pocket, profiling, V-groove, atau relief. Diameter tool, arah serat, strategi pemakanan, dan cara material dijepit menjadi bagian dari desain produksi.',
    decisions: [
      decision('Pilih tool sesuai detail', 'Sudut dalam tidak bisa lebih tajam daripada radius cutter. Detail desain perlu menyesuaikan diameter dan panjang mata router.'),
      decision('Tentukan kedalaman proses', 'Cut-through, pocket, engraving, chamfer, dan V-groove harus dipisahkan jelas pada file atau drawing.'),
      decision('Jaga material tetap stabil', 'Panel lebar, tipis, atau melengkung membutuhkan strategi hold-down agar tidak bergeser dan merusak ukuran.')
    ],
    fit: ['ACP, PVC board, GRC, MDF, dan plywood', 'Fasad, signage, furnitur, dan panel interior', 'Pocket, profiling, V-groove, serta relief', 'Produksi panel berulang berbasis file'],
    notFit: ['Detail sangat kecil di bawah kemampuan diameter tool', 'Metal tebal yang memerlukan mesin milling khusus', 'Material rapuh tanpa area cukup untuk clamping'],
    gallery: [
      image('/images/generated/cnc-router-v5.webp', 'CNC router mengerjakan panel menggunakan spindle', 'Proses', 'Spindle dan mata router mengikis material secara mekanis sesuai toolpath.'),
      image('/images/acppro (3).webp', 'Panel ACP dengan pola hasil CNC router', 'Aplikasi ACP', 'Jarak antarpola dan sisa jembatan perlu cukup kuat untuk proses serta pemasangan.'),
      image('/images/pcvboard (2).webp', 'Panel PVC board berpola hasil CNC routing', 'Aplikasi PVC', 'PVC board diproses dengan router, bukan laser, untuk menjaga keselamatan material.')
    ],
    priceFactors: ['Jenis material dan ketebalan', 'Jumlah tool serta pergantian proses', 'Panjang toolpath dan kedalaman pemakanan', 'Ukuran panel dan metode clamping', 'Sanding, assembly, atau finishing'],
    qualityChecks: ['Kedalaman pocket dan cut-through diperiksa', 'Radius sudut dibandingkan dengan tool yang digunakan', 'Tepi pecah, burr, dan serat terangkat dievaluasi', 'Orientasi muka panel dijaga', 'Panel diberi identitas sesuai urutan pemasangan bila diperlukan']
  },
  'jasa-galvo-engraving': {
    lead: 'Galvo engraving memindahkan sinar melalui mirror berkecepatan tinggi untuk marking dan personalisasi. Fokus utamanya bukan memotong lembaran besar, melainkan menghasilkan identitas yang terbaca, konsisten, dan sesuai permukaan produk.',
    decisions: [
      decision('Uji kontras pada bahan aktual', 'Warna dan kedalaman marking berubah menurut coating, grade, warna bahan, serta parameter. Sampel mengurangi salah ekspektasi.'),
      decision('Tentukan area marking', 'Posisi logo, serial number, QR, dan batas aman dari tepi harus memiliki datum atau jig yang jelas.'),
      decision('Siapkan data variabel', 'Nomor seri atau nama berbeda per unit perlu disusun dalam format dan urutan yang dapat diverifikasi.')
    ],
    fit: ['Logo dan identitas produk', 'Serial number dan kode produksi', 'QR code serta data matrix', 'Personalisasi batch dan souvenir'],
    notFit: ['Pemotongan lembaran berukuran besar', 'Engraving sangat dalam tanpa uji waktu proses', 'Permukaan melengkung ekstrem tanpa rotary atau jig yang sesuai'],
    gallery: [
      image('/images/generated/galvo-engraving-v5.webp', 'Proses galvo engraving pada permukaan produk', 'Proses', 'Mirror galvo mengarahkan sinar pada area marking dengan cepat.'),
      image('/images/engraving.webp', 'Mesin engraving menandai komponen metal', 'Marking metal', 'Fokus, posisi, dan jig menentukan konsistensi antarunit.'),
      image('/images/akrilik (2).webp', 'Papan identitas hasil cutting dan engraving', 'Identitas', 'Keterbacaan informasi dinilai pada jarak penggunaan yang sebenarnya.')
    ],
    priceFactors: ['Jenis serta kondisi permukaan', 'Ukuran dan kepadatan area marking', 'Jumlah unit dan variasi data', 'Kebutuhan jig atau rotary', 'Sampel, cleaning, dan penataan ulang produk'],
    qualityChecks: ['Posisi marking dibandingkan dengan datum', 'Teks kecil dan QR diuji keterbacaannya', 'Kontras diperiksa di bawah cahaya normal', 'Data variabel dicocokkan dengan daftar', 'Permukaan produk diperiksa sebelum dan sesudah proses']
  },
  'laser-cutting-akrilik': {
    lead: 'Akrilik dipilih karena transparansi, pilihan warna, dan kemampuannya membentuk produk yang terlihat bersih. Hasil akhir tetap bergantung pada jenis akrilik, ketebalan, protective film, radius, jarak antarpotongan, serta cara komponen dirakit.',
    decisions: [
      decision('Cast atau extruded', 'Keduanya dapat terlihat serupa, tetapi respons terhadap cutting dan engraving berbeda. Jenis lembaran perlu dikonfirmasi.'),
      decision('Bening bukan berarti tanpa proses', 'Bekas panas, film pelindung, lem, flame polishing, dan cleaning memengaruhi tampilan akhir.'),
      decision('Rancang sambungan sejak file', 'Slot, tab, lubang, dan bending allowance harus memperhitungkan ketebalan aktual serta kerf.')
    ],
    fit: ['Display dan etalase', 'Signage serta huruf', 'Plakat dan merchandise', 'Cover, template, dan prototipe'],
    notFit: ['Aplikasi struktur berat', 'Area panas tinggi tanpa evaluasi material', 'Desain snap-fit tanpa sampel ketebalan aktual'],
    gallery: [
      image('/images/generated/acrylic-material-v5.webp', 'Lembaran akrilik berwarna dan transparan', 'Pilihan bahan', 'Warna, tingkat transparansi, dan ketebalan dipilih berdasarkan fungsi.'),
      image('/images/akrilik (3).webp', 'Produk display dan plakat dari akrilik', 'Produk', 'Cutting, engraving, dan assembly dapat digabung dalam satu produk.'),
      image('/images/akrilik (4).webp', 'Panel akrilik bermotif hasil laser cutting', 'Detail potong', 'Pola kecil memerlukan jembatan yang cukup serta perlindungan permukaan.')
    ],
    priceFactors: ['Jenis, warna, dan ketebalan akrilik', 'Kebutuhan cutting dan engraving', 'Panjang jalur serta jumlah detail kecil', 'Jumlah komponen dan proses assembly', 'Polishing, bending, lem, atau aksesori'],
    qualityChecks: ['Film dan permukaan diperiksa dari goresan', 'Dimensi sambungan diuji', 'Tepi dinilai sesuai target finishing', 'Retak rambut di area sempit diperiksa', 'Komponen transparan dipacking terpisah untuk menghindari gesekan']
  },
  'jasa-laser-cutting-mdf-ai': {
    lead: 'MDF memberikan bidang stabil dan halus untuk dekorasi, model, signage, serta furnitur ringan. Karena berasal dari serat padat, kualitas tepi, bekas panas, ketebalan aktual, dan kebutuhan cat harus dipikirkan sebelum memilih laser atau CNC router.',
    decisions: [
      decision('Laser atau router', 'Laser cocok untuk detail 2D tertentu; router lebih tepat untuk panel tebal, pocket, profil, atau saat bekas gosong harus diminimalkan.'),
      decision('Rencanakan finishing', 'Primer, amplas, cat duco, HPL, atau veneer mengubah kebutuhan tepi serta allowance sambungan.'),
      decision('Jaga kekuatan pola', 'Jembatan terlalu tipis mudah patah saat dilepas, diamplas, diangkut, atau dipasang.')
    ],
    fit: ['Panel dekoratif interior', 'Model, jig, dan template', 'Signage serta display', 'Komponen furnitur ringan'],
    notFit: ['Area eksterior basah tanpa sistem perlindungan', 'Sambungan struktural berat', 'Detail tipis yang tidak kuat saat handling'],
    gallery: [
      image('/images/mdf.webp', 'Lembaran MDF dengan beberapa ketebalan', 'Material', 'Ketebalan aktual perlu diukur sebelum menentukan slot dan sambungan.'),
      image('/images/mdf (2).webp', 'Panel MDF dekoratif berpola', 'Panel interior', 'Kepadatan pola harus menjaga kekuatan panel selama finishing dan pemasangan.'),
      image('/images/mdf (3).webp', 'Cermin dekoratif dengan bingkai MDF hasil cutting', 'Aplikasi', 'MDF dapat menjadi dasar produk dekorasi setelah sanding dan finishing.')
    ],
    priceFactors: ['Ketebalan dan grade MDF', 'Pilihan laser atau CNC router', 'Kepadatan pola dan panjang jalur', 'Jumlah panel serta variasi desain', 'Sanding, primer, cat, atau perakitan'],
    qualityChecks: ['Ketebalan aktual dicocokkan dengan file', 'Bekas panas dan tepi serat diperiksa', 'Jembatan tipis diuji saat handling', 'Panel tidak melengkung sebelum packing', 'Urutan panel dan arah pemasangan diberi tanda']
  },
  'jasa-laser-cutting-plywood': {
    lead: 'Plywood menawarkan tampilan serat alami dan kekuatan berlapis, tetapi setiap lembar dapat memiliki void, lem, serta arah serat yang berbeda. Karena itu hasil potong tidak boleh dinilai hanya dari desain digital.',
    decisions: [
      decision('Kenali jenis plywood', 'Multiplex, birch, sengon, dan plywood dekoratif memiliki lapisan serta kualitas inti berbeda.'),
      decision('Pilih muka yang tampil', 'Arah serat, veneer, bercak, dan sisi depan perlu ditandai sebelum nesting.'),
      decision('Antisipasi void dan lem', 'Rongga internal atau variasi perekat dapat memengaruhi warna tepi dan konsistensi cutting.')
    ],
    fit: ['Dekorasi dengan serat alami', 'Furniture dan panel interior', 'Kemasan premium dan merchandise', 'Model, template, serta signage'],
    notFit: ['Detail sangat kecil pada plywood berinti kasar', 'Eksterior tanpa grade dan finishing sesuai', 'Sambungan presisi tanpa mengukur ketebalan lembar aktual'],
    gallery: [
      image('/images/Ply Wood.webp', 'Tumpukan lembaran plywood dengan lapisan terlihat', 'Material', 'Jumlah lapisan dan kualitas inti memengaruhi tepi serta kekuatan.'),
      image('/images/plywood (2).webp', 'Produk undangan atau kemasan dari plywood', 'Produk', 'Serat alami memberi karakter yang berbeda pada setiap unit.'),
      image('/images/plywood (3).webp', 'Panel plywood dekoratif berpola geometris', 'Panel interior', 'Arah serat dan jarak antarcut menentukan tampilan serta stabilitas.')
    ],
    priceFactors: ['Jenis dan kualitas plywood', 'Ketebalan serta ukuran lembar', 'Panjang jalur dan tingkat detail', 'Seleksi muka serta arah serat', 'Sanding, coating, atau assembly'],
    qualityChecks: ['Muka yang tampil dijaga orientasinya', 'Tepi dan area void diperiksa', 'Bekas asap dibersihkan sesuai scope', 'Slot diuji terhadap ketebalan aktual', 'Komponen kecil dihitung dan dipisahkan']
  },
  'jasa-laser-cutting-metal': {
    lead: 'Halaman ini membantu memilih rute untuk stainless, mild steel, atau aluminium—bukan menganggap semua metal identik. Fungsi komponen, grade, ketebalan, finishing, serta proses setelah cutting menentukan keputusan mesin dan kriteria QC.',
    decisions: [
      decision('Fungsi lebih dulu daripada nama bahan', 'Panel dekoratif, bracket, cover, dan komponen las memiliki risiko serta ukuran kritis yang berbeda.'),
      decision('Pisahkan ukuran bahan dan ukuran jadi', 'Bending, welding, coating, dan assembly dapat mengubah allowance yang dibutuhkan pada file cutting.'),
      decision('Tentukan sisi kosmetik', 'Permukaan hairline, mirror, coating, atau protective film perlu diberi orientasi dan perlindungan.')
    ],
    fit: ['Komponen industri lembaran', 'Panel arsitektur dan interior', 'Signage serta huruf metal', 'Bracket, cover, dan enclosure'],
    notFit: ['Komponen 3D yang membutuhkan machining', 'Material tanpa identitas grade untuk kebutuhan kritis', 'Desain final yang belum memperhitungkan bending atau welding'],
    gallery: [
      image('/images/metal.webp', 'Lembaran metal stainless dan aluminium', 'Pilihan metal', 'Grade, ketebalan, dan kondisi permukaan perlu dinyatakan pada brief.'),
      image('/images/stainlesssteel (2).webp', 'Panel stainless berpola setelah laser cutting', 'Panel metal', 'Kepadatan pola dan bidang sisa memengaruhi deformasi serta proses pemasangan.'),
      image('/images/furnituremetal.webp', 'Pemotongan lembaran metal pada meja laser', 'Produksi', 'Nesting dan penandaan part membantu alur proses berikutnya.')
    ],
    priceFactors: ['Jenis, grade, dan ketebalan metal', 'Ukuran part serta kebutuhan nesting', 'Jumlah pierce dan panjang jalur', 'Jumlah unit serta variasi file', 'Deburring, bending, welding, dan finishing'],
    qualityChecks: ['Grade dan ketebalan material diverifikasi', 'Dimensi kritis ditandai pada drawing', 'Dross, burr, dan kondisi tepi diperiksa', 'Permukaan kosmetik dilindungi', 'Part diberi identitas bila masuk proses lanjutan']
  },
  'jasa-laser-cutting-acp': {
    lead: 'ACP adalah panel berlapis yang ringan untuk signage, interior, dan fasad. Cutting, V-groove, bending, arah coating, serta sistem rangka harus dibaca sebagai satu paket agar panel tidak hanya bagus saat datar, tetapi juga rapi setelah dibentuk dan dipasang.',
    decisions: [
      decision('Tentukan sisi coating', 'Warna, protective film, arah serat, serta sisi yang tampil perlu ditandai sebelum toolpath dibuat.'),
      decision('Bedakan cut dan V-groove', 'Kedalaman groove menentukan apakah panel dapat ditekuk tanpa menembus lapisan muka.'),
      decision('Koordinasikan modul dan rangka', 'Ukuran sambungan, nat, lipatan, serta titik fixing harus mengikuti kondisi pemasangan.')
    ],
    fit: ['Fasad dan secondary skin', 'Signage dan cladding', 'Panel interior serta backdrop', 'Bentuk lipatan dan modul custom'],
    notFit: ['Panel struktural tanpa rangka', 'Desain lipatan tanpa detail groove', 'Pemasangan eksterior tanpa spesifikasi coating dan konstruksi'],
    gallery: [
      image('/images/acp.webp', 'Lembaran ACP dengan beberapa warna coating', 'Material', 'Jenis coating dan arah permukaan dipilih berdasarkan area penggunaan.'),
      image('/images/acppro (1).webp', 'Fasad bangunan menggunakan panel ACP berpola', 'Fasad', 'Modul, rangka, dan pola perlu dirancang bersama agar sambungan tetap rapi.'),
      image('/images/acppro (3).webp', 'Detail panel ACP berlubang organik', 'Detail panel', 'Sisa material di antara pola harus cukup kuat untuk handling dan pemasangan.')
    ],
    priceFactors: ['Merek, coating, dan ketebalan ACP', 'Luas panel dan utilisasi lembar', 'Cut-through, V-groove, serta jumlah toolpath', 'Jumlah modul dan variasi ukuran', 'Bending, rangka, finishing, atau pemasangan'],
    qualityChecks: ['Arah coating dan sisi tampil diverifikasi', 'Kedalaman groove diperiksa', 'Dimensi modul serta lipatan diuji', 'Tepi dan protective film dijaga', 'Nomor panel disesuaikan dengan layout pemasangan']
  },
  'jasa-laser-cutting-acp-2': {
    lead: 'Untuk fasad dan signage, keputusan ACP tidak berhenti pada motif. Skala baca, jarak pandang, rangka, modul, pencahayaan, lipatan, serta akses pemasangan menentukan apakah desain terlihat profesional setelah berada di bangunan.',
    decisions: [
      decision('Uji pola pada skala bangunan', 'Motif yang menarik di layar dapat menjadi terlalu rapat atau hilang ketika dilihat dari jalan.'),
      decision('Bagi modul secara sadar', 'Ukuran lembar, nat, akses lifting, dan rangka menentukan pembagian panel serta posisi sambungan.'),
      decision('Rancang cahaya dan bayangan', 'Rasio bukaan memengaruhi privasi, pencahayaan, dan karakter visual pada siang maupun malam.')
    ],
    fit: ['Secondary skin bangunan', 'Signage dan pylon', 'Kanopi serta panel dekoratif', 'Backdrop dan feature wall'],
    notFit: ['Fasad tanpa gambar ukuran lapangan', 'Panel lebar tanpa review rangka', 'Motif yang mengabaikan jarak tepi dan titik fixing'],
    gallery: [
      image('/images/acppro (2).webp', 'Fasad ACP berlubang pada bangunan', 'Konteks bangunan', 'Pola dan modul harus dibaca bersama garis arsitektur.'),
      image('/images/acppro (4).webp', 'Kanopi atau shelter dengan panel ACP dekoratif', 'Aplikasi eksterior', 'Bidang horizontal dan area luar ruang memerlukan detail fixing serta coating yang tepat.'),
      image('/gambar/pagar-laser-cutting-landing/fasad-gedung-laser-cutting.webp', 'Fasad gedung dengan panel berpola', 'Skala fasad', 'Jarak pandang mengubah seberapa padat pola terasa pada bangunan.')
    ],
    priceFactors: ['Luas fasad dan jumlah modul', 'Jenis ACP serta coating', 'Kepadatan motif dan toolpath', 'V-groove, bending, serta numbering', 'Rangka, akses, pengiriman, dan pemasangan'],
    qualityChecks: ['Ukuran lapangan dan layout modul dicocokkan', 'Jarak pola dari tepi serta fixing diperiksa', 'Arah coating konsisten', 'Nomor panel mengikuti gambar pemasangan', 'Contoh modul digunakan bila keputusan visual masih berisiko']
  },
  'jasa-laser-cutting-pvc': {
    lead: 'PVC board diproses menggunakan CNC router, bukan laser. Pendekatan ini menghindari risiko gas korosif sekaligus memungkinkan cutting, pocket, profiling, dan engraving mekanis untuk signage, display, model, serta panel interior.',
    decisions: [
      decision('Gunakan proses yang aman', 'PVC tidak ditempatkan pada mesin laser. Router, tool, dan dust extraction dipilih sesuai jenis board.'),
      decision('Perhatikan kekakuan panel', 'Ketebalan, ukuran bidang, dan kepadatan pola menentukan kebutuhan rangka atau backing.'),
      decision('Rencanakan tepi dan cat', 'Bekas tool, sanding, primer, serta jenis coating perlu masuk ke scope sejak awal.')
    ],
    fit: ['Signage dan display ringan', 'Panel dekoratif interior', 'Model serta prototipe', 'Huruf dan bentuk custom'],
    notFit: ['Pemrosesan menggunakan laser', 'Aplikasi struktur berat', 'Eksterior tanpa material dan finishing yang sesuai'],
    gallery: [
      image('/images/pvc.webp', 'Lembaran PVC board putih dengan beberapa ketebalan', 'Material', 'Ketebalan menentukan kekakuan, berat, dan strategi routing.'),
      image('/images/pcvboard (1).webp', 'Panel PVC board berpola hasil CNC router', 'Panel dekoratif', 'Jembatan pola dijaga agar panel tetap stabil saat dipindahkan.'),
      image('/images/pcvboard (3).webp', 'Komponen dekoratif PVC board setelah routing', 'Produksi komponen', 'Komponen kecil perlu dipisahkan, dihitung, dan dilindungi saat packing.')
    ],
    priceFactors: ['Ketebalan dan densitas PVC board', 'Ukuran panel serta jumlah lembar', 'Jumlah toolpath dan kedalaman', 'Kepadatan pola atau jumlah komponen', 'Sanding, primer, cat, dan assembly'],
    qualityChecks: ['Material dipastikan tidak masuk proses laser', 'Kedalaman dan tepi routing diperiksa', 'Burr serta debu dibersihkan sesuai scope', 'Panel tipis diperiksa dari deformasi', 'Jumlah komponen diverifikasi']
  },
  'jasa-laser-cutting-grc': {
    lead: 'GRC dipilih untuk panel dan ornamen bangunan ketika dibutuhkan karakter mineral, ketahanan luar ruang, atau tampilan masif. Karena material abrasif dan relatif rapuh, radius, kepadatan pola, support, tool, serta cara handling harus direncanakan.',
    decisions: [
      decision('Jaga jarak antarcut', 'Sisa material terlalu tipis berisiko retak saat routing, lifting, pengiriman, atau fixing.'),
      decision('Koordinasikan rangka', 'Ukuran panel, berat, sambungan, dan titik fixing harus selaras dengan subframe bangunan.'),
      decision('Rencanakan debu dan tepi', 'Routing GRC menghasilkan debu abrasif serta tepi yang mungkin memerlukan cleaning atau finishing.')
    ],
    fit: ['Fasad dan secondary skin', 'Panel mihrab dan ornamen', 'Screen eksterior', 'Feature wall serta panel bangunan'],
    notFit: ['Detail sangat tipis tanpa sampel', 'Panel besar tanpa rencana rangka dan lifting', 'Pemasangan tanpa titik fixing yang terukur'],
    gallery: [
      image('/images/grc.webp', 'Lembaran GRC dengan beberapa ketebalan', 'Material', 'Jenis dan ketebalan panel dipilih mengikuti ukuran serta lokasi pemasangan.'),
      image('/images/grcpro (2).webp', 'Panel GRC dekoratif dengan pola organik', 'Panel ornamen', 'Ketebalan jembatan pola memengaruhi kekuatan selama handling.'),
      image('/images/grcpro (4).webp', 'Panel GRC berpola saat proses produksi', 'Produksi panel', 'Nomor panel dan titik support penting untuk proyek modular.')
    ],
    priceFactors: ['Jenis dan ketebalan GRC', 'Ukuran serta jumlah panel', 'Kepadatan pola dan panjang routing', 'Keausan tool serta waktu proses', 'Rangka, finishing, pengiriman, dan pemasangan'],
    qualityChecks: ['Retak rambut serta chipping diperiksa', 'Jarak pola dan area fixing ditinjau', 'Ukuran modul dicocokkan dengan layout', 'Tepi dibersihkan sesuai scope', 'Metode packing mendukung panel pada titik aman']
  },
  'jasa-laser-cutting-plat-besi': {
    lead: 'Plat besi banyak digunakan untuk bracket, cover, base plate, panel, dan ornamen. Agar part dapat langsung melanjutkan ke bending atau welding, file perlu memisahkan ukuran cutting, allowance, lubang, slot, dan identitas setiap komponen.',
    decisions: [
      decision('Tentukan jenis plat', 'Mild steel, galvanis, dan material berlapis memiliki respons serta proses lanjutan berbeda.'),
      decision('Siapkan bending allowance', 'Ukuran bentangan tidak selalu sama dengan ukuran jadi. Radius, K-factor, dan arah bending perlu dikunci.'),
      decision('Identifikasi setiap part', 'Batch dengan bentuk mirip membutuhkan numbering agar tidak tertukar setelah keluar dari meja mesin.')
    ],
    fit: ['Bracket, flange, dan base plate', 'Cover mesin dan enclosure', 'Panel serta ornamen besi', 'Komponen yang dilanjutkan welding atau bending'],
    notFit: ['Part tiga dimensi tanpa drawing bentangan', 'Lubang presisi machining tanpa allowance', 'Material berlapis tanpa evaluasi keselamatan proses'],
    gallery: [
      image('/images/metal.webp', 'Lembaran plat besi dan metal', 'Material', 'Ketebalan serta kondisi permukaan dicatat sebelum nesting.'),
      image('/images/stainlesssteel (4).webp', 'Pola panel metal pada lembaran hasil cutting', 'Hasil potong', 'Part dan skeleton perlu dipisahkan dengan aman setelah proses.'),
      image('/images/furnituremetal.webp', 'Lembaran plat pada meja laser cutting', 'Produksi', 'Nesting memperhitungkan arah, jarak part, dan stabilitas saat cutting.')
    ],
    priceFactors: ['Jenis serta ketebalan plat', 'Dimensi dan berat material', 'Jumlah pierce serta panjang jalur', 'Jumlah part dan kebutuhan marking', 'Deburring, bending, welding, serta finishing'],
    qualityChecks: ['Jumlah dan identitas part diperiksa', 'Lubang serta slot penting diukur', 'Dross dan burr dievaluasi', 'Arah bending dicocokkan dengan drawing', 'Part dipacking menurut tahap proses selanjutnya']
  },
  'harga-laser-cutting-metal': {
    lead: 'Harga laser cutting metal tidak dapat dihitung jujur hanya dari luas persegi. Dua part dengan luas sama dapat memiliki jumlah pierce, panjang jalur, nesting, grade bahan, dan waktu finishing yang sangat berbeda.',
    decisions: [
      decision('Gunakan file untuk estimasi', 'DXF atau DWG memungkinkan panjang jalur, jumlah kontur, dan utilisasi material dihitung lebih relevan.'),
      decision('Pisahkan material dan jasa', 'Nyatakan apakah material disediakan pelanggan atau termasuk penawaran agar pembanding harga tidak keliru.'),
      decision('Tulis scope setelah cutting', 'Deburring, bending, welding, coating, packing, dan delivery perlu dipisahkan dari jasa mesin.')
    ],
    fit: ['Penyusunan budget proyek metal', 'Perbandingan opsi material dan ketebalan', 'Produksi batch berbasis file', 'Estimasi cutting plus proses lanjutan'],
    notFit: ['Permintaan harga final tanpa ukuran atau file', 'Perbandingan vendor dengan scope berbeda', 'Target toleransi tanpa drawing dan metode ukur'],
    gallery: [
      image('/images/generated/fiber-laser-v6.webp', 'Laser fiber memotong lembaran metal di workshop', 'Sumber biaya proses', 'Waktu mesin dipengaruhi geometri, pierce, material, dan parameter.'),
      image('/images/metal.webp', 'Pilihan lembaran metal dengan beberapa finishing', 'Sumber biaya bahan', 'Grade, ketebalan, ukuran lembar, dan kondisi permukaan memengaruhi harga.'),
      image('/images/stainlesssteel (2).webp', 'Panel metal dengan pola padat hasil laser cutting', 'Sumber biaya desain', 'Pola padat biasanya meningkatkan panjang jalur serta jumlah pierce.')
    ],
    priceFactors: ['Harga serta utilisasi lembar metal', 'Panjang jalur dan jumlah pierce', 'Setup, jumlah desain, dan quantity', 'Target kualitas tepi serta deburring', 'Bending, welding, finishing, packing, dan delivery'],
    qualityChecks: ['Quotation menyebut material serta ketebalan', 'Quantity dan revisi file dikunci', 'Scope jasa mesin dan proses lanjutan dipisahkan', 'Kriteria penerimaan ditulis untuk dimensi kritis', 'Lead time dikonfirmasi setelah seluruh input lengkap']
  },
  'laser-stainless-bintaro': {
    lead: 'Layanan stainless dari workshop Tangerang Selatan melayani kebutuhan Bintaro dan area sekitarnya untuk panel, signage, railing, serta komponen lembaran. Kedekatan lokasi membantu koordinasi, tetapi kualitas tetap ditentukan oleh brief dan drawing yang jelas.',
    decisions: [
      decision('Tentukan grade stainless', 'SS 201, 304, atau grade lain dipilih berdasarkan lingkungan, tampilan, dan anggaran.'),
      decision('Jaga permukaan dekoratif', 'Hairline, mirror, atau protective film membutuhkan orientasi dan handling yang berbeda.'),
      decision('Koordinasikan pengambilan', 'Ukuran panel, berat, kendaraan, packing, serta jadwal pickup perlu dibicarakan sebelum selesai.')
    ],
    fit: ['Signage dan huruf stainless', 'Panel interior serta eksterior', 'Railing dan partisi', 'Komponen pesanan area Bintaro'],
    notFit: ['Pemilihan grade hanya berdasarkan warna', 'Panel lebar tanpa rencana rangka', 'Pekerjaan kritis tanpa drawing dimensi'],
    gallery: [
      image('/images/stainlesssteel (3).webp', 'Panel stainless berpola hasil laser cutting', 'Panel custom', 'Motif, tepi, dan permukaan harus bertahan hingga tahap pemasangan.'),
      image('/images/stainlesssteel (1).webp', 'Railing atau panel dekoratif stainless', 'Aplikasi arsitektur', 'Grade dan finishing dipilih mengikuti lingkungan penggunaan.'),
      image('/gambar/railing-laser-cutting-landing/reling-tangga-daylight.webp', 'Railing tangga berpola di interior', 'Hasil terpasang', 'Keputusan pola dan struktur baru terlihat utuh setelah panel berada di ruang.')
    ],
    priceFactors: ['Grade serta ketebalan stainless', 'Finishing permukaan', 'Panjang jalur dan jumlah detail', 'Bending, welding, serta rangka', 'Packing, pickup, atau pengiriman'],
    qualityChecks: ['Grade dan sisi finishing diverifikasi', 'Protective film dijaga selama proses', 'Dimensi sambungan diperiksa', 'Tepi serta area las dievaluasi sesuai scope', 'Packing melindungi sisi kosmetik']
  },
  'harga-huruf-timbul-stainless': {
    lead: 'Harga huruf timbul stainless dibentuk oleh tinggi huruf, jenis font, kedalaman badan, finishing muka, sistem lampu, rangka, jumlah karakter, serta kondisi pemasangan. Harga per sentimeter saja sering menyembunyikan perbedaan scope.',
    decisions: [
      decision('Tentukan sistem huruf', 'Muka stainless, kombinasi akrilik, backlit, frontlit, atau tanpa lampu membutuhkan konstruksi berbeda.'),
      decision('Uji font dan ukuran', 'Stroke tipis, counter kecil, dan sudut tajam dapat menyulitkan bending serta pemasangan LED.'),
      decision('Baca kondisi lokasi', 'Ketinggian, sumber listrik, bidang dinding, akses kerja, dan template pemasangan memengaruhi biaya.')
    ],
    fit: ['Nama usaha dan identitas fasad', 'Lobby hotel, kantor, dan ritel', 'Logo stainless dengan atau tanpa LED', 'Signage interior serta eksterior'],
    notFit: ['Estimasi berdasarkan panjang teks saja', 'Font final yang belum diubah menjadi curve', 'Pemasangan tanpa foto serta ukuran bidang'],
    gallery: [
      image('/images/stainlesssteel (4).webp', 'Lembaran stainless berpola setelah laser cutting', 'Material muka', 'Muka huruf dipotong dari file vektor yang sudah dikunci.'),
      image('/images/singagehote.webp', 'Signage hotel dengan huruf bercahaya', 'Efek pencahayaan', 'Sistem lampu, jarak dari dinding, dan warna cahaya mengubah hasil visual.'),
      image('/images/akrilik (2).webp', 'Papan nomor dan signage kecil', 'Skala baca', 'Ukuran huruf perlu diuji terhadap jarak pandang pengguna.')
    ],
    priceFactors: ['Tinggi, font, serta jumlah karakter', 'Grade dan finishing stainless', 'Kedalaman badan serta metode bending', 'LED, power supply, spacer, dan kabel', 'Rangka, template, akses, serta pemasangan'],
    qualityChecks: ['File logo dan proporsi dikonfirmasi', 'Permukaan stainless diperiksa', 'Badan huruf dan sudut sambungan dirapikan', 'Lampu diuji sebelum pemasangan', 'Template serta posisi fixing dicocokkan dengan bidang']
  },
  'jasa-mihrab-masjid': {
    lead: 'Panel mihrab dan ornamen masjid perlu menghormati skala ruang, arah pandang jamaah, komposisi motif, pencahayaan, material, dan kemudahan perawatan. Ornamen bukan sekadar file pola yang diperbesar.',
    decisions: [
      decision('Mulai dari ukuran ruang', 'Lebar, tinggi, garis kiblat, posisi mimbar, plafond, dan sumber cahaya membentuk proporsi panel.'),
      decision('Pilih motif yang terbaca', 'Kepadatan arabesque atau geometri harus sesuai jarak pandang dan tidak kehilangan detail setelah diproduksi.'),
      decision('Tentukan sistem pemasangan', 'Panel modular, rangka, spacer, akses maintenance, dan finishing perlu dirancang sebelum cutting.')
    ],
    fit: ['Panel mihrab utama', 'Screen dan partisi masjid', 'Ornamen dinding serta plafond', 'Fasad dan elemen dekoratif islami'],
    notFit: ['Motif tanpa hak penggunaan yang jelas', 'Panel besar tanpa pembagian modul', 'Pemasangan tanpa ukuran lapangan dan rencana rangka'],
    gallery: [
      image('/images/grcpro (1).webp', 'Panel ornamen geometris bernuansa islami', 'Komposisi motif', 'Pusat motif, pengulangan, dan border perlu diselaraskan dengan ukuran bidang.'),
      image('/images/plywood (1).webp', 'Panel dekoratif dengan motif radial islami', 'Detail pola', 'Motif radial memerlukan pusat serta margin yang presisi agar tidak terasa miring.'),
      image('/images/grcpro (4).webp', 'Panel ornamen modular dalam proses produksi', 'Modul produksi', 'Pembagian modul mempermudah produksi, pengiriman, dan pemasangan.')
    ],
    priceFactors: ['Dimensi bidang serta jumlah modul', 'Pilihan material dan ketebalan', 'Kepadatan motif serta waktu routing', 'Rangka, finishing, dan pencahayaan', 'Survey, pengiriman, serta pemasangan'],
    qualityChecks: ['Ukuran lapangan dan center line diverifikasi', 'Motif serta border diperiksa simetrinya', 'Panel diberi nomor sesuai layout', 'Sambungan modul diuji visual', 'Finishing dan packing disesuaikan dengan material']
  }
};

export function getCapabilityContent(slug, fallbackImage, title) {
  return CAPABILITY_CONTENT[slug] || {
    lead: `${title} perlu dinilai dari fungsi, material, ukuran, file, jumlah, dan target hasil akhir. Data tersebut membantu tim menentukan proses yang paling relevan sebelum biaya dan jadwal dikunci.`,
    decisions: [
      decision('Fungsi', 'Jelaskan bagaimana komponen digunakan dan bagian mana yang paling kritis.'),
      decision('Spesifikasi', 'Nyatakan material, ketebalan, ukuran, jumlah, serta kondisi permukaan.'),
      decision('Hasil akhir', 'Tentukan apakah kebutuhan berhenti di proses mesin atau mencakup finishing dan pemasangan.')
    ],
    fit: ['Produksi berbasis file', 'Komponen custom', 'Pekerjaan batch', 'Aplikasi arsitektur atau industri'],
    notFit: ['Brief tanpa ukuran', 'Material yang belum teridentifikasi', 'Target hasil tanpa kriteria penerimaan'],
    gallery: [image(fallbackImage, title, 'Kapabilitas', `Visual yang berkaitan dengan ${title}.`)],
    priceFactors: ['Material', 'Ukuran', 'Jumlah', 'Kompleksitas file', 'Finishing'],
    qualityChecks: ['File final', 'Material', 'Dimensi acuan', 'Kondisi tepi', 'Jumlah']
  };
}
