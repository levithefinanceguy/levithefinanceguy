import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Business Startup Cost Calculator",
  description:
    "Estimate your startup costs and runway to plan your new business budget.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
