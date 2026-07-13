import { API_PROJECTS_PATH, getApiBaseUrl } from "@/config/app-settings";
import { fetchWithAuth } from "@/lib/auth-fetch";

export type OutletItem = {
  id: number;
  outlet_name: string;
  description: string | null;
  project_id: number;
  archived: boolean;
};

type ErrPayload = { detail?: string; error?: string };

function parseError(data: unknown, fallback: string): string {
  if (typeof data === "object" && data !== null) {
    const o = data as ErrPayload;
    if (typeof o.detail === "string") return o.detail;
    if (typeof o.error === "string") return o.error;
  }
  return fallback;
}

export async function fetchOutletsForWorkspace(
  token: string,
  projectId: number,
): Promise<OutletItem[]> {
  const url = `${getApiBaseUrl()}${API_PROJECTS_PATH}/${projectId}/outlets`;
  const res = await fetchWithAuth(url, token);
  const data: unknown = await res.json().catch(() => []);
  if (!res.ok) throw new Error(parseError(data, "Could not load outlets"));
  if (!Array.isArray(data)) return [];
  return data.filter((o): o is OutletItem => {
    if (typeof o !== "object" || o === null) return false;
    const r = o as Partial<OutletItem>;
    return typeof r.id === "number" && typeof r.outlet_name === "string";
  });
}

export async function createOutlet(
  token: string,
  projectId: number,
  payload: { outlet_name: string; description?: string },
): Promise<OutletItem> {
  const url = `${getApiBaseUrl()}${API_PROJECTS_PATH}/${projectId}/outlets`;
  const res = await fetchWithAuth(url, token, {
    method: "POST",
    headers: { "Content-Type": "application/json", accept: "application/json" },
    body: JSON.stringify({
      outlet_name: payload.outlet_name,
      description: payload.description?.trim() || null,
      more: {},
    }),
  });
  const data: unknown = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(parseError(data, "Could not create outlet"));
  return data as OutletItem;
}

export async function fetchOutletById(
  token: string,
  projectId: number,
  outletId: number,
): Promise<OutletItem> {
  const url = `${getApiBaseUrl()}${API_PROJECTS_PATH}/${projectId}/outlets/${outletId}`;
  const res = await fetchWithAuth(url, token);
  const data: unknown = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(parseError(data, "Could not load outlet"));
  return data as OutletItem;
}
