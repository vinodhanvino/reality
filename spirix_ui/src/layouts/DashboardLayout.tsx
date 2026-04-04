import { Outlet } from "react-router-dom";

import { Navbar } from "@/components/common/Navbar";
import { DesktopSidebar } from "@/components/common/Sidebar";
import { analytics } from "@/config/analytics-theme";
import { cn } from "@/lib/utils";

export function DashboardLayout() {
  return (
    <div className="flex h-svh w-full">
      <DesktopSidebar />
      <div className="flex min-w-0 flex-1 flex-col">
        <Navbar />
        <main className={cn("flex-1 overflow-auto p-6", analytics.pageCanvas)}>
          <Outlet />
        </main>
      </div>
    </div>
  );
}
