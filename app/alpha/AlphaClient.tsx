"use client";

import { useState, useEffect, useRef } from "react";

interface Analysis {
  score: number;
  probability: number;
  direction: string;
  ticker: string;
  timeframe: string;
  entry: string;
  stopLoss: string;
  target: string;
  riskReward: string;
  sentiment: number;
  technicalSignal: string;
  summary: string;
  bullCase: string;
  bearCase: string;
  catalysts: string[];
  keyLevels: { support: number; resistance: number };
  confidence: string;
}

interface HistoryEntry {
  id: string;
  query: string;
  ticker: string;
  direction: string;
  score: number;
  probability: number;
  timestamp: number;
  outcome: string;
  analysis: Analysis;
}

function ScoreRing({ score, size = 80 }: { score: number; size?: number }) {
  const pct = score / 10;
  const color = score >= 7 ? "#34C759" : score >= 4 ? "#FFD60A" : "#FF453A";
  const r = (size - 8) / 2;
  const circ = 2 * Math.PI * r;
  const offset = circ * (1 - pct);

  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="#1a1a1a" strokeWidth={6} />
        <circle
          cx={size / 2} cy={size / 2} r={r} fill="none" stroke={color} strokeWidth={6}
          strokeLinecap="round" strokeDasharray={circ} strokeDashoffset={offset}
          className="transition-all duration-1000"
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-2xl font-black" style={{ color }}>{score}</span>
      </div>
    </div>
  );
}

function SentimentBar({ value }: { value: number }) {
  const pct = ((value + 1) / 2) * 100;
  const color = value > 0.2 ? "bg-emerald-400" : value < -0.2 ? "bg-red-400" : "bg-yellow-400";
  const label = value > 0.3 ? "Bullish" : value > 0 ? "Slightly Bullish" : value < -0.3 ? "Bearish" : value < 0 ? "Slightly Bearish" : "Neutral";

  return (
    <div>
      <div className="flex justify-between text-xs mb-1">
        <span className="text-red-400">Bearish</span>
        <span className="text-gray-500">{label}</span>
        <span className="text-emerald-400">Bullish</span>
      </div>
      <div className="w-full bg-gray-800 rounded-full h-2 overflow-hidden">
        <div className={`h-full rounded-full ${color} transition-all duration-500`} style={{ width: `${pct}%` }} />
      </div>
    </div>
  );
}

