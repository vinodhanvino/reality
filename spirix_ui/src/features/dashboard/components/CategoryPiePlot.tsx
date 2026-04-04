import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";

import { CATEGORY_PIE_CHART } from "@/config/insight-charts-settings";

import { CategoryPieTooltip } from "./CategoryPieTooltip";
import type { CategoryPieRow } from "./category-variance-chart.support";

type Props = { rows: CategoryPieRow[] };

export function CategoryPiePlot({ rows }: Props) {
  return (
    <ResponsiveContainer width="100%" height={CATEGORY_PIE_CHART.height}>
      <PieChart>
        <Pie
          data={rows}
          cx="50%"
          cy="50%"
          dataKey="value"
          nameKey="name"
          innerRadius={CATEGORY_PIE_CHART.innerRadius}
          outerRadius={CATEGORY_PIE_CHART.outerRadius}
          paddingAngle={CATEGORY_PIE_CHART.paddingAngle}
          stroke="var(--background)"
          strokeWidth={CATEGORY_PIE_CHART.strokeWidth}
          labelLine={false}
          label={({ name, percent }) =>
            `${name ?? ""} ${((percent ?? 0) * 100).toFixed(0)}%`
          }
        >
          {rows.map((e) => (
            <Cell key={e.name} fill={e.fill} className="outline-none" />
          ))}
        </Pie>
        <Tooltip
          cursor={false}
          content={<CategoryPieTooltip />}
        />
      </PieChart>
    </ResponsiveContainer>
  );
}
