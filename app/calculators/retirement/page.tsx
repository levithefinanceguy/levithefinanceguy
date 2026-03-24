"use client";

import { useState } from "react";
import AdBanner from "../../components/AdBanner";

function fmt(n: number) {
  return n.toLocaleString("en-US", { minimumFractionDigits: 0, maximumFractionDigits: 0 });
}

export default function RetirementCalculator() {
  const [currentAge, setCurrentAge] = useState(30);
  const [retirementAge, setRetirementAge] = useState(65);
  const [currentSavings, setCurrentSavings] = useState(50000);
  const [monthlyContribution, setMonthlyContribution] = useState(1000);
  const [expectedReturn, setExpectedReturn] = useState(7);

  const yearsToRetirement = Math.max(retirementAge - currentAge, 0);
  const months = yearsToRetirement * 12;
  const monthlyRate = expectedReturn / 100 / 12;

  let balance = currentSavings;
  for (let m = 0; m < months; m++) {
    balance = balance * (1 + monthlyRate) + monthlyContribution;
  }

  const retirementSavings = balance;
  // 4% rule for monthly income
  const annualIncome = retirementSavings * 0.04;
  const monthlyIncome = annualIncome / 12;
  const totalContributions = currentSavings + monthlyContribution * months;
  const totalGrowth = retirementSavings - totalContributions;

  return (
    <div className="max-w-4xl mx-auto px-4 py-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            name: "Retirement Calculator",
            description: "Estimate your retirement savings and monthly income based on your current plan.",
            applicationCategory: "FinanceApplication",
            operatingSystem: "Web",
            offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
          }),
        }}
      />

      <h1 className="text-3xl md:text-4xl font-extrabold mb-4">
        Retirement <span className="text-accent-green">Calculator</span>
      </h1>

      <div className="grid md:grid-cols-2 gap-8 mb-12">
        <div className="space-y-5">
          <div>
            <label className="block text-sm text-gray-400 mb-1">Current Age</label>
            <input
              type="number"
              value={currentAge}
              onChange={(e) => setCurrentAge(Number(e.target.value))}
              className="w-full p-3 bg-card-bg border border-card-border rounded-lg text-white focus:border-accent-green outline-none"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-400 mb-1">Retirement Age</label>
            <input
              type="number"
              value={retirementAge}
              onChange={(e) => setRetirementAge(Number(e.target.value))}
              className="w-full p-3 bg-card-bg border border-card-border rounded-lg text-white focus:border-accent-green outline-none"
            />
          </div>
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
            <label className="block text-sm text-gray-400 mb-1">Monthly Contribution ($)</label>
            <input
              type="number"
              value={monthlyContribution}
              onChange={(e) => setMonthlyContribution(Number(e.target.value))}
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
            <span className="text-gray-400">Retirement Savings</span>
            <span className="text-accent-green font-bold text-xl">${fmt(retirementSavings)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-400">Monthly Income (4% rule)</span>
            <span className="text-accent-green font-bold text-lg">${fmt(monthlyIncome)}/mo</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-400">Annual Income (4% rule)</span>
            <span className="font-mono">${fmt(annualIncome)}/yr</span>
          </div>
          <div className="h-px bg-card-border my-2" />
          <div className="flex justify-between">
            <span className="text-gray-400">Years to Retirement</span>
            <span className="font-mono">{yearsToRetirement}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-400">Total Contributions</span>
            <span className="font-mono">${fmt(totalContributions)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-400">Investment Growth</span>
            <span className="text-accent-green font-mono">${fmt(totalGrowth)}</span>
          </div>
        </div>
      </div>

      <AdBanner slot="in-content" size="medium-rectangle" />

      <section className="mt-12 space-y-4 text-gray-400 leading-relaxed max-w-3xl">
        <h2 className="text-xl font-bold text-white">Planning for Retirement</h2>
        <p>
          Retirement planning is one of the most important financial exercises you can do.
          The earlier you start, the less you need to save each month thanks to compound
          interest. This calculator shows you how your current savings plan will grow over
          time and what kind of income you can expect in retirement.
        </p>
        <p>
          The monthly income estimate uses the 4% safe withdrawal rate, which is based on
          the Trinity Study. This research found that withdrawing 4% of your portfolio in
          the first year of retirement (and adjusting for inflation each subsequent year)
          gives you a very high probability of your money lasting at least 30 years.
        </p>
        <p>
          Key factors that affect your retirement outcome include when you start saving, how
          much you contribute, and your investment returns. Increasing your monthly contribution
          by even a small amount can make a significant difference over decades. For example,
          an extra $200 per month over 35 years at 7% returns adds over $400,000 to your
          retirement fund.
        </p>
        <p>
          Do not forget to account for inflation. While investments grow, the purchasing power
          of money decreases over time. Using a return rate of 7% (roughly the historical
          stock market average minus inflation) gives you results in today&apos;s dollars, making
          it easier to understand what your future savings will actually be worth.
        </p>
      </section>

      <p className="text-xs text-gray-500 mt-8 max-w-3xl">
        This calculator is for educational purposes only and is not financial advice. Results are estimates based on the inputs you provide. Consult a qualified financial advisor for personalized guidance.
      </p>
    </div>
  );
}
