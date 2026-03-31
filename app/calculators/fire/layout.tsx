import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "FIRE Calculator",
  description:
    "Find out when you can reach financial independence and retire early based on your savings rate and expenses.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
