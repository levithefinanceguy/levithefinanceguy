"use client";

import { useState } from "react";
import AdBanner from "../../components/AdBanner";

function fmt(n: number) {
  return n.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

export default function InvestmentGrowthCalculator() {
  const [initial, setInitial] = useState(5000);
  const [monthly, setMonthly] = useState(300);
  const [rate, setRate] = useState(8);
  const [years, setYears] = useState(20);

  const r = rate / 100 / 12;
  const n = years * 12;
  let balance = initial;
  let totalContributions = initial;
  const yearlyData: { year: number; balance: number; contributions: number; interest: number }[] = [];

  for (let m = 1; m <= n; m++) {
    balance = balance * (1 + r) + monthly;
    totalContributions += monthly;
    if (m % 12 === 0) {
      yearlyData.push({
        year: m / 12,
        balance,
        contributions: totalContributions,
        interest: balance - totalContributions,
      });
    }
  }

  const finalAmount = balance;
  const totalInterest = finalAmount - totalContributions;
  const maxBalance = Math.max(...yearlyData.map((d) => d.balance), 1);

  return (
    <div className="max-w-4xl mx-auto px-4 py-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            name: "Investment Growth Calculator",
            description: "Project how your investments will grow over time with monthly contributions and compound returns.",
            applicationCategory: "FinanceApplication",
            operatingSystem: "Web",
            offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
          }),
        }}
      />

      <h1 className="text-3xl md:text-4xl font-extrabold mb-4">
        Investment Growth <span className="gradient-text">Calculator</span>
      </h1>

      <div className="grid md:grid-cols-2 gap-8 mb-12">
        <div className="space-y-5">
          <div>
            <label className="block text-sm text-gray-400 mb-1">Initial Investment ($)</label>
            <input type="number" value={initial} onChange={(e) => setInitial(Number(e.target.value))} className="w-full p-3 bg-card-bg border border-card-border rounded-lg text-white focus:border-accent-green outline-none" />
          </div>
          <div>
            <label className="block text-sm text-gray-400 mb-1">Monthly Contribution ($)</label>
            <input type="number" value={monthly} onChange={(e) => setMonthly(Number(e.target.value))} className="w-full p-3 bg-card-bg border border-card-border rounded-lg text-white focus:border-accent-green outline-none" />
          </div>
          <div>
            <label className="block text-sm text-gray-400 mb-1">Expected Annual Return (%)</label>
            <input type="number" value={rate} onChange={(e) => setRate(Number(e.target.value))} className="w-full p-3 bg-card-bg border border-card-border rounded-lg text-white focus:border-accent-green outline-none" step="0.1" />
          </div>
          <div>
            <label className="block text-sm text-gray-400 mb-1">Years to Grow</label>
            <input type="number" value={years} onChange={(e) => setYears(Number(e.target.value))} className="w-full p-3 bg-card-bg border border-card-border rounded-lg text-white focus:border-accent-green outline-none" />
          </div>
        </div>

        <div className="p-6 bg-card-bg border border-card-border rounded-xl space-y-4">
          <h2 className="text-lg font-semibold mb-2">Results</h2>
          <div className="flex justify-between">
            <span className="text-gray-400">Future Value</span>
            <span className="text-accent-green font-bold text-xl animate-count">${fmt(finalAmount)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-400">Total Contributed</span>
            <span className="font-mono">${fmt(totalContributions)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-400">Total Growth</span>
            <span className="text-accent-green font-mono">${fmt(totalInterest)}</span>
          </div>
          <div className="h-px bg-card-border my-2" />
          <div className="flex justify-between text-sm">
            <span className="text-gray-400">Growth Multiplier</span>
            <span className="font-mono">{totalContributions > 0 ? (finalAmount / totalContributions).toFixed(2) : "0"}x</span>
          </div>
        </div>
      </div>

      {/* Chart */}
      {yearlyData.length > 0 && (
        <div className="mb-12 p-6 bg-card-bg border border-card-border rounded-xl">
          <h2 className="text-lg font-semibold mb-4">Growth Over Time</h2>
          <div className="flex items-end gap-1 h-48">
            {yearlyData.map((d) => {
              const height = (d.balance / maxBalance) * 100;
              const contribHeight = (d.contributions / maxBalance) * 100;
              return (
                <div key={d.year} className="flex-1 flex flex-col items-center justify-end h-full relative group">
                  <div className="w-full flex flex-col justify-end h-full">
                    <div className="w-full bg-accent-green/30 rounded-t-sm relative" style={{ height: `${height}%` }}>
                      <div className="absolute bottom-0 w-full bg-accent-green/60 rounded-t-sm" style={{ height: `${(contribHeight / height) * 100}%` }} />
                    </div>
                  </div>
                  {(d.year % 5 === 0 || d.year === years) && (
                    <span className="text-[10px] text-gray-500 mt-1">{d.year}y</span>
                  )}
                  <div className="absolute -top-12 left-1/2 -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 whitespace-nowrap pointer-events-none z-10">
                    Year {d.year}: ${fmt(d.balance)}
                  </div>
                </div>
              );
            })}
          </div>
          <div className="flex gap-4 mt-4 text-xs text-gray-400">
            <div className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-sm bg-accent-green/60" /> Contributions</div>
            <div className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-sm bg-accent-green/30" /> Growth</div>
          </div>
        </div>
      )}

      <AdBanner slot="in-content" size="medium-rectangle" />

      <section className="mt-12 space-y-4 text-gray-400 leading-relaxed max-w-3xl">
        <h2 className="text-xl font-bold text-white">How Investment Growth Works</h2>
        <p>
          Investment growth is driven by two forces: your contributions and compound returns.
          When you invest consistently and reinvest your gains, your money begins earning returns
          on returns. This compounding effect accelerates over time, which is why starting early
          matters so much more than starting big.
        </p>
        <p>
          This calculator models monthly compounding with regular contributions. The growth
          multiplier shows how many times over your total contributions have grown. A 2x
          multiplier means your investments doubled your money. Over 20-30 years with reasonable
          returns, multipliers of 3-5x are common and achievable.
        </p>
        <p>
          Historical stock market returns have averaged about 10% annually before inflation
          (roughly 7% after inflation). These are long-term averages and individual years vary
          significantly. The key is staying invested through market cycles rather than trying
          to time entries and exits.
        </p>
        <p>
          Use this calculator to see the impact of changing your monthly contribution by even
          $50-100. Small increases in consistent investing have an outsized impact over decades.
          The best time to start was yesterday. The second best time is today.
        </p>
      </section>

      <p className="text-xs text-gray-500 mt-8 max-w-3xl">
        This calculator is for educational purposes only and is not financial advice. Results are estimates based on the inputs you provide. Consult a qualified financial advisor for personalized guidance.
      </p>
    </div>
  );
}
