import { ArrowUpDown, Search } from "lucide-react";
import { useMemo, useState } from "react";

import { analytics } from "@/config/analytics-theme";
import type { StockRow } from "@/config/spirix-dashboard-data";
import { DEMO_STOCK_ROWS } from "@/config/spirix-dashboard-data";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type SortKey = keyof StockRow | "none";

function variancePillClass(v: number): string {
  if (v < -30) return "bg-red-500/20 text-red-400";
  if (v < -15) return "bg-orange-500/20 text-orange-400";
  if (v < 0) return "bg-yellow-500/20 text-yellow-400";
  return "bg-primary/20 text-primary";
}

export function StockVarianceTable() {
  const [q, setQ] = useState("");
  const [category, setCategory] = useState("all");
  const [sortKey, setSortKey] = useState<SortKey>("variance");
  const [sortDir, setSortDir] = useState<"asc" | "desc">("asc");

  const filtered = useMemo(() => {
    let rows = DEMO_STOCK_ROWS.filter((r) => {
      const ok =
        (!q.trim() ||
          r.item.toLowerCase().includes(q.toLowerCase()) ||
          r.category.toLowerCase().includes(q.toLowerCase())) &&
        (category === "all" || r.category === category);
      return ok;
    });
    if (sortKey !== "none") {
      rows = [...rows].sort((a, b) => {
        const av = a[sortKey as keyof StockRow];
        const bv = b[sortKey as keyof StockRow];
        let cmp = 0;
        if (typeof av === "number" && typeof bv === "number") cmp = av - bv;
        else cmp = String(av).localeCompare(String(bv));
        return sortDir === "asc" ? cmp : -cmp;
      });
    }
    return rows;
  }, [q, category, sortKey, sortDir]);

  const toggle = (k: SortKey) => {
    if (sortKey === k) setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    else {
      setSortKey(k);
      setSortDir("asc");
    }
  };

  return (
    <div className={cn(analytics.surface, "overflow-hidden")}>
      <div className="border-b border-border p-5">
        <div className="mb-4 flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
          <div>
            <h3 className="mb-1 font-medium">Stock details</h3>
            <p className={cn("text-xs", analytics.textMuted)}>
              Full movement and variance by SKU
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Button
              type="button"
              size="sm"
              className="bg-primary font-medium text-primary-foreground hover:bg-primary/90"
            >
              Export CSV
            </Button>
          </div>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row">
          <div className="relative flex-1">
            <Search
              className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
              aria-hidden
            />
            <input
              type="search"
              placeholder="Search item or category…"
              value={q}
              onChange={(e) => setQ(e.target.value)}
              className={cn(
                "w-full rounded-lg border border-border py-2 pl-10 pr-4 text-sm transition-colors focus:border-primary/50 focus:outline-none",
                analytics.inputBg,
              )}
              aria-label="Search table"
            />
          </div>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className={cn(
              "h-10 rounded-lg border border-border px-3 text-sm",
              analytics.inputBg,
            )}
            aria-label="Category filter"
          >
            <option value="all">All categories</option>
            <option value="Whisky">Whisky</option>
            <option value="Beer">Beer</option>
            <option value="Wine">Wine</option>
          </select>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border bg-muted/50">
              <th className="px-4 py-3 text-left">
                <button
                  type="button"
                  className="flex items-center gap-1 text-xs font-medium text-muted-foreground hover:text-foreground"
                  onClick={() => toggle("item")}
                >
                  Item
                  <ArrowUpDown className="size-3" />
                </button>
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground">
                Category
              </th>
              <th className="px-4 py-3 text-right text-xs font-medium text-muted-foreground">
                Opening
              </th>
              <th className="px-4 py-3 text-right text-xs font-medium text-muted-foreground">
                Purchase
              </th>
              <th className="px-4 py-3 text-right text-xs font-medium text-muted-foreground">
                Sales
              </th>
              <th className="px-4 py-3 text-right text-xs font-medium text-muted-foreground">
                NC
              </th>
              <th className="px-4 py-3 text-right text-xs font-medium text-muted-foreground">
                Cancelled
              </th>
              <th className="px-4 py-3 text-right text-xs font-medium text-muted-foreground">
                Expected
              </th>
              <th className="px-4 py-3 text-right text-xs font-medium text-muted-foreground">
                Physical
              </th>
              <th className="px-4 py-3 text-right">
                <button
                  type="button"
                  className="ml-auto flex items-center gap-1 text-xs font-medium text-muted-foreground hover:text-foreground"
                  onClick={() => toggle("variance")}
                >
                  Variance
                  <ArrowUpDown className="size-3" />
                </button>
              </th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((r) => (
              <tr
                key={r.item}
                className="border-b border-border transition-colors last:border-0 hover:bg-muted/50"
              >
                <td className="px-4 py-3 text-sm font-medium">{r.item}</td>
                <td className="px-4 py-3">
                  <span className="rounded-full bg-primary/10 px-2 py-1 text-xs text-primary">
                    {r.category}
                  </span>
                </td>
                <td className="px-4 py-3 text-right text-sm text-foreground/90">
                  {r.opening}
                </td>
                <td className="px-4 py-3 text-right text-sm text-emerald-600 dark:text-emerald-400">
                  +{r.purchase}
                </td>
                <td className="px-4 py-3 text-right text-sm text-red-400">
                  -{r.sales}
                </td>
                <td className="px-4 py-3 text-right text-sm text-orange-400">
                  -{r.nc}
                </td>
                <td className="px-4 py-3 text-right text-sm text-yellow-400">
                  -{r.cancelled}
                </td>
                <td className="px-4 py-3 text-right text-sm font-medium text-foreground/90">
                  {r.expected}
                </td>
                <td className="px-4 py-3 text-right text-sm font-medium text-foreground/90">
                  {r.physical}
                </td>
                <td className="px-4 py-3 text-right">
                  <span
                    className={cn(
                      "inline-flex rounded-full px-2.5 py-1 text-sm font-semibold",
                      variancePillClass(r.variance),
                    )}
                  >
                    {r.variance > 0 ? "+" : ""}
                    {r.variance}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex flex-col items-center justify-between gap-3 border-t border-border p-4 sm:flex-row">
        <p className="text-sm text-muted-foreground">
          Showing {filtered.length} of {DEMO_STOCK_ROWS.length} items
        </p>
        <div className="flex gap-2">
          <Button
            type="button"
            variant="outline"
            size="sm"
            className={analytics.inputBg}
            disabled
          >
            Previous
          </Button>
          <Button
            type="button"
            size="sm"
            className="border border-primary/30 bg-primary/10 text-primary"
          >
            1
          </Button>
          <Button type="button" variant="outline" size="sm" className={analytics.inputBg}>
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}
