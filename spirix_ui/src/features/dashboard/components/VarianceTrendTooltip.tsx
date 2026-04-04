import type { TooltipContentProps } from "recharts";

import { analytics } from "@/config/analytics-theme";
import { TREND_LINE_COPY } from "@/config/insight-charts-settings";
import { cn } from "@/lib/utils";

type Point = { day: string; variance: number };

export function VarianceTrendTooltip({
  active,
  payload,
  mean,
}: TooltipContentProps<number, string> & { mean: number }) {
  if (!active || !payload?.length) return null;
  const d = payload[0].payload as Point;
  const vsMean = d.variance - mean;
  return (
    <div
      className={cn(
        "min-w-[180px] rounded-xl border border-border bg-popover p-3 shadow-lg",
        "text-popover-foreground",
      )}
    >
      <p className="text-xs font-medium text-muted-foreground">
        {TREND_LINE_COPY.tooltip.day}: {d.day}
      </p>
      <p className="mt-1 text-lg font-semibold tabular-nums">{d.variance}</p>
      <dl className="mt-2 space-y-1 text-xs">
        <div className="flex justify-between gap-4">
          <dt className={analytics.textMuted}>{TREND_LINE_COPY.tooltip.variance}</dt>
          <dd className="font-medium tabular-nums">{d.variance}</dd>
        </div>
        <div className="flex justify-between gap-4">
          <dt className={analytics.textMuted}>{TREND_LINE_COPY.tooltip.vsMean}</dt>
          <dd className="font-medium tabular-nums">
            {vsMean > 0 ? "+" : ""}
            {vsMean.toFixed(0)}
          </dd>
        </div>
      </dl>
    </div>
  );
}
