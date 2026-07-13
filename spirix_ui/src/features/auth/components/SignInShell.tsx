import type { ReactNode } from "react";

import { AppShellBackdrop } from "@/components/common/AppShellBackdrop";
import { APP_NAME, SIGN_IN_UX } from "@/config/app-settings";
import { cn } from "@/lib/utils";

type Props = {
  children: ReactNode;
  /** e.g. theme toggle — pinned to the viewport corner */
  cornerSlot?: ReactNode;
};

export function SignInShell({ children, cornerSlot }: Props) {
  const year = new Date().getFullYear();

  return (
    <div className="relative min-h-dvh bg-background">
      {cornerSlot ? (
        <div className="absolute right-4 top-4 z-20 md:right-6 md:top-6">{cornerSlot}</div>
      ) : null}

      <div className="grid min-h-dvh lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)]">
        <aside
          className={cn(
            "relative hidden flex-col justify-between overflow-hidden px-10 py-12 xl:px-14 xl:py-16",
            "lg:flex",
          )}
          aria-label={`${APP_NAME} — ${SIGN_IN_UX.brand_kicker}`}
        >
          <AppShellBackdrop />

          <div className="relative z-10 flex flex-col gap-6">
            <div className="flex items-center gap-3">
              <div
                className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-primary text-base font-bold tracking-tight text-primary-foreground shadow-md ring-1 ring-primary/20"
                aria-hidden
              >
                {APP_NAME.slice(0, 1)}
              </div>
              <div className="flex flex-col gap-0.5">
                <span className="font-heading text-lg font-semibold tracking-tight text-foreground">
                  {APP_NAME}
                </span>
                <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  {SIGN_IN_UX.brand_kicker}
                </span>
              </div>
            </div>
            <p className="max-w-sm text-pretty text-lg font-medium leading-snug tracking-tight text-foreground/90 md:text-xl md:leading-snug">
              {SIGN_IN_UX.brand_panel_quote}
            </p>
          </div>

          <p className="relative z-10 text-xs text-muted-foreground">
            © {year} {APP_NAME}
          </p>
        </aside>

        <div className="flex flex-col justify-center px-4 py-10 sm:px-8 lg:px-12 lg:py-16 xl:px-16">
          <div className="mx-auto w-full max-w-[420px]">
            <div className="mb-6 flex items-center gap-3 lg:hidden">
              <div
                className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary text-sm font-bold tracking-tight text-primary-foreground shadow-md ring-1 ring-primary/20"
                aria-hidden
              >
                {APP_NAME.slice(0, 1)}
              </div>
              <div className="flex min-w-0 flex-col">
                <span className="truncate font-heading text-base font-semibold tracking-tight text-foreground">
                  {APP_NAME}
                </span>
                <span className="truncate text-xs text-muted-foreground">
                  {SIGN_IN_UX.brand_kicker}
                </span>
              </div>
            </div>
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
