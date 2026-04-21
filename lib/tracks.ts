import tracksData from "@/data/tracks.json";
import type { Difficulty, Resource, Stack, Track } from "@/lib/types";

export const tracks = tracksData as Track[];

export const difficultyOrder: Difficulty[] = ["beginner", "intermediate", "advanced"];

export const stackOptions = Array.from(new Set(tracks.flatMap((track) => track.stack))) as Stack[];

export function getTrackById(id: string) {
  return tracks.find((track) => track.id === id);
}

export function getTotalWeeks(items: Track[] = tracks) {
  return items.reduce((total, track) => total + track.weeks, 0);
}

export function getSidebarResources(track: Track): Resource[] {
  return track.milestones[0]?.resources.slice(0, 3) ?? [];
}

export function getDifficultyTone(difficulty: Difficulty) {
  if (difficulty === "beginner") {
    return "beginner";
  }

  if (difficulty === "advanced") {
    return "advanced";
  }

  return "intermediate";
}
