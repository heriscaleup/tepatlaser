import { SITE_CONFIG } from './constants.js';



// TOP PERFORMING KEYWORDS - Based on real data analysis
const TOP_KEYWORDS = {
  primary: [
    'jasa grafir laser',
    'custom acrylic', 
    'jasa ukir laser',
    'laser cut maket',
    'laser cutting kayu',
    'cnc cutting laser'
  ],
  secondary: [
    'laser pvc',
    'grafir laser',
    'mdf laser cutting',
    'laser cutting pvc sheet',
    'cutting pvc',
    'laser cutting jakarta timur',
    'jasa laser cutting kayu',
    'custom akrilik terdekat',
    'cutting acrylic'
  ],
  locationBased: [
    'laser cutting jakarta timur',
    'custom akrilik terdekat',
    'cutting akrilik terdekat',
    'grafir jakarta',
    'laser engraving jakarta',
    'grafir laser bekasi',
    'jasa grafir laser bekasi',
    'jasa grafir laser jakarta',
    'laser cutting kayu jakarta',
    'jasa grafir laser terdekat',
    'jasa potong kayu terdekat',
    'jasa potong akrilik terdekat'
  ],
  services: [
    'jasa laser cutting PVC',
    'jasa cnc router',
    'acp laser cutting',
    'jasa laser cutting acp',
    'jasa laser engraving',
    'jasa cnc kayu',
    'jasa cutting cnc router',
    'jasa cutting akrilik',
    'jasa cnc acp',
    'jasa akrilik custom',
    'engraving laser',
    'jasa potong mdf',
    'jasa grafir',
    'jasa laser cutting akrilik',
    'jasa custom acrylic'
  ],
  materials: [
    'harga laser cutting acp per m2',
    'cetak pvc board',
    'laser cutting pvc',
    'cutting akrilik',
    'laser cutting acp',
    'grc cutting',
    'custom name plate',
    'name plate stainless',
    'cutting laser mdf',
    'cutting triplek',
    'jasa potong triplek',
    'cnc plywood cutting',
    'cutting laser acp',
    'jasa cutting acp',
    'grc custom',
    'custom mdf cutting',
    'cutting laser kayu',
    'cnc wood cutting',
    'cutting grc',
    'laser acp',
    'wall panel grc',
    'pembuatan logo akrilik'
  ],
  specialty: [
    'partisi laser cutting',
    'harga laser cutting kayu',
    'laser cutting grc',
    'grc ornamen masjid'
  ]
};

/**
 * @param {object} params
 * @param {string} params.title
 * @param {string} params.description
 * @param {string} params.keywords
 * @param {string} [params.image]
 * @param {string} params.url
 * @param {string} [params.type='website']
 * @param {string} [params.publishedTime]
 * @param {string} [params.modifiedTime]
 * @param {string} [params.author]
 * @returns {MetaTags}
 */


// Enhanced function to get keywords by category
export function getKeywordsByCategory(category = 'all') {
  switch (category) {
    case 'primary':
      return TOP_KEYWORDS.primary;
    case 'secondary':
      return TOP_KEYWORDS.secondary;
    case 'location':
      return TOP_KEYWORDS.locationBased;
    case 'services':
      return TOP_KEYWORDS.services;
    case 'materials':
      return TOP_KEYWORDS.materials;
    case 'specialty':
      return TOP_KEYWORDS.specialty;
    case 'all':
    default:
      return [
        ...TOP_KEYWORDS.primary,
        ...TOP_KEYWORDS.secondary,
        ...TOP_KEYWORDS.locationBased,
        ...TOP_KEYWORDS.services,
        ...TOP_KEYWORDS.materials,
        ...TOP_KEYWORDS.specialty
      ];
  }
}

