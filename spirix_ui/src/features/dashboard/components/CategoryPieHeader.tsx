import { Wine } from "lucide-react";

import { analytics } from "@/config/analytics-theme";
import { CATEGORY_PIE_COPY } from "@/config/insight-charts-settings";
import { cn } from "@/lib/utils";

export function CategoryPieHeader() {
  return (
    <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
      <div className="flex items-center gap-2">
        <span className="flex size-9 items-center justify-center rounded-lg bg-primary/12">
          <Wine className="size-4 text-primary" aria-hidden />
        </span>
        <div>
          <h3 className="font-semibold leading-tight">{CATEGORY_PIE_COPY.title}</h3>
          <p className={cn("text-xs", analytics.textMuted)}>{CATEGORY_PIE_COPY.subtitle}</p>
        </div>
      </div>
      <span className={cn("rounded-full bg-muted px-2.5 py-1 text-xs", analytics.textMuted)}>
        {CATEGORY_PIE_COPY.badge}
      </span>
    </div>
  );
}
