import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

const FINNHUB_KEY = process.env.FINNHUB_API_KEY || "d7586opr01qk56kbpvm0d7586opr01qk56kbpvmg";

interface StockDef {
  symbol: string;
  name: string;
  sector: string;
  approxCap: number; // billions
}

const STOCKS: StockDef[] = [
  // Technology
  { symbol: "AAPL", name: "Apple Inc.", sector: "Technology", approxCap: 3400 },
  { symbol: "MSFT", name: "Microsoft Corp.", sector: "Technology", approxCap: 3100 },
  { symbol: "GOOGL", name: "Alphabet Inc.", sector: "Technology", approxCap: 2100 },
  { symbol: "AMZN", name: "Amazon.com Inc.", sector: "Technology", approxCap: 2000 },
  { symbol: "NVDA", name: "NVIDIA Corp.", sector: "Technology", approxCap: 2800 },
  { symbol: "META", name: "Meta Platforms Inc.", sector: "Technology", approxCap: 1500 },
  { symbol: "TSLA", name: "Tesla Inc.", sector: "Technology", approxCap: 800 },
  { symbol: "AVGO", name: "Broadcom Inc.", sector: "Technology", approxCap: 800 },
  { symbol: "ORCL", name: "Oracle Corp.", sector: "Technology", approxCap: 400 },
  { symbol: "CRM", name: "Salesforce Inc.", sector: "Technology", approxCap: 270 },
  { symbol: "AMD", name: "Advanced Micro Devices", sector: "Technology", approxCap: 220 },
  { symbol: "ADBE", name: "Adobe Inc.", sector: "Technology", approxCap: 200 },
  { symbol: "INTC", name: "Intel Corp.", sector: "Technology", approxCap: 100 },
  { symbol: "CSCO", name: "Cisco Systems Inc.", sector: "Technology", approxCap: 230 },
  { symbol: "NFLX", name: "Netflix Inc.", sector: "Technology", approxCap: 400 },
  // Healthcare
  { symbol: "UNH", name: "UnitedHealth Group", sector: "Healthcare", approxCap: 450 },
  { symbol: "JNJ", name: "Johnson & Johnson", sector: "Healthcare", approxCap: 380 },
  { symbol: "LLY", name: "Eli Lilly & Co.", sector: "Healthcare", approxCap: 750 },
  { symbol: "ABBV", name: "AbbVie Inc.", sector: "Healthcare", approxCap: 310 },
  { symbol: "MRK", name: "Merck & Co.", sector: "Healthcare", approxCap: 250 },
  { symbol: "PFE", name: "Pfizer Inc.", sector: "Healthcare", approxCap: 150 },
  { symbol: "TMO", name: "Thermo Fisher Scientific", sector: "Healthcare", approxCap: 190 },
  { symbol: "ABT", name: "Abbott Laboratories", sector: "Healthcare", approxCap: 200 },
  // Financial
  { symbol: "BRK-B", name: "Berkshire Hathaway", sector: "Financial", approxCap: 1000 },
  { symbol: "JPM", name: "JPMorgan Chase & Co.", sector: "Financial", approxCap: 680 },
  { symbol: "V", name: "Visa Inc.", sector: "Financial", approxCap: 580 },
  { symbol: "MA", name: "Mastercard Inc.", sector: "Financial", approxCap: 430 },
  { symbol: "BAC", name: "Bank of America Corp.", sector: "Financial", approxCap: 310 },
  { symbol: "WFC", name: "Wells Fargo & Co.", sector: "Financial", approxCap: 220 },
  { symbol: "GS", name: "Goldman Sachs Group", sector: "Financial", approxCap: 170 },
  { symbol: "MS", name: "Morgan Stanley", sector: "Financial", approxCap: 150 },
  // Consumer
  { symbol: "WMT", name: "Walmart Inc.", sector: "Consumer", approxCap: 680 },
  { symbol: "PG", name: "Procter & Gamble Co.", sector: "Consumer", approxCap: 380 },
  { symbol: "KO", name: "Coca-Cola Co.", sector: "Consumer", approxCap: 270 },
  { symbol: "PEP", name: "PepsiCo Inc.", sector: "Consumer", approxCap: 220 },
  { symbol: "COST", name: "Costco Wholesale Corp.", sector: "Consumer", approxCap: 400 },
  { symbol: "MCD", name: "McDonald's Corp.", sector: "Consumer", approxCap: 210 },
  { symbol: "HD", name: "Home Depot Inc.", sector: "Consumer", approxCap: 380 },
  { symbol: "NKE", name: "Nike Inc.", sector: "Consumer", approxCap: 90 },
  // Energy
  { symbol: "XOM", name: "Exxon Mobil Corp.", sector: "Energy", approxCap: 480 },
  { symbol: "CVX", name: "Chevron Corp.", sector: "Energy", approxCap: 270 },
  { symbol: "COP", name: "ConocoPhillips", sector: "Energy", approxCap: 130 },
  // Industrial
  { symbol: "CAT", name: "Caterpillar Inc.", sector: "Industrial", approxCap: 170 },
  { symbol: "BA", name: "Boeing Co.", sector: "Industrial", approxCap: 130 },
  { symbol: "GE", name: "GE Aerospace", sector: "Industrial", approxCap: 200 },
  { symbol: "UPS", name: "United Parcel Service", sector: "Industrial", approxCap: 100 },
  { symbol: "HON", name: "Honeywell International", sector: "Industrial", approxCap: 140 },
  // Communication
  { symbol: "DIS", name: "Walt Disney Co.", sector: "Communication", approxCap: 200 },
  { symbol: "CMCSA", name: "Comcast Corp.", sector: "Communication", approxCap: 150 },
  { symbol: "VZ", name: "Verizon Communications", sector: "Communication", approxCap: 170 },
  { symbol: "T", name: "AT&T Inc.", sector: "Communication", approxCap: 160 },
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

export interface IndexData {
  symbol: string;
  name: string;
  price: number;
  changePercent: number;
  change: number;
}

const INDICES = [
  { symbol: "^GSPC", name: "S&P 500", finnhubSymbol: "SPY" },
  { symbol: "^DJI", name: "Dow Jones", finnhubSymbol: "DIA" },
  { symbol: "^IXIC", name: "Nasdaq", finnhubSymbol: "QQQ" },
];

let cache: { data: StockData[]; indices: IndexData[]; timestamp: number } | null = null;
const CACHE_TTL = 2 * 60 * 1000; // 2 minutes

async function fetchFinnhubQuote(symbol: string): Promise<{ c: number; dp: number; pc: number } | null> {
  try {
    const res = await fetch(
      `https://finnhub.io/api/v1/quote?symbol=${encodeURIComponent(symbol)}&token=${FINNHUB_KEY}`
    );
    if (!res.ok) return null;
    return await res.json();
  } catch {
    return null;
  }
}

async function fetchStockData(): Promise<{ stocks: StockData[]; indices: IndexData[] }> {
  const now = Date.now();
  if (cache && now - cache.timestamp < CACHE_TTL) {
    return { stocks: cache.data, indices: cache.indices };
  }

  try {
    // Fetch all stock quotes in parallel
    const quotePromises = STOCKS.map(async (stock) => {
      // Finnhub uses "." instead of "-" for special tickers
      const finnhubSymbol = stock.symbol.replace("-", ".");
      const quote = await fetchFinnhubQuote(finnhubSymbol);
      if (!quote || quote.c === 0) return null;
      return {
        symbol: stock.symbol,
        name: stock.name,
        sector: stock.sector,
        price: quote.c,
        changePercent: quote.dp ?? 0,
        marketCap: stock.approxCap * 1e9,
      } as StockData;
    });

    // Fetch index ETF proxies in parallel
    const indexPromises = INDICES.map(async (idx) => {
      const quote = await fetchFinnhubQuote(idx.finnhubSymbol);
      if (!quote || quote.c === 0) return null;
      return {
        symbol: idx.symbol,
        name: idx.name,
        price: quote.c,
        changePercent: quote.dp ?? 0,
        change: quote.c - (quote.pc ?? 0),
      } as IndexData;
    });

    const [stockResults, indexResults] = await Promise.all([
      Promise.all(quotePromises),
      Promise.all(indexPromises),
    ]);

    const stocks = stockResults.filter(Boolean) as StockData[];
    const indices = indexResults.filter(Boolean) as IndexData[];

    if (stocks.length > 0) {
      cache = { data: stocks, indices, timestamp: now };
    }

    return { stocks, indices };
  } catch (error) {
    console.error("Failed to fetch from Finnhub:", error);
    if (cache) return { stocks: cache.data, indices: cache.indices };
    return { stocks: [], indices: [] };
  }
}

export async function GET() {
  const { stocks, indices } = await fetchStockData();

  return NextResponse.json(
    { stocks, indices, timestamp: Date.now() },
    {
      headers: {
        "Cache-Control": "public, s-maxage=30, stale-while-revalidate=60",
      },
    }
  );
}
