"use client";

import { create } from "zustand";
import { createJSONStorage, persist, type StateStorage } from "zustand/middleware";

import type { ProgressMap } from "@/lib/types";

type ProgressState = {
  completedByTrack: ProgressMap;
  hasHydrated: boolean;
  toggleWeek: (trackId: string, week: number) => void;
  resetTrack: (trackId: string) => void;
  completeTrack: (trackId: string, totalWeeks: number) => void;
  setHasHydrated: (value: boolean) => void;
};

const noopStorage: StateStorage = {
  getItem: () => null,
  setItem: () => undefined,
  removeItem: () => undefined
};

export const useProgressStore = create<ProgressState>()(
  persist(
    (set) => ({
      completedByTrack: {},
      hasHydrated: false,
      toggleWeek: (trackId, week) =>
        set((state) => {
          const current = state.completedByTrack[trackId] ?? [];
          const exists = current.includes(week);
          const next = exists ? current.filter((value) => value !== week) : [...current, week].sort((a, b) => a - b);

          return {
            completedByTrack: {
              ...state.completedByTrack,
              [trackId]: next
            }
          };
        }),
      resetTrack: (trackId) =>
        set((state) => ({
          completedByTrack: {
            ...state.completedByTrack,
            [trackId]: []
          }
        })),
      completeTrack: (trackId, totalWeeks) =>
        set((state) => ({
          completedByTrack: {
            ...state.completedByTrack,
            [trackId]: Array.from({ length: totalWeeks }, (_, index) => index + 1)
          }
        })),
      setHasHydrated: (value) => set({ hasHydrated: value })
    }),
    {
      name: "build-satoshi-progress",
      storage: createJSONStorage(() => (typeof window !== "undefined" ? localStorage : noopStorage)),
      partialize: (state) => ({
        completedByTrack: state.completedByTrack
      }),
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true);
      }
    }
  )
);
