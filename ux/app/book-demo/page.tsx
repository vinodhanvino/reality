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
        <h1 className="type-page-title-md mb-2 text-center">Book a Demo</h1>
        <p className="type-body mb-10 text-center">{bookDemo.intro}</p>
        <BookDemoForm />
      </div>
    </div>
  );
}
