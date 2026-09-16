export const SERVICE_CITIES = [
  "Vancouver",
  "North Vancouver",
  "West Vancouver",
  "Burnaby",
  "New Westminster",
  "Coquitlam",
  "Richmond",
  "Surrey",
  "Maple Ridge",
  "Abbotsford",
  "Chilliwack",
] as const;

export const SERVICE_CITIES_PROSE = `${SERVICE_CITIES.slice(0, -1).join(", ")} and ${SERVICE_CITIES[SERVICE_CITIES.length - 1]}`;

export const SERVICE_AREA = "the Fraser Valley and Greater Vancouver";
export const SERVICE_AREA_BC = `${SERVICE_AREA}, BC`;
export const SERVICE_AREA_LABEL = "Fraser Valley · Greater Vancouver";
export const SITE_POSITIONING = "Fraser Valley's Premier Custom Home Builder";

export const AREA_SERVED_SCHEMA = [
  {
    "@type": "AdministrativeArea",
    name: "Fraser Valley, British Columbia, Canada",
  },
  {
    "@type": "AdministrativeArea",
    name: "Greater Vancouver, British Columbia, Canada",
  },
  ...SERVICE_CITIES.map((name) => ({ "@type": "City" as const, name })),
];
