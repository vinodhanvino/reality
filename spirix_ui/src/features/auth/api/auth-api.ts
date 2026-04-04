import { apiPost } from "@/services/api-client";
import type { Role } from "@/types";

type AuthResponse = {
  token: string;
  role: string;
  user_name: string;
};

const toRole = (role: string): Role =>
  role === "admin" || role === "editor" ? role : "viewer";

export async function signInApi(email: string, password: string) {
  const body = await apiPost<AuthResponse, { email: string; password: string }>(
    "/auth/sign-in",
    { email, password },
  );
  return { token: body.token, roles: [toRole(body.role)] as Role[] };
}

export async function signUpApi(user_name: string, email: string, password: string) {
  const body = await apiPost<
    AuthResponse,
    { user_name: string; email: string; password: string }
  >("/auth/sign-up", { user_name, email, password });
  return { token: body.token, roles: [toRole(body.role)] as Role[] };
}
