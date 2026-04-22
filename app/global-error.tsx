"use client";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="en">
      <body style={{ backgroundColor: "#0a0a0a", color: "#fff", fontFamily: "system-ui, sans-serif", display: "flex", alignItems: "center", justifyContent: "center", minHeight: "100vh", margin: 0 }}>
        <div style={{ textAlign: "center", padding: "2rem" }}>
          <h2 style={{ fontSize: "1.5rem", marginBottom: "1rem" }}>Something went wrong</h2>
          <p style={{ color: "#9ca3af", marginBottom: "1.5rem" }}>This is usually temporary. Try reloading.</p>
          <button
            onClick={() => reset()}
            style={{ padding: "0.75rem 1.5rem", backgroundColor: "#2ECC71", color: "#000", border: "none", borderRadius: "0.5rem", fontWeight: "bold", cursor: "pointer", fontSize: "1rem" }}
          >
            Try Again
          </button>
        </div>
      </body>
    </html>
  );
}
