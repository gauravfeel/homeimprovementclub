export const ESTIMATE_AREA_MIN = 1000;
export const ESTIMATE_AREA_MAX = 10000;
export const ESTIMATE_AREA_DEFAULT = 2500;
export const ESTIMATE_RATE_MIN = 150;
export const ESTIMATE_RATE_MAX = 700;
export const ESTIMATE_RATE_DEFAULT = 250;

export function estimateBuildCost(areaSqFt: number, ratePerSqFt: number) {
  return Math.round(areaSqFt * ratePerSqFt);
}

export function formatCad(amount: number) {
  return new Intl.NumberFormat("en-CA", {
    style: "currency",
    currency: "CAD",
    maximumFractionDigits: 0,
  }).format(amount);
}

export function formatSqFt(areaSqFt: number) {
  return `${new Intl.NumberFormat("en-CA").format(areaSqFt)} sq ft`;
}
