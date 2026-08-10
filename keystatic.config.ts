import { config, collection, singleton, fields } from '@keystatic/core';

const durationField = fields.array(
  fields.object({
    label:   fields.text({ label: 'Duration label', defaultValue: '30 minutes' }),
    minutes: fields.integer({ label: 'Minutes', defaultValue: 30 }),
    price:   fields.integer({ label: 'Price (AED)', defaultValue: 0 })
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
