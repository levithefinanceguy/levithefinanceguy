"use client";

import { useState } from "react";
import AdBanner from "../../components/AdBanner";

function fmt(n: number) {
  return n.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

export default function CompoundInterestCalculator() {
  const [initial, setInitial] = useState(10000);
  const [monthly, setMonthly] = useState(500);
  const [rate, setRate] = useState(8);
  const [years, setYears] = useState(30);

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

  // Chart
  const maxBalance = Math.max(...yearlyData.map((d) => d.balance), 1);

  return (
    <div className="max-w-7xl mx-auto px-4 py-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            name: "Compound Interest Calculator",
            description: "Calculate how your investments grow over time with compound interest.",
            applicationCategory: "FinanceApplication",
            operatingSystem: "Web",
            offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
          }),
        }}
      />

      <h1 className="text-3xl md:text-4xl font-extrabold mb-4">
        Compound Interest <span className="text-accent-green">Calculator</span>
      </h1>

      <div className="flex flex-col md:flex-row md:gap-8">
      <div className="w-full md:w-3/5">

      <div className="grid md:grid-cols-2 gap-8 mb-12">
        <div className="space-y-5">
          <div>
            <label className="block text-sm text-gray-400 mb-1">Initial Investment ($)</label>
            <input
              type="number"
              value={initial}
              onChange={(e) => setInitial(Number(e.target.value))}
              className="w-full p-3 bg-card-bg border border-card-border rounded-lg text-white focus:border-accent-green outline-none"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-400 mb-1">Monthly Contribution ($)</label>
            <input
              type="number"
              value={monthly}
              onChange={(e) => setMonthly(Number(e.target.value))}
              className="w-full p-3 bg-card-bg border border-card-border rounded-lg text-white focus:border-accent-green outline-none"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-400 mb-1">Annual Return (%)</label>
            <input
              type="number"
              value={rate}
              onChange={(e) => setRate(Number(e.target.value))}
              className="w-full p-3 bg-card-bg border border-card-border rounded-lg text-white focus:border-accent-green outline-none"
              step="0.1"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-400 mb-1">Time Period (Years)</label>
            <input
              type="number"
              value={years}
              onChange={(e) => setYears(Number(e.target.value))}
              className="w-full p-3 bg-card-bg border border-card-border rounded-lg text-white focus:border-accent-green outline-none"
            />
          </div>
        </div>

        <div className="p-6 bg-card-bg border border-card-border rounded-xl space-y-4">
          <h2 className="text-lg font-semibold mb-2">Results</h2>
          <div className="flex justify-between">
            <span className="text-gray-400">Final Amount</span>
            <span className="text-accent-green font-bold text-xl">${fmt(finalAmount)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-400">Total Contributions</span>
            <span className="font-mono">${fmt(totalContributions)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-400">Total Interest Earned</span>
            <span className="text-accent-green font-mono">${fmt(totalInterest)}</span>
          </div>
          <div className="h-px bg-card-border my-2" />
          <div className="flex justify-between text-sm">
            <span className="text-gray-400">Interest as % of Total</span>
            <span className="font-mono">
              {finalAmount > 0 ? ((totalInterest / finalAmount) * 100).toFixed(1) : 0}%
            </span>
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
                    <div
                      className="w-full bg-accent-green/30 rounded-t-sm relative"
                      style={{ height: `${height}%` }}
                    >
                      <div
                        className="absolute bottom-0 w-full bg-accent-green/60 rounded-t-sm"
                        style={{ height: `${(contribHeight / height) * 100}%` }}
                      />
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
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-sm bg-accent-green/60" /> Contributions
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-sm bg-accent-green/30" /> Interest
            </div>
          </div>
        </div>
      )}

      <AdBanner slot="in-content" size="medium-rectangle" />

      </div>

      <div className="w-full md:w-2/5 md:sticky md:top-24 md:self-start">
        <details className="md:hidden mt-8">
          <summary className="cursor-pointer text-accent-green font-semibold py-3">Learn more about compound interest</summary>
          <div className="space-y-4 text-gray-400 leading-relaxed mt-2">
        <h2 className="text-xl font-bold text-white">What Is Compound Interest?</h2>
        <p>
          Compound interest is the process of earning interest on both your original
          investment and the interest that has already accumulated. Unlike simple interest,
          which only calculates returns on the principal, compound interest accelerates
          wealth building by reinvesting earnings over time.
        </p>
        <p>
          Albert Einstein supposedly called compound interest the eighth wonder of the world.
          Whether or not the quote is real, the math is undeniable. A modest monthly
          contribution invested consistently over decades can grow into a substantial nest egg.
          The key variables are your starting amount, how much you add regularly, the rate of
          return, and most importantly, time.
        </p>
        <p>
          The earlier you start investing, the more time compound interest has to work in
          your favor. Even small amounts invested in your twenties can outperform much larger
          contributions started in your forties. This is why financial advisors consistently
          emphasize starting early. The calculator above lets you experiment with different
          scenarios to see how changing each variable affects your long-term wealth.
        </p>
        <p>
          A common benchmark is the S&P 500 historical average return of roughly 10% per
          year before inflation, or about 7% after inflation. Of course, past performance
          does not guarantee future results, and actual returns vary year to year. But using
          historical averages gives you a reasonable baseline for planning purposes.
        </p>
      </div>
        </details>
        <div className="hidden md:block space-y-4 text-gray-400 leading-relaxed">
        <h2 className="text-xl font-bold text-white">What Is Compound Interest?</h2>
        <p>
          Compound interest is the process of earning interest on both your original
          investment and the interest that has already accumulated. Unlike simple interest,
          which only calculates returns on the principal, compound interest accelerates
          wealth building by reinvesting earnings over time.
        </p>
        <p>
          Albert Einstein supposedly called compound interest the eighth wonder of the world.
          Whether or not the quote is real, the math is undeniable. A modest monthly
          contribution invested consistently over decades can grow into a substantial nest egg.
          The key variables are your starting amount, how much you add regularly, the rate of
          return, and most importantly, time.
        </p>
        <p>
          The earlier you start investing, the more time compound interest has to work in
          your favor. Even small amounts invested in your twenties can outperform much larger
          contributions started in your forties. This is why financial advisors consistently
          emphasize starting early. The calculator above lets you experiment with different
          scenarios to see how changing each variable affects your long-term wealth.
        </p>
        <p>
          A common benchmark is the S&P 500 historical average return of roughly 10% per
          year before inflation, or about 7% after inflation. Of course, past performance
          does not guarantee future results, and actual returns vary year to year. But using
          historical averages gives you a reasonable baseline for planning purposes.
        </p>
      </div>
      </div>
      </div>

      <p className="text-xs text-gray-500 mt-8 max-w-3xl">
        This calculator is for educational purposes only and is not financial advice. Results are estimates based on the inputs you provide. Consult a qualified financial advisor for personalized guidance.
      </p>
    </div>
  );
}
