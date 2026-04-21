import type { ReactNode } from "react";

type SectionHeadingProps = {
  eyebrow: string;
  title: string;
  description: ReactNode;
};

export function SectionHeading({ eyebrow, title, description }: SectionHeadingProps) {
  return (
    <div className="space-y-3">
      <div className="text-[11px] font-medium uppercase tracking-label text-btc">{eyebrow}</div>
      <h2 className="max-w-3xl text-2xl font-medium tracking-[-0.03em] text-text">{title}</h2>
      <div className="max-w-3xl text-sm leading-6 text-text-2">{description}</div>
    </div>
  );
}
