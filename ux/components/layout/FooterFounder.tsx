import Image from "next/image";
import { founders, footer } from "@/lib/settings";

export function FooterFounder() {
  return (
    <div className="w-full max-w-md lg:max-w-sm">
      <p className="section-label mb-4 text-left text-zinc-500">{footer.leadershipLabel}</p>
      <div className="rounded-2xl border border-white/[0.09] bg-gradient-to-br from-white/[0.05] via-transparent to-primary/[0.06] p-5 shadow-lg">
        {founders.map((f) => (
          <div key={f.name} className="flex gap-5">
            {"image" in f && f.image ? (
              <div className="relative h-[88px] w-[88px] shrink-0">
                <div
                  className="absolute -inset-0.5 rounded-full bg-gradient-to-br from-accent/50 via-primary/40 to-accent/30 opacity-80 blur-[2px]"
                  aria-hidden
                />
                <div className="relative h-full w-full overflow-hidden rounded-full border-2 border-white/15 bg-surface p-0.5 shadow-inner">
                  <Image
                    src={f.image}
                    alt={f.name}
                    width={88}
                    height={88}
                    className="h-full w-full rounded-full object-cover"
                  />
                </div>
              </div>
            ) : null}
            <div className="min-w-0 flex-1 pt-0.5">
              <p className="font-display text-lg font-semibold leading-snug text-white">{f.name}</p>
              <p className="mt-1 text-sm font-medium text-accent/90">{f.role}</p>
              <p className="mt-3 text-sm leading-relaxed text-zinc-400">{footer.founderBio}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
