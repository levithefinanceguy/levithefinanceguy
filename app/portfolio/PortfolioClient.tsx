"use client";

import { useEffect, useState } from "react";
import AdBanner from "../components/AdBanner";
import PortfolioChart from "./PortfolioChart";

interface Holding {
  ticker: string;
  name: string;
  datePurchased: string;
  purchasePrice: number;
  currentPrice: number;
  shares: number;
  dividendPerShare: number;
}

function PieChart({ holdings }: { holdings: Holding[] }) {
  const totalValue = holdings.reduce((s, h) => s + h.currentPrice * h.shares, 0);
  const colors = [
    "#2ECC71", "#3498DB", "#9B59B6", "#E67E22", "#1ABC9C",
    "#E74C3C", "#F39C12", "#2980B9", "#27AE60", "#8E44AD",
    "#D35400", "#16A085", "#C0392B", "#F1C40F", "#2C3E50",
  ];

  let cumulative = 0;
  const slices = holdings.map((h, i) => {
    const value = h.currentPrice * h.shares;
    const pct = value / totalValue;
    const startAngle = cumulative * 360;
    cumulative += pct;
    const endAngle = cumulative * 360;
    return { ticker: h.ticker, pct, startAngle, endAngle, color: colors[i % colors.length] };
  });

  function polarToCartesian(angle: number) {
    const rad = ((angle - 90) * Math.PI) / 180;
    return { x: 50 + 45 * Math.cos(rad), y: 50 + 45 * Math.sin(rad) };
  }

  return (
    <div className="flex flex-col items-center">
      <svg viewBox="0 0 100 100" className="w-48 h-48 md:w-56 md:h-56">
        {slices.map((slice, i) => {
          if (slice.pct < 0.001) return null;
          const start = polarToCartesian(slice.startAngle);
          const end = polarToCartesian(slice.endAngle);
          const largeArc = slice.endAngle - slice.startAngle > 180 ? 1 : 0;
          const d = `M 50 50 L ${start.x} ${start.y} A 45 45 0 ${largeArc} 1 ${end.x} ${end.y} Z`;
          return <path key={i} d={d} fill={slice.color} stroke="#0a0a0a" strokeWidth="0.5" />;
        })}
      </svg>
      <div className="flex flex-wrap justify-center gap-3 mt-4">
        {slices.map((s, i) => (
          <div key={i} className="flex items-center gap-1.5 text-xs text-gray-400">
            <span className="w-3 h-3 rounded-sm inline-block" style={{ backgroundColor: s.color }} />
            {displayTicker(s.ticker)} {(s.pct * 100).toFixed(1)}%
          </div>
        ))}
      </div>
    </div>
  );
}

function fmt(n: number) {
  return n.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

// Parse OCC option symbols like "USO260515C00275000" → "USO $275 Call 5/15/26"
function parseOptionTicker(ticker: string): string | null {
  const match = ticker.match(/^([A-Z]+)(\d{2})(\d{2})(\d{2})([CP])(\d{8})$/);
  if (!match) return null;
  const [, underlying, yy, mm, dd, type, strikeRaw] = match;
  const strike = parseInt(strikeRaw) / 1000;
  const side = type === "C" ? "Call" : "Put";
  return `${underlying} $${strike % 1 === 0 ? strike : strike.toFixed(2)} ${side} ${parseInt(mm)}/${parseInt(dd)}/${yy}`;
}

function displayTicker(ticker: string): string {
  return parseOptionTicker(ticker) ?? ticker;
}

function LoadingSkeleton() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-16 animate-pulse">
      <div className="mb-16 p-8 rounded-xl bg-card-bg border border-card-border text-center">
        <div className="h-6 w-32 bg-gray-800 rounded mx-auto mb-4" />
        <div className="h-12 w-64 bg-gray-800 rounded mx-auto mb-4" />
        <div className="h-4 w-96 bg-gray-800 rounded mx-auto mb-8" />
        <div className="h-4 w-full max-w-lg bg-gray-800 rounded mx-auto" />
      </div>
      <div className="h-8 w-64 bg-gray-800 rounded mb-4" />
      <div className="h-[300px] bg-gray-800/50 rounded-xl mb-12" />
      <div className="grid md:grid-cols-2 gap-8 mb-12">
        <div className="h-64 bg-gray-800/50 rounded-xl" />
        <div className="h-64 bg-gray-800/50 rounded-xl" />
      </div>
    </div>
  );
}

