import { useState } from "react";
import { formatNumber, toFa } from "../../lib/format";

export default function BarChart({
  data,
  color = "#4f56eb",
  axisLabel = "",
}: {
  data: { label: string; value: number }[];
  color?: string;
  axisLabel?: string;
}) {
  const [hover, setHover] = useState<number | null>(null);
  const max = Math.max(...data.map((d) => d.value), 1);

  return (
    <div>
      <div
        className="flex h-40 items-end gap-1.5 sm:gap-2"
        onMouseLeave={() => setHover(null)}
      >
        {data.map((d, i) => {
          const h = Math.max(6, (d.value / max) * 100);
          return (
            <div
              key={d.label}
              className="group relative flex h-full flex-1 cursor-default items-end"
              onMouseEnter={() => setHover(i)}
            >
              <div
                className="w-full rounded-t-md transition-all duration-200"
                style={{
                  height: `${h}%`,
                  backgroundColor: color,
                  opacity: hover === null || hover === i ? 0.9 : 0.4,
                }}
              />
              {hover === i && (
                <div className="pointer-events-none absolute -top-8 right-1/2 translate-x-1/2 whitespace-nowrap rounded-lg bg-navy-900 px-2 py-1 text-[10px] text-white">
                  {formatNumber(d.value)} {axisLabel && toFa(axisLabel)}
                </div>
              )}
            </div>
          );
        })}
      </div>
      <div className="mt-1.5 flex gap-1.5 sm:gap-2">
        {data.map((d, i) => (
          <span
            key={d.label}
            className={`flex-1 truncate text-center text-[9px] sm:text-[10px] ${
              hover === i ? "font-bold text-navy-800" : "text-slate-400"
            }`}
          >
            {d.label}
          </span>
        ))}
      </div>
    </div>
  );
}
