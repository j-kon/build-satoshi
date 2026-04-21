"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { PageShell } from "@/components/page-shell";
import { cn } from "@/lib/utils";

const links = [
  { href: "/", label: "Overview" },
  { href: "/tracks", label: "Tracks" },
  { href: "/dashboard", label: "Dashboard" }
];

export function SiteHeader() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-[rgba(10,10,10,0.92)] backdrop-blur">
      <PageShell className="flex h-16 items-center justify-between gap-4">
        <Link href="/" className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-border bg-bg-2 font-mono text-sm text-btc">
            B₿
          </div>
          <div>
            <div className="font-mono text-sm font-medium text-text">Build Satoshi</div>
            <div className="hidden text-[11px] uppercase tracking-label text-text-2 sm:block">
              Guided Bitcoin developer onboarding
            </div>
          </div>
        </Link>
        <nav className="flex items-center gap-2">
          {links.map((link) => {
            const active = pathname === link.href || (link.href !== "/" && pathname.startsWith(link.href));

            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "rounded-full border px-3 py-2 text-xs font-medium uppercase tracking-label transition",
                  active
                    ? "border-border-active bg-btc-dim text-btc shadow-glow"
                    : "border-transparent text-text-2 hover:border-border hover:bg-bg-2 hover:text-text"
                )}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>
      </PageShell>
    </header>
  );
}
