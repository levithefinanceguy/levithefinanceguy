import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Ideal Weight Calculator",
  description:
    "Find your healthy weight range based on height, age, and body frame.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
