import { Loader2Icon } from "lucide-react";

import { cn } from "@/lib/utils";

export function PageLoader({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "flex min-h-[40vh] flex-col items-center justify-center gap-2 text-muted-foreground",
        className,
      )}
      role="status"
      aria-live="polite"
    >
      <Loader2Icon className="size-8 animate-spin" aria-hidden />
      <span className="text-sm">Loading…</span>
    </div>
  );
}