// Generate page-specific keywords
export function generatePageKeywords(pageType, location = null) {
  let keywords = [];
  
  switch (pageType) {
    case 'home':
      keywords = [
        ...TOP_KEYWORDS.primary,
        ...TOP_KEYWORDS.secondary.slice(0, 5)
      ];
      break;
    case 'service-laser':
      keywords = [
        'jasa grafir laser',
        'jasa ukir laser', 
        'laser cutting kayu',
        'grafir laser',
        'jasa laser engraving',
        'engraving laser',
        'laser pvc',
        'laser cutting pvc sheet'
      ];
      break;
    case 'service-cnc':
      keywords = [
        'cnc cutting laser',
        'jasa cnc router',
        'jasa cnc kayu',
        'jasa cutting cnc router',
        'cnc plywood cutting',
        'cnc wood cutting'
      ];
      break;
    case 'material-acrylic':
      keywords = [
        'custom acrylic',
        'custom akrilik terdekat',
        'cutting acrylic',
        'cutting akrilik',
        'jasa cutting akrilik',
        'jasa akrilik custom',
        'jasa custom acrylic',
        'pembuatan logo akrilik'
      ];
      break;
    case 'material-pvc':
      keywords = [
        'laser pvc',
        'laser cutting pvc sheet',
        'cutting pvc',
        'jasa laser cutting PVC',
        'laser cutting pvc',
        'cetak pvc board'
      ];
      break;
    case 'material-wood':
      keywords = [
        'laser cutting kayu',
        'jasa laser cutting kayu',
        'jasa cnc kayu',
        'harga laser cutting kayu',
        'laser cutting kayu jakarta',
        'cutting laser kayu',
        'cnc wood cutting'
      ];
      break;
    case 'material-mdf':
      keywords = [
        'mdf laser cutting',
        'cutting laser mdf',
        'custom mdf cutting',
        'jasa potong mdf'
      ];
      break;
    case 'material-acp':
      keywords = [
        'harga laser cutting acp per m2',
        'acp laser cutting',
        'jasa laser cutting acp',
        'laser cutting acp',
        'cutting laser acp',
        'jasa cutting acp',
        'jasa cnc acp',
        'laser acp'
      ];
      break;
    case 'material-grc':
      keywords = [
        'grc cutting',
        'grc custom',
        'cutting grc',
        'wall panel grc',
        'grc ornamen masjid',
        'laser cutting grc'
      ];
      break;
    case 'specialty':
      keywords = [
        'laser cut maket',
        'partisi laser cutting',
        'custom name plate',
        'name plate stainless',
        'cutting triplek',
        'jasa potong triplek'
      ];
      break;
    default:
      keywords = TOP_KEYWORDS.primary;
  }
  
  // Add location-based keywords if location specified
  if (location) {
    const locationKeywords = TOP_KEYWORDS.locationBased.filter(kw => 
      kw.includes(location.toLowerCase()) || kw.includes('terdekat')
    );
    keywords = [...keywords, ...locationKeywords];
  }
  
  return keywords;
}

export function generateFAQSchema(faqItems) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqItems.map(item => ({
      "@type": "Question",
      "name": item.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": item.answer
      }
    }))
  };
}

export function generateReviewSchema(reviews) {
  return {
    "@context": "https://schema.org",
    "@type": "Organization", 
    "name": SITE_CONFIG.name,
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": calculateAverageRating(reviews),
      "reviewCount": reviews.length
    },
    "review": reviews.map(review => ({
      "@type": "Review",
      "author": {
        "@type": "Person",
        "name": review.name
      },
      "reviewRating": {
        "@type": "Rating",
        "ratingValue": review.rating
      },
      "reviewBody": review.content,
      ...(review.company && {
        "publisher": {
          "@type": "Organization",
          "name": review.company
        }
      })
    }))
  };
}

function calculateAverageRating(reviews) {
  if (!reviews || reviews.length === 0) return 5;
  const total = reviews.reduce((sum, review) => sum + review.rating, 0);
  return Number((total / reviews.length).toFixed(1));
}

export function generateJsonLd(options = {}) {
  const fullTitle = options.title ? `${options.title} | ${SITE_CONFIG.name}` : SITE_CONFIG.title;
  const fullDescription = options.description || SITE_CONFIG.description;
  const fullUrl = options.url ? `${SITE_CONFIG.url}${options.url}` : SITE_CONFIG.url;
  const fullImage = options.image ? `${SITE_CONFIG.url}${options.image}` : `${SITE_CONFIG.url}/logo.webp`;
  
  return {
    '@context': 'https://schema.org',
    '@type': options.type || 'WebSite',
    name: fullTitle,
    description: fullDescription,
    url: fullUrl,
    image: fullImage,
    publisher: {
      '@type': 'Organization',
      name: SITE_CONFIG.name,
      logo: {
        '@type': 'ImageObject',
        url: `${SITE_CONFIG.url}/logo.webp`
      }
    }
  };
}

