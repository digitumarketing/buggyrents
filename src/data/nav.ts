export type NavItem = { label: string; href: string; children?: { label: string; href: string }[] };

export const mainNav: NavItem[] = [
  { label: 'Dune Buggy', href: '/dune-buggy-dubai/', children: [
    { label: 'All buggies', href: '/dune-buggy-dubai/' },
    { label: 'Polaris RZR 2-Seater', href: '/dune-buggy-dubai/polaris-rzr-1000-2-seater/' },
    { label: 'Polaris RZR 4-Seater', href: '/dune-buggy-dubai/polaris-rzr-1000-4-seater/' },
    { label: 'Can-Am X3 2-Seater', href: '/dune-buggy-dubai/can-am-maverick-x3-2-seater/' },
    { label: 'Can-Am X3 4-Seater', href: '/dune-buggy-dubai/can-am-maverick-x3-4-seater/' },
    { label: 'Can-Am Maverick R', href: '/dune-buggy-dubai/can-am-maverick-r-turbo/' },
    { label: 'Prices', href: '/dune-buggy-dubai/price/' },
    { label: 'FAQ', href: '/dune-buggy-dubai/faq/' }
  ]},
  { label: 'Quad Bike', href: '/quad-bike-dubai/', children: [
    { label: 'All quads', href: '/quad-bike-dubai/' },
    { label: 'Kids Quad', href: '/quad-bike-dubai/kids-quad-biking/' },
    { label: 'Single Seat - Boundary', href: '/quad-bike-dubai/single-seat-boundary/' },
    { label: 'Double Seat - Boundary', href: '/quad-bike-dubai/double-seat-boundary/' },
    { label: 'Single Seat - Open Desert', href: '/quad-bike-dubai/single-seat-open-desert/' },
    { label: 'Double Seat - Open Desert', href: '/quad-bike-dubai/double-seat-open-desert/' },
    { label: 'Yamaha Raptor 700cc', href: '/quad-bike-dubai/yamaha-raptor-700cc/' },
    { label: 'Prices', href: '/quad-bike-dubai/price/' },
    { label: 'FAQ', href: '/quad-bike-dubai/faq/' }
  ]},
  { label: 'Dirt Bike', href: '/ktm-dirt-bike-dubai/', children: [
    { label: 'Dirt bike tours', href: '/ktm-dirt-bike-dubai/' },
    { label: 'KTM 450', href: '/ktm-dirt-bike-dubai/ktm-450-dirt-bike/' },
    { label: 'For beginners', href: '/ktm-dirt-bike-dubai/dirt-bike-for-beginners/' },
    { label: 'For advanced riders', href: '/ktm-dirt-bike-dubai/dirt-bike-for-advanced/' },
    { label: 'Prices', href: '/ktm-dirt-bike-dubai/price/' }
  ]},
  { label: 'Desert Safari', href: '/desert-safari-dubai/', children: [
    { label: 'All safaris', href: '/desert-safari-dubai/' },
    { label: 'Evening Safari', href: '/desert-safari-dubai/evening-desert-safari/' },
    { label: 'Morning Safari', href: '/desert-safari-dubai/morning-desert-safari/' },
    { label: 'Overnight Safari', href: '/desert-safari-dubai/overnight-desert-safari/' },
    { label: 'Private and VIP', href: '/desert-safari-dubai/private-desert-safari/' },
    { label: 'Quad Bike Safari', href: '/desert-safari-dubai/quad-bike-desert-safari/' },
    { label: 'Dune Buggy Safari', href: '/desert-safari-dubai/dune-buggy-desert-safari/' },
    { label: 'Red Dunes, Lahbab', href: '/desert-safari-dubai/red-dune-desert-safari/' },
    { label: 'Prices', href: '/desert-safari-dubai/price/' },
    { label: 'FAQ', href: '/desert-safari-dubai/faq/' }
  ]},
  { label: 'About', href: '/about-us/', children: [
    { label: 'About us', href: '/about-us/' },
    { label: 'Our fleet', href: '/about-us/our-fleet/' },
    { label: 'Safety standards', href: '/about-us/safety-standards/' },
    { label: 'Refund policy', href: '/about-us/refund-policy/' }
  ]},
  { label: 'Contact', href: '/contact/' },
  { label: 'Guides', href: '/blogs/' }
];

export const footerNav = {
  Tours: [
    { label: 'Dune buggy Dubai', href: '/dune-buggy-dubai/' },
    { label: 'Quad bike Dubai', href: '/quad-bike-dubai/' },
    { label: 'KTM dirt bike Dubai', href: '/ktm-dirt-bike-dubai/' },
    { label: 'Desert safari', href: '/desert-safari-dubai/' }
  ],
  Prices: [
    { label: 'Buggy prices', href: '/dune-buggy-dubai/price/' },
    { label: 'Quad prices', href: '/quad-bike-dubai/price/' },
    { label: 'Safari prices', href: '/desert-safari-dubai/price/' },
    { label: 'Dirt bike prices', href: '/ktm-dirt-bike-dubai/price/' },
    { label: 'Buggy FAQ', href: '/dune-buggy-dubai/faq/' },
    { label: 'Quad FAQ', href: '/quad-bike-dubai/faq/' },
    { label: 'Safari FAQ', href: '/desert-safari-dubai/faq/' }
  ],
  Company: [
    { label: 'About us', href: '/about-us/' },
    { label: 'Guides', href: '/blogs/' },
    { label: 'Our fleet', href: '/about-us/our-fleet/' },
    { label: 'Safety standards', href: '/about-us/safety-standards/' },
    { label: 'Contact', href: '/contact/' }
  ],
  Legal: [
    { label: 'Privacy policy', href: '/about-us/privacy-policy/' },
    { label: 'Terms & conditions', href: '/about-us/terms-conditions/' },
    { label: 'Refund policy', href: '/about-us/refund-policy/' },
    { label: 'Sitemap', href: '/sitemap-html/' }
  ]
};
