import { analytics } from "@/config/analytics-theme";
import { LEAK_CHART_COPY } from "@/config/leak-chart-settings";
import { cn } from "@/lib/utils";

import type { LeakChartRow } from "./top-leakage-chart.support";

type PayloadEntry = { payload: LeakChartRow };

type Props = {
  active?: boolean;
  payload?: PayloadEntry[];
};

export function LeakBarTooltip({ active, payload }: Props) {
  if (!active || !payload?.length) return null;
  const d = payload[0].payload;
  const tierLabel =
    d.tier === "critical"
      ? LEAK_CHART_COPY.tooltipTier.critical
      : d.tier === "high"
        ? LEAK_CHART_COPY.tooltipTier.high
        : LEAK_CHART_COPY.tooltipTier.medium;

  return (
    <div
      className={cn(
        "min-w-[220px] rounded-xl border border-border bg-popover p-3 shadow-lg",
        "text-popover-foreground",
      )}
    >
      <p className="font-semibold leading-snug">{d.name}</p>
      <p className={cn("mt-1 text-xs", analytics.textMuted)}>{tierLabel}</p>
      <dl className="mt-3 grid grid-cols-2 gap-x-3 gap-y-2 text-xs">
        <dt className={analytics.textMuted}>{LEAK_CHART_COPY.tooltip.leakage}</dt>
        <dd className="text-right font-medium tabular-nums">
          {d.value} {LEAK_CHART_COPY.tooltip.units}
        </dd>
        <dt className={analytics.textMuted}>{LEAK_CHART_COPY.tooltip.share}</dt>
        <dd className="text-right font-medium tabular-nums">
          {d.pctOfTotal.toFixed(1)}%
        </dd>
        <dt className={analytics.textMuted}>{LEAK_CHART_COPY.tooltip.rank}</dt>
        <dd className="text-right font-medium">#{d.rank}</dd>
        <dt className={analytics.textMuted}>{LEAK_CHART_COPY.tooltip.variance}</dt>
        <dd className="text-right font-medium tabular-nums">{d.variance}</dd>
      </dl>
    </div>
  );
}
