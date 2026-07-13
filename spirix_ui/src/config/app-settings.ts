/** App copy and API helpers (no secrets). */

export const APP_NAME = "Spirix";

export const APP_SIGN_IN_TAGLINE = "Sign in to continue";

/** Sign-in screen copy (marketing + form). */
export const SIGN_IN_UX = {
  brand_kicker: "Analytics workspace",
  /** Short line on the brand panel (large screens). */
  brand_panel_quote: "Clear signals. Confident decisions.",
  headline: "Welcome back",
  description:
    "Use the phone number, email, or username associated with your account.",
  login_id_label: "Login",
  login_id_helper: "Phone, email, or username",
  password_label: "Password",
  submit: "Continue",
  submitting: "Signing in?",
  card_eyebrow: "Secure access",
  footer_trust: "Protected by {app}. Only invited users can access this workspace.",
} as const;

/** Profile chip copy (headers + sign-in). */
export const PROFILE_UI = {
  fallback_user: "User",
  role_fallback: "Member",
  account_menu_aria: "Open account menu",
  account_panel_title: "Account",
  sign_out: "Sign out",
} as const;

/** Workspace dashboard header (switcher + navigation). */
export const WORKSPACE_DASHBOARD_UI = {
  back_to_workspaces: "Back to workspaces",
  workspace_switcher_aria: "Switch to another workspace",
} as const;

/** Left app sidebar (widths + animation ? tweak here, not in components). */
export const SIDEBAR_LAYOUT = {
  widthExpandedRem: 18,
  /** Icon-only rail when the pointer is not over the sidebar. */
  widthRailRem: 5.25,
  transitionMs: 280,
  /** Delay before collapsing after pointer leaves (reduces flicker). */
  hoverCollapseDelayMs: 220,
} as const;

export const SIDEBAR_UI = {
  workspaces: "Workspaces",
  dashboard: "Dashboard",
} as const;

/** Workspace dashboard: outlets list + outlet page copy. */
export const OUTLET_UI = {
  loading: "Loading outlets?",
  empty_title: "No outlet for this workspace",
  empty_body: "Create an outlet below to get started.",
  choose_title: "Outlets",
  create_outlet: "Create outlet",
  create_dialog_title: "Create outlet",
  create_dialog_hint: "Name and optional description.",
  create_name_placeholder: "Outlet name",
  create_desc_placeholder: "Description (optional)",
  create_submit: "Create",
  create_submitting: "Creating?",
  page_placeholder: "Outlet workspace ? content coming next.",
} as const;

export const AUTH_SIGN_IN_PATH = "/api/auth/signin" as const;
export const API_PROJECTS_PATH = "/api/v1/projects" as const;

export function getApiBaseUrl(): string {
  return (import.meta.env.VITE_API_BASE_URL ?? "").trim();
}

export function authStorageKey(): string {
  return (import.meta.env.VITE_AUTH_STORAGE_KEY ?? "spirix-auth").trim();
}

export function auditorRoleName(): string {
  return (import.meta.env.VITE_AUDITOR_ROLE ?? "Auditor").trim();
}

/** Dev-only: allow app routes without a token (see `.env.example`). */
export function isDevAuthBypass(): boolean {
  return import.meta.env.VITE_DEV_AUTH_BYPASS === "true";
}
