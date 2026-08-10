import { config, collection, singleton, fields } from '@keystatic/core';

/* Badge and blurb used to be looked up in code from a hardcoded table keyed by the
   duration label ("30 minutes", "1 hour", …). That worked for the durations we
   shipped and failed the moment the client added one: a new "2 Hour" row matched
   no key, so the card on the tour page rendered the fallback badge "Option" above
   an empty paragraph. The copy belongs with the price it describes, so it is now
   entered in the CMS alongside it and the card can never be half-built again. */
const durationField = fields.array(
  fields.object({
    label:   fields.text({ label: 'Duration label', description: 'Exactly as it should read on the page, e.g. "2 hours".', defaultValue: '30 minutes' }),
    minutes: fields.integer({ label: 'Minutes', defaultValue: 30 }),
    price:   fields.integer({ label: 'Price (AED)', defaultValue: 0 }),
    badge:   fields.text({ label: 'Card badge', description: 'Short tag above the duration, e.g. "Entry ride", "Most balanced".', defaultValue: '' }),
    blurb:   fields.text({ label: 'Card description', description: 'One or two sentences on who this duration suits. Shown under the badge.', multiline: true, defaultValue: '' })
  }),
  { label: 'Durations & prices', itemLabel: p => `${p.fields.label.value} — AED ${p.fields.price.value}` }
);

const vehicle = (label: string, path: string) =>
  collection({
    label,
    slugField: 'name',
    path: `src/content/${path}/*`,
    format: { data: 'json' },
    schema: {
      name:      fields.slug({ name: { label: 'Name' } }),
      shortName: fields.text({ label: 'Short name' }),
      engine:    fields.text({ label: 'Engine' }),
      seats:     fields.integer({ label: 'Seats', defaultValue: 2 }),
      minAge:    fields.integer({ label: 'Minimum age', defaultValue: 18 }),
      area:      fields.text({ label: 'Riding area' }),
      image:     fields.text({ label: 'Image path' }),
      /* Optional. Left blank, the page falls back to the shared hero for its
         category, which is why all eleven buggy pages currently open with the same
         photo. There is exactly one buggy hero in the library at a usable size, so
         this cannot be fixed in code: it needs landscape photography at 2000px or
         wider, one per machine. The field is here so that the day those arrive the
         client can assign them without a developer. */
      heroImage: fields.text({ label: 'Hero image path (optional)', description: 'Leave blank to use the category hero. Needs to be at least 1600px wide.', defaultValue: '' }),
      blurb:     fields.text({ label: 'Short description', multiline: true }),
      durations: durationField,
      featured:  fields.checkbox({ label: 'Show on homepage', defaultValue: false }),
      /* JSON has no inherent order. Without this the fleet re-sorts alphabetically
         on every build and the cheapest machine stops being first on the page. */
      order:     fields.integer({ label: 'Display order', defaultValue: 99 })
    }
  });

