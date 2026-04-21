"use client";

import Link from "next/link";

import { getTrackCompletion } from "@/lib/tracks";
import type { Track } from "@/lib/types";
import { formatDifficulty } from "@/lib/utils";
import { useProgressStore } from "@/store/progress-store";

type DashboardTracksProps = {
  tracks: Track[];
};

export function DashboardTracks({ tracks }: DashboardTracksProps) {
  const completedByTrack = useProgressStore((state) => state.completedByTrack);
  const hasHydrated = useProgressStore((state) => state.hasHydrated);
  const resetTrack = useProgressStore((state) => state.resetTrack);
  const completeTrack = useProgressStore((state) => state.completeTrack);

  return (
    <div className="space-y-4">
      {tracks.map((track) => {
        const completion = getTrackCompletion(completedByTrack, track.id, track.weeks);
        const completed = hasHydrated ? completion.completed : 0;
        const percentage = hasHydrated ? completion.percentage : 0;

        return (
          <div key={track.id} className="rounded-lg border border-border bg-bg-2 p-5">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
              <div className="space-y-3">
                <div>
                  <div className="text-[11px] font-medium uppercase tracking-label text-btc">{formatDifficulty(track.difficulty)}</div>
                  <h3 className="mt-2 text-xl font-medium tracking-tight text-text">{track.title}</h3>
                  <p className="mt-2 max-w-2xl text-sm text-text-2">{track.tagline}</p>
                </div>

                <div className="flex flex-wrap gap-2">
                  {track.stack.map((item) => (
                    <span key={item} className="rounded-full border border-border px-3 py-1 font-mono text-[11px] text-text-2">
                      {item}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex flex-wrap gap-2">
                <Link
                  href={`/tracks/${track.id}`}
                  className="rounded-full border border-border bg-bg px-4 py-3 text-[11px] font-medium uppercase tracking-label text-text-2 transition hover:border-border-active hover:text-text"
                >
                  Open Track
                </Link>
                <button
                  type="button"
                  onClick={() => completeTrack(track.id, track.weeks)}
                  className="rounded-full border border-border bg-btc-dim px-4 py-3 text-[11px] font-medium uppercase tracking-label text-btc transition hover:shadow-glow"
                >
                  Complete All
                </button>
                <button
                  type="button"
                  onClick={() => resetTrack(track.id)}
                  className="rounded-full border border-border bg-bg px-4 py-3 text-[11px] font-medium uppercase tracking-label text-text-3 transition hover:border-[color:rgba(239,68,68,0.35)] hover:text-red"
                >
                  Reset
                </button>
              </div>
            </div>

            <div className="mt-5">
              <div className="mb-2 flex items-center justify-between font-mono text-xs">
                <span className="text-text-3">Weekly progress</span>
                <span className={completion.isComplete ? "text-green" : "text-text-2"}>
                  {completed}/{track.weeks}
                </span>
              </div>
              <div className="h-2 rounded-full border border-border bg-bg">
                <div className="h-full rounded-full bg-btc transition-all" style={{ width: `${percentage}%`, boxShadow: "0 0 18px var(--btc-glow)" }} />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
