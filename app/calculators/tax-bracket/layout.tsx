import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Tax Bracket Calculator 2026",
  description: "Find your federal tax bracket and calculate your effective tax rate. See exactly how much you owe at each income level.",
  openGraph: {
    title: "Tax Bracket Calculator 2026 | Levi The Finance Guy",
    description: "Find your federal tax bracket and calculate your effective tax rate. See exactly how much you owe at each income level.",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
