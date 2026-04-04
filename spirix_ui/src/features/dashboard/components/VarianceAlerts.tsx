import { AlertCircle, AlertTriangle, TrendingDown, X } from "lucide-react";

import { analytics } from "@/config/analytics-theme";
import { DEMO_ALERTS } from "@/config/spirix-dashboard-data";
import { cn } from "@/lib/utils";

function styles(sev: (typeof DEMO_ALERTS)[number]["severity"]) {
  switch (sev) {
    case "critical":
      return {
        wrap: "bg-red-500/10 border-red-500/30",
        icon: "text-red-400",
        badge: "bg-red-500/20 text-red-400",
      };
    case "warning":
      return {
        wrap: "bg-orange-500/10 border-orange-500/30",
        icon: "text-orange-400",
        badge: "bg-orange-500/20 text-orange-400",
      };
    default:
      return {
        wrap: "bg-blue-500/10 border-blue-500/30",
        icon: "text-blue-400",
        badge: "bg-blue-500/20 text-blue-400",
      };
  }
}

export function VarianceAlerts() {
  const critical = DEMO_ALERTS.filter((a) => a.severity === "critical").length;
  const warnings = DEMO_ALERTS.filter((a) => a.severity === "warning").length;

  return (
    <div className={cn(analytics.surface, "flex flex-col")}>
      <div className="flex items-center justify-between border-b border-border p-5">
        <div>
          <h3 className="mb-1 font-medium">Active alerts</h3>
          <p className={cn("text-xs", analytics.textMuted)}>
            Unusual patterns and critical issues
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <span className="rounded-full bg-red-500/20 px-2 py-1 text-xs text-red-400">
            {critical} Critical
          </span>
          <span className="rounded-full bg-orange-500/20 px-2 py-1 text-xs text-orange-400">
            {warnings} Warnings
          </span>
        </div>
      </div>

      <div className="max-h-[420px] space-y-3 overflow-y-auto p-4">
        {DEMO_ALERTS.map((a) => {
          const st = styles(a.severity);
          const Icon =
            a.severity === "critical"
              ? AlertTriangle
              : a.severity === "warning"
                ? TrendingDown
                : AlertCircle;

          return (
            <div
              key={a.id}
              className={cn(
                "rounded-lg border p-4 transition-all hover:border-opacity-80",
                st.wrap,
              )}
            >
              <div className="flex gap-3">
                <div
                  className={cn(
                    "flex size-10 shrink-0 items-center justify-center rounded-lg",
                    st.wrap.split(" ")[0],
                  )}
                >
                  <Icon className={cn("size-[18px]", st.icon)} aria-hidden />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="mb-1 flex items-start justify-between gap-2">
                    <h4 className="text-sm font-medium">{a.title}</h4>
                    <button
                      type="button"
                      className="shrink-0 rounded p-1 hover:bg-muted"
                      aria-label="Dismiss"
                    >
                      <X className="size-3.5 text-muted-foreground" />
                    </button>
                  </div>
                  <p className="mb-2 text-sm text-foreground/90">{a.detail}</p>
                  <div className="flex flex-wrap items-center gap-2">
                    <span
                      className={cn(
                        "rounded-full px-2 py-0.5 text-xs font-medium",
                        st.badge,
                      )}
                    >
                      {a.category}
                    </span>
                    <span className={cn("text-xs", analytics.textSoft)}>
                      {a.time}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="border-t border-border p-4">
        <button
          type="button"
          className="w-full text-center text-sm text-primary transition-colors hover:text-primary/80"
        >
          View all alerts
        </button>
      </div>
    </div>
  );
}
