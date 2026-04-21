import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Debt Payoff Calculator",
  description: "Create a debt payoff plan using avalanche or snowball method. See how extra payments accelerate your debt freedom date.",
  openGraph: {
    title: "Debt Payoff Calculator | Levi The Finance Guy",
    description: "Create a debt payoff plan using avalanche or snowball method. See how extra payments accelerate your debt freedom date.",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
