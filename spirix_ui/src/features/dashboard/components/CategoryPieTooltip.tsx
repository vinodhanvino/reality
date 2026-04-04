import { analytics } from "@/config/analytics-theme";
import { CATEGORY_PIE_COPY } from "@/config/insight-charts-settings";
import { cn } from "@/lib/utils";

import type { CategoryPieRow } from "./category-variance-chart.support";

type PayloadEntry = { payload: CategoryPieRow };

type Props = {
  active?: boolean;
  payload?: PayloadEntry[];
};

export function CategoryPieTooltip({ active, payload }: Props) {
  if (!active || !payload?.length) return null;
  const d = payload[0].payload;
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
          <dt className={analytics.textMuted}>{CATEGORY_PIE_COPY.tooltip.variance}</dt>
          <dd className="font-medium tabular-nums">{d.variance}</dd>
        </div>
        <div className="flex justify-between gap-4">
          <dt className={analytics.textMuted}>{CATEGORY_PIE_COPY.tooltip.weight}</dt>
          <dd className="font-medium tabular-nums">{d.value}</dd>
        </div>
        <div className="flex justify-between gap-4">
          <dt className={analytics.textMuted}>{CATEGORY_PIE_COPY.tooltip.share}</dt>
          <dd className="font-medium tabular-nums">{d.pctOfTotal.toFixed(1)}%</dd>
        </div>
      </dl>
    </div>
  );
}
