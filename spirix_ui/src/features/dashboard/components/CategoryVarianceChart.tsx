import { useMemo } from "react";

import { analytics } from "@/config/analytics-theme";
import { CATEGORY_PIE_DATA } from "@/config/spirix-dashboard-data";
import { cn } from "@/lib/utils";

import { buildCategoryPieRows } from "./category-variance-chart.support";
import { CategoryPieHeader } from "./CategoryPieHeader";
import { CategoryPieMetricStrip } from "./CategoryPieMetricStrip";
import { CategoryPiePlot } from "./CategoryPiePlot";

const panel = cn(analytics.surface, analytics.surfaceHover, "p-5");

export function CategoryVarianceChart() {
  const { rows, topPct, totalAbsVar } = useMemo(
    () => buildCategoryPieRows(CATEGORY_PIE_DATA),
    [],
  );

  return (
    <div className={panel}>
      <CategoryPieHeader />
      <CategoryPiePlot rows={rows} />
      <CategoryPieMetricStrip
        categoryCount={rows.length}
        topPct={topPct}
        totalAbsVar={totalAbsVar}
      />
    </div>
  );
}
