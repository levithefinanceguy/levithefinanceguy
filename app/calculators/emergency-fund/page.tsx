"use client";

import { useState } from "react";
import AdBanner from "../../components/AdBanner";

function fmt(n: number) {
  return n.toLocaleString("en-US", { minimumFractionDigits: 0, maximumFractionDigits: 0 });
}

export default function EmergencyFundCalculator() {
  const [rent, setRent] = useState(1500);
  const [utilities, setUtilities] = useState(200);
  const [groceries, setGroceries] = useState(400);
  const [transport, setTransport] = useState(300);
  const [insurance, setInsurance] = useState(200);
  const [other, setOther] = useState(200);
  const [targetMonths, setTargetMonths] = useState(6);
  const [currentSavings, setCurrentSavings] = useState(2000);
  const [monthlySave, setMonthlySave] = useState(500);

  const monthlyExpenses = rent + utilities + groceries + transport + insurance + other;
  const goalAmount = monthlyExpenses * targetMonths;
  const remaining = Math.max(goalAmount - currentSavings, 0);
  const monthsToGoal = monthlySave > 0 ? Math.ceil(remaining / monthlySave) : Infinity;
  const progress = goalAmount > 0 ? Math.min((currentSavings / goalAmount) * 100, 100) : 0;

  const inputClass = "w-full p-3 bg-card-bg border border-card-border rounded-lg text-white focus:border-accent-green outline-none";

  return (
    <div className="max-w-4xl mx-auto px-4 py-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            name: "Emergency Fund Calculator",
            description: "Calculate your emergency fund goal and create a savings plan to build it.",
            applicationCategory: "FinanceApplication",
            operatingSystem: "Web",
            offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
          }),
        }}
      />

      <h1 className="text-3xl md:text-4xl font-extrabold mb-4">
        Emergency Fund <span className="gradient-text">Calculator</span>
      </h1>

      <div className="grid md:grid-cols-2 gap-8 mb-12">
        <div className="space-y-4">
          <h2 className="text-lg font-semibold">Monthly Expenses</h2>
          <div>
            <label className="block text-xs text-gray-500 mb-1">Rent / Mortgage ($)</label>
            <input type="number" value={rent} onChange={(e) => setRent(Number(e.target.value))} className={inputClass} />
          </div>
          <div>
            <label className="block text-xs text-gray-500 mb-1">Utilities ($)</label>
            <input type="number" value={utilities} onChange={(e) => setUtilities(Number(e.target.value))} className={inputClass} />
          </div>
          <div>
            <label className="block text-xs text-gray-500 mb-1">Groceries ($)</label>
            <input type="number" value={groceries} onChange={(e) => setGroceries(Number(e.target.value))} className={inputClass} />
          </div>
          <div>
            <label className="block text-xs text-gray-500 mb-1">Transportation ($)</label>
            <input type="number" value={transport} onChange={(e) => setTransport(Number(e.target.value))} className={inputClass} />
          </div>
          <div>
            <label className="block text-xs text-gray-500 mb-1">Insurance ($)</label>
            <input type="number" value={insurance} onChange={(e) => setInsurance(Number(e.target.value))} className={inputClass} />
          </div>
          <div>
            <label className="block text-xs text-gray-500 mb-1">Other Essentials ($)</label>
            <input type="number" value={other} onChange={(e) => setOther(Number(e.target.value))} className={inputClass} />
          </div>
          <div className="flex justify-between pt-2 border-t border-card-border">
            <span className="font-semibold">Total Monthly</span>
            <span className="text-accent-green font-bold">${fmt(monthlyExpenses)}</span>
          </div>
        </div>

        <div className="space-y-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm text-gray-400 mb-1">Target Months</label>
              <div className="flex gap-3">
                {[3, 4, 5, 6].map((m) => (
                  <button key={m} onClick={() => setTargetMonths(m)} className={`flex-1 py-3 rounded-lg border text-sm font-semibold transition-all ${targetMonths === m ? "bg-accent-green text-black border-accent-green" : "bg-card-bg border-card-border text-gray-400 hover:border-accent-green/50"}`}>
                    {m} mo
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-1">Current Savings ($)</label>
              <input type="number" value={currentSavings} onChange={(e) => setCurrentSavings(Number(e.target.value))} className={inputClass} />
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-1">Monthly Savings ($)</label>
              <input type="number" value={monthlySave} onChange={(e) => setMonthlySave(Number(e.target.value))} className={inputClass} />
            </div>
          </div>

          <div className="p-6 bg-card-bg border border-card-border rounded-xl space-y-4">
            <h2 className="text-lg font-semibold mb-2">Your Plan</h2>
            <div className="flex justify-between">
              <span className="text-gray-400">Goal Amount</span>
              <span className="text-accent-green font-bold text-xl">${fmt(goalAmount)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Still Needed</span>
              <span className="font-mono">${fmt(remaining)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Months to Goal</span>
              <span className="font-bold">{monthsToGoal === Infinity ? "N/A" : monthsToGoal === 0 ? "Done!" : `${monthsToGoal} months`}</span>
            </div>
            <div className="h-px bg-card-border my-2" />
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-gray-400">Progress</span>
                <span className="font-mono">{progress.toFixed(1)}%</span>
              </div>
              <div className="w-full bg-gray-800 rounded-full h-4 overflow-hidden">
                <div className="h-full bg-gradient-to-r from-accent-green to-accent-teal rounded-full transition-all duration-500" style={{ width: `${progress}%` }} />
              </div>
            </div>
          </div>
        </div>
      </div>

      <AdBanner slot="in-content" size="medium-rectangle" />

      <section className="mt-12 space-y-4 text-gray-400 leading-relaxed max-w-3xl">
        <h2 className="text-xl font-bold text-white">Why You Need an Emergency Fund</h2>
        <p>
          An emergency fund is your financial safety net. It protects you from going into debt
          when unexpected expenses hit — car repairs, medical bills, job loss, or home emergencies.
          Without one, a single financial surprise can snowball into credit card debt that takes
          months or years to pay off.
        </p>
        <p>
          Most financial experts recommend saving 3-6 months of essential expenses. Three months
          is reasonable if you have stable dual income and low debt. Six months is better if you
          are self-employed, single-income, or in an industry with less job security. Some people
          aim for even more if they have dependents.
        </p>
        <p>
          Keep your emergency fund in a high-yield savings account, separate from your checking
          account. This provides easy access when you need it while earning some interest. Do not
          invest your emergency fund in the stock market — the whole point is that it is safe and
          liquid when you need it most.
        </p>
        <p>
          Building an emergency fund is Step 1 of the Freedom Five framework. It is the foundation
          that everything else builds on. Even saving one month of expenses gives you breathing room
          that most people do not have. Start there and build up over time.
        </p>
      </section>
    </div>
  );
}
