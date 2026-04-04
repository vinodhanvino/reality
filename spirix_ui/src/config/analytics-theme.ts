import type { CSSProperties } from "react";

/**
 * Dashboard analytics surfaces — use theme tokens so light/dark matches the app.
 */
export const analytics = {
  pageCanvas: "bg-background",
  surface:
    "rounded-xl border border-border bg-card text-card-foreground shadow-sm",
  surfaceHover: "transition-colors hover:border-border hover:bg-card/95",
  borderSubtle: "border-border",
  textMuted: "text-muted-foreground",
  textSoft: "text-muted-foreground/90",
  /** Muted field / toolbar inputs */
  inputBg: "bg-muted/50",
} as const;

/** Recharts tooltip — CSS variables from :root / .dark */
export const chartTooltipStyle: CSSProperties = {
  background: "var(--popover)",
  border: "1px solid var(--border)",
  borderRadius: "var(--radius)",
  fontSize: "12px",
  color: "var(--popover-foreground)",
};
