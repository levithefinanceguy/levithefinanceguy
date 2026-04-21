import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "TDEE Calculator",
  description: "Calculate how many calories you burn per day based on your age, weight, height, and activity level.",
  openGraph: {
    title: "TDEE Calculator | Levi The Finance Guy",
    description: "Calculate how many calories you burn per day based on your age, weight, height, and activity level.",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
