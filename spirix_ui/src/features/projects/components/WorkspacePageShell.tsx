import type { ReactNode } from "react";
import { Link } from "react-router-dom";

import { ThemeToggle } from "@/components/common/ThemeToggle";
import { UserAccountMenu } from "@/components/common/UserAccountMenu";
import { MainAppLayout } from "@/components/layout/MainAppLayout";
import { APP_NAME, WORKSPACE_DASHBOARD_UI } from "@/config/app-settings";
import { buttonVariants } from "@/components/ui/button";
import { WorkspaceSwitcher } from "@/features/projects/components/WorkspaceSwitcher";
import { cn } from "@/lib/utils";

type Props = {
  workspaceId: number;
  token: string;
  workspaceLabel: string;
  children: ReactNode;
  /** Left nav sidebar — only after opening an outlet (outlet detail route). */
  showSidebar?: boolean;
};

export function WorkspacePageShell({
  workspaceId,
  token,
  workspaceLabel,
  children,
  showSidebar = false,
}: Props) {
  const header = (
    <header className="relative z-40 flex flex-wrap items-center justify-between gap-3 border-b border-border bg-background/95 px-4 py-3 shadow-sm backdrop-blur-sm md:px-6">
      <div className="flex min-w-0 flex-wrap items-center gap-2 sm:gap-3">
        <h1 className="shrink-0 font-heading text-lg font-semibold text-foreground">{APP_NAME}</h1>
        <WorkspaceSwitcher
          token={token}
          currentId={workspaceId}
          workspaceLabel={workspaceLabel}
        />
        <Link
          to="/"
          className={cn(buttonVariants({ variant: "outline", size: "sm" }), "shrink-0")}
        >
          {WORKSPACE_DASHBOARD_UI.back_to_workspaces}
        </Link>
      </div>
      <div className="flex flex-wrap items-center justify-end gap-2">
        <UserAccountMenu />
        <ThemeToggle />
      </div>
    </header>
  );

  return (
    <MainAppLayout workspaceId={workspaceId} showSidebar={showSidebar} header={header}>
      <main className="relative z-0 flex min-h-0 flex-1 flex-col p-4 md:p-6">{children}</main>
    </MainAppLayout>
  );
}
