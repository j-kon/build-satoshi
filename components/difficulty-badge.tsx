import type { Difficulty } from "@/lib/types";
import { cn, formatDifficulty } from "@/lib/utils";

type DifficultyBadgeProps = {
  difficulty: Difficulty;
};

const toneMap: Record<Difficulty, string> = {
  beginner: "border-[rgba(34,197,94,0.22)] bg-green-dim text-green",
  intermediate: "border-[rgba(247,147,26,0.22)] bg-btc-dim text-btc",
  advanced: "border-[rgba(239,68,68,0.22)] bg-[rgba(239,68,68,0.12)] text-red"
};

export function DifficultyBadge({ difficulty }: DifficultyBadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-[4px] border px-[10px] py-[4px] text-[10px] font-medium uppercase tracking-label",
        toneMap[difficulty]
      )}
    >
      {formatDifficulty(difficulty)}
    </span>
  );
}
