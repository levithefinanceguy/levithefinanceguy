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

// Fallback annual dividend per share for tickers where Finnhub returns 0
// Source: fund fact sheets / morningstar (updated periodically)
const DIVIDEND_FALLBACKS: Record<string, number> = {
  VTI: 3.41,    // Vanguard Total Stock Market - ~1.3% yield
  VXUS: 3.20,   // Vanguard Total Intl - ~3.0% yield
  BND: 3.30,    // Vanguard Total Bond - ~4.4% yield
  DGRO: 1.46,   // iShares Dividend Growth - ~2.3% yield
  VOO: 6.76,    // Vanguard S&P 500 - ~1.3% yield
  VYM: 3.55,    // Vanguard High Dividend - ~2.8% yield
  SCHD: 2.82,   // Schwab US Dividend - ~3.5% yield
  JEPI: 4.93,   // JPMorgan Equity Premium - ~7.3% yield
  SPY: 6.82,    // SPDR S&P 500 - ~1.2% yield
  QQQ: 2.86,    // Invesco QQQ - ~0.6% yield
  O: 3.22,      // Realty Income - ~5.6% yield
};

async function fetchFinnhubQuote(symbol: string): Promise<{ c: number; dp: number; pc: number } | null> {
  try {
    const res = await fetch(
      `https://finnhub.io/api/v1/quote?symbol=${encodeURIComponent(symbol)}&token=${FINNHUB_KEY}`,
      { signal: AbortSignal.timeout(8000) }
    );
    if (!res.ok) {
      console.error(`Finnhub quote ${symbol}: HTTP ${res.status}`);
      return null;
    }
    const data = await res.json();
    return data;
  } catch (e) {
    console.error(`Finnhub quote ${symbol} error:`, e);
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

    // Fetch in batches of 5 to avoid Finnhub rate limits (60 req/min free tier)
    const BATCH_SIZE = 5;
    for (let i = 0; i < tickers.length; i += BATCH_SIZE) {
      const batch = tickers.slice(i, i + BATCH_SIZE);
      await Promise.all(batch.map(async (ticker) => {
        const finnhubSymbol = ticker.replace("-", ".");
        const [quote, metrics] = await Promise.all([
          fetchFinnhubQuote(finnhubSymbol),
          fetch(`https://finnhub.io/api/v1/stock/metric?symbol=${encodeURIComponent(finnhubSymbol)}&metric=all&token=${FINNHUB_KEY}`,
            { signal: AbortSignal.timeout(8000) })
            .then((r) => r.ok ? r.json() : null)
            .catch((e) => { console.error(`Finnhub metrics ${ticker}:`, e); return null; }),
        ]);
        if (quote && quote.c > 0) {
          let dps = metrics?.metric?.dividendPerShareAnnual ?? 0;
          if (dps === 0 && DIVIDEND_FALLBACKS[ticker]) {
            dps = DIVIDEND_FALLBACKS[ticker];
          }
          priceMap.set(ticker, {
            price: quote.c,
            dividendPerShare: dps,
          });
        }
      }));
      // Small delay between batches to stay under rate limit
      if (i + BATCH_SIZE < tickers.length) {
        await new Promise((r) => setTimeout(r, 200));
      }
    }

    const livePrices = priceMap.size > 0;
    console.log(`Portfolio: ${tickers.length} tickers, ${priceMap.size} live prices loaded. livePrices=${livePrices}`);
    const holdings = rawHoldings.map((h: { ticker: string; shares: number; purchasePrice: number; costBasis: number; datePurchased: string; plaidCurrentValue?: number }) => {
      const live = priceMap.get(h.ticker);
      // For options/tickers Finnhub can't price, use Plaid's current value
      const plaidPerShare = h.plaidCurrentValue && h.shares > 0 ? h.plaidCurrentValue / h.shares : 0;
      const currentPrice = live?.price ?? (plaidPerShare > 0 ? plaidPerShare : h.purchasePrice);
      return {
        ticker: h.ticker,
        name: STOCK_NAMES[h.ticker] || h.ticker,
        shares: h.shares,
        purchasePrice: Math.round(h.purchasePrice * 100) / 100,
        currentPrice,
        datePurchased: h.datePurchased,
        dividendPerShare: live?.dividendPerShare ?? (DIVIDEND_FALLBACKS[h.ticker] ?? 0),
      };
    });

    // Calculate accurate amount invested from holdings if personalAmountInvested is 0
    const calculatedInvested = rawHoldings.reduce(
      (sum: number, h: { shares: number; costBasis: number }) => sum + h.shares * h.costBasis,
      0
    );
    const amountInvested = personalAmountInvested > 0 ? personalAmountInvested : calculatedInvested;

    // Fetch transaction history
    let transactions: { type: string; ticker: string; shares: number; pricePerShare: number; amount: number; date: string }[] = [];
    try {
      const txRes = await fetch(`${FUNCTIONS_BASE}/getPortfolioTransactions`);
      if (txRes.ok) {
        const txJson = await txRes.json();
        transactions = txJson.transactions ?? [];
      }
    } catch {
      // Transaction history is optional — don't fail if unavailable
    }

    const result = { holdings, cashBalance, personalAmountInvested: amountInvested, livePrices, transactions, timestamp: now };
    portfolioCache = { data: result, timestamp: now };

    return NextResponse.json(result, {
      headers: { "Cache-Control": "public, s-maxage=300, stale-while-revalidate=600" },
    });
  } catch (error) {
    console.error("Portfolio fetch error:", error);
    return NextResponse.json({ holdings: [], error: "Failed to fetch portfolio" }, { status: 500 });
  }
}
