import { MapPin } from "lucide-react";

import { analytics } from "@/config/analytics-theme";
import { OUTLET_BAR_COPY } from "@/config/insight-charts-settings";
import { cn } from "@/lib/utils";

export function OutletBarHeader() {
  return (
    <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
      <div className="flex items-center gap-2">
        <span className="flex size-9 items-center justify-center rounded-lg bg-primary/10">
          <MapPin className="size-4 text-primary" aria-hidden />
        </span>
        <div>
          <h3 className="font-semibold leading-tight">{OUTLET_BAR_COPY.title}</h3>
          <p className={cn("text-xs", analytics.textMuted)}>{OUTLET_BAR_COPY.subtitle}</p>
        </div>
      </div>
      <span className={cn("rounded-full bg-muted px-2.5 py-1 text-xs", analytics.textMuted)}>
        {OUTLET_BAR_COPY.badge}
      </span>
    </div>
  );
}
