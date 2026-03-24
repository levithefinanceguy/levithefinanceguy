"use client";

import { useState } from "react";
import AdBanner from "../../components/AdBanner";

function fmt(n: number) {
  return n.toLocaleString("en-US", { minimumFractionDigits: 0, maximumFractionDigits: 0 });
}

export default function NetWorthCalculator() {
  const [cash, setCash] = useState(15000);
  const [investments, setInvestments] = useState(50000);
  const [property, setProperty] = useState(300000);
  const [vehicles, setVehicles] = useState(25000);

  const [mortgage, setMortgage] = useState(240000);
  const [studentLoans, setStudentLoans] = useState(30000);
  const [creditCards, setCreditCards] = useState(5000);
  const [otherDebt, setOtherDebt] = useState(0);

  const totalAssets = cash + investments + property + vehicles;
  const totalLiabilities = mortgage + studentLoans + creditCards + otherDebt;
  const netWorth = totalAssets - totalLiabilities;

  const assetBreakdown = [
    { label: "Cash & Savings", value: cash, color: "#2ECC71" },
    { label: "Investments", value: investments, color: "#3498DB" },
    { label: "Property", value: property, color: "#9B59B6" },
    { label: "Vehicles", value: vehicles, color: "#E67E22" },
  ];

  const liabilityBreakdown = [
    { label: "Mortgage", value: mortgage, color: "#E74C3C" },
    { label: "Student Loans", value: studentLoans, color: "#E67E22" },
    { label: "Credit Cards", value: creditCards, color: "#F39C12" },
    { label: "Other Debt", value: otherDebt, color: "#95A5A6" },
  ];

  const inputClass =
    "w-full p-3 bg-card-bg border border-card-border rounded-lg text-white focus:border-accent-green outline-none";

  return (
    <div className="max-w-4xl mx-auto px-4 py-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            name: "Net Worth Calculator",
            description: "Calculate your total net worth by listing your assets and liabilities.",
            applicationCategory: "FinanceApplication",
            operatingSystem: "Web",
            offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
          }),
        }}
      />

      <h1 className="text-3xl md:text-4xl font-extrabold mb-4">
        Net Worth <span className="text-accent-green">Calculator</span>
      </h1>

      {/* Result Banner */}
      <div className="mb-8 p-6 bg-card-bg border border-card-border rounded-xl text-center">
        <p className="text-gray-400 text-sm mb-1">Your Net Worth</p>
        <p
          className={`text-3xl md:text-4xl font-extrabold ${
            netWorth >= 0 ? "text-accent-green" : "text-accent-red"
          }`}
        >
          ${fmt(netWorth)}
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8 mb-12">
        {/* Assets */}
        <div>
          <h2 className="text-lg font-bold mb-4 text-accent-green">Assets</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm text-gray-400 mb-1">Cash & Savings ($)</label>
              <input type="number" value={cash} onChange={(e) => setCash(Number(e.target.value))} className={inputClass} />
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-1">Investments ($)</label>
              <input type="number" value={investments} onChange={(e) => setInvestments(Number(e.target.value))} className={inputClass} />
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-1">Property ($)</label>
              <input type="number" value={property} onChange={(e) => setProperty(Number(e.target.value))} className={inputClass} />
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-1">Vehicles ($)</label>
              <input type="number" value={vehicles} onChange={(e) => setVehicles(Number(e.target.value))} className={inputClass} />
            </div>
            <div className="flex justify-between pt-2 border-t border-card-border">
              <span className="font-semibold">Total Assets</span>
              <span className="text-accent-green font-bold">${fmt(totalAssets)}</span>
            </div>
          </div>
        </div>

        {/* Liabilities */}
        <div>
          <h2 className="text-lg font-bold mb-4 text-accent-red">Liabilities</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm text-gray-400 mb-1">Mortgage ($)</label>
              <input type="number" value={mortgage} onChange={(e) => setMortgage(Number(e.target.value))} className={inputClass} />
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-1">Student Loans ($)</label>
              <input type="number" value={studentLoans} onChange={(e) => setStudentLoans(Number(e.target.value))} className={inputClass} />
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-1">Credit Cards ($)</label>
              <input type="number" value={creditCards} onChange={(e) => setCreditCards(Number(e.target.value))} className={inputClass} />
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-1">Other Debt ($)</label>
              <input type="number" value={otherDebt} onChange={(e) => setOtherDebt(Number(e.target.value))} className={inputClass} />
            </div>
            <div className="flex justify-between pt-2 border-t border-card-border">
              <span className="font-semibold">Total Liabilities</span>
              <span className="text-accent-red font-bold">${fmt(totalLiabilities)}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Breakdown Bars */}
      <div className="grid md:grid-cols-2 gap-8 mb-12">
        <div className="p-6 bg-card-bg border border-card-border rounded-xl">
          <h3 className="text-sm font-semibold text-gray-400 mb-4">Asset Breakdown</h3>
          {assetBreakdown.map((item) => (
            <div key={item.label} className="mb-3">
              <div className="flex justify-between text-sm mb-1">
                <span>{item.label}</span>
                <span className="font-mono">${fmt(item.value)}</span>
              </div>
              <div className="w-full bg-gray-800 rounded-full h-2">
                <div
                  className="h-full rounded-full"
                  style={{
                    width: `${totalAssets > 0 ? (item.value / totalAssets) * 100 : 0}%`,
                    backgroundColor: item.color,
                  }}
                />
              </div>
            </div>
          ))}
        </div>
        <div className="p-6 bg-card-bg border border-card-border rounded-xl">
          <h3 className="text-sm font-semibold text-gray-400 mb-4">Liability Breakdown</h3>
          {liabilityBreakdown.map((item) => (
            <div key={item.label} className="mb-3">
              <div className="flex justify-between text-sm mb-1">
                <span>{item.label}</span>
                <span className="font-mono">${fmt(item.value)}</span>
              </div>
              <div className="w-full bg-gray-800 rounded-full h-2">
                <div
                  className="h-full rounded-full"
                  style={{
                    width: `${totalLiabilities > 0 ? (item.value / totalLiabilities) * 100 : 0}%`,
                    backgroundColor: item.color,
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      <AdBanner slot="in-content" size="medium-rectangle" />

      <section className="mt-12 space-y-4 text-gray-400 leading-relaxed max-w-3xl">
        <h2 className="text-xl font-bold text-white">Why Track Your Net Worth?</h2>
        <p>
          Your net worth is the single best snapshot of your overall financial health. It is
          simply the total value of everything you own minus everything you owe. Unlike income
          alone, net worth captures the full picture of your financial position, including
          savings, investments, property, and all outstanding debts.
        </p>
        <p>
          Tracking net worth over time is more valuable than any single calculation. By
          monitoring it monthly or quarterly, you can see whether your financial decisions are
          actually moving you forward. A growing net worth means your wealth-building strategies
          are working. A declining net worth is an early warning sign to reassess spending and
          debt management.
        </p>
        <p>
          Many people are surprised when they first calculate their net worth. High income does
          not always mean high net worth if spending and debt are equally high. Conversely, people
          with modest incomes can build substantial net worth through consistent saving and
          investing. The book The Millionaire Next Door found that most millionaires are not
          flashy spenders but disciplined savers.
        </p>
        <p>
          Use this calculator as your starting point. Record today&apos;s number, then come
          back in three months and recalculate. The trend matters more than the number itself.
        </p>
      </section>
    </div>
  );
}
