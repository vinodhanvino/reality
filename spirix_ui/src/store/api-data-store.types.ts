import type { OutletItem } from "@/features/outlets/api/outlets-api";
import type { ProjectItem } from "@/features/projects/api/projects-api";

export type ProjectsListStatus = "idle" | "loading" | "ready" | "error";

export type ApiDataState = {
  cacheToken: string | null;
  projects: ProjectItem[] | null;
  projectsListStatus: ProjectsListStatus;
  projectsError: string | null;
  projectById: Partial<Record<number, ProjectItem>>;
  outletsByProjectId: Partial<Record<number, OutletItem[] | undefined>>;
  outletsErrorByProjectId: Partial<Record<number, string | undefined>>;
  outletsLoadingPid: number | null;
  outletByKey: Partial<Record<string, OutletItem>>;
};

export type ApiDataActions = {
  resetForAuth: () => void;
  ensureProjects: (token: string) => Promise<void>;
  ensureProjectDetail: (token: string, id: number) => Promise<void>;
  ensureOutlets: (token: string, projectId: number) => Promise<void>;
  ensureOutletDetail: (token: string, projectId: number, outletId: number) => Promise<void>;
  createProjectAndCache: (
    token: string,
    payload: { project_name: string; description?: string },
  ) => Promise<ProjectItem>;
  createOutletAndCache: (
    token: string,
    projectId: number,
    payload: { outlet_name: string; description?: string },
  ) => Promise<OutletItem>;
};

export const emptyApiDataState = (): Omit<
  ApiDataState,
  "cacheToken"
> & { cacheToken: null } => ({
  cacheToken: null,
  projects: null,
  projectsListStatus: "idle",
  projectsError: null,
  projectById: {},
  outletsByProjectId: {},
  outletsErrorByProjectId: {},
  outletsLoadingPid: null,
  outletByKey: {},
});
