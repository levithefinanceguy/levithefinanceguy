import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "BMI Calculator",
  description:
    "Calculate your Body Mass Index and see where you fall on the healthy weight scale.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
