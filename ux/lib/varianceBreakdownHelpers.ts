import type { VarianceFactor } from "@/lib/varianceVisualizationData";
import { CHART_COLORS } from "@/lib/varianceVisualizationData";

export function formatVarianceVal(n: number) {
  const sign = n >= 0 ? "+" : "";
  return `${sign}$${Math.abs(n).toLocaleString()}`;
}

export function varianceBarColor(row: VarianceFactor): string {
  const v = row.variant ?? (row.value >= 0 ? "positive" : "negative");
  if (v === "warning") return CHART_COLORS.yellow;
  if (v === "negative") return CHART_COLORS.red;
  return CHART_COLORS.teal;
}
