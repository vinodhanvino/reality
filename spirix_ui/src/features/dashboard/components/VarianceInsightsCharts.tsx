import { CategoryVarianceChart } from "@/features/dashboard/components/CategoryVarianceChart";
import { OutletComparisonChart } from "@/features/dashboard/components/OutletComparisonChart";
import { TopLeakageChart } from "@/features/dashboard/components/TopLeakageChart";
import { VarianceTrendChart } from "@/features/dashboard/components/VarianceTrendChart";

export function VarianceInsightsCharts() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <TopLeakageChart />
        <CategoryVarianceChart />
      </div>
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <OutletComparisonChart />
        <VarianceTrendChart />
      </div>
    </div>
  );
}
