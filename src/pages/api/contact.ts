/* POST /api/contact — emails the contact form to the booking inbox.
 *
 * This used to be a standalone Cloudflare Worker. Keystatic needs server routes,
 * so Astro now generates the Worker itself and there can only be one entry point.
 * Same logic, same guarantees, just living inside the Astro build.
 *
 * DESIGN NOTE THAT MATTERS
 * The browser opens WhatsApp regardless of what this returns, and the Send Email
 * button reports failure honestly. A broken email backend must never cost a booking.
 *
 * SETUP
 *   npx wrangler secret put RESEND_API_KEY
 * Until that secret exists this returns { ok: false, reason: 'not-configured' }
 * and the form still works through WhatsApp.
 */
import type { APIRoute } from 'astro';

export const prerender = false;

/* These are fallbacks only. The real values are CONTACT_FROM and CONTACT_INBOX in
   wrangler.toml. buggyrents.com is verified at Resend, so mail leaves as the domain
   itself; the resend.dev sender is kept here purely so a misconfigured preview
   deploy still sends something rather than throwing. */
const DEFAULT_INBOX = 'Buggyrents@gmail.com';
const DEFAULT_FROM = 'Buggy Rents Website <bookings@buggyrents.com>';

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json' }
  });

/* Strip anything that could forge a mail header or break out of the text body. */
const clean = (v: unknown, max: number) =>
  String(v ?? '').replace(/[\r\n]+/g, ' ').trim().slice(0, max);

export const POST: APIRoute = async ({ request, locals }) => {
  const env = ((locals as any)?.runtime?.env ?? {}) as Record<string, string | undefined>;

  let data: Record<string, unknown>;
  try {
    const ct = request.headers.get('content-type') || '';
    data = ct.includes('application/json')
      ? await request.json()
      : Object.fromEntries(await request.formData());
  } catch {
    return json({ ok: false, reason: 'bad-body' }, 400);
  }

  /* Honeypot. Real guests never see this field, so anything in it is a bot.
     Return ok so it believes it succeeded and does not retry. */
  if (clean(data.website_url, 200)) return json({ ok: true, spam: true });

  const name = clean(data.name, 120);
  const phone = clean(data.phone, 60);
  const email = clean(data.email, 200);
  const message = String(data.message ?? '').trim().slice(0, 4000);
  const pkg = clean(data.package, 200);
  const people = clean(data.people, 10).replace(/[^0-9]/g, '');

  if (!name || !phone || !message) return json({ ok: false, reason: 'missing-fields' }, 400);
  if (email && !/^[^@\s]+@[^@\s.]+\.[^@\s]+$/.test(email)) {
    return json({ ok: false, reason: 'bad-email' }, 400);
  }
  if (!env.RESEND_API_KEY) return json({ ok: false, reason: 'not-configured' });

  const text = [
    'New booking request from buggyrents.com', '',
    `Name:    ${name}`,
    `Phone:   ${phone}`,
    `Email:   ${email || 'not given'}`,
    `Package: ${pkg || 'not chosen, wants advice'}`,
    `People:  ${people || 'not given'}`,
    '', 'Message:', message, '', '---',
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
        /* bookings@ cannot receive mail, so without this a reply in Gmail would
           bounce. Pointing it at the guest makes Reply do the obvious thing. When
           the guest left the optional email blank, fall back to the booking inbox
           so a reply at least stays with the team. */
        reply_to: email || env.CONTACT_INBOX || DEFAULT_INBOX,
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
};
