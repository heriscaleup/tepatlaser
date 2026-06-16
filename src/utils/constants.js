// src/utils/constants.js

export const SITE_CONFIG = {
  name: "Jasa Cutting Laser",
  title: "Jasa Laser Cutting Profesional #1 indonesia - Akrilik, Kayu, Metal",
  description: "Laser cutting presisi tinggi & pengerjaan cepat di indonesia! Spesialis akrilik, kayu, metal dengan teknologi terdepan. 10+ tahun pengalaman, hasil akurat, garansi kualitas. Melayani Serang, Tangerang, Cilegon, Pandeglang, Lebak.",
  keywords: "laser cutting indonesia, cnc router serang, laser fiber tangerang, laser co2 cilegon, cutting akrilik pandeglang, potong kayu lebak, laser metal indonesia",
  // HAPUS BARIS INI: url: "https://ddos-spec.github.io/",
  author: "Jasa Cutting Laser Team",
  whatsapp: "6282121292937",
  email: "info@tepatlaser.com",
  address: "Jl. Bintaro Bsd no 1D parigi ( samping Sekolah SD Mentari Internasional School ), Tangerang Selatan, Banten, Indonesia",
  phone: "+62 821-2129-2937",
  businessHours: "Senin - Sabtu: 08.00 - 17.00 WIB",
  socialMedia: {
    facebook: "https://www.facebook.com/profile.php?id=100054220779104",
    instagram: "https://www.instagram.com/jasalasercutting.tangsel/",
    youtube: "https://www.youtube.com/@heriasari4189",
    linkedin: "#"
  }
};

export const NAVIGATION = [
  { name: 'Beranda', href: '/', active: false },
  { name: 'Tentang Kami', href: '/about/', active: false },
  { 
    name: 'Jasa',
    href: '#',
    active: false,
    submenu: [
      { name: 'Laser CO2', href: '/jasa-laser-co2/' },
      { name: 'Laser Fiber', href: '/jasa-laser-fiber/' },
      { name: 'CNC Router', href: '/jasa-cnc-router/' },
      { name: 'Galvo Engraving', href: '/jasa-galvo-engraving/' }
    ]
  },
  { 
    name: 'Material', 
    href: '#',
    submenu: [
      { name: 'Akrilik', href: '/laser-cutting-akrilik/' },
      { name: 'MDF', href: '/jasa-laser-cutting-mdf-ai/' },
      { name: 'Plywood/Multiplex', href: '/jasa-laser-cutting-plywood/' },
      { name: 'Metal (Stainless, Aluminium)', href: '/jasa-laser-cutting-metal/' },
      { name: 'Laser Cutting Stainless', href: '/laser-stainless-bintaro/' },
      { name: 'ACP', href: '/jasa-laser-cutting-acp/' },
      { name: 'PVC BOARD', href: '/jasa-laser-cutting-pvc/' },
      { name: 'GRC', href: '/jasa-laser-cutting-grc/' }
    ]
  },
  { name: 'Portfolio', href: '/portfolio/', active: false },
  { name: 'Blog', href: '/blog/', active: false }
];

