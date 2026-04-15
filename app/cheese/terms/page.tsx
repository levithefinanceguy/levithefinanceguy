import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Use — Cheese App",
  description: "Terms of Use for Cheese, the all-in-one finance and health tracking app.",
};

export default function TermsPage() {
  const sections = [
    {
      title: "Acceptance of Terms",
      body: 'By downloading, installing, or using Cheese ("the App"), you agree to be bound by these Terms of Service. If you do not agree to these terms, do not use the App.',
    },
    {
      title: "Description of Service",
      body: "Cheese is a personal life-tracking application that helps you monitor health metrics (calories, macros, weight, steps, workouts, water intake, journaling) and financial data (budgets, expenses, investments, net worth). The App includes AI-powered features for food identification, meal suggestions, and receipt scanning. The App is provided \"as is\" for personal, non-commercial use.",
    },
    {
      title: "Subscriptions & Premium Features",
      body: "Cheese offers a free tier with core tracking features and a premium subscription (\"Extra Cheese\") that unlocks additional capabilities including AI-powered food scanning, meal suggestions, recipe import, receipt scanning, live stock prices, and bank/brokerage account linking.\n\nSubscriptions are billed through Apple's App Store and are subject to Apple's subscription terms. You can manage or cancel your subscription at any time through your Apple ID settings.\n\nSubscription auto-renews unless canceled at least 24 hours before the end of the current period. No refunds are provided for partial billing periods.",
    },
    {
      title: "User Accounts",
      body: "You may use Cheese without creating an account. If you choose to create an account, you are responsible for maintaining the confidentiality of your credentials. You agree to provide accurate information and to notify us of any unauthorized use of your account.",
    },
    {
      title: "User Data",
      body: "You retain ownership of all data you enter into Cheese. By using cloud sync features, you grant us a limited license to store and transmit your data solely for the purpose of providing the sync service. See our Privacy Policy for details on how your data is handled.",
    },
    {
      title: "AI-Powered Features",
      body: "Cheese uses artificial intelligence (Google Gemini) to identify food from photos, parse natural language descriptions, suggest meals, read nutrition labels, and scan receipts. AI-generated results are estimates and may contain errors.\n\nAll AI-generated content is clearly marked with a disclaimer. You are responsible for reviewing AI results before logging them. Cheese is not liable for inaccuracies in AI-generated nutrition data.",
    },
    {
      title: "Financial Services",
      body: "Cheese integrates with Plaid to allow you to link bank and brokerage accounts for automatic transaction and holding import. By linking accounts, you authorize Plaid to access your financial data on your behalf.\n\nCheese is not a financial advisor, bank, or broker. Investment data, portfolio values, and financial calculations are for informational purposes only. Stock prices may be delayed. Always consult a qualified financial professional for investment decisions.",
    },
    {
      title: "Health & Nutrition Disclaimer",
      body: "The App is not a substitute for professional medical or nutritional advice. Calorie calculations, macro targets, TDEE estimates, weight projections, and meal suggestions are approximations for informational purposes only.\n\nNutrition data from third-party databases (FatSecret, Open Food Facts, USDA) and AI analysis may contain errors. Always consult qualified healthcare professionals for health and dietary decisions.",
    },
    {
      title: "Acceptable Use",
      body: "You agree not to:\n\n\u2022 Use Cheese for any unlawful purpose\n\u2022 Attempt to reverse engineer, decompile, or disassemble the App\n\u2022 Interfere with or disrupt the App's services or servers\n\u2022 Use the App to store or transmit malicious content\n\u2022 Abuse AI features by sending harmful, illegal, or inappropriate content\n\u2022 Attempt to bypass premium subscription gates",
    },
    {
      title: "Third-Party Services",
      body: "The App integrates with third-party services including FatSecret, Open Food Facts, Google Gemini AI, Plaid, Yahoo Finance, Firebase, and Apple HealthKit. Your use of these services is subject to their respective terms. We are not responsible for the availability or accuracy of third-party data.",
    },
    {
      title: "Intellectual Property",
      body: "You may not copy, modify, distribute, or reverse engineer Cheese or any part of it without permission from the developer. The Cheese name, logo, and brand assets are the property of Cheese Labs.",
    },
    {
      title: "Termination",
      body: "You may stop using Cheese at any time by deleting it from your device. If you have an account, you may delete it from Me \u2192 My Account \u2192 Delete Account, which will permanently remove all cloud-synced data. Active subscriptions must be canceled separately through your Apple ID settings. We reserve the right to suspend or terminate access for violations of these terms.",
    },
    {
      title: "Limitation of Liability",
      body: "To the maximum extent permitted by law, the developer shall not be liable for any indirect, incidental, special, consequential, or punitive damages, or any loss of data, arising from your use of Cheese. This includes but is not limited to: inaccurate nutrition data, incorrect financial calculations, AI estimation errors, or third-party service interruptions.",
    },
    {
      title: "Changes to Terms",
      body: "We may update these terms from time to time. Continued use of Cheese after changes constitutes acceptance of the new terms.",
    },
    {
      title: "Contact",
      body: "If you have questions about these Terms of Service, please contact us at info@proctoradvisory.com.",
    },
  ];

  return (
    <div className="max-w-3xl mx-auto px-4 py-16">
      <h1 className="text-4xl font-extrabold mb-2">
        <span className="gradient-text">Terms of Use</span>
      </h1>
      <p className="text-gray-400 mb-12">Last updated: April 12, 2026</p>

      <div className="space-y-10">
        {sections.map((section) => (
          <div key={section.title}>
            <h2 className="text-xl font-bold text-white mb-3">{section.title}</h2>
            <p className="text-gray-400 leading-relaxed whitespace-pre-line">{section.body}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
