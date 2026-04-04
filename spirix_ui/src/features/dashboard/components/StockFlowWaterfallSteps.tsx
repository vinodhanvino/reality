import { ArrowRight } from "lucide-react";

import { analytics } from "@/config/analytics-theme";
import { cn } from "@/lib/utils";

import {
  Box,
  FLOW_ICON_SHELL,
  FLOW_ICONS,
  FLOW_STEP_SHELL,
  type FlowStepRow,
  flowValueClass,
  formatFlowQty,
} from "./stock-flow-waterfall.support";

type Props = { steps: readonly FlowStepRow[]; variance: number };

export function StockFlowWaterfallSteps({ steps, variance }: Props) {
  return (
    <div className="relative overflow-x-auto pb-6">
      <div className="flex min-w-[900px] items-stretch gap-2">
        {steps.map((step, index) => {
          const Icon = FLOW_ICONS[step.key];
          const neg = step.value < 0;
          const shell = FLOW_STEP_SHELL[step.key] ?? "border-border bg-muted/40";
          const ic = FLOW_ICON_SHELL[step.key] ?? "bg-muted text-muted-foreground";

          return (
            <div key={step.key} className="flex items-center">
              <div className="relative min-w-[132px]">
                <div
                  className={cn(
                    "rounded-lg border-2 p-3 transition-all",
                    shell,
                    index === steps.length - 1 &&
                      variance < 0 &&
                      "border-destructive/50 bg-destructive/10",
                  )}
                >
                  <div className="mb-2 flex items-start justify-between">
                    <div
                      className={cn(
                        "flex size-8 items-center justify-center rounded-lg",
                        ic,
                      )}
                    >
                      {Icon ? <Icon className="size-4" /> : <Box className="size-4" />}
                    </div>
                  </div>
                  <p className={cn("mb-1 text-[11px] uppercase", analytics.textMuted)}>
                    {step.label}
                  </p>
                  <p
                    className={cn(
                      "text-lg font-semibold tabular-nums",
                      flowValueClass(step.key, neg),
                    )}
                  >
                    {step.key === "opening" ||
                    step.key === "expected" ||
                    step.key === "physical"
                      ? formatFlowQty(step.value)
                      : `${step.value > 0 ? "+" : "-"}${formatFlowQty(step.value)}`}
                  </p>
                  <p className={cn("mt-1 text-[10px]", analytics.textSoft)}>bottles</p>
                </div>
                {step.key === "expected" ? (
                  <div
                    className={cn(
                      "absolute -bottom-14 left-0 right-0 rounded-lg border border-border p-2 text-center",
                      analytics.inputBg,
                    )}
                  >
                    <p className={cn("text-[10px]", analytics.textMuted)}>Variance</p>
                    <p
                      className={cn(
                        "text-sm font-semibold",
                        variance < 0 ? "text-destructive" : "text-primary",
                      )}
                    >
                      {variance > 0 ? "+" : ""}
                      {variance} bottles
                    </p>
                  </div>
                ) : null}
              </div>
              {index < steps.length - 1 ? (
                <ArrowRight
                  className="mx-1 size-5 shrink-0 text-muted-foreground"
                  aria-hidden
                />
              ) : null}
            </div>
          );
        })}
      </div>
    </div>
  );
}
