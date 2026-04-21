import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Mortgage Calculator",
  description: "Calculate your monthly mortgage payment and see the full amortization schedule. Compare different loan amounts, rates, and terms.",
  openGraph: {
    title: "Mortgage Calculator | Levi The Finance Guy",
    description: "Calculate your monthly mortgage payment and see the full amortization schedule. Compare different loan amounts, rates, and terms.",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
