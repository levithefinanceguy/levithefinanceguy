import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

interface StockDef {
  symbol: string;
  name: string;
  sector: string;
}

const STOCKS: StockDef[] = [
  // Technology
  { symbol: "AAPL", name: "Apple Inc.", sector: "Technology" },
  { symbol: "MSFT", name: "Microsoft Corp.", sector: "Technology" },
  { symbol: "GOOGL", name: "Alphabet Inc.", sector: "Technology" },
  { symbol: "AMZN", name: "Amazon.com Inc.", sector: "Technology" },
  { symbol: "NVDA", name: "NVIDIA Corp.", sector: "Technology" },
  { symbol: "META", name: "Meta Platforms Inc.", sector: "Technology" },
  { symbol: "TSLA", name: "Tesla Inc.", sector: "Technology" },
  { symbol: "AVGO", name: "Broadcom Inc.", sector: "Technology" },
  { symbol: "ORCL", name: "Oracle Corp.", sector: "Technology" },
  { symbol: "CRM", name: "Salesforce Inc.", sector: "Technology" },
  { symbol: "AMD", name: "Advanced Micro Devices", sector: "Technology" },
  { symbol: "ADBE", name: "Adobe Inc.", sector: "Technology" },
  { symbol: "INTC", name: "Intel Corp.", sector: "Technology" },
  { symbol: "CSCO", name: "Cisco Systems Inc.", sector: "Technology" },
  { symbol: "NFLX", name: "Netflix Inc.", sector: "Technology" },
  // Healthcare
  { symbol: "UNH", name: "UnitedHealth Group", sector: "Healthcare" },
  { symbol: "JNJ", name: "Johnson & Johnson", sector: "Healthcare" },
  { symbol: "LLY", name: "Eli Lilly & Co.", sector: "Healthcare" },
  { symbol: "ABBV", name: "AbbVie Inc.", sector: "Healthcare" },
  { symbol: "MRK", name: "Merck & Co.", sector: "Healthcare" },
  { symbol: "PFE", name: "Pfizer Inc.", sector: "Healthcare" },
  { symbol: "TMO", name: "Thermo Fisher Scientific", sector: "Healthcare" },
  { symbol: "ABT", name: "Abbott Laboratories", sector: "Healthcare" },
  // Financial
  { symbol: "BRK-B", name: "Berkshire Hathaway", sector: "Financial" },
  { symbol: "JPM", name: "JPMorgan Chase & Co.", sector: "Financial" },
  { symbol: "V", name: "Visa Inc.", sector: "Financial" },
  { symbol: "MA", name: "Mastercard Inc.", sector: "Financial" },
  { symbol: "BAC", name: "Bank of America Corp.", sector: "Financial" },
  { symbol: "WFC", name: "Wells Fargo & Co.", sector: "Financial" },
  { symbol: "GS", name: "Goldman Sachs Group", sector: "Financial" },
  { symbol: "MS", name: "Morgan Stanley", sector: "Financial" },
  // Consumer
  { symbol: "WMT", name: "Walmart Inc.", sector: "Consumer" },
  { symbol: "PG", name: "Procter & Gamble Co.", sector: "Consumer" },
  { symbol: "KO", name: "Coca-Cola Co.", sector: "Consumer" },
  { symbol: "PEP", name: "PepsiCo Inc.", sector: "Consumer" },
  { symbol: "COST", name: "Costco Wholesale Corp.", sector: "Consumer" },
  { symbol: "MCD", name: "McDonald's Corp.", sector: "Consumer" },
  { symbol: "HD", name: "Home Depot Inc.", sector: "Consumer" },
  { symbol: "NKE", name: "Nike Inc.", sector: "Consumer" },
  // Energy
  { symbol: "XOM", name: "Exxon Mobil Corp.", sector: "Energy" },
  { symbol: "CVX", name: "Chevron Corp.", sector: "Energy" },
  { symbol: "COP", name: "ConocoPhillips", sector: "Energy" },
  // Industrial
  { symbol: "CAT", name: "Caterpillar Inc.", sector: "Industrial" },
  { symbol: "BA", name: "Boeing Co.", sector: "Industrial" },
  { symbol: "GE", name: "GE Aerospace", sector: "Industrial" },
  { symbol: "UPS", name: "United Parcel Service", sector: "Industrial" },
  { symbol: "HON", name: "Honeywell International", sector: "Industrial" },
  // Communication
  { symbol: "DIS", name: "Walt Disney Co.", sector: "Communication" },
  { symbol: "CMCSA", name: "Comcast Corp.", sector: "Communication" },
  { symbol: "VZ", name: "Verizon Communications", sector: "Communication" },
  { symbol: "T", name: "AT&T Inc.", sector: "Communication" },
];

