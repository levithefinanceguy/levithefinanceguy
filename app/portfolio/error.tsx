"use client";

export default function PortfolioError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="max-w-6xl mx-auto px-4 py-16 text-center">
      <div className="p-8 rounded-xl bg-card-bg border border-card-border">
        <h2 className="text-xl font-bold text-white mb-3">Something went wrong</h2>
        <p className="text-gray-400 mb-6">The portfolio page encountered an error. This is usually temporary.</p>
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
