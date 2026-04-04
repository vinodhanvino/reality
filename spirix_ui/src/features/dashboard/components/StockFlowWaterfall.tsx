import { analytics } from "@/config/analytics-theme";
import { DEMO_FLOW_STEPS, DEMO_SUMMARY } from "@/config/spirix-dashboard-data";
import { cn } from "@/lib/utils";

import { formatFlowQty } from "./stock-flow-waterfall.support";
import { StockFlowWaterfallSteps } from "./StockFlowWaterfallSteps";

export function StockFlowWaterfall() {
  const variance = DEMO_SUMMARY.physicalStock - DEMO_SUMMARY.expectedClosing;
  const additions = DEMO_FLOW_STEPS.find((s) => s.key === "purchase")?.value ?? 0;
  const deductions =
    (DEMO_FLOW_STEPS.find((s) => s.key === "sales")?.value ?? 0) +
    (DEMO_FLOW_STEPS.find((s) => s.key === "nc")?.value ?? 0) +
    (DEMO_FLOW_STEPS.find((s) => s.key === "cancelled")?.value ?? 0);
  const expected = Number(DEMO_SUMMARY.expectedClosing);
  const accuracy =
    expected !== 0
      ? ((1 - Math.abs(variance) / Math.abs(expected)) * 100).toFixed(1)
      : "0";

  return (
    <div className={cn(analytics.surface, analytics.surfaceHover, "p-5")}>
      <div className="mb-6">
        <h3 className="mb-1 font-medium">Stock flow visualization</h3>
        <p className={cn("text-xs", analytics.textMuted)}>
          Daily movement: opening → flows → expected vs physical (app).
        </p>
      </div>

      <StockFlowWaterfallSteps steps={DEMO_FLOW_STEPS} variance={variance} />

      <div className="mt-14 border-t border-border pt-4">
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          <div>
            <p className={cn("mb-1 text-xs", analytics.textMuted)}>Total additions</p>
            <p className="text-lg font-semibold text-emerald-600 dark:text-emerald-400">
              +{formatFlowQty(additions)}
            </p>
          </div>
          <div>
            <p className={cn("mb-1 text-xs", analytics.textMuted)}>Total deductions</p>
            <p className="text-lg font-semibold text-destructive">
              {new Intl.NumberFormat("en-IN", {
                maximumFractionDigits: 0,
              }).format(deductions)}
            </p>
          </div>
          <div>
            <p className={cn("mb-1 text-xs", analytics.textMuted)}>Net movement</p>
            <p className="text-lg font-semibold text-foreground">
              {formatFlowQty(additions + deductions)}
            </p>
          </div>
          <div>
            <p className={cn("mb-1 text-xs", analytics.textMuted)}>Accuracy</p>
            <p
              className={cn(
                "text-lg font-semibold",
                Number(accuracy) < 95 ? "text-destructive" : "text-primary",
              )}
            >
              {accuracy}%
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
