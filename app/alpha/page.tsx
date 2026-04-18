import type { Metadata } from "next";
import AlphaClient from "./AlphaClient";

export const metadata: Metadata = {
  title: "Alpha | AI Trade Analyst",
  description: "AI-powered trade analysis with real-time market data, technical indicators, and sentiment scoring.",
};

export default function AlphaPage() {
  return <AlphaClient />;
}