export const SERVICES = [
  {
    id: "laser-co2",
    name: "Laser CO2",
    slug: "jasa-laser-co2",
    description: "Cutting presisi tinggi untuk material non-metal seperti akrilik, kayu, MDF, kertas, kain, dan karet",
    features: [
      "Ketebalan material hingga 20mm",
      "Presisi hingga 0.1mm",
      "Finishing halus dan clean",
      "Ideal untuk signage, dekorasi, prototyping"
    ],
    applications: ["Signage", "Dekorasi", "Prototyping", "Kemasan"],
    image: "/images/co2.webp",
    keywords: "jasa laser co2 indonesia, cutting akrilik serang, laser kayu tangerang, potong mdf cilegon, laser cutting pandeglang, cutting kain lebak, laser karet indonesia"
  },
  {
    id: "laser-fiber",
    name: "Laser Fiber",
    slug: "jasa-laser-fiber",
    description: "Solusi cutting & marking presisi untuk material metal seperti stainless steel, aluminium, besi, dan tembaga",
    features: [
      "Marking permanen & tahan lama",
      "Cutting metal hingga 10mm",
      "Kecepatan tinggi dan efisiensi biaya",
      "Tidak memerlukan bahan kimia berbahaya"
    ],
    applications: ["Industri", "Automotif", "Elektronik", "Branding"],
    image: "/images/laserfiber.webp",
    keywords: "jasa laser fiber indonesia, cutting stainless serang, laser alumunium tangerang, potong besi cilegon, laser cutting metal pandeglang, marking tembaga lebak"
  },
  {
    id: "cnc-router",
    name: "CNC Router",
    slug: "jasa-cnc-router",
    description: "Pengerjaan kompleks untuk material keras seperti ACP, GRC, kayu keras, dan plastik tebal",
    features: [
      "3D carving dan profiling",
      "Kemampuan memotong material tebal",
      "Repeatability tinggi untuk produksi massal",
      "Finishing presisi untuk detail rumit"
    ],
    applications: ["Fasad", "Furniture", "Moulding", "Signage"],
    image: "/images/cncrouter.webp",
    keywords: "jasa cnc router indonesia, cutting acp serang, laser grc tangerang, potong kayu cilegon, cnc router pandeglang, carving akrilik lebak"
  },
  {
    id: "galvo-engraving",
    name: "Galvo Engraving",
    slug: "jasa-galvo-engraving",
    description: "Engraving kecepatan tinggi untuk personalisasi dan branding produk pada berbagai material",
    features: [
      "Kecepatan engraving hingga 10x lebih cepat",
      "Resolusi tinggi untuk detail kompleks",
      "Personalisasi batch dalam waktu singkat",
      "Ideal untuk serial number, logo, QR code"
    ],
    applications: ["Branding", "Personalisasi", "Traceability", "Promosi"],
    image: "/images/galvo.webp",
    keywords: "jasa galvo engraving indonesia, laser engraving serang, engrave tangerang, potong engraving cilegon, laser engrave pandeglang, branding produk lebak"
  }
];

export const MATERIALS = [
  {
    id: "acrylic",
    name: "Akrilik",
    slug: "laser-cutting-akrilik",
    description: "Material transparan berkualitas tinggi untuk berbagai aplikasi signage dan dekorasi",
    thickness: "1mm - 20mm",
    applications: ["Signage", "Display", "Dekorasi", "Prototyping"],
    image: "/images/Acrylic.webp",
    keywords: "potong akrilik indonesia, cutting acrylic serang, laser acrylic tangerang, potong acrylic cilegon, cutting acrylic pandeglang"
  },
  {
    id: "mdf",
    name: "MDF",
    slug: "jasa-laser-cutting-mdf-ai",
    description: "Kayu engineered dengan permukaan halus, ideal untuk painting dan aplikasi dekoratif",
    thickness: "3mm - 25mm",
    applications: ["Furniture", "Dekorasi", "Craft", "Model"],
    image: "/images/mdf.webp",
    keywords: "potong mdf indonesia, laser cutting mdf serang, cutting mdf tangerang, potong mdf cilegon, laser mdf pandeglang"
  },
  {
    id: "ply-wood-multiplex",
    name: "Plywood/Multiplex",
    slug: "jasa-laser-cutting-plywood",
    description: "Kayu lapis berkualitas untuk kekuatan struktural dan tampilan alami yang menarik",
    thickness: "3mm - 25mm",
    applications: ["Furniture", "Dekorasi", "Kerajinan", "Interior"],
    image: "/images/Ply Wood.webp",
    keywords: "potong plywood indonesia, laser kayu serang, cutting multiplex tangerang, potong kayu cilegon, laser plywood pandeglang"
  },
  {
    id: "metal",
    name: "Metal (Stainless, Aluminium)",
    slug: "jasa-laser-cutting-metal",
    description: "Laser cutting metal presisi tinggi untuk stainless steel (SS201/SS304/SS316), aluminium, dan plat besi. Toleransi ±0.02mm, ketebalan 0.5–10mm, pengerjaan 1–3 hari kerja.",
    thickness: "0.5mm - 10mm",
    applications: ["Industri", "Arsitektur", "Automotif", "Branding"],
    image: "/images/metal.webp",
    keywords: "jasa laser cutting metal, laser cutting stainless jakarta, harga laser cutting plat besi, laser cutting metal tangerang, potong stainless ss304"
  },
  {
    id: "acp",
    name: "ACP (Aluminium Composite Panel)",
    slug: "jasa-laser-cutting-acp",
    description: "Panel komposit ringan namun kuat untuk aplikasi fasad dan signage premium",
    thickness: "2mm - 6mm",
    applications: ["Signage", "Fasad", "Interior", "Eksterior"],
    image: "/images/acp.webp",
    keywords: "potong acp aluminium indonesia, cutting acp serang, acp laser tangerang, potong acp cilegon, cutting acp pandeglang"
  },
  {
    id: "pvc",
    name: "PVC BOARD",
    slug: "jasa-laser-cutting-pvc",
    description: "Cutting PVC custom untuk berbagai keperluan industri dan kreatif",
    thickness: "1mm - 10mm",
    applications: ["Signage", "Prototype", "Display", "Packaging"],
    image: "/images/pvc.webp",
    keywords: "potong pvc indonesia, cutting pvc serang, laser pvc tangerang, potong pvc cilegon, cutting pvc pandeglang"
  },
  {
    id: "grc",
    name: "GRC",
    slug: "jasa-laser-cutting-grc",
    description: "Cutting GRC (Glassfibre Reinforced Concrete) untuk fasad dan ornamen bangunan",
    thickness: "8mm - 15mm",
    applications: ["Fasad", "Ornamen", "Panel", "Eksterior"],
    image: "/images/grc.webp",
    keywords: "potong grc indonesia, grc laser cutting serang, fasad grc tangerang, cutting grc cilegon, laser grc pandeglang"
  }
];

