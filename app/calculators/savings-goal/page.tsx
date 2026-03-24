"use client";

import { useState } from "react";
import AdBanner from "../../components/AdBanner";

function fmt(n: number) {
  return n.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

export default function SavingsGoalCalculator() {
  const [goal, setGoal] = useState(20000);
  const [current, setCurrent] = useState(3000);
  const [months, setMonths] = useState(24);
  const [rate, setRate] = useState(4.5);

  const remaining = Math.max(goal - current, 0);
  const monthlyRate = rate / 100 / 12;

  let monthlySavings: number;
  if (monthlyRate > 0 && months > 0) {
    const fvCurrent = current * Math.pow(1 + monthlyRate, months);
    const needed = goal - fvCurrent;
    const factor = (Math.pow(1 + monthlyRate, months) - 1) / monthlyRate;
    monthlySavings = Math.max(needed / factor, 0);
  } else if (months > 0) {
    monthlySavings = remaining / months;
  } else {
    monthlySavings = remaining;
  }

  const weeklySavings = monthlySavings * 12 / 52;
  const dailySavings = monthlySavings * 12 / 365;
  const totalSaved = monthlySavings * months + current;
  const interestEarned = totalSaved - (current + monthlySavings * months) + (goal - current - monthlySavings * months + (totalSaved - goal));

  const progress = goal > 0 ? Math.min((current / goal) * 100, 100) : 0;

  const inputClass = "w-full p-3 bg-card-bg border border-card-border rounded-lg text-white focus:border-accent-green outline-none";

  return (
    <div className="max-w-4xl mx-auto px-4 py-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            name: "Savings Goal Calculator",
            description: "Calculate how much you need to save monthly to reach any financial goal on time.",
            applicationCategory: "FinanceApplication",
            operatingSystem: "Web",
            offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
          }),
        }}
      />

      <h1 className="text-3xl md:text-4xl font-extrabold mb-4">
        Savings Goal <span className="gradient-text">Calculator</span>
      </h1>

      <div className="grid md:grid-cols-2 gap-8 mb-12">
        <div className="space-y-5">
          <div>
            <label className="block text-sm text-gray-400 mb-1">Goal Amount ($)</label>
            <input type="number" value={goal} onChange={(e) => setGoal(Number(e.target.value))} className={inputClass} />
          </div>
          <div>
            <label className="block text-sm text-gray-400 mb-1">Current Savings ($)</label>
            <input type="number" value={current} onChange={(e) => setCurrent(Number(e.target.value))} className={inputClass} />
          </div>
          <div>
            <label className="block text-sm text-gray-400 mb-1">Timeline (Months)</label>
            <input type="number" value={months} onChange={(e) => setMonths(Number(e.target.value))} className={inputClass} />
          </div>
          <div>
            <label className="block text-sm text-gray-400 mb-1">Savings Account APY (%)</label>
            <input type="number" value={rate} onChange={(e) => setRate(Number(e.target.value))} className={inputClass} step="0.1" />
          </div>
        </div>

        <div className="space-y-6">
          <div className="p-6 bg-card-bg border border-card-border rounded-xl space-y-4">
            <h2 className="text-lg font-semibold mb-2">Your Savings Plan</h2>
            <div className="flex justify-between">
              <span className="text-gray-400">Save Monthly</span>
              <span className="text-accent-green font-bold text-xl">${fmt(monthlySavings)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Save Weekly</span>
              <span className="font-mono">${fmt(weeklySavings)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Save Daily</span>
              <span className="font-mono">${fmt(dailySavings)}</span>
            </div>
            <div className="h-px bg-card-border my-2" />
            <div className="flex justify-between">
              <span className="text-gray-400">Remaining to Save</span>
              <span className="font-mono">${fmt(remaining)}</span>
            </div>
          </div>

          <div className="p-6 bg-card-bg border border-card-border rounded-xl">
            <div className="flex justify-between text-sm mb-2">
              <span className="text-gray-400">Progress to Goal</span>
              <span className="font-mono">{progress.toFixed(1)}%</span>
            </div>
            <div className="w-full bg-gray-800 rounded-full h-4 overflow-hidden">
              <div className="h-full bg-gradient-to-r from-accent-green to-accent-teal rounded-full transition-all duration-500" style={{ width: `${progress}%` }} />
            </div>
            <div className="flex justify-between text-xs text-gray-500 mt-2">
              <span>${fmt(current)}</span>
              <span>${fmt(goal)}</span>
            </div>
          </div>
        </div>
      </div>

      <AdBanner slot="in-content" size="medium-rectangle" />

      <section className="mt-12 space-y-4 text-gray-400 leading-relaxed max-w-3xl">
        <h2 className="text-xl font-bold text-white">Reaching Your Savings Goals</h2>
        <p>
          Whether you are saving for a vacation, a down payment, a new car, or any other goal,
          the key is breaking it down into manageable pieces. A $20,000 goal sounds daunting. But
          $833 per month for two years? That is actionable. This calculator does that math for you.
        </p>
        <p>
          The savings account APY matters more than you might think. At 4.5% APY, your savings
          earn interest that compounds monthly, reducing how much you actually need to contribute
          yourself. High-yield savings accounts are currently offering 4-5% or more, compared to
          the near-zero rates at traditional banks.
        </p>
        <p>
          The daily savings breakdown is intentionally included. Sometimes seeing that you need to
          set aside $28 per day is more motivating than thinking about $850 per month. It reframes
          the goal as something you can influence with daily decisions about spending.
        </p>
        <p>
          Automate your savings. Set up automatic transfers to happen right after payday. Treat your
          savings contribution like a bill you have to pay. The people who successfully reach their
          savings goals are not the ones with the most willpower — they are the ones who removed the
          need for willpower through automation.
        </p>
      </section>

      <p className="text-xs text-gray-500 mt-8 max-w-3xl">
        This calculator is for educational purposes only and is not financial advice. Results are estimates based on the inputs you provide. Consult a qualified financial advisor for personalized guidance.
      </p>
    </div>
  );
}
