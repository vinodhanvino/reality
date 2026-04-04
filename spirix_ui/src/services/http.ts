import { env } from "@/env";
import { useAuthStore } from "@/store/auth-store";

function joinUrl(base: string, path: string): string {
  if (path.startsWith("http")) return path;
  const b = base.replace(/\/$/, "");
  const p = path.startsWith("/") ? path : `/${path}`;
  return `${b}${p}`;
}

export async function httpFetch(
  path: string,
  init: RequestInit = {},
): Promise<Response> {
  const token = useAuthStore.getState().token;
  const headers = new Headers(init.headers);
  if (token) headers.set("Authorization", `Bearer ${token}`);
  const body = init.body;
  if (
    body &&
    typeof body === "string" &&
    !headers.has("Content-Type")
  ) {
    headers.set("Content-Type", "application/json");
  }
  const url = joinUrl(env.VITE_API_BASE_URL || window.location.origin, path);
  return fetch(url, {
    ...init,
    headers,
    credentials: "include",
  });
}
