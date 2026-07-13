import { FolderKanban, ShieldCheck } from "lucide-react";

import { Input } from "@/components/ui/input";

type Props = {
  canCreate: boolean;
  role: string | null;
  total: number;
  filtered: number;
  query: string;
  onQueryChange: (value: string) => void;
};

export function ProjectHubHeader({
  canCreate,
  role,
  total,
  filtered,
  query,
  onQueryChange,
}: Props) {
  return (
    <header className="rounded-2xl border border-border bg-card p-8 shadow-sm">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div className="min-w-0">
          <p className="text-xs font-semibold tracking-widest text-muted-foreground uppercase">
            Workspace
          </p>
          <h2 className="mt-1 text-2xl font-semibold tracking-tight">Projects</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            {canCreate ? "Create and manage projects for your team." : "Open one of your assigned projects."}
          </p>
        </div>
        <div className="grid w-full gap-3 sm:w-auto sm:grid-cols-2">
          <div className="min-w-[240px] rounded-xl border border-border bg-background px-4 py-3">
            <p className="text-[11px] text-muted-foreground">Total projects</p>
            <p className="mt-1 flex items-center gap-2 text-sm font-semibold">
              <FolderKanban className="size-4 text-primary" />
              {total}
            </p>
          </div>
          <div className="min-w-[240px] rounded-xl border border-border bg-background px-4 py-3">
            <p className="text-[11px] text-muted-foreground">Role</p>
            <p className="mt-1 flex items-center gap-2 text-sm font-semibold">
              <ShieldCheck className="size-4 text-primary" />
              {role || "User"}
            </p>
          </div>
        </div>
      </div>
      <div className="mt-4 grid gap-2 md:grid-cols-[1fr_auto]">
        <Input
          value={query}
          onChange={(e) => onQueryChange(e.target.value)}
          placeholder="Search workspaces by name, description, or id"
          className="h-10"
        />
        <p className="self-center text-xs text-muted-foreground">Showing {filtered} of {total}</p>
      </div>
    </header>
  );
}
