import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Ideal Weight Calculator",
  description: "Calculate your ideal weight range based on height, frame size, and gender using multiple medical formulas.",
  openGraph: {
    title: "Ideal Weight Calculator | Levi The Finance Guy",
    description: "Calculate your ideal weight range based on height, frame size, and gender using multiple medical formulas.",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
