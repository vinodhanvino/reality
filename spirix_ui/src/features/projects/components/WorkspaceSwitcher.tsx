import { memo, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { ChevronDown } from "lucide-react";

import { buttonVariants } from "@/components/ui/button";
import { WORKSPACE_DASHBOARD_UI } from "@/config/app-settings";
import { useProjectList } from "@/features/projects/hooks/use-project-list";
import { cn } from "@/lib/utils";

type Props = {
  token: string;
  currentId: number;
  workspaceLabel: string;
};

function WorkspaceSwitcherComponent({ token, currentId, workspaceLabel }: Props) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);
  const { items, loaded } = useProjectList(token);
  const others = items.filter((p) => p.id !== currentId);
  const canOpen = loaded && others.length > 0;
  const chipClass = cn(
    buttonVariants({ variant: "outline", size: "sm" }),
    "min-w-0 max-w-[min(100vw-10rem,20rem)] shrink-0 text-left font-normal",
  );

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

  useEffect(() => {
    setOpen(false);
  }, [currentId]);

  if (!canOpen) {
    return (
      <span
        className={cn(chipClass, "inline-flex cursor-default items-center justify-start")}
        title={workspaceLabel}
      >
        <span className="min-w-0 truncate">{workspaceLabel}</span>
      </span>
    );
  }

  return (
    <div className="relative min-w-0" ref={wrapRef}>
      <button
        type="button"
        className={cn(chipClass, "inline-flex items-center justify-between gap-1")}
        aria-expanded={open}
        aria-haspopup="menu"
        aria-label={WORKSPACE_DASHBOARD_UI.workspace_switcher_aria}
        onClick={() => setOpen((v) => !v)}
      >
        <span className="min-w-0 flex-1 truncate text-left">{workspaceLabel}</span>
        <ChevronDown
          className={cn("size-3.5 shrink-0 opacity-70 transition", open && "rotate-180")}
          aria-hidden
        />
      </button>
      {open ? (
        <div
          role="menu"
          className="absolute left-0 z-50 mt-1 min-w-[12rem] max-w-[min(calc(100vw-2rem),18rem)] rounded-lg border border-border bg-popover p-1 text-popover-foreground shadow-md"
        >
          {others.map((p) => (
            <Link
              key={p.id}
              role="menuitem"
              to={`/workspace/${p.id}/dashboard`}
              className="block truncate rounded-md px-3 py-2 text-xs hover:bg-muted"
              onClick={() => setOpen(false)}
            >
              {p.project_name}
            </Link>
          ))}
        </div>
      ) : null}
    </div>
  );
}

WorkspaceSwitcherComponent.displayName = "WorkspaceSwitcher";

export const WorkspaceSwitcher = memo(WorkspaceSwitcherComponent);
