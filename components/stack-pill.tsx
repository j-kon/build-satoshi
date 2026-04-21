type StackPillProps = {
  value: string;
};

export function StackPill({ value }: StackPillProps) {
  return <span className="rounded-full border border-border px-2 py-[3px] font-mono text-[11px] text-text-2">{value}</span>;
}
