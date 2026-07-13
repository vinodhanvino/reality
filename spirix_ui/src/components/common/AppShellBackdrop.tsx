import { cn } from "@/lib/utils";

type Props = {
  className?: string;
};

/**
 * Same ambient layer as SignInShell’s brand aside: gradient, glows, light grid.
 * Parent should be `relative` (or `relative overflow-hidden`).
 */
export function AppShellBackdrop({ className }: Props) {
  return (
    <div
      className={cn(
        "pointer-events-none absolute inset-0 overflow-hidden",
        "bg-gradient-to-br from-primary/[0.12] via-background to-background",
        "dark:from-primary/[0.18] dark:via-background dark:to-background",
        className,
      )}
      aria-hidden
    >
      <div className="absolute -right-24 -top-28 size-[22rem] rounded-full bg-primary/25 blur-3xl dark:bg-primary/20" />
      <div className="absolute -bottom-16 -left-20 size-[18rem] rounded-full bg-primary/15 blur-3xl dark:bg-primary/12" />
      <div
        className="absolute inset-0 opacity-[0.35] dark:opacity-[0.2]"
        style={{
          backgroundImage: `linear-gradient(to right, color-mix(in oklab, var(--foreground) 8%, transparent) 1px, transparent 1px),
            linear-gradient(to bottom, color-mix(in oklab, var(--foreground) 8%, transparent) 1px, transparent 1px)`,
          backgroundSize: "48px 48px",
        }}
      />
    </div>
  );
}
