import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Retirement Calculator",
  description: "Estimate how much you need to retire comfortably. Factor in Social Security, inflation, and your desired lifestyle.",
  openGraph: {
    title: "Retirement Calculator | Levi The Finance Guy",
    description: "Estimate how much you need to retire comfortably. Factor in Social Security, inflation, and your desired lifestyle.",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
