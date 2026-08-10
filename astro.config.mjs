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
/* Keystatic now ships in production so the client can reach /keystatic on the live
   site. It needs the Cloudflare adapter for its server routes; the 65 public pages
   are still prerendered static HTML and are unaffected. */
const withKeystatic = process.env.DISABLE_KEYSTATIC !== 'true';

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
  /* The old WordPress site ranks on these URLs today. Without 301s every one of
     them becomes a 404 the moment the domain points here, and whatever ranking and
     backlinks they carry is thrown away. Two old URLs, /dune-buggy-dubai/ and
     /quad-bike-dubai/, happen to match the new ones exactly and need no redirect.
     Verified against buggyrents.com/page-sitemap.xml on 10 Aug 2026.

     Astro normalises a trailing slash away when it writes _redirects, so listing
     "/contact-us/" as a second key does not produce a second rule, it produces a
     duplicate of the first one and a stray meta-refresh HTML page. The
     trailing-slash form of each URL, which is the form WordPress published and
     Google indexed, is added by hand in public/_redirects instead. */
  redirects: {
    '/dune-buggy-rental-dubai': '/dune-buggy-dubai/',
    '/dune-buggy-rental':       '/dune-buggy-dubai/',
    '/atv-rental-dubai':        '/quad-bike-dubai/',
    '/quad-bike-rental-dubai':  '/quad-bike-dubai/',
    '/dirt-bike-rental-dubai':  '/ktm-dirt-bike-dubai/',
    '/dirt-bike-dubai':         '/ktm-dirt-bike-dubai/',
    '/contact-us':              '/contact/',
    '/thank-you':               '/contact/'
  },

  build: { inlineStylesheets: 'auto' },
  prefetch: { prefetchAll: true, defaultStrategy: 'viewport' }
});
