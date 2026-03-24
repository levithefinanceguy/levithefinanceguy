import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Levi The Finance Guy | Transparent Personal Finance & Investing",
  description:
    "Follow Levi's transparent investing journey. View his real portfolio, use free financial calculators, and learn about building wealth through smart money decisions.",
};

const featuredCalcs = [
  { name: "Compound Interest", href: "/calculators/compound-interest", icon: "%" },
  { name: "FIRE Calculator", href: "/calculators/fire", icon: "F" },
  { name: "Mortgage", href: "/calculators/mortgage", icon: "H" },
  { name: "Net Worth", href: "/calculators/net-worth", icon: "$" },
];

const blogPosts = [
  {
    title: "Why I Share My Portfolio Publicly",
    excerpt: "Transparency builds trust. Here's why I let everyone see exactly what I invest in and how it performs.",
    date: "Coming Soon",
  },
  {
    title: "The Power of Compound Interest",
    excerpt: "Einstein supposedly called it the eighth wonder of the world. Here's why compound interest is the most powerful wealth-building tool.",
    date: "Coming Soon",
  },
  {
    title: "How I'm Planning for FIRE",
    excerpt: "Financial Independence, Retire Early. My exact strategy, numbers, and timeline for reaching financial freedom.",
    date: "Coming Soon",
  },
];

export default function Home() {
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
        <div className="max-w-6xl mx-auto px-4 py-24 md:py-36 text-center">
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6">
            <span className="text-accent-green">Levi</span> The Finance Guy
          </h1>
          <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto mb-4">
            Real portfolio. Real numbers. No gatekeeping.
          </p>
          <p className="text-base text-gray-500 max-w-xl mx-auto mb-10">
            I believe financial education should be transparent and accessible to everyone.
            Follow my investing journey, use free tools to plan your finances, and learn
            how to build wealth the smart way.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/portfolio"
              className="px-8 py-3 bg-accent-green text-black font-semibold rounded-lg hover:brightness-110 transition-all"
            >
              View My Portfolio
            </Link>
            <Link
              href="/calculators"
              className="px-8 py-3 border border-card-border text-white font-semibold rounded-lg hover:bg-card-bg transition-all"
            >
              Financial Calculators
            </Link>
          </div>
        </div>
      </section>

      {/* About Intro */}
      <section className="bg-card-bg border-y border-card-border">
        <div className="max-w-6xl mx-auto px-4 py-16 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">What This Site Is About</h2>
          <p className="text-gray-400 max-w-3xl mx-auto leading-relaxed">
            Most finance influencers hide their actual numbers. I do the opposite. Here you will find
            my real investment portfolio updated regularly, along with free calculators to help you make
            smarter financial decisions. Whether you are just starting out or optimizing an existing
            strategy, everything here is designed to help you build wealth with confidence.
          </p>
        </div>
      </section>

      {/* Featured Sections */}
      <section className="max-w-6xl mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 gap-8">
          {/* Portfolio Card */}
          <Link
            href="/portfolio"
            className="group block p-8 rounded-xl border border-card-border bg-card-bg hover:border-accent-green/50 transition-all"
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

          {/* Calculators Card */}
          <Link
            href="/calculators"
            className="group block p-8 rounded-xl border border-card-border bg-card-bg hover:border-accent-green/50 transition-all"
          >
            <div className="text-3xl mb-4">&#128290;</div>
            <h3 className="text-xl font-bold mb-2 group-hover:text-accent-green transition-colors">
              Free Calculators
            </h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              Compound interest, mortgage, FIRE, retirement, net worth, and more. All free, all
              interactive, all designed to help you make better financial decisions.
            </p>
          </Link>
        </div>
      </section>

      {/* Quick Calculator Links */}
      <section className="bg-card-bg border-y border-card-border">
        <div className="max-w-6xl mx-auto px-4 py-16">
          <h2 className="text-2xl font-bold mb-8 text-center">Popular Calculators</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {featuredCalcs.map((calc) => (
              <Link
                key={calc.href}
                href={calc.href}
                className="flex flex-col items-center p-6 rounded-lg border border-card-border bg-background hover:border-accent-green/50 transition-all text-center"
              >
                <span className="text-2xl font-bold text-accent-green mb-2">{calc.icon}</span>
                <span className="text-sm font-medium">{calc.name}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Blog Preview */}
      <section className="max-w-6xl mx-auto px-4 py-16">
        <h2 className="text-2xl font-bold mb-8 text-center">Latest Articles</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {blogPosts.map((post) => (
            <div
              key={post.title}
              className="p-6 rounded-xl border border-card-border bg-card-bg"
            >
              <span className="text-xs text-accent-green font-medium">{post.date}</span>
              <h3 className="text-lg font-semibold mt-2 mb-2">{post.title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed">{post.excerpt}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
