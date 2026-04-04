import { Menu, PanelLeftClose, PanelLeftOpen } from "lucide-react";
import { useState } from "react";

import { Button, buttonVariants } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useMediaQuery } from "@/hooks/use-media-query";
import { cn } from "@/lib/utils";
import { useSidebarStore } from "@/store/sidebar-store";

import { SidebarNavLinks } from "./SidebarNavLinks";

export function DesktopSidebar() {
  const { collapsed, toggle } = useSidebarStore();
  const isMobile = useMediaQuery("(max-width: 767px)");

  if (isMobile) return null;

  return (
    <aside
      aria-label="Application navigation"
      className={cn(
        "flex min-w-0 shrink-0 flex-col overflow-hidden border-r border-sidebar-border bg-sidebar text-sidebar-foreground transition-[width] duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] motion-reduce:transition-none",
        collapsed ? "w-[72px]" : "w-56",
      )}
    >
      <div className="flex h-14 min-w-0 items-center justify-between gap-2 border-b border-sidebar-border px-3">
        <span
          className={cn(
            "block min-w-0 truncate font-semibold tracking-tight transition-[max-width,opacity] duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] motion-reduce:transition-none",
            collapsed ? "max-w-0 opacity-0" : "max-w-[9rem] opacity-100",
          )}
          aria-hidden={collapsed}
        >
          Spirix
        </span>
        <Button
          type="button"
          variant="ghost"
          size="icon"
          className="shrink-0 text-sidebar-foreground transition-transform duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] motion-reduce:transition-none"
          onClick={toggle}
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {collapsed ? (
            <PanelLeftOpen className="size-4" />
          ) : (
            <PanelLeftClose className="size-4" />
          )}
        </Button>
      </div>
      <div className="flex-1 overflow-y-auto py-4">
        <SidebarNavLinks collapsed={collapsed} />
      </div>
    </aside>
  );
}

export function MobileSidebarTrigger() {
  const [open, setOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger
        className={cn(
          buttonVariants({ variant: "outline", size: "icon" }),
          "md:hidden",
        )}
        aria-label="Open menu"
      >
        <Menu className="size-4" />
      </SheetTrigger>
      <SheetContent
        side="left"
        className="w-64 bg-sidebar p-0 text-sidebar-foreground will-change-transform"
      >
        <SheetHeader className="border-b border-sidebar-border px-4 py-3">
          <SheetTitle className="text-left">Spirix</SheetTitle>
        </SheetHeader>
        <div className="py-4">
          <SidebarNavLinks onNavigate={() => setOpen(false)} />
        </div>
      </SheetContent>
    </Sheet>
  );
}
