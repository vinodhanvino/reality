import type { TooltipContentProps } from "recharts";

import { analytics } from "@/config/analytics-theme";
import { OUTLET_BAR_COPY } from "@/config/insight-charts-settings";
import { cn } from "@/lib/utils";

type Row = { name: string; variance: number };

export function OutletBarTooltip({
  active,
  payload,
  avg,
}: TooltipContentProps<number, string> & { avg: number }) {
  if (!active || !payload?.length) return null;
  const d = payload[0].payload as Row;
  const delta = d.variance - avg;
  return (
    <div
      className={cn(
        "min-w-[200px] rounded-xl border border-border bg-popover p-3 shadow-lg",
        "text-popover-foreground",
      )}
    >
      <p className="font-semibold">{d.name}</p>
      <dl className="mt-2 space-y-1.5 text-xs">
        <div className="flex justify-between gap-4">
          <dt className={analytics.textMuted}>{OUTLET_BAR_COPY.tooltip.variance}</dt>
          <dd className="font-medium tabular-nums">{d.variance}</dd>
        </div>
        <div className="flex justify-between gap-4">
          <dt className={analytics.textMuted}>{OUTLET_BAR_COPY.tooltip.vsAvg}</dt>
          <dd className="font-medium tabular-nums">
            {delta > 0 ? "+" : ""}
            {delta.toFixed(0)}
          </dd>
        </div>
      </dl>
    </div>
  );
}
