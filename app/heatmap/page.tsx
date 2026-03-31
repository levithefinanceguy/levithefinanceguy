"use client";

import { useEffect, useState, useCallback, useMemo, useRef } from "react";
import type { StockData, IndexData } from "../api/stocks/route";

const FINNHUB_KEY = "d7586opr01qk56kbpvm0d7586opr01qk56kbpvmg";

function getChangeColor(pct: number): string {
  if (pct > 3) return "#00C853";
  if (pct > 2) return "#1B9E45";
  if (pct > 1) return "#2E7D32";
  if (pct > 0.5) return "#1B5E20";
  if (pct > 0) return "#1A3A1A";
  if (pct === 0) return "#2a2a2a";
  if (pct > -0.5) return "#3A1A1A";
  if (pct > -1) return "#5E2020";
  if (pct > -2) return "#7D2E2E";
  if (pct > -3) return "#B71C1C";
  return "#D32F2F";
}

interface TreemapRect {
  x: number;
  y: number;
  w: number;
  h: number;
  data: StockData;
}

interface SectorRect {
  sector: string;
  x: number;
  y: number;
  w: number;
  h: number;
  children: TreemapRect[];
}

function squarify(
  items: { value: number; data: StockData }[],
  x: number, y: number, w: number, h: number
): TreemapRect[] {
  if (items.length === 0) return [];
  if (items.length === 1) return [{ x, y, w, h, data: items[0].data }];

  const total = items.reduce((s, i) => s + i.value, 0);
  if (total === 0) return [];

  const sorted = [...items].sort((a, b) => b.value - a.value);
  const results: TreemapRect[] = [];
  let remaining = [...sorted];
  let cx = x, cy = y, cw = w, ch = h;

  while (remaining.length > 0) {
    const remTotal = remaining.reduce((s, i) => s + i.value, 0);
    const isWide = cw >= ch;
    let row: typeof remaining = [];
    let bestAspect = Infinity;

    for (let i = 1; i <= remaining.length; i++) {
      const candidate = remaining.slice(0, i);
      const rowTotal = candidate.reduce((s, item) => s + item.value, 0);
      const rowFraction = rowTotal / remTotal;
      const rowSize = isWide ? cw * rowFraction : ch * rowFraction;
      const crossSize = isWide ? ch : cw;
      let worstAspect = 0;
      for (const item of candidate) {
        const itemFraction = item.value / rowTotal;
        const itemSize = crossSize * itemFraction;
        const aspect = Math.max(rowSize / itemSize, itemSize / rowSize);
        worstAspect = Math.max(worstAspect, aspect);
      }
      if (worstAspect <= bestAspect) {
        bestAspect = worstAspect;
        row = candidate;
      } else break;
    }

    if (row.length === 0) row = [remaining[0]];
    const rowTotal = row.reduce((s, item) => s + item.value, 0);
    const rowFraction = rowTotal / remTotal;

    if (isWide) {
      const rowWidth = cw * rowFraction;
      let ry = cy;
      for (const item of row) {
        const itemHeight = ch * (item.value / rowTotal);
        results.push({ x: cx, y: ry, w: rowWidth, h: itemHeight, data: item.data });
        ry += itemHeight;
      }
      cx += rowWidth; cw -= rowWidth;
    } else {
      const rowHeight = ch * rowFraction;
      let rx = cx;
      for (const item of row) {
        const itemWidth = cw * (item.value / rowTotal);
        results.push({ x: rx, y: cy, w: itemWidth, h: rowHeight, data: item.data });
        rx += itemWidth;
      }
      cy += rowHeight; ch -= rowHeight;
    }
    remaining = remaining.slice(row.length);
  }
  return results;
}

