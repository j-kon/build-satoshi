import { TrackSelectionScreen } from "@/components/track-selection-screen";
import { tracks } from "@/lib/tracks";

export default function HomePage() {
  return <TrackSelectionScreen tracks={tracks} />;
}
