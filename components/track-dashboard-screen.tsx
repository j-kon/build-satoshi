"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { MilestoneRow } from "@/components/milestone-row";
import { PageShell } from "@/components/page-shell";
import { ProgressRing } from "@/components/progress-ring";
import { StackPill } from "@/components/stack-pill";
import { getSidebarResources } from "@/lib/tracks";
import type { Track } from "@/lib/types";
import { useProgressStore } from "@/store/progress";

type TrackDashboardScreenProps = {
  track: Track;
};

export function TrackDashboardScreen({ track }: TrackDashboardScreenProps) {
  const completedWeeks = useProgressStore((state) => state.completedWeeks);
  const markWeekComplete = useProgressStore((state) => state.markWeekComplete);
  const router = useRouter();

  const completedCount = track.milestones.filter((milestone) => completedWeeks[`${track.id}-week-${milestone.week}`]).length;
  const currentWeek = track.milestones.find((milestone) => !completedWeeks[`${track.id}-week-${milestone.week}`])?.week ?? track.weeks;
  const weeksLeft = Math.max(track.weeks - completedCount, 0);
  const resources = getSidebarResources(track);

  function handleMarkComplete(week: number) {
    markWeekComplete(track.id, week);

    if (week === track.weeks) {
      window.setTimeout(() => router.push(`/complete/${track.id}`), 280);
    }
  }

  return (
    <PageShell>
      <div className="grid gap-8 lg:grid-cols-[280px_minmax(0,1fr)] lg:gap-10 xl:grid-cols-[280px_minmax(0,1fr)]">
        <aside className="space-y-5 rounded-lg border border-border bg-bg-2 p-5 md:p-6 lg:sticky lg:top-10 lg:h-fit">
          <Link href="/" className="inline-flex items-center text-sm text-text-2 transition hover:text-btc">
            ← All tracks
          </Link>

          <div>
            <h1 className="text-[18px] font-medium tracking-tight text-text md:text-[20px]">{track.title}</h1>
            <p className="mt-2 text-[14px] leading-6 text-text-2">{track.tagline}</p>
          </div>

          <div className="flex items-center gap-4">
            <ProgressRing completed={completedCount} total={track.weeks} />
            <div className="space-y-1 text-[12px] text-text-3">
              <div>{completedCount} weeks done</div>
              <div>{weeksLeft} weeks left</div>
            </div>
          </div>

          <div className="border-t border-border pt-4">
            <div className="label">Stack</div>
            <div className="mt-3 flex flex-wrap gap-2">
              {track.stack.map((item) => (
                <StackPill key={item} value={item} />
              ))}
            </div>
          </div>

          <div className="border-t border-border pt-4">
            <div className="label">Learning resources</div>
            <div className="mt-3 space-y-2">
              {resources.map((resource) => (
                <a
                  key={resource.url}
                  href={resource.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-[13px] text-text-2 transition hover:text-btc"
                >
                  → {resource.label}
                </a>
              ))}
            </div>
          </div>

          <div className="border-t border-border pt-4">
            <div className="label">Ask for help</div>
            <a
              href={`https://chat.bitcoinsearch.xyz/?q=${encodeURIComponent(track.chatbtc_context)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 flex w-full items-center justify-between rounded-lg border border-border px-4 py-3 text-sm text-text-2 transition hover:border-btc hover:text-btc"
            >
              <span>Ask ChatBTC →</span>
            </a>
          </div>
        </aside>

        <section className="space-y-5">
          <div className="label text-btc">Milestones</div>
          <motion.div
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
            className="space-y-4"
          >
            {track.milestones.map((milestone) => {
              const isDone = completedWeeks[`${track.id}-week-${milestone.week}`];
              const status = isDone ? "done" : milestone.week === currentWeek && completedCount < track.weeks ? "current" : "locked";

              return (
                <MilestoneRow
                  key={`${track.id}-${milestone.week}`}
                  trackId={track.id}
                  milestone={milestone}
                  status={status}
                  onMarkComplete={() => handleMarkComplete(milestone.week)}
                />
              );
            })}
          </motion.div>
        </section>
      </div>
    </PageShell>
  );
}
