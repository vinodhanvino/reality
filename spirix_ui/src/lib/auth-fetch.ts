import { handleSessionEnded } from "@/lib/handle-session-ended";

function authHeaders(token: string): Record<string, string> {
  return {
    Authorization: `Bearer ${token}`,
    "X-Auth-Token": token,
    auth: token,
  };
}

function mergeHeaders(token: string, initHeaders?: HeadersInit): Headers {
  const h = new Headers(initHeaders);
  Object.entries(authHeaders(token)).forEach(([k, v]) => h.set(k, v));
  return h;
}

/** Authenticated fetch; on 401 clears session and navigates to sign-in. */
export async function fetchWithAuth(
  input: string,
  token: string,
  init: RequestInit = {},
): Promise<Response> {
  const res = await fetch(input, {
    ...init,
    headers: mergeHeaders(token, init.headers),
  });
  if (res.status === 401) {
    handleSessionEnded();
  }
  return res;
}
