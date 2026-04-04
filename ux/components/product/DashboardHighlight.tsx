"use client";

import { Calendar, MessageCircle } from "lucide-react";
import type { productPage } from "@/lib/settings";

type Dashboard = (typeof productPage)["dashboard"];

type Props = { data: Dashboard };

export function DashboardHighlight({ data }: Props) {
  return (
    <div className="rounded-2xl border border-[#2BC0D3]/30 bg-[#2BC0D3]/5 p-6 sm:p-8">
      <div className="flex items-center gap-2 mb-4">
        <Calendar className="text-[#2BC0D3]" size={22} />
        <h2 className="font-display text-xl font-semibold text-white">
          {data.headline}
        </h2>
      </div>
      <p className="text-zinc-300 mb-6">{data.description}</p>
      <ul className="space-y-3">
        {data.points.map((point, i) => (
          <li key={i} className="flex items-start gap-3 text-sm text-white/90">
            <MessageCircle className="shrink-0 mt-0.5 text-[#2BC0D3]" size={18} />
            <span>{point}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
