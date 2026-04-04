/** Layout and sizing for the top-leakage chart — tweak without touching component code. */

export const LEAK_CHART = {
  height: 340,
  barMaxSize: 26,
  margin: { top: 20, right: 52, bottom: 12, left: 8 },
  yAxisWidth: 148,
  /** Extra headroom past max bar so labels fit */
  xDomainPad: 1.14,
  barRadius: [0, 8, 8, 0] as [number, number, number, number],
} as const;

export const LEAK_CHART_COPY = {
  title: "Top products by leakage",
  subtitle: "Ranked by absolute leakage · gradient shows severity tier",
  periodBadge: "Last 7 days",
  metrics: {
    total: "Total leakage",
    totalUnit: "bottle eq.",
    avgSku: "Avg per SKU",
    topShare: "Top SKU share",
    skuCount: "SKUs tracked",
  },
  tooltipTier: {
    critical: "Critical concentration",
    high: "High leakage",
    medium: "Elevated",
  },
  tooltip: {
    leakage: "Leakage",
    share: "Share of total",
    rank: "Rank",
    variance: "Variance",
    units: "units",
  },
} as const;
