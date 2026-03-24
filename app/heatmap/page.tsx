"use client";

import { useEffect, useState, useCallback, useMemo } from "react";
import type { StockData } from "../api/stocks/route";

const REFRESH_INTERVAL = 5 * 60 * 1000; // 5 minutes

function getChangeColor(pct: number): string {
  if (pct > 3) return "#00C853";
  if (pct > 1) return "#2ECC71";
  if (pct > 0) return "#81C784";
  if (pct > -1) return "#E57373";
  if (pct > -3) return "#E74C3C";
  return "#C62828";
}

function getTextColor(pct: number): string {
  if (pct > 0 && pct <= 1) return "#1a1a1a";
  if (pct <= 0 && pct > -1) return "#1a1a1a";
  return "#ffffff";
}

function formatMarketCap(cap: number): string {
  if (cap >= 1e12) return `$${(cap / 1e12).toFixed(2)}T`;
  if (cap >= 1e9) return `$${(cap / 1e9).toFixed(1)}B`;
  if (cap >= 1e6) return `$${(cap / 1e6).toFixed(0)}M`;
  return `$${cap.toLocaleString()}`;
}

interface SectorGroup {
  sector: string;
  stocks: StockData[];
  totalCap: number;
}

export default function HeatmapPage() {
  const [stocks, setStocks] = useState<StockData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);
  const [hoveredStock, setHoveredStock] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    try {
      const res = await fetch("/api/stocks");
      if (!res.ok) throw new Error("Failed to fetch stock data");
      const json = await res.json();
      setStocks(json.stocks);
      setLastUpdated(new Date(json.timestamp));
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load data");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, REFRESH_INTERVAL);
    return () => clearInterval(interval);
  }, [fetchData]);

  const sectors: SectorGroup[] = useMemo(() => {
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

  const globalMaxCap = useMemo(
    () => Math.max(...stocks.map((s) => s.marketCap), 1),
    [stocks]
  );

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block w-8 h-8 border-2 border-accent-green border-t-transparent rounded-full animate-spin mb-4" />
          <p className="text-gray-400">Loading market data...</p>
        </div>
      </div>
    );
  }

  if (error && stocks.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-accent-red text-lg mb-2">
            Unable to load market data
          </p>
          <p className="text-gray-400 mb-4">{error}</p>
          <button
            onClick={fetchData}
            className="px-4 py-2 bg-accent-green/20 text-accent-green rounded-lg hover:bg-accent-green/30 transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 sm:py-12">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl sm:text-4xl font-bold mb-2">
          <span className="gradient-text">S&P 500</span>{" "}
          <span className="text-gray-300">Market Heatmap</span>
        </h1>
        <p className="text-gray-400 max-w-2xl">
          Top 50 stocks by market cap, grouped by sector. Box size reflects
          market capitalization. Colors show daily price change.
        </p>
        <div className="flex flex-wrap items-center gap-4 mt-4">
          {/* Color legend */}
          <div className="flex items-center gap-1 text-xs text-gray-400">
            <span
              className="inline-block w-4 h-3 rounded-sm"
              style={{ background: "#C62828" }}
            />
            <span>&lt;-3%</span>
            <span
              className="inline-block w-4 h-3 rounded-sm"
              style={{ background: "#E74C3C" }}
            />
            <span>-3 to -1%</span>
            <span
              className="inline-block w-4 h-3 rounded-sm"
              style={{ background: "#E57373" }}
            />
            <span>-1 to 0%</span>
            <span
              className="inline-block w-4 h-3 rounded-sm"
              style={{ background: "#81C784" }}
            />
            <span>0 to +1%</span>
            <span
              className="inline-block w-4 h-3 rounded-sm"
              style={{ background: "#2ECC71" }}
            />
            <span>+1 to +3%</span>
            <span
              className="inline-block w-4 h-3 rounded-sm"
              style={{ background: "#00C853" }}
            />
            <span>&gt;+3%</span>
          </div>
          {lastUpdated && (
            <span className="text-xs text-gray-500 ml-auto">
              Updated{" "}
              {lastUpdated.toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </span>
          )}
        </div>
      </div>

      {/* Heatmap grid */}
      <div className="space-y-6">
        {sectors.map((group) => (
          <div key={group.sector}>
            <h2 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-2">
              {group.sector}
            </h2>
            <div className="flex flex-wrap gap-1.5">
              {group.stocks.map((stock) => {
                const sizeRatio = stock.marketCap / globalMaxCap;
                // Scale from min 64px to max 200px on desktop
                const minSize = 64;
                const maxSize = 200;
                const boxSize = Math.round(
                  minSize + Math.sqrt(sizeRatio) * (maxSize - minSize)
                );
                const bgColor = getChangeColor(stock.changePercent);
                const txtColor = getTextColor(stock.changePercent);
                const isHovered = hoveredStock === stock.symbol;

                return (
                  <div
                    key={stock.symbol}
                    className="relative cursor-default transition-all duration-150 rounded-md overflow-hidden flex-shrink-0"
                    style={{
                      width: `${boxSize}px`,
                      height: `${boxSize}px`,
                      minWidth: "56px",
                      minHeight: "56px",
                      backgroundColor: bgColor,
                      transform: isHovered ? "scale(1.05)" : "scale(1)",
                      zIndex: isHovered ? 10 : 1,
                      boxShadow: isHovered
                        ? "0 8px 24px rgba(0,0,0,0.5)"
                        : "none",
                    }}
                    onMouseEnter={() => setHoveredStock(stock.symbol)}
                    onMouseLeave={() => setHoveredStock(null)}
                  >
                    <div
                      className="w-full h-full flex flex-col items-center justify-center p-1"
                      style={{ color: txtColor }}
                    >
                      <span
                        className={`font-bold leading-tight ${
                          boxSize > 100 ? "text-base" : "text-xs"
                        }`}
                      >
                        {stock.symbol}
                      </span>
                      <span
                        className={`font-medium leading-tight ${
                          boxSize > 100 ? "text-sm" : "text-[10px]"
                        }`}
                      >
                        {stock.changePercent >= 0 ? "+" : ""}
                        {stock.changePercent.toFixed(2)}%
                      </span>
                    </div>

                    {/* Hover tooltip */}
                    {isHovered && (
                      <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 z-50 pointer-events-none">
                        <div className="bg-[#1a1a1a] border border-card-border rounded-lg px-3 py-2 shadow-xl whitespace-nowrap text-sm">
                          <p className="font-bold text-white">{stock.name}</p>
                          <p className="text-gray-400">
                            ${stock.price.toFixed(2)}
                          </p>
                          <p
                            style={{
                              color:
                                stock.changePercent >= 0
                                  ? "#2ECC71"
                                  : "#E74C3C",
                            }}
                          >
                            {stock.changePercent >= 0 ? "+" : ""}
                            {stock.changePercent.toFixed(2)}%
                          </p>
                          <p className="text-gray-500 text-xs">
                            Cap: {formatMarketCap(stock.marketCap)}
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Top Gainers & Losers */}
      {stocks.length > 0 && (() => {
        const sorted = [...stocks].sort((a, b) => b.changePercent - a.changePercent);
        const gainers = sorted.filter(s => s.changePercent > 0).slice(0, 5);
        const losers = sorted.filter(s => s.changePercent < 0).reverse().slice(0, 5);
        return (
          <div className="grid md:grid-cols-2 gap-6 mt-10">
            <div className="p-6 rounded-xl bg-card-bg border border-card-border">
              <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <span className="text-accent-green">▲</span> Top Gainers
              </h2>
              <div className="space-y-3">
                {gainers.map((s) => (
                  <div key={`gain-${s.symbol}`} className="flex items-center justify-between">
                    <div>
                      <span className="font-bold text-white">{s.symbol}</span>
                      <span className="text-gray-500 text-xs ml-2">{s.name.length > 20 ? s.name.slice(0, 20) + '...' : s.name}</span>
                    </div>
                    <div className="text-right">
                      <span className="text-accent-green font-mono font-semibold">+{s.changePercent.toFixed(2)}%</span>
                      <span className="text-gray-500 text-xs ml-2">${s.price.toFixed(2)}</span>
                    </div>
                  </div>
                ))}
                {gainers.length === 0 && <p className="text-gray-500 text-sm">No gainers today</p>}
              </div>
            </div>
            <div className="p-6 rounded-xl bg-card-bg border border-card-border">
              <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <span className="text-accent-red">▼</span> Top Losers
              </h2>
              <div className="space-y-3">
                {losers.map((s) => (
                  <div key={`lose-${s.symbol}`} className="flex items-center justify-between">
                    <div>
                      <span className="font-bold text-white">{s.symbol}</span>
                      <span className="text-gray-500 text-xs ml-2">{s.name.length > 20 ? s.name.slice(0, 20) + '...' : s.name}</span>
                    </div>
                    <div className="text-right">
                      <span className="text-accent-red font-mono font-semibold">{s.changePercent.toFixed(2)}%</span>
                      <span className="text-gray-500 text-xs ml-2">${s.price.toFixed(2)}</span>
                    </div>
                  </div>
                ))}
                {losers.length === 0 && <p className="text-gray-500 text-sm">No losers today</p>}
              </div>
            </div>
          </div>
        );
      })()}

      {/* Mobile-friendly list view for very small screens */}
      {stocks.length > 0 && (
        <div className="mt-10 sm:hidden">
          <h2 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-3">
            All Stocks
          </h2>
          <div className="space-y-1">
            {stocks
              .sort((a, b) => b.marketCap - a.marketCap)
              .map((stock) => (
                <div
                  key={`list-${stock.symbol}`}
                  className="flex items-center justify-between px-3 py-2 rounded-lg"
                  style={{
                    backgroundColor: getChangeColor(stock.changePercent) + "22",
                    borderLeft: `3px solid ${getChangeColor(stock.changePercent)}`,
                  }}
                >
                  <div>
                    <span className="font-bold text-sm text-white">
                      {stock.symbol}
                    </span>
                    <span className="text-gray-400 text-xs ml-2">
                      {stock.name}
                    </span>
                  </div>
                  <div className="text-right">
                    <span
                      className="font-medium text-sm"
                      style={{
                        color:
                          stock.changePercent >= 0 ? "#2ECC71" : "#E74C3C",
                      }}
                    >
                      {stock.changePercent >= 0 ? "+" : ""}
                      {stock.changePercent.toFixed(2)}%
                    </span>
                    <span className="text-gray-500 text-xs ml-2">
                      ${stock.price.toFixed(2)}
                    </span>
                  </div>
                </div>
              ))}
          </div>
        </div>
      )}
    </div>
  );
}
