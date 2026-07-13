import { memo, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronDown } from "lucide-react";

import { PROFILE_UI } from "@/config/app-settings";
import { profileInitialsFromLabel } from "@/lib/profile-initials";
import { cn } from "@/lib/utils";
import { useAuthStore } from "@/store/auth-store";

function UserAccountMenuComponent() {
  const navigate = useNavigate();
  const wrapRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);
  const signOut = useAuthStore((s) => s.signOut);
  const loginId = useAuthStore((s) => s.loginId);
  const role = useAuthStore((s) => s.role);

  const label = loginId?.trim() || PROFILE_UI.fallback_user;
  const roleLine = role?.trim() || PROFILE_UI.role_fallback;

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    const onDown = (e: MouseEvent) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onDown);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("mousedown", onDown);
    };
  }, [open]);

  return (
    <div className="relative z-20" ref={wrapRef}>
      <button
        type="button"
        className={cn(
          "inline-flex max-w-[220px] items-center gap-2 rounded-lg border border-border bg-card/90 px-2 py-1.5 text-left shadow-sm outline-none transition",
          "hover:bg-muted/40 focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/50",
        )}
        aria-expanded={open}
        aria-haspopup="menu"
        aria-label={PROFILE_UI.account_menu_aria}
        onClick={() => setOpen((v) => !v)}
      >
        <span
          className="flex size-8 shrink-0 items-center justify-center rounded-md bg-primary/15 text-[10px] font-bold tracking-tight text-primary"
          aria-hidden
        >
          {profileInitialsFromLabel(label)}
        </span>
        <div className="min-w-0 flex-1">
          <p className="truncate text-xs font-semibold text-foreground">{label}</p>
          <p className="truncate text-[10px] text-muted-foreground">{roleLine}</p>
        </div>
        <ChevronDown
          className={cn("size-3.5 shrink-0 text-muted-foreground transition", open && "rotate-180")}
          aria-hidden
        />
      </button>
      {open ? (
        <div
          role="menu"
          className="absolute right-0 z-[100] mt-1 min-w-[13.5rem] rounded-lg border border-border bg-popover p-1 text-popover-foreground shadow-md"
        >
          <div className="border-b border-border px-3 py-2.5">
            <p className="text-[10px] font-semibold uppercase tracking-wide text-muted-foreground">
              {PROFILE_UI.account_panel_title}
            </p>
            <p className="mt-1 truncate text-xs font-medium text-foreground">{label}</p>
            <p className="truncate text-[10px] text-muted-foreground">{roleLine}</p>
          </div>
          <button
            type="button"
            role="menuitem"
            className="mt-1 flex w-full items-center rounded-md px-3 py-2 text-left text-xs font-medium text-destructive hover:bg-destructive/10"
            onClick={() => {
              signOut();
              setOpen(false);
              navigate("/signin", { replace: true });
            }}
          >
            {PROFILE_UI.sign_out}
          </button>
        </div>
      ) : null}
    </div>
  );
}

UserAccountMenuComponent.displayName = "UserAccountMenu";

export const UserAccountMenu = memo(UserAccountMenuComponent);