function layoutSectors(
  sectors: { sector: string; stocks: StockData[]; totalCap: number }[],
  width: number, height: number
): SectorRect[] {
  const totalCap = sectors.reduce((s, sec) => s + sec.totalCap, 0);
  if (totalCap === 0) return [];

  const sectorItems = [...sectors].sort((a, b) => b.totalCap - a.totalCap);
  const sectorRects: SectorRect[] = [];
  let remaining = [...sectorItems];
  let cx = 0, cy = 0, cw = width, ch = height;

  while (remaining.length > 0) {
    const remTotal = remaining.reduce((s, i) => s + i.totalCap, 0);
    const isWide = cw >= ch;
    let row = [remaining[0]];
    let bestAspect = Infinity;

    for (let i = 1; i <= Math.min(remaining.length, 5); i++) {
      const candidate = remaining.slice(0, i);
      const rowTotal = candidate.reduce((s, item) => s + item.totalCap, 0);
      const rowFraction = rowTotal / remTotal;
      const rowSize = isWide ? cw * rowFraction : ch * rowFraction;
      const crossSize = isWide ? ch : cw;
      let worstAspect = 0;
      for (const item of candidate) {
        const itemFraction = item.totalCap / rowTotal;
        const itemSize = crossSize * itemFraction;
        const aspect = Math.max(rowSize / itemSize, itemSize / rowSize);
        worstAspect = Math.max(worstAspect, aspect);
      }
      if (worstAspect <= bestAspect) { bestAspect = worstAspect; row = candidate; }
      else break;
    }

    const rowTotal = row.reduce((s, item) => s + item.totalCap, 0);
    const rowFraction = rowTotal / remTotal;

    if (isWide) {
      const rowWidth = cw * rowFraction;
      let ry = cy;
      for (const item of row) {
        const itemHeight = ch * (item.totalCap / rowTotal);
        const stockItems = item.stocks.map((s) => ({ value: s.marketCap, data: s }));
        const children = squarify(stockItems, cx + 1, ry + 14, rowWidth - 2, itemHeight - 15);
        sectorRects.push({ sector: item.sector, x: cx, y: ry, w: rowWidth, h: itemHeight, children });
        ry += itemHeight;
      }
      cx += rowWidth; cw -= rowWidth;
    } else {
      const rowHeight = ch * rowFraction;
      let rx = cx;
      for (const item of row) {
        const itemWidth = cw * (item.totalCap / rowTotal);
        const stockItems = item.stocks.map((s) => ({ value: s.marketCap, data: s }));
        const children = squarify(stockItems, rx + 1, cy + 14, itemWidth - 2, rowHeight - 15);
        sectorRects.push({ sector: item.sector, x: rx, y: cy, w: itemWidth, h: rowHeight, children });
        rx += itemWidth;
      }
      cy += rowHeight; ch -= rowHeight;
    }
    remaining = remaining.slice(row.length);
  }
  return sectorRects;
}

