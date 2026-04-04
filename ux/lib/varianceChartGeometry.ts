import type { DailyVarianceRow } from "@/lib/varianceChartData";

export type MetricMode = "units" | "cost" | "retail";

export const CHART_PAD = { top: 20, right: 12, bottom: 36, left: 52 } as const;
export const CHART_H = 300;
export const INNER_W = 560;

export function metricValue(row: DailyVarianceRow, m: MetricMode): number {
  if (m === "units") return row.units;
  if (m === "cost") return row.cost;
  return row.retail;
}

export type VarianceLayout = {
  chartW: number;
  zeroY: number;
  stepX: number;
  barW: number;
  scaleBar: (v: number) => number;
  scaleLine: (v: number) => number;
  costPath: string;
  retailPath: string;
  maxBar: number;
  maxLine: number;
};

export function buildVarianceLayout(
  daily: DailyVarianceRow[],
  metric: MetricMode
): VarianceLayout {
  const chartW = INNER_W - CHART_PAD.left - CHART_PAD.right;
  const chartInnerH = CHART_H - CHART_PAD.top - CHART_PAD.bottom;
  const zeroY = CHART_PAD.top + chartInnerH / 2;

  const vals = daily.map((d) => metricValue(d, metric));
  const maxBar = Math.max(...vals.map((v) => Math.abs(v)), 1) * 1.12;
  const scaleBar = (v: number) => (v / maxBar) * (chartInnerH / 2) * 0.92;

  const costs = daily.map((d) => d.cost);
  const retails = daily.map((d) => d.retail);
  const maxLine = Math.max(
    ...costs.map((c) => Math.abs(c)),
    ...retails.map((r) => Math.abs(r)),
    1
  ) * 1.08;
  const scaleLine = (v: number) => (v / maxLine) * (chartInnerH / 2) * 0.92;

  const stepX = chartW / (daily.length + 1);
  const barW = stepX * 0.52;

  const linePath = (key: "cost" | "retail") =>
    "M " +
    daily
      .map((d, i) => {
        const x = CHART_PAD.left + stepX * (i + 1);
        const v = key === "cost" ? d.cost : d.retail;
        const y = zeroY - scaleLine(v);
        return `${x} ${y}`;
      })
      .join(" L ");

  return {
    chartW,
    zeroY,
    stepX,
    barW,
    scaleBar,
    scaleLine,
    costPath: linePath("cost"),
    retailPath: linePath("retail"),
    maxBar,
    maxLine,
  };
}

export function dayIndexFromSvgX(
  svgX: number,
  dailyLen: number,
  stepX: number,
  padLeft: number
): number | null {
  const rel = svgX - padLeft;
  if (rel < 0) return null;
  const slot = Math.round(rel / stepX) - 1;
  if (slot < 0 || slot >= dailyLen) return null;
  return slot;
}
