import type { ReactNode } from "react";
import { Navigate, useLocation } from "react-router-dom";

import { isDevAuthBypass } from "@/env";
import { useAuthStore } from "@/store/auth-store";

export function ProtectedRoute({ children }: { children: ReactNode }) {
  const token = useAuthStore((s) => s.token);
  const location = useLocation();
  const allowed = Boolean(token) || isDevAuthBypass;

  if (!allowed) {
    return (
      <Navigate to="/login" replace state={{ from: location.pathname }} />
    );
  }
  return children;
}
