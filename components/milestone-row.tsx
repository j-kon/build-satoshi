"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";

import { StarterCodeBlock } from "@/components/starter-code-block";
import type { Milestone } from "@/lib/types";
import { cn } from "@/lib/utils";

type MilestoneStatus = "done" | "current" | "locked";

type MilestoneRowProps = {
  milestone: Milestone;
  trackId: string;
  status: MilestoneStatus;
  onMarkComplete: () => void;
};

function StatusIndicator({ status, week }: { status: MilestoneStatus; week: number }) {
  return (
    <motion.div
      key={`${status}-${week}`}
      initial={{ scale: 0.8, opacity: 0.7 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ type: "spring", stiffness: 280, damping: 22 }}
      className={cn(
        "flex h-10 w-10 items-center justify-center rounded-full border text-sm font-medium",
        status === "done" && "border-[rgba(34,197,94,0.2)] bg-green text-bg",
        status === "current" && "border-btc text-btc",
        status === "locked" && "border-border text-text-3"
      )}
    >
      {status === "done" ? "✓" : week}
    </motion.div>
  );
}

export function MilestoneRow({ milestone, trackId, status, onMarkComplete }: MilestoneRowProps) {
  const [showCode, setShowCode] = useState(false);
  const isCurrent = status === "current";

  return (
    <motion.article
      layout
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 }
      }}
      className="rounded-lg border border-border bg-bg-2 p-4 md:p-5"
    >
      <div className="grid gap-4 md:grid-cols-[48px_minmax(0,1fr)_auto] md:items-start">
        <div className="flex justify-start md:justify-center">
          <StatusIndicator status={status} week={milestone.week} />
        </div>

        <div className="space-y-3">
          <div>
            <div className="text-[11px] uppercase tracking-label text-text-3">Week {milestone.week}</div>
            <h3 className="mt-2 text-[14px] font-medium text-text">{milestone.title}</h3>
            {isCurrent ? <p className="mt-2 text-[12px] leading-6 text-text-2">{milestone.description}</p> : null}
          </div>

          <AnimatePresence initial={false}>
            {isCurrent && showCode && milestone.starter_code ? (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.22, ease: "easeOut" }}
                className="overflow-hidden"
              >
                <StarterCodeBlock starterCode={milestone.starter_code} />
              </motion.div>
            ) : null}
          </AnimatePresence>
        </div>

        <div className="flex items-start justify-start md:justify-end">
          {isCurrent && milestone.starter_code ? (
            <button
              type="button"
              onClick={() => setShowCode((current) => !current)}
              className="text-[12px] text-text-2 transition hover:text-btc"
            >
              {showCode ? "Hide starter code" : "View starter code"}
            </button>
          ) : null}
        </div>
      </div>

      {isCurrent ? (
        <button
          type="button"
          onClick={onMarkComplete}
          className="mt-4 w-full rounded-lg border border-btc bg-btc-dim px-4 py-3 text-left text-[12px] font-medium uppercase tracking-label text-btc transition hover:shadow-glow"
        >
          Mark week {milestone.week} complete →
        </button>
      ) : null}
    </motion.article>
  );
}
