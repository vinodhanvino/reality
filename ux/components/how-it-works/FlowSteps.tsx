"use client";

import { ArrowRight } from "lucide-react";

type Step = {
  id: string;
  label: string;
  description: string;
};

type Props = { steps: readonly Step[] };

export function FlowSteps({ steps }: Props) {
  return (
    <div className="space-y-6">
      {steps.map((step, i) => (
        <div key={step.id} className="flex flex-col sm:flex-row sm:items-start gap-4">
          <div className="flex items-center gap-3 sm:block sm:w-44 shrink-0">
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#2BC0D3]/20 text-[#2BC0D3] font-mono text-sm font-semibold">
              {String(i + 1).padStart(2, "0")}
            </span>
            {i < steps.length - 1 && (
              <ArrowRight className="hidden sm:block mt-3 text-white/30 shrink-0" size={20} />
            )}
          </div>
          <div className="rounded-xl border border-white/[0.08] bg-white/[0.02] p-5 flex-1">
            <h3 className="font-display font-semibold text-white mb-2">{step.label}</h3>
            <p className="text-zinc-400 text-sm leading-relaxed">{step.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
