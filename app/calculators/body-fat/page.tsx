"use client";

import { useState } from "react";
import AdBanner from "../../components/AdBanner";

export default function BodyFatCalculator() {
  const [gender, setGender] = useState<"male" | "female">("male");
  const [waist, setWaist] = useState(34);
  const [neck, setNeck] = useState(15);
  const [height, setHeight] = useState(70);
  const [hip, setHip] = useState(38);

  // US Navy Method
  let bodyFat: number;
  if (gender === "male") {
    bodyFat = 86.010 * Math.log10(waist - neck) - 70.041 * Math.log10(height) + 36.76;
  } else {
    bodyFat = 163.205 * Math.log10(waist + hip - neck) - 97.684 * Math.log10(height) - 78.387;
  }
  bodyFat = Math.max(bodyFat, 0);

  let category: string;
  let categoryColor: string;
  if (gender === "male") {
    if (bodyFat < 6) { category = "Essential Fat"; categoryColor = "text-blue-400"; }
    else if (bodyFat < 14) { category = "Athletic"; categoryColor = "text-accent-green"; }
    else if (bodyFat < 18) { category = "Fit"; categoryColor = "text-accent-green"; }
    else if (bodyFat < 25) { category = "Average"; categoryColor = "text-yellow-400"; }
    else { category = "Above Average"; categoryColor = "text-accent-red"; }
  } else {
    if (bodyFat < 14) { category = "Essential Fat"; categoryColor = "text-blue-400"; }
    else if (bodyFat < 21) { category = "Athletic"; categoryColor = "text-accent-green"; }
    else if (bodyFat < 25) { category = "Fit"; categoryColor = "text-accent-green"; }
    else if (bodyFat < 32) { category = "Average"; categoryColor = "text-yellow-400"; }
    else { category = "Above Average"; categoryColor = "text-accent-red"; }
  }

  const categories = gender === "male"
    ? [
        { label: "Essential Fat", range: "2-5%", color: "bg-blue-500/60" },
        { label: "Athletic", range: "6-13%", color: "bg-green-500/60" },
        { label: "Fit", range: "14-17%", color: "bg-green-400/60" },
        { label: "Average", range: "18-24%", color: "bg-yellow-500/60" },
        { label: "Above Average", range: "25%+", color: "bg-red-500/60" },
      ]
    : [
        { label: "Essential Fat", range: "10-13%", color: "bg-blue-500/60" },
        { label: "Athletic", range: "14-20%", color: "bg-green-500/60" },
        { label: "Fit", range: "21-24%", color: "bg-green-400/60" },
        { label: "Average", range: "25-31%", color: "bg-yellow-500/60" },
        { label: "Above Average", range: "32%+", color: "bg-red-500/60" },
      ];

  const inputClass = "w-full p-3 bg-card-bg border border-card-border rounded-lg text-white focus:border-accent-green outline-none";

  return (
    <div className="max-w-4xl mx-auto px-4 py-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            name: "Body Fat Estimator",
            description: "Estimate your body fat percentage using the US Navy method with simple body measurements.",
            applicationCategory: "HealthApplication",
            operatingSystem: "Web",
            offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
          }),
        }}
      />

      <h1 className="text-3xl md:text-4xl font-extrabold mb-4">
        Body Fat <span className="gradient-text">Estimator</span>
      </h1>

      <div className="grid md:grid-cols-2 gap-8 mb-12">
        <div className="space-y-5">
          <div>
            <label className="block text-sm text-gray-400 mb-1">Gender</label>
            <div className="flex gap-3">
              {(["male", "female"] as const).map((g) => (
                <button key={g} onClick={() => setGender(g)} className={`flex-1 py-3 rounded-lg border text-sm font-semibold transition-all capitalize ${gender === g ? "bg-accent-green text-black border-accent-green" : "bg-card-bg border-card-border text-gray-400"}`}>
                  {g}
                </button>
              ))}
            </div>
          </div>
          <div>
            <label className="block text-sm text-gray-400 mb-1">Height (inches)</label>
            <input type="number" value={height} onChange={(e) => setHeight(Number(e.target.value))} className={inputClass} />
          </div>
          <div>
            <label className="block text-sm text-gray-400 mb-1">Waist (inches) — at navel</label>
            <input type="number" value={waist} onChange={(e) => setWaist(Number(e.target.value))} className={inputClass} step="0.5" />
          </div>
          <div>
            <label className="block text-sm text-gray-400 mb-1">Neck (inches)</label>
            <input type="number" value={neck} onChange={(e) => setNeck(Number(e.target.value))} className={inputClass} step="0.5" />
          </div>
          {gender === "female" && (
            <div>
              <label className="block text-sm text-gray-400 mb-1">Hip (inches) — at widest point</label>
              <input type="number" value={hip} onChange={(e) => setHip(Number(e.target.value))} className={inputClass} step="0.5" />
            </div>
          )}
        </div>

        <div className="space-y-6">
          <div className="p-6 bg-card-bg border border-card-border rounded-xl text-center">
            <p className="text-gray-400 text-sm mb-1">Estimated Body Fat</p>
            <p className="text-5xl font-extrabold mb-2">{bodyFat.toFixed(1)}%</p>
            <p className={`text-lg font-semibold ${categoryColor}`}>{category}</p>
          </div>

          <div className="p-6 bg-card-bg border border-card-border rounded-xl">
            <h3 className="text-sm font-semibold text-gray-400 mb-4">Categories ({gender})</h3>
            <div className="space-y-2">
              {categories.map((cat) => (
                <div key={cat.label} className="flex items-center gap-3">
                  <div className={`w-4 h-4 rounded-sm ${cat.color}`} />
                  <span className="text-sm flex-1">{cat.label}</span>
                  <span className="text-xs text-gray-500 font-mono">{cat.range}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <AdBanner slot="in-content" size="medium-rectangle" />

      <section className="mt-12 space-y-4 text-gray-400 leading-relaxed max-w-3xl">
        <h2 className="text-xl font-bold text-white">Understanding Body Fat Percentage</h2>
        <p>
          Body fat percentage tells you what fraction of your total body weight is fat tissue.
          Unlike BMI, which only considers height and weight, body fat percentage gives a better
          picture of body composition by distinguishing between fat mass and lean mass (muscle,
          bone, organs, water).
        </p>
        <p>
          This calculator uses the US Navy Method, which estimates body fat from circumference
          measurements. While not as accurate as methods like DEXA scans or hydrostatic weighing,
          it provides a reasonable estimate that you can track over time using nothing more than
          a tape measure.
        </p>
        <p>
          For men, essential fat (the minimum needed for basic health) is 2-5%. Athletic men
          typically carry 6-13% body fat. For women, essential fat is higher at 10-13%, and
          athletic women typically carry 14-20%. These differences are due to physiological needs
          related to reproductive health.
        </p>
        <p>
          Rather than chasing a specific number, focus on the trend. Measure at the same time of
          day under similar conditions (morning, before eating). Small fluctuations are normal.
          What matters is the direction over weeks and months. Pair this with the scale, progress
          photos, and how your clothes fit for a complete picture.
        </p>
      </section>
    </div>
  );
}
