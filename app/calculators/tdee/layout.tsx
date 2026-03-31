import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "TDEE Calculator",
  description:
    "Find your Total Daily Energy Expenditure based on age, weight, height, and activity level.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
