"use client";

import { motion } from "framer-motion";

import type { Track } from "@/lib/types";
import { cn, normalizeExternalUrl } from "@/lib/utils";

export type PortfolioTheme = "dark" | "light" | "bitcoin";

type PortfolioCardProps = {
  track: Track;
  githubLink: string;
  theme: PortfolioTheme;
};

const themeClasses: Record<PortfolioTheme, string> = {
  dark: "bg-[#0a0a0a] text-white border-[rgba(247,147,26,0.24)]",
  light: "bg-[#f5f5f0] text-[#1a1a1a] border-[rgba(26,26,26,0.1)]",
  bitcoin: "bg-[#f7931a] text-white border-[rgba(255,255,255,0.24)]"
};

const mutedClasses: Record<PortfolioTheme, string> = {
  dark: "text-[rgba(240,237,230,0.56)]",
  light: "text-[rgba(26,26,26,0.56)]",
  bitcoin: "text-[rgba(255,255,255,0.72)]"
};

const pillTheme: Record<PortfolioTheme, string> = {
  dark: "border-[rgba(255,255,255,0.12)] text-[rgba(255,255,255,0.7)]",
  light: "border-[rgba(26,26,26,0.12)] text-[rgba(26,26,26,0.72)]",
  bitcoin: "border-[rgba(255,255,255,0.35)] text-white"
};

export function PortfolioCard({ track, githubLink, theme }: PortfolioCardProps) {
  const normalizedGithub = normalizeExternalUrl(githubLink);

  return (
    <motion.div
      key={theme}
      initial={{ opacity: 0.86, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.22, ease: "easeOut" }}
      className={cn("w-full max-w-[460px]", theme === "light" ? "shadow-[0_0_0_1px_rgba(0,0,0,0.06)]" : "")}
    >
      <div className={cn("flex aspect-[460/220] flex-col rounded-lg border p-5", themeClasses[theme])}>
        <div className={cn("text-[11px]", mutedClasses[theme])}>Bitcoin Dev Project · Build Satoshi</div>

        <div className="mt-5 flex-1">
          <div className={cn("text-[13px]", mutedClasses[theme])}>I shipped</div>
          <div className="mt-2 max-w-[16ch] font-mono text-[20px] font-medium leading-tight md:text-[22px]">{track.title}</div>
          <div className="mt-4 flex flex-wrap gap-2">
            {track.stack.map((item) => (
              <span key={item} className={cn("rounded-full border px-2 py-[3px] font-mono text-[11px]", pillTheme[theme])}>
                {item}
              </span>
            ))}
            <span className={cn("rounded-full border px-2 py-[3px] font-mono text-[11px]", pillTheme[theme])}>{track.weeks} weeks</span>
          </div>
        </div>

        <div className={cn("flex items-center justify-between gap-4 text-[12px]", mutedClasses[theme])}>
          <span>bitcoindevs.xyz/build</span>
          <span className="truncate text-right">{normalizedGithub.replace(/^https?:\/\//, "")}</span>
        </div>
      </div>
    </motion.div>
  );
}
