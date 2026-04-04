"use client";

import type { VarianceChartData } from "@/lib/varianceChartData";
import { varianceChartUi } from "@/lib/varianceChartLabels";
import { cn } from "@/lib/utils";

type Props = { data: VarianceChartData["summary"] };

function formatCurrency(n: number) {
  const sign = n >= 0 ? "" : "-";
  return `${sign}$${Math.abs(n).toLocaleString()}`;
}

export function VarianceKPICards({ data }: Props) {
  const { kpi } = varianceChartUi;
  return (
    <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
      <div
        className={cn(
          "rounded-xl border bg-black/30 p-4",
          data.net_variance_cost >= 0 ? "border-primary/35" : "border-red-500/40"
        )}
      >
        <p className="mb-1 text-xs font-medium uppercase tracking-wider text-zinc-500">{kpi.net.title}</p>
        <p className="text-xl font-semibold text-white">{formatCurrency(data.net_variance_cost)}</p>
        <p className="mt-2 text-[11px] leading-snug text-zinc-500">{kpi.net.hint}</p>
      </div>
      <div
        className={cn(
          "rounded-xl border bg-black/30 p-4",
          data.potential_revenue_loss >= 0 ? "border-primary/35" : "border-red-500/40"
        )}
      >
        <p className="mb-1 text-xs font-medium uppercase tracking-wider text-zinc-500">{kpi.revenue.title}</p>
        <p className="text-xl font-semibold text-white">{formatCurrency(data.potential_revenue_loss)}</p>
        <p className="mt-2 text-[11px] leading-snug text-zinc-500">{kpi.revenue.hint}</p>
      </div>
      <div className="rounded-xl border border-white/10 bg-black/30 p-4">
        <p className="mb-1 text-xs font-medium uppercase tracking-wider text-zinc-500">{kpi.rate.title}</p>
        <p className="text-xl font-semibold text-white">{data.variance_rate}</p>
        <p className="mt-2 text-[11px] leading-snug text-zinc-500">{kpi.rate.hint}</p>
      </div>
    </div>
  );
}
