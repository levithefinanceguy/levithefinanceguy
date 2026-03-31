import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Investment Growth Calculator",
  description:
    "Project your portfolio value over time with regular contributions, dividends, and compound returns.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
