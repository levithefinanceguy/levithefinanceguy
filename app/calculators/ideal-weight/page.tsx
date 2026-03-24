"use client";

import { useState } from "react";
import AdBanner from "../../components/AdBanner";

export default function IdealWeightCalculator() {
  const [gender, setGender] = useState<"male" | "female">("male");
  const [feet, setFeet] = useState(5);
  const [inches, setInches] = useState(10);
  const [frame, setFrame] = useState<"small" | "medium" | "large">("medium");

  const totalInches = feet * 12 + inches;
  const inchesOver5Ft = Math.max(totalInches - 60, 0);

  // Formulas (in lbs)
  let devine: number, robinson: number, miller: number, hamwi: number;

  if (gender === "male") {
    devine = 110 + 5.06 * inchesOver5Ft;
    robinson = 115 + 4.18 * inchesOver5Ft;
    miller = 123.3 + 3.08 * inchesOver5Ft;
    hamwi = 106 + 6 * inchesOver5Ft;
  } else {
    devine = 100 + 5.06 * inchesOver5Ft;
    robinson = 108 + 4.62 * inchesOver5Ft;
    miller = 115.5 + 2.64 * inchesOver5Ft;
    hamwi = 100 + 5 * inchesOver5Ft;
  }

  // Frame adjustment
  const frameAdj = frame === "small" ? 0.9 : frame === "large" ? 1.1 : 1.0;
  devine *= frameAdj;
  robinson *= frameAdj;
  miller *= frameAdj;
  hamwi *= frameAdj;

  const avg = (devine + robinson + miller + hamwi) / 4;
  const min = Math.min(devine, robinson, miller, hamwi);
  const max = Math.max(devine, robinson, miller, hamwi);

  const formulas = [
    { name: "Devine", value: devine, description: "Most commonly used in clinical settings" },
    { name: "Robinson", value: robinson, description: "Updated version of Devine formula" },
    { name: "Miller", value: miller, description: "Tends to give slightly higher results" },
    { name: "Hamwi", value: hamwi, description: "Original clinical formula from 1964" },
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
            name: "Ideal Weight Calculator",
            description: "Find your ideal weight range using four clinical formulas: Devine, Robinson, Miller, and Hamwi.",
            applicationCategory: "HealthApplication",
            operatingSystem: "Web",
            offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
          }),
        }}
      />

      <h1 className="text-3xl md:text-4xl font-extrabold mb-4">
        Ideal Weight <span className="gradient-text">Calculator</span>
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
            <label className="block text-sm text-gray-400 mb-1">Height</label>
            <div className="flex gap-3">
              <div className="flex-1 flex items-center gap-2">
                <input type="number" value={feet} onChange={(e) => setFeet(Number(e.target.value))} className={inputClass} />
                <span className="text-gray-400 text-sm">ft</span>
              </div>
              <div className="flex-1 flex items-center gap-2">
                <input type="number" value={inches} onChange={(e) => setInches(Number(e.target.value))} className={inputClass} />
                <span className="text-gray-400 text-sm">in</span>
              </div>
            </div>
          </div>
          <div>
            <label className="block text-sm text-gray-400 mb-1">Frame Size</label>
            <div className="flex gap-2">
              {(["small", "medium", "large"] as const).map((f) => (
                <button key={f} onClick={() => setFrame(f)} className={`flex-1 py-3 rounded-lg border text-sm font-semibold transition-all capitalize ${frame === f ? "bg-accent-green text-black border-accent-green" : "bg-card-bg border-card-border text-gray-400"}`}>
                  {f}
                </button>
              ))}
            </div>
            <p className="text-xs text-gray-500 mt-2">Wrap your fingers around your wrist. If they overlap, you are small frame. If they touch, medium. If they do not touch, large.</p>
          </div>
        </div>

        <div className="space-y-6">
          <div className="p-6 bg-card-bg border border-card-border rounded-xl text-center">
            <p className="text-gray-400 text-sm mb-1">Ideal Weight Range</p>
            <p className="text-4xl font-extrabold text-accent-green">
              {Math.round(min)} - {Math.round(max)} lbs
            </p>
            <p className="text-sm text-gray-500 mt-1">Average: {Math.round(avg)} lbs</p>
          </div>

          <div className="p-6 bg-card-bg border border-card-border rounded-xl">
            <h3 className="text-sm font-semibold text-gray-400 mb-4">By Formula</h3>
            <div className="space-y-3">
              {formulas.map((f) => (
                <div key={f.name} className="flex items-center justify-between">
                  <div>
                    <span className="font-medium">{f.name}</span>
                    <p className="text-xs text-gray-500">{f.description}</p>
                  </div>
                  <span className="font-mono text-accent-green font-bold">{Math.round(f.value)} lbs</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <AdBanner slot="in-content" size="medium-rectangle" />

      <section className="mt-12 space-y-4 text-gray-400 leading-relaxed max-w-3xl">
        <h2 className="text-xl font-bold text-white">What Is Your Ideal Weight?</h2>
        <p>
          Ideal weight formulas estimate a healthy body weight based on your height, gender, and
          frame size. This calculator uses four widely-referenced medical formulas: Devine (1974),
          Robinson (1983), Miller (1983), and Hamwi (1964). Each approaches the calculation slightly
          differently, which is why a range is more useful than a single number.
        </p>
        <p>
          Frame size matters because people with larger bone structures naturally weigh more than
          those with smaller frames, even at the same height and body fat percentage. A simple
          wrist test gives you a rough idea of your frame size, though it is not perfectly precise.
        </p>
        <p>
          These formulas were developed for clinical use and have limitations. They do not account
          for muscle mass, body composition, or individual variation. A muscular athlete may weigh
          well above their calculated ideal weight while being perfectly healthy. Use these numbers
          as general guidelines rather than absolute targets.
        </p>
        <p>
          For a more complete health picture, combine ideal weight with other metrics like BMI,
          body fat percentage, and waist-to-height ratio. How you feel, your energy levels, and
          your fitness performance often matter more than any single number on a scale or formula.
        </p>
      </section>

      <p className="text-xs text-gray-500 mt-8 max-w-3xl">
        This calculator is for educational purposes only and is not medical advice. Results are estimates based on general formulas and may not reflect your individual needs. Consult a healthcare professional before making changes to your diet or exercise routine.
      </p>
    </div>
  );
}
