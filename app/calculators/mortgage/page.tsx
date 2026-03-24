"use client";

import { useState } from "react";
import AdBanner from "../../components/AdBanner";

function fmt(n: number) {
  return n.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

export default function MortgageCalculator() {
  const [homePrice, setHomePrice] = useState(400000);
  const [downPct, setDownPct] = useState(20);
  const [interestRate, setInterestRate] = useState(6.5);
  const [termYears, setTermYears] = useState(30);

  const downPayment = homePrice * (downPct / 100);
  const principal = homePrice - downPayment;
  const monthlyRate = interestRate / 100 / 12;
  const numPayments = termYears * 12;

  let monthlyPayment = 0;
  if (monthlyRate > 0) {
    monthlyPayment =
      (principal * (monthlyRate * Math.pow(1 + monthlyRate, numPayments))) /
      (Math.pow(1 + monthlyRate, numPayments) - 1);
  } else {
    monthlyPayment = principal / numPayments;
  }

  const totalCost = monthlyPayment * numPayments;
  const totalInterest = totalCost - principal;

  // Amortization (yearly summary)
  const amortization: { year: number; principalPaid: number; interestPaid: number; balance: number }[] = [];
  let balance = principal;
  let yearPrincipal = 0;
  let yearInterest = 0;

  for (let m = 1; m <= numPayments; m++) {
    const intPayment = balance * monthlyRate;
    const princPayment = monthlyPayment - intPayment;
    balance -= princPayment;
    yearPrincipal += princPayment;
    yearInterest += intPayment;

    if (m % 12 === 0) {
      amortization.push({
        year: m / 12,
        principalPaid: yearPrincipal,
        interestPaid: yearInterest,
        balance: Math.max(balance, 0),
      });
      yearPrincipal = 0;
      yearInterest = 0;
    }
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            name: "Mortgage Calculator",
            description: "Calculate monthly mortgage payments, total interest, and amortization schedule.",
            applicationCategory: "FinanceApplication",
            operatingSystem: "Web",
            offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
          }),
        }}
      />

      <h1 className="text-3xl md:text-4xl font-extrabold mb-4">
        Mortgage <span className="text-accent-green">Calculator</span>
      </h1>

      <div className="flex flex-col md:flex-row md:gap-8">
      <div className="w-full md:w-3/5">

      <div className="grid md:grid-cols-2 gap-8 mb-12">
        <div className="space-y-5">
          <div>
            <label className="block text-sm text-gray-400 mb-1">Home Price ($)</label>
            <input
              type="number"
              value={homePrice}
              onChange={(e) => setHomePrice(Number(e.target.value))}
              className="w-full p-3 bg-card-bg border border-card-border rounded-lg text-white focus:border-accent-green outline-none"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-400 mb-1">Down Payment (%)</label>
            <input
              type="number"
              value={downPct}
              onChange={(e) => setDownPct(Number(e.target.value))}
              className="w-full p-3 bg-card-bg border border-card-border rounded-lg text-white focus:border-accent-green outline-none"
              step="1"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-400 mb-1">Interest Rate (%)</label>
            <input
              type="number"
              value={interestRate}
              onChange={(e) => setInterestRate(Number(e.target.value))}
              className="w-full p-3 bg-card-bg border border-card-border rounded-lg text-white focus:border-accent-green outline-none"
              step="0.1"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-400 mb-1">Loan Term (Years)</label>
            <div className="flex gap-3">
              {[15, 20, 30].map((t) => (
                <button
                  key={t}
                  onClick={() => setTermYears(t)}
                  className={`flex-1 py-3 rounded-lg border text-sm font-semibold transition-all ${
                    termYears === t
                      ? "bg-accent-green text-black border-accent-green"
                      : "bg-card-bg border-card-border text-gray-400 hover:border-accent-green/50"
                  }`}
                >
                  {t} yr
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="p-6 bg-card-bg border border-card-border rounded-xl space-y-4">
          <h2 className="text-lg font-semibold mb-2">Results</h2>
          <div className="flex justify-between">
            <span className="text-gray-400">Monthly Payment</span>
            <span className="text-accent-green font-bold text-xl">${fmt(monthlyPayment)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-400">Down Payment</span>
            <span className="font-mono">${fmt(downPayment)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-400">Loan Amount</span>
            <span className="font-mono">${fmt(principal)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-400">Total Interest</span>
            <span className="text-accent-red font-mono">${fmt(totalInterest)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-400">Total Cost</span>
            <span className="font-mono">${fmt(totalCost + downPayment)}</span>
          </div>
        </div>
      </div>

      {/* Amortization */}
      {amortization.length > 0 && (
        <div className="mb-12 overflow-x-auto rounded-xl border border-card-border">
          <h2 className="text-lg font-semibold p-4 bg-card-bg">Amortization Schedule (Yearly)</h2>
          <table className="w-full text-sm">
            <thead className="bg-card-bg text-gray-400 text-xs uppercase tracking-wider">
              <tr>
                <th className="text-left p-3">Year</th>
                <th className="text-right p-3">Principal Paid</th>
                <th className="text-right p-3">Interest Paid</th>
                <th className="text-right p-3">Remaining Balance</th>
              </tr>
            </thead>
            <tbody>
              {amortization.map((row) => (
                <tr key={row.year} className="border-t border-card-border hover:bg-card-bg/50">
                  <td className="p-3">{row.year}</td>
                  <td className="p-3 text-right font-mono text-accent-green">${fmt(row.principalPaid)}</td>
                  <td className="p-3 text-right font-mono text-accent-red">${fmt(row.interestPaid)}</td>
                  <td className="p-3 text-right font-mono">${fmt(row.balance)}</td>
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
          <summary className="cursor-pointer text-accent-green font-semibold py-3">Learn more about mortgages</summary>
          <div className="space-y-4 text-gray-400 leading-relaxed mt-2">
        <h2 className="text-xl font-bold text-white">Understanding Your Mortgage</h2>
        <p>
          A mortgage is likely the largest financial commitment you will ever make. Understanding
          the true cost of your home loan is crucial for making informed decisions. This calculator
          breaks down your monthly payment and shows you how much of each payment goes toward
          principal versus interest over the life of the loan.
        </p>
        <p>
          The amortization schedule above reveals an important truth: in the early years of your
          mortgage, the majority of your payment goes toward interest, not principal. Over time,
          this ratio shifts. Making extra principal payments early on can save you tens of
          thousands of dollars in interest and shave years off your mortgage.
        </p>
        <p>
          Your down payment percentage affects more than just the loan amount. Putting down less
          than 20% typically requires private mortgage insurance (PMI), which adds to your monthly
          cost. A larger down payment also means lower monthly payments and less total interest
          paid over the life of the loan.
        </p>
        <p>
          When comparing mortgage offers, do not just look at the interest rate. Consider the
          Annual Percentage Rate (APR), which includes fees and other costs. Also compare the
          total interest paid over the loan term, as a shorter loan at a slightly higher rate can
          sometimes cost less overall than a longer loan at a lower rate.
        </p>
      </div>
        </details>
        <div className="hidden md:block space-y-4 text-gray-400 leading-relaxed">
        <h2 className="text-xl font-bold text-white">Understanding Your Mortgage</h2>
        <p>
          A mortgage is likely the largest financial commitment you will ever make. Understanding
          the true cost of your home loan is crucial for making informed decisions. This calculator
          breaks down your monthly payment and shows you how much of each payment goes toward
          principal versus interest over the life of the loan.
        </p>
        <p>
          The amortization schedule above reveals an important truth: in the early years of your
          mortgage, the majority of your payment goes toward interest, not principal. Over time,
          this ratio shifts. Making extra principal payments early on can save you tens of
          thousands of dollars in interest and shave years off your mortgage.
        </p>
        <p>
          Your down payment percentage affects more than just the loan amount. Putting down less
          than 20% typically requires private mortgage insurance (PMI), which adds to your monthly
          cost. A larger down payment also means lower monthly payments and less total interest
          paid over the life of the loan.
        </p>
        <p>
          When comparing mortgage offers, do not just look at the interest rate. Consider the
          Annual Percentage Rate (APR), which includes fees and other costs. Also compare the
          total interest paid over the loan term, as a shorter loan at a slightly higher rate can
          sometimes cost less overall than a longer loan at a lower rate.
        </p>
      </div>
      </div>
      </div>

      <p className="text-xs text-gray-500 mt-8 max-w-3xl">
        Investments are risky, but treating what a random guy on the internet says as financial advice is riskier. Do your own research. This is for educational purposes only.
      </p>
    </div>
  );
}
