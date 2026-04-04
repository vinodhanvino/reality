import { APP_NAME, APP_TAGLINE } from "@/config/settings";
import { StockFlowWaterfall } from "@/features/dashboard/components/StockFlowWaterfall";
import { StockVarianceTable } from "@/features/dashboard/components/StockVarianceTable";
import { SummaryMetricCards } from "@/features/dashboard/components/SummaryMetricCards";
import { VarianceAlerts } from "@/features/dashboard/components/VarianceAlerts";
import { VarianceInsightsCharts } from "@/features/dashboard/components/VarianceInsightsCharts";

export default function DashboardPage() {
  return (
    <div className="space-y-8 pb-10">
      <header className="space-y-1">
        <h1 className="text-2xl font-semibold tracking-tight md:text-3xl">
          {APP_NAME} dashboard
        </h1>
        <p className="max-w-3xl text-sm leading-relaxed text-muted-foreground md:text-base">
          {APP_TAGLINE} — leakage signals, variance by category, and stock flow in one place.
        </p>
      </header>

      <section aria-labelledby="summary-heading" className="space-y-4">
        <h2
          id="summary-heading"
          className="text-xs font-semibold uppercase tracking-wider text-muted-foreground"
        >
          Summary
        </h2>
        <SummaryMetricCards />
      </section>

      <section aria-labelledby="insights-heading" className="space-y-4">
        <h2
          id="insights-heading"
          className="text-xs font-semibold uppercase tracking-wider text-muted-foreground"
        >
          Variance insights
        </h2>
        <VarianceInsightsCharts />
      </section>

      <section aria-labelledby="flow-heading" className="space-y-4">
        <h2
          id="flow-heading"
          className="text-xs font-semibold uppercase tracking-wider text-muted-foreground"
        >
          Stock flow
        </h2>
        <StockFlowWaterfall />
      </section>

      <section aria-labelledby="detail-heading" className="space-y-4">
        <h2
          id="detail-heading"
          className="text-xs font-semibold uppercase tracking-wider text-muted-foreground"
        >
          Detail & alerts
        </h2>
        <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
          <div className="xl:col-span-2">
            <StockVarianceTable />
          </div>
          <div className="xl:col-span-1">
            <VarianceAlerts />
          </div>
        </div>
      </section>
    </div>
  );
}
