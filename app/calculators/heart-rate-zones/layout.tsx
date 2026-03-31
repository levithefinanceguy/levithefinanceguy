import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Heart Rate Zones Calculator",
  description:
    "Calculate your training zones for fat burn, cardio, and peak performance.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
