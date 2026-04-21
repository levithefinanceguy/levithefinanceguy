import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Investment Growth Calculator",
  description: "Project your investment portfolio growth over time with adjustable contributions, returns, and time horizon.",
  openGraph: {
    title: "Investment Growth Calculator | Levi The Finance Guy",
    description: "Project your investment portfolio growth over time with adjustable contributions, returns, and time horizon.",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
