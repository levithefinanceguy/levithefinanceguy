import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Mortgage Calculator",
  description:
    "Calculate your monthly payment, total interest, and amortization schedule for any home loan.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
