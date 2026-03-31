import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Tax Bracket Calculator",
  description:
    "See your federal marginal and effective tax rates based on your income and filing status.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
