"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { PageShell } from "@/components/page-shell";
import { TrackCard } from "@/components/track-card";
import type { Difficulty, Track } from "@/lib/types";
import { cn, formatDifficulty } from "@/lib/utils";
import { useProgressStore } from "@/store/progress";

type TrackSelectionScreenProps = {
  tracks: Track[];
  initialDemo?: boolean;
};

type FilterValue = "all" | Difficulty;

const filters: FilterValue[] = ["all", "beginner", "intermediate", "advanced"];

export function TrackSelectionScreen({ tracks, initialDemo = false }: TrackSelectionScreenProps) {
  const [activeFilter, setActiveFilter] = useState<FilterValue>("all");
  const [showDemoBanner, setShowDemoBanner] = useState(false);
  const router = useRouter();
  const seedDemoProgress = useProgressStore((state) => state.seedDemoProgress);

  useEffect(() => {
    for (const track of tracks) {
      router.prefetch(`/track/${track.id}`);
      router.prefetch(`/complete/${track.id}`);
    }
  }, [router, tracks]);

  useEffect(() => {
    const demoStorageKey = "build-satoshi-demo-seeded";
    const shouldSeed = initialDemo || !window.localStorage.getItem(demoStorageKey);

    setShowDemoBanner(shouldSeed);

    if (shouldSeed) {
      seedDemoProgress();
      window.localStorage.setItem(demoStorageKey, "true");
    }
  }, [initialDemo, seedDemoProgress]);

  const visibleTracks = tracks.filter((track) => activeFilter === "all" || track.difficulty === activeFilter);

  function handleResetDemo() {
    useProgressStore.setState({ completedWeeks: {} });
    window.localStorage.removeItem("build-satoshi-progress");
    window.localStorage.removeItem("build-satoshi-demo-seeded");
    window.location.reload();
  }

  return (
    <div className="space-y-10">
      {showDemoBanner ? (
        <div className="relative flex h-10 items-center border-b border-btc bg-btc-dim">
          <PageShell className="relative flex h-full items-center justify-center">
            <div className="text-center font-mono text-[12px] text-text-2">
              Demo mode — Bitcoin Savings App is pre-loaded as complete. Reset progress anytime.
            </div>
            <button
              type="button"
              onClick={handleResetDemo}
              className="absolute right-4 rounded-full border border-btc px-3 py-1 font-mono text-[11px] text-btc transition hover:bg-btc-dim"
            >
              Reset
            </button>
          </PageShell>
        </div>
      ) : null}

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

      <section className="space-y-6">
        <div className="hidden sm:block">
          <svg viewBox="0 0 640 72" className="w-full overflow-visible" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="Build Satoshi ecosystem bridge">
            <defs>
              <marker id="arrowhead" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
                <path d="M0,0 L6,3 L0,6" fill="none" stroke="var(--border)" strokeWidth="1" />
              </marker>
            </defs>
            {[
              { label: "Saving Satoshi", x: 10, active: false },
              { label: "Decoding Bitcoin", x: 142, active: false },
              { label: "BUILD SATOSHI", x: 274, active: true },
              { label: "BOSS Projects", x: 406, active: false },
              { label: "Get Funded", x: 538, active: false }
            ].map((node) => (
              <g key={node.label}>
                <rect
                  x={node.x}
                  y="14"
                  width="100"
                  height="44"
                  rx="16"
                  fill={node.active ? "var(--btc-dim)" : "var(--bg-3)"}
                  stroke={node.active ? "var(--btc)" : "var(--border)"}
                />
                <text
                  x={node.x + 50}
                  y="36"
                  fill={node.active ? "var(--btc)" : "var(--text-2)"}
                  fontFamily="var(--font-geist-mono)"
                  fontSize="10"
                  textAnchor="middle"
                  dominantBaseline="central"
                >
                  {node.label}
                </text>
              </g>
            ))}
            {[110, 242, 374, 506].map((x) => (
              <line key={x} x1={x} y1="36" x2={x + 42} y2="36" stroke="var(--border)" markerEnd="url(#arrowhead)" />
            ))}
            <text
              x="324"
              y="66"
              fill="var(--btc)"
              fontFamily="var(--font-geist-mono)"
              fontSize="10"
              textAnchor="middle"
            >
              you are here
            </text>
          </svg>
        </div>

        <div className="mx-auto w-full max-w-[720px]">
          <div className="aspect-video overflow-hidden rounded-lg border border-border bg-bg-2">
            {"https://www.loom.com/embed/REPLACE_WITH_LOOM_ID".includes("REPLACE_WITH_LOOM_ID") ? (
              <div className="flex h-full flex-col items-center justify-center px-6 text-center">
                <div className="flex h-[60px] w-[60px] items-center justify-center rounded-full border border-border">
                  <svg width="18" height="20" viewBox="0 0 18 20" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                    <path d="M3 2L15 10L3 18V2Z" fill="var(--text-3)" />
                  </svg>
                </div>
                <div className="mt-4 text-[14px] text-text-3">Demo video coming soon</div>
                <div className="mt-2 text-[12px] text-text-3">Replace LOOM_ID in app/page.tsx with your Loom embed ID</div>
              </div>
            ) : (
              <iframe
                src="https://www.loom.com/embed/REPLACE_WITH_LOOM_ID"
                width="100%"
                height="100%"
                frameBorder="0"
                allowFullScreen
                title="Build Satoshi demo video"
              />
            )}
          </div>
        </div>
      </section>

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
            {visibleTracks.map((track) => (
              <TrackCard key={track.id} track={track} />
            ))}
          </AnimatePresence>
        </motion.div>

        <Link
          href="/gallery"
          className="flex w-full items-center justify-between gap-4 rounded-lg border border-border px-5 py-3 text-[14px] text-text-2 transition hover:border-border-active hover:bg-bg-2"
        >
          <span>Join 4 developers who have already shipped →</span>
          <span className="text-btc">View gallery →</span>
        </Link>
      </section>
      </PageShell>
    </div>
  );
}
