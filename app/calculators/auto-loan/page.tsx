"use client";

import { useState } from "react";
import AdBanner from "../../components/AdBanner";

function fmt(n: number) {
  return n.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

export default function AutoLoanCalculator() {
  const [price, setPrice] = useState(35000);
  const [downPayment, setDownPayment] = useState(5000);
  const [tradeIn, setTradeIn] = useState(0);
  const [rate, setRate] = useState(6.5);
  const [termMonths, setTermMonths] = useState(60);

  const loanAmount = Math.max(price - downPayment - tradeIn, 0);
  const monthlyRate = rate / 100 / 12;

  let monthlyPayment = 0;
  if (monthlyRate > 0 && termMonths > 0) {
    monthlyPayment = (loanAmount * (monthlyRate * Math.pow(1 + monthlyRate, termMonths))) / (Math.pow(1 + monthlyRate, termMonths) - 1);
  } else if (termMonths > 0) {
    monthlyPayment = loanAmount / termMonths;
  }

  const totalCost = monthlyPayment * termMonths;
  const totalInterest = totalCost - loanAmount;
  const totalOutOfPocket = totalCost + downPayment + tradeIn;

  return (
    <div className="max-w-7xl mx-auto px-4 py-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            name: "Auto Loan Calculator",
            description: "Calculate monthly car payments, total cost, and true price of financing a vehicle.",
            applicationCategory: "FinanceApplication",
            operatingSystem: "Web",
            offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
          }),
        }}
      />

      <h1 className="text-3xl md:text-4xl font-extrabold mb-4">
        Auto Loan <span className="gradient-text">Calculator</span>
      </h1>

      <div className="flex flex-col md:flex-row md:gap-8">
      <div className="w-full md:w-3/5">

      <div className="grid md:grid-cols-2 gap-8 mb-12">
        <div className="space-y-5">
          <div>
            <label className="block text-sm text-gray-400 mb-1">Vehicle Price ($)</label>
            <input type="number" value={price} onChange={(e) => setPrice(Number(e.target.value))} className="w-full p-3 bg-card-bg border border-card-border rounded-lg text-white focus:border-accent-green outline-none" />
          </div>
          <div>
            <label className="block text-sm text-gray-400 mb-1">Down Payment ($)</label>
            <input type="number" value={downPayment} onChange={(e) => setDownPayment(Number(e.target.value))} className="w-full p-3 bg-card-bg border border-card-border rounded-lg text-white focus:border-accent-green outline-none" />
          </div>
          <div>
            <label className="block text-sm text-gray-400 mb-1">Trade-In Value ($)</label>
            <input type="number" value={tradeIn} onChange={(e) => setTradeIn(Number(e.target.value))} className="w-full p-3 bg-card-bg border border-card-border rounded-lg text-white focus:border-accent-green outline-none" />
          </div>
          <div>
            <label className="block text-sm text-gray-400 mb-1">Interest Rate (%)</label>
            <input type="number" value={rate} onChange={(e) => setRate(Number(e.target.value))} className="w-full p-3 bg-card-bg border border-card-border rounded-lg text-white focus:border-accent-green outline-none" step="0.1" />
          </div>
          <div>
            <label className="block text-sm text-gray-400 mb-1">Loan Term</label>
            <div className="flex gap-3">
              {[36, 48, 60, 72, 84].map((t) => (
                <button key={t} onClick={() => setTermMonths(t)} className={`flex-1 py-3 rounded-lg border text-sm font-semibold transition-all ${termMonths === t ? "bg-accent-green text-black border-accent-green" : "bg-card-bg border-card-border text-gray-400 hover:border-accent-green/50"}`}>
                  {t / 12}yr
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
            <span className="text-gray-400">Loan Amount</span>
            <span className="font-mono">${fmt(loanAmount)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-400">Total Interest</span>
            <span className="text-accent-red font-mono">${fmt(totalInterest)}</span>
          </div>
          <div className="h-px bg-card-border my-2" />
          <div className="flex justify-between">
            <span className="text-gray-400">Total Loan Cost</span>
            <span className="font-mono">${fmt(totalCost)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-400">Total Out of Pocket</span>
            <span className="font-mono">${fmt(totalOutOfPocket)}</span>
          </div>
          <div className="h-px bg-card-border my-2" />
          <div className="text-xs text-gray-500">
            A {termMonths / 12}-year loan at {rate}% adds ${fmt(totalInterest)} to the price of the car.
          </div>
        </div>
      </div>

      <AdBanner slot="in-content" size="medium-rectangle" />

      </div>

      <div className="w-full md:w-2/5 md:sticky md:top-24 md:self-start">
        <details className="md:hidden mt-8">
          <summary className="cursor-pointer text-accent-green font-semibold py-3">Learn more about auto loans</summary>
          <div className="space-y-4 text-gray-400 leading-relaxed mt-2">
        <h2 className="text-xl font-bold text-white">The True Cost of Car Financing</h2>
        <p>
          Cars are depreciating assets. The moment you drive off the lot, your vehicle loses value.
          When you finance a depreciating asset, you are paying interest on something that is
          worth less every month. Understanding the true cost of auto financing helps you make
          smarter decisions about how much car you can actually afford.
        </p>
        <p>
          Longer loan terms reduce your monthly payment but dramatically increase total interest
          paid. A 72-month loan might seem attractive because of the lower payment, but you could
          end up owing more than the car is worth for years — a situation called being underwater.
          Shorter terms cost more monthly but save significantly on interest.
        </p>
        <p>
          A good rule of thumb is the 20/4/10 rule: put at least 20% down, finance for no more
          than 4 years, and keep total transportation costs under 10% of your gross income. This
          includes the payment, insurance, gas, and maintenance. Following this guideline prevents
          you from becoming car poor.
        </p>
        <p>
          The best auto loan is no auto loan. If you can save up and pay cash for a reliable used
          car, you avoid interest entirely and maintain flexibility. But if financing is necessary,
          get pre-approved from your bank or credit union before visiting the dealership. Dealer
          financing often carries higher rates than what you can find on your own.
        </p>
      </div>
        </details>
        <div className="hidden md:block space-y-4 text-gray-400 leading-relaxed">
        <h2 className="text-xl font-bold text-white">The True Cost of Car Financing</h2>
        <p>
          Cars are depreciating assets. The moment you drive off the lot, your vehicle loses value.
          When you finance a depreciating asset, you are paying interest on something that is
          worth less every month. Understanding the true cost of auto financing helps you make
          smarter decisions about how much car you can actually afford.
        </p>
        <p>
          Longer loan terms reduce your monthly payment but dramatically increase total interest
          paid. A 72-month loan might seem attractive because of the lower payment, but you could
          end up owing more than the car is worth for years — a situation called being underwater.
          Shorter terms cost more monthly but save significantly on interest.
        </p>
        <p>
          A good rule of thumb is the 20/4/10 rule: put at least 20% down, finance for no more
          than 4 years, and keep total transportation costs under 10% of your gross income. This
          includes the payment, insurance, gas, and maintenance. Following this guideline prevents
          you from becoming car poor.
        </p>
        <p>
          The best auto loan is no auto loan. If you can save up and pay cash for a reliable used
          car, you avoid interest entirely and maintain flexibility. But if financing is necessary,
          get pre-approved from your bank or credit union before visiting the dealership. Dealer
          financing often carries higher rates than what you can find on your own.
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
