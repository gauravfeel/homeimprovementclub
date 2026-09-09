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

export const SERVICE_AREA = "Greater Vancouver and the Fraser Valley";
export const SERVICE_AREA_BC = `${SERVICE_AREA}, BC`;
export const SERVICE_AREA_LABEL = "Greater Vancouver · Fraser Valley";

export const AREA_SERVED_SCHEMA = [
  {
    "@type": "AdministrativeArea",
    name: "Greater Vancouver, British Columbia, Canada",
  },
  {
    "@type": "AdministrativeArea",
    name: "Fraser Valley, British Columbia, Canada",
  },
  ...SERVICE_CITIES.map((name) => ({ "@type": "City" as const, name })),
];
