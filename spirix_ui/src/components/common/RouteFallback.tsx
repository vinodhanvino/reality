type Props = {
  /** Shown while a lazy route or auth storage is resolving. */
  message?: string;
};

/**
 * Suspense / auth-hydration placeholder: status role for screen readers,
 * respects static paint (no motion) for `prefers-reduced-motion`.
 */
export function RouteFallback({ message = "Loading…" }: Props) {
  return (
    <div
      className="flex min-h-dvh items-center justify-center bg-background p-6 text-sm text-muted-foreground motion-safe:transition-colors"
      role="status"
      aria-live="polite"
      aria-busy="true"
    >
      {message}
    </div>
  );
}
