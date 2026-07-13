import { API_PROJECTS_PATH, getApiBaseUrl } from "@/config/app-settings";
import { fetchWithAuth } from "@/lib/auth-fetch";

export type ProjectItem = {
  id: number;
  project_name: string;
  description: string | null;
};

type ProjectPayload = { detail?: string; error?: string };

function parseError(data: unknown, fallback: string): string {
  if (typeof data === "object" && data !== null) {
    const o = data as ProjectPayload;
    if (typeof o.detail === "string") return o.detail;
    if (typeof o.error === "string") return o.error;
  }
  return fallback;
}

export async function fetchProjects(token: string): Promise<ProjectItem[]> {
  const res = await fetchWithAuth(`${getApiBaseUrl()}${API_PROJECTS_PATH}`, token);
  const data: unknown = await res.json().catch(() => []);
  if (!res.ok) throw new Error(parseError(data, "Could not load projects"));
  if (!Array.isArray(data)) return [];
  return data.filter((p): p is ProjectItem => {
    if (typeof p !== "object" || p === null) return false;
    const o = p as Partial<ProjectItem>;
    return typeof o.id === "number" && typeof o.project_name === "string";
  });
}

export async function createProject(
  token: string,
  payload: { project_name: string; description?: string },
): Promise<ProjectItem> {
  const res = await fetchWithAuth(`${getApiBaseUrl()}${API_PROJECTS_PATH}`, token, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      accept: "application/json",
    },
    body: JSON.stringify({
      project_name: payload.project_name,
      description: payload.description?.trim() || null,
      more: {},
    }),
  });
  const data: unknown = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(parseError(data, "Could not create project"));
  return data as ProjectItem;
}

export async function fetchProjectById(token: string, projectId: number): Promise<ProjectItem> {
  const res = await fetchWithAuth(`${getApiBaseUrl()}${API_PROJECTS_PATH}/${projectId}`, token);
  const data: unknown = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(parseError(data, "Could not load project"));
  return data as ProjectItem;
}
