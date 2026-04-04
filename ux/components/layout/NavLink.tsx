"use client";

import Link from "next/link";

type Props = { href: string; label: string; onNavigate?: () => void };

export function NavLink({ href, label, onNavigate }: Props) {
  return (
    <Link
      href={href}
      prefetch
      onClick={onNavigate}
      className="group relative py-1 text-sm text-zinc-400 transition-colors hover:text-white"
    >
      <span>{label}</span>
      <span
        className="absolute bottom-0 left-0 h-[2px] w-0 rounded-full bg-gradient-to-r from-primary to-accent transition-[width] duration-300 ease-out group-hover:w-full"
        aria-hidden
      />
    </Link>
  );
}
