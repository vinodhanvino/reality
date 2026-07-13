"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { MessageCircle, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { mcpAI } from "@/lib/settings";
import { viewportOnce } from "@/lib/motionPresets";

export function MCPAISection() {
  return (
    <section className="py-28 px-4 bg-surface/50">
      <div className="mx-auto max-w-4xl">
        <motion.p
          className="section-label text-center mb-4"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportOnce}
        >
          {mcpAI.label}
        </motion.p>
        <motion.h2
          className="type-section-title mb-4 text-center"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportOnce}
          transition={{ delay: 0.05 }}
        >
          {mcpAI.headline}
        </motion.h2>
        <motion.p
          className="type-body mb-10 max-w-2xl text-center mx-auto"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportOnce}
          transition={{ delay: 0.08 }}
        >
          {mcpAI.subheadline}
        </motion.p>
        <motion.ul
          className="space-y-4 mb-10"
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.08 } },
          }}
        >
          {mcpAI.points.map((point, i) => (
            <motion.li
              key={i}
              variants={{
                hidden: { opacity: 0, x: -12 },
                visible: { opacity: 1, x: 0 },
              }}
              className="flex items-start gap-3 rounded-xl border border-white/[0.07] bg-gradient-to-r from-white/[0.04] to-transparent px-5 py-4 transition-transform hover:-translate-y-0.5"
            >
              <MessageCircle className="mt-0.5 shrink-0 text-accent" size={20} />
              <span className="type-body-sm text-white/90 sm:text-base">{point}</span>
            </motion.li>
          ))}
        </motion.ul>
        <motion.div
          className="flex flex-wrap items-center justify-center gap-4"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportOnce}
        >
          <Button asChild variant="accent" className="font-semibold">
            <Link href="/book-demo">
              <Sparkles className="mr-2 shrink-0" size={18} />
              {mcpAI.cta}
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
