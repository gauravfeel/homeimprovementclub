export const TESTIMONIALS = [
  {
    name: "Sarah M.",
    city: "Abbotsford",
    stars: 5,
    service: "Kitchen Renovation",
    quote:
      "We'd been putting off our kitchen for years because every contractor we called felt unreliable. Home Improvement Club was completely different — they showed up when they said they would, kept us updated throughout, and the result is beyond what we imagined. Our waterfall island is the centrepiece of the house now.",
  },
  {
    name: "Jason & Priya T.",
    city: "Langley",
    stars: 5,
    service: "HVAC & Heat Pump",
    quote:
      "We switched from baseboard heating to a heat pump through Home Improvement Club. They helped us understand exactly which BC Hydro and CleanBC rebates we qualified for, handled the paperwork process, and the install was clean and fast. Our heating bills have dropped noticeably.",
  },
  {
    name: "Mike R.",
    city: "Chilliwack",
    stars: 5,
    service: "Bathroom Renovation",
    quote:
      "The bathroom renovation came in on budget and on time, which honestly surprised me — every contractor I'd hired before ran over on both. The tile work is immaculate. I've already referred two neighbours.",
  },
  {
    name: "Linda K.",
    city: "Hope",
    stars: 5,
    service: "Flooring & Tile",
    quote:
      "We had a large open-concept area that needed new flooring throughout. The team was respectful of our home, protected everything during the work, and the large-format tile they laid looks like something out of a magazine. Very happy.",
  },
  {
    name: "David & Carol H.",
    city: "Abbotsford",
    stars: 5,
    service: "Exterior & Siding",
    quote:
      "From the first consultation to the final walkthrough, the whole process was handled professionally. Our home looks completely transformed from the outside. We've had so many compliments from neighbours.",
  },
  {
    name: "Ryan S.",
    city: "Langley",
    stars: 5,
    service: "Lighting & Electrical",
    quote:
      "Had pot lights installed throughout the main floor and a full panel upgrade. The crew was tidy, worked efficiently, and the electrician explained everything clearly. Exactly what we needed and no surprises on the invoice.",
  },
] as const;

export type Testimonial = (typeof TESTIMONIALS)[number];
