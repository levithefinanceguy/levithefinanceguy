import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Business Startup Cost Calculator",
  description: "Estimate the costs of starting a business. Plan for equipment, licensing, marketing, and operating expenses.",
  openGraph: {
    title: "Business Startup Cost Calculator | Levi The Finance Guy",
    description: "Estimate the costs of starting a business. Plan for equipment, licensing, marketing, and operating expenses.",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
