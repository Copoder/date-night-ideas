import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://date-night-ideas.com',
  trailingSlash: 'always',
  integrations: [sitemap({ filter: (page) => !page.endsWith('/results/') })],
  output: 'static',
  build: {
    format: 'directory'
  }
});
