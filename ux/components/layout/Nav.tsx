"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { navLinks, site } from "@/lib/settings";
import { cn } from "@/lib/utils";
import { NavLink } from "./NavLink";

const bookDemoHref = "/book-demo" as const;

export function Nav() {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);
  const mainLinks = navLinks.filter((l) => l.href !== bookDemoHref);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-white/[0.06] bg-background/75 backdrop-blur-2xl supports-[backdrop-filter]:bg-background/55">
      <nav className="mx-auto flex h-[4.25rem] max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="font-display text-lg font-semibold tracking-tight text-white transition-colors hover:text-accent"
        >
          {site.name}
        </Link>

        <div className="hidden items-center gap-7 md:flex">
          {mainLinks.map((link) => (
            <NavLink key={link.href} href={link.href} label={link.label} />
          ))}
          <Button asChild size="sm" variant="accent" className="rounded-full font-semibold shadow-md">
            <Link href={bookDemoHref}>Book Demo</Link>
          </Button>
        </div>

        <button
          type="button"
          className="p-2 text-white md:hidden"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="border-t border-white/[0.06] bg-surface/95 backdrop-blur-xl md:hidden"
          >
            <div className="flex flex-col gap-1 px-4 py-4">
              {mainLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  prefetch
                  className="py-3 text-zinc-400 transition-colors hover:text-white"
                  onClick={close}
                >
                  {link.label}
                </Link>
              ))}
              <Button asChild variant="accent" className="mt-2 w-full font-semibold">
                <Link href={bookDemoHref} onClick={close}>
                  Book Demo
                </Link>
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
