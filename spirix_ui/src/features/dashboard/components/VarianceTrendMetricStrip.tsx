import { analytics } from "@/config/analytics-theme";
import { TREND_LINE_COPY } from "@/config/insight-charts-settings";
import { cn } from "@/lib/utils";

type Props = {
  latest: number;
  mean: number;
  min: number;
  max: number;
  minDay: string;
  maxDay: string;
};

export function VarianceTrendMetricStrip({
  latest,
  mean,
  min,
  max,
  minDay,
  maxDay,
}: Props) {
  return (
    <div className="mt-4 grid grid-cols-2 gap-3 border-t border-border pt-4 sm:grid-cols-4">
      <div>
        <p className={cn("text-xs", analytics.textMuted)}>{TREND_LINE_COPY.metrics.latest}</p>
        <p className="text-lg font-semibold tabular-nums text-destructive">{latest}</p>
      </div>
      <div>
        <p className={cn("text-xs", analytics.textMuted)}>{TREND_LINE_COPY.metrics.weekAvg}</p>
        <p className="text-lg font-semibold tabular-nums">{mean.toFixed(0)}</p>
      </div>
      <div>
        <p className={cn("text-xs", analytics.textMuted)}>{TREND_LINE_COPY.metrics.worstDay}</p>
        <p className="text-sm font-semibold">{minDay}</p>
        <p className="text-xs tabular-nums text-destructive">{min}</p>
      </div>
      <div>
        <p className={cn("text-xs", analytics.textMuted)}>{TREND_LINE_COPY.metrics.bestDay}</p>
        <p className="text-sm font-semibold">{maxDay}</p>
        <p className="text-xs tabular-nums text-primary">{max}</p>
      </div>
    </div>
  );
}
