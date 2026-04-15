import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Support — Cheese App",
  description: "Get help with Cheese, the all-in-one finance and health tracking app.",
};

export default function SupportPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-16">
      <h1 className="text-4xl font-extrabold mb-2">
        <span className="gradient-text">Cheese Support</span>
      </h1>
      <p className="text-gray-400 mb-12">We&apos;re here to help.</p>

      <div className="space-y-10">
        <div>
          <h2 className="text-xl font-bold text-white mb-3">Contact Us</h2>
          <p className="text-gray-400 leading-relaxed">
            For questions, bug reports, or feature requests, email us at{" "}
            <a href="mailto:info@proctoradvisory.com" className="text-accent-green hover:underline">
              info@proctoradvisory.com
            </a>
          </p>
        </div>

        <div>
          <h2 className="text-xl font-bold text-white mb-3">Common Questions</h2>
          <div className="space-y-6">
            <div>
              <h3 className="text-white font-semibold mb-1">How do I cancel my subscription?</h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                Go to Settings on your iPhone &rarr; tap your name &rarr; Subscriptions &rarr; Cheese &rarr; Cancel. You can also manage subscriptions directly from the app under Me &rarr; Extra Cheese &rarr; Manage Subscription.
              </p>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-1">How do I delete my account and data?</h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                Go to Me &rarr; My Account &rarr; Delete Account. This permanently removes all cloud-synced data. Local data is removed when you delete the app.
              </p>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-1">How do I restore my purchases?</h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                Go to Me &rarr; Extra Cheese &rarr; Restore Purchases. Make sure you&apos;re signed in with the same Apple ID you used to purchase.
              </p>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-1">Is my data private?</h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                Yes. All data is stored locally on your device. Cloud sync is optional and uses Firebase. We don&apos;t sell your data, serve ads, or use tracking SDKs. See our{" "}
                <a href="/cheese/privacy" className="text-accent-green hover:underline">Privacy Policy</a> for details.
              </p>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-1">How accurate is the AI food scanning?</h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                AI-powered features (Snap to Log, Describe to Log, Recipe Import) use Google Gemini to estimate nutrition. Results are approximate and clearly marked. Always review before logging.
              </p>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-1">How do I link my bank or brokerage?</h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                This is a premium feature. Go to Finance &rarr; Investing &rarr; Link Brokerage, or Finance &rarr; Budget &rarr; Link Bank Account. Cheese uses Plaid to securely connect to your financial institution.
              </p>
            </div>
          </div>
        </div>

        <div>
          <h2 className="text-xl font-bold text-white mb-3">Links</h2>
          <div className="flex flex-wrap gap-4">
            <a href="/cheese/terms" className="text-accent-green hover:underline text-sm">Terms of Use</a>
            <a href="/cheese/privacy" className="text-accent-green hover:underline text-sm">Privacy Policy</a>
            <a href="/cheese" className="text-accent-green hover:underline text-sm">About Cheese</a>
          </div>
        </div>
      </div>
    </div>
  );
}
