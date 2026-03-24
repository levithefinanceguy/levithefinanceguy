"use client";

import { useState } from "react";
import AdBanner from "../../components/AdBanner";

const activityLevels = [
  { label: "Sedentary (office job, little exercise)", multiplier: 1.2 },
  { label: "Lightly Active (1-3 days/week)", multiplier: 1.375 },
  { label: "Moderately Active (3-5 days/week)", multiplier: 1.55 },
  { label: "Very Active (6-7 days/week)", multiplier: 1.725 },
  { label: "Extremely Active (athlete/physical job)", multiplier: 1.9 },
];

export default function TDEECalculator() {
  const [age, setAge] = useState(28);
  const [gender, setGender] = useState<"male" | "female">("male");
  const [feet, setFeet] = useState(5);
  const [inches, setInches] = useState(10);
  const [weight, setWeight] = useState(170);
  const [activityIndex, setActivityIndex] = useState(2);

  const heightCm = (feet * 12 + inches) * 2.54;
  const weightKg = weight * 0.453592;

  // Mifflin-St Jeor
  let bmr: number;
  if (gender === "male") {
    bmr = 10 * weightKg + 6.25 * heightCm - 5 * age + 5;
  } else {
    bmr = 10 * weightKg + 6.25 * heightCm - 5 * age - 161;
  }

  const tdee = bmr * activityLevels[activityIndex].multiplier;

  // Macro breakdown (maintenance: 30% protein, 40% carbs, 30% fat)
  // Cap protein at 1g per pound of body weight
  const maxProteinGrams = weight; // 1g per lb
  const rawProteinGrams = (tdee * 0.3) / 4;
  const proteinGrams = Math.min(rawProteinGrams, maxProteinGrams);
  const proteinCals = proteinGrams * 4;
  const fatCals = tdee * 0.3;
  const fatGrams = fatCals / 9;
  // Remaining calories go to carbs
  const carbCals = tdee - proteinCals - fatCals;
  const carbGrams = carbCals / 4;

  return (
    <div className="max-w-4xl mx-auto px-4 py-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            name: "TDEE Calculator",
            description: "Calculate your Total Daily Energy Expenditure based on your age, weight, height, and activity level.",
            applicationCategory: "HealthApplication",
            operatingSystem: "Web",
            offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
          }),
        }}
      />

      <h1 className="text-3xl md:text-4xl font-extrabold mb-4">
        TDEE <span className="text-accent-green">Calculator</span>
      </h1>

      <div className="grid md:grid-cols-2 gap-8 mb-12">
        <div className="space-y-5">
          <div>
            <label className="block text-sm text-gray-400 mb-1">Age</label>
            <input
              type="number"
              value={age}
              onChange={(e) => setAge(Number(e.target.value))}
              className="w-full p-3 bg-card-bg border border-card-border rounded-lg text-white focus:border-accent-green outline-none"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-400 mb-1">Gender</label>
            <div className="flex gap-3">
              {(["male", "female"] as const).map((g) => (
                <button
                  key={g}
                  onClick={() => setGender(g)}
                  className={`flex-1 py-3 rounded-lg border text-sm font-semibold transition-all capitalize ${
                    gender === g
                      ? "bg-accent-green text-black border-accent-green"
                      : "bg-card-bg border-card-border text-gray-400 hover:border-accent-green/50"
                  }`}
                >
                  {g}
                </button>
              ))}
            </div>
          </div>
          <div>
            <label className="block text-sm text-gray-400 mb-1">Height</label>
            <div className="flex gap-3">
              <div className="flex-1 flex items-center gap-2">
                <input
                  type="number"
                  value={feet}
                  onChange={(e) => setFeet(Number(e.target.value))}
                  className="w-full p-3 bg-card-bg border border-card-border rounded-lg text-white focus:border-accent-green outline-none"
                />
                <span className="text-gray-400 text-sm">ft</span>
              </div>
              <div className="flex-1 flex items-center gap-2">
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
          <div>
            <label className="block text-sm text-gray-400 mb-1">Weight (lbs)</label>
            <input
              type="number"
              value={weight}
              onChange={(e) => setWeight(Number(e.target.value))}
              className="w-full p-3 bg-card-bg border border-card-border rounded-lg text-white focus:border-accent-green outline-none"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-400 mb-1">Activity Level</label>
            <select
              value={activityIndex}
              onChange={(e) => setActivityIndex(Number(e.target.value))}
              className="w-full p-3 bg-card-bg border border-card-border rounded-lg text-white focus:border-accent-green outline-none"
            >
              {activityLevels.map((lvl, i) => (
                <option key={i} value={i}>
                  {lvl.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="space-y-6">
          <div className="p-6 bg-card-bg border border-card-border rounded-xl space-y-4">
            <h2 className="text-lg font-semibold mb-2">Results</h2>
            <div className="flex justify-between">
              <span className="text-gray-400">BMR</span>
              <span className="font-mono">{Math.round(bmr)} cal/day</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">TDEE</span>
              <span className="text-accent-green font-bold text-xl">{Math.round(tdee)} cal/day</span>
            </div>
            <div className="h-px bg-card-border my-2" />
            <div className="text-xs text-gray-500 space-y-1">
              <p>To lose weight: ~{Math.round(tdee - 500)} cal/day (-500)</p>
              <p>To maintain: ~{Math.round(tdee)} cal/day</p>
              <p>To gain weight: ~{Math.round(tdee + 500)} cal/day (+500)</p>
            </div>
          </div>

        </div>
      </div>

      <AdBanner slot="in-content" size="medium-rectangle" />

      <section className="mt-12 space-y-4 text-gray-400 leading-relaxed max-w-3xl">
        <h2 className="text-xl font-bold text-white">What Is TDEE?</h2>
        <p>
          Total Daily Energy Expenditure (TDEE) is the total number of calories your body burns
          in a day. It accounts for your Basal Metabolic Rate (BMR), which is the energy your body
          needs just to stay alive at rest, plus the additional calories burned through physical
          activity, digestion, and daily movement.
        </p>
        <p>
          This calculator uses the Mifflin-St Jeor equation, which is considered the most accurate
          BMR formula for most people. It takes into account your age, gender, height, and weight.
          Your activity level then multiplies the BMR to estimate your total daily caloric needs.
        </p>
        <p>
          Understanding your TDEE is essential for any body composition goal. To lose weight, you
          need to eat fewer calories than your TDEE (a caloric deficit). To gain weight or build
          muscle, you need to eat more (a caloric surplus). A common recommendation is a 500
          calorie deficit or surplus, which theoretically results in about one pound of change per
          week.
        </p>
      </section>

      <p className="text-xs text-gray-500 mt-8 max-w-3xl">
        This calculator is for educational purposes only and is not medical advice. Results are estimates based on general formulas and may not reflect your individual needs. Consult a healthcare professional before making changes to your diet or exercise routine.
      </p>
    </div>
  );
}
