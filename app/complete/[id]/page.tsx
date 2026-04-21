import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { CompleteTrackScreen } from "@/components/complete-track-screen";
import { getTrackById, tracks } from "@/lib/tracks";

type CompletePageProps = {
  params: {
    id: string;
  };
};

export function generateStaticParams() {
  return tracks.map((track) => ({ id: track.id }));
}

export function generateMetadata({ params }: CompletePageProps): Metadata {
  const track = getTrackById(params.id);

  if (!track) {
    return {};
  }

  return {
    title: `${track.title} complete — Build Satoshi`,
    description: `Portfolio card generator and next steps for ${track.title}.`
  };
}

export default function CompletePage({ params }: CompletePageProps) {
  const track = getTrackById(params.id);

  if (!track) {
    notFound();
  }

  return <CompleteTrackScreen track={track} />;
}
