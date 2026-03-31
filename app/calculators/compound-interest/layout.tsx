import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Compound Interest Calculator",
  description:
    "Free tool to calculate how your money grows over time with compound interest. See projections with monthly or yearly compounding.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
