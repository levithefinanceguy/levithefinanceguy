import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Retirement Calculator",
  description:
    "Estimate how much you need to save for retirement based on your age, income, and goals.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
