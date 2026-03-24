import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Resources",
  description:
    "Books, apps, tools, and equipment Levi actually uses and recommends for building wealth and creating content.",
  openGraph: {
    title: "Resources | Levi The Finance Guy",
    description:
      "Levi's recommended books, apps, platforms, and gear. Only stuff he actually uses.",
  },
};

const books = [
  {
    title: "Atomic Habits",
    author: "James Clear",
    url: "https://amzn.to/4t7asXx",
    take: "This book rewired how I think about progress. Forget big goals — just get 1% better every day. It changed how I handle my money, my health, everything.",
  },
  {
    title: "The Psychology of Money",
    author: "Morgan Housel",
    url: "https://amzn.to/4d2tB8e",
    take: "The best money book I have ever read. It is not about spreadsheets or formulas. It is about why we do dumb stuff with money and how to stop.",
  },
  {
    title: "You Owe You",
    author: "Eric Thomas",
    url: "https://amzn.to/4t6Jcs6",
    take: "If you need a kick in the pants, this is it. ET does not sugarcoat anything. You are responsible for your own life. Period.",
  },
  {
    title: "Twelve and a Half",
    author: "Gary Vaynerchuk",
    url: "https://amzn.to/4uPqZ3P",
    take: "Gary V talks about the emotional skills that actually matter in business and life. Not the hustle stuff — the real stuff like patience, humility, and accountability.",
  },
  {
    title: "Don't Believe Everything You Think",
    author: "Joseph Nguyen",
    url: "https://amzn.to/3NULCLv",
    take: "Short read, massive impact. It helped me understand that most of the stuff holding me back was just thoughts I was choosing to believe.",
  },
];

const apps = [
  {
    name: "Robinhood",
    url: "https://join.robinhood.com/bretp22",
    description: "Where I invest. Simple interface, fractional shares, and the Gold Card is legit.",
  },
  {
    name: "Crypto.com",
    url: "https://crypto.com/app/gbnqpds3rm",
    description: "My go-to for crypto. Easy to use and solid rewards.",
  },
  {
    name: "Audible",
    url: "https://amzn.to/4lMl9w1",
    description: "I listen to most of the books I recommend on here. Audiobooks hit different during a commute.",
  },
  {
    name: "Amazon Prime",
    url: "https://amzn.to/4c2OmiZ",
    description: "I mean, it is Amazon. Free shipping, Prime Video, and all the deals.",
  },
];

const equipment = [
  {
    name: "RODE Wireless Micro",
    url: "https://amzn.to/47ijJng",
    description: "Tiny wireless mic that sounds way better than it should for the price. I use it for all my content.",
  },
  {
    name: "Magnetic Ring Light",
    url: "https://amzn.to/4d2ISG5",
    description: "Clips right onto your phone. Perfect for quick videos without a whole studio setup.",
  },
];

