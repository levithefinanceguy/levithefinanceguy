import type { Metadata } from "next";
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

export default function PortfolioPage() {
  return (
    <div suppressHydrationWarning>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            name: "Public Investment Portfolio",
            description:
              "Levi's real investment portfolio with full transparency and gain/loss tracking.",
            author: { "@type": "Person", name: "Levi" },
          }),
        }}
      />
      <PortfolioClient />
    </div>
  );
}
