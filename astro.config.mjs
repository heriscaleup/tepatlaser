// astro.config.mjs
import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap'; // Baris ini sekarang gak akan error

export default defineConfig({
  site: 'https://tepatlaser.com',
  base: '/',
  prefetch: {
    prefetchAll: false,
    defaultStrategy: 'hover',
  },
  
  integrations: [
    tailwind(),
    sitemap({
      // Halaman statis di public/ tidak terdeteksi otomatis oleh sitemap
      customPages: ['https://tepatlaser.com/pagar-laser-cutting/'],
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
