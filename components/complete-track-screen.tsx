"use client";

import { useRef, useState } from "react";
import html2canvas from "html2canvas";
import Link from "next/link";

import { PageShell } from "@/components/page-shell";
import { PortfolioCard, type PortfolioTheme } from "@/components/portfolio-card";
import type { Track } from "@/lib/types";
import { normalizeExternalUrl } from "@/lib/utils";

type CompleteTrackScreenProps = {
  track: Track;
};

const themeOptions: PortfolioTheme[] = ["dark", "light", "bitcoin"];

export function CompleteTrackScreen({ track }: CompleteTrackScreenProps) {
  const [theme, setTheme] = useState<PortfolioTheme>("dark");
  const [githubLink, setGithubLink] = useState("github.com/j-kon/build-satoshi");
  const [copied, setCopied] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  const normalizedGithub = normalizeExternalUrl(githubLink);
  const tweetText = `Just shipped ${track.title} — my first Bitcoin project built through @bitcoindevpro's Build Satoshi program. ${track.weeks} weeks, real code, real Lightning. ${normalizedGithub} #Bitcoin #BOSS #BitcoinDev`;
  const linkedInPost = `I just completed the ${track.title} track in Build Satoshi, the guided onboarding program from the Bitcoin Dev Project.\n\nOver ${track.weeks} weeks, I shipped a real Bitcoin project with production-adjacent tooling, milestone-based execution, and public proof of work.\n\nProject repo: ${normalizedGithub}\n\nI'm now looking at the next step: contributing to an existing BOSS project or applying for a Bitcoin Dev Project grant.`;

  async function handleCopyLinkedIn() {
    await navigator.clipboard.writeText(linkedInPost);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 2000);
  }

  async function downloadCard() {
    if (!cardRef.current) return;
    const canvas = await html2canvas(cardRef.current, {
      scale: 3,
      useCORS: true,
      backgroundColor: null
    });
    const link = document.createElement("a");
    link.download = `build-satoshi-${track.id}.png`;
    link.href = canvas.toDataURL("image/png");
    link.click();
  }

  return (
    <PageShell className="space-y-8">
      <div className="space-y-4">
        <div className="label text-btc">Track complete</div>
        <h1 className="max-w-3xl font-mono text-[28px] font-medium leading-tight tracking-[-0.04em] text-text md:text-[32px]">
          Congratulations. You shipped {track.title}.
        </h1>
        <p className="max-w-2xl text-[14px] leading-6 text-text-2">
          Turn the project into a public proof-of-work artifact, share it, and use it as the bridge into deeper Bitcoin open-source work.
        </p>
      </div>

      <div className="grid gap-8 lg:grid-cols-[minmax(0,460px)_minmax(0,1fr)]">
        <div className="space-y-5">
          <PortfolioCard ref={cardRef} track={track} githubLink={githubLink} theme={theme} />

          <div className="flex flex-wrap gap-2">
            {themeOptions.map((option) => (
              <button
                key={option}
                type="button"
                onClick={() => setTheme(option)}
                className={`h-10 min-w-[72px] rounded-md border px-3 text-[12px] transition ${
                  theme === option
                    ? "border-btc ring-1 ring-btc text-text"
                    : "border-border text-text-2 hover:border-border-active hover:text-text"
                }`}
              >
                {option.charAt(0).toUpperCase() + option.slice(1)}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          <label className="block space-y-2">
            <span className="label">GitHub repo</span>
            <input
              value={githubLink}
              onChange={(event) => setGithubLink(event.target.value)}
              placeholder="github.com/j-kon/build-satoshi"
              className="w-full rounded-lg border border-border bg-bg-2 px-4 py-3 text-[14px] text-text outline-none transition placeholder:text-text-3 focus:border-border-active"
            />
          </label>

          <div className="flex flex-wrap gap-3">
            <button
              type="button"
              onClick={downloadCard}
              className="rounded-lg border border-border px-4 py-3 text-sm text-text-2 transition hover:border-btc hover:text-btc"
            >
              Download card
            </button>
            <a
              href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(tweetText)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-lg border border-border px-4 py-3 text-sm text-text-2 transition hover:border-btc hover:text-btc"
            >
              Draft tweet ↗
            </a>
            <button
              type="button"
              onClick={handleCopyLinkedIn}
              className="rounded-lg border border-border px-4 py-3 text-sm text-text-2 transition hover:border-btc hover:text-btc"
            >
              {copied ? "Copied!" : "Copy LinkedIn post"}
            </button>
            <a
              href="https://grants.bitcoindevs.xyz/"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-lg border border-border px-4 py-3 text-sm text-text-2 transition hover:border-btc hover:text-btc"
            >
              Apply for a grant ↗
            </a>
          </div>

          <div className="rounded-lg border border-border bg-bg-2 p-5">
            <p className="max-w-2xl text-[14px] leading-7 text-text-2">
              You've completed a Build Satoshi track. You now have a real Bitcoin project and a proof-of-work artifact. The next step
              is contributing to an existing BOSS project or applying for a grant.
            </p>
            <div className="mt-4 flex flex-wrap gap-4">
              <Link href="/boss-map" className="text-sm text-text-2 transition hover:text-btc">
                Open BOSS map →
              </Link>
              <a
                href="https://bitcoindevs.xyz/projects"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-text-2 transition hover:text-btc"
              >
                Explore BOSS projects →
              </a>
              <a
                href="https://grants.bitcoindevs.xyz/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-text-2 transition hover:text-btc"
              >
                Open grant application →
              </a>
            </div>
          </div>
        </div>
      </div>
    </PageShell>
  );
}
