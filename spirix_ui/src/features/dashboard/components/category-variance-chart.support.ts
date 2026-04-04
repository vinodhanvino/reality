import { CATEGORY_PIE_DATA } from "@/config/spirix-dashboard-data";

type Source = (typeof CATEGORY_PIE_DATA)[number];

export type CategoryPieRow = Source & {
  pctOfTotal: number;
  absVariance: number;
};

export function buildCategoryPieRows(
  items: readonly Source[],
): {
  rows: CategoryPieRow[];
  totalWeight: number;
  topPct: number;
  totalAbsVar: number;
} {
  const totalWeight = items.reduce((s, x) => s + x.value, 0);
  const totalAbsVar = items.reduce((s, x) => s + Math.abs(x.variance), 0);
  const rows: CategoryPieRow[] = items.map((d) => ({
    ...d,
    pctOfTotal: totalWeight > 0 ? (d.value / totalWeight) * 100 : 0,
    absVariance: Math.abs(d.variance),
  }));
  const topPct = rows.length
    ? Math.max(...rows.map((r) => r.pctOfTotal))
    : 0;
  return { rows, totalWeight, topPct, totalAbsVar };
}
