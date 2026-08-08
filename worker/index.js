/* Buggy Rents Worker.
 *
 * The site is 100% prerendered HTML served from [assets]. This script exists for
 * one route: POST /api/contact, which emails the contact form to the inbox.
 * Everything else falls straight through to the static assets.
 *
 * IMPORTANT DESIGN NOTE
 * The browser opens WhatsApp regardless of what this endpoint returns. Email is
 * best effort. If the API key is missing, the provider is down, or the request
 * fails for any reason, the guest still lands in WhatsApp with their message
 * ready. A broken email backend must never cost a booking.
 *
 * SETUP (one secret, then email starts working)
 *   npx wrangler secret put RESEND_API_KEY
 * Get the key at resend.com. The free tier covers 3,000 emails a month, which is
 * far more than this form will ever send. Until the secret is set the endpoint
 * returns { ok: false, reason: 'not-configured' } and the form still works.
 */

/* Both are overridable with plain vars in wrangler.toml or the dashboard.
 *
 * SENDER LIMIT WORTH KNOWING
 * Resend's shared sender, onboarding@resend.dev, can only deliver to the address
 * that owns the Resend account. That account is Buggyrents@gmail.com, which is
 * also where the leads go, so this works today. Adding any second recipient will
 * be rejected until the domain is verified.
 *
 * TO SEND FROM OUR OWN DOMAIN, about ten minutes
 *   1. resend.com -> Domains -> add buggyrents.com
 *   2. Paste the DKIM and SPF records into Cloudflare DNS (same account, same domain)
 *   3. Once Verified, set CONTACT_FROM to "Buggy Rents Website <bookings@buggyrents.com>"
 * That also stops the mail landing in spam, which a resend.dev sender often does. */
const DEFAULT_INBOX = 'Buggyrents@gmail.com';
const DEFAULT_FROM = 'Buggy Rents Website <onboarding@resend.dev>';

const CORS = {
  'Access-Control-Allow-Origin': 'https://buggyrents.com',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type'
};

const json = (body, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json', ...CORS }
  });

/* Strip anything that could break out of the text body or forge headers. */
const clean = (v, max) => String(v ?? '').replace(/[\r\n]+/g, ' ').trim().slice(0, max);

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (url.pathname !== '/api/contact') {
      return env.ASSETS.fetch(request);
    }
    if (request.method === 'OPTIONS') {
      return new Response(null, { status: 204, headers: CORS });
    }
    if (request.method !== 'POST') {
      return json({ ok: false, reason: 'method' }, 405);
    }

    let data;
    try {
      const ct = request.headers.get('content-type') || '';
      data = ct.includes('application/json')
        ? await request.json()
        : Object.fromEntries(await request.formData());
    } catch {
      return json({ ok: false, reason: 'bad-body' }, 400);
    }

    /* Honeypot. Real guests never see this field, so anything in it is a bot.
       Return ok so the bot believes it succeeded and does not retry. */
    if (clean(data.website_url, 200)) return json({ ok: true, spam: true });

    const name = clean(data.name, 120);
    const phone = clean(data.phone, 60);
    const email = clean(data.email, 200);
    const message = String(data.message ?? '').trim().slice(0, 4000);
    const pkg = clean(data.package, 200);
    const people = clean(data.people, 10).replace(/[^0-9]/g, '');

    if (!name || !phone || !message) {
      return json({ ok: false, reason: 'missing-fields' }, 400);
    }
    if (email && !/^[^@\s]+@[^@\s.]+\.[^@\s]+$/.test(email)) {
      return json({ ok: false, reason: 'bad-email' }, 400);
    }

    if (!env.RESEND_API_KEY) {
      /* Not an error the guest should ever see. WhatsApp still opens. */
      return json({ ok: false, reason: 'not-configured' });
    }

    const text = [
      'New booking request from buggyrents.com',
      '',
      `Name:    ${name}`,
      `Phone:   ${phone}`,
      `Email:   ${email || 'not given'}`,
      `Package: ${pkg || 'not chosen, wants advice'}`,
      `People:  ${people || 'not given'}`,
      '',
      'Message:',
      message,
      '',
      '---',
      `Received: ${new Date().toISOString()}`
    ].join('\n');

    try {
      const res = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${env.RESEND_API_KEY}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          from: env.CONTACT_FROM || DEFAULT_FROM,
          to: [env.CONTACT_INBOX || DEFAULT_INBOX],
          reply_to: email || undefined,
          subject: `Booking request from ${name} (${phone})${people ? ', ' + people + ' pax' : ''}`,
          text
        })
      });

      if (!res.ok) {
        console.error('Resend rejected the message', res.status, await res.text());
        return json({ ok: false, reason: 'provider' }, 502);
      }
      return json({ ok: true });
    } catch (err) {
      console.error('Contact email failed', err);
      return json({ ok: false, reason: 'network' }, 502);
    }
  }
};
