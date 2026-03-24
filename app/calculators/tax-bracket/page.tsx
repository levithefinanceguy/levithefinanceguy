"use client";

import { useState } from "react";
import AdBanner from "../../components/AdBanner";

function fmt(n: number) {
  return n.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

const brackets2024 = {
  single: [
    { min: 0, max: 11600, rate: 10 },
    { min: 11600, max: 47150, rate: 12 },
    { min: 47150, max: 100525, rate: 22 },
    { min: 100525, max: 191950, rate: 24 },
    { min: 191950, max: 243725, rate: 32 },
    { min: 243725, max: 609350, rate: 35 },
    { min: 609350, max: Infinity, rate: 37 },
  ],
  married: [
    { min: 0, max: 23200, rate: 10 },
    { min: 23200, max: 94300, rate: 12 },
    { min: 94300, max: 201050, rate: 22 },
    { min: 201050, max: 383900, rate: 24 },
    { min: 383900, max: 487450, rate: 32 },
    { min: 487450, max: 731200, rate: 35 },
    { min: 731200, max: Infinity, rate: 37 },
  ],
  head: [
    { min: 0, max: 16550, rate: 10 },
    { min: 16550, max: 63100, rate: 12 },
    { min: 63100, max: 100500, rate: 22 },
    { min: 100500, max: 191950, rate: 24 },
    { min: 191950, max: 243700, rate: 32 },
    { min: 243700, max: 609350, rate: 35 },
    { min: 609350, max: Infinity, rate: 37 },
  ],
};

const standardDeductions: Record<string, number> = {
  single: 14600,
  married: 29200,
  head: 21900,
};

type FilingStatus = "single" | "married" | "head";

export default function TaxBracketCalculator() {
  const [income, setIncome] = useState(85000);
  const [filingStatus, setFilingStatus] = useState<FilingStatus>("single");
  const [useStandard, setUseStandard] = useState(true);
  const [customDeduction, setCustomDeduction] = useState(14600);

  const deduction = useStandard ? standardDeductions[filingStatus] : customDeduction;
  const taxableIncome = Math.max(income - deduction, 0);
  const brackets = brackets2024[filingStatus];

  let totalTax = 0;
  const breakdown: { rate: number; min: number; max: number; taxable: number; tax: number }[] = [];

  for (const bracket of brackets) {
    if (taxableIncome <= bracket.min) break;
    const taxableInBracket = Math.min(taxableIncome, bracket.max) - bracket.min;
    const tax = taxableInBracket * (bracket.rate / 100);
    totalTax += tax;
    breakdown.push({
      rate: bracket.rate,
      min: bracket.min,
      max: bracket.max,
      taxable: taxableInBracket,
      tax,
    });
  }

  const effectiveRate = income > 0 ? (totalTax / income) * 100 : 0;
  const marginalRate = breakdown.length > 0 ? breakdown[breakdown.length - 1].rate : 0;
  const afterTax = income - totalTax;

  const statusLabels: Record<string, string> = {
    single: "Single",
    married: "Married Filing Jointly",
    head: "Head of Household",
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            name: "Tax Bracket Calculator",
            description: "Calculate your effective tax rate, marginal rate, and tax owed per federal bracket.",
            applicationCategory: "FinanceApplication",
            operatingSystem: "Web",
            offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
          }),
        }}
      />

      <h1 className="text-3xl md:text-4xl font-extrabold mb-4">
        Tax Bracket <span className="gradient-text">Calculator</span>
      </h1>

      <div className="grid md:grid-cols-2 gap-8 mb-12">
        <div className="space-y-5">
          <div>
            <label className="block text-sm text-gray-400 mb-1">Gross Annual Income ($)</label>
            <input type="number" value={income} onChange={(e) => setIncome(Number(e.target.value))} className="w-full p-3 bg-card-bg border border-card-border rounded-lg text-white focus:border-accent-green outline-none" />
          </div>
          <div>
            <label className="block text-sm text-gray-400 mb-1">Filing Status</label>
            <div className="flex gap-2">
              {(["single", "married", "head"] as FilingStatus[]).map((s) => (
                <button key={s} onClick={() => setFilingStatus(s)} className={`flex-1 py-3 rounded-lg border text-xs font-semibold transition-all ${filingStatus === s ? "bg-accent-green text-black border-accent-green" : "bg-card-bg border-card-border text-gray-400 hover:border-accent-green/50"}`}>
                  {statusLabels[s]}
                </button>
              ))}
            </div>
          </div>
          <div>
            <label className="block text-sm text-gray-400 mb-1">Deduction</label>
            <div className="flex gap-3 mb-2">
              <button onClick={() => setUseStandard(true)} className={`flex-1 py-2 rounded-lg border text-sm font-semibold transition-all ${useStandard ? "bg-accent-green text-black border-accent-green" : "bg-card-bg border-card-border text-gray-400"}`}>
                Standard (${fmt(standardDeductions[filingStatus])})
              </button>
              <button onClick={() => setUseStandard(false)} className={`flex-1 py-2 rounded-lg border text-sm font-semibold transition-all ${!useStandard ? "bg-accent-green text-black border-accent-green" : "bg-card-bg border-card-border text-gray-400"}`}>
                Custom
              </button>
            </div>
            {!useStandard && (
              <input type="number" value={customDeduction} onChange={(e) => setCustomDeduction(Number(e.target.value))} className="w-full p-3 bg-card-bg border border-card-border rounded-lg text-white focus:border-accent-green outline-none" />
            )}
          </div>
        </div>

        <div className="p-6 bg-card-bg border border-card-border rounded-xl space-y-4">
          <h2 className="text-lg font-semibold mb-2">Results</h2>
          <div className="flex justify-between">
            <span className="text-gray-400">Federal Tax Owed</span>
            <span className="text-accent-red font-bold text-xl">${fmt(totalTax)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-400">Effective Rate</span>
            <span className="font-bold text-lg">{effectiveRate.toFixed(2)}%</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-400">Marginal Rate</span>
            <span className="font-mono">{marginalRate}%</span>
          </div>
          <div className="h-px bg-card-border my-2" />
          <div className="flex justify-between">
            <span className="text-gray-400">Taxable Income</span>
            <span className="font-mono">${fmt(taxableIncome)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-400">After-Tax Income</span>
            <span className="text-accent-green font-mono">${fmt(afterTax)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-400">Monthly After-Tax</span>
            <span className="font-mono">${fmt(afterTax / 12)}</span>
          </div>
        </div>
      </div>

      {/* Bracket Breakdown */}
      {breakdown.length > 0 && (
        <div className="mb-12 overflow-x-auto rounded-xl border border-card-border">
          <h2 className="text-lg font-semibold p-4 bg-card-bg">Tax Owed Per Bracket</h2>
          <table className="w-full text-sm">
            <thead className="bg-card-bg text-gray-400 text-xs uppercase tracking-wider">
              <tr>
                <th className="text-left p-3">Bracket</th>
                <th className="text-right p-3">Rate</th>
                <th className="text-right p-3">Taxable Amount</th>
                <th className="text-right p-3">Tax Owed</th>
              </tr>
            </thead>
            <tbody>
              {breakdown.map((b) => (
                <tr key={b.rate} className="border-t border-card-border hover:bg-card-bg/50">
                  <td className="p-3">${fmt(b.min)} - {b.max === Infinity ? "+" : `$${fmt(b.max)}`}</td>
                  <td className="p-3 text-right font-mono">{b.rate}%</td>
                  <td className="p-3 text-right font-mono">${fmt(b.taxable)}</td>
                  <td className="p-3 text-right font-mono text-accent-red">${fmt(b.tax)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <AdBanner slot="in-content" size="medium-rectangle" />

      <section className="mt-12 space-y-4 text-gray-400 leading-relaxed max-w-3xl">
        <h2 className="text-xl font-bold text-white">Understanding Tax Brackets</h2>
        <p>
          The US uses a progressive tax system, meaning different portions of your income are
          taxed at different rates. A common misconception is that moving into a higher tax bracket
          means all your income is taxed at the higher rate. In reality, only the income within
          each bracket is taxed at that bracket&apos;s rate.
        </p>
        <p>
          Your marginal tax rate is the rate on your last dollar of income. Your effective tax rate
          is the actual percentage of your total income that goes to federal taxes. The effective
          rate is always lower than the marginal rate because of how progressive taxation works.
          Understanding this distinction prevents irrational fear of earning more money.
        </p>
        <p>
          The standard deduction reduces your taxable income before bracket calculations begin.
          For 2024, the standard deduction is $14,600 for single filers, $29,200 for married
          filing jointly, and $21,900 for head of household. Most taxpayers benefit from taking
          the standard deduction unless their itemized deductions exceed these amounts.
        </p>
        <p>
          Remember that this calculator shows federal income tax only. Your total tax burden
          also includes state income tax (varies by state), FICA taxes (Social Security and
          Medicare at 7.65%), and potentially local taxes. Use this as a starting point for
          understanding your federal tax situation.
        </p>
      </section>
    </div>
  );
}
