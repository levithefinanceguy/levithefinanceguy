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
  return (
    <>
      <div className="sr-only">
        <h1>Live S&P 500 Stock Market Heatmap</h1>
        <p>
          Real-time stock market heatmap showing the top 50 S&P 500 stocks by market cap.
          Sized by market capitalization and colored by daily price change — green for gains,
          red for losses. Grouped by sector including Technology, Healthcare, Finance, Energy,
          and Consumer. Auto-refreshes with live data from Finnhub. Free alternative to Finviz
          heatmap with a cleaner mobile experience.
        </p>
      </div>
      {children}
    </>
  );
}
