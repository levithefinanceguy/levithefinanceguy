import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Privacy policy for Levi The Finance Guy website.",
};

export default function PrivacyPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-16">
      <h1 className="text-3xl font-bold mb-8">Privacy Policy</h1>
      <p className="text-gray-400 mb-4">Last updated: March 30, 2026</p>

      <div className="space-y-8 text-gray-300 leading-relaxed">
        <section>
          <h2 className="text-xl font-semibold text-white mb-3">Overview</h2>
          <p>
            Levi The Finance Guy (&quot;we&quot;, &quot;us&quot;, &quot;our&quot;) operates the website levithefinanceguy.com. This page informs you of our policies regarding the collection, use, and disclosure of information when you use our website.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-white mb-3">Information We Collect</h2>
          <p>
            We do not collect personal information directly. Our website does not require account creation or login. However, third-party services we use may collect information as described below.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-white mb-3">Google AdSense</h2>
          <p>
            We use Google AdSense to display advertisements on our website. Google AdSense may use cookies and web beacons to serve ads based on your prior visits to our website or other websites. You can opt out of personalized advertising by visiting{" "}
            <a href="https://www.google.com/settings/ads" className="text-blue-400 hover:underline" target="_blank" rel="noopener noreferrer">
              Google Ads Settings
            </a>.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-white mb-3">Google Analytics</h2>
          <p>
            We may use Google Analytics to understand how visitors interact with our website. This service collects anonymous usage data such as pages visited, time spent, and device type. No personally identifiable information is collected.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-white mb-3">Third-Party Links</h2>
          <p>
            Our website may contain links to third-party websites, including affiliate links. We are not responsible for the privacy practices or content of these external sites. Some links on this site are affiliate links, meaning we may earn a commission if you make a purchase through them at no additional cost to you.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-white mb-3">Financial Disclaimer</h2>
          <p>
            The content on this website, including portfolio data, calculators, and market information, is for educational and informational purposes only. Nothing on this site constitutes investment advice, financial advice, or a recommendation to buy or sell any security. Always do your own research and consult a qualified financial professional before making investment decisions. Past performance does not guarantee future results.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-white mb-3">Market Data</h2>
          <p>
            Stock prices and market data displayed on this website are provided by third-party APIs and may be delayed or inaccurate. We make no guarantees regarding the accuracy, completeness, or timeliness of any market data shown.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-white mb-3">Cheese App</h2>
          <p>
            If you use the Cheese app, its privacy policy governs the collection and use of your data within the app. The Cheese app stores data locally on your device by default. Optional cloud sync uses Firebase. For the full Cheese privacy policy, visit the app&apos;s settings page.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-white mb-3">Changes to This Policy</h2>
          <p>
            We may update this privacy policy from time to time. Any changes will be posted on this page with an updated date.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-white mb-3">Contact</h2>
          <p>
            If you have questions about this privacy policy, contact us at{" "}
            <a href="mailto:info@proctoradvisory.com" className="text-blue-400 hover:underline">
              info@proctoradvisory.com
            </a>.
          </p>
        </section>
      </div>
    </div>
  );
}
