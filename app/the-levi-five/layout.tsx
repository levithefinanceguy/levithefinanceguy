import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "The Levi Five Framework",
  description:
    "A five-step framework for building financial independence. From one month of savings to wealth optimization.",
  openGraph: {
    title: "The Levi Five Framework | Levi The Finance Guy",
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
