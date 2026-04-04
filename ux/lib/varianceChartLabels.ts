/** Copy for Product “Analytics at a glance” chart — edit here, not in components. */
export const varianceChartUi = {
  metrics: {
    units: "Units",
    cost: "Cost",
    retail: "Retail",
  },
  legend: {
    bars: "Bars: physical delta (selected metric)",
    costLine: "Solid: cost variance path",
    retailLine: "Dashed: retail value path",
  },
  kpi: {
    net: { title: "Net cost variance", hint: "Book vs. physical — inventory $." },
    revenue: { title: "Potential revenue impact", hint: "Selling price of variance volume." },
    rate: { title: "Shrinkage rate", hint: "Flagged movement vs. throughput." },
  },
  tooltip: {
    physical: "Physical delta",
    cost: "Inventory cost",
    retail: "Retail value",
  },
  axisFootnote: "Week — daily variance snapshot",
} as const;
