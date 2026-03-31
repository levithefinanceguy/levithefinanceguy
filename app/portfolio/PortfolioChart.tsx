"use client";

import { useEffect, useState, useRef, useCallback, useMemo } from "react";

interface DataPoint {
  date: string;
  value: number;
}

type Period = "1D" | "1W" | "1M" | "3M" | "ALL";

function fmt(n: number) {
  return n.toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

function formatDate(dateStr: string): string {
  // Intraday: "2026-03-31T14:30" → "2:30 PM"
  if (dateStr.includes("T")) {
    const d = new Date(dateStr + ":00Z");
    return d.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" });
  }
  // Daily: "2026-03-31" → "Mar 31, 2026"
  const d = new Date(dateStr + "T12:00:00");
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

function filterByPeriod(data: DataPoint[], period: Period): DataPoint[] {
  if (period === "ALL" || data.length === 0) return data;

  const now = new Date();
  let cutoff: Date;

  switch (period) {
    case "1W":
      cutoff = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
      break;
    case "1M":
      cutoff = new Date(now);
      cutoff.setMonth(cutoff.getMonth() - 1);
      break;
    case "3M":
      cutoff = new Date(now);
      cutoff.setMonth(cutoff.getMonth() - 3);
      break;
  }

  const cutoffStr = cutoff.toISOString().split("T")[0];
  const filtered = data.filter((d) => d.date >= cutoffStr);
  return filtered.length > 0 ? filtered : data.slice(-1);
}

export default function PortfolioChart() {
  const [allData, setAllData] = useState<DataPoint[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [period, setPeriod] = useState<Period>("ALL");
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);
  const svgRef = useRef<SVGSVGElement>(null);

  const fetchHistory = useCallback((range: string) => {
    setLoading(true);
    setError(false);
    fetch(`/api/portfolio-history?range=${range}`)
      .then((res) => res.json())
      .then((json) => {
        if (json.history && json.history.length > 0) {
          setAllData(json.history);
        } else {
          setError(true);
        }
      })
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    fetchHistory("ALL");
  }, [fetchHistory]);

  const data = useMemo(() => {
    if (period === "1D") return allData; // Already filtered server-side
    return filterByPeriod(allData, period);
  }, [allData, period]);

  const startValue = data.length > 0 ? data[0].value : 0;
  const endValue = data.length > 0 ? data[data.length - 1].value : 0;
  const displayValue =
    hoverIndex !== null && data[hoverIndex] ? data[hoverIndex].value : endValue;
  const displayDate =
    hoverIndex !== null && data[hoverIndex]
      ? formatDate(data[hoverIndex].date)
      : null;
  const referenceValue =
    hoverIndex !== null && data[hoverIndex] ? data[hoverIndex].value : endValue;
  const gainLoss = referenceValue - startValue;
  const gainLossPct = startValue > 0 ? (gainLoss / startValue) * 100 : 0;
  const isPositive = endValue >= startValue;

  // Chart dimensions
  const PADDING_LEFT = 0;
  const PADDING_RIGHT = 0;
  const PADDING_TOP = 8;
  const PADDING_BOTTOM = 4;

  const buildPath = useCallback(
    (width: number, height: number) => {
      if (data.length < 2) return { linePath: "", areaPath: "", points: [] };

      const values = data.map((d) => d.value);
      const min = Math.min(...values);
      const max = Math.max(...values);
      const range = max - min || 1;

      const chartW = width - PADDING_LEFT - PADDING_RIGHT;
      const chartH = height - PADDING_TOP - PADDING_BOTTOM;

      const points = data.map((d, i) => ({
        x: PADDING_LEFT + (i / (data.length - 1)) * chartW,
        y: PADDING_TOP + chartH - ((d.value - min) / range) * chartH,
      }));

      // Build smooth curve using catmull-rom to bezier conversion
      let linePath = `M ${points[0].x},${points[0].y}`;

      for (let i = 0; i < points.length - 1; i++) {
        const p0 = points[Math.max(0, i - 1)];
        const p1 = points[i];
        const p2 = points[i + 1];
        const p3 = points[Math.min(points.length - 1, i + 2)];

        const tension = 0.3;
        const cp1x = p1.x + ((p2.x - p0.x) * tension) / 3;
        const cp1y = p1.y + ((p2.y - p0.y) * tension) / 3;
        const cp2x = p2.x - ((p3.x - p1.x) * tension) / 3;
        const cp2y = p2.y - ((p3.y - p1.y) * tension) / 3;

        linePath += ` C ${cp1x},${cp1y} ${cp2x},${cp2y} ${p2.x},${p2.y}`;
      }

      const areaPath =
        linePath +
        ` L ${points[points.length - 1].x},${height} L ${points[0].x},${height} Z`;

      return { linePath, areaPath, points };
    },
    [data]
  );

  const handlePointerMove = useCallback(
    (e: React.PointerEvent<SVGSVGElement>) => {
      if (!svgRef.current || data.length < 2) return;
      const rect = svgRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const ratio = x / rect.width;
      const idx = Math.round(ratio * (data.length - 1));
      setHoverIndex(Math.max(0, Math.min(data.length - 1, idx)));
    },
    [data.length]
  );

  const handlePointerLeave = useCallback(() => {
    setHoverIndex(null);
  }, []);

  const accentColor = isPositive ? "#2ECC71" : "#E74C3C";
  const gradientId = isPositive ? "greenGradient" : "redGradient";

  if (loading) {
    return (
      <div className="mb-12 p-8 rounded-xl bg-card-bg border border-card-border">
        <div className="animate-pulse">
          <div className="h-8 w-48 bg-gray-800 rounded mb-2" />
          <div className="h-5 w-32 bg-gray-800 rounded mb-6" />
          <div className="h-[300px] bg-gray-800/50 rounded-lg" />
          <div className="flex gap-2 mt-4 justify-center">
            {["1D", "1W", "1M", "3M", "ALL"].map((p) => (
              <div key={p} className="h-8 w-14 bg-gray-800 rounded-full" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error || data.length === 0) {
    return (
      <div className="mb-12 p-8 rounded-xl bg-card-bg border border-card-border text-center">
        <p className="text-gray-400">
          Portfolio chart data is currently unavailable. Check back shortly.
        </p>
      </div>
    );
  }

  // Use a fixed viewBox; SVG scales responsively
  const VB_W = 800;
  const VB_H = 300;
  const { linePath, areaPath, points } = buildPath(VB_W, VB_H);

  const hoverPoint =
    hoverIndex !== null && points[hoverIndex] ? points[hoverIndex] : null;

  return (
    <div className="mb-12 p-6 md:p-8 rounded-xl bg-card-bg border border-card-border">
      {/* Value display */}
      <div className="mb-1">
        <p className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
          ${fmt(displayValue)}
        </p>
        <div className="flex items-center gap-2 mt-1">
          <span
            className="text-sm font-semibold"
            style={{ color: gainLoss >= 0 ? "#2ECC71" : "#E74C3C" }}
          >
            {gainLoss >= 0 ? "+" : ""}${fmt(gainLoss)} ({gainLossPct >= 0 ? "+" : ""}
            {gainLossPct.toFixed(2)}%)
          </span>
          {displayDate ? (
            <span className="text-xs text-gray-500">{displayDate}</span>
          ) : (
            <span className="text-xs text-gray-500">
              Since {formatDate(data[0].date)}
            </span>
          )}
        </div>
      </div>

      {/* Chart */}
      <div className="mt-4 -mx-2 md:-mx-4">
        <svg
          ref={svgRef}
          viewBox={`0 0 ${VB_W} ${VB_H}`}
          className="w-full cursor-crosshair"
          preserveAspectRatio="none"
          style={{ height: "clamp(200px, 40vw, 320px)" }}
          onPointerMove={handlePointerMove}
          onPointerLeave={handlePointerLeave}
        >
          <defs>
            <linearGradient id="greenGradient" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0%" stopColor="#2ECC71" stopOpacity="0.25" />
              <stop offset="100%" stopColor="#2ECC71" stopOpacity="0" />
            </linearGradient>
            <linearGradient id="redGradient" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0%" stopColor="#E74C3C" stopOpacity="0.25" />
              <stop offset="100%" stopColor="#E74C3C" stopOpacity="0" />
            </linearGradient>
          </defs>

          {/* Area fill */}
          <path d={areaPath} fill={`url(#${gradientId})`} />

          {/* Line */}
          <path
            d={linePath}
            fill="none"
            stroke={accentColor}
            strokeWidth="2.5"
            strokeLinejoin="round"
            strokeLinecap="round"
            vectorEffect="non-scaling-stroke"
          />

          {/* Hover crosshair */}
          {hoverPoint && (
            <>
              <line
                x1={hoverPoint.x}
                y1={0}
                x2={hoverPoint.x}
                y2={VB_H}
                stroke="rgba(255,255,255,0.2)"
                strokeWidth="1"
                vectorEffect="non-scaling-stroke"
                strokeDasharray="4 3"
              />
              <circle
                cx={hoverPoint.x}
                cy={hoverPoint.y}
                r="5"
                fill={accentColor}
                stroke="#0a0a0a"
                strokeWidth="2"
                vectorEffect="non-scaling-stroke"
              />
            </>
          )}
        </svg>
      </div>

      {/* Period buttons */}
      <div className="flex justify-center gap-2 mt-4">
        {(["1W", "1M", "3M", "ALL"] as Period[]).map((p) => (
          <button
            key={p}
            onClick={() => {
              setPeriod(p);
              setHoverIndex(null);
              if (p === "1D") fetchHistory("1D");
              else if (period === "1D") fetchHistory("ALL"); // switching back from 1D
            }}
            className={`px-4 py-1.5 text-xs font-semibold rounded-full transition-all duration-200 ${
              period === p
                ? "text-white"
                : "text-gray-500 hover:text-gray-300 hover:bg-gray-800/50"
            }`}
            style={
              period === p
                ? { backgroundColor: accentColor + "22", color: accentColor }
                : undefined
            }
          >
            {p}
          </button>
        ))}
      </div>
    </div>
  );
}
