import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Auto Loan Calculator",
  description:
    "Estimate your monthly car payment and total interest for any vehicle loan.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
