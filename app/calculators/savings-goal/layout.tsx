import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Savings Goal Calculator",
  description:
    "Calculate how long it will take to reach your savings target with regular deposits.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
