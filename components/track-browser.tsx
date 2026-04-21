"use client";

import { useDeferredValue, useState, useTransition } from "react";
import { AnimatePresence, motion } from "framer-motion";

import { TrackCard } from "@/components/track-card";
import { stackOptions } from "@/lib/tracks";
import type { Difficulty, Track } from "@/lib/types";
import { cn } from "@/lib/utils";

type TrackBrowserProps = {
  tracks: Track[];
};

const difficultyOptions: Array<Difficulty | "all"> = ["all", "beginner", "intermediate", "advanced"];

export function TrackBrowser({ tracks }: TrackBrowserProps) {
  const [query, setQuery] = useState("");
  const [difficulty, setDifficulty] = useState<Difficulty | "all">("all");
  const [stack, setStack] = useState<(typeof stackOptions)[number] | "all">("all");
  const [isPending, startTransition] = useTransition();
  const deferredQuery = useDeferredValue(query);

  const filteredTracks = tracks.filter((track) => {
    const matchesQuery =
      deferredQuery.length === 0 ||
      `${track.title} ${track.tagline} ${track.description} ${track.what_you_build} ${track.stack.join(" ")}`
        .toLowerCase()
        .includes(deferredQuery.toLowerCase());
    const matchesDifficulty = difficulty === "all" || track.difficulty === difficulty;
    const matchesStack = stack === "all" || track.stack.includes(stack);

    return matchesQuery && matchesDifficulty && matchesStack;
  });

  return (
    <div className="space-y-6">
      <div className="rounded-lg border border-border bg-bg-2 p-4">
        <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_auto_auto]">
          <label className="space-y-2">
            <span className="text-[11px] font-medium uppercase tracking-label text-text-3">Search</span>
            <input
              value={query}
              onChange={(event) => {
                const nextValue = event.target.value;
                startTransition(() => setQuery(nextValue));
              }}
              placeholder="Search tracks, stacks, or outcomes"
              className="w-full rounded-lg border border-border bg-bg px-4 py-3 text-sm text-text outline-none transition placeholder:text-text-3 focus:border-border-active"
            />
          </label>

          <div className="space-y-2">
            <div className="text-[11px] font-medium uppercase tracking-label text-text-3">Difficulty</div>
            <div className="flex flex-wrap gap-2">
              {difficultyOptions.map((option) => (
                <button
                  key={option}
                  type="button"
                  onClick={() => setDifficulty(option)}
                  className={cn(
                    "rounded-full border px-3 py-2 text-[11px] font-medium uppercase tracking-label transition",
                    difficulty === option
                      ? "border-border-active bg-btc-dim text-btc shadow-glow"
                      : "border-border bg-bg text-text-2 hover:text-text"
                  )}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <div className="text-[11px] font-medium uppercase tracking-label text-text-3">Stack</div>
            <div className="flex flex-wrap gap-2">
              {(["all", ...stackOptions] as const).map((option) => (
                <button
                  key={option}
                  type="button"
                  onClick={() => setStack(option)}
                  className={cn(
                    "rounded-full border px-3 py-2 text-[11px] font-medium uppercase tracking-label transition",
                    stack === option
                      ? "border-border-active bg-btc-dim text-btc shadow-glow"
                      : "border-border bg-bg text-text-2 hover:text-text"
                  )}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between gap-4 font-mono text-xs text-text-3">
        <div>{filteredTracks.length} tracks visible</div>
        <div>{isPending ? "Filtering..." : "Static JSON. Instant client-side browsing."}</div>
      </div>

      <AnimatePresence mode="popLayout">
        <motion.div layout className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {filteredTracks.map((track) => (
            <TrackCard key={track.id} track={track} />
          ))}
        </motion.div>
      </AnimatePresence>

      {filteredTracks.length === 0 ? (
        <div className="rounded-lg border border-dashed border-border p-8 text-center">
          <div className="font-mono text-sm text-text">No track matches that filter set.</div>
          <p className="mt-2 text-sm text-text-2">Try clearing the search or switching difficulty and stack filters.</p>
        </div>
      ) : null}
    </div>
  );
}
