import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

const FUNCTIONS_BASE = "https://us-central1-cheeseapphq.cloudfunctions.net";

interface HoldingDef {
  ticker: string;
  shares: number;
}

let holdingsCache: { data: HoldingDef[]; timestamp: number } | null = null;
const HOLDINGS_CACHE_TTL = 10 * 60 * 1000;

async function getHoldings(): Promise<HoldingDef[]> {
  const now = Date.now();
  if (holdingsCache && now - holdingsCache.timestamp < HOLDINGS_CACHE_TTL) {
    return holdingsCache.data;
  }
  try {
    const res = await fetch(`${FUNCTIONS_BASE}/getPortfolio`);
    if (!res.ok) throw new Error(`Cloud function returned ${res.status}`);
    const { holdings: raw } = await res.json();
    const holdings: HoldingDef[] = (raw || []).map((h: { ticker: string; shares: number }) => ({
      ticker: h.ticker, shares: h.shares,
    }));
    if (holdings.length > 0) holdingsCache = { data: holdings, timestamp: now };
    return holdings;
  } catch {
    return holdingsCache?.data ?? [];
  }
}

// Start date: Dec 16 2025
const START_EPOCH = Math.floor(new Date("2025-12-16").getTime() / 1000);

let cache: { data: { date: string; value: number }[]; timestamp: number } | null = null;
const CACHE_TTL = 60 * 60 * 1000; // 1 hour

const UA = "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36";

async function fetchTickerHistory(ticker: string): Promise<Map<string, number>> {
  const now = Math.floor(Date.now() / 1000);
  // Use Yahoo's v8 chart API without crumb (works for most tickers)
  const url = `https://query1.finance.yahoo.com/v8/finance/chart/${encodeURIComponent(ticker)}?period1=${START_EPOCH}&period2=${now}&interval=1d`;

  try {
    const res = await fetch(url, { headers: { "User-Agent": UA } });
    if (!res.ok) return new Map();

    const json = await res.json();
    const result = json.chart?.result?.[0];
    if (!result) return new Map();

    const timestamps = result.timestamp ?? [];
    const closes = result.indicators?.quote?.[0]?.close ?? [];

    const priceMap = new Map<string, number>();
    let lastClose = 0;

    for (let i = 0; i < timestamps.length; i++) {
      const d = new Date(timestamps[i] * 1000);
      const dateStr = d.toISOString().split("T")[0];
      const close = closes[i];
      if (close != null && !isNaN(close)) lastClose = close;
      if (lastClose > 0) priceMap.set(dateStr, lastClose);
    }
    return priceMap;
  } catch {
    return new Map();
  }
}

async function buildPortfolioHistory(): Promise<{ date: string; value: number }[]> {
  const now = Date.now();
  if (cache && now - cache.timestamp < CACHE_TTL) return cache.data;

  const HOLDINGS = await getHoldings();
  if (HOLDINGS.length === 0) return [];

  const results = await Promise.all(
    HOLDINGS.map(async (h) => ({
      ticker: h.ticker, shares: h.shares,
      prices: await fetchTickerHistory(h.ticker),
    }))
  );

  const allDates = new Set<string>();
  for (const r of results) for (const date of r.prices.keys()) allDates.add(date);

  const sortedDates = Array.from(allDates).sort();
  const history: { date: string; value: number }[] = [];
  const lastKnown: Record<string, number> = {};

  for (const date of sortedDates) {
    let totalValue = 0;
    let complete = true;
    for (const r of results) {
      const price = r.prices.get(date) ?? lastKnown[r.ticker];
      if (price != null) {
        lastKnown[r.ticker] = price;
        totalValue += price * r.shares;
      } else {
        complete = false;
      }
    }
    if (complete && totalValue > 0) {
      history.push({ date, value: Math.round(totalValue * 100) / 100 });
    }
  }

  if (history.length > 0) cache = { data: history, timestamp: now };
  return history;
}

export async function GET() {
  try {
    const data = await buildPortfolioHistory();
    return NextResponse.json(
      { history: data, timestamp: Date.now() },
      { headers: { "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=7200" } }
    );
  } catch (error) {
    console.error("Portfolio history error:", error);
    return NextResponse.json({ error: "Failed to fetch portfolio history", history: [] }, { status: 500 });
  }
}
