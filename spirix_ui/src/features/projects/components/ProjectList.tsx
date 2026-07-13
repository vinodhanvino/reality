import { memo } from "react";
import { ChevronRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { CreateWorkspaceCard } from "@/features/projects/components/CreateWorkspaceCard";
import type { ProjectItem } from "@/features/projects/api/projects-api";

type Props = {
  items: ProjectItem[];
  canCreate: boolean;
  onCreateClick: () => void;
  onOpenWorkspace: (id: number) => void;
};

function ProjectListComponent({ items, canCreate, onCreateClick, onOpenWorkspace }: Props) {
  if (!items.length) {
    return (
      <section className="grid gap-3 rounded-2xl border border-border bg-card p-3 shadow-sm md:grid-cols-[repeat(auto-fill,minmax(200px,1fr))]">
        {canCreate ? (
          <CreateWorkspaceCard onClick={onCreateClick} />
        ) : null}
        <div className="grid min-h-[112px] place-items-center rounded-lg border border-dashed border-border px-3 py-3 text-center">
          <div>
            <p className="text-sm font-semibold tracking-tight">No matching workspaces</p>
            <p className="mt-1 text-xs text-muted-foreground">Try adjusting search terms.</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="rounded-2xl border border-border bg-card p-3 shadow-sm">
      <div className="grid max-h-[65vh] grid-cols-[repeat(auto-fill,minmax(200px,1fr))] items-start gap-3 overflow-y-auto">
        {canCreate ? (
          <CreateWorkspaceCard onClick={onCreateClick} />
        ) : null}
        {items.map((p) => {
          return (
            <article
              key={p.id}
              className="grid min-h-[128px] grid-rows-[auto_1fr_auto] rounded-lg border border-border bg-card p-3.5 hover:bg-muted/20"
            >
              <div className="flex min-h-0 items-start gap-2">
                <p className="truncate text-xs font-semibold tracking-tight">{p.project_name}</p>
              </div>
              <p className="mt-1 line-clamp-2 text-[11px] leading-snug text-muted-foreground">
                {p.description || "No description"}
              </p>
              <div className="mt-2 flex justify-end">
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => onOpenWorkspace(p.id)}
                >
                  Open
                  <ChevronRight className="size-4" />
                </Button>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}

ProjectListComponent.displayName = "ProjectList";

export const ProjectList = memo(ProjectListComponent);
