> # SUPERSEDED — implemented 4 Sep 2026, differently
>
> **Do not build from this document.** Navigation is in the CMS; the working
> implementation is `keystatic.config.ts` (the `navigation` singleton),
> `src/content/navigation.json` and `src/data/nav.ts`. CLAUDE.md §"Navigation moved into
> the CMS" carries the reasoning. This file is kept only as the record of the audit that
> prompted the work, which was accurate: the dirt bike price page really was missing from
> the header and footer, and that was fixed on 3 Sep 2026 in commit `a4564b6`.
>
> **What this document got wrong.** Four things, all of which would have caused damage if
> followed as written:
>
> 1. **Part B assumes the header and footer are hardcoded markup.** They were never
>    hardcoded. `Header.astro` and `Footer.astro` have always rendered from arrays in
>    `src/data/nav.ts`. Rewriting them from the snippets here would have replaced working,
>    styled, accessible components (mobile drawer, `aria-current`, hover dropdowns) with
>    a plainer version, and thrown away the CSS that sits in those files.
>
> 2. **The seed data was wrong, and `navigation.json` has been deleted.** It was
>    reconstructed from rendered HTML *before* the nav commit, so the footer column
>    headings were guesses. It renamed "Tours" to "Rides" and "Prices" to
>    "Prices and FAQs", renamed "Dirt bike prices" to "KTM prices" and moved it above
>    Safari prices, and pulled the "Legal" column out into a bottom bar the footer has no
>    slot for, which would have deleted that column from the site. A JSON file cannot
>    carry a warning header, and a wrong seed file is one copy-paste away from a silent
>    restructure, so it is gone rather than annotated. **`src/data/nav.ts` was the source
>    of truth; the live seed was generated from it.**
>
> 3. **The path was wrong.** This repo keeps Keystatic-owned data in `src/content/*.json`
>    and adapters in `src/data/*.ts`. `path: 'src/data/navigation'` would have put CMS
>    output into the code directory. It is `src/content/navigation` and Keystatic writes
>    `src/content/navigation.json` — a flat file, not `navigation/index.json`, which is
>    what every other singleton in this config already does.
>
> 4. **`headerActions` and `newTab` have no consumers**, so both were dropped. The header
>    call and WhatsApp buttons are built from Site settings and a generated booking
>    message; the components emit no `target` or `rel` on menu links. A CMS field the
>    client can edit with no effect on the site is worse than no field.
>
> Part A's two-level schema shape and Part E's guardrails were sound and were followed.
> Part E's broken-link check exists as `scripts/audit-links.mjs`, and its trailing-slash
> point became save-time validation on the URL field rather than a normaliser, so a bad
> value is refused instead of silently corrected.

# Buggy Rents — Navigation in Keystatic (drag & drop header + footer)

Live site audit, 03 Sep 2026.

## What the audit found

| Check | Result |
|---|---|
| `/ktm-dirt-bike-dubai/price/` | **200 — page is live** |
| Same page in header dropdown | **Missing** |
| Same page in footer | **Missing** |
| `/ktm-dirt-bike-dubai/faq/` | 404 — not built yet, do **not** add to nav |
| `/dune-buggy-dubai/safety/`, `/quad-bike-dubai/safety/` | 404 — not built yet |
| Platform | Astro static build, Cloudflare |
| CMS | **Keystatic already installed** at `/keystatic/` |

Every other service dropdown (Dune Buggy, Quad Bike, Desert Safari) has both `Prices` and `FAQ`. The Dirt Bike dropdown has neither, so the price page is orphaned from navigation — it only gets crawled via the sitemap and any in-body links.

---

## PART A — The navigation singleton

Add this to the existing `keystatic.config.ts`. It gives one screen in the CMS where header and footer are both built by dragging rows.

```ts
import { config, singleton, fields } from '@keystatic/core';

/* Reused by every link row in header and footer */
const linkFields = {
  label: fields.text({
    label: 'Label',
    validation: { isRequired: true },
  }),
  href: fields.text({
    label: 'URL',
    description:
      'Internal path with leading and trailing slash, e.g. /ktm-dirt-bike-dubai/price/ — or a full https:// / tel: / mailto: URL',
    validation: { isRequired: true },
  }),
  newTab: fields.checkbox({
    label: 'Open in a new tab',
    defaultValue: false,
  }),
};

export const navigation = singleton({
  label: 'Navigation (header & footer)',
  path: 'src/data/navigation',
  format: { data: 'json' },
  schema: {
    /* ---------- HEADER ---------- */
    header: fields.array(
      fields.object({
        ...linkFields,
        children: fields.array(fields.object(linkFields), {
          label: 'Dropdown items',
          itemLabel: (props) => props.fields.label.value || 'Untitled link',
        }),
      }),
      {
        label: 'Header menu',
        description:
          'Drag rows to reorder. Leave "Dropdown items" empty for a plain top-level link.',
        itemLabel: (props) => props.fields.label.value || 'Untitled item',
      }
    ),

    headerActions: fields.array(fields.object(linkFields), {
      label: 'Header buttons (call / WhatsApp)',
      itemLabel: (props) => props.fields.label.value || 'Untitled button',
    }),

    /* ---------- FOOTER ---------- */
    footerColumns: fields.array(
      fields.object({
        heading: fields.text({
          label: 'Column heading',
          validation: { isRequired: true },
        }),
        links: fields.array(fields.object(linkFields), {
          label: 'Links',
          itemLabel: (props) => props.fields.label.value || 'Untitled link',
        }),
      }),
      {
        label: 'Footer columns',
        description: 'Drag to reorder columns. Drag links inside a column to reorder them.',
        itemLabel: (props) => props.fields.heading.value || 'Untitled column',
      }
    ),

    footerLegal: fields.array(fields.object(linkFields), {
      label: 'Footer bottom bar (legal + sitemap)',
      itemLabel: (props) => props.fields.label.value || 'Untitled link',
    }),
  },
});
```

