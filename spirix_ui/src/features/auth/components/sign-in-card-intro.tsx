import { SIGN_IN_UX } from "@/config/app-settings";

export function SignInCardIntro() {
  return (
    <div className="mb-8 flex flex-col gap-2">
      <p className="text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-primary">
        {SIGN_IN_UX.card_eyebrow}
      </p>
      <h1 className="font-heading text-2xl font-semibold tracking-tight text-foreground sm:text-[1.75rem]">
        {SIGN_IN_UX.headline}
      </h1>
      <p className="text-pretty text-sm leading-relaxed text-muted-foreground">
        {SIGN_IN_UX.description}
      </p>
    </div>
  );
}
