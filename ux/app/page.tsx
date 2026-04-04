import { Hero } from "@/components/home/Hero";
import { ProductViz } from "@/components/home/ProductViz";
import { Problem } from "@/components/home/Problem";
import { Solution } from "@/components/home/Solution";
import { FeatureHighlights } from "@/components/home/FeatureHighlights";
import { MCPAISection } from "@/components/home/MCPAISection";
import { AnalyticsDemo } from "@/components/home/AnalyticsDemo";
import { CtaSection } from "@/components/home/CtaSection";

export default function HomePage() {
  return (
    <>
      <Hero />
      <ProductViz />
      <Problem />
      <Solution />
      <FeatureHighlights />
      <MCPAISection />
      <AnalyticsDemo />
      <CtaSection />
    </>
  );
}