// Data portfolio yang dipindahkan dari portfolio.astro
export const PORTFOLIO_PROJECTS = [
  {
    id: 1,
    title: "Cutting Plat Besi Custom",
    category: "Laser Fiber",
    image: "/images/metal.webp",
    description: "Pemotongan plat besi dengan presisi tinggi untuk komponen industri",
    client: "PT. Industri Manufaktur",
    material: "Plat Besi 5mm",
    technique: "Laser Fiber Cutting",
    gallery: [
      "/images/metal.webp",
      "/images/metal.webp",
      "/images/metal.webp"
    ],
    detailDescription: "Proyek pemotongan plat besi custom dengan ketebalan 5mm menggunakan teknologi laser fiber. Hasil potongan sangat presisi dengan toleransi ±0.1mm, cocok untuk komponen industri yang membutuhkan akurasi tinggi."
  },
  {
    id: 2,
    title: "Engraving Logo Perusahaan",
    category: "Galvo Engraving",
    image: "/images/engraving.webp",
    description: "Engraving logo perusahaan pada berbagai material dengan detail tinggi",
    client: "CV. Karya Mandiri",
    material: "Stainless Steel",
    technique: "Galvo Laser Engraving",
    gallery: [
      "/images/engraving.webp",
      "/images/engraving.webp",
      "/images/engraving.webp"
    ],
    detailDescription: "Engraving logo perusahaan dengan teknologi galvo laser pada material stainless steel. Hasil engraving sangat detail dan tahan lama, cocok untuk branding perusahaan yang berkualitas tinggi."
  },
  {
    id: 3,
    title: "Cutting Akrilik Dekoratif",
    category: "Laser CO2",
    image: "/images/Acrylic.webp",
    description: "Pemotongan akrilik untuk keperluan dekorasi interior dengan desain custom",
    client: "Interior Design Studio",
    material: "Akrilik 8mm",
    technique: "CO2 Laser Cutting",
    gallery: [
      "/tepatlaser/images/Acrylic.webp",
      "/tepatlaser/images/Acrylic.webp",
      "/tepatlaser/images/Acrylic.webp"
    ],
    detailDescription: "Pemotongan akrilik dekoratif dengan ketebalan 8mm menggunakan laser CO2. Menghasilkan potongan yang halus dan bersih tanpa crack, sempurna untuk aplikasi dekorasi interior yang elegan."
  },
  {
    id: 4,
    title: "CNC Router Kayu Jati",
    category: "CNC Router",
    image: "/images/mdf.webp",
    description: "Pengerjaan kayu jati dengan CNC router untuk furniture custom",
    client: "Furniture Artisan",
    material: "Kayu Jati Solid",
    technique: "CNC Router Machining",
    gallery: [
      "/tepatlaser/images/mdf.webp",
      "/tepatlaser/images/mdf.webp",
      "/tepatlaser/images/mdf.webp"
    ],
    detailDescription: "Pengerjaan kayu jati solid menggunakan CNC router dengan presisi tinggi. Menghasilkan detail ukiran dan bentuk yang kompleks sesuai desain custom untuk furniture berkualitas premium."
  },
  {
    id: 5,
    title: "Cutting Plat Aluminium",
    category: "Laser Fiber",
    image: "/images/furnituremetal.webp",
    description: "Pemotongan plat aluminium untuk komponen otomotif",
    client: "PT. Otomotif Nusantara",
    material: "Aluminium 3mm",
    technique: "Fiber Laser Cutting",
    gallery: [
      "/tepatlaser/images/furnituremetal.webp",
      "/tepatlaser/images/furnituremetal.webp",
      "/tepatlaser/images/furnituremetal.webp"
    ],
    detailDescription: "Pemotongan plat aluminium dengan ketebalan 3mm untuk komponen otomotif. Menggunakan laser fiber yang menghasilkan potongan bersih tanpa burr dan presisi tinggi sesuai standar industri otomotif."
  },
  {
    id: 6,
    title: "Engraving Kayu Mahoni",
    category: "Laser CO2",
    image: "/images/singagehote.webp",
    description: "Engraving detail pada kayu mahoni untuk souvenir eksklusif",
    client: "Souvenir Premium",
    material: "Kayu Mahoni",
    technique: "CO2 Laser Engraving",
    gallery: [
      "/tepatlaser/images/singagehote.webp",
      "/tepatlaser/images/singagehote.webp",
      "/tepatlaser/images/singagehote.webp"
    ],
    detailDescription: "Engraving detail pada kayu mahoni premium menggunakan laser CO2. Menghasilkan detail ukiran yang halus dan artistik, cocok untuk souvenir eksklusif dan produk kerajinan berkualitas tinggi."
  }
];

