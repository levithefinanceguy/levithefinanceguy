import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

const FUNCTIONS_BASE = "https://us-central1-cheeseapphq.cloudfunctions.net";

export async function GET() {
  try {
    const res = await fetch(`${FUNCTIONS_BASE}/getTradeHistory`);
    if (!res.ok) {
      return NextResponse.json({ analyses: [] });
    }
    const data = await res.json();
    return NextResponse.json(data);
  } catch {
    return NextResponse.json({ analyses: [] });
  }
}
