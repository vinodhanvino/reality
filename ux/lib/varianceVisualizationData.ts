/** Waterfall: System inventory → variance factors → Physical Stock */
export type WaterfallStep = {
  name: string;
  value: number;
  /** Cumulative after this step */
  end: number;
  /** positive = teal, negative = red, warning = yellow */
  variant?: "positive" | "negative" | "warning";
};

export const defaultWaterfallData: WaterfallStep[] = [
  { name: "Book Value", value: 50000, end: 50000 },
  { name: "Receiving Errors", value: -800, end: 49200, variant: "negative" },
  { name: "Shipping Errors", value: -1200, end: 48000, variant: "negative" },
  { name: "Damaged Goods", value: -600, end: 47400, variant: "negative" },
  { name: "Expired Items", value: -400, end: 47000, variant: "negative" },
  { name: "Shrinkage / Theft", value: -2200, end: 44800, variant: "negative" },
  { name: "Manual Adjustments", value: 300, end: 45100, variant: "warning" },
  { name: "Counting Variance", value: -200, end: 44900, variant: "negative" },
  { name: "Physical Stock", value: 0, end: 44900 },
];

/** Diverging breakdown: factor name + $ impact (no cumulative). For "why system differs from physical". */
export type VarianceFactor = {
  name: string;
  value: number;
  variant?: "positive" | "negative" | "warning";
};

/** Book baseline ($) — shown outside the diverging bars so scale matches drivers. */
export const bookBaselineUsd = 50_000;

export function physicalStockFromDrivers(
  bookUsd: number,
  drivers: VarianceFactor[]
): number {
  return bookUsd + drivers.reduce((s, d) => s + d.value, 0);
}

/** Only variance drivers (not book); keeps bar scale readable. */
export const varianceBreakdownData: VarianceFactor[] = [
  { name: "Receiving Errors", value: -800, variant: "negative" },
  { name: "Shipping Errors", value: -1200, variant: "negative" },
  { name: "Damaged Goods", value: -600, variant: "negative" },
  { name: "Expired Items", value: -400, variant: "negative" },
  { name: "Shrinkage / Theft", value: -2200, variant: "negative" },
  { name: "Manual Adjustments", value: 300, variant: "warning" },
  { name: "Counting Variance", value: -200, variant: "negative" },
];

/** Bullet: SKU name, target, actual. Color: &lt;90% red, &gt;105% yellow, else cyan */
export type BulletSKU = {
  sku: string;
  target: number;
  actual: number;
};

export const defaultBulletData: BulletSKU[] = [
  { sku: "Jack Daniel's 750ml", target: 24, actual: 22 },
  { sku: "Smirnoff Vodka 1L", target: 18, actual: 19 },
  { sku: "Bacardi White 750ml", target: 20, actual: 16 },
  { sku: "Corona 12pk", target: 40, actual: 42 },
  { sku: "House Wine Cab", target: 12, actual: 11 },
];

export const CHART_COLORS = {
  teal: "#14B8A6",
  cyan: "#2BC0D3",
  red: "#D33F3F",
  yellow: "#EAB308",
  targetBg: "rgba(255,255,255,0.08)",
} as const;
