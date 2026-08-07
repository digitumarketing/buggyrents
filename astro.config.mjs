import { defineConfig } from 'astro/config';
import cloudflare from '@astrojs/cloudflare';
import react from '@astrojs/react';
import markdoc from '@astrojs/markdoc';
import keystatic from '@keystatic/astro';

export default defineConfig({
  site: 'https://buggyrents.com',
  output: 'static',
  adapter: cloudflare({ imageService: 'compile' }),
  integrations: [react(), markdoc(), keystatic()],
  image: {
    domains: [],
    remotePatterns: []
  },
  build: { inlineStylesheets: 'auto' },
  prefetch: { prefetchAll: true, defaultStrategy: 'viewport' }
});
