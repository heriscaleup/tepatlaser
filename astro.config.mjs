// astro.config.mjs
import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap'; // Baris ini sekarang gak akan error

export default defineConfig({
  site: 'https://tepatlaser.com',
  base: '/',
  redirects: {
    '/jasa-laser-cutting-mdf-4': '/jasa-laser-cutting-mdf-ai',
    '/jasa-laser-cutting-akrilik-2': '/laser-cutting-akrilik',
    '/jasa-laser-cutting-stainless': '/laser-stainless-bintaro',
    '/laser-cutting-stainless': '/laser-stainless-bintaro',
  },
  prefetch: {
    prefetchAll: false,
    defaultStrategy: 'hover',
  },
  
  integrations: [
    tailwind(),
    sitemap()
  ],
  
  vite: {
    resolve: {
      alias: {
        '@': '/src',
        '@components': '/src/components',
        '@styles': '/src/styles',
        '@utils': '/src/utils'
      }
    }
  },
  
  build: {
    // 'always': satu-satunya CSS chunk sitewide (~12 KiB gzip) diinline ke tiap HTML,
    // menghilangkan request render-blocking terpisah (Footer.[hash].css) di semua halaman.
    inlineStylesheets: 'always',
    assets: '_assets'
  },
});
