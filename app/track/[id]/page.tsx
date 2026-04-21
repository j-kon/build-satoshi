import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { TrackDashboardScreen } from "@/components/track-dashboard-screen";
import { getTrackById, tracks } from "@/lib/tracks";

type TrackPageProps = {
  params: {
    id: string;
  };
};

export function generateStaticParams() {
  return tracks.map((track) => ({ id: track.id }));
}

export function generateMetadata({ params }: TrackPageProps): Metadata {
  const track = getTrackById(params.id);

  if (!track) {
    return {};
  }

  return {
    title: `${track.title} — Build Satoshi`,
    description: track.tagline
  };
}

export default function TrackPage({ params }: TrackPageProps) {
  const track = getTrackById(params.id);

  if (!track) {
    notFound();
  }

  return <TrackDashboardScreen track={track} />;
}
