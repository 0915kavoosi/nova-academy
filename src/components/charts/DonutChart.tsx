import { useState } from "react";

const COLORS = ["#4f56eb", "#a4bcfd", "#1d2f4a", "#8fadd1", "#3b82f6", "#33368b"];

export default function DonutChart({
  data,
}: {
  data: { label: string; value: number }[];
  }) {
  const [hover, setHover] = useState<number | null>(null);

  const total = data.reduce((s, d) => s + d.value, 0) || 1;
  const size = 180;
  const stroke = 26;
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;

  let offset = 0;
  const segments = data.map((d, i) => {
    const frac = d.value / total;
    const seg = {
      ...d,
      i,
      dash: frac * c,
      offset,
      pct: Math.round(frac * 100),
      color: COLORS[i % COLORS.length],
    };
    offset += frac * c;
    return seg;
  });

  return (
    <div className="flex flex-col items-center gap-5 sm:flex-row sm:justify-center lg:flex-col lg:items-start">
      <svg
        viewBox={`0 0 ${size} ${size}`}
        width={180}
        height={180}
        role="img"
        aria-label="سهم دسته‌بندی‌ها از ثبت‌نام‌ها"
      >
        <g transform={`rotate(-90 ${size / 2} ${size / 2})`}>
          {segments.map((s) => (
            <circle
              key={s.i}
              cx={size / 2}
              cy={size / 2}
              r={r}
              fill="none"
              stroke={s.color}
              strokeWidth={hover === s.i ? stroke + 4 : stroke}
              strokeDasharray={`${s.dash} ${c - s.dash}`}
              strokeDashoffset={-s.offset}
              opacity={hover === null || hover === s.i ? 1 : 0.35}
              onMouseEnter={() => setHover(s.i)}
              onMouseLeave={() => setHover(null)}
              style={{ transition: "opacity 150ms, stroke-width 150ms" }}
            />
          ))}
        </g>
        <text
          x="50%"
          y="47%"
          textAnchor="middle"
          fontSize="26"
          fontWeight="700"
          fill="#1d2f4a"
        >
          {hover !== null ? `${segments[hover].pct}٪` : total.toLocaleString("fa-IR")}
        </text>
        <text x="50%" y="62%" textAnchor="middle" fontSize="10" fill="#94a3b8">
          {hover !== null ? segments[hover].label : "مجموع ثبت‌نام"}
        </text>
      </svg>
      <ul className="flex w-full flex-wrap justify-center gap-x-4 gap-y-1.5 lg:flex-col lg:gap-1.5">
        {segments.map((s) => (
          <li
            key={s.label}
            className={`flex items-center gap-2 text-xs ${
              hover === s.i ? "font-bold text-navy-900" : "text-slate-600"
            }`}
            onMouseEnter={() => setHover(s.i)}
            onMouseLeave={() => setHover(null)}
          >
            <span
              className="h-2.5 w-2.5 shrink-0 rounded-full"
              style={{ backgroundColor: s.color }}
            />
            {s.label}
          </li>
        ))}
      </ul>
    </div>
  );
}
