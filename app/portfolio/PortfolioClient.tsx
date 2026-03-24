"use client";

import AdBanner from "../components/AdBanner";

interface Holding {
  ticker: string;
  name: string;
  datePurchased: string;
  purchasePrice: number;
  currentPrice: number;
  shares: number;
  sparkline: number[];
}

const sampleHoldings: Holding[] = [
  {
    ticker: "AAPL",
    name: "Apple Inc.",
    datePurchased: "2023-01-15",
    purchasePrice: 142.53,
    currentPrice: 178.72,
    shares: 25,
    sparkline: [142, 148, 155, 160, 153, 162, 170, 168, 175, 178],
  },
  {
    ticker: "MSFT",
    name: "Microsoft Corp.",
    datePurchased: "2023-03-20",
    purchasePrice: 280.74,
    currentPrice: 415.56,
    shares: 15,
    sparkline: [280, 295, 310, 325, 340, 355, 370, 390, 405, 415],
  },
  {
    ticker: "VOO",
    name: "Vanguard S&P 500 ETF",
    datePurchased: "2022-06-10",
    purchasePrice: 348.19,
    currentPrice: 478.92,
    shares: 30,
    sparkline: [348, 360, 375, 390, 405, 420, 435, 450, 465, 478],
  },
  {
    ticker: "GOOGL",
    name: "Alphabet Inc.",
    datePurchased: "2023-07-05",
    purchasePrice: 120.97,
    currentPrice: 155.84,
    shares: 20,
    sparkline: [120, 125, 130, 128, 135, 140, 145, 148, 152, 155],
  },
  {
    ticker: "AMZN",
    name: "Amazon.com Inc.",
    datePurchased: "2023-09-12",
    purchasePrice: 138.12,
    currentPrice: 185.07,
    shares: 18,
    sparkline: [138, 142, 150, 155, 160, 165, 170, 175, 180, 185],
  },
  {
    ticker: "NVDA",
    name: "NVIDIA Corp.",
    datePurchased: "2023-02-01",
    purchasePrice: 212.46,
    currentPrice: 878.35,
    shares: 10,
    sparkline: [212, 280, 350, 420, 500, 580, 650, 740, 810, 878],
  },
  {
    ticker: "TSLA",
    name: "Tesla Inc.",
    datePurchased: "2023-05-18",
    purchasePrice: 180.14,
    currentPrice: 162.50,
    shares: 12,
    sparkline: [180, 195, 210, 200, 185, 175, 170, 165, 160, 162],
  },
  {
    ticker: "VTI",
    name: "Vanguard Total Stock Market ETF",
    datePurchased: "2022-01-03",
    purchasePrice: 238.87,
    currentPrice: 262.41,
    shares: 20,
    sparkline: [238, 225, 230, 240, 235, 245, 250, 255, 258, 262],
  },
];

function Sparkline({ data, positive }: { data: number[]; positive: boolean }) {
  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min || 1;
  const w = 100;
  const h = 30;
  const points = data
    .map((v, i) => {
      const x = (i / (data.length - 1)) * w;
      const y = h - ((v - min) / range) * h;
      return `${x},${y}`;
    })
    .join(" ");

  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="w-24 h-8" preserveAspectRatio="none">
      <polyline
        points={points}
        fill="none"
        stroke={positive ? "#2ECC71" : "#E74C3C"}
        strokeWidth="2"
        strokeLinejoin="round"
        strokeLinecap="round"
      />
    </svg>
  );
}

function PieChart({ holdings }: { holdings: Holding[] }) {
  const totalValue = holdings.reduce((s, h) => s + h.currentPrice * h.shares, 0);
  const colors = [
    "#2ECC71", "#3498DB", "#9B59B6", "#E67E22", "#1ABC9C",
    "#E74C3C", "#F39C12", "#2980B9",
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
            {s.ticker} {(s.pct * 100).toFixed(1)}%
          </div>
        ))}
      </div>
    </div>
  );
}

