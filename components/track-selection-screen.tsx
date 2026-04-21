"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { PageShell } from "@/components/page-shell";
import { TrackCard } from "@/components/track-card";
import type { Difficulty, Track } from "@/lib/types";
import { cn, formatDifficulty } from "@/lib/utils";

type TrackSelectionScreenProps = {
  tracks: Track[];
};

type FilterValue = "all" | Difficulty;

const filters: FilterValue[] = ["all", "beginner", "intermediate", "advanced"];

export function TrackSelectionScreen({ tracks }: TrackSelectionScreenProps) {
  const [activeFilter, setActiveFilter] = useState<FilterValue>("all");
  const router = useRouter();

  useEffect(() => {
    for (const track of tracks) {
      router.prefetch(`/track/${track.id}`);
      router.prefetch(`/complete/${track.id}`);
    }
  }, [router, tracks]);

  const visibleTracks = tracks.filter((track) => activeFilter === "all" || track.difficulty === activeFilter);

  return (
    <PageShell className="space-y-10">
      <header className="space-y-8">
        <div className="flex items-start justify-between gap-6">
          <div>
            <div className="font-mono text-[18px] font-medium text-text">Build Satoshi</div>
            <div className="mt-1 text-sm text-text-3">by Bitcoin Dev Project</div>
          </div>

          <Link
            href="https://bitcoindevs.xyz"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm text-text-3 transition hover:text-btc"
          >
            bitcoindevs.xyz
            <span aria-hidden="true">↗</span>
          </Link>
        </div>

        <div className="space-y-4">
          <h1 className="max-w-3xl font-mono text-[28px] font-medium leading-tight tracking-[-0.04em] text-text md:text-[32px]">
            Ship your first Bitcoin product.
          </h1>
          <p className="max-w-2xl text-[14px] leading-6 text-text-2">
            Guided project tracks from zero to open-source contributor.
          </p>
        </div>
      </header>

      <section className="space-y-5">
        <div className="flex flex-wrap gap-2">
          {filters.map((filter) => {
            const isActive = filter === activeFilter;

            return (
              <button
                key={filter}
                type="button"
                onClick={() => setActiveFilter(filter)}
                className={cn(
                  "rounded-full border px-4 py-2 text-[11px] font-medium uppercase tracking-label transition",
                  isActive ? "border-btc bg-btc-dim text-btc" : "border-border text-text-2 hover:border-border-active hover:text-text"
                )}
              >
                {filter === "all" ? "All" : formatDifficulty(filter)}
              </button>
            );
          })}
        </div>

        <motion.div
          layout
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: {
              transition: {
                staggerChildren: 0.05
              }
            }
          }}
          className="grid gap-4 md:grid-cols-2 xl:grid-cols-3"
        >
          <AnimatePresence mode="popLayout">
            {visibleTracks.map((track, index) => (
              <TrackCard key={track.id} track={track} />
            ))}
          </AnimatePresence>
        </motion.div>
      </section>
    </PageShell>
  );
}
