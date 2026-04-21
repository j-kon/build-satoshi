import tracksData from "@/data/tracks.json";
import type { Difficulty, ProgressMap, Stack, Track } from "@/lib/types";

export const tracks = tracksData as Track[];

export const difficultyOrder: Difficulty[] = ["beginner", "intermediate", "advanced"];

export const stackOptions = Array.from(new Set(tracks.flatMap((track) => track.stack))) as Stack[];

export function getTrackById(id: string) {
  return tracks.find((track) => track.id === id);
}

export function getTotalWeeks(items: Track[] = tracks) {
  return items.reduce((total, track) => total + track.weeks, 0);
}

export function getTrackCompletion(progressMap: ProgressMap, trackId: string, totalWeeks: number) {
  const completedWeeks = Array.from(new Set(progressMap[trackId] ?? [])).sort((a, b) => a - b);
  const completed = completedWeeks.length;
  const percentage = totalWeeks === 0 ? 0 : Math.round((completed / totalWeeks) * 100);

  return {
    completedWeeks,
    completed,
    totalWeeks,
    percentage,
    isComplete: completed === totalWeeks
  };
}

export function getProgressSnapshot(progressMap: ProgressMap) {
  const totals = tracks.map((track) => getTrackCompletion(progressMap, track.id, track.weeks));
  const completedWeeks = totals.reduce((sum, item) => sum + item.completed, 0);
  const startedTracks = totals.filter((item) => item.completed > 0).length;
  const finishedTracks = totals.filter((item) => item.isComplete).length;

  return {
    totalWeeks: getTotalWeeks(),
    completedWeeks,
    startedTracks,
    finishedTracks
  };
}
