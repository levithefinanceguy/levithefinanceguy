import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Emergency Fund Calculator",
  description:
    "Find out how many months of expenses you have saved and how much more you need.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
