"use client";

type Props = {
  title: string;
  description: string;
  index: number;
};

export function AIHelpCard({ title, description, index }: Props) {
  return (
    <div className="rounded-xl border border-white/[0.08] bg-white/[0.02] p-6">
      <span className="text-[#2BC0D3] font-mono text-sm">
        {String(index).padStart(2, "0")}
      </span>
      <h3 className="font-display text-xl font-semibold text-white mt-2 mb-3">
        {title}
      </h3>
      <p className="text-zinc-400 leading-relaxed">{description}</p>
    </div>
  );
}
