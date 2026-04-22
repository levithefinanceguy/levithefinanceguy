"use client";

import { useEffect } from "react";

export default function PortfolioError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Portfolio error:", error);
  }, [error]);

  return (
    <div className="max-w-6xl mx-auto px-4 py-16 text-center">
      <div className="p-8 rounded-xl bg-card-bg border border-card-border">
        <h2 className="text-xl font-bold text-white mb-3">Something went wrong</h2>
        <p className="text-gray-400 mb-4">The portfolio page encountered an error.</p>
        <p className="text-gray-600 text-xs mb-6 font-mono break-all">{error.message}</p>
        <button
          onClick={() => reset()}
          className="px-6 py-3 bg-accent-green/20 text-accent-green rounded-lg hover:bg-accent-green/30 transition-colors font-medium"
        >
          Try Again
        </button>
      </div>
    </div>
  );
}
