"use client";

import { getProgressSnapshot } from "@/lib/tracks";
import { tracks } from "@/lib/tracks";
import { pluralize } from "@/lib/utils";
import { useProgressStore } from "@/store/progress-store";

const statMeta = [
  { label: "Completed weeks", key: "completedWeeks" },
  { label: "Tracks started", key: "startedTracks" },
  { label: "Tracks finished", key: "finishedTracks" },
  { label: "Tracks available", key: "tracksAvailable" }
] as const;

export function ProgressSummary() {
  const completedByTrack = useProgressStore((state) => state.completedByTrack);
  const hasHydrated = useProgressStore((state) => state.hasHydrated);
  const snapshot = getProgressSnapshot(completedByTrack);

  const values = {
    completedWeeks: hasHydrated ? snapshot.completedWeeks : 0,
    startedTracks: hasHydrated ? snapshot.startedTracks : 0,
    finishedTracks: hasHydrated ? snapshot.finishedTracks : 0,
    tracksAvailable: tracks.length
  };

  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
      {statMeta.map((stat) => (
        <div key={stat.key} className="rounded-lg border border-border bg-bg-2 p-5">
          <div className="text-[11px] font-medium uppercase tracking-label text-text-3">{stat.label}</div>
          <div className="mt-4 font-mono text-3xl font-medium text-text">{values[stat.key]}</div>
          <div className="mt-2 text-sm text-text-2">
            {stat.key === "completedWeeks"
              ? `${pluralize(values.completedWeeks, "week")} shipped out of ${snapshot.totalWeeks}`
              : stat.key === "tracksAvailable"
                ? "Static tracks ready to start"
                : "Persisted locally in this browser"}
          </div>
        </div>
      ))}
    </div>
  );
}
