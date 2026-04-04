import Link from "next/link";
import { Button } from "@/components/ui/button";
import { FlowSteps } from "@/components/how-it-works/FlowSteps";
import { howItWorks } from "@/lib/settings";

export const metadata = {
  title: "How It Works | Spirix",
  description:
    "From inventory in the app to upload, sales, purchase, NC spoilage—see how Spirix finds variance you can act on.",
};

export default function HowItWorksPage() {
  return (
    <div className="min-h-screen pt-24 pb-20 px-4">
      <div className="mx-auto max-w-2xl">
        <p className="section-label text-center mb-3">{howItWorks.title}</p>
        <h1 className="font-display text-4xl sm:text-5xl font-bold text-white text-center mb-6">
          {howItWorks.subtitle}
        </h1>
        <p className="text-zinc-400 text-lg text-center mb-12">
          {howItWorks.intro}
        </p>

        <FlowSteps steps={howItWorks.steps} />

        <div className="mt-10 rounded-xl border border-white/[0.08] bg-white/[0.02] p-5">
          <p className="text-white/80 text-sm leading-relaxed">
            {howItWorks.outcomeNote}
          </p>
        </div>

        <div className="flex justify-center mt-12">
          <Button asChild size="lg">
            <Link href="/book-demo">{howItWorks.cta}</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
