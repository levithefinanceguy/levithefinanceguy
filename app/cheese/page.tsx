import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cheese — All-in-One Finance & Health App",
  description:
    "Track your budget, investments, calories, workouts, and more — all in one app. Built by Levi The Finance Guy.",
  openGraph: {
    title: "Cheese App | Levi The Finance Guy",
    description:
      "The all-in-one personal finance and health tracking app. Budget, invest, track calories, and stay on top of your goals.",
  },
};

export default function CheesePage() {
  const features = [
    {
      category: "Finance",
      items: [
        { title: "Budget Tracking", description: "Set spending categories, track every dollar, see where your money goes." },
        { title: "Investment Portfolio", description: "Track your stocks, ETFs, and crypto. See real-time performance and allocation." },
        { title: "Dividend Tracking", description: "Monitor dividend income, track payout dates, and see your passive income grow." },
        { title: "Net Worth", description: "Assets minus liabilities. One number that tells you where you stand financially." },
        { title: "Finance Calculators", description: "Compound interest, mortgage, FIRE, retirement, debt payoff, and more." },
      ],
    },
    {
      category: "Health",
      items: [
        { title: "Calorie Tracking", description: "Log meals with barcode scanning, AI photo recognition, or natural language." },
        { title: "Workout Tracking", description: "Log workouts, track volume, and monitor your progress over time." },
        { title: "Step Counter", description: "Automatic step tracking with daily goals and streak tracking." },
        { title: "Weight Tracker", description: "Log your weight, see trends, and stay accountable to your goals." },
        { title: "Water Intake", description: "Track daily water consumption and hit your hydration goals." },
        { title: "Health Calculators", description: "BMI, TDEE, macros, body fat, ideal weight, heart rate zones." },
      ],
    },
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            name: "Cheese",
            operatingSystem: "iOS",
            applicationCategory: "FinanceApplication",
            description: "All-in-one personal finance and health tracking app.",
            author: {
              "@type": "Person",
              name: "Levi",
              url: "https://levithefinanceguy.com",
            },
          }),
        }}
      />

      <div className="max-w-6xl mx-auto px-4 py-16">
        {/* Hero */}
        <div className="text-center mb-16">
          <div className="inline-block mb-6">
            <h1 className="text-6xl md:text-8xl font-extrabold gradient-text">Cheese</h1>
          </div>
          <p className="text-xl md:text-2xl text-gray-300 max-w-2xl mx-auto mb-4">
            Your money. Your health. One app.
          </p>
          <p className="text-gray-400 max-w-xl mx-auto mb-8">
            I built Cheese because I was tired of using five different apps to track my finances
            and health. Budget, invest, count calories, log workouts — all in one place.
          </p>
          <a
            href="https://apps.apple.com/us/app/cheese-your-life-organized/id6760211525"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-8 py-4 bg-gradient-to-r from-accent-green to-accent-teal text-black font-bold rounded-xl text-lg hover:brightness-110 transition-all"
          >
            Available on the App Store
          </a>
        </div>

        {/* Features */}
        {features.map((section) => (
          <div key={section.category} className="mb-16">
            <h2 className="text-2xl font-bold mb-8">
              <span className="gradient-text">{section.category}</span> Features
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {section.items.map((item) => (
                <div
                  key={item.title}
                  className="glass-card rounded-xl p-6 border border-card-border hover:border-accent-green/30 transition-all duration-300"
                >
                  <h3 className="text-lg font-semibold text-white mb-2">{item.title}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        ))}

        {/* Why Cheese */}
        <div className="mb-16 p-8 rounded-xl bg-card-bg border border-card-border">
          <h2 className="text-2xl font-bold mb-6">Why I Built Cheese</h2>
          <div className="text-gray-400 leading-relaxed space-y-4">
            <p>
              Most finance apps only do finance. Most health apps only do health. But your money
              and your health are connected — if you are stressed about money, your health suffers.
              If you are not taking care of your body, you are not performing at your best to earn.
            </p>
            <p>
              Cheese puts everything in one place. Track your spending in the morning, log your
              lunch at noon, check your portfolio after work, and log your workout before bed.
              One app. No switching. No excuses.
            </p>
            <p>
              And the best part? The data is yours. I do not sell it. I do not share it. Cheese
              is built to help you, not to monetize you.
            </p>
          </div>
        </div>

        {/* Smart Nutrition */}
        <div className="mb-16 p-8 rounded-xl border border-accent-green/20 bg-accent-green/5">
          <h2 className="text-2xl font-bold mb-4">Smart <span className="gradient-text">Nutrition Tracking</span></h2>
          <p className="text-gray-400 leading-relaxed">
            Cheese gives you access to over 460,000 foods, AI-powered photo recognition,
            personalized health scoring, and verified restaurant nutrition data. Scan a barcode,
            take a photo of your meal, or just type what you ate — Cheese handles the rest.
          </p>
          <p className="text-gray-500 text-sm mt-4">
            <a href="https://platform.fatsecret.com" target="_blank" rel="noopener noreferrer" className="hover:text-gray-300">Powered by fatsecret Platform API</a>
          </p>
        </div>

        {/* CTA */}
        <div className="text-center py-12">
          <h2 className="text-3xl font-bold mb-4">Get Started</h2>
          <p className="text-gray-400 mb-8">
            Download Cheese on iOS and follow me on social media for updates.
          </p>
          <a
            href="https://apps.apple.com/us/app/cheese-your-life-organized/id6760211525"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-8 py-4 mb-8 bg-gradient-to-r from-accent-green to-accent-teal text-black font-bold rounded-xl text-lg hover:brightness-110 transition-all"
          >
            Download on the App Store
          </a>
          <div className="flex flex-wrap justify-center gap-4">
            <a href="https://www.youtube.com/@levithefinanceguy/shorts" target="_blank" rel="noopener noreferrer" className="px-6 py-3 rounded-lg border border-card-border hover:border-accent-green/50 text-gray-300 hover:text-white transition-all">YouTube</a>
            <a href="https://www.tiktok.com/@levithefinanceguy" target="_blank" rel="noopener noreferrer" className="px-6 py-3 rounded-lg border border-card-border hover:border-accent-green/50 text-gray-300 hover:text-white transition-all">TikTok</a>
            <a href="https://instagram.com/levithefinanceguy" target="_blank" rel="noopener noreferrer" className="px-6 py-3 rounded-lg border border-card-border hover:border-accent-green/50 text-gray-300 hover:text-white transition-all">Instagram</a>
            <a href="https://www.facebook.com/share/18H1hiqGQQ/?mibextid=wwXIfr" target="_blank" rel="noopener noreferrer" className="px-6 py-3 rounded-lg border border-card-border hover:border-accent-green/50 text-gray-300 hover:text-white transition-all">Facebook</a>
          </div>
        </div>
      </div>
    </>
  );
}
