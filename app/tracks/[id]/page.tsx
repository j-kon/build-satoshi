import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { CopyButton } from "@/components/copy-button";
import { MilestoneCard } from "@/components/milestone-card";
import { PageShell } from "@/components/page-shell";
import { getTrackById, tracks } from "@/lib/tracks";
import { formatDifficulty } from "@/lib/utils";

type TrackPageProps = {
  params: {
    id: string;
  };
};

export function generateStaticParams() {
  return tracks.map((track) => ({ id: track.id }));
}

export function generateMetadata({ params }: TrackPageProps): Metadata {
  const track = getTrackById(params.id);

  if (!track) {
    return {
      title: "Track not found | Build Satoshi"
    };
  }

  return {
    title: `${track.title} | Build Satoshi`,
    description: track.description
  };
}

export default function TrackDetailPage({ params }: TrackPageProps) {
  const track = getTrackById(params.id);

  if (!track) {
    notFound();
  }

  return (
    <PageShell className="space-y-10">
      <section className="grid gap-6 lg:grid-cols-[minmax(0,1.2fr)_360px]">
        <div className="rounded-lg border border-border bg-bg-2 p-6 lg:p-7">
          <div className="text-[11px] font-medium uppercase tracking-label text-btc">{formatDifficulty(track.difficulty)} track</div>
          <h1 className="mt-4 font-mono text-[32px] font-medium leading-tight tracking-[-0.04em] text-text">{track.title}</h1>
          <p className="mt-3 text-sm text-text-2">{track.tagline}</p>
          <p className="mt-6 max-w-3xl text-sm leading-7 text-text-2">{track.description}</p>

          <div className="mt-6 flex flex-wrap gap-2">
            {track.stack.map((item) => (
              <span key={item} className="rounded-full border border-border px-3 py-1 font-mono text-[11px] text-text-2">
                {item}
              </span>
            ))}
            <span className="rounded-full border border-border px-3 py-1 font-mono text-[11px] text-text-2">{track.weeks} weeks</span>
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/dashboard"
              className="rounded-full border border-border bg-btc px-5 py-3 text-[11px] font-medium uppercase tracking-label text-black shadow-glow transition hover:opacity-95"
            >
              View dashboard
            </Link>
            <Link
              href="/tracks"
              className="rounded-full border border-border bg-bg px-5 py-3 text-[11px] font-medium uppercase tracking-label text-text-2 transition hover:border-border-active hover:text-text"
            >
              Back to tracks
            </Link>
          </div>
        </div>

        <div className="space-y-4">
          <div className="rounded-lg border border-border bg-bg-2 p-5">
            <div className="text-[11px] font-medium uppercase tracking-label text-text-3">What you build</div>
            <p className="mt-4 text-sm leading-7 text-text-2">{track.what_you_build}</p>
          </div>

          <div className="rounded-lg border border-border bg-bg-2 p-5">
            <div className="flex items-center justify-between gap-3">
              <div>
                <div className="text-[11px] font-medium uppercase tracking-label text-text-3">ChatBTC context</div>
                <p className="mt-2 text-sm text-text-2">Copy this prompt context into your assistant session before asking implementation questions.</p>
              </div>
              <CopyButton text={track.chatbtc_context} />
            </div>
            <pre className="mt-4 overflow-x-auto rounded-lg border border-border bg-bg p-4 font-mono text-[13px] leading-6 text-text-2">
              <code>{track.chatbtc_context}</code>
            </pre>
          </div>
        </div>
      </section>

      <section className="space-y-5">
        <div className="space-y-3">
          <div className="text-[11px] font-medium uppercase tracking-label text-btc">Milestones</div>
          <h2 className="text-2xl font-medium tracking-[-0.03em] text-text">Weekly build sequence</h2>
          <p className="max-w-3xl text-sm leading-6 text-text-2">
            Mark weeks complete as you go. The state is persisted locally, so the dashboard and track cards update instantly across the app.
          </p>
        </div>

        <div className="space-y-4">
          {track.milestones.map((milestone) => (
            <MilestoneCard key={milestone.week} trackId={track.id} totalWeeks={track.weeks} milestone={milestone} />
          ))}
        </div>
      </section>
    </PageShell>
  );
}
