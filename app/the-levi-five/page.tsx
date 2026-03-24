"use client";

import { useState } from "react";
import Link from "next/link";

const steps = [
  {
    number: 1,
    title: "One Month Security",
    subtitle: "Save 1 month of expenses",
    color: "#2ECC71",
    content: {
      why: "This is your foundation. Without it, one bad week — a car repair, a medical bill, a surprise expense — can spiral into debt. One month of expenses in savings means you have breathing room. You are not living paycheck to paycheck anymore. You have a buffer between you and financial chaos.",
      howToCalc: "Add up everything you spend in a month: rent or mortgage, utilities, groceries, transportation, insurance, subscriptions, and minimum debt payments. Do not include one-time expenses or luxuries. This is your baseline survival number. That is your target for Step 1.",
      tips: [
        "Open a separate high-yield savings account specifically for this fund",
        "Automate a weekly transfer, even if it is small — $25/week adds up to $1,300/year",
        "Cut one unnecessary subscription or expense and redirect that money here",
        "Sell things you do not use — clothes, electronics, furniture",
        "Pick up a side gig temporarily to accelerate this step",
      ],
      whatCounts: "Rent/mortgage, utilities (electric, water, gas, internet, phone), groceries, transportation (car payment, gas, insurance, or transit pass), health insurance premiums, minimum debt payments, and essential subscriptions. Do not include dining out, entertainment, or shopping.",
    },
  },
  {
    number: 2,
    title: "Capture the Match",
    subtitle: "Get 100% of employer match",
    color: "#3498DB",
    content: {
      what: "Many employers offer a 401(k) match — they will put money into your retirement account when you contribute. A common structure is matching 50% of your contributions up to 6% of your salary. So if you make $60,000 and contribute 6% ($3,600/year), your employer adds $1,800. That is an instant 50% return on your money.",
      whyFree: "There is no investment in the world that guarantees a 50-100% immediate return. That is what an employer match is. Not contributing enough to get the full match is literally turning down free money. It is the single easiest financial win available to most working people.",
      howToSetUp: [
        "Check with your HR department or benefits portal for your employer's match details",
        "Increase your 401(k) contribution to at least the match threshold",
        "Choose a target-date fund if you are unsure where to invest within the 401(k)",
        "Set a calendar reminder to increase your contribution by 1% every year",
      ],
      noMatch: "If you do not have an employer match (self-employed, gig worker, or employer does not offer one), skip this step and move to Step 3. You can come back to retirement investing in Step 4. Do not let the lack of a match stop your progress on the other steps.",
    },
  },
  {
    number: 3,
    title: "Eliminate Consumer Debt",
    subtitle: "No high-interest debt. No revolving balances.",
    color: "#E74C3C",
    content: {
      goodVsBad: "Not all debt is equal. A mortgage at 3-4% on an appreciating asset is very different from credit card debt at 22% on stuff that loses value. Consumer debt — credit cards, personal loans, payday loans, high-interest car loans — is the enemy. It is a wealth destroyer that keeps you on a treadmill.",
      methods: {
        avalanche: "Pay minimums on everything, then throw all extra money at the highest interest rate debt first. Once that is paid off, roll that payment into the next highest rate. This saves the most money mathematically.",
        snowball: "Pay minimums on everything, then throw all extra money at the smallest balance first. Once that is paid off, roll that payment into the next smallest. This gives you quick wins and motivation.",
      },
      minimumPayments: "Making minimum payments on credit cards is a trap. On a $5,000 balance at 22% APR, minimum payments would take over 20 years to pay off and cost you over $8,000 in interest — more than the original balance. The credit card companies designed it this way. Do not play their game.",
      creditCards: "Credit card debt is the most urgent to eliminate. The average credit card APR is over 20%. That means every $1,000 of credit card debt costs you $200+ per year just in interest. Pay it off aggressively. Cut up the cards if you need to. Switch to debit until you have your spending under control.",
    },
  },
  {
    number: 4,
    title: "Secure, Invest, & Plan",
    subtitle: "3-6 months saved, invest 15%+, save for kids' college, fund large purchases in cash",
    color: "#9B59B6",
    content: {
      emergency: "Now that consumer debt is gone, build your emergency fund to 3-6 months of expenses. If your income is stable and you have dual income, 3 months may be enough. If you are self-employed or single income, aim for 6 months. This money sits in a high-yield savings account and is only touched for true emergencies.",
      investing: "Start investing at least 15% of your gross income. This includes any employer match from Step 2. If your employer matches 3%, you need to add at least 12% from your paycheck. Invest in low-cost index funds — a total stock market fund and an international fund cover most of what you need.",
      collegeSavings: "If you have children, look into 529 plans. These are tax-advantaged accounts specifically for education expenses. The money grows tax-free and withdrawals for qualified education expenses are tax-free too. Start early — even small monthly contributions compound significantly over 18 years.",
      cashPurchases: "Here is a mindset shift: if you cannot pay cash for it, you cannot afford it yet. Furniture, vacations, electronics, home renovations — save up and pay cash. The only exceptions are a home (mortgage) and possibly a reliable car if absolutely necessary. Financing depreciating assets is how people stay stuck.",
    },
  },
  {
    number: 5,
    title: "Build & Optimize",
    subtitle: "Increase wealth, reduce mortgage, grow ownership",
    color: "#F39C12",
    content: {
      incomeStreams: "Do not rely on a single paycheck. Build additional income streams: side business, freelancing, rental income, dividend investments, digital products. Multiple income streams provide security and accelerate wealth building. Even an extra $500-1,000/month invested can add hundreds of thousands to your net worth over time.",
      realEstate: "Real estate is one of the most proven wealth-building tools. Whether it is your primary residence, a rental property, or REITs in your investment portfolio, owning real estate provides appreciation, tax benefits, and potentially passive income. Start with your own home, then consider investment properties as your wealth grows.",
      mortgagePayoff: "Once everything else is handled, consider paying off your mortgage early. Extra principal payments can save you tens of thousands in interest and give you complete housing security. Even an extra $200/month on a $300,000 mortgage can cut 5+ years off your loan and save $50,000+ in interest.",
      netWorth: "At this stage, your focus shifts from defense to offense. Track your net worth monthly. Increase your investment percentage whenever your income grows. Maximize tax-advantaged accounts (401k, IRA, HSA). Look for opportunities to earn, save, and invest more. The goal is not just financial independence — it is financial abundance.",
    },
  },
];

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function StepContent({ step }: { step: (typeof steps)[number] }) {
  const c = step.content as Record<string, unknown>;

  if (step.number === 1) {
    const tips = c.tips as string[];
    return (
      <div className="space-y-6 text-gray-400 leading-relaxed">
        <div><h3 className="text-white font-semibold mb-2">Why This Is the Foundation</h3><p>{c.why as string}</p></div>
        <div><h3 className="text-white font-semibold mb-2">How to Calculate Your Monthly Expenses</h3><p>{c.howToCalc as string}</p></div>
        <div>
          <h3 className="text-white font-semibold mb-2">Tips for Building This Buffer</h3>
          <ul className="space-y-2">
            {tips.map((tip, i) => (<li key={i} className="flex gap-2"><span className="text-accent-green shrink-0">+</span><span>{tip}</span></li>))}
          </ul>
        </div>
        <div><h3 className="text-white font-semibold mb-2">What Counts as Expenses</h3><p>{c.whatCounts as string}</p></div>
      </div>
    );
  }

  if (step.number === 2) {
    const howToSetUp = c.howToSetUp as string[];
    return (
      <div className="space-y-6 text-gray-400 leading-relaxed">
        <div><h3 className="text-white font-semibold mb-2">What Is Employer Matching?</h3><p>{c.what as string}</p></div>
        <div><h3 className="text-white font-semibold mb-2">Why It Is Literally Free Money</h3><p>{c.whyFree as string}</p></div>
        <div>
          <h3 className="text-white font-semibold mb-2">How to Set It Up</h3>
          <ul className="space-y-2">
            {howToSetUp.map((item, i) => (<li key={i} className="flex gap-2"><span className="text-accent-green shrink-0">{i + 1}.</span><span>{item}</span></li>))}
          </ul>
        </div>
        <div><h3 className="text-white font-semibold mb-2">What If You Do Not Have an Employer Match?</h3><p>{c.noMatch as string}</p></div>
      </div>
    );
  }

  if (step.number === 3) {
    const methods = c.methods as { avalanche: string; snowball: string };
    return (
      <div className="space-y-6 text-gray-400 leading-relaxed">
        <div><h3 className="text-white font-semibold mb-2">Good Debt vs Bad Debt</h3><p>{c.goodVsBad as string}</p></div>
        <div><h3 className="text-white font-semibold mb-2">Avalanche Method</h3><p>{methods.avalanche}</p></div>
        <div><h3 className="text-white font-semibold mb-2">Snowball Method</h3><p>{methods.snowball}</p></div>
        <div><h3 className="text-white font-semibold mb-2">Why Minimum Payments Keep You Trapped</h3><p>{c.minimumPayments as string}</p></div>
        <div><h3 className="text-white font-semibold mb-2">Credit Card Debt Specifically</h3><p>{c.creditCards as string}</p></div>
      </div>
    );
  }

  if (step.number === 4) {
    return (
      <div className="space-y-6 text-gray-400 leading-relaxed">
        <div><h3 className="text-white font-semibold mb-2">Emergency Fund Sizing</h3><p>{c.emergency as string}</p></div>
        <div><h3 className="text-white font-semibold mb-2">Where to Invest</h3><p>{c.investing as string}</p></div>
        <div><h3 className="text-white font-semibold mb-2">529 Plans for College</h3><p>{c.collegeSavings as string}</p></div>
        <div><h3 className="text-white font-semibold mb-2">Paying Cash vs Financing</h3><p>{c.cashPurchases as string}</p></div>
      </div>
    );
  }

  return (
    <div className="space-y-6 text-gray-400 leading-relaxed">
      <div><h3 className="text-white font-semibold mb-2">Building Multiple Income Streams</h3><p>{c.incomeStreams as string}</p></div>
      <div><h3 className="text-white font-semibold mb-2">Real Estate</h3><p>{c.realEstate as string}</p></div>
      <div><h3 className="text-white font-semibold mb-2">Paying Off Your Mortgage Early</h3><p>{c.mortgagePayoff as string}</p></div>
      <div><h3 className="text-white font-semibold mb-2">Growing Net Worth</h3><p>{c.netWorth as string}</p></div>
    </div>
  );
}

