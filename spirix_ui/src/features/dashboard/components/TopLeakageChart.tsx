import { useMemo } from "react";

import { analytics } from "@/config/analytics-theme";
import { TOP_LEAK_ITEMS } from "@/config/spirix-dashboard-data";
import { cn } from "@/lib/utils";

import { LeakBarChartPlot } from "./LeakBarChartPlot";
import { LeakChartHeader } from "./LeakChartHeader";
import { LeakChartMetricStrip } from "./LeakChartMetricStrip";
import { buildLeakChartRows } from "./top-leakage-chart.support";

const panel = cn(analytics.surface, analytics.surfaceHover, "p-5");

export function TopLeakageChart() {
  const { rows, total, avgPerSku, topSharePct } = useMemo(
    () => buildLeakChartRows(TOP_LEAK_ITEMS),
    [],
  );

  return (
    <div className={panel}>
      <LeakChartHeader />
      <LeakBarChartPlot rows={rows} avgPerSku={avgPerSku} />
      <LeakChartMetricStrip
        total={total}
        avgPerSku={avgPerSku}
        topSharePct={topSharePct}
        skuCount={rows.length}
      />
    </div>
  );
}
