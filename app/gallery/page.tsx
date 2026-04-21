import Link from "next/link";

import { PageShell } from "@/components/page-shell";
import { StackPill } from "@/components/stack-pill";

const completions = [
  {
    name: "Adamu Yusuf",
    handle: "dev_adamu",
    project: "Lightning Tip Jar",
    stack: ["LDK", "Rust"],
    weeks: 4,
    daysAgo: 12,
    github: "https://github.com/dev-adamu/lightning-tip-jar"
  },
  {
    name: "Chen Wei",
    handle: "chen_builds",
    project: "PSBT Signer CLI",
    stack: ["Rust Bitcoin", "PSBT"],
    weeks: 6,
    daysAgo: 21,
    github: "https://github.com/chen-builds/psbt-signer"
  },
  {
    name: "Emeka Okonkwo",
    handle: "okonkwo_btc",
    project: "Bitcoin Savings App",
    stack: ["BDK", "Flutter", "Lightning"],
    weeks: 8,
    daysAgo: 34,
    github: "https://github.com/okonkwo-btc/btc-savings"
  },
  {
    name: "Fatima Al-Rashid",
    handle: "fatima_sats",
    project: "Lightning Tip Jar",
    stack: ["LDK", "Rust"],
    weeks: 4,
    daysAgo: 47,
    github: "https://github.com/fatima-sats/tip-jar"
  }
] as const;

function getInitials(name: string) {
  return name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

export default function GalleryPage() {
  return (
    <PageShell className="space-y-8">
      <header className="space-y-3">
        <h1 className="font-mono text-[28px] font-medium leading-tight tracking-[-0.04em] text-text md:text-[32px]">
          Shipped by the community
        </h1>
        <p className="max-w-2xl text-[14px] leading-6 text-text-2">
          Developers who completed a Build Satoshi track and published their work.
        </p>
      </header>

      <div className="grid gap-4 md:grid-cols-2">
        {completions.map((completion) => (
          <article key={`${completion.handle}-${completion.project}`} className="rounded-lg border border-border bg-bg-2 p-5">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-full border border-border bg-bg-3 font-mono text-[13px] text-text-2">
                {getInitials(completion.name)}
              </div>
              <div>
                <div className="text-[14px] text-text">{completion.name}</div>
                <div className="text-[12px] text-text-3">@{completion.handle}</div>
              </div>
            </div>

            <div className="mt-4 font-mono text-[16px] text-text">{completion.project}</div>

            <div className="mt-4 flex flex-wrap gap-2">
              {completion.stack.map((item) => (
                <StackPill key={item} value={item} />
              ))}
            </div>

            <div className="mt-4 flex items-center justify-between gap-4">
              <span className="rounded-full border border-border px-3 py-1 font-mono text-[12px] text-text-2">{completion.weeks} weeks</span>
              <span className="text-[12px] text-text-3">{completion.daysAgo} days ago</span>
            </div>

            <Link
              href={completion.github}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 inline-flex text-[12px] text-btc transition hover:opacity-90"
            >
              View on GitHub →
            </Link>
          </article>
        ))}
      </div>
    </PageShell>
  );
}
