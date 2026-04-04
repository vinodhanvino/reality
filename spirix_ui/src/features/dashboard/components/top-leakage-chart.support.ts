import { TOP_LEAK_ITEMS } from "@/config/spirix-dashboard-data";

export type LeakTier = "critical" | "high" | "medium";

export type LeakChartRow = {
  name: string;
  variance: number;
  value: number;
  rank: number;
  pctOfTotal: number;
  tier: LeakTier;
};

type SourceRow = (typeof TOP_LEAK_ITEMS)[number];

function tierForIndex(i: number): LeakTier {
  if (i === 0) return "critical";
  if (i < 3) return "high";
  return "medium";
}

export function buildLeakChartRows(items: readonly SourceRow[]): {
  rows: LeakChartRow[];
  total: number;
  avgPerSku: number;
  topSharePct: number;
} {
  const total = items.reduce((s, x) => s + x.value, 0);
  const sorted = [...items].sort((a, b) => b.value - a.value);
  const rows: LeakChartRow[] = sorted.map((item, i) => ({
    ...item,
    rank: i + 1,
    pctOfTotal: total > 0 ? (item.value / total) * 100 : 0,
    tier: tierForIndex(i),
  }));
  const avgPerSku = rows.length ? total / rows.length : 0;
  const topSharePct = rows[0]?.pctOfTotal ?? 0;
  return { rows, total, avgPerSku, topSharePct };
}

export function tierGradientId(tier: LeakTier): string {
  if (tier === "critical") return "leakGrad-critical";
  if (tier === "high") return "leakGrad-high";
  return "leakGrad-medium";
}
