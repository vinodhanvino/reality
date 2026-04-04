import { lazy, Suspense } from "react";
import { createBrowserRouter } from "react-router-dom";

import { ErrorBoundary } from "@/components/common/ErrorBoundary";
import { PageLoader } from "@/components/common/Loader";
import { ProtectedRoute } from "@/components/common/ProtectedRoute";
import { DashboardLayout } from "@/layouts/DashboardLayout";

const DashboardPage = lazy(
  () => import("@/features/dashboard/pages/DashboardPage"),
);
const UploadsPage = lazy(() => import("@/features/dashboard/pages/UploadsPage"));
const LoginPage = lazy(() => import("@/features/auth/pages/LoginPage"));

export const router = createBrowserRouter([
  {
    path: "/login",
    element: (
      <ErrorBoundary>
        <Suspense fallback={<PageLoader />}>
          <LoginPage />
        </Suspense>
      </ErrorBoundary>
    ),
  },
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <ErrorBoundary>
          <DashboardLayout />
        </ErrorBoundary>
      </ProtectedRoute>
    ),
    handle: { crumb: "Dashboard" },
    children: [
      {
        index: true,
        element: (
          <Suspense fallback={<PageLoader />}>
            <DashboardPage />
          </Suspense>
        ),
      },
      {
        path: "uploads",
        handle: { crumb: "Uploads" },
        element: (
          <Suspense fallback={<PageLoader />}>
            <UploadsPage />
          </Suspense>
        ),
      },
    ],
  },
]);
