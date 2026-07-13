import { useEffect } from "react";

import { useApiDataStore } from "@/store/api-data-store";

/** Subscribes to cached project list and triggers a single fetch per token when needed. */
export function useProjectList(token: string) {
  const projects = useApiDataStore((s) => s.projects);
  const status = useApiDataStore((s) => s.projectsListStatus);
  const ensureProjects = useApiDataStore((s) => s.ensureProjects);

  useEffect(() => {
    void ensureProjects(token);
  }, [token, ensureProjects]);

  return {
    items: projects ?? [],
    loaded: status === "ready" || status === "error",
  };
}
