import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Body Fat Calculator",
  description:
    "Estimate your body fat percentage using the Navy method with simple measurements.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
