import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dividend Calculator",
  description:
    "Estimate your annual dividend income based on yield, shares, and reinvestment strategy.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
