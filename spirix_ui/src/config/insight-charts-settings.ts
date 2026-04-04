/** Layout, copy, and sizing for variance insight charts (pie, outlet bars, trend). */

export const CATEGORY_PIE_CHART = {
  height: 300,
  innerRadius: 58,
  outerRadius: 96,
  paddingAngle: 2,
  strokeWidth: 2,
} as const;

export const CATEGORY_PIE_COPY = {
  title: "Category-wise variance",
  subtitle: "Share of absolute variance by category",
  badge: "Distribution",
  metrics: {
    categories: "Categories",
    topShare: "Largest share",
    totalAbs: "|Σ variance|",
    netHint: "Slice size = weight in mix",
  },
  tooltip: {
    variance: "Variance",
    weight: "Weight",
    share: "Of total abs.",
  },
} as const;

export const OUTLET_BAR_CHART = {
  height: 300,
  margin: { top: 16, right: 16, bottom: 8, left: 8 },
  barRadius: [8, 8, 0, 0] as [number, number, number, number],
  xDomainPad: 1.12,
} as const;

export const OUTLET_BAR_COPY = {
  title: "Outlet comparison",
  subtitle: "Negative variance by location · bars vs chain average",
  badge: "Outlets",
  metrics: {
    worst: "Weakest outlet",
    best: "Best vs avg",
    avgLine: "Chain avg",
    spread: "Range",
  },
  tooltip: { variance: "Variance", vsAvg: "vs average" },
} as const;

export const TREND_LINE_CHART = {
  height: 300,
  margin: { top: 12, right: 12, bottom: 8, left: 4 },
  strokeWidth: 2.5,
  dotRadius: 4,
} as const;

export const TREND_LINE_COPY = {
  title: "Variance trend (daily)",
  subtitle: "Closing position vs prior days · area shows depth",
  badge: "7-day",
  metrics: {
    latest: "Latest",
    weekAvg: "7-day avg",
    worstDay: "Worst day",
    bestDay: "Best day",
  },
  tooltip: {
    variance: "Variance",
    day: "Day",
    vsMean: "vs 7-day avg",
  },
} as const;
