import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Auto Loan Calculator",
  description: "Calculate monthly car payments and total interest. Compare different loan terms and down payment amounts.",
  openGraph: {
    title: "Auto Loan Calculator | Levi The Finance Guy",
    description: "Calculate monthly car payments and total interest. Compare different loan terms and down payment amounts.",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
