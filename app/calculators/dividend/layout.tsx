import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dividend Calculator",
  description: "Calculate dividend income from your investments. See annual and monthly payouts based on yield, shares, and reinvestment.",
  openGraph: {
    title: "Dividend Calculator | Levi The Finance Guy",
    description: "Calculate dividend income from your investments. See annual and monthly payouts based on yield, shares, and reinvestment.",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