export default function ResourcesPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-16">
      <h1 className="text-3xl md:text-4xl font-extrabold text-center mb-4">
        My <span className="text-accent-green">Resources</span>
      </h1>
      <p className="text-gray-400 text-center max-w-2xl mx-auto mb-12">
        Books, apps, and tools I actually use. No fluff, no filler — just the stuff that has helped me along the way.
      </p>

      {/* Books */}
      <section className="mb-14">
        <h2 className="text-xl font-bold mb-6">Books I Recommend</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {books.map((book) => (
            <a
              key={book.title}
              href={book.url}
              target="_blank"
              rel="noopener noreferrer"
              className="block p-5 rounded-xl border border-card-border bg-card-bg hover:border-accent-green/50 transition-all"
            >
              <h3 className="font-semibold text-white mb-1">{book.title}</h3>
              <p className="text-xs text-accent-green mb-2">by {book.author}</p>
              <p className="text-sm text-gray-400 leading-relaxed">{book.take}</p>
            </a>
          ))}
        </div>
      </section>

      {/* Apps & Platforms */}
      <section className="mb-14">
        <h2 className="text-xl font-bold mb-6">Apps &amp; Platforms</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {apps.map((app) => (
            <a
              key={app.name}
              href={app.url}
              target="_blank"
              rel="noopener noreferrer"
              className="block p-5 rounded-xl border border-card-border bg-card-bg hover:border-accent-green/50 transition-all"
            >
              <h3 className="font-semibold text-white mb-1">{app.name}</h3>
              <p className="text-sm text-gray-400 leading-relaxed">{app.description}</p>
            </a>
          ))}
        </div>
      </section>

      {/* Equipment */}
      <section className="mb-14">
        <h2 className="text-xl font-bold mb-6">My Equipment</h2>
        <p className="text-gray-400 text-sm mb-4">For anyone making content — here is what I use.</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {equipment.map((item) => (
            <a
              key={item.name}
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              className="block p-5 rounded-xl border border-card-border bg-card-bg hover:border-accent-green/50 transition-all"
            >
              <h3 className="font-semibold text-white mb-1">{item.name}</h3>
              <p className="text-sm text-gray-400 leading-relaxed">{item.description}</p>
            </a>
          ))}
        </div>
      </section>

      {/* The Levi Five Resources */}
      <section className="mb-14">
        <h2 className="text-xl font-bold mb-2">The Levi Five Resources</h2>
        <p className="text-gray-400 text-sm mb-6">Tools that tie directly into each step of <a href="/the-levi-five" className="text-accent-green hover:underline">The Levi Five</a>.</p>
        <div className="space-y-4">
          <div className="p-5 rounded-xl border border-card-border bg-card-bg">
            <h3 className="font-semibold text-white mb-1">Step 1: One Month Security</h3>
            <p className="text-sm text-gray-400 mb-2">Park your emergency fund in a high-yield savings account so it actually earns something while it sits there.</p>
            <div className="flex flex-wrap gap-3 text-sm">
              <span className="text-gray-500">Recommended HYSAs:</span>
              <span className="text-accent-green">Marcus by Goldman Sachs</span>
              <span className="text-gray-600">·</span>
              <span className="text-accent-green">Ally Bank</span>
              <span className="text-gray-600">·</span>
              <span className="text-accent-green">SoFi</span>
            </div>
            <a href="/calculators/emergency-fund" className="inline-block mt-2 text-xs text-accent-green hover:underline">Emergency Fund Calculator →</a>
          </div>
          <div className="p-5 rounded-xl border border-card-border bg-card-bg">
            <h3 className="font-semibold text-white mb-1">Step 2: Capture the Match</h3>
            <p className="text-sm text-gray-400 mb-2">Make sure you are getting 100% of your employer match. Check with your HR department.</p>
            <a href="/calculators/retirement" className="inline-block text-xs text-accent-green hover:underline">Retirement Calculator →</a>
          </div>
          <div className="p-5 rounded-xl border border-card-border bg-card-bg">
            <h3 className="font-semibold text-white mb-1">Step 3: Eliminate Consumer Debt</h3>
            <p className="text-sm text-gray-400 mb-2">Know your numbers. Check your credit score for free and make a payoff plan.</p>
            <div className="flex flex-wrap gap-3 text-sm mb-2">
              <span className="text-gray-500">Free credit score:</span>
              <a href="https://www.creditkarma.com" target="_blank" rel="noopener noreferrer" className="text-accent-green hover:underline">Credit Karma</a>
              <span className="text-gray-600">·</span>
              <a href="https://www.annualcreditreport.com" target="_blank" rel="noopener noreferrer" className="text-accent-green hover:underline">AnnualCreditReport.com</a>
            </div>
            <a href="/calculators/debt-payoff" className="inline-block text-xs text-accent-green hover:underline">Debt Payoff Calculator →</a>
          </div>
          <div className="p-5 rounded-xl border border-card-border bg-card-bg">
            <h3 className="font-semibold text-white mb-1">Step 4: Secure, Invest, & Plan</h3>
            <p className="text-sm text-gray-400 mb-2">Start investing consistently. Even small amounts add up over time.</p>
            <div className="flex flex-wrap gap-3 text-sm mb-2">
              <a href="https://join.robinhood.com/bretp22" target="_blank" rel="noopener noreferrer" className="text-accent-green hover:underline">Robinhood</a>
              <span className="text-[10px] text-gray-600">(affiliate)</span>
            </div>
            <div className="flex flex-wrap gap-2">
              <a href="/calculators/compound-interest" className="inline-block text-xs text-accent-green hover:underline">Compound Interest Calculator →</a>
              <span className="text-gray-600">·</span>
              <a href="/calculators/fire" className="inline-block text-xs text-accent-green hover:underline">FIRE Calculator →</a>
            </div>
          </div>
          <div className="p-5 rounded-xl border border-card-border bg-card-bg">
            <h3 className="font-semibold text-white mb-1">Step 5: Build & Optimize</h3>
            <p className="text-sm text-gray-400 mb-2">Grow your wealth, pay down your mortgage, build ownership.</p>
            <div className="flex flex-wrap gap-2">
              <a href="/calculators/net-worth" className="inline-block text-xs text-accent-green hover:underline">Net Worth Calculator →</a>
              <span className="text-gray-600">·</span>
              <a href="/calculators/mortgage" className="inline-block text-xs text-accent-green hover:underline">Mortgage Calculator →</a>
              <span className="text-gray-600">·</span>
              <a href="/calculators/investment-growth" className="inline-block text-xs text-accent-green hover:underline">Investment Growth Calculator →</a>
            </div>
          </div>
        </div>
      </section>

      {/* Disclaimer */}
      <div className="mt-8 p-4 rounded-lg border border-card-border bg-card-bg/50">
        <p className="text-xs text-gray-500 leading-relaxed">
          Some of the links on this page are affiliate links. If you purchase through them, I may earn a small commission at no extra cost to you. I only recommend things I actually use.
        </p>
      </div>
    </div>
  );
}
