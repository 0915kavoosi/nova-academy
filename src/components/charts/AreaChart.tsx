import { useId, useState } from "react";
import { formatNumber, toFa } from "../../lib/format";

interface Point {
  label: string;
  value: number;
}

function buildSmoothPath(points: { x: number; y: number }[]): string {
  if (points.length < 2) return "";
  let d = `M ${points[0].x} ${points[0].y}`;
  for (let i = 1; i < points.length; i++) {
    const prev = points[i - 1];
    const curr = points[i];
    const cx = (prev.x + curr.x) / 2;
    d += ` C ${cx} ${prev.y}, ${cx} ${curr.y}, ${curr.x} ${curr.y}`;
  }
  return d;
}

export default function AreaChart({
  data,
  valueSuffix = "",
  valueUnit = "",
  color = "#4f56eb",
}: {
  data: Point[];
  valueSuffix?: string;
  valueUnit?: string;
  color?: string;
}) {
  const uid = useId().replace(/[:]/g, "");
  const [hover, setHover] = useState<number | null>(null);

  const W = 640;
  const H = 220;
  const padX = 24;
  const padTop = 18;
  const padBottom = 26;

  const max = Math.max(...data.map((d) => d.value));
  const niceMax = Math.ceil(max / 20) * 20 || 20;

  const points = data.map((d, i) => ({
    x: padX + (i * (W - padX * 2)) / (data.length - 1),
    y:
      padTop +
      (1 - d.value / niceMax) * (H - padTop - padBottom),
  }));

  const linePath = buildSmoothPath(points);
  const areaPath = `${linePath} L ${points[points.length - 1].x} ${H - padBottom} L ${points[0].x} ${H - padBottom} Z`;

  const gridLines = [0.25, 0.5, 0.75, 1].map((r) => niceMax * r);

  return (
    <div className="relative w-full">
      <svg
        viewBox={`0 0 ${W} ${H}`}
        className="w-full"
        role="img"
        aria-label="نمودار روند ثبت‌نام در طول سال"
        onMouseLeave={() => setHover(null)}
      >
        <defs>
          <linearGradient id={`grad-${uid}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={color} stopOpacity="0.25" />
            <stop offset="100%" stopColor={color} stopOpacity="0.02" />
          </linearGradient>
        </defs>

        {gridLines.map((v, i) => {
          const y = padTop + (1 - v / niceMax) * (H - padTop - padBottom);
          return (
            <g key={i}>
              <line
                x1={padX}
                x2={W - padX}
                y1={y}
                y2={y}
                stroke="#e2e8f0"
                strokeDasharray="3 4"
              />
              <text
                x={W - padX + 4}
                y={y + 3.5}
                fontSize="9"
                fill="#94a3b8"
                direction="ltr"
              >
                {toFa(v)}
              </text>
            </g>
          );
        })}

        <path d={areaPath} fill={`url(#grad-${uid})`} />
        <path
          d={linePath}
          fill="none"
          stroke={color}
          strokeWidth="2.5"
          strokeLinecap="round"
        />

        {points.map((p, i) => (
          <g key={i}>
            {hover === i && (
              <line
                x1={p.x}
                x2={p.x}
                y1={padTop - 6}
                y2={H - padBottom}
                stroke={color}
                strokeOpacity="0.3"
              />
            )}
            <circle
              cx={p.x}
              cy={p.y}
              r={hover === i ? 4.5 : 0}
              fill="white"
              stroke={color}
              strokeWidth="2.5"
            />
            <rect
              x={p.x - 18}
              y={0}
              width={36}
              height={H}
              fill="transparent"
              onMouseEnter={() => setHover(i)}
            />
          </g>
        ))}
      </svg>
      <div
        className="mt-1 flex justify-between px-1 text-[10px] text-slate-400 lg:hidden"
        aria-hidden="true"
      >
        {data.filter((_, i) => i % 3 === 0).map((d) => (
          <span key={d.label}>{d.label}</span>
        ))}
      </div>
      <div className="mt-1 hidden justify-between px-1 text-[10px] text-slate-400 lg:flex">
        {data.map((d) => (
          <span key={d.label}>{d.label}</span>
        ))}
      </div>
      {hover !== null && (
        <div
          className="pointer-events-none absolute top-0 rounded-lg bg-navy-900 px-3 py-1.5 text-xs text-white shadow-card"
          style={{
            right: `${(1 - points[hover].x / W) * 100}%`,
            transform:
              hover === 0 ? "translateX(-30%)" : hover === data.length - 1 ? "translateX(30%)" : "translateX(50%)",
          }}
        >
          <div className="font-bold">
            {formatNumber(data[hover].value)}
            {valueUnit || valueSuffix}
          </div>
          <div className="text-[10px] text-royal-200">{data[hover].label}</div>
        </div>
      )}
    </div>
  );
}
