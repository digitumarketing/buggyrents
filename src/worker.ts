/* CUSTOM WORKER ENTRY, added 15 Oct 2026 for 410 Gone.

   This is the Cloudflare adapter's own default entry (createExports + handle),
   with one check in front of it: a path marked "410 Content Deleted" in
   Keystatic > SEO > Redirections is answered with status 410 and the branded 404
   page as the body, so Google drops it from the index faster than a 404 and a
   visitor still sees the normal "page not found" screen.

   Cloudflare's _redirects file cannot answer 410, which is why this lives here.
   The list is read from the CMS files at build time, so it is always the list the
   site was built from.

   HOW THE REQUEST GETS HERE. A deleted page has no file in dist, so normally the
   asset router answers it with the 404 page and this Worker never runs. On
   Cloudflare's build, scripts/build-redirects.mjs adds every valid 410 path to
   run_worker_first in wrangler.toml, which is what routes those requests here.
   A 410 entry the build skipped (for example one that names a live page) is never
   routed here, so the check below cannot hide a live page. */
import type { SSRManifest } from 'astro';
import { App } from 'astro/app';
import { handle } from '@astrojs/cloudflare/handler';

type Entry = { from?: string; type?: string | { discriminant?: string }; active?: boolean };

const typeOf = (e: Entry) => String(typeof e.type === 'object' && e.type ? e.type.discriminant : e.type);

const files = import.meta.glob<Entry>('/src/content/redirects/*.json', { eager: true, import: 'default' });

const norm = (p: string) => (p.replace(/\/+$/, '') || '/').toLowerCase();

const GONE = new Set(
  Object.values(files)
    .filter(e => e && e.active !== false && typeOf(e) === '410' && typeof e.from === 'string')
    .map(e => norm(e.from!.trim().replace(/^https?:\/\/(www\.)?buggyrents\.com/i, '').replace(/[?#].*$/, '')))
    .filter(p => p.startsWith('/') && p !== '/' && !p.startsWith('/keystatic') && !p.startsWith('/api/'))
);

export function createExports(manifest: SSRManifest) {
  const app = new App(manifest);
  const fetch = async (request: Request, env: any, context: any) => {
    const { pathname } = new URL(request.url);
    if (GONE.size && GONE.has(norm(pathname))) {
      const page = await env.ASSETS.fetch(new URL('/404', request.url));
      return new Response(request.method === 'HEAD' ? null : page.body, {
        status: 410,
        headers: {
          'content-type': 'text/html; charset=utf-8',
          'x-robots-tag': 'noindex',
          'cache-control': 'public, max-age=3600'
        }
      });
    }
    return await handle(manifest, app, request, env, context);
  };
  return { default: { fetch } };
}
