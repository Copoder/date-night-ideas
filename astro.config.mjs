import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

import cloudflare from '@astrojs/cloudflare';

export default defineConfig({
  site: 'https://date-night-ideas.com',
  trailingSlash: 'always',
  integrations: [sitemap({ filter: (page) => !page.endsWith('/results/') })],
  output: 'static',

  build: {
    format: 'directory'
  },

  adapter: cloudflare()
});