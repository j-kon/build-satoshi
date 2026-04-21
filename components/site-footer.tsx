import Link from "next/link";

import { PageShell } from "@/components/page-shell";

export function SiteFooter() {
  return (
    <footer className="border-t border-border py-8">
      <PageShell className="flex flex-col gap-4 text-sm text-text-2 md:flex-row md:items-center md:justify-between">
        <div>
          <div className="font-mono text-xs uppercase tracking-label text-text-3">Local-first progress</div>
          <p className="max-w-2xl">
            Build Satoshi stores progress in your browser only. Pick a track, ship weekly milestones, and turn each project
            into a portfolio proof of work.
          </p>
        </div>
        <div className="flex items-center gap-4 font-mono text-xs">
          <Link href="/tracks" className="transition hover:text-btc">
            /tracks
          </Link>
          <Link href="/dashboard" className="transition hover:text-btc">
            /dashboard
          </Link>
        </div>
      </PageShell>
    </footer>
  );
}
