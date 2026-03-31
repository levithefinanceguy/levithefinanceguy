import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Debt Payoff Calculator",
  description:
    "Compare snowball vs avalanche strategies and see when you'll be debt-free.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
