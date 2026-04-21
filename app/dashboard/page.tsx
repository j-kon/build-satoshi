import { DashboardTracks } from "@/components/dashboard-tracks";
import { PageShell } from "@/components/page-shell";
import { ProgressSummary } from "@/components/progress-summary";
import { SectionHeading } from "@/components/section-heading";
import { tracks } from "@/lib/tracks";

export default function DashboardPage() {
  return (
    <PageShell className="space-y-10">
      <SectionHeading
        eyebrow="Dashboard"
        title="Your local build state"
        description="Progress is persisted in localStorage for this browser only. Use this page to see what is in motion, jump back into a track, or reset a project cleanly."
      />
      <ProgressSummary />
      <div className="rounded-lg border border-border bg-bg-2 p-5 text-sm leading-6 text-text-2">
        State stays on-device. If you clear browser storage or switch machines, progress resets by design.
      </div>
      <DashboardTracks tracks={tracks} />
    </PageShell>
  );
}
