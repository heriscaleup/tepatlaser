// astro.config.mjs
import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap'; // Baris ini sekarang gak akan error

export default defineConfig({
  site: 'https://www.tepatlaser.com',
  base: '/',
  prefetch: {
    prefetchAll: true,
    defaultStrategy: 'viewport',
  },
  
  integrations: [
    tailwind(),
    sitemap() // Dan ini juga
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
    inlineStylesheets: 'always',
    assets: '_assets'
  },
});