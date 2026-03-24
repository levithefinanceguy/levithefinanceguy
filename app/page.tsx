import Link from "next/link";
import type { Metadata } from "next";
import { posts } from "../content/posts";

export const metadata: Metadata = {
  title: "Levi The Finance Guy | Transparent Personal Finance & Investing",
  description:
    "Follow Levi's transparent investing journey. View his real portfolio, use free financial calculators, and learn about building wealth through smart money decisions.",
};

const featuredCalcs = [
  { name: "Compound Interest", href: "/calculators/compound-interest", icon: "%" },
  { name: "FIRE Calculator", href: "/calculators/fire", icon: "F" },
  { name: "Investment Growth", href: "/calculators/investment-growth", icon: "G" },
  { name: "Net Worth", href: "/calculators/net-worth", icon: "$" },
  { name: "Debt Payoff", href: "/calculators/debt-payoff", icon: "D" },
  { name: "Retirement", href: "/calculators/retirement", icon: "R" },
];

const freedomSteps = [
  { number: 1, title: "One Month Security", color: "#2ECC71" },
  { number: 2, title: "Capture the Match", color: "#3498DB" },
  { number: 3, title: "Eliminate Debt", color: "#E74C3C" },
  { number: 4, title: "Secure & Invest", color: "#9B59B6" },
  { number: 5, title: "Build & Optimize", color: "#F39C12" },
];

function formatDate(dateStr: string) {
  return new Date(dateStr + "T00:00:00").toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export default function Home() {
  const latestPosts = [...posts]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 3);

  return (
    <>
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebSite",
            name: "Levi The Finance Guy",
            url: "https://levithefinanceguy.com",
            description:
              "Transparent personal finance education with a real public portfolio and free financial calculators.",
            author: {
              "@type": "Person",
              name: "Levi",
              url: "https://levithefinanceguy.com/about",
            },
          }),
        }}
      />

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-accent-green/5 via-transparent to-transparent pointer-events-none" />
        <div className="max-w-6xl mx-auto px-4 py-24 md:py-36 text-center relative">
          <div className="animate-fade-in-up">
            <p className="text-accent-green text-sm font-semibold tracking-widest uppercase mb-6">
              Transparent Investing
            </p>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tight mb-6 leading-[1.1]">
              I show you <span className="gradient-text">exactly</span>
              <br />
              how I build wealth.
            </h1>
            <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto mb-4">
              Real portfolio. Real numbers. No gatekeeping. No courses to sell.
              Just a regular guy sharing what actually works.
            </p>
            <p className="text-base text-gray-500 max-w-xl mx-auto mb-10">
              Follow my investing journey, use free calculators, and learn the
              framework that changed my financial life.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/portfolio"
                className="px-8 py-3.5 bg-gradient-to-r from-accent-green to-accent-teal text-black font-semibold rounded-lg hover:brightness-110 transition-all duration-200 hover:shadow-lg hover:shadow-accent-green/20"
              >
                View My Portfolio
              </Link>
              <Link
                href="/freedom-five"
                className="px-8 py-3.5 border border-card-border text-white font-semibold rounded-lg hover:bg-card-bg hover:border-accent-green/30 transition-all duration-200"
              >
                The Freedom Five
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Freedom Five Quick Links */}
      <section className="bg-card-bg/50 border-y border-card-border">
        <div className="max-w-6xl mx-auto px-4 py-16">
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-bold mb-3">
              The <span className="gradient-text">Freedom Five</span> Framework
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Five steps from financial stress to financial freedom. No complexity, no BS.
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {freedomSteps.map((step) => (
              <Link
                key={step.number}
                href="/freedom-five"
                className="glass-card p-5 rounded-xl text-center group transition-all duration-300 hover:scale-[1.02]"
              >
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center text-sm font-bold text-black mx-auto mb-3 transition-transform duration-300 group-hover:scale-110"
                  style={{ backgroundColor: step.color }}
                >
                  {step.number}
                </div>
                <p className="text-sm font-medium text-gray-300">{step.title}</p>
              </Link>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link
              href="/freedom-five"
              className="text-sm text-accent-green hover:underline font-medium"
            >
              Learn the full framework &rarr;
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Sections */}
      <section className="max-w-6xl mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 gap-8">
          <Link
            href="/portfolio"
            className="group block p-8 rounded-xl glass-card transition-all duration-300 hover:scale-[1.01]"
          >
            <div className="text-3xl mb-4">&#128200;</div>
            <h3 className="text-xl font-bold mb-2 group-hover:text-accent-green transition-colors">
              Public Portfolio
            </h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              See every stock I own, what I paid, and how it is performing. Full transparency with
              real dollar amounts, gain/loss tracking, and allocation breakdowns.
            </p>
          </Link>

          <Link
            href="/calculators"
            className="group block p-8 rounded-xl glass-card transition-all duration-300 hover:scale-[1.01]"
          >
            <div className="text-3xl mb-4">&#128290;</div>
            <h3 className="text-xl font-bold mb-2 group-hover:text-accent-green transition-colors">
              Free Calculators
            </h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              19 free calculators for finance and health. Compound interest, investment growth,
              FIRE, retirement, mortgage, debt payoff, tax brackets, and more.
            </p>
          </Link>
        </div>
      </section>

      {/* Popular Calculators */}
      <section className="bg-card-bg/50 border-y border-card-border">
        <div className="max-w-6xl mx-auto px-4 py-16">
          <h2 className="text-2xl font-bold mb-8 text-center">Popular Calculators</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 stagger-children">
            {featuredCalcs.map((calc) => (
              <Link
                key={calc.href}
                href={calc.href}
                className="glass-card flex flex-col items-center p-5 rounded-xl transition-all duration-300 text-center group hover:scale-[1.03]"
              >
                <span className="text-2xl font-bold gradient-text mb-2 transition-transform duration-300 group-hover:scale-110">
                  {calc.icon}
                </span>
                <span className="text-sm font-medium text-gray-300">{calc.name}</span>
              </Link>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link
              href="/calculators"
              className="text-sm text-accent-green hover:underline font-medium"
            >
              View all 19 calculators &rarr;
            </Link>
          </div>
        </div>
      </section>

      {/* Latest Blog Posts */}
      <section className="max-w-6xl mx-auto px-4 py-16">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold">Latest Articles</h2>
          <Link
            href="/blog"
            className="text-sm text-accent-green hover:underline font-medium"
          >
            View all &rarr;
          </Link>
        </div>
        <div className="grid md:grid-cols-3 gap-6 stagger-children">
          {latestPosts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group p-6 rounded-xl glass-card transition-all duration-300 hover:scale-[1.02]"
            >
              <span className="text-xs text-accent-green font-semibold uppercase tracking-wider">
                {post.category}
              </span>
              <h3 className="text-lg font-semibold mt-2 mb-2 group-hover:text-accent-green transition-colors">
                {post.title}
              </h3>
              <p className="text-gray-400 text-sm leading-relaxed mb-3">{post.description}</p>
              <div className="flex items-center gap-2 text-xs text-gray-500">
                <span>{formatDate(post.date)}</span>
                <span>&middot;</span>
                <span>{post.readingTime}</span>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