const STOCK_MAP = new Map(STOCKS.map((s) => [s.symbol, s]));

export interface StockData {
  symbol: string;
  name: string;
  sector: string;
  price: number;
  changePercent: number;
  marketCap: number;
}

let cache: { data: StockData[]; timestamp: number } | null = null;
const CACHE_TTL = 5 * 60 * 1000; // 5 minutes

let crumbCache: { crumb: string; cookie: string; timestamp: number } | null =
  null;
const CRUMB_TTL = 30 * 60 * 1000; // 30 minutes

async function getCrumb(): Promise<{ crumb: string; cookie: string }> {
  const now = Date.now();
  if (crumbCache && now - crumbCache.timestamp < CRUMB_TTL) {
    return { crumb: crumbCache.crumb, cookie: crumbCache.cookie };
  }

  // Step 1: Get consent cookie by visiting Yahoo Finance
  const consentRes = await fetch("https://fc.yahoo.com", {
    redirect: "manual",
    headers: {
      "User-Agent":
        "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
    },
  });

  const setCookies = consentRes.headers.getSetCookie?.() ?? [];
  const cookieStr = setCookies.map((c) => c.split(";")[0]).join("; ");

  // Step 2: Get crumb using the cookie
  const crumbRes = await fetch(
    "https://query2.finance.yahoo.com/v1/test/getcrumb",
    {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
        Cookie: cookieStr,
      },
    }
  );

  if (!crumbRes.ok) {
    throw new Error(`Failed to get crumb: ${crumbRes.status}`);
  }

  const crumb = await crumbRes.text();

  crumbCache = { crumb, cookie: cookieStr, timestamp: now };
  return { crumb, cookie: cookieStr };
}

async function fetchStockData(): Promise<StockData[]> {
  const now = Date.now();
  if (cache && now - cache.timestamp < CACHE_TTL) {
    return cache.data;
  }

  const symbols = STOCKS.map((s) => s.symbol).join(",");

  try {
    const { crumb, cookie } = await getCrumb();

    const url = `https://query2.finance.yahoo.com/v7/finance/quote?symbols=${encodeURIComponent(symbols)}&crumb=${encodeURIComponent(crumb)}`;

    const res = await fetch(url, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
        Cookie: cookie,
      },
    });

    if (!res.ok) {
      // Invalidate crumb cache on auth failure so next request gets a fresh crumb
      if (res.status === 401 || res.status === 403) {
        crumbCache = null;
      }
      throw new Error(`Yahoo Finance responded with ${res.status}`);
    }

    const json = await res.json();
    const quotes = json.quoteResponse?.result ?? [];

    const data: StockData[] = quotes
      .map(
        (q: {
          symbol: string;
          regularMarketPrice?: number;
          regularMarketChangePercent?: number;
          marketCap?: number;
        }) => {
          const def = STOCK_MAP.get(q.symbol);
          if (!def) return null;
          return {
            symbol: q.symbol,
            name: def.name,
            sector: def.sector,
            price: q.regularMarketPrice ?? 0,
            changePercent: q.regularMarketChangePercent ?? 0,
            marketCap: q.marketCap ?? 0,
          };
        }
      )
      .filter(Boolean) as StockData[];

    if (data.length > 0) {
      cache = { data, timestamp: now };
    }
    return data;
  } catch (error) {
    console.error("Failed to fetch from Yahoo Finance:", error);
    // Return cached data if available, even if stale
    if (cache) return cache.data;
    return [];
  }
}

export async function GET() {
  const data = await fetchStockData();

  return NextResponse.json(
    { stocks: data, timestamp: Date.now() },
    {
      headers: {
        "Cache-Control": "public, s-maxage=300, stale-while-revalidate=600",
      },
    }
  );
}
