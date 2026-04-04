import type { VarianceFactor } from "@/lib/varianceVisualizationData";
import { varianceBarColor } from "@/lib/varianceBreakdownHelpers";

const ROW_H = 32;
const PAD = { top: 28, right: 82, bottom: 20, left: 130 };
const BAR_MAX_W = 180;

export type BreakdownLayoutRow = VarianceFactor & {
  y: number;
  barW: number;
  barStart: number;
  color: string;
};

export function buildBreakdownRows(data: VarianceFactor[]) {
  const maxAbs = Math.max(...data.map((d) => Math.abs(d.value)), 1) * 1.1;
  const scale = (v: number) => (v / maxAbs) * BAR_MAX_W;
  const height = PAD.top + data.length * ROW_H + PAD.bottom;
  const width = PAD.left + BAR_MAX_W * 2 + PAD.right;
  const zeroX = PAD.left + BAR_MAX_W;
  const rows: BreakdownLayoutRow[] = data.map((d, i) => ({
    ...d,
    y: PAD.top + i * ROW_H + ROW_H / 2,
    barW: Math.abs(scale(d.value)),
    barStart: d.value >= 0 ? zeroX : zeroX - Math.abs(scale(d.value)),
    color: varianceBarColor(d),
  }));
  return { width, height, rows };
}
