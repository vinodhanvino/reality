import { TREND_LINE_DATA } from "@/config/spirix-dashboard-data";

type Point = (typeof TREND_LINE_DATA)[number];

export function buildTrendStats(points: readonly Point[]) {
  if (!points.length) {
    return {
      mean: 0,
      min: 0,
      max: 0,
      minDay: "",
      maxDay: "",
      latest: 0,
    };
  }
  const variances = points.map((p) => p.variance);
  const mean = variances.reduce((a, b) => a + b, 0) / variances.length;
  let min = variances[0];
  let max = variances[0];
  let minDay = points[0].day;
  let maxDay = points[0].day;
  for (let i = 0; i < points.length; i++) {
    const v = points[i].variance;
    if (v < min) {
      min = v;
      minDay = points[i].day;
    }
    if (v > max) {
      max = v;
      maxDay = points[i].day;
    }
  }
  const latest = variances[variances.length - 1];
  return { mean, min, max, minDay, maxDay, latest };
}
