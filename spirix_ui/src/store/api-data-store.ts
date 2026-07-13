import { create } from "zustand";

import {
  createOutlet,
  fetchOutletById,
  fetchOutletsForWorkspace,
} from "@/features/outlets/api/outlets-api";
import {
  createProject,
  fetchProjectById,
  fetchProjects,
  type ProjectItem,
} from "@/features/projects/api/projects-api";
import { alignApiDataToken } from "@/store/api-data-store.align";
import type { ApiDataActions, ApiDataState } from "@/store/api-data-store.types";
import { emptyApiDataState } from "@/store/api-data-store.types";

export const useApiDataStore = create<ApiDataState & ApiDataActions>((set, get) => ({
  ...emptyApiDataState(),
  resetForAuth: () => set(emptyApiDataState()),
  ensureProjects: async (token: string) => {
    alignApiDataToken(get, set, token);
    const st = get().projectsListStatus;
    if (st === "ready" || st === "error") return;
    set({ projectsListStatus: "loading", projectsError: null });
    try {
      const rows = await fetchProjects(token);
      const map: Partial<Record<number, ProjectItem>> = { ...get().projectById };
      rows.forEach((r) => {
        map[r.id] = r;
      });
      set({ projects: rows, projectById: map, projectsListStatus: "ready" });
    } catch (e) {
      set({
        projectsListStatus: "error",
        projectsError: e instanceof Error ? e.message : "Failed",
        projects: null,
      });
    }
  },
  ensureProjectDetail: async (token: string, id: number) => {
    alignApiDataToken(get, set, token);
    if (get().projectById[id]) return;
    const p = await fetchProjectById(token, id);
    set((s) => ({ projectById: { ...s.projectById, [id]: p } }));
  },
  ensureOutlets: async (token: string, projectId: number) => {
    alignApiDataToken(get, set, token);
    if (get().outletsByProjectId[projectId] !== undefined) return;
    set({ outletsLoadingPid: projectId });
    try {
      const rows = await fetchOutletsForWorkspace(token, projectId);
      set((s) => ({
        outletsByProjectId: { ...s.outletsByProjectId, [projectId]: rows },
        outletsErrorByProjectId: { ...s.outletsErrorByProjectId, [projectId]: undefined },
      }));
    } catch (e) {
      const msg = e instanceof Error ? e.message : "Failed";
      set((s) => ({
        outletsByProjectId: { ...s.outletsByProjectId, [projectId]: [] },
        outletsErrorByProjectId: { ...s.outletsErrorByProjectId, [projectId]: msg },
      }));
    } finally {
      set({ outletsLoadingPid: null });
    }
  },
  ensureOutletDetail: async (token: string, projectId: number, outletId: number) => {
    alignApiDataToken(get, set, token);
    const key = `${projectId}-${outletId}`;
    if (get().outletByKey[key]) return;
    const o = await fetchOutletById(token, projectId, outletId);
    set((s) => ({ outletByKey: { ...s.outletByKey, [key]: o } }));
  },
  createProjectAndCache: async (token, payload) => {
    alignApiDataToken(get, set, token);
    const row = await createProject(token, payload);
    set((s) => ({
      projects: s.projects ? [row, ...s.projects] : [row],
      projectById: { ...s.projectById, [row.id]: row },
      projectsListStatus: "ready",
      projectsError: null,
    }));
    return row;
  },
  createOutletAndCache: async (token, projectId, payload) => {
    alignApiDataToken(get, set, token);
    const row = await createOutlet(token, projectId, payload);
    const key = `${projectId}-${row.id}`;
    set((s) => {
      const cur = s.outletsByProjectId[projectId];
      const next = cur ? [row, ...cur] : [row];
      return {
        outletsByProjectId: { ...s.outletsByProjectId, [projectId]: next },
        outletByKey: { ...s.outletByKey, [key]: row },
      };
    });
    return row;
  },
}));