function fmt(n: number) {
  return n.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

export default function PortfolioClient() {
  const totalValue = sampleHoldings.reduce((s, h) => s + h.currentPrice * h.shares, 0);
  const totalCost = sampleHoldings.reduce((s, h) => s + h.purchasePrice * h.shares, 0);
  const totalGain = totalValue - totalCost;
  const totalGainPct = (totalGain / totalCost) * 100;

  const goal = 1000000;
  const progressPct = Math.min((totalValue / goal) * 100, 100);

  return (
    <div className="max-w-6xl mx-auto px-4 py-16">
      {/* $1 to $1,000,000 Journey */}
      <div className="mb-16 p-8 rounded-xl bg-card-bg border border-card-border text-center">
        <p className="text-sm text-gray-500 uppercase tracking-widest mb-2">The Journey</p>
        <h1 className="text-4xl md:text-5xl font-extrabold mb-3">
          <span className="text-white">$1</span>
          <span className="text-gray-600 mx-3">→</span>
          <span className="gradient-text">$1,000,000</span>
        </h1>
        <p className="text-gray-400 max-w-xl mx-auto mb-8">
          I started with a single dollar. No trust fund, no windfall, no shortcuts. Just
          consistency, time, and a plan. Follow along as I build to seven figures in public.
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
        </div>
      </div>

      <h2 className="text-3xl md:text-4xl font-extrabold mb-4">
        My Public <span className="text-accent-green">Portfolio</span>
      </h2>
      <p className="text-gray-400 max-w-3xl mb-12 leading-relaxed">
        Full transparency. Every stock and ETF I own, what I paid, and how it is performing.
        Real numbers, real ups and downs. No cherry-picked winners.
      </p>

      {/* Summary */}
      <div className="grid md:grid-cols-2 gap-8 mb-12">
        <div className="p-8 rounded-xl bg-card-bg border border-card-border">
          <h2 className="text-lg font-semibold mb-6">Portfolio Summary</h2>
          <div className="space-y-4">
            <div className="flex justify-between">
              <span className="text-gray-400">Total Value</span>
              <span className="font-bold text-xl">${fmt(totalValue)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Total Cost Basis</span>
              <span className="font-mono">${fmt(totalCost)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Total Gain / Loss</span>
              <span
                className={`font-bold ${totalGain >= 0 ? "text-accent-green" : "text-accent-red"}`}
              >
                {totalGain >= 0 ? "+" : ""}${fmt(totalGain)} ({totalGainPct >= 0 ? "+" : ""}
                {totalGainPct.toFixed(2)}%)
              </span>
            </div>
          </div>
        </div>
        <div className="p-8 rounded-xl bg-card-bg border border-card-border flex items-center justify-center">
          <PieChart holdings={sampleHoldings} />
        </div>
      </div>

      {/* Holdings Table */}
      <div className="overflow-x-auto rounded-xl border border-card-border">
        <table className="w-full text-sm">
          <thead className="bg-card-bg text-gray-400 text-xs uppercase tracking-wider">
            <tr>
              <th className="text-left p-4">Ticker</th>
              <th className="text-left p-4 hidden md:table-cell">Company</th>
              <th className="text-left p-4 hidden lg:table-cell">Purchased</th>
              <th className="text-right p-4">Buy Price</th>
              <th className="text-right p-4">Current</th>
              <th className="text-right p-4 hidden sm:table-cell">Shares</th>
              <th className="text-right p-4">Value</th>
              <th className="text-right p-4">Gain/Loss</th>
              <th className="text-center p-4 hidden md:table-cell">Trend</th>
            </tr>
          </thead>
          <tbody>
            {sampleHoldings.map((h) => {
              const value = h.currentPrice * h.shares;
              const gain = (h.currentPrice - h.purchasePrice) * h.shares;
              const gainPct = ((h.currentPrice - h.purchasePrice) / h.purchasePrice) * 100;
              const positive = gain >= 0;
              return (
                <tr key={h.ticker} className="border-t border-card-border hover:bg-card-bg/50">
                  <td className="p-4 font-bold text-accent-green">{h.ticker}</td>
                  <td className="p-4 hidden md:table-cell text-gray-300">{h.name}</td>
                  <td className="p-4 hidden lg:table-cell text-gray-500">{h.datePurchased}</td>
                  <td className="p-4 text-right font-mono">${fmt(h.purchasePrice)}</td>
                  <td className="p-4 text-right font-mono">${fmt(h.currentPrice)}</td>
                  <td className="p-4 text-right hidden sm:table-cell">{h.shares}</td>
                  <td className="p-4 text-right font-mono font-semibold">${fmt(value)}</td>
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
                  <td className="p-4 hidden md:table-cell">
                    <div className="flex justify-center">
                      <Sparkline data={h.sparkline} positive={positive} />
                    </div>
                  </td>
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
          Transparency is the foundation of trust. Most financial content creators tell you
          what to buy but never show you their actual positions. I believe that changes the
          dynamic between educator and audience in a way that is not helpful.
        </p>
        <p>
          By sharing my real portfolio, including the losers, I hold myself accountable and
          give you a realistic picture of what investing actually looks like. It is not all
          green days. There are drawdowns, mistakes, and lessons along the way.
        </p>
        <p>
          My strategy focuses on long-term growth through a mix of individual stocks I believe
          in and broad market index ETFs for diversification. I dollar-cost average into
          positions over time rather than trying to time the market. This is not financial
          advice, just what works for me.
        </p>

        <AdBanner slot="in-content" size="medium-rectangle" />

        <p className="text-xs text-gray-600">
          Note: Current prices shown are sample data for demonstration. Real-time price
          integration coming soon. Portfolio data will be updated regularly with actual holdings.
        </p>
      </section>
    </div>
  );
}
