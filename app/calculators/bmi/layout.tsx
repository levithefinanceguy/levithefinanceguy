import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "BMI Calculator",
  description: "Calculate your Body Mass Index and see where you fall on the BMI scale. Understand what your number means for your health.",
  openGraph: {
    title: "BMI Calculator | Levi The Finance Guy",
    description: "Calculate your Body Mass Index and see where you fall on the BMI scale. Understand what your number means for your health.",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
