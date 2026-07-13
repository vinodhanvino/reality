import { NavLink } from "react-router-dom";
import { Home, LayoutDashboard } from "lucide-react";

import { SIDEBAR_UI } from "@/config/app-settings";
import { cn } from "@/lib/utils";

type Props = { workspaceId?: number; expanded: boolean };

export function AppSidebarNav({ workspaceId, expanded }: Props) {
  const dash = workspaceId != null ? `/workspace/${workspaceId}/dashboard` : null;
  const linkBase = cn(
    "flex items-center rounded-lg text-sm font-medium transition-colors",
    expanded ? "min-h-10 justify-start gap-3 px-2" : "size-12 justify-center px-0",
  );
  const idle = "text-sidebar-foreground hover:bg-sidebar-accent/60";
  const active = "bg-sidebar-accent text-sidebar-accent-foreground";

  return (
    <nav className={cn("flex flex-col", expanded ? "gap-1 px-1" : "gap-2 px-0.5")} aria-label="Main">
      <NavLink
        to="/"
        end
        title={SIDEBAR_UI.workspaces}
        className={({ isActive }) => cn(linkBase, isActive ? active : idle)}
      >
        <Home className={cn("shrink-0 opacity-90", expanded ? "size-[1.125rem]" : "size-6")} aria-hidden />
        <span className={cn("truncate", !expanded && "sr-only")}>{SIDEBAR_UI.workspaces}</span>
      </NavLink>
      {dash ? (
        <NavLink
          to={dash}
          title={SIDEBAR_UI.dashboard}
          className={({ isActive }) => cn(linkBase, isActive ? active : idle)}
        >
          <LayoutDashboard
            className={cn("shrink-0 opacity-90", expanded ? "size-[1.125rem]" : "size-6")}
            aria-hidden
          />
          <span className={cn("truncate", !expanded && "sr-only")}>{SIDEBAR_UI.dashboard}</span>
        </NavLink>
      ) : null}
    </nav>
  );
}