export default function PortfolioClient() {
  const [holdings, setHoldings] = useState<Holding[]>([]);
  const [cashBalance, setCashBalance] = useState(0);
  const [personalAmountInvested, setPersonalAmountInvested] = useState(0);
  const [livePrices, setLivePrices] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetch("/api/portfolio")
      .then((res) => res.json())
      .then((json) => {
        if (json.holdings && json.holdings.length > 0) {
          setHoldings(json.holdings);
          setCashBalance(json.cashBalance ?? 0);
          setPersonalAmountInvested(json.personalAmountInvested ?? 0);
          setLivePrices(json.livePrices ?? false);
        } else {
          setError(true);
        }
      })
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, []);

  // Sort by total value (heaviest weighted first)
  const sortedHoldings = [...holdings].sort(
    (a, b) => b.currentPrice * b.shares - a.currentPrice * a.shares
  );

  if (loading) return null; // ClientOnly wrapper shows skeleton

  if (error || holdings.length === 0) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-16">
        <div className="p-8 rounded-xl bg-card-bg border border-card-border text-center">
          <p className="text-gray-400">Portfolio data is currently unavailable. Check back shortly.</p>
        </div>
      </div>
    );
  }

  const investedValue = holdings.reduce((s, h) => s + h.currentPrice * h.shares, 0);
  const totalValue = investedValue + cashBalance;
  const calculatedCost = holdings.reduce((s, h) => s + h.purchasePrice * h.shares, 0);
  // Use personalAmountInvested as invested amount; use calculatedCost for return calc
  // so return is based on actual tracked holdings, not deposits that include unsynced holdings
  const totalCost = calculatedCost;
  const displayInvested = personalAmountInvested > 0 ? personalAmountInvested : calculatedCost;
  const totalGain = totalValue - totalCost;
  const totalGainPct = totalCost > 0 ? (totalGain / totalCost) * 100 : 0;
  const totalAnnualDividends = holdings.reduce((s, h) => s + h.dividendPerShare * h.shares, 0);
  const totalMonthlyDividends = totalAnnualDividends / 12;
  const priceGrowth = totalGain;

  const goal = 1000000;
  const progressPct = Math.min((totalValue / goal) * 100, 100);

  return (
    <div className="max-w-6xl mx-auto px-4 py-16" suppressHydrationWarning>
      {/* $1 to $1,000,000 Journey */}
      <div className="mb-16 p-8 rounded-xl bg-card-bg border border-card-border text-center">
        <p className="text-sm text-gray-500 uppercase tracking-widest mb-2">The Journey</p>
        <h1 className="text-4xl md:text-5xl font-extrabold mb-3">
          <span className="text-white">$1</span>
          <span className="text-gray-600 mx-3">&rarr;</span>
          <span className="gradient-text">$1,000,000</span>
        </h1>
        <p className="text-gray-400 max-w-xl mx-auto mb-8">
          I started with a single dollar on Robinhood. No trust fund, no windfall, no shortcuts.
          Just consistency, time, and a plan. Follow along as I build to seven figures in public.
        </p>
        <div className="max-w-lg mx-auto">
          <div className="flex justify-between text-sm mb-2">
            <span className="text-gray-400">${fmt(totalValue)}</span>
            <span className="text-gray-500">$1,000,000</span>
          </div>
          <div className="w-full bg-gray-800 rounded-full h-4 overflow-hidden">
            <div
              className="h-full rounded-full bg-gradient-to-r from-accent-green to-accent-teal transition-all duration-1000"
              style={{ width: `${Math.max(progressPct, 1)}%` }}
            />
          </div>
          <p className="text-sm text-gray-500 mt-2">{progressPct.toFixed(2)}% there</p>
          <a
            href="https://join.robinhood.com/bretp22"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block mt-4 px-6 py-2 text-sm font-semibold rounded-lg border border-accent-green/30 text-accent-green hover:bg-accent-green/10 transition-all"
          >
            Start your own journey &rarr;
          </a>
          <p className="text-[10px] text-gray-600 mt-1">affiliate link</p>
        </div>
      </div>

      <div className="mb-4">
        <h2 className="text-3xl md:text-4xl font-extrabold">
          My Public <span className="text-accent-green">Portfolio</span>
        </h2>
      </div>
      <p className="text-gray-400 max-w-3xl mb-8 leading-relaxed">
        Full transparency. Every stock and ETF I own, what I paid, and how it is performing.
        Real numbers, real ups and downs. No cherry-picked winners.
      </p>

      <PortfolioChart />

      {/* Summary */}
      <div className="grid md:grid-cols-2 gap-8 mb-12">
        <div className="p-8 rounded-xl bg-card-bg border border-card-border">
          <h2 className="text-lg font-semibold mb-6">Portfolio Summary</h2>
          <div className="space-y-4">
            <div className="flex justify-between">
              <span className="text-gray-400">Total Value</span>
              <span className="font-bold text-xl">${fmt(totalValue)}</span>
            </div>
            <div className="h-px bg-card-border" />
            <div className="flex justify-between">
              <span className="text-gray-400">Invested</span>
              <span className="font-mono text-blue-400">${fmt(displayInvested)}</span>
            </div>
            {cashBalance > 0 && (
              <div className="flex justify-between">
                <span className="text-gray-400">Uninvested Cash</span>
                <span className="font-mono text-gray-300">${fmt(cashBalance)}</span>
              </div>
            )}
            {livePrices && (
              <>
                <div className="flex justify-between">
                  <span className="text-gray-400">Price Growth</span>
                  <span className={`font-mono ${priceGrowth >= 0 ? "text-accent-green" : "text-accent-red"}`}>
                    {priceGrowth >= 0 ? "+" : ""}${fmt(priceGrowth)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Est. Annual Dividends</span>
                  <span className="font-mono text-accent-green">${fmt(totalAnnualDividends)}/yr</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Est. Monthly Dividends</span>
                  <span className="font-mono text-gray-300">${fmt(totalMonthlyDividends)}/mo</span>
                </div>
                <div className="h-px bg-card-border" />
                <div className="flex justify-between">
                  <span className="text-gray-400">Total Return</span>
                  <span className={`font-bold ${totalGain >= 0 ? "text-accent-green" : "text-accent-red"}`}>
                    {totalGain >= 0 ? "+" : ""}${fmt(totalGain)} ({totalGainPct >= 0 ? "+" : ""}{totalGainPct.toFixed(2)}%)
                  </span>
                </div>
                {/* Visual breakdown */}
                <div className="w-full bg-gray-800 rounded-full h-3 overflow-hidden">
                  <div className="h-full flex">
                    <div className="bg-blue-400 h-full" style={{ width: `${(displayInvested / totalValue) * 100}%` }} />
                    <div className="bg-accent-green h-full" style={{ width: `${(priceGrowth / totalValue) * 100}%` }} />
                  </div>
                </div>
                <div className="flex justify-between text-[10px] text-gray-500">
                  <span>Invested {Math.round((displayInvested / totalValue) * 100)}%</span>
                  <span>Growth {Math.round((priceGrowth / totalValue) * 100)}%</span>
                </div>
              </>
            )}
          </div>
        </div>
        <div className="p-8 rounded-xl bg-card-bg border border-card-border flex items-center justify-center">
          <PieChart holdings={sortedHoldings} />
        </div>
      </div>

      {/* Holdings Table */}
      <div className="overflow-x-auto rounded-xl border border-card-border">
        <table className="w-full text-sm">
          <thead className="bg-card-bg text-gray-400 text-xs uppercase tracking-wider">
            <tr>
              <th className="text-left p-4">Ticker</th>
              <th className="text-left p-4 hidden md:table-cell">Company</th>
              <th className="text-right p-4">Buy Price</th>
              {livePrices && <th className="text-right p-4">Current</th>}
              <th className="text-right p-4 hidden sm:table-cell">Shares</th>
              <th className="text-right p-4">Value</th>
              {livePrices && <th className="text-right p-4">Gain/Loss</th>}
            </tr>
          </thead>
          <tbody>
            {sortedHoldings.map((h) => {
              const value = h.currentPrice * h.shares;
              const gain = (h.currentPrice - h.purchasePrice) * h.shares;
              const gainPct = ((h.currentPrice - h.purchasePrice) / h.purchasePrice) * 100;
              const positive = gain >= 0;
              return (
                <tr key={h.ticker + h.datePurchased} className="border-t border-card-border hover:bg-card-bg/50">
                  <td className="p-4 font-bold text-accent-green">{displayTicker(h.ticker)}</td>
                  <td className="p-4 hidden md:table-cell text-gray-300">{parseOptionTicker(h.ticker) ? "Options Contract" : h.name}</td>
                  <td className="p-4 text-right font-mono">${fmt(h.purchasePrice)}</td>
                  {livePrices && <td className="p-4 text-right font-mono">${fmt(h.currentPrice)}</td>}
                  <td className="p-4 text-right hidden sm:table-cell">{h.shares}</td>
                  <td className="p-4 text-right font-mono font-semibold">${fmt(value)}</td>
                  {livePrices && (
                    <td
                      className={`p-4 text-right font-mono font-semibold ${
                        positive ? "text-accent-green" : "text-accent-red"
                      }`}
                    >
                      {positive ? "+" : ""}${fmt(gain)}
                      <br />
                      <span className="text-xs">
                        ({positive ? "+" : ""}{gainPct.toFixed(2)}%)
                      </span>
                    </td>
                  )}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* SEO Content */}
      <section className="mt-16 space-y-6 text-gray-400 leading-relaxed max-w-3xl">
        <h2 className="text-xl font-bold text-white">Why I Share My Portfolio Publicly</h2>
        <p>
          Most finance creators tell you what to buy but never show their own positions. That always
          bugged me. How can you trust someone&apos;s investing advice if you have no idea whether they
          actually follow it themselves? Sharing my real portfolio — every position, every purchase price,
          every loss — keeps me honest and gives you something most financial content does not: proof.
        </p>
        <p>
          Public accountability also changes my own behavior. When I know thousands of people can see
          my holdings, I am way less likely to panic-sell during a dip or chase some random meme stock.
          It forces me to stick to my plan, which is honestly the hardest part of investing.
        </p>

        <h3 className="text-lg font-semibold text-white">How to Read This Portfolio</h3>
        <p>
          The table above shows every stock and ETF I currently own. Here is what the columns mean:
        </p>
        <ul className="list-disc list-inside space-y-2 ml-2">
          <li><strong className="text-white">Buy Price</strong> (also called cost basis) — the price I paid per share when I bought it. This is my starting point for measuring profit or loss.</li>
          <li><strong className="text-white">Current Price</strong> — what the stock is trading at right now, updated throughout the day.</li>
          <li><strong className="text-white">Gain/Loss</strong> — the difference between what I paid and what it is worth now, shown in both dollar amount and percentage. Green means I am up, red means I am down.</li>
          <li><strong className="text-white">Value</strong> — the total dollar value of that position (current price multiplied by the number of shares I own).</li>
        </ul>
        <p>
          The pie chart shows allocation — what percentage of my total portfolio each holding represents.
          A bigger slice means more of my money is in that position. Diversification matters because it
          means a single bad stock cannot wipe you out.
        </p>

        <h3 className="text-lg font-semibold text-white">My Investing Approach</h3>
        <p>
          I keep it simple. The core of my portfolio is broad market index ETFs like VOO and VTI, which
          give me exposure to hundreds of companies in a single purchase. On top of that, I hold individual
          stocks in companies I genuinely believe in for the long term. I am not a day trader and I am not
          trying to time the market. I dollar-cost average — meaning I invest a set amount on a regular
          schedule regardless of whether the market is up or down. Over time, this smooths out the bumps
          and removes the guesswork of &quot;when should I buy?&quot;
        </p>
        <p>
          My time horizon is years, not days. Some of my positions are down right now and that is fine.
          The goal is not to be right on every single pick — it is to build wealth steadily over a long
          period. That is the boring truth about investing that most social media content skips over.
        </p>

        <AdBanner slot="in-content" size="medium-rectangle" />

        <div className="mt-8 p-6 rounded-xl border border-card-border bg-card-bg/50">
          <p className="text-xs text-gray-500 leading-relaxed">
            <strong className="text-gray-400">Disclaimer:</strong> This portfolio is shared for
            transparency and educational purposes only. Nothing on this page is investment advice,
            a recommendation, or a solicitation to buy or sell any security. I am not a licensed
            financial advisor. Investing involves risk, including the possible loss of principal.
            Always do your own research and consult a qualified financial professional before making
            investment decisions. Past performance does not guarantee future results. The holdings
            shown here reflect my personal positions and should not be interpreted as endorsements
            of any specific stock or ETF.
          </p>
        </div>

        <p className="text-xs text-gray-600 mt-4">
          Portfolio data synced live from my Cheese app. Prices updated every 5 minutes via Finnhub.
        </p>
      </section>
    </div>
  );
}
