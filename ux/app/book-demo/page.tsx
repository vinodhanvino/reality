import { BookDemoForm } from "@/components/forms/BookDemoForm";
import { bookDemo } from "@/lib/settings";

export const metadata = {
  title: "Book a Demo | Spirix",
  description: "Schedule a demo to see Spirix detect bar loss in minutes.",
};

export default function BookDemoPage() {
  return (
    <div className="min-h-screen px-4 pb-16 pt-24">
      <div className="mx-auto max-w-lg">
        <h1 className="mb-2 text-center font-display text-3xl font-bold text-white">Book a Demo</h1>
        <p className="mb-10 text-center text-zinc-400">{bookDemo.intro}</p>
        <BookDemoForm />
      </div>
    </div>
  );
}
