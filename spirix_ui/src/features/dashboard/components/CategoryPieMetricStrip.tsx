import { analytics } from "@/config/analytics-theme";
import { CATEGORY_PIE_COPY } from "@/config/insight-charts-settings";
import { cn } from "@/lib/utils";

type Props = {
  categoryCount: number;
  topPct: number;
  totalAbsVar: number;
};

export function CategoryPieMetricStrip({
  categoryCount,
  topPct,
  totalAbsVar,
}: Props) {
  return (
    <div className="mt-4 grid grid-cols-2 gap-3 border-t border-border pt-4 sm:grid-cols-3">
      <div>
        <p className={cn("text-xs", analytics.textMuted)}>
          {CATEGORY_PIE_COPY.metrics.categories}
        </p>
        <p className="text-lg font-semibold tabular-nums">{categoryCount}</p>
      </div>
      <div>
        <p className={cn("text-xs", analytics.textMuted)}>
          {CATEGORY_PIE_COPY.metrics.topShare}
        </p>
        <p className="text-lg font-semibold tabular-nums">{topPct.toFixed(1)}%</p>
      </div>
      <div className="sm:col-span-1">
        <p className={cn("text-xs", analytics.textMuted)}>
          {CATEGORY_PIE_COPY.metrics.totalAbs}
        </p>
        <p className="text-lg font-semibold tabular-nums">{totalAbsVar}</p>
        <p className="text-[10px] text-muted-foreground">{CATEGORY_PIE_COPY.metrics.netHint}</p>
      </div>
    </div>
  );
}