export const TESTIMONIALS = [
  {
    id: 1,
    name: "Budi Santoso",
    company: "PT. Kreatif Nusantara Serang",
    position: "Project Manager",
    content: "Kualitas laser cutting terbaik yang pernah kami gunakan di indonesia. Presisi tinggi dan hasil sempurna untuk semua project signage kami.",
    rating: 5,
    image: "/images/budisantoso.webp"
  },
  {
    id: 2,
    name: "Sari Dewi",
    company: "Studio Arsitektur Modern Tangerang",
    position: "Lead Architect",
    content: "Pelayanan profesional dan hasil cutting yang sangat memuaskan. Recommended untuk semua kebutuhan laser cutting di indonesia.",
    rating: 5,
    image: "/images/Sari Dewi.webp"
  },
  {
    id: 3,
    name: "Ahmad Rizki",
    company: "Furniture Mebel Jaya Cilegon",
    position: "Owner",
    content: "Sudah 3 tahun menggunakan jasa Jasa Cutting Laser. Selalu puas dengan kualitas dan ketepatan waktu pengerjaan, pengiriman ke Cilegon juga cepat.",
    rating: 5,
    image: "/images/Ahmad Rizki.webp"
  }
];

export const PORTFOLIO = [
  {
    id: 1,
    title: "Signage Hotel Bintang 5 Serang",
    category: "Commercial",
    material: "ACP Aluminium",
    service: "CNC Router",
    image: "/images/singagehote.webp",
    description: "Pembuatan signage premium untuk hotel bintang 5 di Serang dengan detail presisi tinggi"
  },
  {
    id: 2,
    title: "Furniture Custom Stainless Tangerang",
    category: "Industrial",
    material: "Stainless Steel",
    service: "Laser Fiber",
    image: "/images/furnituremetal.webp",
    description: "Cutting furniture stainless steel custom untuk restaurant modern di Tangerang"
  },
  {
    id: 3,
    title: "Display Acrylic Premium Cilegon",
    category: "Retail",
    material: "Acrylic",
    service: "Laser CO2",
    image: "/images/displyacrylic.webp",
    description: "Display acrylic premium untuk toko retail di Cilegon dengan engraving logo"
  },
  {
    id: 4,
    title: "Prototype Industri Pandeglang",
    category: "Manufacturing",
    material: "PVC",
    service: "CNC Router",
    image: "/images/prototype.webp",
    description: "Prototype komponen industri dengan presisi tinggi menggunakan PVC untuk klien di Pandeglang"
  }
];