Register it:

```ts
export default config({
  storage: { /* leave as-is — see Part D */ },
  collections: { /* existing collections */ },
  singletons: {
    navigation,
    // ...any existing singletons
  },
});
```

Keystatic renders every `fields.array` with a drag handle on each row, so header items, dropdown children, footer columns and the links inside them are all reorderable by dragging. No extra plugin needed.

**Nesting depth:** this schema is two levels (top item → dropdown children), which matches the current header exactly. A third level is possible but the header design has no room for it, so keep it at two.

---

## PART B — Consuming it in Astro

Keystatic writes the singleton to `src/data/navigation/index.json` (directory from `path`, filename from `format`). Confirm the exact filename after the first save in the CMS, then import it directly — no reader API needed for a static build, and it stays fully pre-rendered.

### `src/components/Header.astro`

```astro
---
import nav from '../data/navigation/index.json';

const { header, headerActions } = nav;
const path = Astro.url.pathname;
---

<header class="site-header">
  <a href="/" class="logo" aria-label="Buggy Rents home">
    <!-- existing logo markup -->
  </a>

  <nav class="primary-nav" aria-label="Primary">
    <ul>
      {header.map((item) => (
        <li class={item.children?.length ? 'has-dropdown' : ''}>
          <a
            href={item.href}
            target={item.newTab ? '_blank' : undefined}
            rel={item.newTab ? 'noopener' : undefined}
            aria-current={path === item.href ? 'page' : undefined}
          >
            {item.label}
          </a>

          {item.children?.length > 0 && (
            <div class="dropdown">
              <ul>
                {item.children.map((child) => (
                  <li>
                    <a
                      href={child.href}
                      target={child.newTab ? '_blank' : undefined}
                      rel={child.newTab ? 'noopener' : undefined}
                      aria-current={path === child.href ? 'page' : undefined}
                    >
                      {child.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </li>
      ))}
    </ul>
  </nav>

  <div class="header-actions">
    {headerActions.map((action) => (
      <a
        href={action.href}
        class="btn"
        target={action.newTab ? '_blank' : undefined}
        rel={action.newTab ? 'noopener' : undefined}
      >
        {action.label}
      </a>
    ))}
  </div>
</header>
```

The mobile drawer must map over the **same** `header` array — do not keep a second hardcoded copy, or desktop and mobile menus will drift apart on the next edit.

### `src/components/Footer.astro`

```astro
---
import nav from '../data/navigation/index.json';

const { footerColumns, footerLegal } = nav;
---

<footer class="site-footer">
  <div class="footer-cols">
    {footerColumns.map((col) => (
      <div class="footer-col">
        <h3>{col.heading}</h3>
        <ul>
          {col.links.map((link) => (
            <li>
              <a
                href={link.href}
                target={link.newTab ? '_blank' : undefined}
                rel={link.newTab ? 'noopener' : undefined}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    ))}
  </div>

  <div class="footer-legal">
    {footerLegal.map((link) => (
      <a href={link.href}>{link.label}</a>
    ))}
  </div>
</footer>
```

Contact block and social icons stay hardcoded in the footer — they are not menu items and putting them in a drag-and-drop array only invites someone to delete the phone number.

---

## PART C — Seed data

Drop `navigation.json` (shipped alongside this doc) at `src/data/navigation/index.json` before the first build. It mirrors the live header and footer exactly, plus two additions:

1. `Prices` added to the Dirt Bike dropdown, after `For advanced riders`.
2. `KTM prices` added to the footer prices column, after `Quad prices`.

Dirt bike FAQ is deliberately absent — that page 404s today. Add it in the CMS the day it ships.

---

## PART D — Two things to verify before handing the CMS to the client

**1. Storage mode.** Open `keystatic.config.ts` and check `storage.kind`:

- `'local'` — the admin UI only works on `localhost`. The `/keystatic/` route will load in production but saving will fail. Switch to `'github'` (GitHub App, gives the client a login and commits on their behalf) or Keystatic Cloud.
- `'github'` — already correct. Confirm the Astro adapter allows the Keystatic API routes to run server-side; a purely `output: 'static'` build cannot handle the GitHub OAuth callback.

**2. Rebuild latency.** Every save commits to the repo and triggers a Cloudflare Pages build. The nav changes on the live site roughly 1–2 minutes later, not instantly like WordPress. Tell the client this up front, otherwise the first support message will be "menu save kiya but site py nahi aaya".

---

## PART E — Guardrails worth adding

**Trailing-slash consistency.** Every URL on this site uses a trailing slash. A link entered as `/ktm-dirt-bike-dubai/price` (no slash) will redirect, which costs a hop and looks sloppy in crawl reports. Optional normaliser in the component:

```ts
const normalise = (href: string) =>
  href.startsWith('/') && !href.endsWith('/') ? `${href}/` : href;
```

**Broken-link check at build time.** Since nav is now client-editable, a typo can ship an orphan link sitewide. A small build-time script that reads `navigation/index.json` and asserts every internal `href` matches a generated route will fail the build instead of publishing a 404 into the header of all 80+ pages. This matters more than usual here — a bad nav link is a sitewide error, not a single-page one.

**Header size.** The Dune Buggy and Desert Safari dropdowns already carry 8–9 items each. Because reordering is now one drag away, the menu will grow. Anything past ~10 items per dropdown should move to a "See all" pattern rather than a longer list.
