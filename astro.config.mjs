// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

import icon from 'astro-icon';

import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://iamkaleb21.github.io',
  i18n: {
    defaultLocale: 'es',
    locales: ['es', 'en'],
    prefixDefaultLocale: false
  },
  vite: {
    plugins: [tailwindcss()]
  },

  integrations: [icon(), react(), sitemap()]
});