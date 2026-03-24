"use client";

import { useState } from "react";
import AdBanner from "../../components/AdBanner";

export default function BMICalculator() {
  const [feet, setFeet] = useState(5);
  const [inches, setInches] = useState(10);
  const [weight, setWeight] = useState(170);

  const totalInches = feet * 12 + inches;
  const bmi = totalInches > 0 ? (weight / (totalInches * totalInches)) * 703 : 0;

  let category = "";
  let categoryColor = "";
  if (bmi < 18.5) {
    category = "Underweight";
    categoryColor = "text-blue-400";
  } else if (bmi < 25) {
    category = "Normal Weight";
    categoryColor = "text-accent-green";
  } else if (bmi < 30) {
    category = "Overweight";
    categoryColor = "text-yellow-400";
  } else {
    category = "Obese";
    categoryColor = "text-accent-red";
  }

  // Healthy weight range for this height
  const healthyMin = totalInches > 0 ? (18.5 * totalInches * totalInches) / 703 : 0;
  const healthyMax = totalInches > 0 ? (24.9 * totalInches * totalInches) / 703 : 0;

  // Position on scale (15 to 40 range)
  const scaleMin = 15;
  const scaleMax = 40;
  const clampedBmi = Math.min(Math.max(bmi, scaleMin), scaleMax);
  const markerPct = ((clampedBmi - scaleMin) / (scaleMax - scaleMin)) * 100;

  return (
    <div className="max-w-4xl mx-auto px-4 py-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            name: "BMI Calculator",
            description: "Calculate your Body Mass Index and see your weight category.",
            applicationCategory: "HealthApplication",
            operatingSystem: "Web",
            offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
          }),
        }}
      />

      <h1 className="text-3xl md:text-4xl font-extrabold mb-4">
        BMI <span className="text-accent-green">Calculator</span>
      </h1>

      <div className="grid md:grid-cols-2 gap-8 mb-12">
        <div className="space-y-5">
          <div>
            <label className="block text-sm text-gray-400 mb-1">Height</label>
            <div className="flex gap-3">
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    value={feet}
                    onChange={(e) => setFeet(Number(e.target.value))}
                    className="w-full p-3 bg-card-bg border border-card-border rounded-lg text-white focus:border-accent-green outline-none"
                  />
                  <span className="text-gray-400 text-sm">ft</span>
                </div>
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    value={inches}
                    onChange={(e) => setInches(Number(e.target.value))}
                    className="w-full p-3 bg-card-bg border border-card-border rounded-lg text-white focus:border-accent-green outline-none"
                  />
                  <span className="text-gray-400 text-sm">in</span>
                </div>
              </div>
            </div>
          </div>
          <div>
            <label className="block text-sm text-gray-400 mb-1">Weight (lbs)</label>
            <input
              type="number"
              value={weight}
              onChange={(e) => setWeight(Number(e.target.value))}
              className="w-full p-3 bg-card-bg border border-card-border rounded-lg text-white focus:border-accent-green outline-none"
            />
          </div>
        </div>

        <div className="p-6 bg-card-bg border border-card-border rounded-xl space-y-4">
          <h2 className="text-lg font-semibold mb-2">Results</h2>
          <div className="text-center py-4">
            <p className="text-5xl font-extrabold mb-2">{bmi.toFixed(1)}</p>
            <p className={`text-lg font-semibold ${categoryColor}`}>{category}</p>
          </div>
          <div className="h-px bg-card-border my-2" />
          <div className="flex justify-between text-sm">
            <span className="text-gray-400">Healthy Weight Range</span>
            <span className="font-mono">
              {healthyMin.toFixed(0)} - {healthyMax.toFixed(0)} lbs
            </span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-400">Your Height</span>
            <span className="font-mono">{feet}&apos;{inches}&quot;</span>
          </div>
        </div>
      </div>

      {/* BMI Scale */}
      <div className="mb-12 p-6 bg-card-bg border border-card-border rounded-xl">
        <h2 className="text-lg font-semibold mb-4">BMI Scale</h2>
        <div className="relative h-8 rounded-full overflow-hidden flex">
          <div className="flex-1 bg-blue-500/60" />
          <div className="flex-[2] bg-green-500/60" />
          <div className="flex-1 bg-yellow-500/60" />
          <div className="flex-[2] bg-red-500/60" />
        </div>
        <div className="relative h-6">
          <div
            className="absolute -top-1 w-0.5 h-6 bg-white"
            style={{ left: `${markerPct}%` }}
          />
          <div
            className="absolute top-5 -translate-x-1/2 text-xs font-bold text-white"
            style={{ left: `${markerPct}%` }}
          >
            {bmi.toFixed(1)}
          </div>
        </div>
        <div className="flex justify-between text-xs text-gray-500 mt-4">
          <span>Underweight (&lt;18.5)</span>
          <span>Normal (18.5-24.9)</span>
          <span>Overweight (25-29.9)</span>
          <span>Obese (30+)</span>
        </div>
      </div>

      <AdBanner slot="in-content" size="medium-rectangle" />

      <section className="mt-12 space-y-4 text-gray-400 leading-relaxed max-w-3xl">
        <h2 className="text-xl font-bold text-white">Understanding BMI</h2>
        <p>
          Body Mass Index (BMI) is a simple screening tool that uses your height and weight to
          estimate body fat. It was developed in the 1800s by Belgian mathematician Adolphe
          Quetelet and has been used as a quick health assessment ever since. The formula divides
          your weight by the square of your height.
        </p>
        <p>
          While BMI is widely used and easy to calculate, it has important limitations. It does
          not distinguish between muscle and fat, so athletes and people with high muscle mass
          may show an elevated BMI despite being healthy. It also does not account for bone
          density, age, gender, or where fat is distributed on the body.
        </p>
        <p>
          BMI categories are defined by the World Health Organization: underweight is below 18.5,
          normal weight is 18.5 to 24.9, overweight is 25 to 29.9, and obese is 30 and above.
          These ranges are general guidelines and may not apply equally to all populations.
        </p>
        <p>
          For a more complete picture of your health, consider BMI alongside other metrics like
          waist circumference, body fat percentage, and your TDEE (Total Daily Energy
          Expenditure). Use the TDEE calculator on this site for a more detailed look at your
          caloric needs based on activity level.
        </p>
      </section>

      <p className="text-xs text-gray-500 mt-8 max-w-3xl">
        This calculator is for educational purposes only and is not medical advice. Results are estimates based on general formulas and may not reflect your individual needs. Consult a healthcare professional before making changes to your diet or exercise routine.
      </p>
    </div>
  );
}
