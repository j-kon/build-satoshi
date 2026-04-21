import Link from "next/link";

import { DifficultyBadge } from "@/components/difficulty-badge";
import { PageShell } from "@/components/page-shell";
import { StackPill } from "@/components/stack-pill";
import { tracks } from "@/lib/tracks";

const nextSteps: Record<string, string[]> = {
  "lightning-tip-jar": [
    "Publish setup docs for other builders running regtest Lightning demos",
    "Contribute invoice or payment-confirmation UX ideas to Lightning apps",
    "Submit your demo and source to the BDP gallery as a reference build"
  ],
  "bitcoin-savings-app": [
    "Contribute wallet UX, habit systems, or localization ideas to mobile Bitcoin apps",
    "Open-source your vault or price-conversion modules as standalone utilities",
    "Turn your demo into a user-tested concept for grant or incubator applications"
  ],
  "psbt-signer-cli": [
    "Contribute descriptor, PSBT, or HWI improvements to wallet tooling",
    "Publish test fixtures and signing docs that help other Rust Bitcoin builders",
    "Use the CLI as a base for deeper work on wallet infrastructure or audit tooling"
  ]
};

export default function BossMapPage() {
  return (
    <PageShell className="space-y-10">
      <section className="space-y-6 rounded-lg border border-border bg-bg-2 p-6 md:p-8">
        <div className="space-y-4">
          <h1 className="max-w-4xl font-mono text-[28px] font-medium leading-tight tracking-[-0.04em] text-text md:text-[40px]">
            From first shipped build to real ecosystem contribution
          </h1>
          <p className="max-w-3xl text-[15px] leading-7 text-text-2">
            Use your finished Build Satoshi project as a bridge into existing BOSS projects, public portfolio artifacts, and
            grant-ready follow-on work.
          </p>
        </div>
      </section>

      <section className="grid gap-4 xl:grid-cols-3">
        {tracks.map((track) => (
          <article key={track.id} className="flex h-full flex-col rounded-lg border border-border bg-bg-2 p-5 transition hover:border-border-active">
            <div className="flex items-start justify-between gap-4">
              <DifficultyBadge difficulty={track.difficulty} />
              <div className="font-mono text-[12px] text-text-3">{track.weeks} weeks</div>
            </div>

            <div className="mt-5">
              <h2 className="font-mono text-[20px] font-medium tracking-tight text-text">{track.title}</h2>
              <p className="mt-2 text-[14px] leading-6 text-text-2">{track.tagline}</p>
            </div>

            <div className="mt-4 flex flex-wrap gap-2">
              {track.stack.map((item) => (
                <StackPill key={item} value={item} />
              ))}
            </div>

            <ul className="mt-5 space-y-3 border-t border-border pt-5 text-[14px] leading-6 text-text-2">
              {nextSteps[track.id].map((item) => (
                <li key={item} className="flex gap-2">
                  <span className="mt-[1px] text-btc">•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            <div className="mt-auto flex flex-wrap gap-4 pt-6 text-[14px]">
              <Link href={`/track/${track.id}`} className="text-text-2 transition hover:text-btc">
                Open track →
              </Link>
              <Link href={`/complete/${track.id}`} className="text-btc transition hover:opacity-90">
                Completion pack →
              </Link>
            </div>
          </article>
        ))}
      </section>
    </PageShell>
  );
}
