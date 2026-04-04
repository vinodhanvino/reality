import Link from "next/link";
import { Button } from "@/components/ui/button";
import dynamic from "next/dynamic";

const VarianceChart = dynamic(
  () => import("@/components/charts/VarianceChart").then((m) => m.VarianceChart),
  { ssr: false }
);

export const metadata = {
  title: "Analytics | Spirix",
  description: "Variance analytics dashboard preview.",
};

export default function AnalyticsPage() {
  return (
    <div className="min-h-screen pt-24 pb-16 px-4">
      <div className="mx-auto max-w-4xl">
        <h1 className="text-4xl font-bold text-white text-center mb-8">
          Analytics
        </h1>
        <p className="text-white/70 text-center mb-10">
          Daily analytics and variance detection at a glance.
        </p>
        <div className="glass rounded-2xl p-6 border border-white/10 mb-10">
          <VarianceChart />
        </div>
        <div className="flex justify-center">
          <Button asChild>
            <Link href="/book-demo">Book a Demo</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
