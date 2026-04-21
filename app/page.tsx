import Link from "next/link";

import { PageShell } from "@/components/page-shell";
import { SectionHeading } from "@/components/section-heading";
import { TrackCard } from "@/components/track-card";
import { getTotalWeeks, tracks } from "@/lib/tracks";

const principles = [
  {
    label: "01 / Pick a track",
    description: "Choose a project anchored in real Bitcoin tooling instead of abstract tutorials."
  },
  {
    label: "02 / Ship weekly",
    description: "Each milestone is scoped to a week so momentum compounds instead of stalling."
  },
  {
    label: "03 / Publish proof",
    description: "Every track ends with a demo, docs, and a public artifact you can point to."
  }
];

export default function HomePage() {
  const totalWeeks = getTotalWeeks();
  const totalStacks = new Set(tracks.flatMap((track) => track.stack)).size;

  return (
    <PageShell className="space-y-16">
      <section className="grid gap-8 rounded-lg border border-border bg-bg-2 p-6 lg:grid-cols-[minmax(0,1.3fr)_minmax(320px,0.7fr)] lg:p-8">
        <div className="space-y-6">
          <div className="text-[11px] font-medium uppercase tracking-label text-btc">Guided Bitcoin builder flow</div>
          <div className="space-y-4">
            <h1 className="max-w-4xl font-mono text-[32px] font-medium leading-tight tracking-[-0.04em] text-text">
              Build real Bitcoin projects.
              <br />
              Learn by shipping.
            </h1>
            <p className="max-w-2xl text-sm leading-7 text-text-2">
              Build Satoshi turns Bitcoin developer onboarding into a track-based product experience. Pick a project, follow weekly
              milestones, copy starter code, and keep your progress stored locally with zero backend overhead.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <Link
              href="/tracks"
              className="rounded-full border border-border bg-btc px-5 py-3 text-[11px] font-medium uppercase tracking-label text-black shadow-glow transition hover:opacity-95"
            >
              Start a track
            </Link>
            <Link
              href="/dashboard"
              className="rounded-full border border-border bg-bg px-5 py-3 text-[11px] font-medium uppercase tracking-label text-text-2 transition hover:border-border-active hover:text-text"
            >
              Open dashboard
            </Link>
          </div>
        </div>

        <div className="grid gap-4">
          <div className="rounded-lg border border-border bg-bg p-5">
            <div className="text-[11px] font-medium uppercase tracking-label text-text-3">Platform brief</div>
            <div className="mt-5 grid gap-4 sm:grid-cols-3 lg:grid-cols-1">
              <div>
                <div className="font-mono text-3xl text-text">{tracks.length}</div>
                <div className="mt-2 text-sm text-text-2">Tracks with curated milestones</div>
              </div>
              <div>
                <div className="font-mono text-3xl text-text">{totalWeeks}</div>
                <div className="mt-2 text-sm text-text-2">Weeks of guided execution</div>
              </div>
              <div>
                <div className="font-mono text-3xl text-text">{totalStacks}</div>
                <div className="mt-2 text-sm text-text-2">Bitcoin-native stack tags</div>
              </div>
            </div>
          </div>

          <div className="rounded-lg border border-border bg-bg p-5">
            <div className="text-[11px] font-medium uppercase tracking-label text-text-3">What ships</div>
            <div className="mt-4 space-y-3 font-mono text-sm text-text-2">
              <div>Rust Lightning invoice flow on regtest</div>
              <div>Flutter savings app with NGN pricing</div>
              <div>PSBT signer CLI for deep transaction work</div>
            </div>
          </div>
        </div>
      </section>

      <section className="space-y-6">
        <SectionHeading
          eyebrow="Tracks"
          title="Three paths, one consistent build discipline"
          description="Each track balances real tooling, weekly milestones, and open-source-ready outcomes. They differ in depth, not seriousness."
        />
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {tracks.map((track) => (
            <TrackCard key={track.id} track={track} />
          ))}
        </div>
      </section>

      <section className="space-y-6">
        <SectionHeading
          eyebrow="Method"
          title="Designed for builders who learn fastest by touching real systems"
          description="The platform stays intentionally lean: static content, local-first progress, and enough motion to make momentum feel visible without turning the UI into a distraction."
        />
        <div className="grid gap-4 lg:grid-cols-3">
          {principles.map((principle) => (
            <article key={principle.label} className="rounded-lg border border-border bg-bg-2 p-5">
              <div className="font-mono text-sm text-btc">{principle.label}</div>
              <p className="mt-4 text-sm leading-6 text-text-2">{principle.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="rounded-lg border border-border bg-bg-2 p-6 lg:p-8">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="space-y-3">
            <div className="text-[11px] font-medium uppercase tracking-label text-btc">Deploy-ready</div>
            <h2 className="text-2xl font-medium tracking-[-0.03em] text-text">Static data, client-side state, Vercel-friendly by default</h2>
            <p className="max-w-2xl text-sm leading-6 text-text-2">
              No auth, no API, no database. The entire experience ships as a clean App Router app backed by static JSON and persisted
              browser state.
            </p>
          </div>
          <Link
            href="/tracks"
            className="rounded-full border border-border bg-btc px-5 py-3 text-[11px] font-medium uppercase tracking-label text-black shadow-glow transition hover:opacity-95"
          >
            Browse tracks
          </Link>
        </div>
      </section>
    </PageShell>
  );
}