export function generateServiceSchema(service) {
  // Get service-related keywords
  const serviceKeywords = getKeywordsByCategory('services').filter(kw => 
    kw.includes(service.name.toLowerCase()) || 
    service.name.toLowerCase().includes(kw.split(' ')[1]) || 
    kw.includes('jasa')
  );

  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    serviceType: service.name, // Added serviceType for more specificity
    name: service.name,
    description: service.description,
    keywords: serviceKeywords.join(', '),
    brand: { // Added brand
      '@type': 'Brand',
      name: SITE_CONFIG.name
    },
    provider: { // Enriched provider
      '@type': 'Organization',
      name: SITE_CONFIG.name,
      url: SITE_CONFIG.url
    },
    areaServed: [ // Enriched areaServed
      { "@type": "City", "name": "Jakarta" },
      { "@type": "City", "name": "Bogor" },
      { "@type": "City", "name": "Depok" },
      { "@type": "City", "name": "Tangerang" },
      { "@type": "City", "name": "Bekasi" }
    ],
    ...(service.image && {
      image: `${SITE_CONFIG.url}${service.image}`
    }),
    ...(service.price && {
      offers: {
        '@type': 'Offer',
        price: service.price,
        priceCurrency: 'IDR'
      }
    })
  };
}

export function generateBreadcrumbSchema(items) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      item: {
        '@type': 'WebPage',
        '@id': `${SITE_CONFIG.url}${item.url}`,
        name: item.name
      }
    }))
  };
}

export function generateBlogPostSchema(post) {
  // Helper to convert "9 menit" to ISO 8601 "PT9M"
  const readTimeToISO = (timeString) => {
    if (!timeString) return undefined;
    const minutes = timeString.match(/\d+/);
    return minutes ? `PT${minutes[0]}M` : undefined;
  };

  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.description || post.excerpt,
    image: post.image ? `${SITE_CONFIG.url}${post.image}` : undefined,
    datePublished: post.publishDate,
    dateModified: post.updatedDate || post.publishDate,
    author: {
      '@type': 'Organization',
      name: post.author || 'Tim Teknis Tepat Laser',
      url: SITE_CONFIG.url
    },
    publisher: {
      '@type': 'Organization',
      name: SITE_CONFIG.name,
      logo: {
        '@type': 'ImageObject',
        url: `${SITE_CONFIG.url}/logo.webp`
      }
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${SITE_CONFIG.url}/blog/${post.slug}/`
    },
    articleSection: post.category,
    keywords: post.keywords,
    isAccessibleForFree: true,
    timeRequired: readTimeToISO(post.readTime)
  };
}

export function generateBlogFaqSchema(faqItems = []) {
  if (!faqItems.length) return null;

  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqItems.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer
      }
    }))
  };
}

export function generateProductSchema(material) {
  // Get material-related keywords
  const materialKeywords = getKeywordsByCategory('materials').filter(kw => 
    kw.includes(material.name?.toLowerCase()) || 
    material.name?.toLowerCase().includes(kw.split(' ')[0])
  );

  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: material.name || 'Laser Cutting Material',
    description: material.description || 'High quality material for laser cutting',
    keywords: materialKeywords.join(', '),
    image: `${SITE_CONFIG.url}${material.image || '/images/default.webp'}`,
    brand: {
      '@type': 'Brand',
      name: SITE_CONFIG.name
    },
    manufacturer: {
      '@type': 'Organization',
      name: SITE_CONFIG.name,
      url: SITE_CONFIG.url
    },
    offers: {
      '@type': 'Offer',
      availability: 'https://schema.org/InStock',
      priceCurrency: 'IDR',
      seller: {
        '@type': 'Organization',
        name: SITE_CONFIG.name
      }
    }
  };
}

export function generateLocalBusinessSchema(city = 'Jakarta') {
  const cityCoordinates = {
    'Jakarta': { lat: -6.2088, lng: 106.8456 },
    'Bogor': { lat: -6.5971, lng: 106.8060 },
    'Depok': { lat: -6.4025, lng: 106.7942 },
    'Tangerang': { lat: -6.1781, lng: 106.6298 },
    'Bekasi': { lat: -6.2383, lng: 106.9756 }
  };

  const coords = cityCoordinates[city] || cityCoordinates['Jakarta'];
  
  // Get location-specific keywords
  const locationKeywords = TOP_KEYWORDS.locationBased.filter(kw => 
    kw.includes(city.toLowerCase()) || kw.includes('terdekat')
  );

  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': `${SITE_CONFIG.url}#business-${city.toLowerCase()}`,
    name: `${SITE_CONFIG.name} - Jasa Grafir Laser & Cutting ${city}`,
    description: `Jasa grafir laser & cutting akurat di ${city}. Spesialis custom acrylic, laser cutting kayu, cnc router dengan teknologi terdepan. ${locationKeywords.slice(0, 3).join(', ')}.`,
    keywords: [
      ...TOP_KEYWORDS.primary,
      ...locationKeywords
    ].join(', '),
    url: SITE_CONFIG.url,
    telephone: SITE_CONFIG.phone,
    email: SITE_CONFIG.email,
    address: {
      '@type': 'PostalAddress',
      addressLocality: city,
      addressRegion: city === 'Jakarta' ? 'DKI Jakarta' : 'Jawa Barat',
      addressCountry: 'ID'
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: coords.lat,
      longitude: coords.lng
    },
    openingHours: 'Mo-Sa 08:00-17:00',
    priceRange: '$$',
    areaServed: {
      '@type': 'City',
      name: city
    },
    serviceArea: {
      '@type': 'GeoCircle',
      geoMidpoint: {
        '@type': 'GeoCoordinates',
        latitude: coords.lat,
        longitude: coords.lng
      },
      geoRadius: '50000'
    },
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Layanan Laser Cutting & Grafir',
      itemListElement: [
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Jasa Grafir Laser',
            description: `Layanan grafir laser presisi tinggi di ${city}. Custom acrylic, kayu, metal.`
          }
        },
        {
          '@type': 'Offer', 
          itemOffered: {
            '@type': 'Service',
            name: 'Laser Cutting Kayu',
            description: `Jasa laser cutting kayu akurat dan cepat di ${city}`
          }
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'CNC Router Service',
            description: `Layanan CNC router untuk cutting berbagai material di ${city}`
          }
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service', 
            name: 'Custom Acrylic',
            description: `Pembuatan custom acrylic dan akrilik terdekat di ${city}`
          }
        }
      ]
    }
  };
}

