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
        <h1 className="type-page-title mb-6 text-center">
          {howItWorks.subtitle}
        </h1>
        <p className="type-body mb-12 text-center">
          {howItWorks.intro}
        </p>

        <FlowSteps steps={howItWorks.steps} />

        <div className="mt-10 rounded-xl border border-white/[0.08] bg-white/[0.02] p-5">
          <p className="type-body-sm text-zinc-300">
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
