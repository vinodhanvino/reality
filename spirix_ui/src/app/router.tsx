import { lazy, Suspense, type ReactNode } from "react";
import { createBrowserRouter } from "react-router-dom";

import { ErrorBoundary } from "@/components/common/ErrorBoundary";
import { ProtectedRoute } from "@/components/common/ProtectedRoute";
import { RouteFallback } from "@/components/common/RouteFallback";

const SignInPage = lazy(() => import("@/features/auth/pages/SignInPage"));
const HomePage = lazy(() => import("@/app/pages/HomePage"));
const WorkspaceDashboardPage = lazy(() => import("@/features/projects/pages/WorkspaceDashboardPage"));
const OutletPage = lazy(() => import("@/features/outlets/pages/OutletPage"));

function withRouteShell(node: ReactNode) {
  return (
    <ErrorBoundary>
      <Suspense fallback={<RouteFallback />}>{node}</Suspense>
    </ErrorBoundary>
  );
}

export const router = createBrowserRouter([
  {
    path: "/signin",
    element: withRouteShell(<SignInPage />),
  },
  {
    path: "/",
    element: withRouteShell(
      <ProtectedRoute>
        <HomePage />
      </ProtectedRoute>,
    ),
  },
  {
    path: "/workspace/:workspaceId/dashboard",
    element: withRouteShell(
      <ProtectedRoute>
        <WorkspaceDashboardPage />
      </ProtectedRoute>,
    ),
  },
  {
    path: "/workspace/:workspaceId/outlet/:outletId",
    element: withRouteShell(
      <ProtectedRoute>
        <OutletPage />
      </ProtectedRoute>,
    ),
  },
]);
