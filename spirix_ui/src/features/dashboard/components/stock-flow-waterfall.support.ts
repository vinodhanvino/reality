import type { LucideIcon } from "lucide-react";
import { Box, Minus, Plus } from "lucide-react";

export type FlowStepRow = {
  key: string;
  label: string;
  value: number;
};

export const FLOW_STEP_SHELL: Record<string, string> = {
  opening: "border-primary/25 bg-primary/10",
  purchase: "border-emerald-500/25 bg-emerald-500/10 dark:bg-emerald-500/15",
  sales: "border-destructive/25 bg-destructive/10",
  nc: "border-orange-500/25 bg-orange-500/10",
  cancelled: "border-amber-500/25 bg-amber-500/10",
  expected: "border-violet-500/25 bg-violet-500/10",
  physical: "border-cyan-500/25 bg-cyan-500/10",
};

export const FLOW_ICON_SHELL: Record<string, string> = {
  opening: "bg-primary/20 text-primary",
  purchase: "bg-emerald-500/20 text-emerald-600 dark:text-emerald-400",
  sales: "bg-destructive/20 text-destructive",
  nc: "bg-orange-500/20 text-orange-600 dark:text-orange-400",
  cancelled: "bg-amber-500/20 text-amber-600 dark:text-amber-400",
  expected: "bg-violet-500/20 text-violet-600 dark:text-violet-400",
  physical: "bg-cyan-500/20 text-cyan-600 dark:text-cyan-400",
};

export function flowValueClass(key: string, neg: boolean): string {
  if (neg) return "text-destructive";
  if (key === "opening" || key === "expected" || key === "physical")
    return "text-foreground";
  return "text-emerald-600 dark:text-emerald-400";
}

export const FLOW_ICONS: Partial<Record<string, LucideIcon>> = {
  purchase: Plus,
  sales: Minus,
  nc: Minus,
  cancelled: Minus,
};

export { Box };

export function formatFlowQty(n: number): string {
  return new Intl.NumberFormat("en-IN", { maximumFractionDigits: 0 }).format(
    Math.abs(n),
  );
}