export function generateSitemapUrls() {
  const baseUrls = [
    { url: '/', priority: 1.0, changefreq: 'weekly' },
    { url: '/about', priority: 0.8, changefreq: 'monthly' },
    { url: '/contact', priority: 0.8, changefreq: 'monthly' },
    { url: '/blog', priority: 0.7, changefreq: 'weekly' }
  ];

  // Enhanced service URLs based on top keywords
  const serviceUrls = [
    '/jasa-grafir-laser',        // Top #1 keyword
    '/jasa-ukir-laser',          // Top #3 keyword  
    '/jasa-cnc-router',
    '/jasa-laser-fiber', 
    '/jasa-laser-co2',
    '/jasa-galvo-engraving',
    '/laser-cutting-kayu',       // Top #5 keyword
    '/cnc-cutting-laser',        // Top #6 keyword
    '/jasa-laser-engraving',
    '/custom-acrylic'            // Top #2 keyword
  ].map(url => ({ url, priority: 0.9, changefreq: 'monthly' }));

  // Enhanced material URLs with top performing keywords
  const materialUrls = [
    '/material-acp',
    '/material-pvc',
    '/material-metal',
    '/material-acrylic',         // Custom acrylic related
    '/material-mdf',             // MDF laser cutting
    '/material-ply-wood-multiplex',
    '/material-grc',             // GRC cutting
    '/laser-pvc',                // Top #7 keyword
    '/mdf-laser-cutting',        // Top #9 keyword
    '/laser-cutting-pvc-sheet'   // Top #10 keyword
  ].map(url => ({ url, priority: 0.8, changefreq: 'monthly' }));

  // Enhanced location URLs with Jakarta Timur (top location keyword)
  const locationUrls = [
    '/laser-cutting-jakarta',
    '/laser-cutting-jakarta-timur',  // Top location keyword
    '/laser-cutting-bogor',
    '/laser-cutting-depok', 
    '/laser-cutting-tangerang',
    '/laser-cutting-bekasi',
    '/grafir-laser-bekasi',          // Specific location keyword
    '/custom-akrilik-terdekat'       // Popular "terdekat" keyword
  ].map(url => ({ url, priority: 0.7, changefreq: 'monthly' }));

  // Specialty pages for high-performing niche keywords
  const specialtyUrls = [
    '/laser-cut-maket',              // Top #4 keyword
    '/partisi-laser-cutting',
    '/custom-name-plate',
    '/grc-ornamen-masjid',
    '/harga-laser-cutting-acp-per-m2'
  ].map(url => ({ url, priority: 0.6, changefreq: 'monthly' }));

  return [...baseUrls, ...serviceUrls, ...materialUrls, ...locationUrls, ...specialtyUrls];
}

