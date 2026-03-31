import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

const FUNCTIONS_BASE = "https://us-central1-cheeseapphq.cloudfunctions.net";

let cache: { data: unknown; timestamp: number } | null = null;
const CACHE_TTL = 60 * 60 * 1000; // 1 hour

export async function GET(req: Request) {
  const now = Date.now();
  const { searchParams } = new URL(req.url);
  const range = searchParams.get("range") || "ALL";

  // Only cache ALL range, not 1D (stale intraday data is useless)
  if (range === "ALL" && cache && now - cache.timestamp < CACHE_TTL) {
    return NextResponse.json(cache.data, {
      headers: { "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=7200" },
    });
  }

  try {
    const res = await fetch(`${FUNCTIONS_BASE}/getPortfolioHistory?range=${range}`);
    if (!res.ok) throw new Error(`Cloud function returned ${res.status}`);
    const data = await res.json();

    if (data.history && data.history.length > 0) {
      cache = { data: { history: data.history, timestamp: now }, timestamp: now };
    }

    return NextResponse.json(
      { history: data.history || [], timestamp: now },
      { headers: { "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=7200" } }
    );
  } catch (error) {
    console.error("Portfolio history error:", error);
    return NextResponse.json({ error: "Failed to fetch portfolio history", history: [] }, { status: 500 });
  }
}
