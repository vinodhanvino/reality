import { analytics } from "@/config/analytics-theme";
import { OUTLET_BAR_COPY } from "@/config/insight-charts-settings";
import { cn } from "@/lib/utils";

type Outlet = { name: string; variance: number };

type Props = {
  worst: Outlet | null;
  best: Outlet | null;
  avg: number;
  spread: number;
};

export function OutletBarMetricStrip({ worst, best, avg, spread }: Props) {
  return (
    <div className="mt-4 grid grid-cols-2 gap-3 border-t border-border pt-4 sm:grid-cols-4">
      <div>
        <p className={cn("text-xs", analytics.textMuted)}>{OUTLET_BAR_COPY.metrics.worst}</p>
        <p className="text-sm font-semibold leading-tight">{worst?.name ?? "—"}</p>
        <p className="text-xs tabular-nums text-destructive">{worst?.variance ?? "—"}</p>
      </div>
      <div>
        <p className={cn("text-xs", analytics.textMuted)}>{OUTLET_BAR_COPY.metrics.best}</p>
        <p className="text-sm font-semibold leading-tight">{best?.name ?? "—"}</p>
        <p className="text-xs tabular-nums text-primary">{best?.variance ?? "—"}</p>
      </div>
      <div>
        <p className={cn("text-xs", analytics.textMuted)}>{OUTLET_BAR_COPY.metrics.avgLine}</p>
        <p className="text-lg font-semibold tabular-nums">{avg.toFixed(0)}</p>
      </div>
      <div>
        <p className={cn("text-xs", analytics.textMuted)}>{OUTLET_BAR_COPY.metrics.spread}</p>
        <p className="text-lg font-semibold tabular-nums">{spread.toFixed(0)}</p>
      </div>
    </div>
  );
}
