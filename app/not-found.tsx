import Link from "next/link";

import { PageShell } from "@/components/page-shell";

export default function NotFound() {
  return (
    <PageShell className="py-16">
      <div className="rounded-lg border border-border bg-bg-2 p-8">
        <div className="label text-btc">404</div>
        <h1 className="mt-4 font-mono text-[32px] font-medium tracking-[-0.04em] text-text">Track not found</h1>
        <p className="mt-4 max-w-2xl text-sm leading-6 text-text-2">
          The route you opened does not map to a Build Satoshi track. Head back to the catalog and choose an active path.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            href="/"
            className="rounded-full border border-border bg-btc px-5 py-3 text-[11px] font-medium uppercase tracking-label text-black shadow-glow transition hover:opacity-95"
          >
            Browse tracks
          </Link>
        </div>
      </div>
    </PageShell>
  );
}
