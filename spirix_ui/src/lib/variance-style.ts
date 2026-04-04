/** Risk-based styling: negative = leakage risk (red), positive = excess (green). */
export function varianceTextClass(value: number): string {
  if (value < 0) return "text-red-500 dark:text-red-400";
  if (value > 0) return "text-emerald-600 dark:text-emerald-400";
  return "text-muted-foreground";
}