export default function AlphaClient() {
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{ analysis: Analysis; marketData: any } | null>(null);
  const [error, setError] = useState("");
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const [showHistory, setShowHistory] = useState(false);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    fetch("/api/trade-history")
      .then((r) => r.json())
      .then((d) => setHistory(d.analyses || []))
      .catch(() => {});
  }, [result]);

  async function analyze() {
    if (!query.trim() || loading) return;
    setLoading(true);
    setError("");
    setResult(null);

    try {
      const res = await fetch("/api/analyze-trade", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: query.trim() }),
      });
      const data = await res.json();
      if (data.error) {
        setError(data.error);
      } else {
        setResult(data);
      }
    } catch {
      setError("Network error. Try again.");
    } finally {
      setLoading(false);
    }
  }

  const a = result?.analysis;

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl md:text-4xl font-extrabold">
            <span className="text-accent-green">Alpha</span>
          </h1>
          <p className="text-gray-500 text-sm mt-1">AI-powered trade analysis with real-time data</p>
        </div>
        <button
          onClick={() => setShowHistory(!showHistory)}
          className="flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-700 hover:border-gray-500 text-gray-400 hover:text-white transition-all text-sm"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          History ({history.length})
        </button>
      </div>

      {/* Input */}
      <div className="mb-8">
        <div className="relative">
          <textarea
            ref={inputRef}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); analyze(); } }}
            placeholder="Thinking about buying NVDA at $130... earnings next week, RSI looks oversold. Good trade?"
            className="w-full bg-[#111] border border-gray-800 rounded-xl px-5 py-4 pr-24 text-white placeholder-gray-600 resize-none focus:outline-none focus:border-accent-green/50 transition-colors min-h-[60px]"
            rows={2}
          />
          <button
            onClick={analyze}
            disabled={loading || !query.trim()}
            className="absolute right-3 bottom-3 px-5 py-2 bg-accent-green text-black font-bold text-sm rounded-lg disabled:opacity-30 hover:bg-accent-green/90 transition-all"
          >
            {loading ? (
              <span className="flex items-center gap-2">
                <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" /></svg>
                Analyzing
              </span>
            ) : "Analyze"}
          </button>
        </div>
        <p className="text-[10px] text-gray-600 mt-2">
          Not financial advice. AI analysis for educational purposes only. Always do your own research.
        </p>
      </div>

      {/* Loading */}
      {loading && (
        <div className="text-center py-16">
          <div className="inline-flex items-center gap-3 text-gray-400">
            <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" /></svg>
            <span>Pulling market data, running technicals, analyzing news...</span>
          </div>
        </div>
      )}

      {/* Error */}
      {error && (
        <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm mb-8">
          {error}
        </div>
      )}

      {/* Result */}
      {a && (
        <div className="space-y-6 animate-in fade-in duration-500">
          {/* Score + Direction header */}
          <div className="flex items-center gap-6 p-6 rounded-xl bg-[#111] border border-gray-800">
            <ScoreRing score={a.score} />
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-1">
                <span className="text-2xl font-bold text-white">{a.ticker}</span>
                <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase ${
                  a.direction === "buy" ? "bg-emerald-500/15 text-emerald-400" :
                  a.direction === "sell" ? "bg-red-500/15 text-red-400" :
                  a.direction === "avoid" ? "bg-red-500/15 text-red-400" :
                  "bg-yellow-500/15 text-yellow-400"
                }`}>
                  {a.direction}
                </span>
                <span className={`text-xs px-2 py-0.5 rounded border ${
                  a.confidence === "high" ? "border-emerald-500/30 text-emerald-400" :
                  a.confidence === "medium" ? "border-yellow-500/30 text-yellow-400" :
                  "border-gray-600 text-gray-400"
                }`}>
                  {a.confidence} confidence
                </span>
              </div>
              <p className="text-gray-300 text-sm leading-relaxed">{a.summary}</p>
            </div>
          </div>

          {/* Key metrics */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <MetricCard label="Profit Probability" value={`${a.probability}%`} color={a.probability >= 60 ? "text-emerald-400" : a.probability >= 40 ? "text-yellow-400" : "text-red-400"} />
            <MetricCard label="Risk:Reward" value={a.riskReward} color="text-blue-400" />
            <MetricCard label="Timeframe" value={a.timeframe} color="text-gray-300" />
            <MetricCard label="Technical" value={a.technicalSignal} color={a.technicalSignal === "bullish" ? "text-emerald-400" : a.technicalSignal === "bearish" ? "text-red-400" : "text-yellow-400"} />
          </div>

          {/* Levels */}
          <div className="grid grid-cols-3 gap-3">
            <LevelCard label="Entry" value={a.entry} color="text-blue-400" />
            <LevelCard label="Target" value={a.target} color="text-emerald-400" />
            <LevelCard label="Stop Loss" value={a.stopLoss} color="text-red-400" />
          </div>

          {/* Sentiment */}
          <div className="p-5 rounded-xl bg-[#111] border border-gray-800">
            <p className="text-xs text-gray-500 uppercase tracking-wider mb-3">News Sentiment</p>
            <SentimentBar value={a.sentiment} />
          </div>

          {/* Bull / Bear */}
          <div className="grid md:grid-cols-2 gap-3">
            <div className="p-5 rounded-xl bg-emerald-500/5 border border-emerald-500/10">
              <p className="text-xs text-emerald-400 uppercase tracking-wider mb-2 font-bold">Bull Case</p>
              <p className="text-sm text-gray-300">{a.bullCase}</p>
            </div>
            <div className="p-5 rounded-xl bg-red-500/5 border border-red-500/10">
              <p className="text-xs text-red-400 uppercase tracking-wider mb-2 font-bold">Bear Case</p>
              <p className="text-sm text-gray-300">{a.bearCase}</p>
            </div>
          </div>

          {/* Catalysts */}
          {a.catalysts && a.catalysts.length > 0 && (
            <div className="p-5 rounded-xl bg-[#111] border border-gray-800">
              <p className="text-xs text-gray-500 uppercase tracking-wider mb-3">Upcoming Catalysts</p>
              <div className="flex flex-wrap gap-2">
                {a.catalysts.map((c, i) => (
                  <span key={i} className="px-3 py-1.5 rounded-lg bg-gray-800 text-sm text-gray-300">{c}</span>
                ))}
              </div>
            </div>
          )}

          {/* Key Levels */}
          {a.keyLevels && (
            <div className="grid grid-cols-2 gap-3">
              <div className="p-4 rounded-xl bg-[#111] border border-gray-800">
                <p className="text-xs text-gray-500 mb-1">Support</p>
                <p className="text-lg font-bold text-emerald-400">${typeof a.keyLevels.support === "number" ? a.keyLevels.support.toFixed(2) : a.keyLevels.support}</p>
              </div>
              <div className="p-4 rounded-xl bg-[#111] border border-gray-800">
                <p className="text-xs text-gray-500 mb-1">Resistance</p>
                <p className="text-lg font-bold text-red-400">${typeof a.keyLevels.resistance === "number" ? a.keyLevels.resistance.toFixed(2) : a.keyLevels.resistance}</p>
              </div>
            </div>
          )}
        </div>
      )}

      {/* History Panel */}
      {showHistory && (
        <div className="mt-12">
          <h2 className="text-xl font-bold mb-4">Analysis History</h2>
          {history.length === 0 ? (
            <p className="text-gray-500 text-sm">No analyses yet. Try your first trade idea above.</p>
          ) : (
            <div className="space-y-2">
              {history.map((h) => (
                <button
                  key={h.id}
                  onClick={() => {
                    setResult({ analysis: h.analysis, marketData: {} });
                    setQuery(h.query);
                    setShowHistory(false);
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }}
                  className="w-full text-left p-4 rounded-xl bg-[#111] border border-gray-800 hover:border-gray-600 transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className={`text-lg font-bold ${
                        h.score >= 7 ? "text-emerald-400" : h.score >= 4 ? "text-yellow-400" : "text-red-400"
                      }`}>{h.score}/10</span>
                      <div>
                        <p className="text-sm text-white font-medium">{h.ticker} — {h.direction}</p>
                        <p className="text-xs text-gray-500 truncate max-w-md">{h.query}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="text-xs text-gray-500">
                        {new Date(h.timestamp).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                      </span>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Empty state */}
      {!loading && !result && !error && (
        <div className="text-center py-16">
          <div className="text-5xl mb-4">📊</div>
          <h3 className="text-lg font-semibold text-gray-400 mb-2">Ask about any trade</h3>
          <p className="text-sm text-gray-600 max-w-md mx-auto mb-6">
            Describe your trade idea and get instant analysis with real-time market data, technicals, news sentiment, and a probability score.
          </p>
          <div className="flex flex-wrap gap-2 justify-center">
            {[
              "Should I buy VTI right now?",
              "NVDA before earnings — buy or wait?",
              "Is AAPL oversold at this level?",
              "Thinking about shorting TSLA here",
            ].map((example) => (
              <button
                key={example}
                onClick={() => { setQuery(example); inputRef.current?.focus(); }}
                className="px-3 py-1.5 rounded-lg border border-gray-800 text-xs text-gray-400 hover:text-white hover:border-gray-600 transition-colors"
              >
                {example}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function MetricCard({ label, value, color }: { label: string; value: string; color: string }) {
  return (
    <div className="p-4 rounded-xl bg-[#111] border border-gray-800">
      <p className="text-[10px] text-gray-500 uppercase tracking-wider mb-1">{label}</p>
      <p className={`text-lg font-bold ${color}`}>{value}</p>
    </div>
  );
}

function LevelCard({ label, value, color }: { label: string; value: string; color: string }) {
  return (
    <div className="p-4 rounded-xl bg-[#111] border border-gray-800 text-center">
      <p className="text-[10px] text-gray-500 uppercase tracking-wider mb-1">{label}</p>
      <p className={`text-sm font-bold ${color}`}>{value}</p>
    </div>
  );
}
