import type { ReactNode } from "react";
import { Navigate, useLocation } from "react-router-dom";

import { RouteFallback } from "@/components/common/RouteFallback";
import { isDevAuthBypass } from "@/config/app-settings";
import { useAuthStoreHydrated } from "@/hooks/use-auth-store-hydrated";
import { useAuthStore } from "@/store/auth-store";

type Props = { children: ReactNode };

export function ProtectedRoute({ children }: Props) {
  const token = useAuthStore((s) => s.token);
  const hydrated = useAuthStoreHydrated();
  const location = useLocation();

  if (!hydrated) {
    return <RouteFallback />;
  }

  if (isDevAuthBypass()) {
    return <>{children}</>;
  }

  if (!token) {
    return <Navigate to="/signin" replace state={{ from: location }} />;
  }

  return <>{children}</>;
}
