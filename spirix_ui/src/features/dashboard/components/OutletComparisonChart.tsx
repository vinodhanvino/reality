import { useMemo } from "react";

import { analytics } from "@/config/analytics-theme";
import { OUTLET_BAR_DATA } from "@/config/spirix-dashboard-data";
import { cn } from "@/lib/utils";

import { buildOutletBarStats } from "./outlet-comparison-chart.support";
import { OutletBarHeader } from "./OutletBarHeader";
import { OutletBarMetricStrip } from "./OutletBarMetricStrip";
import { OutletBarPlot } from "./OutletBarPlot";

const panel = cn(analytics.surface, analytics.surfaceHover, "p-5");

export function OutletComparisonChart() {
  const stats = useMemo(() => buildOutletBarStats(OUTLET_BAR_DATA), []);
  const spread = stats.max - stats.min;

  return (
    <div className={panel}>
      <OutletBarHeader />
      <OutletBarPlot rows={OUTLET_BAR_DATA} avg={stats.avg} />
      <OutletBarMetricStrip
        worst={stats.worst}
        best={stats.best}
        avg={stats.avg}
        spread={spread}
      />
    </div>
  );
}
