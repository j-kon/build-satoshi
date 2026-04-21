"use client";

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

import { DifficultyBadge } from "@/components/difficulty-badge";
import { StackPill } from "@/components/stack-pill";
import type { Track } from "@/lib/types";

type TrackCardProps = {
  track: Track;
};

export function TrackCard({ track }: TrackCardProps) {
  const router = useRouter();

  return (
    <motion.article
      layout
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 }
      }}
      exit={{ opacity: 0, y: 14 }}
      transition={{ duration: 0.24, ease: "easeOut" }}
      whileHover={{ scale: 1.01 }}
      className="flex h-full flex-col rounded-lg border border-border bg-bg-2 p-5 transition-colors hover:border-border-active"
    >
      <div className="flex items-start justify-between gap-4">
        <DifficultyBadge difficulty={track.difficulty} />
        <div className="font-mono text-[12px] text-text-3">{track.weeks} weeks</div>
      </div>

      <div className="mt-5">
        <h3 className="text-[20px] font-medium tracking-tight text-text">{track.title}</h3>
        <p className="mt-2 overflow-hidden text-[14px] leading-6 text-text-2 [display:-webkit-box] [-webkit-box-orient:vertical] [-webkit-line-clamp:2]">
          {track.tagline}
        </p>
      </div>

      <div className="mt-5 flex flex-wrap gap-2">
        {track.stack.map((item) => (
          <StackPill key={item} value={item} />
        ))}
      </div>

      <div className="mt-6 border-t border-border pt-5">
        <button
          type="button"
          onClick={() => router.push(`/track/${track.id}`)}
          className="text-sm text-text-2 transition hover:text-btc"
        >
          Start track →
        </button>
      </div>
    </motion.article>
  );
}
