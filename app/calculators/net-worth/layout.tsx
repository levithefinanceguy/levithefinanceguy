import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Net Worth Calculator",
  description:
    "Add up your assets and liabilities to see your total net worth and track progress over time.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
