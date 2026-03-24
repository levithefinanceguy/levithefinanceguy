"use client";

import { useState } from "react";
import AdBanner from "../../components/AdBanner";

function fmt(n: number) {
  return n.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

interface Debt {
  name: string;
  balance: number;
  apr: number;
  minPayment: number;
}

function calculatePayoff(debts: Debt[], extraPayment: number, method: "avalanche" | "snowball") {
  const working = debts.map((d) => ({ ...d, remaining: d.balance }));
  let months = 0;
  let totalInterest = 0;
  const maxMonths = 600;

  const sorted = method === "avalanche"
    ? [...working].sort((a, b) => b.apr - a.apr)
    : [...working].sort((a, b) => a.remaining - b.remaining);

  while (sorted.some((d) => d.remaining > 0) && months < maxMonths) {
    months++;
    let extra = extraPayment;

    for (const debt of sorted) {
      if (debt.remaining <= 0) continue;
      const interest = debt.remaining * (debt.apr / 100 / 12);
      totalInterest += interest;
      debt.remaining += interest;

      let payment = debt.minPayment + (sorted.indexOf(debt) === sorted.findIndex((d) => d.remaining > 0) ? extra : 0);
      if (payment > debt.remaining) payment = debt.remaining;

      debt.remaining -= payment;
      if (debt.remaining < 0.01) debt.remaining = 0;
    }
  }

  return { months, totalInterest };
}

export default function DebtPayoffCalculator() {
  const [debts, setDebts] = useState<Debt[]>([
    { name: "Credit Card", balance: 8000, apr: 22, minPayment: 200 },
    { name: "Car Loan", balance: 15000, apr: 6.5, minPayment: 350 },
    { name: "Student Loan", balance: 25000, apr: 5, minPayment: 280 },
  ]);
  const [extraPayment, setExtraPayment] = useState(200);

  const updateDebt = (index: number, field: keyof Debt, value: string | number) => {
    const updated = [...debts];
    if (field === "name") {
      updated[index] = { ...updated[index], [field]: value as string };
    } else {
      updated[index] = { ...updated[index], [field]: Number(value) };
    }
    setDebts(updated);
  };

  const addDebt = () => {
    setDebts([...debts, { name: `Debt ${debts.length + 1}`, balance: 5000, apr: 10, minPayment: 100 }]);
  };

  const removeDebt = (index: number) => {
    if (debts.length > 1) setDebts(debts.filter((_, i) => i !== index));
  };

  const avalanche = calculatePayoff(debts, extraPayment, "avalanche");
  const snowball = calculatePayoff(debts, extraPayment, "snowball");
  const totalDebt = debts.reduce((sum, d) => sum + d.balance, 0);

  function monthsToText(m: number) {
    if (m >= 600) return "50+ years";
    const y = Math.floor(m / 12);
    const mo = m % 12;
    return y > 0 ? `${y}y ${mo}m` : `${mo} months`;
  }

  const inputClass = "w-full p-3 bg-card-bg border border-card-border rounded-lg text-white focus:border-accent-green outline-none";

  return (
    <div className="max-w-7xl mx-auto px-4 py-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            name: "Debt Payoff Calculator",
            description: "Calculate your debt payoff date and compare avalanche vs snowball methods.",
            applicationCategory: "FinanceApplication",
            operatingSystem: "Web",
            offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
          }),
        }}
      />

      <h1 className="text-3xl md:text-4xl font-extrabold mb-4">
        Debt Payoff <span className="gradient-text">Calculator</span>
      </h1>

      <div className="flex flex-col md:flex-row md:gap-8">
      <div className="w-full md:w-3/5">

      {/* Total Debt Banner */}
      <div className="mb-8 p-6 bg-card-bg border border-card-border rounded-xl text-center">
        <p className="text-gray-400 text-sm mb-1">Total Debt</p>
        <p className="text-3xl md:text-4xl font-extrabold text-accent-red">${fmt(totalDebt)}</p>
      </div>

      {/* Debts */}
      <div className="space-y-4 mb-8">
        {debts.map((debt, i) => (
          <div key={i} className="p-4 bg-card-bg border border-card-border rounded-xl">
            <div className="flex items-center justify-between mb-3">
              <input
                type="text"
                value={debt.name}
                onChange={(e) => updateDebt(i, "name", e.target.value)}
                className="bg-transparent border-none text-white font-semibold outline-none text-lg"
              />
              {debts.length > 1 && (
                <button onClick={() => removeDebt(i)} className="text-gray-500 hover:text-accent-red text-sm">Remove</button>
              )}
            </div>
            <div className="grid grid-cols-3 gap-3">
              <div>
                <label className="block text-xs text-gray-500 mb-1">Balance ($)</label>
                <input type="number" value={debt.balance} onChange={(e) => updateDebt(i, "balance", e.target.value)} className={inputClass} />
              </div>
              <div>
                <label className="block text-xs text-gray-500 mb-1">APR (%)</label>
                <input type="number" value={debt.apr} onChange={(e) => updateDebt(i, "apr", e.target.value)} className={inputClass} step="0.1" />
              </div>
              <div>
                <label className="block text-xs text-gray-500 mb-1">Min Payment ($)</label>
                <input type="number" value={debt.minPayment} onChange={(e) => updateDebt(i, "minPayment", e.target.value)} className={inputClass} />
              </div>
            </div>
          </div>
        ))}
        <button onClick={addDebt} className="w-full py-3 border border-dashed border-card-border rounded-xl text-gray-400 hover:text-accent-green hover:border-accent-green/50 transition-all text-sm">
          + Add Another Debt
        </button>
      </div>

      <div className="mb-8">
        <label className="block text-sm text-gray-400 mb-1">Extra Monthly Payment ($)</label>
        <input type="number" value={extraPayment} onChange={(e) => setExtraPayment(Number(e.target.value))} className={inputClass} />
      </div>

      {/* Comparison */}
      <div className="grid md:grid-cols-2 gap-6 mb-12">
        <div className="p-6 bg-card-bg border border-accent-green/30 rounded-xl space-y-3">
          <h2 className="text-lg font-bold text-accent-green">Avalanche Method</h2>
          <p className="text-xs text-gray-500">Highest interest rate first</p>
          <div className="flex justify-between"><span className="text-gray-400">Payoff Time</span><span className="font-bold">{monthsToText(avalanche.months)}</span></div>
          <div className="flex justify-between"><span className="text-gray-400">Total Interest</span><span className="text-accent-red font-mono">${fmt(avalanche.totalInterest)}</span></div>
        </div>
        <div className="p-6 bg-card-bg border border-blue-500/30 rounded-xl space-y-3">
          <h2 className="text-lg font-bold text-blue-400">Snowball Method</h2>
          <p className="text-xs text-gray-500">Smallest balance first</p>
          <div className="flex justify-between"><span className="text-gray-400">Payoff Time</span><span className="font-bold">{monthsToText(snowball.months)}</span></div>
          <div className="flex justify-between"><span className="text-gray-400">Total Interest</span><span className="text-accent-red font-mono">${fmt(snowball.totalInterest)}</span></div>
        </div>
      </div>

      {avalanche.totalInterest < snowball.totalInterest && (
        <div className="mb-12 p-4 rounded-lg bg-accent-green/10 border border-accent-green/20 text-center">
          <p className="text-sm text-gray-300">
            The avalanche method saves you <span className="text-accent-green font-bold">${fmt(snowball.totalInterest - avalanche.totalInterest)}</span> in interest.
          </p>
        </div>
      )}

      <AdBanner slot="in-content" size="medium-rectangle" />

      </div>

      <div className="w-full md:w-2/5 md:sticky md:top-24 md:self-start">
        <details className="md:hidden mt-8">
          <summary className="cursor-pointer text-accent-green font-semibold py-3">Learn more about debt payoff strategies</summary>
          <div className="space-y-4 text-gray-400 leading-relaxed mt-2">
        <h2 className="text-xl font-bold text-white">Debt Payoff Strategies</h2>
        <p>
          The two most popular debt elimination strategies are the avalanche and snowball methods.
          The avalanche method targets the highest interest rate debt first, saving you the most
          money over time. The snowball method targets the smallest balance first, giving you quick
          psychological wins.
        </p>
        <p>
          Mathematically, the avalanche method always wins. By eliminating high-interest debt first,
          you reduce the total interest charges across all debts. However, the snowball method has
          its own advantage: the motivation of quickly paying off entire debts can keep you engaged
          and committed to the plan.
        </p>
        <p>
          The extra payment amount is the key accelerator. Even an additional $100-200 per month
          applied to your target debt can dramatically reduce your payoff timeline and total interest
          paid. Consider redirecting any raises, bonuses, or tax refunds directly to debt payoff.
        </p>
        <p>
          The best debt payoff method is the one you actually stick with. Choose avalanche if you
          are motivated by math and efficiency. Choose snowball if you need the dopamine hit of
          crossing debts off your list. Either way, the important thing is to have a plan and follow
          it consistently.
        </p>
      </div>
        </details>
        <div className="hidden md:block space-y-4 text-gray-400 leading-relaxed">
        <h2 className="text-xl font-bold text-white">Debt Payoff Strategies</h2>
        <p>
          The two most popular debt elimination strategies are the avalanche and snowball methods.
          The avalanche method targets the highest interest rate debt first, saving you the most
          money over time. The snowball method targets the smallest balance first, giving you quick
          psychological wins.
        </p>
        <p>
          Mathematically, the avalanche method always wins. By eliminating high-interest debt first,
          you reduce the total interest charges across all debts. However, the snowball method has
          its own advantage: the motivation of quickly paying off entire debts can keep you engaged
          and committed to the plan.
        </p>
        <p>
          The extra payment amount is the key accelerator. Even an additional $100-200 per month
          applied to your target debt can dramatically reduce your payoff timeline and total interest
          paid. Consider redirecting any raises, bonuses, or tax refunds directly to debt payoff.
        </p>
        <p>
          The best debt payoff method is the one you actually stick with. Choose avalanche if you
          are motivated by math and efficiency. Choose snowball if you need the dopamine hit of
          crossing debts off your list. Either way, the important thing is to have a plan and follow
          it consistently.
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
