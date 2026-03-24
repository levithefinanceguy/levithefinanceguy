import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Free Financial & Health Calculators",
  description:
    "18 free interactive calculators: compound interest, investment growth, mortgage, FIRE, net worth, retirement, debt payoff, tax brackets, BMI, TDEE, and more.",
  openGraph: {
    title: "Free Financial & Health Calculators | Levi The Finance Guy",
    description:
      "Interactive tools to help you plan your finances and track your health. All free, no sign-up required.",
  },
};

const financeCalculators = [
  {
    name: "Compound Interest",
    href: "/calculators/compound-interest",
    icon: "%",
    description: "See how your money grows over time with the power of compound interest.",
  },
  {
    name: "Investment Growth",
    href: "/calculators/investment-growth",
    icon: "G",
    description: "Project investment growth with initial amount, monthly contributions, and returns.",
  },
  {
    name: "Dividend",
    href: "/calculators/dividend",
    icon: "D",
    description: "Calculate projected dividend income with optional DRIP reinvestment.",
  },
  {
    name: "Mortgage",
    href: "/calculators/mortgage",
    icon: "H",
    description: "Calculate monthly payments, total interest, and explore amortization schedules.",
  },
  {
    name: "FIRE",
    href: "/calculators/fire",
    icon: "F",
    description: "Find your Financial Independence number and how many years until you can retire early.",
  },
  {
    name: "Net Worth",
    href: "/calculators/net-worth",
    icon: "$",
    description: "Add up your assets and liabilities to calculate your total net worth.",
  },
  {
    name: "Retirement",
    href: "/calculators/retirement",
    icon: "R",
    description: "Estimate how much you will have saved by retirement and your monthly income.",
  },
  {
    name: "Debt Payoff",
    href: "/calculators/debt-payoff",
    icon: "X",
    description: "Find your payoff date, total interest, and compare avalanche vs snowball methods.",
  },
  {
    name: "Emergency Fund",
    href: "/calculators/emergency-fund",
    icon: "E",
    description: "Calculate your emergency fund goal and build a savings plan to get there.",
  },
  {
    name: "Savings Goal",
    href: "/calculators/savings-goal",
    icon: "S",
    description: "Figure out how much you need to save monthly to reach any financial goal.",
  },
  {
    name: "Auto Loan",
    href: "/calculators/auto-loan",
    icon: "A",
    description: "Calculate monthly car payments, total cost, and the true price of financing.",
  },
  {
    name: "Tax Bracket",
    href: "/calculators/tax-bracket",
    icon: "T",
    description: "See your effective rate, marginal rate, and how much you owe per bracket.",
  },
  {
    name: "Business Startup",
    href: "/calculators/business-startup",
    icon: "B",
    description: "Estimate startup costs, monthly expenses, and break-even for a new business.",
  },
];

const healthCalculators = [
  {
    name: "BMI",
    href: "/calculators/bmi",
    icon: "B",
    description: "Calculate your Body Mass Index and see where you fall on the health scale.",
  },
  {
    name: "TDEE",
    href: "/calculators/tdee",
    icon: "T",
    description: "Find your Total Daily Energy Expenditure and recommended macro breakdown.",
  },
{
    name: "Body Fat Estimator",
    href: "/calculators/body-fat",
    icon: "BF",
    description: "Estimate your body fat percentage using simple body measurements.",
  },
  {
    name: "Ideal Weight",
    href: "/calculators/ideal-weight",
    icon: "IW",
    description: "Find your ideal weight range using multiple clinical formulas.",
  },
  {
    name: "Heart Rate Zones",
    href: "/calculators/heart-rate-zones",
    icon: "HR",
    description: "Calculate your 5 training heart rate zones for optimal workouts.",
  },
];

function CalculatorCard({ calc }: { calc: (typeof financeCalculators)[0] }) {
  return (
    <Link
      href={calc.href}
      className="group p-6 rounded-xl glass-card transition-all duration-300 hover:scale-[1.02]"
    >
      <div className="w-12 h-12 rounded-lg bg-accent-green/10 flex items-center justify-center text-xl font-bold mb-4 group-hover:bg-accent-green/20 transition-colors">
        <span className="gradient-text">{calc.icon}</span>
      </div>
      <h2 className="text-lg font-bold mb-2 group-hover:text-accent-green transition-colors">
        {calc.name}
      </h2>
      <p className="text-gray-400 text-sm leading-relaxed">{calc.description}</p>
    </Link>
  );
}

export default function CalculatorsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            name: "Free Financial & Health Calculators",
            description:
              "A collection of 18 free interactive financial and health calculators.",
            author: { "@type": "Person", name: "Levi" },
          }),
        }}
      />

      <div className="max-w-6xl mx-auto px-4 py-16">
        <div className="animate-fade-in-up">
          <h1 className="text-3xl md:text-4xl font-extrabold mb-4">
            Free <span className="gradient-text">Calculators</span>
          </h1>
          <p className="text-gray-400 max-w-3xl mb-12 leading-relaxed">
            Every tool below is 100% free, works instantly in your browser, and requires no
            sign-up. Use them to plan your investments, understand your mortgage, track your
            health metrics, and more.
          </p>
        </div>

        {/* Finance Calculators */}
        <div className="mb-16">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-8 h-8 rounded-lg bg-accent-green/10 flex items-center justify-center">
              <span className="gradient-text font-bold text-sm">$</span>
            </div>
            <h2 className="text-xl font-bold">Finance Calculators</h2>
            <span className="text-xs text-gray-500 bg-card-bg px-2 py-1 rounded-full">{financeCalculators.length}</span>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 stagger-children">
            {financeCalculators.map((calc) => (
              <CalculatorCard key={calc.href} calc={calc} />
            ))}
          </div>
        </div>

        {/* Health Calculators */}
        <div>
          <div className="flex items-center gap-3 mb-8">
            <div className="w-8 h-8 rounded-lg bg-blue-500/10 flex items-center justify-center">
              <span className="text-blue-400 font-bold text-sm">+</span>
            </div>
            <h2 className="text-xl font-bold">Health Calculators</h2>
            <span className="text-xs text-gray-500 bg-card-bg px-2 py-1 rounded-full">{healthCalculators.length}</span>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 stagger-children">
            {healthCalculators.map((calc) => (
              <CalculatorCard key={calc.href} calc={calc} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
