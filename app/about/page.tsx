import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Levi",
  description:
    "Learn about Levi The Finance Guy, his mission for transparent financial education, and why he shares his portfolio publicly.",
  openGraph: {
    title: "About | Levi The Finance Guy",
    description:
      "Levi's story, mission, and commitment to transparent personal finance education.",
  },
};

export default function AboutPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Person",
            name: "Levi",
            url: "https://levithefinanceguy.com",
            description:
              "Personal finance educator and transparent investor sharing his real portfolio and free financial tools.",
            sameAs: [
              "https://www.youtube.com/@levithefinanceguy/shorts",
              "https://www.tiktok.com/@levithefinanceguy",
              "https://instagram.com/levithefinanceguy",
              "https://www.facebook.com/share/18H1hiqGQQ/?mibextid=wwXIfr",
            ],
          }),
        }}
      />

      <div className="max-w-4xl mx-auto px-4 py-16">
        {/* Photo */}
        <div className="flex justify-center mb-10">
          <img
            src="/levi.png"
            alt="Levi — The Finance Guy"
            className="w-40 h-40 rounded-full border-2 border-accent-green object-cover"
          />
        </div>

        <h1 className="text-3xl md:text-4xl font-extrabold text-center mb-4">
          About <span className="text-accent-green">Levi</span>
        </h1>
        <p className="text-gray-400 text-center max-w-2xl mx-auto mb-12">
          Finance nerd, transparent investor, and builder of tools that help people take control of their money.
        </p>

        {/* Bio */}
        <section className="mb-12">
          <h2 className="text-xl font-bold mb-4">Who I Am</h2>
          <div className="text-gray-400 leading-relaxed space-y-4">
            <p>
              Hey, I am Levi. I first got into personal finance back in high school — we had
              a class on it and something just clicked. It peaked my interest early and I have
              been thinking about money ever since.
            </p>
            <p>
              That said, I am not going to pretend I had it all figured out. I have fallen off
              the wagon more times than I can count. Spent everything, started from zero, built
              it back up, and then did it all over again. But every time I learned something new,
              and now I finally have a plan I can actually stick with.
            </p>
            <p>
              I am not a financial advisor. I am just a regular guy who likes to keep things as
              simple and easy as possible. I built this site and the Cheese app to share what I
              have learned along the way and hopefully help other people avoid some of the mistakes
              I made.
            </p>
            <p>
              I am transparent about everything — my real numbers, my real portfolio, the good and
              the bad — because I want to show people that it can be done, even if you have had to
              start over a few times.
            </p>
          </div>
        </section>

        {/* Mission */}
        <section className="mb-12 p-8 rounded-xl bg-card-bg border border-card-border">
          <h2 className="text-xl font-bold mb-4 text-accent-green">My Mission</h2>
          <div className="text-gray-400 leading-relaxed space-y-4">
            <p>
              Most finance content hides the real numbers. People tell you what to do but
              never show you what they actually do. I think that is backwards.
            </p>
            <p>
              My mission is radical transparency. I publish my real portfolio so you can see
              exactly what I invest in, what I paid, and how it performs over time, including the
              losses. I build free calculators so you can plan your own financial future without
              paying for tools that should be free.
            </p>
            <p>
              Financial literacy should not be gatekept behind paywalls and courses. Everything
              on this site is free and always will be.
            </p>
          </div>
        </section>

        {/* Links */}
        <section className="mb-12">
          <h2 className="text-xl font-bold mb-4">Connect With Me</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <a
              href="https://www.youtube.com/@levithefinanceguy/shorts"
              target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-3 p-4 rounded-lg border border-card-border bg-card-bg hover:border-accent-green/50 transition-all"
            >
              <span className="text-accent-green font-bold text-lg">YT</span>
              <span className="text-gray-300">YouTube</span>
            </a>
            <a
              href="https://www.tiktok.com/@levithefinanceguy"
              target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-3 p-4 rounded-lg border border-card-border bg-card-bg hover:border-accent-green/50 transition-all"
            >
              <span className="text-accent-green font-bold text-lg">TT</span>
              <span className="text-gray-300">TikTok</span>
            </a>
            <a
              href="https://instagram.com/levithefinanceguy"
              target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-3 p-4 rounded-lg border border-card-border bg-card-bg hover:border-accent-green/50 transition-all"
            >
              <span className="text-accent-green font-bold text-lg">IG</span>
              <span className="text-gray-300">Instagram</span>
            </a>
            <a
              href="https://www.facebook.com/share/18H1hiqGQQ/?mibextid=wwXIfr"
              target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-3 p-4 rounded-lg border border-card-border bg-card-bg hover:border-accent-green/50 transition-all"
            >
              <span className="text-accent-green font-bold text-lg">FB</span>
              <span className="text-gray-300">Facebook</span>
            </a>
          </div>
        </section>

        {/* Cheese App */}
        <section className="p-8 rounded-xl bg-card-bg border border-card-border text-center">
          <h2 className="text-xl font-bold mb-2">Check Out Cheese</h2>
          <p className="text-gray-400 mb-4">
            I also built Cheese, an all-in-one personal finance and health tracking app for iOS.
            Budget tracking, investment portfolio, calorie counting, and more.
          </p>
          {/* Replace # with actual App Store link */}
          <a
            href="#"
            className="inline-block px-6 py-3 bg-accent-green text-black font-semibold rounded-lg hover:brightness-110 transition-all"
          >
            Download Cheese on the App Store
          </a>
        </section>
      </div>
    </>
  );
}
