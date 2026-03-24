"use client";

import { useState } from "react";
import AdBanner from "../../components/AdBanner";

function fmt(n: number) {
  return n.toLocaleString("en-US", { minimumFractionDigits: 0, maximumFractionDigits: 0 });
}

const businessTypes = [
  { label: "Online Business / E-commerce", value: "online" },
  { label: "Restaurant / Food Service", value: "restaurant" },
  { label: "Retail Store", value: "retail" },
  { label: "Professional Services (Consulting, etc.)", value: "services" },
  { label: "Freelance / Solopreneur", value: "freelance" },
];

const costEstimates: Record<string, {
  legal: [number, number]; licenses: [number, number]; equipment: [number, number];
  marketing: [number, number]; rent: [number, number]; insurance: [number, number];
  inventory: [number, number]; monthlyOps: [number, number]; technology: [number, number];
}> = {
  online: {
    legal: [500, 2000], licenses: [100, 500], equipment: [500, 3000],
    marketing: [1000, 5000], rent: [0, 0], insurance: [500, 2000],
    inventory: [1000, 10000], monthlyOps: [500, 3000], technology: [200, 2000],
  },
  restaurant: {
    legal: [2000, 5000], licenses: [2000, 10000], equipment: [25000, 100000],
    marketing: [3000, 10000], rent: [3000, 10000], insurance: [2000, 8000],
    inventory: [5000, 20000], monthlyOps: [15000, 50000], technology: [1000, 5000],
  },
  retail: {
    legal: [1000, 3000], licenses: [500, 3000], equipment: [5000, 30000],
    marketing: [2000, 8000], rent: [2000, 8000], insurance: [1000, 5000],
    inventory: [10000, 50000], monthlyOps: [5000, 20000], technology: [500, 3000],
  },
  services: {
    legal: [1000, 3000], licenses: [200, 2000], equipment: [1000, 10000],
    marketing: [1000, 5000], rent: [500, 3000], insurance: [1000, 3000],
    inventory: [0, 0], monthlyOps: [2000, 8000], technology: [500, 3000],
  },
  freelance: {
    legal: [200, 1000], licenses: [50, 500], equipment: [500, 3000],
    marketing: [500, 2000], rent: [0, 0], insurance: [300, 1500],
    inventory: [0, 0], monthlyOps: [500, 2000], technology: [200, 1000],
  },
};

type CostKey = "legal" | "licenses" | "equipment" | "marketing" | "rent" | "insurance" | "inventory" | "technology" | "monthlyOps";

const categoryLabels: { key: CostKey; label: string }[] = [
  { key: "legal", label: "Legal & Formation" },
  { key: "licenses", label: "Licenses & Permits" },
  { key: "equipment", label: "Equipment & Supplies" },
  { key: "marketing", label: "Initial Marketing" },
  { key: "rent", label: "First Month Rent" },
  { key: "insurance", label: "Insurance" },
  { key: "inventory", label: "Initial Inventory" },
  { key: "technology", label: "Technology & Software" },
];

