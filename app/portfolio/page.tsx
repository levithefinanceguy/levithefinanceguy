import type { Metadata } from "next";
import ClientOnly from "./ClientOnly";
import PortfolioClient from "./PortfolioClient";

export const metadata: Metadata = {
  title: "My Public Investment Portfolio",
  description:
    "View Levi's real investment portfolio with full transparency. See every holding, purchase price, current value, and gain/loss. Updated regularly.",
  openGraph: {
    title: "Public Investment Portfolio | Levi The Finance Guy",
    description:
      "Full transparency. See every stock, ETF, and holding in Levi's real portfolio with gain/loss tracking.",
  },
};

function LoadingSkeleton() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-16 animate-pulse">
      <div className="mb-16 p-8 rounded-xl bg-card-bg border border-card-border text-center">
        <div className="h-6 w-32 bg-gray-800 rounded mx-auto mb-4"></div>
        <div className="h-12 w-64 bg-gray-800 rounded mx-auto mb-4"></div>
        <div className="h-4 w-96 bg-gray-800 rounded mx-auto mb-8"></div>
        <div className="h-4 w-full max-w-lg bg-gray-800 rounded mx-auto"></div>
      </div>
      <div className="h-8 w-64 bg-gray-800 rounded mb-4"></div>
      <div className="h-[300px] bg-gray-800/50 rounded-xl mb-12"></div>
      <div className="grid md:grid-cols-2 gap-8 mb-12">
        <div className="h-64 bg-gray-800/50 rounded-xl"></div>
        <div className="h-64 bg-gray-800/50 rounded-xl"></div>
      </div>
    </div>
  );
}

export default function PortfolioPage() {
  return (
    <ClientOnly fallback={<LoadingSkeleton />}>
      <PortfolioClient />
    </ClientOnly>
  );
}
