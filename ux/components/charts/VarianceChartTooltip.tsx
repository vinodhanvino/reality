"use client";

import type { DailyVarianceRow } from "@/lib/varianceChartData";
import { formatCur } from "@/lib/varianceChartInsight";
import { varianceChartUi } from "@/lib/varianceChartLabels";
import { theme } from "@/lib/settings";

type Props = { row: DailyVarianceRow };

export function VarianceChartTooltip({ row }: Props) {
  const pos = row.units >= 0;
  return (
    <div className="pointer-events-none rounded-xl border border-white/15 bg-zinc-950/98 px-4 py-3 text-left shadow-2xl backdrop-blur-md">
      <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-zinc-500">{row.day}</p>
      <dl className="space-y-2 text-sm">
        <div className="flex justify-between gap-4">
          <dt className="text-zinc-500">{varianceChartUi.tooltip.physical}</dt>
          <dd
            style={{ color: pos ? theme.primary : "#c45c5c" }}
            className="font-mono font-medium tabular-nums"
          >
            {row.units > 0 ? "+" : ""}
            {row.units} units
          </dd>
        </div>
        <div className="flex justify-between gap-4">
          <dt className="text-zinc-500">{varianceChartUi.tooltip.cost}</dt>
          <dd className="font-mono font-medium tabular-nums text-accent">{formatCur(row.cost)}</dd>
        </div>
        <div className="flex justify-between gap-4">
          <dt className="text-zinc-500">{varianceChartUi.tooltip.retail}</dt>
          <dd className="font-mono text-white/90 tabular-nums">{formatCur(row.retail)}</dd>
        </div>
      </dl>
      <p className="mt-3 border-t border-white/10 pt-2 text-[11px] leading-snug text-zinc-500">
        Solid line = cost path · dashed = retail. Bars follow the selected metric above.
      </p>
    </div>
  );
}
