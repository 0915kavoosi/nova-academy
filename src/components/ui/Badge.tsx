import type { ReactNode } from "react";

type Tone = "royal" | "green" | "amber" | "red" | "slate" | "sky";

const tones: Record<Tone, string> = {
  royal: "bg-royal-50 text-royal-700 ring-royal-600/15",
  green: "bg-emerald-50 text-emerald-700 ring-emerald-600/15",
  amber: "bg-amber-50 text-amber-700 ring-amber-600/20",
  red: "bg-red-50 text-red-700 ring-red-600/15",
  slate: "bg-slate-100 text-slate-600 ring-slate-500/15",
  sky: "bg-sky-50 text-sky-700 ring-sky-600/15",
};

export default function Badge({
  tone = "slate",
  children,
  className = "",
}: {
  tone?: Tone;
  children: ReactNode;
  className?: string;
}) {
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-medium ring-1 ring-inset ${tones[tone]} ${className}`}
    >
      {children}
    </span>
  );
}
