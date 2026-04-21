import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Emergency Fund Calculator",
  description: "Figure out exactly how much emergency fund you need based on your monthly expenses and risk factors.",
  openGraph: {
    title: "Emergency Fund Calculator | Levi The Finance Guy",
    description: "Figure out exactly how much emergency fund you need based on your monthly expenses and risk factors.",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