export default function HeatmapPage() {
  const [stocks, setStocks] = useState<StockData[]>([]);
  const [indices, setIndices] = useState<IndexData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);
  const [hoveredStock, setHoveredStock] = useState<StockData | null>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerWidth, setContainerWidth] = useState(1200);
  const [elapsed, setElapsed] = useState(0);
  const [wsConnected, setWsConnected] = useState(false);
  const stocksRef = useRef<StockData[]>([]);
  const wsRef = useRef<WebSocket | null>(null);

  // Initial fetch via REST API
  const fetchData = useCallback(async () => {
    try {
      const res = await fetch("/api/stocks");
      if (!res.ok) throw new Error("Failed to fetch stock data");
      const json = await res.json();
      setStocks(json.stocks);
      stocksRef.current = json.stocks;
      setIndices(json.indices || []);
      setLastUpdated(new Date(json.timestamp));
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load data");
    } finally {
      setLoading(false);
    }
  }, []);

  // Websocket for real-time updates
  useEffect(() => {
    fetchData().then(() => {
      const ws = new WebSocket(`wss://ws.finnhub.io?token=${FINNHUB_KEY}`);
      wsRef.current = ws;

      ws.onopen = () => {
        setWsConnected(true);
        // Subscribe to all tickers
        const current = stocksRef.current;
        for (const stock of current) {
          const symbol = stock.symbol.replace("-", ".");
          ws.send(JSON.stringify({ type: "subscribe", symbol }));
        }
      };

      ws.onmessage = (event) => {
        const msg = JSON.parse(event.data);
        if (msg.type !== "trade" || !msg.data) return;

        // Group trades by symbol, take latest price
        const updates = new Map<string, number>();
        for (const trade of msg.data) {
          updates.set(trade.s, trade.p);
        }

        if (updates.size === 0) return;

        setStocks((prev) => {
          let changed = false;
          const next = prev.map((stock) => {
            const finnhubSymbol = stock.symbol.replace("-", ".");
            const newPrice = updates.get(finnhubSymbol);
            if (newPrice && newPrice !== stock.price) {
              changed = true;
              // Recalculate change percent from previous close
              const prevClose = stock.price / (1 + stock.changePercent / 100);
              const newChangePct = ((newPrice - prevClose) / prevClose) * 100;
              return { ...stock, price: newPrice, changePercent: newChangePct };
            }
            return stock;
          });
          if (changed) {
            stocksRef.current = next;
            setLastUpdated(new Date());
          }
          return changed ? next : prev;
        });
      };

      ws.onclose = () => setWsConnected(false);
      ws.onerror = () => setWsConnected(false);

      return () => {
        ws.close();
        wsRef.current = null;
      };
    });
  }, [fetchData]);

  useEffect(() => {
    const timer = setInterval(() => {
      if (lastUpdated) {
        setElapsed(Math.floor((Date.now() - lastUpdated.getTime()) / 1000));
      }
    }, 1000);
    return () => clearInterval(timer);
  }, [lastUpdated]);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) setContainerWidth(entry.contentRect.width);
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const sectors = useMemo(() => {
    const grouped = new Map<string, StockData[]>();
    for (const stock of stocks) {
      const existing = grouped.get(stock.sector) ?? [];
      existing.push(stock);
      grouped.set(stock.sector, existing);
    }
    return Array.from(grouped.entries())
      .map(([sector, sectorStocks]) => ({
        sector,
        stocks: sectorStocks.sort((a, b) => b.marketCap - a.marketCap),
        totalCap: sectorStocks.reduce((sum, s) => sum + s.marketCap, 0),
      }))
      .sort((a, b) => b.totalCap - a.totalCap);
  }, [stocks]);

  const mapHeight = Math.min(600, Math.max(400, containerWidth * 0.35));
  const sectorLayout = useMemo(
    () => layoutSectors(sectors, containerWidth, mapHeight),
    [sectors, containerWidth, mapHeight]
  );

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block w-8 h-8 border-2 border-green-400 border-t-transparent rounded-full animate-spin mb-4" />
          <p className="text-gray-400">Loading market data...</p>
        </div>
      </div>
    );
  }

  if (error && stocks.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-500 text-lg mb-2">Unable to load market data</p>
          <p className="text-gray-400 mb-4">{error}</p>
          <button onClick={fetchData} className="px-4 py-2 bg-green-500/20 text-green-400 rounded-lg hover:bg-green-500/30 transition-colors">Retry</button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 sm:py-12">
      <div className="mb-6">
        <h1 className="text-3xl sm:text-4xl font-bold mb-2">
          <span className="gradient-text">S&P 500</span>{" "}
          <span className="text-gray-300">Market Heatmap</span>
        </h1>
        <p className="text-gray-400 max-w-2xl mb-4">
          Real-time market data. Box size reflects market cap. Colors show daily price change.
        </p>

        {indices.length > 0 && (() => {
          // Convert ETF proxy prices to approximate index values
          const indexMultipliers: Record<string, number> = {
            "^GSPC": 10.34,  // SPY → S&P 500
            "^DJI": 106.8,   // DIA → Dow Jones
            "^IXIC": 36.7,   // QQQ → Nasdaq (approximate)
          };
          return (
            <div className="grid grid-cols-3 gap-3 mb-4">
              {indices.map((idx) => {
                const mult = indexMultipliers[idx.symbol] || 1;
                const displayPrice = idx.price * mult;
                const displayChange = idx.change * mult;
                return (
                  <div key={idx.symbol} className="p-3 rounded-xl bg-card-bg border border-card-border">
                    <p className="text-xs text-gray-500">{idx.name}</p>
                    <p className="text-lg font-bold">{displayPrice.toLocaleString("en-US", { minimumFractionDigits: 0, maximumFractionDigits: 0 })}</p>
                    <p className={`text-sm font-mono ${idx.changePercent >= 0 ? "text-green-400" : "text-red-400"}`}>
                      {idx.changePercent >= 0 ? "+" : ""}{displayChange.toFixed(0)} ({idx.changePercent >= 0 ? "+" : ""}{idx.changePercent.toFixed(2)}%)
                    </p>
                  </div>
                );
              })}
            </div>
          );
        })()}

        <div className="flex items-center gap-2 text-xs text-gray-500">
          <div className="flex items-center">
            <span className="text-[9px] mr-1">-3%</span>
            {["#D32F2F","#B71C1C","#7D2E2E","#5E2020","#3A1A1A","#2a2a2a","#1A3A1A","#1B5E20","#2E7D32","#1B9E45","#00C853"].map((c, i) => (
              <span key={i} className="inline-block w-4 h-3" style={{ background: c }} />
            ))}
            <span className="text-[9px] ml-1">+3%</span>
          </div>
          <div className="ml-auto flex items-center gap-2">
            <span className={`inline-block w-2 h-2 rounded-full ${wsConnected ? "bg-green-400 animate-pulse" : "bg-gray-500"}`} />
            <span>{wsConnected ? "Live" : "Loading..."}</span>
            {lastUpdated && (
              <span className="text-gray-600">
                {elapsed < 5 ? "just now" : elapsed < 60 ? `${elapsed}s ago` : `${Math.floor(elapsed / 60)}m ago`}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Treemap */}
      <div
        ref={containerRef}
        className="relative rounded-lg overflow-hidden border border-card-border"
        style={{ height: `${mapHeight}px` }}
        onMouseMove={(e) => setMousePos({ x: e.clientX, y: e.clientY })}
        onMouseLeave={() => setHoveredStock(null)}
      >
        {sectorLayout.map((sec) => (
          <div key={sec.sector}>
            <div
              className="absolute text-[9px] font-bold text-gray-400 uppercase tracking-wider px-1 truncate pointer-events-none z-10"
              style={{ left: `${sec.x}px`, top: `${sec.y}px`, width: `${sec.w}px`, height: "14px", lineHeight: "14px", backgroundColor: "#111" }}
            >
              {sec.sector}
            </div>
            {sec.children.map((rect) => {
              const isSmall = rect.w < 60 || rect.h < 40;
              const isTiny = rect.w < 35 || rect.h < 25;
              return (
                <div
                  key={rect.data.symbol}
                  className="absolute border border-black/30 flex flex-col items-center justify-center overflow-hidden cursor-pointer"
                  style={{
                    left: `${rect.x}px`, top: `${rect.y}px`,
                    width: `${rect.w}px`, height: `${rect.h}px`,
                    backgroundColor: getChangeColor(rect.data.changePercent),
                    opacity: hoveredStock && hoveredStock.symbol !== rect.data.symbol ? 0.6 : 1,
                    transition: "background-color 0.5s ease, opacity 0.15s ease",
                  }}
                  onMouseEnter={() => setHoveredStock(rect.data)}
                >
                  {!isTiny && (
                    <>
                      <span className={`font-bold text-white leading-none ${isSmall ? "text-[10px]" : "text-sm"}`}>
                        {rect.data.symbol}
                      </span>
                      <span className={`text-white/80 leading-none mt-0.5 ${isSmall ? "text-[8px]" : "text-xs"}`}>
                        {rect.data.changePercent >= 0 ? "+" : ""}{rect.data.changePercent.toFixed(2)}%
                      </span>
                    </>
                  )}
                </div>
              );
            })}
          </div>
        ))}

        {hoveredStock && (
          <div className="fixed z-50 pointer-events-none" style={{ left: mousePos.x + 12, top: mousePos.y - 60 }}>
            <div className="bg-[#1a1a1a] border border-gray-700 rounded-lg px-3 py-2 shadow-2xl text-sm">
              <p className="font-bold text-white">{hoveredStock.name}</p>
              <p className="text-gray-400">${hoveredStock.price.toFixed(2)}</p>
              <p className={hoveredStock.changePercent >= 0 ? "text-green-400" : "text-red-400"}>
                {hoveredStock.changePercent >= 0 ? "+" : ""}{hoveredStock.changePercent.toFixed(2)}%
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Top Gainers & Losers */}
      {stocks.length > 0 && (() => {
        const sorted = [...stocks].sort((a, b) => b.changePercent - a.changePercent);
        const gainers = sorted.filter(s => s.changePercent > 0).slice(0, 5);
        const losers = sorted.filter(s => s.changePercent < 0).reverse().slice(0, 5);
        return (
          <div className="grid md:grid-cols-2 gap-6 mt-8">
            <div className="p-6 rounded-xl bg-card-bg border border-card-border">
              <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <span className="text-green-400">▲</span> Top Gainers
              </h2>
              <div className="space-y-3">
                {gainers.map((s) => (
                  <div key={`gain-${s.symbol}`} className="flex items-center justify-between">
                    <div><span className="font-bold text-white">{s.symbol}</span><span className="text-gray-500 text-xs ml-2">{s.name.length > 20 ? s.name.slice(0, 20) + "..." : s.name}</span></div>
                    <div className="text-right"><span className="text-green-400 font-mono font-semibold">+{s.changePercent.toFixed(2)}%</span><span className="text-gray-500 text-xs ml-2">${s.price.toFixed(2)}</span></div>
                  </div>
                ))}
                {gainers.length === 0 && <p className="text-gray-500 text-sm">No gainers today</p>}
              </div>
            </div>
            <div className="p-6 rounded-xl bg-card-bg border border-card-border">
              <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <span className="text-red-400">▼</span> Top Losers
              </h2>
              <div className="space-y-3">
                {losers.map((s) => (
                  <div key={`lose-${s.symbol}`} className="flex items-center justify-between">
                    <div><span className="font-bold text-white">{s.symbol}</span><span className="text-gray-500 text-xs ml-2">{s.name.length > 20 ? s.name.slice(0, 20) + "..." : s.name}</span></div>
                    <div className="text-right"><span className="text-red-400 font-mono font-semibold">{s.changePercent.toFixed(2)}%</span><span className="text-gray-500 text-xs ml-2">${s.price.toFixed(2)}</span></div>
                  </div>
                ))}
                {losers.length === 0 && <p className="text-gray-500 text-sm">No losers today</p>}
              </div>
            </div>
          </div>
        );
      })()}
    </div>
  );
}
