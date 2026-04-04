import { CHART_COLORS } from "@/lib/varianceVisualizationData";

/** Copy & timing for marketing “variance in real time” section — single source, no hardcoding in components. */
export const analyticsVariance = {
  sectionIntro:
    "Expected stock (from sales & purchases) is compared to your physical count. The gap is variance—the charts below show typical drivers and SKU-level drift.",
  tickerIntervalMs: 8000,
  tickerHeadline: "Live variance stream",
  /** Rotating lines shown next to the pulse (demo metrics). */
  tickerLines: [
    { label: "Unexplained gap", value: "−$5.1k vs book" },
    { label: "Hot SKU drift", value: "3 of 5 below target" },
    { label: "Last reconciliation", value: "Synced 12s ago" },
  ] as const,
  breakdown: {
    title: "What explains the gap",
    subtitle: "Dollar impact of each driver vs your book baseline (negative = less on hand).",
    axisLess: "Less on hand",
    axisMore: "More on hand",
    legend: [
      { key: "loss", label: "Loss / shrink", color: CHART_COLORS.red },
      { key: "warn", label: "Adjustment", color: CHART_COLORS.yellow },
      { key: "gain", label: "Found / gain", color: CHART_COLORS.teal },
    ] as const,
  },
  bullet: {
    title: "Where SKUs sit vs par",
    subtitle: "Gray band = target (par). Bar = counted on hand. Color = vs target.",
    legendTarget: "Target (par)",
    legendActual: "Actual count",
  },
} as const;
