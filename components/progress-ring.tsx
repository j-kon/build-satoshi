type ProgressRingProps = {
  completed: number;
  total: number;
};

export function ProgressRing({ completed, total }: ProgressRingProps) {
  const radius = 34;
  const circumference = 2 * Math.PI * radius;
  const progress = total === 0 ? 0 : completed / total;
  const dashOffset = circumference - progress * circumference;

  return (
    <div className="relative h-20 w-20">
      <svg viewBox="0 0 80 80" className="h-20 w-20">
        <circle cx="40" cy="40" r={radius} stroke="var(--bg-3)" strokeWidth="4" fill="transparent" />
        <circle
          cx="40"
          cy="40"
          r={radius}
          stroke="var(--btc)"
          strokeWidth="4"
          fill="transparent"
          strokeDasharray={circumference}
          strokeDashoffset={dashOffset}
          strokeLinecap="round"
          transform="rotate(-90 40 40)"
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center font-mono text-[13px] text-text">
        {completed}/{total}
      </div>
    </div>
  );
}
