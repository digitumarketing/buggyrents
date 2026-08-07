/* Google reviews. 17 verified 5-star reviews with text.
   5 pulled live from the Places API (7 Aug 2026) + 12 supplied by the client
   from the Google Business Profile dashboard. French-language review removed per client.
   Dates deliberately not stored or shown.

   The Places API caps at 5 reviews per request, so additional reviews are added here
   manually. Refresh the API subset with:
     GOOGLE_MAPS_API_KEY=xxx node scripts/fetch-google-reviews.mjs */

export type Review = {
  author: string;
  rating: number;
  text: string;
  avatar?: string;
  url?: string;
};

export const googleMeta = {
  placeId: 'ChIJo88Daad39T4RnM7myjfeJdQ',
  totalReviews: 41,
  averageRating: 4.9
};

export const reviews: Review[] = [
  { author: 'Glauco', rating: 5, text: 'The service offered by Ali is exceptional, very fun and safe. I recommend it to everyone visiting Dubai. The desert tour is fantastic! Don\'t miss it!' },
  { author: 'Rupang Shah', rating: 5, text: 'Great experience with them at the Dubai Sand Dunes - Highly recommend it to anyone looking for a unique experience in Dubai!' },
  { author: 'Camso Diallo', rating: 5, text: 'Very good ride. We enjoyed it. Thanks' },
  { author: 'jamal hakim', rating: 5, text: 'nice experience with such a bumpy and challenging route with beautiful sunset!!' },
  { author: 'Yusuf Slaimankhel', rating: 5, text: 'Was a really good and amazing experience, staff was also nice and helpful' },
  { author: 'Nalin Chandika De Silva', rating: 5, text: 'The best ride we ever had. Best service. Highly recommended. Love from Sri Lanka' },
  { author: 'Baby Alhamdou Ibrahim', rating: 5, text: 'Today I went to desert I did bike riding with my family it was good experience i will recommend for all tourists' },
  { author: 'Vaibhav Sharma', rating: 5, text: 'Today I booked for quad bike and it was a very good experience. Very good service and great bike. Thrilling and great experience.' },
  { author: 'amar powar', rating: 5, text: 'Had amazing experience on desert safari! Everything perfectly. Highly recommended. Mr Watto was best for pickup to drop off' },
  { author: 'Folashade Agbeke', rating: 5, text: 'Today I went to desert I did bike riding it was good experience I recommend you to book with them. Very friendly and worth every penny. I\'ll definitely come back again with my friends.' },
  { author: 'Adnan Khan', rating: 5, text: 'Today i booked the buggy tour and it was amazing. Cannot recommend this enough. Our driver Ali was kind and courteous and we were well looked after' },
  { author: 'Mike', rating: 5, text: 'Well arranged. Good support, good buggies. We really enjoyed ourselves.' },
  { author: 'jubin vaidya', rating: 5, text: 'It was a great experience with buggyrents.com. The driver was very pleasing and entertaining. They have new buggies and I recommend everybody to book and enjoy' },
  { author: 'abiola awobokun', rating: 5, text: 'Went with my kids and we had a lovely experience. Professional staff, safe and exciting. We had fun and will definitely come back.' },
  { author: 'Pervaiz Muhammad', rating: 5, text: 'It was very good experience with them. They are too much cooperative. I recommend all guys to book from them, you will remember this tour.' },
  { author: 'FAUSTIN KAMBERE', rating: 5, text: 'It was good experience buggy was they given me good service I recommend plz book tour with this company' },
  { author: 'INFORMATION CENTER', rating: 5, text: 'Very professional team and a well organised desert experience from pickup through to drop off.' }
];

export const fiveStarWithText = (list: Review[] = reviews) =>
  list.filter(r => r.rating === 5 && r.text && r.text.trim().length > 0);
