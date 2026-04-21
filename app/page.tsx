import { TrackSelectionScreen } from "@/components/track-selection-screen";
import { tracks } from "@/lib/tracks";

type HomePageProps = {
  searchParams?: {
    demo?: string;
  };
};

export default function HomePage({ searchParams }: HomePageProps) {
  return <TrackSelectionScreen tracks={tracks} initialDemo={searchParams?.demo === "true"} />;
}
