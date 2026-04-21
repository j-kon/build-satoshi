import clsx, { type ClassValue } from "clsx";

export function cn(...classes: ClassValue[]) {
  return clsx(classes);
}

export function formatDifficulty(value: string) {
  return value.charAt(0).toUpperCase() + value.slice(1);
}

export function pluralize(count: number, singular: string, plural = `${singular}s`) {
  return `${count} ${count === 1 ? singular : plural}`;
}

export function normalizeExternalUrl(value: string) {
  if (!value.trim()) {
    return "https://github.com/yourname/yourproject";
  }

  if (value.startsWith("http://") || value.startsWith("https://")) {
    return value;
  }

  return `https://${value}`;
}
