import { TrendingDown } from "lucide-react";

import { analytics } from "@/config/analytics-theme";
import { LEAK_CHART_COPY } from "@/config/leak-chart-settings";
import { cn } from "@/lib/utils";

export function LeakChartHeader() {
  return (
    <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
      <div className="flex items-center gap-2">
        <span className="flex size-9 items-center justify-center rounded-lg bg-destructive/10">
          <TrendingDown className="size-4 text-destructive" aria-hidden />
        </span>
        <div>
          <h3 className="font-semibold leading-tight">{LEAK_CHART_COPY.title}</h3>
          <p className={cn("text-xs", analytics.textMuted)}>{LEAK_CHART_COPY.subtitle}</p>
        </div>
      </div>
      <span className={cn("rounded-full bg-muted px-2.5 py-1 text-xs", analytics.textMuted)}>
        {LEAK_CHART_COPY.periodBadge}
      </span>
    </div>
  );
}