export function generateRobotsTxt() {
  return `User-agent: *
Allow: /

# Sitemaps
Sitemap: ${SITE_CONFIG.url}/sitemap.xml

# Crawl-delay
Crawl-delay: 1

# Disallow admin areas (if any)
Disallow: /admin/
Disallow: /_astro/
Disallow: /api/

# Allow important pages (optimized for top keywords)
Allow: /
Allow: /jasa-*
Allow: /material-*
Allow: /laser-cutting-*
Allow: /laser-cut-*
Allow: /custom-*
Allow: /cnc-*
Allow: /grafir-*
Allow: /cutting-*
Allow: /blog*
Allow: /about
Allow: /contact

# High-priority pages for top keywords
Allow: /jasa-grafir-laser
Allow: /custom-acrylic
Allow: /jasa-ukir-laser
Allow: /laser-cut-maket
Allow: /laser-cutting-kayu
Allow: /cnc-cutting-laser`;
}

// New utility functions for SEO optimization

// Generate dynamic title based on keywords
export function generateDynamicTitle(baseTitle, location = null, service = null) {
  let title = baseTitle;
  
  if (service && location) {
    // Use top location + service keywords
    title = `${service} ${location} | ${baseTitle}`;
  } else if (service) {
    title = `${service} | ${baseTitle}`;
  } else if (location) {
    title = `Jasa Grafir Laser ${location} | ${baseTitle}`;
  }
  
  return title;
}

// Generate SEO-optimized descriptions with top keywords
export function generateSEODescription(pageType, location = null) {
  const descriptions = {
    home: `Jasa grafir laser & custom acrylic terbaik di Jabodetabek. Spesialis laser cutting kayu, cnc cutting laser, dan jasa ukir laser. Layanan cepat & akurat dengan harga kompetitif.`,
    
    'service-laser': `Jasa grafir laser profesional dengan teknologi terdepan. Layanan laser cutting kayu, custom acrylic, dan jasa ukir laser untuk berbagai kebutuhan industri & personal.`,
    
    'service-cnc': `Jasa CNC router & cnc cutting laser berkualitas tinggi. Spesialis cutting berbagai material dengan presisi maksimal dan hasil finishing terbaik.`,
    
    'material-acrylic': `Custom acrylic & cutting akrilik terdekat dengan kualitas premium. Jasa akrilik custom untuk display, signage, dan berbagai kebutuhan bisnis Anda.`,
    
    'material-pvc': `Laser PVC & laser cutting pvc sheet berkualitas tinggi. Jasa laser cutting PVC dengan hasil presisi untuk berbagai aplikasi industri dan komersial.`,
    
    'material-wood': `Laser cutting kayu & jasa laser cutting kayu dengan teknologi canggih. Melayani cutting laser kayu untuk furniture, kerajinan, dan berbagai proyek kreatif.`,
    
    'material-mdf': `MDF laser cutting dengan hasil presisi tinggi. Jasa potong MDF dan custom MDF cutting untuk furniture, interior, dan berbagai kebutuhan woodworking.`,
    
    'material-acp': `Laser cutting ACP dengan harga kompetitif. Jasa laser cutting ACP dan cnc ACP untuk fasad, signage, dan aplikasi arsitektur lainnya.`,
    
    'location': `Jasa grafir laser & custom acrylic terpercaya di {{location}}. Layanan laser cutting kayu, cnc router, dan cutting akrilik terdekat dengan kualitas terjamin.`
  };
  
  let description = descriptions[pageType] || descriptions.home;
  
  if (location && description.includes('{{location}}')) {
    description = description.replace('{{location}}', location);
  }
  
  return description;
}

// Export top keywords for external use
export { TOP_KEYWORDS };
