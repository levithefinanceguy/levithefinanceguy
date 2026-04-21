import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Compound Interest Calculator",
  description: "Calculate how your investments grow over time with compound interest. See the power of consistent contributions and long-term growth.",
  openGraph: {
    title: "Compound Interest Calculator | Levi The Finance Guy",
    description: "Calculate how your investments grow over time with compound interest. See the power of consistent contributions and long-term growth.",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