export const FAQ = [
  {
    id: 1,
    question: "Berapa lama waktu pengerjaan laser cutting?",
    answer: "Waktu pengerjaan tergantung kompleksitas desain dan jumlah item. Untuk project standar, estimasi pengerjaan adalah 2-5 hari kerja setelah desain disetujui. Untuk project mendesak, kami menyediakan layanan express dengan tambahan biaya."
  },
  {
    id: 2,
    question: "Apakah saya perlu menyediakan file desain?",
    answer: "Ya, file desain sangat diperlukan. Kami menerima file dalam format .AI, .EPS, .SVG, .DXF, .PDF, atau .CDR. Jika Anda tidak memiliki desain, tim kami siap membantu membuatkan desain dasar sesuai kebutuhan Anda dengan biaya tambahan."
  },
  {
    id: 3,
    question: "Material apa saja yang bisa dipotong dengan laser?",
    answer: "Kami menyediakan berbagai pilihan material seperti akrilik, kayu (MDF, Plywood), metal (stainless steel, aluminium), karet, kain, kertas, dan PVC. Untuk informasi lengkap dan ketersediaan material terbaru, silakan hubungi tim kami."
  },
  {
    id: 4,
    question: "Bagaimana kualitas hasil potongan laser?",
    answer: "Kualitas hasil potongan laser kami sangat tinggi dengan presisi hingga 0.1mm. Tepi potongan sangat halus dan clean, minim sisa material. Untuk material tertentu seperti akrilik, hasil potongan bahkan tidak memerlukan finishing tambahan."
  },
  {
    id: 5,
    question: "Apakah menyediakan jasa konsultasi desain?",
    answer: "Tentu, kami menyediakan layanan konsultasi desain gratis untuk membantu Anda memahami kelayakan teknis dan optimalisasi desain sebelum proses produksi dimulai. Untuk jasa pembuatan desain khusus dari nol, terdapat biaya tambahan yang akan diinformasikan oleh tim kami."
  }
];

