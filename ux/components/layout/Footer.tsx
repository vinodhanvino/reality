import Link from "next/link";
import { navLinks, site } from "@/lib/settings";
import { FooterFounder } from "./FooterFounder";

export function Footer() {
  return (
    <footer className="mt-24 border-t border-white/[0.08] bg-gradient-to-b from-surface to-background">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-5">
            <Link href="/" className="type-brand inline-block transition-colors hover:text-accent">
              {site.name}
            </Link>
            <p className="type-body-sm mt-3 max-w-sm">{site.tagline}</p>
            <div className="mt-8 grid grid-cols-2 gap-x-8 gap-y-3 sm:grid-cols-3">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="type-nav-link"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
          <div className="lg:col-span-7 lg:flex lg:justify-end">
            <FooterFounder />
          </div>
        </div>
        <div className="mt-14 border-t border-white/[0.06] pt-8 text-center text-xs text-zinc-600 sm:text-sm">
          © {new Date().getFullYear()} {site.name}. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
