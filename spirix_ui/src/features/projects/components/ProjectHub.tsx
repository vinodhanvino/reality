import { memo, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { auditorRoleName } from "@/config/app-settings";
import { ProjectCreateDialog } from "@/features/projects/components/ProjectCreateDialog";
import { ProjectHubHeader } from "@/features/projects/components/ProjectHubHeader";
import { ProjectList } from "@/features/projects/components/ProjectList";
import { useApiDataStore } from "@/store/api-data-store";

type Props = { token: string; role: string | null };

function ProjectHubComponent({ token, role }: Props) {
  const navigate = useNavigate();
  const projects = useApiDataStore((s) => s.projects);
  const listStatus = useApiDataStore((s) => s.projectsListStatus);
  const projectsError = useApiDataStore((s) => s.projectsError);
  const ensureProjects = useApiDataStore((s) => s.ensureProjects);
  const createProjectAndCache = useApiDataStore((s) => s.createProjectAndCache);
  const [creating, setCreating] = useState(false);
  const [createOpen, setCreateOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [query, setQuery] = useState("");
  const canCreate = useMemo(() => role === auditorRoleName(), [role]);
  const items = projects ?? [];

  useEffect(() => {
    void ensureProjects(token);
  }, [token, ensureProjects]);

  const filteredItems = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return items;
    return items.filter((p) => {
      return (
        p.project_name.toLowerCase().includes(q) ||
        (p.description || "").toLowerCase().includes(q) ||
        String(p.id).includes(q)
      );
    });
  }, [items, query]);

  async function handleCreate(name: string, description: string) {
    setCreating(true);
    setError(null);
    try {
      await createProjectAndCache(token, { project_name: name, description });
    } catch (e) {
      setError(e instanceof Error ? e.message : "Could not create project");
    } finally {
      setCreating(false);
    }
  }

  const loading = listStatus === "loading" || listStatus === "idle";
  const listError = projectsError ?? error;

  if (loading) return <p className="text-sm text-muted-foreground">Loading workspace...</p>;

  return (
    <section className="mx-auto grid w-full max-w-[1200px] gap-4 px-6 py-8">
      <ProjectHubHeader
        canCreate={canCreate}
        role={role}
        total={items.length}
        filtered={filteredItems.length}
        query={query}
        onQueryChange={setQuery}
      />
      {canCreate ? (
        <ProjectCreateDialog
          open={createOpen}
          pending={creating}
          onClose={() => setCreateOpen(false)}
          onCreate={handleCreate}
        />
      ) : null}
      {listError ? (
        <p className="rounded-xl border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive">
          {listError}
        </p>
      ) : null}
      <ProjectList
        items={filteredItems}
        canCreate={canCreate}
        onCreateClick={() => setCreateOpen(true)}
        onOpenWorkspace={(id) => navigate(`/workspace/${id}/dashboard`)}
      />
    </section>
  );
}

ProjectHubComponent.displayName = "ProjectHub";

export const ProjectHub = memo(ProjectHubComponent);
