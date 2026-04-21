import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "FIRE Calculator",
  description: "Calculate when you can reach financial independence and retire early. Input your savings rate, expenses, and investments to find your FIRE number.",
  openGraph: {
    title: "FIRE Calculator | Levi The Finance Guy",
    description: "Calculate when you can reach financial independence and retire early. Input your savings rate, expenses, and investments to find your FIRE number.",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
