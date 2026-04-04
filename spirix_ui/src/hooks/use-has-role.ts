import type { Role } from "@/types";
import { useAuthStore } from "@/store/auth-store";

/** RBAC helper — extend with server-synced roles when your API is ready. */
export function useHasRole(role: Role): boolean {
  return useAuthStore((s) => s.hasRole(role));
}
