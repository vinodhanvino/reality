import { httpFetch } from "@/services/http";

export class ApiError extends Error {
  status: number;
  body?: unknown;

  constructor(message: string, status: number, body?: unknown) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.body = body;
  }
}

async function parseJsonSafe(res: Response): Promise<unknown> {
  const text = await res.text();
  if (!text) return undefined;
  try {
    return JSON.parse(text) as unknown;
  } catch {
    return text;
  }
}

export async function apiGet<T>(path: string): Promise<T> {
  const res = await httpFetch(path, { method: "GET" });
  const body = await parseJsonSafe(res);
  if (!res.ok) {
    throw new ApiError(res.statusText || "Request failed", res.status, body);
  }
  return body as T;
}

export async function apiPost<T, B = unknown>(
  path: string,
  data?: B,
): Promise<T> {
  const res = await httpFetch(path, {
    method: "POST",
    body: data !== undefined ? JSON.stringify(data) : undefined,
  });
  const body = await parseJsonSafe(res);
  if (!res.ok) {
    throw new ApiError(res.statusText || "Request failed", res.status, body);
  }
  return body as T;
}

export async function apiPostForm<T>(
  path: string,
  form: FormData,
): Promise<T> {
  const res = await httpFetch(path, { method: "POST", body: form });
  const body = await parseJsonSafe(res);
  if (!res.ok) {
    throw new ApiError(res.statusText || "Request failed", res.status, body);
  }
  return body as T;
}
