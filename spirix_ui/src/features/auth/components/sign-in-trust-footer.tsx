import { APP_NAME, SIGN_IN_UX } from "@/config/app-settings";

export function SignInTrustFooter() {
  return (
    <p className="text-center text-xs leading-relaxed text-muted-foreground">
      {SIGN_IN_UX.footer_trust.replace("{app}", APP_NAME)}
    </p>
  );
}
