"use client";

import { useState } from "react";
import AdBanner from "../../components/AdBanner";

const activityLevels = [
  { label: "Sedentary", multiplier: 1.2 },
  { label: "Lightly Active", multiplier: 1.375 },
  { label: "Moderately Active", multiplier: 1.55 },
  { label: "Very Active", multiplier: 1.725 },
  { label: "Extremely Active", multiplier: 1.9 },
];

const goals = [
  { label: "Cut (Lose Fat)", value: "cut", calAdjust: -500, proteinMult: 1.0, fatPct: 0.25 },
  { label: "Maintain", value: "maintain", calAdjust: 0, proteinMult: 0.8, fatPct: 0.30 },
  { label: "Bulk (Build Muscle)", value: "bulk", calAdjust: 500, proteinMult: 0.9, fatPct: 0.30 },
];

export default function MacroEstimator() {
  const [age, setAge] = useState(28);
  const [gender, setGender] = useState<"male" | "female">("male");
  const [feet, setFeet] = useState(5);
  const [inches, setInches] = useState(10);
  const [weight, setWeight] = useState(180);
  const [activityIndex, setActivityIndex] = useState(2);
  const [goalIndex, setGoalIndex] = useState(0);

  const heightCm = (feet * 12 + inches) * 2.54;
  const weightKg = weight * 0.453592;

  let bmr: number;
  if (gender === "male") {
    bmr = 10 * weightKg + 6.25 * heightCm - 5 * age + 5;
  } else {
    bmr = 10 * weightKg + 6.25 * heightCm - 5 * age - 161;
  }

  const tdee = bmr * activityLevels[activityIndex].multiplier;
  const goal = goals[goalIndex];
  const targetCalories = Math.round(tdee + goal.calAdjust);

  const proteinGrams = Math.round(weight * goal.proteinMult);
  const proteinCals = proteinGrams * 4;
  const fatCals = Math.round(targetCalories * goal.fatPct);
  const fatGrams = Math.round(fatCals / 9);
  const carbCals = targetCalories - proteinCals - fatCals;
  const carbGrams = Math.round(carbCals / 4);

  const proteinPct = targetCalories > 0 ? ((proteinCals / targetCalories) * 100).toFixed(0) : "0";
  const fatPct = targetCalories > 0 ? ((fatCals / targetCalories) * 100).toFixed(0) : "0";
  const carbPct = targetCalories > 0 ? ((carbCals / targetCalories) * 100).toFixed(0) : "0";

  const inputClass = "w-full p-3 bg-card-bg border border-card-border rounded-lg text-white focus:border-accent-green outline-none";

  return (
    <div className="max-w-4xl mx-auto px-4 py-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            name: "Macro Estimator",
            description: "Get personalized protein, carb, and fat targets based on your TDEE and fitness goals.",
            applicationCategory: "HealthApplication",
            operatingSystem: "Web",
            offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
          }),
        }}
      />

      <h1 className="text-3xl md:text-4xl font-extrabold mb-4">
        Macro <span className="gradient-text">Estimator</span>
      </h1>

      <div className="grid md:grid-cols-2 gap-8 mb-12">
        <div className="space-y-5">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs text-gray-500 mb-1">Age</label>
              <input type="number" value={age} onChange={(e) => setAge(Number(e.target.value))} className={inputClass} />
            </div>
            <div>
              <label className="block text-xs text-gray-500 mb-1">Gender</label>
              <div className="flex gap-2">
                {(["male", "female"] as const).map((g) => (
                  <button key={g} onClick={() => setGender(g)} className={`flex-1 py-3 rounded-lg border text-sm font-semibold transition-all capitalize ${gender === g ? "bg-accent-green text-black border-accent-green" : "bg-card-bg border-card-border text-gray-400"}`}>
                    {g}
                  </button>
                ))}
              </div>
            </div>
          </div>
          <div>
            <label className="block text-xs text-gray-500 mb-1">Height</label>
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
            <label className="block text-xs text-gray-500 mb-1">Weight (lbs)</label>
            <input type="number" value={weight} onChange={(e) => setWeight(Number(e.target.value))} className={inputClass} />
          </div>
          <div>
            <label className="block text-xs text-gray-500 mb-1">Activity Level</label>
            <select value={activityIndex} onChange={(e) => setActivityIndex(Number(e.target.value))} className={inputClass}>
              {activityLevels.map((lvl, i) => (
                <option key={i} value={i}>{lvl.label}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-xs text-gray-500 mb-1">Goal</label>
            <div className="flex gap-2">
              {goals.map((g, i) => (
                <button key={g.value} onClick={() => setGoalIndex(i)} className={`flex-1 py-3 rounded-lg border text-sm font-semibold transition-all ${goalIndex === i ? "bg-accent-green text-black border-accent-green" : "bg-card-bg border-card-border text-gray-400"}`}>
                  {g.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="p-6 bg-card-bg border border-card-border rounded-xl text-center">
            <p className="text-gray-400 text-sm mb-1">Target Calories</p>
            <p className="text-4xl font-extrabold text-accent-green">{targetCalories}</p>
            <p className="text-xs text-gray-500 mt-1">calories/day ({goal.label.toLowerCase()})</p>
          </div>

          <div className="p-6 bg-card-bg border border-card-border rounded-xl space-y-4">
            <h2 className="text-lg font-semibold">Daily Macros</h2>
            <div>
              <div className="flex justify-between mb-1">
                <span>Protein ({proteinPct}%)</span>
                <span className="text-accent-green font-bold">{proteinGrams}g</span>
              </div>
              <div className="w-full bg-gray-800 rounded-full h-3">
                <div className="h-full rounded-full bg-accent-green transition-all" style={{ width: `${proteinPct}%` }} />
              </div>
              <p className="text-xs text-gray-500 mt-1">{proteinCals} cal</p>
            </div>
            <div>
              <div className="flex justify-between mb-1">
                <span>Carbs ({carbPct}%)</span>
                <span className="text-blue-400 font-bold">{Math.max(carbGrams, 0)}g</span>
              </div>
              <div className="w-full bg-gray-800 rounded-full h-3">
                <div className="h-full rounded-full bg-blue-400 transition-all" style={{ width: `${carbPct}%` }} />
              </div>
              <p className="text-xs text-gray-500 mt-1">{Math.max(carbCals, 0)} cal</p>
            </div>
            <div>
              <div className="flex justify-between mb-1">
                <span>Fat ({fatPct}%)</span>
                <span className="text-yellow-400 font-bold">{fatGrams}g</span>
              </div>
              <div className="w-full bg-gray-800 rounded-full h-3">
                <div className="h-full rounded-full bg-yellow-400 transition-all" style={{ width: `${fatPct}%` }} />
              </div>
              <p className="text-xs text-gray-500 mt-1">{fatCals} cal</p>
            </div>
          </div>
        </div>
      </div>

      <AdBanner slot="in-content" size="medium-rectangle" />

      <section className="mt-12 space-y-4 text-gray-400 leading-relaxed max-w-3xl">
        <h2 className="text-xl font-bold text-white">Understanding Macronutrients</h2>
        <p>
          Macronutrients — protein, carbohydrates, and fat — are the three main categories of
          nutrients that provide calories. Each plays a distinct role in your body. Getting the
          right balance based on your goals can be the difference between spinning your wheels
          and making real progress.
        </p>
        <p>
          Protein is essential for muscle repair and growth. When cutting, higher protein intake
          helps preserve muscle mass while losing fat. A common target is 0.8-1.0 grams per pound
          of body weight. During a bulk, slightly less is needed since your body is in an anabolic
          state, but keeping it high ensures quality muscle gain.
        </p>
        <p>
          Carbohydrates are your body&apos;s preferred fuel source, especially for high-intensity
          exercise. Cutting them too low can impact workout performance and recovery. Fats are
          essential for hormone production, nutrient absorption, and overall health. Never drop
          fats below about 20% of total calories.
        </p>
        <p>
          These numbers are starting points. Track your intake for 2-3 weeks and adjust based on
          results. If you are not losing weight on a cut, reduce calories by 100-200. If you are
          not gaining on a bulk, add 200-300 calories. Your body will tell you what it needs — you
          just have to pay attention.
        </p>
      </section>
    </div>
  );
}
