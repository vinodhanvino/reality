import { OUTLET_BAR_DATA } from "@/config/spirix-dashboard-data";

type Row = (typeof OUTLET_BAR_DATA)[number];

export function buildOutletBarStats(rows: readonly Row[]) {
  if (!rows.length) {
    return {
      avg: 0,
      min: 0,
      max: 0,
      worst: null as Row | null,
      best: null as Row | null,
    };
  }
  const variances = rows.map((r) => r.variance);
  const sum = variances.reduce((a, b) => a + b, 0);
  const avg = sum / rows.length;
  const min = Math.min(...variances);
  const max = Math.max(...variances);
  const worst = rows.reduce((a, b) => (a.variance < b.variance ? a : b));
  const best = rows.reduce((a, b) => (a.variance > b.variance ? a : b));
  return { avg, min, max, worst, best };
}
