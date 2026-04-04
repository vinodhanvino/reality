import { LogOut, Search, UserRound } from "lucide-react";
import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

import { BreadcrumbNav } from "@/components/common/BreadcrumbNav";
import { NavbarFilters } from "@/components/common/NavbarFilters";
import { MobileSidebarTrigger } from "@/components/common/Sidebar";
import { ThemeToggle } from "@/components/common/ThemeToggle";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { buttonVariants } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { useDebouncedValue } from "@/hooks/use-debounced-value";
import { useAuthStore } from "@/store/auth-store";
import { cn } from "@/lib/utils";

export function Navbar() {
  const [q, setQ] = useState("");
  const debounced = useDebouncedValue(q, 300);
  const navigate = useNavigate();
  const clearSession = useAuthStore((s) => s.clearSession);

  const searchHint = useMemo(
    () => (debounced ? `Search: ${debounced}` : "Search items…"),
    [debounced],
  );

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/80">
      <div className="flex h-14 items-center gap-3 px-4">
        <MobileSidebarTrigger />
        <div className="hidden min-w-0 flex-1 md:block">
          <BreadcrumbNav />
        </div>
        <div className="relative flex min-w-0 flex-1 md:max-w-md">
          <Search
            className="pointer-events-none absolute left-2.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
            aria-hidden
          />
          <Input
            className="pl-9"
            placeholder={searchHint}
            value={q}
            onChange={(e) => setQ(e.target.value)}
            aria-label="Search"
          />
        </div>
        <div className="ml-auto flex items-center gap-1">
          <ThemeToggle />
          <DropdownMenu>
            <DropdownMenuTrigger
              className={cn(buttonVariants({ variant: "ghost", size: "icon" }))}
              aria-label="Account menu"
            >
              <Avatar className="size-8">
                <AvatarFallback>
                  <UserRound className="size-4" />
                </AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuGroup>
                <DropdownMenuLabel>Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem disabled>Profile (soon)</DropdownMenuItem>
                <DropdownMenuItem
                  onSelect={() => {
                    clearSession();
                    navigate("/login", { replace: true });
                  }}
                >
                  <LogOut className="mr-2 size-4" />
                  Sign out
                </DropdownMenuItem>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      <div className="flex flex-col gap-3 border-t border-border px-4 py-2 md:hidden">
        <BreadcrumbNav />
        <NavbarFilters />
      </div>
    </header>
  );
}
