import { analytics } from "@/config/analytics-theme";
import { LEAK_CHART_COPY } from "@/config/leak-chart-settings";
import { cn } from "@/lib/utils";

type Props = {
  total: number;
  avgPerSku: number;
  topSharePct: number;
  skuCount: number;
};

export function LeakChartMetricStrip({
  total,
  avgPerSku,
  topSharePct,
  skuCount,
}: Props) {
  return (
    <div className="mt-4 grid grid-cols-2 gap-3 border-t border-border pt-4 sm:grid-cols-4">
      <div>
        <p className={cn("text-xs", analytics.textMuted)}>{LEAK_CHART_COPY.metrics.total}</p>
        <p className="text-lg font-semibold tabular-nums text-destructive">{total}</p>
        <p className="text-[10px] text-muted-foreground">
          {LEAK_CHART_COPY.metrics.totalUnit}
        </p>
      </div>
      <div>
        <p className={cn("text-xs", analytics.textMuted)}>{LEAK_CHART_COPY.metrics.avgSku}</p>
        <p className="text-lg font-semibold tabular-nums">{avgPerSku.toFixed(0)}</p>
      </div>
      <div>
        <p className={cn("text-xs", analytics.textMuted)}>{LEAK_CHART_COPY.metrics.topShare}</p>
        <p className="text-lg font-semibold tabular-nums">{topSharePct.toFixed(1)}%</p>
      </div>
      <div>
        <p className={cn("text-xs", analytics.textMuted)}>{LEAK_CHART_COPY.metrics.skuCount}</p>
        <p className="text-lg font-semibold tabular-nums">{skuCount}</p>
      </div>
    </div>
  );
}
