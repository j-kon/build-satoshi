"use client";

import Link from "next/link";
import { motion } from "framer-motion";

import { getTrackCompletion } from "@/lib/tracks";
import type { Track } from "@/lib/types";
import { formatDifficulty } from "@/lib/utils";
import { useProgressStore } from "@/store/progress-store";

type TrackCardProps = {
  track: Track;
};

export function TrackCard({ track }: TrackCardProps) {
  const completedByTrack = useProgressStore((state) => state.completedByTrack);
  const hasHydrated = useProgressStore((state) => state.hasHydrated);
  const completion = getTrackCompletion(completedByTrack, track.id, track.weeks);

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.24, ease: "easeOut" }}
      className="group h-full"
    >
      <Link
        href={`/tracks/${track.id}`}
        className="flex h-full flex-col rounded-lg border border-border bg-bg-2 p-5 transition group-hover:border-border-active group-hover:bg-bg-3"
      >
        <div className="flex items-start justify-between gap-4">
          <div className="space-y-2">
            <div className="text-[11px] font-medium uppercase tracking-label text-btc">{formatDifficulty(track.difficulty)}</div>
            <h3 className="font-sans text-xl font-medium tracking-tight text-text">{track.title}</h3>
            <p className="text-sm text-text-2">{track.tagline}</p>
          </div>
          <div className="rounded-full border border-border px-3 py-1 font-mono text-xs text-text-2">{track.weeks}w</div>
        </div>

        <p className="mt-5 text-sm leading-6 text-text-2">{track.description}</p>

        <div className="mt-5 flex flex-wrap gap-2">
          {track.stack.map((item) => (
            <span key={item} className="rounded-full border border-border px-3 py-1 font-mono text-[11px] text-text-2">
              {item}
            </span>
          ))}
        </div>

        <div className="mt-auto pt-6">
          <div className="mb-2 flex items-center justify-between font-mono text-xs">
            <span className="text-text-3">Progress</span>
            <span className={completion.isComplete ? "text-green" : "text-text-2"}>
              {hasHydrated ? `${completion.completed}/${completion.totalWeeks}` : `0/${completion.totalWeeks}`}
            </span>
          </div>
          <div className="h-2 rounded-full border border-border bg-bg">
            <div
              className="h-full rounded-full bg-btc transition-all"
              style={{ width: `${hasHydrated ? completion.percentage : 0}%`, boxShadow: hasHydrated ? "0 0 18px var(--btc-glow)" : "none" }}
            />
          </div>
        </div>
      </Link>
    </motion.article>
  );
}