export const BLOG_POSTS = [
  {
    id: 1,
    title: "Cara Memilih Material yang Tepat untuk Laser Cutting di indonesia",
    slug: "cara-memilih-material-laser-cutting-indonesia",
    excerpt: "Panduan lengkap memilih material yang sesuai untuk project laser cutting Anda di indonesia",
    category: "Tutorial",
    readTime: "5 menit",
    publishDate: "2025-01-15",
    image: "/images/acp.webp",
    keywords: "memilih material laser cutting, panduan material laser, bahan laser cutting indonesia",
    schema: {
      "@context": "https://schema.org",
      "@type": "Article",
      "headline": "Cara Memilih Material yang Tepat untuk Laser Cutting di indonesia",
      "description": "Panduan lengkap memilih material yang sesuai untuk project laser cutting Anda di indonesia",
      "image": "/images/acp.webp",
      "datePublished": "2025-01-15",
      "author": {
        "@type": "Organization",
        "name": "Tepat Laser"
      }
    }
  },
  {
    id: 2,
    title: "Perbedaan Utama Antara Laser CO2 dan Laser Fiber untuk Bisnis Anda",
    slug: "perbedaan-laser-co2-dan-laser-fiber",
    excerpt: "Analisis teknis dan aplikatif antara teknologi laser CO2 dan Fiber untuk kebutuhan bisnis Anda",
    category: "Technical",
    readTime: "7 menit",
    publishDate: "2025-01-10",
    image: "/images/laserfiber.webp",
    keywords: "perbedaan laser co2 fiber, laser co2 vs fiber, teknologi laser cutting",
    schema: {
      "@context": "https://schema.org",
      "@type": "Article",
      "headline": "Perbedaan Utama Antara Laser CO2 dan Laser Fiber untuk Bisnis Anda",
      "description": "Analisis teknis dan aplikatif antara teknologi laser CO2 dan Fiber untuk kebutuhan bisnis Anda",
      "image": "/images/laserfiber.webp",
      "datePublished": "2025-01-10",
      "author": {
        "@type": "Organization",
        "name": "Tepat Laser"
      }
    }
  },
  {
    id: 3,
    title: "Tren Industri Kreatif indonesia 2025: Peluang Laser Cutting",
    slug: "tren-industri-kreatif-indonesia-2025",
    excerpt: "Insight tentang perkembangan industri kreatif di indonesia dan peluang bisnis laser cutting",
    category: "Industry",
    readTime: "6 menit",
    publishDate: "2025-01-05",
    image: "/images/cncrouter.webp",
    keywords: "tren industri kreatif 2025, peluang laser cutting, bisnis laser cutting indonesia",
    schema: {
      "@context": "https://schema.org",
      "@type": "Article",
      "headline": "Tren Industri Kreatif indonesia 2025: Peluang Laser Cutting",
      "description": "Insight tentang perkembangan industri kreatif di indonesia dan peluang bisnis laser cutting",
      "image": "/images/cncrouter.webp",
      "datePublished": "2025-01-05",
      "author": {
        "@type": "Organization",
        "name": "Tepat Laser"
      }
    }
  },
  {
    id: 4,
    title: "5 Kesalahan Umum Saat Memilih Jasa Laser Cutting di indonesia",
    slug: "kesalahan-umum-memilih-jasa-laser-cutting-indonesia",
    excerpt: "Hindari kesalahan fatal yang bisa merugikan project Anda dengan tips dari ahli laser cutting indonesia",
    category: "Tips",
    readTime: "8 menit",
    publishDate: "2025-01-20",
    image: "/images/co2.webp",
    keywords: "kesalahan memilih jasa laser cutting, tips laser cutting, ahli laser cutting indonesia",
    schema: {
      "@context": "https://schema.org",
      "@type": "Article",
      "headline": "5 Kesalahan Umum Saat Memilih Jasa Laser Cutting di indonesia",
      "description": "Hindari kesalahan fatal yang bisa merugikan project Anda dengan tips dari ahli laser cutting indonesia",
      "image": "/images/co2.webp",
      "datePublished": "2025-01-20",
      "author": {
        "@type": "Organization",
        "name": "Tepat Laser"
      }
    }
  },
  {
    id: 5,
    title: "Panduan Lengkap: Cara Menyiapkan File Desain untuk Laser Cutting Akurat",
    slug: "panduan-file-desain-laser-cutting-akurat",
    excerpt: "Tutorial step-by-step menyiapkan file desain yang optimal untuk hasil laser cutting terbaik dan akurat",
    category: "Tutorial",
    readTime: "10 menit",
    publishDate: "2025-01-18",
    image: "/images/engraving.webp",
    keywords: "panduan desain laser cutting, menyiapkan file laser cutting, desain akurat laser",
    schema: {
      "@context": "https://schema.org",
      "@type": "Article",
      "headline": "Panduan Lengkap: Cara Menyiapkan File Desain untuk Laser Cutting Akurat",
      "description": "Tutorial step-by-step menyiapkan file desain yang optimal untuk hasil laser cutting terbaik dan akurat",
      "image": "/images/engraving.webp",
      "datePublished": "2025-01-18",
      "author": {
        "@type": "Organization",
        "name": "Tepat Laser"
      }
    }
  },
  {
    id: 6,
    title: "Analisis Biaya: Apakah Laser Cutting Lebih Efisien daripada Metode Tradisional?",
    slug: "analisis-biaya-laser-cutting-vs-tradisional",
    excerpt: "Breakdown biaya komprehensif membandingkan laser cutting dengan metode konvensional untuk berbagai material",
    category: "Analysis",
    readTime: "9 menit",
    publishDate: "2025-01-08",
    image: "/images/pvc.webp",
    keywords: "analisis biaya laser cutting, efisiensi laser cutting, laser cutting vs tradisional",
    schema: {
      "@context": "https://schema.org",
      "@type": "Article",
      "headline": "Analisis Biaya: Apakah Laser Cutting Lebih Efisien daripada Metode Tradisional?",
      "description": "Breakdown biaya komprehensif membandingkan laser cutting dengan metode konvensional untuk berbagai material",
      "image": "/images/pvc.webp",
      "datePublished": "2025-01-08",
      "author": {
        "@type": "Organization",
        "name": "Tepat Laser"
      }
    }
  },
  {
    id: 7,
    title: "Teknik Laser Engraving Tercepat untuk Personalisasi Massal",
    slug: "teknik-laser-engraving-personalisasi-massal",
    excerpt: "Eksplorasi teknik laser engraving cepat pada berbagai material untuk menciptakan branding produk yang memorable",
    category: "Technical",
    readTime: "12 menit",
    publishDate: "2025-01-14",
    image: "/images/galvo.webp",
    keywords: "teknik laser engraving, personalisasi massal, branding produk laser",
    schema: {
      "@context": "https://schema.org",
      "@type": "Article",
      "headline": "Teknik Laser Engraving Tercepat untuk Personalisasi Massal",
      "description": "Eksplorasi teknik laser engraving cepat pada berbagai material untuk menciptakan branding produk yang memorable",
      "image": "/images/galvo.webp",
      "datePublished": "2025-01-14",
      "author": {
        "@type": "Organization",
        "name": "Tepat Laser"
      }
    }
  },
  {
    id: 8,
    title: "Studi Kasus: Bagaimana CNC Router Mengubah Industri Furniture Custom di indonesia",
    slug: "cnc-router-industri-furniture-custom-indonesia",
    excerpt: "Analisis mendalam bagaimana teknologi CNC Router merevolusi industri furniture custom di indonesia dan sekitarnya",
    category: "Case Study",
    readTime: "11 menit",
    publishDate: "2025-01-12",
    image: "/images/Ply Wood.webp",
    keywords: "cnc router furniture, industri furniture custom, teknologi cnc router",
    schema: {
      "@context": "https://schema.org",
      "@type": "Article",
      "headline": "Studi Kasus: Bagaimana CNC Router Mengubah Industri Furniture Custom di indonesia",
      "description": "Analisis mendalam bagaimana teknologi CNC Router merevolusi industri furniture custom di indonesia dan sekitarnya",
      "image": "/images/Ply Wood.webp",
      "datePublished": "2025-01-12",
      "author": {
        "@type": "Organization",
        "name": "Tepat Laser"
      }
    }
  }
];

