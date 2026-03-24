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

export default function BusinessStartupCalculator() {
  const [businessType, setBusinessType] = useState("online");
  const [employees, setEmployees] = useState(0);
  const [monthlyRevenue, setMonthlyRevenue] = useState(5000);

  const costs = costEstimates[businessType];
  const employeeCost = employees * 4000; // avg monthly cost per employee

  const categories = [
    { label: "Legal & Formation", low: costs.legal[0], high: costs.legal[1] },
    { label: "Licenses & Permits", low: costs.licenses[0], high: costs.licenses[1] },
    { label: "Equipment & Supplies", low: costs.equipment[0], high: costs.equipment[1] },
    { label: "Initial Marketing", low: costs.marketing[0], high: costs.marketing[1] },
    { label: "First Month Rent", low: costs.rent[0], high: costs.rent[1] },
    { label: "Insurance", low: costs.insurance[0], high: costs.insurance[1] },
    { label: "Initial Inventory", low: costs.inventory[0], high: costs.inventory[1] },
    { label: "Technology & Software", low: costs.technology[0], high: costs.technology[1] },
  ];

  const startupLow = categories.reduce((s, c) => s + c.low, 0);
  const startupHigh = categories.reduce((s, c) => s + c.high, 0);
  const monthlyOpsLow = costs.monthlyOps[0] + employeeCost;
  const monthlyOpsHigh = costs.monthlyOps[1] + employeeCost;

  const avgStartup = (startupLow + startupHigh) / 2;
  const avgMonthly = (monthlyOpsLow + monthlyOpsHigh) / 2;
  const monthlyProfit = monthlyRevenue - avgMonthly;
  const breakEvenMonths = monthlyProfit > 0 ? Math.ceil(avgStartup / monthlyProfit) : Infinity;

  return (
    <div className="max-w-4xl mx-auto px-4 py-16">
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

      <div className="grid md:grid-cols-2 gap-8 mb-12">
        <div className="space-y-5">
          <div>
            <label className="block text-sm text-gray-400 mb-1">Business Type</label>
            <select value={businessType} onChange={(e) => setBusinessType(e.target.value)} className="w-full p-3 bg-card-bg border border-card-border rounded-lg text-white focus:border-accent-green outline-none">
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
              <span className="text-accent-green font-bold">${fmt(startupLow)} - ${fmt(startupHigh)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Monthly Operating</span>
              <span className="font-mono">${fmt(monthlyOpsLow)} - ${fmt(monthlyOpsHigh)}</span>
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

      {/* Cost Breakdown */}
      <div className="mb-12 p-6 bg-card-bg border border-card-border rounded-xl">
        <h2 className="text-lg font-semibold mb-4">Startup Cost Breakdown</h2>
        <div className="space-y-3">
          {categories.filter((c) => c.high > 0).map((cat) => (
            <div key={cat.label}>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-gray-400">{cat.label}</span>
                <span className="font-mono">${fmt(cat.low)} - ${fmt(cat.high)}</span>
              </div>
              <div className="w-full bg-gray-800 rounded-full h-2">
                <div className="h-full rounded-full bg-gradient-to-r from-accent-green to-accent-teal" style={{ width: `${startupHigh > 0 ? (cat.high / startupHigh) * 100 : 0}%` }} />
              </div>
            </div>
          ))}
        </div>
      </div>

      <AdBanner slot="in-content" size="medium-rectangle" />

      <section className="mt-12 space-y-4 text-gray-400 leading-relaxed max-w-3xl">
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
      </section>

      <p className="text-xs text-gray-500 mt-8 max-w-3xl">
        This calculator is for educational purposes only and is not financial advice. Results are estimates based on the inputs you provide. Consult a qualified financial advisor for personalized guidance.
      </p>
    </div>
  );
}
