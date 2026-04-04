import type { DailyVarianceRow } from "@/lib/varianceChartData";

export function formatCur(n: number) {
  const sign = n >= 0 ? "" : "-";
  return `${sign}$${Math.abs(n).toLocaleString()}`;
}

/** Single sentence for the strip below the chart. */
export function weeklyVarianceInsight(daily: DailyVarianceRow[]): string {
  const worst = daily.reduce((a, b) => (a.cost < b.cost ? a : b));
  const best = daily.reduce((a, b) => (a.cost > b.cost ? a : b));
  return `${worst.day} shows the deepest cost hole (${formatCur(worst.cost)}); ${best.day} aligns best (${formatCur(best.cost)}).`;
}
