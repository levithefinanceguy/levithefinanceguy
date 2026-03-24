"use client";

import { useState } from "react";
import AdBanner from "../../components/AdBanner";

function fmt(n: number) {
  return n.toLocaleString("en-US", { minimumFractionDigits: 0, maximumFractionDigits: 0 });
}

export default function FIRECalculator() {
  const [currentSavings, setCurrentSavings] = useState(50000);
  const [annualIncome, setAnnualIncome] = useState(80000);
  const [annualExpenses, setAnnualExpenses] = useState(40000);
  const [expectedReturn, setExpectedReturn] = useState(7);

  const savingsRate = annualIncome > 0 ? ((annualIncome - annualExpenses) / annualIncome) * 100 : 0;
  const fireNumber = annualExpenses * 25; // 4% rule
  const annualSavings = annualIncome - annualExpenses;
  const monthlyReturn = expectedReturn / 100 / 12;
  const monthlySavings = annualSavings / 12;

  // Calculate years to FIRE
  let years = 0;
  let balance = currentSavings;
  if (annualSavings > 0 && expectedReturn >= 0) {
    while (balance < fireNumber && years < 100) {
      for (let m = 0; m < 12; m++) {
        balance = balance * (1 + monthlyReturn) + monthlySavings;
      }
      years++;
    }
  }

  const yearsToFire = years >= 100 ? Infinity : years;

  return (
    <div className="max-w-4xl mx-auto px-4 py-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            name: "FIRE Calculator",
            description: "Calculate your Financial Independence, Retire Early (FIRE) number and timeline.",
            applicationCategory: "FinanceApplication",
            operatingSystem: "Web",
            offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
          }),
        }}
      />

      <h1 className="text-3xl md:text-4xl font-extrabold mb-4">
        FIRE <span className="text-accent-green">Calculator</span>
      </h1>

      <div className="grid md:grid-cols-2 gap-8 mb-12">
        <div className="space-y-5">
          <div>
            <label className="block text-sm text-gray-400 mb-1">Current Savings ($)</label>
            <input
              type="number"
              value={currentSavings}
              onChange={(e) => setCurrentSavings(Number(e.target.value))}
              className="w-full p-3 bg-card-bg border border-card-border rounded-lg text-white focus:border-accent-green outline-none"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-400 mb-1">Annual Income ($)</label>
            <input
              type="number"
              value={annualIncome}
              onChange={(e) => setAnnualIncome(Number(e.target.value))}
              className="w-full p-3 bg-card-bg border border-card-border rounded-lg text-white focus:border-accent-green outline-none"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-400 mb-1">Annual Expenses ($)</label>
            <input
              type="number"
              value={annualExpenses}
              onChange={(e) => setAnnualExpenses(Number(e.target.value))}
              className="w-full p-3 bg-card-bg border border-card-border rounded-lg text-white focus:border-accent-green outline-none"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-400 mb-1">Expected Annual Return (%)</label>
            <input
              type="number"
              value={expectedReturn}
              onChange={(e) => setExpectedReturn(Number(e.target.value))}
              className="w-full p-3 bg-card-bg border border-card-border rounded-lg text-white focus:border-accent-green outline-none"
              step="0.1"
            />
          </div>
        </div>

        <div className="p-6 bg-card-bg border border-card-border rounded-xl space-y-4">
          <h2 className="text-lg font-semibold mb-2">Results</h2>
          <div className="flex justify-between">
            <span className="text-gray-400">FIRE Number</span>
            <span className="text-accent-green font-bold text-xl">${fmt(fireNumber)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-400">Years to FIRE</span>
            <span className="font-bold text-xl">
              {yearsToFire === Infinity ? "N/A" : `${yearsToFire} years`}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-400">Savings Rate</span>
            <span
              className={`font-bold ${savingsRate >= 50 ? "text-accent-green" : savingsRate >= 25 ? "text-yellow-400" : "text-accent-red"}`}
            >
              {savingsRate.toFixed(1)}%
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-400">Annual Savings</span>
            <span className="font-mono">${fmt(annualSavings)}</span>
          </div>
          <div className="h-px bg-card-border my-2" />
          <div className="text-xs text-gray-500">
            Based on the 4% safe withdrawal rate (25x annual expenses).
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mb-12 p-6 bg-card-bg border border-card-border rounded-xl">
        <h2 className="text-lg font-semibold mb-4">Progress to FIRE</h2>
        <div className="w-full bg-gray-800 rounded-full h-6 overflow-hidden">
          <div
            className="h-full bg-accent-green rounded-full transition-all duration-500 flex items-center justify-end pr-2"
            style={{ width: `${Math.min((currentSavings / fireNumber) * 100, 100)}%` }}
          >
            {currentSavings / fireNumber > 0.1 && (
              <span className="text-xs font-bold text-black">
                {((currentSavings / fireNumber) * 100).toFixed(1)}%
              </span>
            )}
          </div>
        </div>
        <div className="flex justify-between text-xs text-gray-500 mt-2">
          <span>${fmt(currentSavings)}</span>
          <span>${fmt(fireNumber)}</span>
        </div>
      </div>

      <AdBanner slot="in-content" size="medium-rectangle" />

      <section className="mt-12 space-y-4 text-gray-400 leading-relaxed max-w-3xl">
        <h2 className="text-xl font-bold text-white">What Is FIRE?</h2>
        <p>
          FIRE stands for Financial Independence, Retire Early. It is a movement focused on
          aggressive saving and investing so you can stop working for money much earlier than
          the traditional retirement age of 65. The core idea is simple: save a large percentage
          of your income, invest it wisely, and live off the returns.
        </p>
        <p>
          The FIRE number is calculated using the 4% rule, which comes from the Trinity Study.
          It states that if you withdraw 4% of your portfolio in the first year of retirement
          and adjust for inflation each year after, your money has a very high probability of
          lasting 30 or more years. To find your FIRE number, multiply your annual expenses by 25.
        </p>
        <p>
          Your savings rate is the single most important factor in determining how quickly you
          reach financial independence. Someone saving 50% of their income will reach FIRE
          dramatically faster than someone saving 10%, regardless of income level. This is why
          the FIRE community emphasizes reducing expenses alongside increasing income.
        </p>
        <p>
          There are different flavors of FIRE. Lean FIRE means retiring with minimal expenses.
          Fat FIRE means accumulating enough to maintain a more luxurious lifestyle. Barista FIRE
          means reaching a point where you only need a small part-time income to cover the gap.
          This calculator helps you find your number based on your current lifestyle.
        </p>
      </section>

      <p className="text-xs text-gray-500 mt-8 max-w-3xl">
        This calculator is for educational purposes only and is not financial advice. Results are estimates based on the inputs you provide. Consult a qualified financial advisor for personalized guidance.
      </p>
    </div>
  );
}
