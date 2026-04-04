/** Demo metrics — replace with API responses. */

export const DEMO_SUMMARY = {
  totalSales: 184_200,
  totalPurchases: 96_400,
  expectedClosing: 12_450,
  physicalStock: 11_980,
  variance: -470,
} as const;

/** Labels for summary cards — `iconShellClass` uses theme-aware Tailwind utilities. */
export const DEMO_SUMMARY_META = [
  {
    key: "sales",
    label: "Total sales",
    format: "currency" as const,
    sub: "1,245 orders",
    change: "+18.2%",
    trend: "up" as const,
    iconShellClass:
      "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400",
  },
  {
    key: "purchases",
    label: "Total purchases",
    format: "currency" as const,
    sub: "142 line items",
    change: "+12.4%",
    trend: "up" as const,
    iconShellClass: "bg-blue-500/15 text-blue-600 dark:text-blue-400",
  },
  {
    key: "expected",
    label: "Expected closing",
    format: "currency" as const,
    sub: "487 bottles eq.",
    change: "-5.2%",
    trend: "down" as const,
    iconShellClass:
      "bg-amber-500/15 text-amber-600 dark:text-amber-400",
  },
  {
    key: "physical",
    label: "Physical stock (app)",
    format: "currency" as const,
    sub: "Synced today",
    change: "Live",
    trend: "up" as const,
    iconShellClass: "bg-primary/15 text-primary",
  },
  {
    key: "variance",
    label: "Variance",
    format: "variance" as const,
    sub: "42 bottles short",
    change: "Critical",
    trend: "down" as const,
    iconShellClass: "bg-destructive/15 text-destructive",
  },
];

export const DEMO_FLOW_STEPS = [
  { key: "opening", label: "Opening", value: 10_200, delta: 0 },
  { key: "purchase", label: "Purchase", value: 96_400, delta: 1 },
  { key: "sales", label: "Sales", value: -88_100, delta: -1 },
  { key: "nc", label: "NC", value: -3_200, delta: -1 },
  { key: "cancelled", label: "Cancelled", value: -1_850, delta: -1 },
  { key: "expected", label: "Expected", value: 12_450, delta: 0 },
  { key: "physical", label: "Physical (app)", value: 11_980, delta: 0 },
] as const;

export type StockRow = {
  item: string;
  category: "Whisky" | "Beer" | "Wine";
  opening: number;
  purchase: number;
  sales: number;
  nc: number;
  cancelled: number;
  expected: number;
  physical: number;
  variance: number;
};

export const DEMO_STOCK_ROWS: StockRow[] = [
  {
    item: "Premium Whisky 750ml",
    category: "Whisky",
    opening: 120,
    purchase: 48,
    sales: 52,
    nc: 3,
    cancelled: 2,
    expected: 111,
    physical: 108,
    variance: -3,
  },
  {
    item: "Lager 650ml",
    category: "Beer",
    opening: 400,
    purchase: 200,
    sales: 380,
    nc: 12,
    cancelled: 8,
    expected: 200,
    physical: 195,
    variance: -5,
  },
  {
    item: "Red Wine 750ml",
    category: "Wine",
    opening: 85,
    purchase: 40,
    sales: 38,
    nc: 2,
    cancelled: 1,
    expected: 84,
    physical: 88,
    variance: 4,
  },
  {
    item: "Single Malt 700ml",
    category: "Whisky",
    opening: 42,
    purchase: 24,
    sales: 18,
    nc: 1,
    cancelled: 0,
    expected: 47,
    physical: 44,
    variance: -3,
  },
  {
    item: "Craft Ale 500ml",
    category: "Beer",
    opening: 220,
    purchase: 0,
    sales: 210,
    nc: 4,
    cancelled: 3,
    expected: 3,
    physical: 5,
    variance: 2,
  },
];

export const CATEGORY_BAR_DATA = [
  { name: "Whisky", variance: -420 },
  { name: "Beer", variance: -180 },
  { name: "Wine", variance: 130 },
];

/** Pie segments — `value` is abs weight for Recharts. */
export const CATEGORY_PIE_DATA = [
  { name: "Whisky", variance: -145, value: 145, fill: "var(--chart-1)" },
  { name: "Vodka", variance: -89, value: 89, fill: "var(--chart-2)" },
  { name: "Rum", variance: -67, value: 67, fill: "var(--chart-3)" },
  { name: "Beer", variance: -28, value: 28, fill: "var(--chart-4)" },
  { name: "Wine", variance: -15, value: 15, fill: "var(--chart-5)" },
];

export const OUTLET_BAR_DATA = [
  { name: "MG Road", variance: -210 },
  { name: "Indiranagar", variance: -150 },
  { name: "Koramangala", variance: -110 },
];

export const TREND_LINE_DATA = [
  { day: "Mon", variance: -120 },
  { day: "Tue", variance: -280 },
  { day: "Wed", variance: -190 },
  { day: "Thu", variance: -310 },
  { day: "Fri", variance: -470 },
  { day: "Sat", variance: -340 },
  { day: "Sun", variance: -470 },
];

export const TOP_LEAK_ITEMS = [
  { name: "Premium Whisky 750ml", variance: -320, value: 320 },
  { name: "Lager 650ml", variance: -210, value: 210 },
  { name: "Single Malt 700ml", variance: -180, value: 180 },
  { name: "Red Wine 750ml", variance: -95, value: 95 },
  { name: "Craft Ale 500ml", variance: -72, value: 72 },
];

export const DEMO_ALERTS = [
  {
    id: "a1",
    severity: "critical" as const,
    category: "Leakage",
    time: "10 mins ago",
    title: "High negative variance detected",
    detail: "Overall pipeline shows -470 units vs physical count.",
  },
  {
    id: "a2",
    severity: "warning" as const,
    category: "Stock movement",
    time: "1 hour ago",
    title: "Sudden stock drop",
    detail: "Premium Whisky segment −8% vs rolling expectation.",
  },
  {
    id: "a3",
    severity: "warning" as const,
    category: "Transactions",
    time: "2 hours ago",
    title: "High cancelled bills",
    detail: "Cancelled volume 12% above 7-day average.",
  },
  {
    id: "a4",
    severity: "info" as const,
    category: "Operations",
    time: "3 hours ago",
    title: "Elevated NC entries",
    detail: "Beer segment NC +15% vs last week.",
  },
];

export const OUTLET_OPTIONS = [
  { id: "all", label: "All outlets" },
  { id: "mg", label: "MG Road" },
  { id: "ind", label: "Indiranagar" },
  { id: "kor", label: "Koramangala" },
] as const;