export default function FreedomFivePage() {
  const [openStep, setOpenStep] = useState<number | null>(null);

  const toggleStep = (step: number) => {
    setOpenStep(openStep === step ? null : step);
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            name: "The Levi Five Framework",
            description:
              "A five-step framework for building financial independence. From one month of savings to wealth optimization.",
            author: { "@type": "Person", name: "Levi" },
            publisher: {
              "@type": "Organization",
              name: "Levi The Finance Guy",
              url: "https://levithefinanceguy.com",
            },
          }),
        }}
      />

      <div className="max-w-4xl mx-auto px-4 py-16">
        {/* Hero */}
        <div className="text-center mb-16 animate-fade-in-up">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4">
            The <span className="gradient-text">Levi Five</span>
          </h1>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto mb-2">
            Five steps. No fluff. A clear path from financial stress to financial freedom.
          </p>
          <p className="text-sm text-gray-500 max-w-xl mx-auto">
            Follow these steps in order. Master each one before moving to the next.
            This is the framework I use and recommend to everyone.
          </p>
        </div>

        {/* Progress Tracker */}
        <div className="mb-16">
          <div className="flex items-center justify-between relative">
            {/* Connecting line */}
            <div className="absolute top-5 left-0 right-0 h-0.5 bg-card-border" />
            {steps.map((step) => (
              <button
                key={step.number}
                onClick={() => toggleStep(step.number)}
                className="relative z-10 flex flex-col items-center group"
              >
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold text-black transition-all duration-300 group-hover:scale-110"
                  style={{ backgroundColor: step.color }}
                >
                  {step.number}
                </div>
                <span className="text-[10px] sm:text-xs text-gray-400 mt-2 max-w-[80px] text-center leading-tight hidden sm:block">
                  {step.title}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Steps */}
        <div className="space-y-4">
          {steps.map((step) => {
            const isOpen = openStep === step.number;
            return (
              <div
                key={step.number}
                className="rounded-xl border border-card-border overflow-hidden transition-all duration-300"
                style={{
                  borderColor: isOpen ? step.color + "40" : undefined,
                }}
              >
                <button
                  onClick={() => toggleStep(step.number)}
                  className="w-full flex items-center gap-4 p-6 bg-card-bg hover:bg-card-bg/80 transition-all text-left"
                >
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center text-lg font-bold text-black shrink-0 transition-transform duration-300"
                    style={{
                      backgroundColor: step.color,
                      transform: isOpen ? "scale(1.1)" : "scale(1)",
                    }}
                  >
                    {step.number}
                  </div>
                  <div className="flex-1">
                    <h2 className="text-lg font-bold">{step.title}</h2>
                    <p className="text-sm text-gray-400">{step.subtitle}</p>
                  </div>
                  <svg
                    className={`w-5 h-5 text-gray-400 transition-transform duration-300 ${
                      isOpen ? "rotate-180" : ""
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {isOpen && (
                  <div className="px-6 pb-6 animate-fade-in">
                    <StepContent step={step} />
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Disclaimer */}
        <div className="mt-12 p-6 rounded-xl border border-card-border bg-card-bg/50 text-center">
          <p className="text-sm text-gray-500 leading-relaxed">
            The Levi Five is a general guide, not financial advice. Everyone&apos;s situation is
            different — only you know what&apos;s best for your finances.
          </p>
        </div>

        {/* CTA */}
        <div className="mt-12 text-center">
          <h3 className="text-xl font-bold mb-4">Ready to take control?</h3>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/calculators"
              className="px-8 py-3 bg-gradient-to-r from-accent-green to-accent-teal text-black font-semibold rounded-lg hover:brightness-110 transition-all"
            >
              Use Our Free Calculators
            </Link>
            <Link
              href="/blog"
              className="px-8 py-3 border border-card-border text-white font-semibold rounded-lg hover:bg-card-bg transition-all"
            >
              Read the Blog
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
