import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

const FUNCTIONS_BASE = "https://us-central1-cheeseapphq.cloudfunctions.net";
const FINNHUB_KEY = process.env.FINNHUB_API_KEY || "d7586opr01qk56kbpvm0d7586opr01qk56kbpvmg";

const STOCK_NAMES: Record<string, string> = {
  AAPL: "Apple Inc.", MSFT: "Microsoft Corp.", GOOGL: "Alphabet Inc.",
  AMZN: "Amazon.com Inc.", NVDA: "NVIDIA Corp.", META: "Meta Platforms Inc.",
  TSLA: "Tesla Inc.", VOO: "Vanguard S&P 500 ETF", VTI: "Vanguard Total Stock Market ETF",
  QQQ: "Invesco QQQ Trust", SCHD: "Schwab US Dividend Equity ETF",
  SPY: "SPDR S&P 500 ETF", "BRK-B": "Berkshire Hathaway", JPM: "JPMorgan Chase & Co.",
  V: "Visa Inc.", MA: "Mastercard Inc.", HD: "Home Depot Inc.", KO: "Coca-Cola Co.",
  PEP: "PepsiCo Inc.", WMT: "Walmart Inc.", COST: "Costco Wholesale Corp.",
  JNJ: "Johnson & Johnson", UNH: "UnitedHealth Group", PG: "Procter & Gamble Co.",
  XOM: "Exxon Mobil Corp.", CVX: "Chevron Corp.", ABBV: "AbbVie Inc.",
  MRK: "Merck & Co.", PFE: "Pfizer Inc.", DIS: "Walt Disney Co.",
  NFLX: "Netflix Inc.", AMD: "Advanced Micro Devices", INTC: "Intel Corp.",
  BA: "Boeing Co.", CAT: "Caterpillar Inc.", GE: "GE Aerospace",
  AVGO: "Broadcom Inc.", CRM: "Salesforce Inc.", ORCL: "Oracle Corp.",
  ADBE: "Adobe Inc.", CSCO: "Cisco Systems Inc.", BAC: "Bank of America Corp.",
  WFC: "Wells Fargo & Co.", GS: "Goldman Sachs Group", MS: "Morgan Stanley",
  T: "AT&T Inc.", VZ: "Verizon Communications", CMCSA: "Comcast Corp.",
  NKE: "Nike Inc.", MCD: "McDonald's Corp.", COP: "ConocoPhillips",
  TMO: "Thermo Fisher Scientific", ABT: "Abbott Laboratories",
  LLY: "Eli Lilly & Co.", HON: "Honeywell International", UPS: "United Parcel Service",
  SOFI: "SoFi Technologies Inc.", PLTR: "Palantir Technologies",
  COIN: "Coinbase Global Inc.", HOOD: "Robinhood Markets Inc.",
  SQ: "Block Inc.", SHOP: "Shopify Inc.", SNOW: "Snowflake Inc.",
  UBER: "Uber Technologies", ABNB: "Airbnb Inc.", RIVN: "Rivian Automotive",
  LCID: "Lucid Group Inc.", NIO: "NIO Inc.", F: "Ford Motor Co.",
  GM: "General Motors Co.", O: "Realty Income Corp.", JEPI: "JPMorgan Equity Premium Income ETF",
  VYM: "Vanguard High Dividend Yield ETF", DGRO: "iShares Core Dividend Growth ETF",
  BND: "Vanguard Total Bond Market ETF", VXUS: "Vanguard Total International Stock ETF",
  RVI: "Robinhood Ventures Fund I",
};

async function fetchFinnhubQuote(symbol: string): Promise<{ c: number; dp: number; pc: number } | null> {
  try {
    const finnhubSymbol = symbol.replace("-", ".");
    const res = await fetch(
      `https://finnhub.io/api/v1/quote?symbol=${encodeURIComponent(finnhubSymbol)}&token=${FINNHUB_KEY}`
    );
    if (!res.ok) return null;
    return await res.json();
  } catch {
    return null;
  }
}

let portfolioCache: { data: unknown; timestamp: number } | null = null;
const PORTFOLIO_CACHE_TTL = 5 * 60 * 1000; // 5 minutes

export async function GET() {
  const now = Date.now();
  if (portfolioCache && now - portfolioCache.timestamp < PORTFOLIO_CACHE_TTL) {
    return NextResponse.json(portfolioCache.data, {
      headers: { "Cache-Control": "public, s-maxage=300, stale-while-revalidate=600" },
    });
  }

  try {
    // Fetch holdings from Cheese Firestore via Cloud Function
    const holdingsRes = await fetch(`${FUNCTIONS_BASE}/getPortfolio`);
    if (!holdingsRes.ok) throw new Error(`Cloud function returned ${holdingsRes.status}`);
    const holdingsJson = await holdingsRes.json();
    const rawHoldings = holdingsJson.holdings;
    const cashBalance = holdingsJson.cashBalance ?? 0;
    const personalAmountInvested = holdingsJson.personalAmountInvested ?? 0;

    if (!rawHoldings || rawHoldings.length === 0) {
      return NextResponse.json({ holdings: [], cashBalance, personalAmountInvested, timestamp: now });
    }

    // Fetch live prices from Finnhub in parallel
    const tickers = [...new Set(rawHoldings.map((h: { ticker: string }) => h.ticker))] as string[];
    const priceMap = new Map<string, { price: number; dividendPerShare: number }>();

    const quotePromises = tickers.map(async (ticker) => {
      const quote = await fetchFinnhubQuote(ticker);
      if (quote && quote.c > 0) {
        priceMap.set(ticker, {
          price: quote.c,
          dividendPerShare: 0, // Finnhub quote doesn't include dividends
        });
      }
    });

    await Promise.all(quotePromises);

    const livePrices = priceMap.size > 0;
    const holdings = rawHoldings.map((h: { ticker: string; shares: number; purchasePrice: number; costBasis: number; datePurchased: string }) => {
      const live = priceMap.get(h.ticker);
      return {
        ticker: h.ticker,
        name: STOCK_NAMES[h.ticker] || h.ticker,
        shares: h.shares,
        purchasePrice: Math.round(h.purchasePrice * 100) / 100,
        currentPrice: live?.price ?? h.purchasePrice,
        datePurchased: h.datePurchased,
        dividendPerShare: live?.dividendPerShare ?? 0,
      };
    });

    const result = { holdings, cashBalance, personalAmountInvested, livePrices, timestamp: now };
    portfolioCache = { data: result, timestamp: now };

    return NextResponse.json(result, {
      headers: { "Cache-Control": "public, s-maxage=300, stale-while-revalidate=600" },
    });
  } catch (error) {
    console.error("Portfolio fetch error:", error);
    return NextResponse.json({ holdings: [], error: "Failed to fetch portfolio" }, { status: 500 });
  }
}
