import { GENERAL_FAQS } from "@/data/renovation";
import { SERVICES } from "@/data/services";
import { AREA_SERVED_SCHEMA, SITE_POSITIONING } from "@/lib/service-area";

export const SITE_ORIGIN = "https://homeimprovementclub.co";

/** GAF Emerald Pledge eligibility is unconfirmed; hide badge and schema until true. */
export const SHOW_GAF_EMERALD = false;

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
    {
      "@type": "EducationalOccupationalCredential",
      name: "GAF Certified Plus Contractor",
    },
    {
      "@type": "EducationalOccupationalCredential",
      name: "GAF Silver Pledge Limited Warranty",
    },
    ...(SHOW_GAF_EMERALD
      ? [
          {
            "@type": "EducationalOccupationalCredential",
            name: "GAF Emerald Pledge Limited Warranty",
          },
        ]
      : []),
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

// Makes the primary service pages explicit in the site's machine-readable
// structure. Google still chooses organic sitelinks, but this reinforces the
// same hierarchy exposed through the visible navigation and sitemap.
export const SERVICE_DIRECTORY_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  name: "Home Improvement Club services",
  url: `${SITE_ORIGIN}/services`,
  isPartOf: {
    "@type": "WebSite",
    name: "Home Improvement Club",
    url: `${SITE_ORIGIN}/`,
  },
  mainEntity: {
    "@type": "ItemList",
    name: "Home renovation services",
    itemListElement: SERVICES.map((service, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: service.title,
      url: `${SITE_ORIGIN}/services/${service.slug}`,
    })),
  },
};