// Define color classes for categories
export const CATEGORY_COLORS = {
  'Laser Fiber': 'bg-blue-600',
  'Laser CO2': 'bg-green-600', 
  'CNC Router': 'bg-purple-600',
  'Galvo Engraving': 'bg-orange-600'
};

// Helper function to get proper image paths based on environment
export const getImagePath = (imagePath) => {
  // Remove leading slash if present
  const cleanPath = imagePath.startsWith('/') ? imagePath.slice(1) : imagePath;
  
  // For GitHub Pages deployment
  if (import.meta.env.PROD) {
    return `/${cleanPath}`;
  }
  
  // For local development
  return `/${cleanPath}`;
};

// Helper function to get proper page URLs
export const getPageUrl = (path) => {
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  
  // For GitHub Pages deployment
  if (import.meta.env.PROD) {
    return `/tepatlaser${cleanPath}`;
  }
  
  // For local development
  return cleanPath;
};

export const WHATSAPP_MESSAGES = {
  default: "Halo, saya tertarik dengan jasa laser cutting. Bisa konsultasi gratis?",
  cnc: "Halo, saya butuh informasi tentang jasa CNC Router. Bisa bantu konsultasi gratis?",
  fiber: "Halo, saya ingin tanya tentang laser fiber cutting untuk material metal. Bisa konsultasi gratis?",
  co2: "Halo, saya tertarik dengan laser CO2 untuk cutting acrylic. Bisa konsultasi gratis?",
  engraving: "Halo, saya butuh jasa laser engraving. Bisa konsultasi gratis?",
  quote: "Halo, saya ingin request quote untuk project laser cutting. Bisa konsultasi gratis dulu?",
  stainless: "Halo Tepat Laser, saya tertarik dengan jasa laser cutting stainless. Bisa konsultasi gratis?",
  stainlessIndustri: "Halo Tepat Laser, saya butuh laser cutting stainless untuk kebutuhan industri/produksi. Bisa info harga dan kapasitas?",
  stainlessInterior: "Halo Tepat Laser, saya mau konsultasi laser cutting stainless untuk interior/ornamen/railing. Bisa bantu?",
  stainlessUmkm: "Halo Tepat Laser, saya mau tanya harga laser cutting stainless satuan. Bisa kasih estimasi?"
};