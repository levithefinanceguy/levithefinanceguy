"use client";

import { useState } from "react";
import AdBanner from "../../components/AdBanner";

function fmt(n: number) {
  return n.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

export default function DividendCalculator() {
  const [investment, setInvestment] = useState(50000);
  const [dividendYield, setDividendYield] = useState(3.5);
  const [drip, setDrip] = useState(true);
  const [years, setYears] = useState(20);
  const [monthlyAdd, setMonthlyAdd] = useState(500);

  const yearlyData: { year: number; portfolio: number; annualDividend: number; totalDividends: number }[] = [];
  let portfolio = investment;
  let totalDividends = 0;

  for (let y = 1; y <= years; y++) {
    portfolio += monthlyAdd * 12;
    const annualDiv = portfolio * (dividendYield / 100);
    totalDividends += annualDiv;
    if (drip) {
      portfolio += annualDiv;
    }
    yearlyData.push({
      year: y,
      portfolio,
      annualDividend: annualDiv,
      totalDividends,
    });
  }

  const totalContributed = investment + (monthlyAdd * 12 * years);
  const finalPortfolio = portfolio;
  const growthAmount = finalPortfolio - totalContributed;
  const finalAnnualDividend = finalPortfolio * (dividendYield / 100);
  const monthlyDividend = finalAnnualDividend / 12;
  const maxPortfolio = yearlyData.length > 0 ? yearlyData[yearlyData.length - 1].portfolio : 1;

  return (
    <div className="max-w-7xl mx-auto px-4 py-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            name: "Dividend Calculator",
            description: "Calculate projected dividend income with optional DRIP reinvestment over time.",
            applicationCategory: "FinanceApplication",
            operatingSystem: "Web",
            offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
          }),
        }}
      />

      <h1 className="text-3xl md:text-4xl font-extrabold mb-4">
        Dividend <span className="gradient-text">Calculator</span>
      </h1>

      <div className="flex flex-col md:flex-row md:gap-8">
      <div className="w-full md:w-3/5">

      <div className="grid md:grid-cols-2 gap-8 mb-12">
        <div className="space-y-5">
          <div>
            <label className="block text-sm text-gray-400 mb-1">Initial Investment ($)</label>
            <input type="number" value={investment} onChange={(e) => setInvestment(Number(e.target.value))} className="w-full p-3 bg-card-bg border border-card-border rounded-lg text-white focus:border-accent-green outline-none" />
          </div>
          <div>
            <label className="block text-sm text-gray-400 mb-1">Monthly Addition ($)</label>
            <input type="number" value={monthlyAdd} onChange={(e) => setMonthlyAdd(Number(e.target.value))} className="w-full p-3 bg-card-bg border border-card-border rounded-lg text-white focus:border-accent-green outline-none" />
          </div>
          <div>
            <label className="block text-sm text-gray-400 mb-1">Dividend Yield (%)</label>
            <input type="number" value={dividendYield} onChange={(e) => setDividendYield(Number(e.target.value))} className="w-full p-3 bg-card-bg border border-card-border rounded-lg text-white focus:border-accent-green outline-none" step="0.1" />
          </div>
          <div>
            <label className="block text-sm text-gray-400 mb-1">Years</label>
            <input type="number" value={years} onChange={(e) => setYears(Number(e.target.value))} className="w-full p-3 bg-card-bg border border-card-border rounded-lg text-white focus:border-accent-green outline-none" />
          </div>
          <div>
            <label className="block text-sm text-gray-400 mb-1">Reinvest Dividends (DRIP)</label>
            <div className="flex gap-3">
              {[true, false].map((val) => (
                <button
                  key={String(val)}
                  onClick={() => setDrip(val)}
                  className={`flex-1 py-3 rounded-lg border text-sm font-semibold transition-all ${
                    drip === val
                      ? "bg-accent-green text-black border-accent-green"
                      : "bg-card-bg border-card-border text-gray-400 hover:border-accent-green/50"
                  }`}
                >
                  {val ? "DRIP On" : "DRIP Off"}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="p-6 bg-card-bg border border-card-border rounded-xl space-y-4">
          <h2 className="text-lg font-semibold mb-2">Results</h2>
          <div className="flex justify-between">
            <span className="text-gray-400">Portfolio Value</span>
            <span className="text-accent-green font-bold text-xl">${fmt(finalPortfolio)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-400">Annual Dividend Income</span>
            <span className="text-accent-green font-mono">${fmt(finalAnnualDividend)}/yr</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-400">Monthly Dividend Income</span>
            <span className="font-mono">${fmt(monthlyDividend)}/mo</span>
          </div>
          <div className="h-px bg-card-border my-2" />
          <div className="flex justify-between">
            <span className="text-gray-400">Total Dividends Earned</span>
            <span className="text-accent-green font-mono">${fmt(totalDividends)}</span>
          </div>
          <div className="h-px bg-card-border my-2" />
          <div className="flex justify-between">
            <span className="text-gray-400">Your Money</span>
            <span className="font-mono text-blue-400">${fmt(totalContributed)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-400">Growth</span>
            <span className="font-mono text-accent-green">${fmt(growthAmount)}</span>
          </div>
          {/* Stacked bar */}
          <div className="w-full bg-gray-800 rounded-full h-3 overflow-hidden">
            <div className="h-full flex">
              <div className="bg-blue-400 h-full" style={{ width: `${(totalContributed / finalPortfolio) * 100}%` }} />
              <div className="bg-accent-green h-full" style={{ width: `${(growthAmount / finalPortfolio) * 100}%` }} />
            </div>
          </div>
          <div className="flex justify-between text-[10px] text-gray-500">
            <span>You put in {Math.round((totalContributed / finalPortfolio) * 100)}%</span>
            <span>Growth did {Math.round((growthAmount / finalPortfolio) * 100)}%</span>
          </div>
        </div>
      </div>

      {/* Growth Chart */}
      <div className="mb-12 p-6 bg-card-bg border border-card-border rounded-xl">
        <h2 className="text-lg font-semibold mb-4">Portfolio Growth</h2>
        <div className="flex items-end gap-1 h-48">
          {yearlyData.map((row) => {
            const contributedAtYear = investment + (monthlyAdd * 12 * row.year);
            const growthAtYear = row.portfolio - contributedAtYear;
            const totalHeight = (row.portfolio / maxPortfolio) * 100;
            const contributedHeight = (contributedAtYear / maxPortfolio) * 100;
            const growthHeight = totalHeight - contributedHeight;
            return (
              <div key={row.year} className="flex-1 flex flex-col justify-end h-full group relative">
                <div className="absolute -top-8 left-1/2 -translate-x-1/2 hidden group-hover:block bg-gray-900 text-[10px] text-white px-2 py-1 rounded whitespace-nowrap z-10">
                  Yr {row.year}: ${fmt(row.portfolio)}
                </div>
                <div className="bg-accent-green rounded-t-sm" style={{ height: `${Math.max(growthHeight, 0)}%` }} />
                <div className="bg-blue-400" style={{ height: `${contributedHeight}%` }} />
              </div>
            );
          })}
        </div>
        <div className="flex justify-between text-[10px] text-gray-500 mt-2">
          <span>Year 1</span>
          <span>Year {years}</span>
        </div>
        <div className="flex gap-4 mt-3 text-xs text-gray-400">
          <span className="flex items-center gap-1"><span className="w-3 h-3 bg-blue-400 rounded-sm" /> Your money</span>
          <span className="flex items-center gap-1"><span className="w-3 h-3 bg-accent-green rounded-sm" /> Growth</span>
        </div>
      </div>

      {/* Yearly Table */}
      {yearlyData.length > 0 && (
        <div className="mb-12 overflow-x-auto rounded-xl border border-card-border">
          <h2 className="text-lg font-semibold p-4 bg-card-bg">Dividend Growth Schedule</h2>
          <table className="w-full text-sm">
            <thead className="bg-card-bg text-gray-400 text-xs uppercase tracking-wider">
              <tr>
                <th className="text-left p-3">Year</th>
                <th className="text-right p-3">Portfolio</th>
                <th className="text-right p-3">Annual Dividend</th>
                <th className="text-right p-3">Total Dividends</th>
              </tr>
            </thead>
            <tbody>
              {yearlyData.filter((_, i) => i % Math.max(1, Math.floor(years / 10)) === 0 || i === yearlyData.length - 1).map((row) => (
                <tr key={row.year} className="border-t border-card-border hover:bg-card-bg/50">
                  <td className="p-3">{row.year}</td>
                  <td className="p-3 text-right font-mono">${fmt(row.portfolio)}</td>
                  <td className="p-3 text-right font-mono text-accent-green">${fmt(row.annualDividend)}</td>
                  <td className="p-3 text-right font-mono">${fmt(row.totalDividends)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <AdBanner slot="in-content" size="medium-rectangle" />

      </div>

      <div className="w-full md:w-2/5 md:sticky md:top-24 md:self-start">
        <details className="md:hidden mt-8">
          <summary className="cursor-pointer text-accent-green font-semibold py-3">Learn more about dividend investing</summary>
          <div className="space-y-4 text-gray-400 leading-relaxed mt-2">
        <h2 className="text-xl font-bold text-white">Understanding Dividend Investing</h2>
        <p>
          Dividend investing is a strategy focused on buying stocks or funds that pay regular
          cash distributions to shareholders. These payments, called dividends, provide passive
          income that can either supplement your earnings or be reinvested to accelerate growth.
        </p>
        <p>
          DRIP (Dividend Reinvestment Plan) automatically reinvests your dividends back into
          more shares. Over long periods, this reinvestment creates a powerful compounding effect.
          The difference between DRIP on and off over 20-30 years can be substantial, often
          doubling or tripling your total return.
        </p>
        <p>
          Dividend yield represents the annual dividend payment as a percentage of the stock
          price. A 3% yield on a $100 stock means $3 per share annually. Yields vary widely:
          growth companies often pay little or nothing, while established companies and REITs
          may yield 3-6% or more. Be cautious of extremely high yields, as they can signal
          financial trouble.
        </p>
        <p>
          Many successful investors use dividend stocks as a cornerstone of their retirement
          strategy. A well-built dividend portfolio can provide reliable, growing income that
          keeps pace with or exceeds inflation, reducing dependence on selling assets in retirement.
        </p>
      </div>
        </details>
        <div className="hidden md:block space-y-4 text-gray-400 leading-relaxed">
        <h2 className="text-xl font-bold text-white">Understanding Dividend Investing</h2>
        <p>
          Dividend investing is a strategy focused on buying stocks or funds that pay regular
          cash distributions to shareholders. These payments, called dividends, provide passive
          income that can either supplement your earnings or be reinvested to accelerate growth.
        </p>
        <p>
          DRIP (Dividend Reinvestment Plan) automatically reinvests your dividends back into
          more shares. Over long periods, this reinvestment creates a powerful compounding effect.
          The difference between DRIP on and off over 20-30 years can be substantial, often
          doubling or tripling your total return.
        </p>
        <p>
          Dividend yield represents the annual dividend payment as a percentage of the stock
          price. A 3% yield on a $100 stock means $3 per share annually. Yields vary widely:
          growth companies often pay little or nothing, while established companies and REITs
          may yield 3-6% or more. Be cautious of extremely high yields, as they can signal
          financial trouble.
        </p>
        <p>
          Many successful investors use dividend stocks as a cornerstone of their retirement
          strategy. A well-built dividend portfolio can provide reliable, growing income that
          keeps pace with or exceeds inflation, reducing dependence on selling assets in retirement.
        </p>
      </div>
      </div>
      </div>

      <p className="text-xs text-gray-500 mt-8 max-w-3xl">
        Investments are risky, but listening to a random guy on the internet about investments is riskier. Do your own research. This calculator is for educational purposes only — not financial advice.
      </p>
    </div>
  );
}
