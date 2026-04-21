import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Heart Rate Zone Calculator",
  description: "Calculate your target heart rate zones for fat burn, cardio, and peak performance based on your age and resting heart rate.",
  openGraph: {
    title: "Heart Rate Zone Calculator | Levi The Finance Guy",
    description: "Calculate your target heart rate zones for fat burn, cardio, and peak performance based on your age and resting heart rate.",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
