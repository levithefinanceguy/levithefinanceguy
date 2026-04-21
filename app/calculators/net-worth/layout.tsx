import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Net Worth Calculator",
  description: "Calculate your net worth by adding up assets and subtracting liabilities. Track your financial progress over time.",
  openGraph: {
    title: "Net Worth Calculator | Levi The Finance Guy",
    description: "Calculate your net worth by adding up assets and subtracting liabilities. Track your financial progress over time.",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
