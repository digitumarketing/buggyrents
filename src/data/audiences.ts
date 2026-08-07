/* Audience pages - who the ride is for.
   Mirrors the competitor's /audience/ cluster. */
export type Audience = {
  slug: string; name: string; short: string; pitch: string;
  vehicles: string; intro: string; keywords: string[];
};

export const audiences: Audience[] = [
  { slug: 'dune-buggy-for-families', name: 'Dune Buggy for Families', short: 'Families', pitch: 'One 4-seater keeps everyone together',
    vehicles: '4-seater buggy · kids quad from age 6',
    intro: 'A family dune buggy Dubai booking usually means one 4-seater Polaris so nobody sits out, plus a fenced kids quad area for younger children who want their own machine.',
    keywords: ['dune buggy for families Dubai','family desert safari Dubai','kids quad biking Dubai'] },
  { slug: 'dune-buggy-for-couples', name: 'Dune Buggy for Couples', short: 'Couples', pitch: 'A private 2-seater at golden hour',
    vehicles: '2-seater Polaris or Can-Am',
    intro: 'Couples dune buggy Dubai rides work best as a private 2-seater timed for late afternoon, when the Lahbab red dunes turn deep orange and the light is right for photos.',
    keywords: ['dune buggy for couples Dubai','romantic desert safari Dubai','couples buggy ride Dubai'] },
  { slug: 'dune-buggy-for-kids', name: 'Quad Biking for Kids', short: 'Kids', pitch: 'Fenced area, from age 6',
    vehicles: '70–90cc kids quad',
    intro: 'Kids quad biking Dubai runs in a fenced area away from the main dunes, on 70 to 90cc machines, from age six. Helmets and a briefing are included and a guide stays with the group.',
    keywords: ['kids quad biking Dubai','quad bike for kids Dubai','children desert activities Dubai'] },
  { slug: 'dune-buggy-for-corporate', name: 'Dune Buggy for Corporate Groups', short: 'Corporate', pitch: 'Multi-vehicle staging, one invoice',
    vehicles: 'Multi-vehicle convoy',
    intro: 'Corporate desert activities Dubai need matched vehicles, a fixed window and one point of contact. Send group size and date and we will stage the convoy so nobody waits at the base.',
    keywords: ['corporate desert safari Dubai','team building desert Dubai','corporate dune buggy Dubai'] },
  { slug: 'dune-buggy-bachelor-party', name: 'Dune Buggy for Bachelor Parties', short: 'Bachelor parties', pitch: 'Can-Am convoy, then camp',
    vehicles: 'Can-Am X3 · Raptor 700',
    intro: 'A bachelor party dune buggy Dubai run usually means Can-Am Maverick X3s in convoy, an hour in the dunes, then a BBQ camp stop. Book early for weekend slots.',
    keywords: ['bachelor party Dubai desert','stag do dune buggy Dubai','group buggy Dubai'] },
  { slug: 'dune-buggy-honeymoon', name: 'Dune Buggy for Honeymooners', short: 'Honeymoon', pitch: 'Private, unhurried, sunset timed',
    vehicles: 'Private 2-seater',
    intro: 'Honeymoon desert Dubai bookings are private by default: your own buggy, your own guide, sunset timing, and photo stops that are not rushed by a shared schedule.',
    keywords: ['honeymoon desert safari Dubai','romantic dune buggy Dubai','private desert tour Dubai'] },
  { slug: 'solo-female-buggy-dubai', name: 'Solo Female Riders', short: 'Solo travellers', pitch: 'Guided, never left alone',
    vehicles: 'Any vehicle',
    intro: 'Solo female travellers ride in a guided group with a lead guide and a sweep. You are never sent into the dunes unaccompanied, and the base is staffed throughout.',
    keywords: ['solo female desert safari Dubai','solo traveller dune buggy Dubai','safe desert tour Dubai'] },
  { slug: 'dune-buggy-for-beginners', name: 'Dune Buggy for Beginners', short: 'First-timers', pitch: 'Start on a Polaris, 30 minutes',
    vehicles: 'Polaris RZR 2-seater',
    intro: 'First time dune buggy Dubai? Start with a Polaris RZR 1000 for 30 minutes. It is stable, forgiving, and enough to know whether you want the hour next time.',
    keywords: ['dune buggy for beginners Dubai','first time quad biking Dubai','easy desert activity Dubai'] }
];
