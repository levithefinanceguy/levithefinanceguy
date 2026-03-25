/**
 * Weekly Portfolio Recap Generator
 *
 * Runs every Friday after market close.
 * Fetches current prices for portfolio holdings,
 * calculates weekly performance, and generates a blog post.
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Portfolio holdings — update these with real data
const holdings = [
  { ticker: "AAPL", name: "Apple", shares: 25 },
  { ticker: "MSFT", name: "Microsoft", shares: 15 },
  { ticker: "VOO", name: "Vanguard S&P 500", shares: 30 },
  { ticker: "GOOGL", name: "Alphabet", shares: 20 },
  { ticker: "AMZN", name: "Amazon", shares: 18 },
  { ticker: "NVDA", name: "NVIDIA", shares: 10 },
  { ticker: "TSLA", name: "Tesla", shares: 12 },
  { ticker: "VTI", name: "Vanguard Total Market", shares: 20 },
];

const TOTAL_INVESTED = 47043.90; // Update with real cost basis
const GOAL = 1000000;

async function fetchQuotes(symbols) {
  const url = `https://query1.finance.yahoo.com/v7/finance/quote?symbols=${symbols.join(",")}`;

  // Get crumb and cookie
  const cookieRes = await fetch("https://fc.yahoo.com", { redirect: "manual" });
  const cookie = cookieRes.headers.get("set-cookie")?.split(";")[0] || "";

  const crumbRes = await fetch("https://query2.finance.yahoo.com/v1/test/getcrumb", {
    headers: { Cookie: cookie, "User-Agent": "Mozilla/5.0" },
  });
  const crumb = await crumbRes.text();

  const res = await fetch(`${url}&crumb=${encodeURIComponent(crumb)}`, {
    headers: { Cookie: cookie, "User-Agent": "Mozilla/5.0" },
  });

  if (!res.ok) throw new Error(`Yahoo Finance error: ${res.status}`);
  const data = await res.json();
  return data.quoteResponse?.result || [];
}

async function fetchWeekAgoQuotes(symbols) {
  const now = Math.floor(Date.now() / 1000);
  const weekAgo = now - 7 * 24 * 60 * 60;
  const results = {};

  for (const symbol of symbols) {
    try {
      const url = `https://query1.finance.yahoo.com/v8/finance/chart/${symbol}?period1=${weekAgo}&period2=${now}&interval=1d`;

      const cookieRes = await fetch("https://fc.yahoo.com", { redirect: "manual" });
      const cookie = cookieRes.headers.get("set-cookie")?.split(";")[0] || "";
      const crumbRes = await fetch("https://query2.finance.yahoo.com/v1/test/getcrumb", {
        headers: { Cookie: cookie, "User-Agent": "Mozilla/5.0" },
      });
      const crumb = await crumbRes.text();

      const res = await fetch(`${url}&crumb=${encodeURIComponent(crumb)}`, {
        headers: { Cookie: cookie, "User-Agent": "Mozilla/5.0" },
      });
      const data = await res.json();
      const closes = data.chart?.result?.[0]?.indicators?.quote?.[0]?.close || [];
      if (closes.length > 0) {
        results[symbol] = closes[0]; // First close of the week
      }
    } catch {
      // Skip on error
    }
  }
  return results;
}

function getDateRange() {
  const now = new Date();
  const monday = new Date(now);
  monday.setDate(now.getDate() - (now.getDay() + 4) % 7); // Last Monday
  const friday = new Date(monday);
  friday.setDate(monday.getDate() + 4);

  const fmt = (d) => d.toLocaleDateString("en-US", { month: "long", day: "numeric" });
  return {
    start: fmt(monday),
    end: fmt(friday),
    year: friday.getFullYear(),
    slug: `weekly-recap-${monday.toISOString().slice(0, 10)}`,
    isoDate: friday.toISOString().slice(0, 10),
  };
}

async function main() {
  console.log("Generating weekly portfolio recap...\n");

  const symbols = holdings.map((h) => h.ticker);

  // Fetch current and week-ago prices
  let quotes;
  let weekAgoQuotes;
  try {
    quotes = await fetchQuotes(symbols);
    weekAgoQuotes = await fetchWeekAgoQuotes(symbols);
  } catch (err) {
    console.error("Failed to fetch stock data:", err.message);
    process.exit(1);
  }

  // Build performance data
  const priceMap = {};
  for (const q of quotes) {
    priceMap[q.symbol] = q.regularMarketPrice;
  }

  const performances = holdings.map((h) => {
    const current = priceMap[h.ticker] || 0;
    const weekAgo = weekAgoQuotes[h.ticker] || current;
    const changePct = weekAgo > 0 ? ((current - weekAgo) / weekAgo) * 100 : 0;
    const value = current * h.shares;
    return { ...h, current, weekAgo, changePct, value };
  });

  // Calculate totals
  const totalValue = performances.reduce((s, p) => s + p.value, 0);
  const totalWeekAgo = performances.reduce((s, p) => s + p.weekAgo * p.shares, 0);
  const weeklyChangePct = totalWeekAgo > 0 ? ((totalValue - totalWeekAgo) / totalWeekAgo) * 100 : 0;
  const totalGrowth = totalValue - TOTAL_INVESTED;
  const journeyPct = (totalValue / GOAL) * 100;

  // Find biggest mover and worst performer
  const sorted = [...performances].sort((a, b) => b.changePct - a.changePct);
  const best = sorted[0];
  const worst = sorted[sorted.length - 1];

  const dates = getDateRange();
  const direction = weeklyChangePct >= 0 ? "up" : "down";
  const arrow = weeklyChangePct >= 0 ? "+" : "";

  // Generate post content
  const content = `This week the portfolio ${direction === "up" ? "moved up" : "pulled back"} ${arrow}${weeklyChangePct.toFixed(2)}%. Here is the breakdown.

## The Numbers

**Portfolio value:** $${totalValue.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}

**Weekly change:** ${arrow}${weeklyChangePct.toFixed(2)}%

**Total invested:** $${TOTAL_INVESTED.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}

**Total growth:** $${totalGrowth.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}

## Movers

**Biggest winner:** ${best.name} (${best.ticker}) ${best.changePct >= 0 ? "+" : ""}${best.changePct.toFixed(2)}%

**Biggest loser:** ${worst.name} (${worst.ticker}) ${worst.changePct >= 0 ? "+" : ""}${worst.changePct.toFixed(2)}%

## Journey Progress

**$1 to $1,000,000:** ${journeyPct.toFixed(2)}% there`;

  // Read existing posts
  const postsPath = path.join(__dirname, "../content/posts.ts");
  let postsFile = fs.readFileSync(postsPath, "utf-8");

  // Check if this week's recap already exists
  if (postsFile.includes(dates.slug)) {
    console.log("This week's recap already exists. Skipping.");
    return;
  }

  // Build the new post entry
  const newPost = `  {
    slug: "${dates.slug}",
    title: "Weekly Portfolio Update: ${dates.start} - ${dates.end}",
    date: "${dates.isoDate}",
    description: "Portfolio ${direction} ${arrow}${weeklyChangePct.toFixed(2)}% this week. Here is the full breakdown.",
    category: "markets" as const,
    author: "Levi",
    readingTime: "1 min read",
    content: \`${content}\`,
  },`;

  // Insert after the opening bracket of the posts array
  postsFile = postsFile.replace(
    "export const posts: BlogPost[] = [",
    `export const posts: BlogPost[] = [\n${newPost}`
  );

  fs.writeFileSync(postsPath, postsFile);

  console.log(`Generated: "${dates.slug}"`);
  console.log(`Portfolio: $${totalValue.toFixed(2)} (${arrow}${weeklyChangePct.toFixed(2)}%)`);
  console.log(`Best: ${best.ticker} ${arrow}${best.changePct.toFixed(2)}%`);
  console.log(`Worst: ${worst.ticker} ${worst.changePct.toFixed(2)}%`);
  console.log(`Journey: ${journeyPct.toFixed(2)}% to $1M`);
}

main();
