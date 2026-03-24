import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "The Freedom Five Framework",
  description:
    "A five-step framework for building financial independence. From one month of savings to wealth optimization. No complexity, no BS.",
  openGraph: {
    title: "The Freedom Five Framework | Levi The Finance Guy",
    description:
      "Five steps from financial stress to financial freedom. A clear, actionable path to building wealth.",
  },
};

export default function FreedomFiveLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
