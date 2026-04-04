import {
  AlertCircle,
  Boxes,
  DollarSign,
  Package,
  ShoppingCart,
  TrendingDown,
  TrendingUp,
} from "lucide-react";

import { analytics } from "@/config/analytics-theme";
import {
  DEMO_SUMMARY,
  DEMO_SUMMARY_META,
} from "@/config/spirix-dashboard-data";
import { cn } from "@/lib/utils";

type MetaKey = (typeof DEMO_SUMMARY_META)[number]["key"];

function SummaryIcon({ k }: { k: MetaKey }) {
  switch (k) {
    case "sales":
      return <ShoppingCart className="size-5" aria-hidden />;
    case "purchases":
      return <Package className="size-5" aria-hidden />;
    case "expected":
      return <DollarSign className="size-5" aria-hidden />;
    case "physical":
      return <Boxes className="size-5" aria-hidden />;
    case "variance":
      return <AlertCircle className="size-5" aria-hidden />;
    default:
      return null;
  }
}

function inr(n: number): string {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(Math.abs(n));
}

function valueFor(key: MetaKey): string {
  switch (key) {
    case "sales":
      return inr(DEMO_SUMMARY.totalSales);
    case "purchases":
      return inr(DEMO_SUMMARY.totalPurchases);
    case "expected":
      return inr(DEMO_SUMMARY.expectedClosing);
    case "physical":
      return inr(DEMO_SUMMARY.physicalStock);
    case "variance":
      return `${DEMO_SUMMARY.variance < 0 ? "-" : ""}${inr(DEMO_SUMMARY.variance)}`;
    default:
      return "";
  }
}

export function SummaryMetricCards() {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-5">
      {DEMO_SUMMARY_META.map((m) => {
        const isVar = m.key === "variance";
        const neg = isVar && DEMO_SUMMARY.variance < 0;

        return (
          <div
            key={m.key}
            className={cn(
              analytics.surface,
              analytics.surfaceHover,
              "p-5",
              neg && "border-destructive/35 bg-destructive/5",
            )}
          >
            <div className="mb-3 flex items-start justify-between">
              <div
                className={cn(
                  "flex h-10 w-10 items-center justify-center rounded-lg [&_svg]:text-inherit",
                  m.iconShellClass,
                )}
              >
                <SummaryIcon k={m.key} />
              </div>
              <div className="flex items-center gap-1">
                {m.trend === "up" ? (
                  <TrendingUp className="size-3.5 text-primary" />
                ) : (
                  <TrendingDown className="size-3.5 text-destructive" />
                )}
                <span
                  className={cn(
                    "text-xs font-medium",
                    m.trend === "up" ? "text-primary" : "text-destructive",
                  )}
                >
                  {m.change}
                </span>
              </div>
            </div>
            <p className={cn("mb-1 text-xs", analytics.textMuted)}>{m.label}</p>
            <p
              className={cn(
                "mb-1 text-2xl font-semibold tracking-tight",
                neg && "text-destructive",
              )}
            >
              {valueFor(m.key)}
            </p>
            <p className={cn("text-xs", analytics.textSoft)}>{m.sub}</p>
          </div>
        );
      })}
    </div>
  );
}
