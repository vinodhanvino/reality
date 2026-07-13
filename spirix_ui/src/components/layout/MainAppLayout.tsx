import type { ReactNode } from "react";

import { AppShellBackdrop } from "@/components/common/AppShellBackdrop";
import { AppSidebar } from "@/components/layout/AppSidebar";

type Props = {
  header: ReactNode;
  children: ReactNode;
  workspaceId?: number;
  /** When true (e.g. outlet detail), left sidebar chrome is enabled. */
  showSidebar?: boolean;
};

export function MainAppLayout({ header, children, workspaceId, showSidebar = false }: Props) {
  return (
    <div className="relative flex min-h-dvh flex-col overflow-hidden bg-background">
      <AppShellBackdrop />
      <div className="relative z-20 shrink-0">{header}</div>
      <div className="relative z-10 flex min-h-0 min-w-0 flex-1 flex-nowrap items-stretch">
        {showSidebar ? <AppSidebar workspaceId={workspaceId} /> : null}
        <div className="relative flex min-h-0 min-w-0 flex-1 flex-col">
          <div className="relative min-h-0 flex-1">{children}</div>
        </div>
      </div>
    </div>
  );
}
