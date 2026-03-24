import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "S&P 500 Market Heatmap",
  description:
    "Live S&P 500 heatmap showing top 50 stocks by market cap. Colored by daily price change, grouped by sector. Free, auto-refreshing stock market visualization.",
  keywords: [
    "stock market heatmap",
    "S&P 500 heatmap",
    "stock market visualization",
    "market cap heatmap",
    "stock prices today",
    "sector performance",
    "finviz heatmap alternative",
  ],
  openGraph: {
    title: "S&P 500 Market Heatmap | Levi The Finance Guy",
    description:
      "Live heatmap of top 50 S&P 500 stocks by market cap. Green for gains, red for losses. Auto-refreshes every 5 minutes.",
    url: "https://levithefinanceguy.com/heatmap",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "S&P 500 Market Heatmap",
    description:
      "Live heatmap of top 50 S&P 500 stocks. Sized by market cap, colored by daily change.",
  },
};

export default function HeatmapLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
