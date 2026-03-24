"use client";

import { useState } from "react";
import AdBanner from "../../components/AdBanner";

export default function HeartRateZonesCalculator() {
  const [age, setAge] = useState(30);
  const [restingHR, setRestingHR] = useState(65);

  const maxHR = 220 - age;
  const hrReserve = maxHR - restingHR;

  // Karvonen method
  const zones = [
    {
      zone: 1,
      name: "Recovery",
      description: "Warm-up, cool-down, active recovery. Builds aerobic base.",
      lowPct: 50,
      highPct: 60,
      color: "#3498DB",
    },
    {
      zone: 2,
      name: "Fat Burn",
      description: "Comfortable pace. Best for fat oxidation and endurance building.",
      lowPct: 60,
      highPct: 70,
      color: "#2ECC71",
    },
    {
      zone: 3,
      name: "Aerobic",
      description: "Moderate effort. Improves cardiovascular fitness and efficiency.",
      lowPct: 70,
      highPct: 80,
      color: "#F39C12",
    },
    {
      zone: 4,
      name: "Threshold",
      description: "Hard effort. Increases lactate threshold and speed endurance.",
      lowPct: 80,
      highPct: 90,
      color: "#E67E22",
    },
    {
      zone: 5,
      name: "Maximum",
      description: "All-out effort. Short intervals only. Develops peak performance.",
      lowPct: 90,
      highPct: 100,
      color: "#E74C3C",
    },
  ];

  const computedZones = zones.map((z) => ({
    ...z,
    lowBPM: Math.round(hrReserve * (z.lowPct / 100) + restingHR),
    highBPM: Math.round(hrReserve * (z.highPct / 100) + restingHR),
  }));

  const inputClass = "w-full p-3 bg-card-bg border border-card-border rounded-lg text-white focus:border-accent-green outline-none";

  return (
    <div className="max-w-7xl mx-auto px-4 py-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            name: "Heart Rate Zones Calculator",
            description: "Calculate your 5 heart rate training zones using the Karvonen method for optimal workouts.",
            applicationCategory: "HealthApplication",
            operatingSystem: "Web",
            offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
          }),
        }}
      />

      <h1 className="text-3xl md:text-4xl font-extrabold mb-4">
        Heart Rate Zones <span className="gradient-text">Calculator</span>
      </h1>

      <div className="flex flex-col md:flex-row md:gap-8">
      <div className="w-full md:w-3/5">

      <div className="grid md:grid-cols-2 gap-8 mb-12">
        <div className="space-y-5">
          <div>
            <label className="block text-sm text-gray-400 mb-1">Age</label>
            <input type="number" value={age} onChange={(e) => setAge(Number(e.target.value))} className={inputClass} />
          </div>
          <div>
            <label className="block text-sm text-gray-400 mb-1">Resting Heart Rate (BPM)</label>
            <input type="number" value={restingHR} onChange={(e) => setRestingHR(Number(e.target.value))} className={inputClass} />
            <p className="text-xs text-gray-500 mt-1">Measure first thing in the morning before getting out of bed.</p>
          </div>
          <div className="p-4 bg-card-bg border border-card-border rounded-lg space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-400">Max Heart Rate</span>
              <span className="font-mono font-bold">{maxHR} BPM</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-400">Heart Rate Reserve</span>
              <span className="font-mono">{hrReserve} BPM</span>
            </div>
          </div>
        </div>

        <div className="space-y-3">
          {computedZones.map((z) => (
            <div
              key={z.zone}
              className="p-4 rounded-xl border border-card-border bg-card-bg transition-all hover:scale-[1.01]"
              style={{ borderLeftWidth: "4px", borderLeftColor: z.color }}
            >
              <div className="flex items-center justify-between mb-1">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold px-2 py-0.5 rounded" style={{ backgroundColor: z.color + "30", color: z.color }}>
                    Z{z.zone}
                  </span>
                  <span className="font-semibold">{z.name}</span>
                </div>
                <span className="font-mono font-bold" style={{ color: z.color }}>
                  {z.lowBPM} - {z.highBPM}
                </span>
              </div>
              <p className="text-xs text-gray-500">{z.description}</p>
              <div className="mt-2 w-full bg-gray-800 rounded-full h-2">
                <div
                  className="h-full rounded-full transition-all"
                  style={{
                    width: `${((z.highBPM - z.lowBPM) / maxHR) * 200}%`,
                    backgroundColor: z.color,
                    opacity: 0.7,
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      <AdBanner slot="in-content" size="medium-rectangle" />

      </div>

      <div className="w-full md:w-2/5 md:sticky md:top-24 md:self-start">
        <details className="md:hidden mt-8">
          <summary className="cursor-pointer text-accent-green font-semibold py-3">Learn more about heart rate zones</summary>
          <div className="space-y-4 text-gray-400 leading-relaxed mt-2">
        <h2 className="text-xl font-bold text-white">Training With Heart Rate Zones</h2>
        <p>
          Heart rate zone training is one of the most effective ways to structure your workouts.
          By training at specific intensities, you target different physiological adaptations —
          from fat burning and endurance building to speed development and peak performance.
        </p>
        <p>
          This calculator uses the Karvonen method, which factors in your resting heart rate
          for more personalized zones compared to simple percentage-of-max calculations. A lower
          resting heart rate generally indicates better cardiovascular fitness, which shifts your
          training zones accordingly.
        </p>
        <p>
          Most people make the mistake of training too hard on easy days and not hard enough on
          hard days. The 80/20 rule suggests spending about 80% of your training time in Zones 1
          and 2 (low intensity) and only 20% in Zones 3-5 (moderate to high intensity). This
          polarized approach has been shown to produce the best endurance gains.
        </p>
        <p>
          To measure your resting heart rate accurately, check your pulse first thing in the
          morning before getting out of bed. Count beats for 60 seconds or use a fitness watch.
          Track it over several days and use the average. A declining resting heart rate over time
          is one of the best indicators that your fitness is improving.
        </p>
      </div>
        </details>
        <div className="hidden md:block space-y-4 text-gray-400 leading-relaxed">
        <h2 className="text-xl font-bold text-white">Training With Heart Rate Zones</h2>
        <p>
          Heart rate zone training is one of the most effective ways to structure your workouts.
          By training at specific intensities, you target different physiological adaptations —
          from fat burning and endurance building to speed development and peak performance.
        </p>
        <p>
          This calculator uses the Karvonen method, which factors in your resting heart rate
          for more personalized zones compared to simple percentage-of-max calculations. A lower
          resting heart rate generally indicates better cardiovascular fitness, which shifts your
          training zones accordingly.
        </p>
        <p>
          Most people make the mistake of training too hard on easy days and not hard enough on
          hard days. The 80/20 rule suggests spending about 80% of your training time in Zones 1
          and 2 (low intensity) and only 20% in Zones 3-5 (moderate to high intensity). This
          polarized approach has been shown to produce the best endurance gains.
        </p>
        <p>
          To measure your resting heart rate accurately, check your pulse first thing in the
          morning before getting out of bed. Count beats for 60 seconds or use a fitness watch.
          Track it over several days and use the average. A declining resting heart rate over time
          is one of the best indicators that your fitness is improving.
        </p>
      </div>
      </div>
      </div>

      <p className="text-xs text-gray-500 mt-8 max-w-3xl">
        This calculator is for educational purposes only and is not medical advice. Results are estimates based on general formulas and may not reflect your individual needs. Consult a healthcare professional before making changes to your diet or exercise routine.
      </p>
    </div>
  );
}
