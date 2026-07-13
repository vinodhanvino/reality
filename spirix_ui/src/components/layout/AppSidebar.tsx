import { SIDEBAR_LAYOUT } from "@/config/app-settings";
import { AppSidebarNav } from "@/components/layout/AppSidebarNav";
import { usePrefersReducedMotion } from "@/lib/use-prefers-reduced-motion";
import { useSidebarHoverExpand } from "@/lib/use-sidebar-hover-expand";
import { cn } from "@/lib/utils";

type Props = { workspaceId?: number };

export function AppSidebar({ workspaceId }: Props) {
  const { expanded: hoverExpanded, onEnter, onLeave } = useSidebarHoverExpand();
  const reduced = usePrefersReducedMotion();
  const expanded = reduced || hoverExpanded;
  const ms = reduced ? 0 : SIDEBAR_LAYOUT.transitionMs;
  const wExp = SIDEBAR_LAYOUT.widthExpandedRem;
  const wRail = SIDEBAR_LAYOUT.widthRailRem;
  const w = expanded ? wExp : wRail;

  return (
    <aside
      className={cn(
        "app-sidebar relative z-0 h-full min-h-0 shrink-0 self-stretch overflow-hidden border-r border-sidebar-border bg-sidebar py-3 shadow-[2px_0_12px_-6px_rgba(0,0,0,0.06)] backdrop-blur-sm",
        "motion-reduce:transition-none",
      )}
      style={{
        width: `${w}rem`,
        transition: `width ${ms}ms cubic-bezier(0.4, 0, 0.2, 1)`,
      }}
      onPointerEnter={reduced ? undefined : onEnter}
      onPointerLeave={reduced ? undefined : onLeave}
    >
      <div className="flex min-h-dvh flex-col gap-3" style={{ width: `${wExp}rem` }}>
        <AppSidebarNav workspaceId={workspaceId} expanded={expanded} />
      </div>
    </aside>
  );
}
