import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Free Financial Calculators",
  description:
    "Free interactive financial calculators: compound interest, mortgage, FIRE, net worth, retirement, BMI, TDEE, and more. Plan your financial future today.",
  openGraph: {
    title: "Free Financial Calculators | Levi The Finance Guy",
    description:
      "Interactive tools to help you plan your finances. Compound interest, mortgage, FIRE, retirement, and more.",
  },
};

const calculators = [
  {
    name: "Compound Interest",
    href: "/calculators/compound-interest",
    icon: "%",
    description: "See how your money grows over time with the power of compound interest.",
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
];

export default function CalculatorsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            name: "Free Financial Calculators",
            description:
              "A collection of free interactive financial and health calculators.",
            author: { "@type": "Person", name: "Levi" },
          }),
        }}
      />

      <div className="max-w-6xl mx-auto px-4 py-16">
        <h1 className="text-3xl md:text-4xl font-extrabold mb-4">
          Free <span className="text-accent-green">Calculators</span>
        </h1>
        <p className="text-gray-400 max-w-3xl mb-12 leading-relaxed">
          Every tool below is 100% free, works instantly in your browser, and requires no
          sign-up. Use them to plan your investments, understand your mortgage, track your
          health metrics, and more.
        </p>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {calculators.map((calc) => (
            <Link
              key={calc.href}
              href={calc.href}
              className="group p-6 rounded-xl border border-card-border bg-card-bg hover:border-accent-green/50 transition-all"
            >
              <div className="w-12 h-12 rounded-lg bg-accent-green/10 text-accent-green flex items-center justify-center text-xl font-bold mb-4 group-hover:bg-accent-green/20 transition-colors">
                {calc.icon}
              </div>
              <h2 className="text-lg font-bold mb-2 group-hover:text-accent-green transition-colors">
                {calc.name}
              </h2>
              <p className="text-gray-400 text-sm leading-relaxed">{calc.description}</p>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}
