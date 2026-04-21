"use client";

import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export interface ProgressState {
  completedWeeks: Record<string, boolean>;
  markWeekComplete: (trackId: string, week: number) => void;
  getCompletedCount: (trackId: string, totalWeeks: number) => number;
  isWeekComplete: (trackId: string, week: number) => boolean;
  getCurrentWeek: (trackId: string, totalWeeks: number) => number;
  resetTrack: (trackId: string, totalWeeks: number) => void;
}

export function getWeekKey(trackId: string, week: number) {
  return `${trackId}-week-${week}`;
}

export const useProgressStore = create<ProgressState>()(
  persist(
    (set, get) => ({
      completedWeeks: {},
      markWeekComplete: (trackId, week) =>
        set((state) => ({
          completedWeeks: {
            ...state.completedWeeks,
            [getWeekKey(trackId, week)]: true
          }
        })),
      getCompletedCount: (trackId, totalWeeks) => {
        let count = 0;

        for (let week = 1; week <= totalWeeks; week += 1) {
          if (get().completedWeeks[getWeekKey(trackId, week)]) {
            count += 1;
          }
        }

        return count;
      },
      isWeekComplete: (trackId, week) => Boolean(get().completedWeeks[getWeekKey(trackId, week)]),
      getCurrentWeek: (trackId, totalWeeks) => {
        for (let week = 1; week <= totalWeeks; week += 1) {
          if (!get().completedWeeks[getWeekKey(trackId, week)]) {
            return week;
          }
        }

        return totalWeeks;
      },
      resetTrack: (trackId, totalWeeks) =>
        set((state) => {
          const nextCompletedWeeks = { ...state.completedWeeks };

          for (let week = 1; week <= totalWeeks; week += 1) {
            delete nextCompletedWeeks[getWeekKey(trackId, week)];
          }

          return {
            completedWeeks: nextCompletedWeeks
          };
        })
    }),
    {
      name: "build-satoshi-progress",
      storage: createJSONStorage(() => localStorage)
    }
  )
);
