import { GENERAL_FAQS } from "@/data/renovation";
import { AREA_SERVED_SCHEMA, SITE_POSITIONING } from "@/lib/service-area";

export const SITE_ORIGIN = "https://homeimprovementclub.co";

export const HOME_BUSINESS_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "HomeAndConstructionBusiness",
  name: "Home Improvement Club",
  alternateName: "HIC",
  slogan: SITE_POSITIONING,
  url: `${SITE_ORIGIN}/`,
  telephone: "+1-236-380-4423",
  email: "homeimprovementclub.co@gmail.com",
  image: `${SITE_ORIGIN}/hic-social.jpg`,
  logo: `${SITE_ORIGIN}/hic-logo.png`,
  areaServed: AREA_SERVED_SCHEMA,
  knowsAbout: [
    "Custom home construction",
    "Multiplex housing",
    "Home renovation",
    "Kitchen and bathroom renovation",
  ],
  openingHoursSpecification: {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
    opens: "09:00",
    closes: "18:00",
  },
  hasCredential: [
    { "@type": "EducationalOccupationalCredential", name: "WBI Home Warranty" },
    { "@type": "EducationalOccupationalCredential", name: "BC Housing" },
    {
      "@type": "EducationalOccupationalCredential",
      name: "2-5-10 Year Warranty",
    },
  ],
  contactPoint: {
    "@type": "ContactPoint",
    telephone: "+1-236-380-4423",
    contactType: "customer service",
    areaServed: "CA-BC",
    availableLanguage: "English",
  },
};

export const FAQ_PAGE_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: GENERAL_FAQS.map((faq) => ({
    "@type": "Question",
    name: faq.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: faq.answer,
    },
  })),
};
