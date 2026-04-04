import { Activity } from "lucide-react";

import { analytics } from "@/config/analytics-theme";
import { TREND_LINE_COPY } from "@/config/insight-charts-settings";
import { cn } from "@/lib/utils";

export function VarianceTrendHeader() {
  return (
    <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
      <div className="flex items-center gap-2">
        <span className="flex size-9 items-center justify-center rounded-lg bg-destructive/10">
          <Activity className="size-4 text-destructive" aria-hidden />
        </span>
        <div>
          <h3 className="font-semibold leading-tight">{TREND_LINE_COPY.title}</h3>
          <p className={cn("text-xs", analytics.textMuted)}>{TREND_LINE_COPY.subtitle}</p>
        </div>
      </div>
      <span className={cn("rounded-full bg-muted px-2.5 py-1 text-xs", analytics.textMuted)}>
        {TREND_LINE_COPY.badge}
      </span>
    </div>
  );
}
