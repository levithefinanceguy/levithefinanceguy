import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Savings Goal Calculator",
  description: "Calculate how long it takes to reach a savings goal with adjustable monthly contributions and interest rates.",
  openGraph: {
    title: "Savings Goal Calculator | Levi The Finance Guy",
    description: "Calculate how long it takes to reach a savings goal with adjustable monthly contributions and interest rates.",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
