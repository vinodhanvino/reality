import Link from "next/link";
import { Button } from "@/components/ui/button";
import { features } from "@/lib/settings";
import { Card, CardContent } from "@/components/ui/card";

export const metadata = {
  title: "Features | Spirix",
  description: "Spirix feature highlights.",
};

export default function FeaturesPage() {
  return (
    <div className="min-h-screen pt-24 pb-16 px-4">
      <div className="mx-auto max-w-4xl">
        <h1 className="type-page-title mb-12 text-center">
          Features
        </h1>
        <ul className="grid gap-4 sm:grid-cols-2">
          {features.map((f) => (
            <li key={f}>
              <Card>
                <CardContent className="type-body-sm pt-6 text-zinc-300">{f}</CardContent>
              </Card>
            </li>
          ))}
        </ul>
        <div className="flex justify-center mt-10">
          <Button asChild>
            <Link href="/book-demo">Book a Demo</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