export default config({
  /* GitHub mode, not local. In local mode the CMS only ever runs on one laptop and
     writes to that machine's disk, which is why nothing the client did would have
     reached the site. In GitHub mode every save is a commit to the repo, Cloudflare
     rebuilds, and the change is live in about two minutes.

     The nine build audits still apply, because they run on the built HTML rather
     than the source. A CMS edit that breaks a rule fails the deploy and the live
     site keeps serving the previous version. That is the safe outcome, but it is
     silent, so see CLIENT-GUIDE.md for what each failure means. */
  storage: {
    kind: 'github',
    repo: { owner: 'digitumarketing', name: 'buggyrents' }
  },
  ui: { brand: { name: 'Buggy Rents' } },
  collections: {
    buggies:   vehicle('Dune buggies', 'buggies'),
    quads:     vehicle('Quad bikes', 'quads'),
    dirtbikes: vehicle('Dirt bikes', 'dirtbikes'),
    safari: collection({
      label: 'Desert safari packages',
      slugField: 'name',
      path: 'src/content/safari/*',
      format: { data: 'json' },
      schema: {
        name:     fields.slug({ name: { label: 'Package name' } }),
        group:    fields.select({
          label: 'Type',
          description: 'Shared packages are priced per person. Private packages are priced per vehicle.',
          options: [
            { label: 'Shared 4x4', value: 'shared' },
            { label: 'Private', value: 'private' }
          ],
          defaultValue: 'shared'
        }),
        vehicle:  fields.text({ label: 'Vehicle' }),
        capacity: fields.text({ label: 'Capacity' }),
        duration: fields.text({ label: 'Duration' }),
        priceLabel: fields.text({
          label: 'Price basis',
          description: 'Printed on every card. "Per person" or "Private Land Cruiser". Getting this wrong shows a group a per person price as if it were the total.',
          defaultValue: 'Per person'
        }),
        price:    fields.integer({ label: 'Price (AED)', defaultValue: 0 }),
        was:      fields.integer({ label: 'Former price (AED), optional' }),
        image:    fields.text({ label: 'Image key' }),
        blurb:    fields.text({ label: 'Short description', multiline: true }),
        includes: fields.array(fields.text({ label: 'Item' }), {
          label: 'What is included', itemLabel: p => p.value
        }),
        featured: fields.checkbox({ label: 'Feature this package', defaultValue: false }),
        order:    fields.integer({ label: 'Display order', defaultValue: 99 })
      }
    }),
    /* Blog articles.
       The only collection that is Markdoc rather than JSON, because it is the only
       one the client actually WRITES rather than fills in: headings, bold, links,
       lists and tables in an editor instead of HTML typed into a textarea.
       Everything that feeds structured data (the FAQ pairs) stays as fields, since
       Google needs question and answer separately and prose cannot be split back
       apart reliably. */
    posts: collection({
      label: 'Blog articles',
      slugField: 'title',
      path: 'src/content/posts/*',
      format: { contentField: 'body' },
      entryLayout: 'content',
      columns: ['title', 'date'],
      schema: {
        title:   fields.slug({
          name: { label: 'Title', description: 'Also the h1. Put the target keyword in it, in natural language.' },
          slug: { label: 'URL slug', description: 'Changing this breaks any link to the old address. Leave it alone once published.' }
        }),
        excerpt: fields.text({ label: 'Excerpt', description: 'Used as the meta description and on the guide cards. Aim for 150 to 160 characters.', multiline: true }),
        date:    fields.text({ label: 'Date', description: 'YYYY-MM-DD.', defaultValue: '' }),
        category: fields.select({
          label: 'Topic',
          options: [
            { label: 'Dune buggy', value: 'buggy' },
            { label: 'Quad bike', value: 'quad' },
            { label: 'Desert safari', value: 'safari' },
            { label: 'Planning', value: 'planning' }
          ],
          defaultValue: 'planning'
        }),
        /* Separate from the topic on purpose: an article filed under Planning can
           still be illustrated with buggy photos. img() checks this at build time,
           so a quad article can never show a buggy by accident. */
        subject: fields.select({
          label: 'Photo subject',
          description: 'Which part of the library the images must come from. The build fails if an image does not match.',
          options: [
            { label: 'Dune buggy', value: 'buggy' },
            { label: 'Quad bike', value: 'quad' },
            { label: 'Dirt bike', value: 'dirtbike' },
            { label: 'Desert safari', value: 'safari' }
          ],
          defaultValue: 'buggy'
        }),
        heroImage:  fields.text({ label: 'Hero image key' }),
        image:      fields.text({ label: 'Card and article image key' }),
        finalImage: fields.text({ label: 'Closing CTA image key' }),
        keyword:    fields.text({ label: 'Target keyword', description: 'Never shown on the page. It is here so you can see what this article is meant to rank for before rewriting the title.' }),
        intro:      fields.text({ label: 'Opening paragraph', description: 'Sits above Key takeaways.', multiline: true }),
        takeaways:  fields.array(fields.text({ label: 'Takeaway' }), {
          label: 'Key takeaways', itemLabel: p => p.value
        }),
        body: fields.markdoc({ label: 'Article body' }),
        faqs: fields.array(
          fields.object({
            q: fields.text({ label: 'Question' }),
            a: fields.text({ label: 'Answer', multiline: true })
          }),
          { label: 'Frequently asked questions', itemLabel: p => p.fields.q.value }
        ),
        closing:       fields.text({ label: 'Closing line', description: 'Last paragraph of the article. HTML links are allowed here.', multiline: true }),
        helpTitle:     fields.text({ label: 'Help panel heading' }),
        helpText:      fields.text({ label: 'Help panel text', multiline: true }),
        helpMessage:   fields.text({ label: 'Help panel WhatsApp message', multiline: true }),
        helpHref:      fields.text({ label: 'Help panel link URL' }),
        helpLinkLabel: fields.text({ label: 'Help panel link text' }),
        finalH2:       fields.text({ label: 'Final CTA heading' }),
        finalLede:     fields.text({ label: 'Final CTA text', multiline: true })
      }
    }),
    faqs: collection({
      label: 'FAQs',
      slugField: 'question',
      path: 'src/content/faqs/*',
      format: { data: 'json' },
      schema: {
        question: fields.slug({ name: { label: 'Question' } }),
        answer:   fields.text({ label: 'Answer', multiline: true }),
        category: fields.select({
          label: 'Category',
          options: [
            { label: 'Dune buggy', value: 'buggy' },
            { label: 'Quad bike', value: 'quad' },
            { label: 'Dirt bike', value: 'dirtbike' },
            { label: 'General', value: 'general' }
          ],
          defaultValue: 'general'
        })
      }
    })
  },
  singletons: {
    settings: singleton({
      label: 'Site settings',
      path: 'src/content/settings',
      format: { data: 'json' },
      schema: {
        phone:    fields.text({ label: 'Phone', defaultValue: '+971 56 209 5713' }),
        whatsapp: fields.text({ label: 'WhatsApp number', defaultValue: '971562095713' }),
        email:    fields.text({ label: 'Email', defaultValue: 'Buggyrents@gmail.com' }),
        address:  fields.text({ label: 'Address', defaultValue: 'Dubai-Hatta Rd, Al Awir Second, Dubai, UAE' })
      }
    })
  }
});
