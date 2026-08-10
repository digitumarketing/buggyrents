/* SUPERSEDED — do not deploy this file.
 *
 * The contact endpoint now lives at src/pages/api/contact.ts as an Astro route.
 * Keystatic needs server rendering, so Astro generates the Cloudflare Worker
 * itself, and a Worker project can only have one entry point.
 *
 * Safe to delete this folder. It is left here only because the sandbox cannot
 * remove files from the synced folder.
 */
export default {
  async fetch(request, env) {
    return new Response('Superseded by src/pages/api/contact.ts', { status: 410 });
  }
};
