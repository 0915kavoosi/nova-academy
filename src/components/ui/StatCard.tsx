import type { LucideIcon } from "lucide-react";
import { Info } from "lucide-react";
import { formatNumber, toFa } from "../../lib/format";

export interface StatCardProps {
  icon: LucideIcon;
  label: string;
  value: number;
  suffix?: string;
  trend?: "up" | "down" | null;
  trendLabel?: string;
  demo?: boolean;
  accent?: "royal" | "sky" | "emerald" | "amber";
}

const accents: Record<string, { bg: string; text: string; ring: string }> = {
  royal: { bg: "bg-royal-50", text: "text-royal-600", ring: "ring-royal-500/10" },
  sky: { bg: "bg-sky-50", text: "text-sky-600", ring: "ring-sky-500/10" },
  emerald: { bg: "bg-emerald-50", text: "text-emerald-600", ring: "ring-emerald-500/10" },
  amber: { bg: "bg-amber-50", text: "text-amber-600", ring: "ring-amber-500/10" },
};

export default function StatCard({
  icon: Icon,
  label,
  value,
  suffix = "",
  trend = null,
  trendLabel,
  demo = true,
  accent = "royal",
}: StatCardProps) {
  const a = accents[accent];
  return (
    <div className="flex flex-col gap-3 rounded-2xl border border-slate-100 bg-white p-5 shadow-card">
      <div className="flex items-start justify-between">
        <span
          className={`flex h-10 w-10 items-center justify-center rounded-xl ${a.bg} ${a.text} ring-1 ${a.ring}`}
        >
          <Icon size={20} />
        </span>
        {trend !== null && (
          <span
            className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${
              trend === "up"
                ? "bg-emerald-50 text-emerald-600"
                : "bg-red-50 text-red-600"
            }`}
          >
            {trend === "up" ? "↑" : "↓"} {trendLabel && toFa(trendLabel)}
          </span>
        )}
      </div>
      <div>
        <p className="text-2xl font-black text-navy-900">
          {formatNumber(value)}
          <span className="text-base font-bold text-slate-400">{suffix}</span>
        </p>
        <p className="mt-0.5 text-sm text-slate-500">{label}</p>
      </div>
      {demo && (
        <span className="flex items-center gap-1 text-[10px] text-slate-400">
          <Info size={11} />
          داده نمایشی
        </span>
      )}
    </div>
  );
}
