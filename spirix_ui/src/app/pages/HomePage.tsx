import { memo } from "react";

import { ThemeToggle } from "@/components/common/ThemeToggle";
import { UserAccountMenu } from "@/components/common/UserAccountMenu";
import { AppShellBackdrop } from "@/components/common/AppShellBackdrop";
import { APP_NAME } from "@/config/app-settings";
import { ProjectHub } from "@/features/projects/components/ProjectHub";
import { useAuthStore } from "@/store/auth-store";

function HomePageComponent() {
  const token = useAuthStore((s) => s.token);
  const role = useAuthStore((s) => s.role);

  const header = (
    <header className="relative z-30 flex flex-wrap items-center justify-between gap-3 border-b border-border bg-background/85 px-4 py-3 backdrop-blur-sm md:px-6">
      <h1 className="font-heading text-lg font-semibold text-foreground">{APP_NAME}</h1>
      <div className="flex flex-wrap items-center justify-end gap-2">
        <UserAccountMenu />
        <ThemeToggle />
      </div>
    </header>
  );

  return (
    <div className="relative flex min-h-dvh flex-col overflow-hidden bg-background">
      <AppShellBackdrop />
      {header}
      <main className="relative z-0 flex flex-1 flex-col p-4 md:p-6">
        {token ? <ProjectHub token={token} role={role} /> : null}
      </main>
    </div>
  );
}

HomePageComponent.displayName = "HomePage";

export const HomePage = memo(HomePageComponent);
export default HomePage;
