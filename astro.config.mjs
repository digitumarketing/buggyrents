import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import markdoc from '@astrojs/markdoc';
import keystatic from '@keystatic/astro';
import cloudflare from '@astrojs/cloudflare';
import sitemap from '@astrojs/sitemap';

/* Keystatic's admin UI needs server-side rendering, which needs an adapter.
   The public site is 100% static, so we only load both in local dev.
   Production ships pure static HTML — no Worker runtime, and it drops the
   2.7 MB Keystatic admin bundle from the build. */
const withKeystatic = process.env.ENABLE_KEYSTATIC === 'true';

export default defineConfig({
  site: 'https://buggyrents.com',
  output: 'static',
  ...(withKeystatic ? { adapter: cloudflare({ imageService: 'compile' }) } : {}),
  /* robots.txt has always pointed at /sitemap-index.xml, but nothing generated it,
     so the file 404d and Google had no list of the 65 pages to crawl. */
  integrations: [
    react(),
    markdoc(),
    sitemap({
      /* The 404 is noindex and Keystatic is dev only. Neither belongs in a sitemap. */
      filter: page => !page.includes('/404') && !page.includes('/keystatic'),
      changefreq: 'weekly',
      lastmod: new Date()
    }),
    ...(withKeystatic ? [keystatic()] : [])
  ],
  build: { inlineStylesheets: 'auto' },
  prefetch: { prefetchAll: true, defaultStrategy: 'viewport' }
});
