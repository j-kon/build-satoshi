import { PageShell } from "@/components/page-shell";
import { SectionHeading } from "@/components/section-heading";
import { TrackBrowser } from "@/components/track-browser";
import { tracks } from "@/lib/tracks";

export default function TracksPage() {
  return (
    <PageShell className="space-y-10">
      <SectionHeading
        eyebrow="Track library"
        title="Choose the Bitcoin project you want to become known for"
        description="Browse the catalog by difficulty, stack, or build outcome. Every card leads to a milestone timeline with starter code, references, and a persistent local progress marker."
      />
      <TrackBrowser tracks={tracks} />
    </PageShell>
  );
}
