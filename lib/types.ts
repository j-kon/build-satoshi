export type Stack =
  | "BDK"
  | "LDK"
  | "Flutter"
  | "Rust"
  | "Rust Bitcoin"
  | "PSBT"
  | "Lightning"
  | "Python"
  | "TypeScript";

export type Difficulty = "beginner" | "intermediate" | "advanced";

export type Resource = {
  label: string;
  url: string;
};

export type StarterCode = {
  language: string;
  filename: string;
  code: string;
};

export type Milestone = {
  week: number;
  title: string;
  description: string;
  starter_code?: StarterCode;
  resources: Resource[];
};

export type Track = {
  id: string;
  title: string;
  tagline: string;
  difficulty: Difficulty;
  weeks: number;
  stack: Stack[];
  description: string;
  what_you_build: string;
  milestones: Milestone[];
  chatbtc_context: string;
};

export type ProgressMap = Record<string, number[]>;
