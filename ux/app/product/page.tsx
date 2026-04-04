import Link from "next/link";
import { Button } from "@/components/ui/button";
import { AIHelpCard } from "@/components/product/AIHelpCard";
import { DashboardHighlight } from "@/components/product/DashboardHighlight";
import { productPage } from "@/lib/settings";

export const metadata = {
  title: "Product | Spirix",
  description:
    "How Spirix uses AI to help bars control inventory, explain variance, and stop leakage.",
};

export default function ProductPage() {
  return (
    <div className="min-h-screen pt-24 pb-20 px-4">
      <div className="mx-auto max-w-3xl">
        <p className="section-label text-center mb-3">{productPage.title}</p>
        <h1 className="font-display text-4xl sm:text-5xl font-bold text-white text-center mb-6">
          {productPage.subtitle}
        </h1>
        <p className="text-zinc-400 text-lg text-center mb-8 max-w-2xl mx-auto">
          {productPage.intro}
        </p>

        <section aria-labelledby="interact-dashboard-heading" className="mb-12">
          <p id="interact-dashboard-heading" className="section-label mb-3">
            {productPage.dashboardSectionLabel}
          </p>
          <DashboardHighlight data={productPage.dashboard} />
        </section>

        <p className="section-label text-center mb-3">{productPage.aiContextLabel}</p>
        <div className="space-y-6 mb-16">
          {productPage.aiSections.map((section, i) => (
            <AIHelpCard
              key={section.title}
              title={section.title}
              description={section.description}
              index={i + 1}
            />
          ))}
        </div>

        <div className="text-center">
          <Button asChild size="lg">
            <Link href="/book-demo">{productPage.cta}</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
