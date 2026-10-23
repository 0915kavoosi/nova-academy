import { toFa } from "../../lib/format";

const colorMap: Record<string, string> = {
  royal: "bg-royal-600",
  green: "bg-emerald-500",
  amber: "bg-amber-500",
  sky: "bg-sky-500",
  slate: "bg-slate-400",
};

export default function ProgressBar({
  value,
  color = "royal",
  showLabel = true,
  className = "",
}: {
  value: number;
  color?: keyof typeof colorMap;
  showLabel?: boolean;
  className?: string;
}) {
  const pct = Math.max(0, Math.min(100, value));
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <div
        className="h-2 w-full overflow-hidden rounded-full bg-slate-100"
        role="progressbar"
        aria-valuenow={pct}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={`پیشرفت ${toFa(pct)} درصد`}
      >
        <div
          className={`h-full rounded-full transition-[width] duration-500 ${colorMap[color] ?? colorMap.royal}`}
          style={{ width: `${pct}%` }}
        />
      </div>
      {showLabel && (
        <span className="shrink-0 text-xs font-medium text-navy-800">
          ٪{toFa(pct)}
        </span>
      )}
    </div>
  );
}
