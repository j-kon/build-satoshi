"use client";

import { motion } from "framer-motion";

import { CodeBlock } from "@/components/code-block";
import { getTrackCompletion } from "@/lib/tracks";
import type { Milestone } from "@/lib/types";
import { cn } from "@/lib/utils";
import { useProgressStore } from "@/store/progress-store";

type MilestoneCardProps = {
  trackId: string;
  totalWeeks: number;
  milestone: Milestone;
};

export function MilestoneCard({ trackId, totalWeeks, milestone }: MilestoneCardProps) {
  const completedByTrack = useProgressStore((state) => state.completedByTrack);
  const toggleWeek = useProgressStore((state) => state.toggleWeek);
  const completion = getTrackCompletion(completedByTrack, trackId, totalWeeks);
  const done = completion.completedWeeks.includes(milestone.week);

  return (
    <motion.article
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.24, ease: "easeOut" }}
      className={cn(
        "rounded-lg border bg-bg-2 p-5",
        done ? "border-[color:rgba(247,147,26,0.35)] shadow-glow" : "border-border"
      )}
    >
      <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
        <div className="space-y-3">
          <div className="flex flex-wrap items-center gap-2">
            <span className="rounded-full border border-border px-3 py-1 font-mono text-xs text-text-2">Week {milestone.week}</span>
            <span
              className={cn(
                "rounded-full border px-3 py-1 text-[11px] font-medium uppercase tracking-label",
                done ? "border-[color:rgba(34,197,94,0.35)] bg-green-dim text-green" : "border-border text-text-3"
              )}
            >
              {done ? "Complete" : "Open"}
            </span>
          </div>
          <div>
            <h3 className="text-lg font-medium tracking-tight text-text">{milestone.title}</h3>
            <p className="mt-2 max-w-3xl text-sm leading-6 text-text-2">{milestone.description}</p>
          </div>
        </div>

        <button
          type="button"
          onClick={() => toggleWeek(trackId, milestone.week)}
          className={cn(
            "rounded-full border px-4 py-3 text-[11px] font-medium uppercase tracking-label transition",
            done
              ? "border-[color:rgba(34,197,94,0.35)] bg-green-dim text-green hover:opacity-90"
              : "border-border bg-bg text-text-2 hover:border-border-active hover:text-text"
          )}
        >
          {done ? "Mark Incomplete" : "Mark Complete"}
        </button>
      </div>

      {milestone.starter_code ? (
        <div className="mt-5">
          <CodeBlock
            language={milestone.starter_code.language}
            filename={milestone.starter_code.filename}
            code={milestone.starter_code.code}
          />
        </div>
      ) : null}

      {milestone.resources.length > 0 ? (
        <div className="mt-5 border-t border-border pt-4">
          <div className="mb-3 text-[11px] font-medium uppercase tracking-label text-text-3">Resources</div>
          <div className="flex flex-wrap gap-2">
            {milestone.resources.map((resource) => (
              <a
                key={resource.url}
                href={resource.url}
                target="_blank"
                rel="noreferrer"
                className="rounded-full border border-border px-3 py-2 text-xs text-text-2 transition hover:border-border-active hover:bg-bg hover:text-text"
              >
                {resource.label}
              </a>
            ))}
          </div>
        </div>
      ) : null}
    </motion.article>
  );
}
