/* Location pages - SEO long-tail pickup routes.
   Mirrors the competitor's /locations/ cluster. */
export type Location = {
  slug: string; name: string; short: string; emirate: string;
  drive: string; intro: string; keywords: string[];
};

export const locations: Location[] = [
  { slug: 'dune-buggy-from-sharjah', name: 'Dune Buggy from Sharjah', short: 'Sharjah', emirate: 'Sharjah', drive: '40–55 min',
    intro: 'Dune buggy Sharjah pickup runs to our Al Awir base on the Dubai-Hatta road, then straight into the Lahbab red dunes. Confirm your exact Sharjah pickup point before the day and the transfer window stays tight.',
    keywords: ['dune buggy Sharjah','quad biking Sharjah','desert safari from Sharjah','buggy rental Sharjah'] },
  { slug: 'dune-buggy-from-abu-dhabi', name: 'Dune Buggy from Abu Dhabi', short: 'Abu Dhabi', emirate: 'Abu Dhabi', drive: '90–110 min',
    intro: 'Abu Dhabi guests usually pair a dune buggy Dubai session with a full day out. The drive to the Lahbab red dunes takes around 90 minutes, so morning departures work best.',
    keywords: ['dune buggy Abu Dhabi','quad biking from Abu Dhabi','desert safari Abu Dhabi to Dubai'] },
  { slug: 'dune-buggy-near-dubai-marina', name: 'Dune Buggy near Dubai Marina', short: 'Dubai Marina', emirate: 'Dubai', drive: '45–60 min',
    intro: 'Dune buggy Dubai Marina pickup is one of our most requested routes. Expect 45 to 60 minutes to the red dunes depending on traffic on Sheikh Zayed Road.',
    keywords: ['dune buggy Dubai Marina','quad biking Dubai Marina','desert safari Dubai Marina pickup'] },
  { slug: 'dune-buggy-near-downtown-dubai', name: 'Dune Buggy near Downtown Dubai', short: 'Downtown Dubai', emirate: 'Dubai', drive: '35–45 min',
    intro: 'Downtown Dubai is the closest major hotel cluster to our Al Awir base. Dune buggy Downtown Dubai pickups are typically 35 to 45 minutes each way.',
    keywords: ['dune buggy Downtown Dubai','quad biking near Burj Khalifa','desert safari Downtown Dubai'] },
  { slug: 'dune-buggy-near-palm-jumeirah', name: 'Dune Buggy near Palm Jumeirah', short: 'Palm Jumeirah', emirate: 'Dubai', drive: '50–65 min',
    intro: 'Palm Jumeirah and Atlantis guests reach the Lahbab red dunes in roughly an hour. Dune buggy Palm Jumeirah bookings suit late-afternoon slots for sunset light.',
    keywords: ['dune buggy Palm Jumeirah','quad biking near Atlantis','desert safari Palm Jumeirah pickup'] },
  { slug: 'dune-buggy-near-deira', name: 'Dune Buggy near Deira', short: 'Deira', emirate: 'Dubai', drive: '30–40 min',
    intro: 'Deira and old Dubai sit close to the Dubai-Hatta road, making this one of the quickest dune buggy Dubai pickup routes at roughly half an hour.',
    keywords: ['dune buggy Deira','quad biking Deira Dubai','desert safari Deira pickup'] },
  { slug: 'dune-buggy-from-ajman', name: 'Dune Buggy from Ajman', short: 'Ajman', emirate: 'Ajman', drive: '55–70 min',
    intro: 'Ajman pickups route through Sharjah to our Al Awir base. Allow an hour each way for a dune buggy Ajman transfer.',
    keywords: ['dune buggy Ajman','quad biking from Ajman','desert safari Ajman'] },
  { slug: 'dune-buggy-from-ras-al-khaimah', name: 'Dune Buggy from Ras Al Khaimah', short: 'Ras Al Khaimah', emirate: 'RAK', drive: '80–100 min',
    intro: 'Ras Al Khaimah is roughly 90 minutes from the Lahbab red dunes. RAK guests generally book longer sessions to make the drive worthwhile.',
    keywords: ['dune buggy Ras Al Khaimah','quad biking RAK','desert safari from RAK'] },
  { slug: 'dune-buggy-big-red-hatta-road', name: 'Dune Buggy at Big Red, Hatta Road', short: 'Big Red', emirate: 'Dubai', drive: '10–15 min',
    intro: 'Big Red sits further along the same Dubai-Hatta road as our base. If you know Big Red, the Lahbab red dunes are the quieter, redder alternative a few minutes back toward the city.',
    keywords: ['dune buggy Big Red','quad biking Big Red Dubai','Al Badayer dune buggy'] },
  { slug: 'dune-buggy-fossil-rock', name: 'Dune Buggy at Fossil Rock', short: 'Fossil Rock', emirate: 'Sharjah', drive: '30–40 min',
    intro: 'Fossil Rock routes suit longer sessions with more varied terrain than the pure dune belt. Ask about a Fossil Rock dune buggy route when you book two hours or more.',
    keywords: ['dune buggy Fossil Rock','quad biking Fossil Rock','Fossil Rock desert tour'] }
];
