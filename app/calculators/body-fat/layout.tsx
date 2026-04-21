import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Body Fat Percentage Calculator",
  description: "Estimate your body fat percentage using the US Navy method. Track your body composition progress over time.",
  openGraph: {
    title: "Body Fat Percentage Calculator | Levi The Finance Guy",
    description: "Estimate your body fat percentage using the US Navy method. Track your body composition progress over time.",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
