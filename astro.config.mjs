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
    sitemap({
      // Halaman statis di public/ tidak terdeteksi otomatis oleh sitemap
      customPages: [
        'https://tepatlaser.com/pagar-laser-cutting/',
        'https://tepatlaser.com/railing-laser-cutting/',
      ],
    })
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
    inlineStylesheets: 'auto',
    assets: '_assets'
  },
});