export default function BusinessStartupCalculator() {
  const [businessType, setBusinessType] = useState("online");
  const [employees, setEmployees] = useState(0);
  const [monthlyRevenue, setMonthlyRevenue] = useState(5000);
  const [overrides, setOverrides] = useState<Record<string, number | null>>({});

  const costs = costEstimates[businessType];
  const employeeCost = employees * 4000;

  // Reset overrides when business type changes
  const handleTypeChange = (type: string) => {
    setBusinessType(type);
    setOverrides({});
  };

  const getAmount = (key: CostKey): number => {
    if (overrides[key] != null) return overrides[key] as number;
    return Math.round((costs[key][0] + costs[key][1]) / 2);
  };

  const isOverridden = (key: CostKey): boolean => overrides[key] != null;

  const setOverride = (key: CostKey, value: number) => {
    setOverrides((prev) => ({ ...prev, [key]: value }));
  };

  const resetOverride = (key: CostKey) => {
    setOverrides((prev) => {
      const next = { ...prev };
      delete next[key];
      return next;
    });
  };

  const categories = categoryLabels.map(({ key, label }) => ({
    key,
    label,
    amount: getAmount(key),
    defaultLow: costs[key][0],
    defaultHigh: costs[key][1],
    custom: isOverridden(key),
  }));

  const startupTotal = categories.reduce((s, c) => s + c.amount, 0);
  const monthlyOpsAmount = getAmount("monthlyOps") + employeeCost;
  const startupLow = categoryLabels.reduce((s, { key }) => s + costs[key][0], 0);
  const startupHigh = categoryLabels.reduce((s, { key }) => s + costs[key][1], 0);
  const monthlyOpsLow = costs.monthlyOps[0] + employeeCost;
  const monthlyOpsHigh = costs.monthlyOps[1] + employeeCost;

  const monthlyProfit = monthlyRevenue - monthlyOpsAmount;
  const breakEvenMonths = monthlyProfit > 0 ? Math.ceil(startupTotal / monthlyProfit) : Infinity;
  const hasAnyOverride = Object.keys(overrides).length > 0;

  return (
    <div className="max-w-7xl mx-auto px-4 py-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            name: "Business Startup Cost Calculator",
            description: "Estimate startup costs, monthly expenses, and break-even timeline for a new business.",
            applicationCategory: "FinanceApplication",
            operatingSystem: "Web",
            offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
          }),
        }}
      />

      <h1 className="text-3xl md:text-4xl font-extrabold mb-4">
        Business Startup <span className="gradient-text">Calculator</span>
      </h1>

      <div className="flex flex-col md:flex-row md:gap-8">
      <div className="w-full md:w-3/5">

      <div className="grid md:grid-cols-2 gap-8 mb-12">
        <div className="space-y-5">
          <div>
            <label className="block text-sm text-gray-400 mb-1">Business Type</label>
            <select value={businessType} onChange={(e) => handleTypeChange(e.target.value)} className="w-full p-3 bg-card-bg border border-card-border rounded-lg text-white focus:border-accent-green outline-none">
              {businessTypes.map((t) => (
                <option key={t.value} value={t.value}>{t.label}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm text-gray-400 mb-1">Number of Employees</label>
            <input type="number" value={employees} onChange={(e) => setEmployees(Number(e.target.value))} className="w-full p-3 bg-card-bg border border-card-border rounded-lg text-white focus:border-accent-green outline-none" min="0" />
          </div>
          <div>
            <label className="block text-sm text-gray-400 mb-1">Expected Monthly Revenue ($)</label>
            <input type="number" value={monthlyRevenue} onChange={(e) => setMonthlyRevenue(Number(e.target.value))} className="w-full p-3 bg-card-bg border border-card-border rounded-lg text-white focus:border-accent-green outline-none" />
          </div>
        </div>

        <div className="space-y-4">
          <div className="p-6 bg-card-bg border border-card-border rounded-xl space-y-3">
            <h2 className="text-lg font-semibold">Summary</h2>
            <div className="flex justify-between">
              <span className="text-gray-400">Startup Costs</span>
              <span className="text-accent-green font-bold">{hasAnyOverride ? `$${fmt(startupTotal)}` : `$${fmt(startupLow)} - $${fmt(startupHigh)}`}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Monthly Operating</span>
              <span className="font-mono">{hasAnyOverride ? `$${fmt(monthlyOpsAmount)}` : `$${fmt(monthlyOpsLow)} - $${fmt(monthlyOpsHigh)}`}</span>
            </div>
            {employees > 0 && (
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">Employee Costs</span>
                <span className="font-mono">${fmt(employeeCost)}/mo</span>
              </div>
            )}
            <div className="h-px bg-card-border my-2" />
            <div className="flex justify-between">
              <span className="text-gray-400">Break-Even</span>
              <span className="font-bold">{breakEvenMonths === Infinity ? "N/A" : `~${breakEvenMonths} months`}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Est. Monthly Profit</span>
              <span className={`font-mono ${monthlyProfit >= 0 ? "text-accent-green" : "text-accent-red"}`}>
                ${fmt(monthlyProfit)}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Cost Breakdown — editable */}
      <div className="mb-12 p-6 bg-card-bg border border-card-border rounded-xl">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Startup Cost Breakdown</h2>
          {hasAnyOverride && (
            <button onClick={() => setOverrides({})} className="text-xs text-gray-500 hover:text-accent-green transition-colors">
              Reset to defaults
            </button>
          )}
        </div>
        <p className="text-xs text-gray-500 mb-4">Click any amount to customize it for your situation.</p>
        <div className="space-y-3">
          {categories.filter((c) => c.defaultHigh > 0 || c.custom).map((cat) => (
            <div key={cat.key}>
              <div className="flex justify-between items-center text-sm mb-1">
                <span className="text-gray-400">{cat.label}</span>
                <div className="flex items-center gap-2">
                  {cat.custom ? (
                    <>
                      <span className="text-[10px] text-gray-600">was ${fmt(cat.defaultLow)}-${fmt(cat.defaultHigh)}</span>
                      <input
                        type="number"
                        value={cat.amount}
                        onChange={(e) => setOverride(cat.key, Number(e.target.value))}
                        className="w-24 px-2 py-1 bg-gray-800 border border-accent-green/50 rounded text-right text-accent-green font-mono text-sm outline-none focus:border-accent-green"
                      />
                      <button onClick={() => resetOverride(cat.key)} className="text-gray-600 hover:text-gray-400 text-xs">✕</button>
                    </>
                  ) : (
                    <button
                      onClick={() => setOverride(cat.key, Math.round((cat.defaultLow + cat.defaultHigh) / 2))}
                      className="font-mono hover:text-accent-green transition-colors cursor-pointer"
                    >
                      ${fmt(cat.defaultLow)} - ${fmt(cat.defaultHigh)}
                    </button>
                  )}
                </div>
              </div>
              <div className="w-full bg-gray-800 rounded-full h-2">
                <div
                  className={`h-full rounded-full ${cat.custom ? "bg-accent-green" : "bg-gradient-to-r from-accent-green to-accent-teal"}`}
                  style={{ width: `${startupTotal > 0 ? (cat.amount / startupTotal) * 100 : 0}%` }}
                />
              </div>
            </div>
          ))}
          {/* Monthly operations */}
          <div className="pt-2 border-t border-card-border mt-2">
            <div className="flex justify-between items-center text-sm mb-1">
              <span className="text-gray-400">Monthly Operations</span>
              <div className="flex items-center gap-2">
                {isOverridden("monthlyOps") ? (
                  <>
                    <span className="text-[10px] text-gray-600">was ${fmt(costs.monthlyOps[0])}-${fmt(costs.monthlyOps[1])}</span>
                    <input
                      type="number"
                      value={getAmount("monthlyOps")}
                      onChange={(e) => setOverride("monthlyOps", Number(e.target.value))}
                      className="w-24 px-2 py-1 bg-gray-800 border border-accent-green/50 rounded text-right text-accent-green font-mono text-sm outline-none focus:border-accent-green"
                    />
                    <button onClick={() => resetOverride("monthlyOps")} className="text-gray-600 hover:text-gray-400 text-xs">✕</button>
                  </>
                ) : (
                  <button
                    onClick={() => setOverride("monthlyOps", Math.round((costs.monthlyOps[0] + costs.monthlyOps[1]) / 2))}
                    className="font-mono hover:text-accent-green transition-colors cursor-pointer"
                  >
                    ${fmt(costs.monthlyOps[0])} - ${fmt(costs.monthlyOps[1])}/mo
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <AdBanner slot="in-content" size="medium-rectangle" />

      </div>

      <div className="w-full md:w-2/5 md:sticky md:top-24 md:self-start">
        <details className="md:hidden mt-8">
          <summary className="cursor-pointer text-accent-green font-semibold py-3">Learn more about business startup costs</summary>
          <div className="space-y-4 text-gray-400 leading-relaxed mt-2">
        <h2 className="text-xl font-bold text-white">Planning Your Business Startup</h2>
        <p>
          Starting a business requires careful financial planning. Many new businesses fail not
          because of a bad idea, but because they run out of cash. Understanding your startup costs
          and ongoing monthly expenses before you launch gives you a realistic picture of how much
          capital you need and how long until profitability.
        </p>
        <p>
          Startup costs vary dramatically by industry. An online business can launch for a few
          thousand dollars, while a restaurant might require six figures in upfront capital. This
          calculator provides industry-based estimates to give you a ballpark. Always add a 20-30%
          buffer for unexpected expenses — they will happen.
        </p>
        <p>
          The break-even timeline tells you how long it will take for your business to recoup its
          startup investment from monthly profits. Most small businesses take 12-24 months to break
          even. Plan to have enough personal savings or alternative income to cover your living
          expenses during this period.
        </p>
        <p>
          Before spending money on a business, validate your idea. Talk to potential customers,
          create a minimum viable product, and test demand. The cheapest businesses to start are
          often the smartest — they let you prove the concept before scaling up investment.
        </p>
      </div>
        </details>
        <div className="hidden md:block space-y-4 text-gray-400 leading-relaxed">
        <h2 className="text-xl font-bold text-white">Planning Your Business Startup</h2>
        <p>
          Starting a business requires careful financial planning. Many new businesses fail not
          because of a bad idea, but because they run out of cash. Understanding your startup costs
          and ongoing monthly expenses before you launch gives you a realistic picture of how much
          capital you need and how long until profitability.
        </p>
        <p>
          Startup costs vary dramatically by industry. An online business can launch for a few
          thousand dollars, while a restaurant might require six figures in upfront capital. This
          calculator provides industry-based estimates to give you a ballpark. Always add a 20-30%
          buffer for unexpected expenses — they will happen.
        </p>
        <p>
          The break-even timeline tells you how long it will take for your business to recoup its
          startup investment from monthly profits. Most small businesses take 12-24 months to break
          even. Plan to have enough personal savings or alternative income to cover your living
          expenses during this period.
        </p>
        <p>
          Before spending money on a business, validate your idea. Talk to potential customers,
          create a minimum viable product, and test demand. The cheapest businesses to start are
          often the smartest — they let you prove the concept before scaling up investment.
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
