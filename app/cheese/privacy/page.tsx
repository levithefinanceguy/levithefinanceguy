import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy — Cheese App",
  description: "Privacy Policy for Cheese, the all-in-one finance and health tracking app.",
};

export default function PrivacyPage() {
  const sections = [
    {
      title: "Data We Collect",
      body: "Cheese collects only the data you explicitly enter or authorize:\n\n\u2022 Health metrics: calories, macros (protein, carbs, fat, fiber, sugar, sodium), weight, water intake, workouts, journal entries\n\u2022 Step count, flights climbed, and distance (via Apple HealthKit, with your permission)\n\u2022 Financial data: budget categories, expenses, investment holdings, net worth, linked bank/brokerage data\n\u2022 Profile information: name, email, preferences, goals\n\u2022 Photos: food photos for AI analysis, weight progress photos, receipt images (processed and not stored on our servers)",
    },
    {
      title: "How Data Is Stored",
      body: "All data is stored locally on your device using Apple's SwiftData framework.\n\nIf you create an account, your data is synced to Firebase Firestore so you can access it across devices. Cloud sync is entirely optional \u2014 Cheese works fully offline.\n\nPlaid access tokens for linked bank and brokerage accounts are stored in your device's Keychain with the highest security level (accessible only when device is unlocked, not backed up to iCloud).",
    },
    {
      title: "Third-Party Services",
      body: "Cheese uses the following third-party services:\n\n\u2022 FatSecret \u2014 food and nutrition database (food queries only, no personal data sent)\n\u2022 Culture API \u2014 our own food database for faster lookups (food queries only)\n\u2022 Open Food Facts \u2014 barcode lookup fallback (barcode queries only, no personal data)\n\u2022 Google Gemini AI \u2014 photo food identification, natural language food parsing, meal suggestions, recipe parsing, receipt scanning (images and text are processed by Google's AI and not stored)\n\u2022 Plaid \u2014 bank and brokerage account linking (financial data accessed with your explicit consent, governed by Plaid's privacy policy)\n\u2022 Yahoo Finance \u2014 stock price data (ticker symbols only, no personal data sent)\n\u2022 Firebase Authentication \u2014 account creation and sign-in (email only)\n\u2022 Firebase Firestore \u2014 optional cloud sync of your app data\n\u2022 Apple HealthKit \u2014 step count, workouts, distance (read-only, with your permission)\n\u2022 Apple StoreKit \u2014 subscription and purchase management",
    },
    {
      title: "AI-Powered Features",
      body: "Cheese uses Google Gemini AI for:\n\n\u2022 Identifying food from photos (Snap to Log)\n\u2022 Parsing natural language food descriptions (Describe to Log)\n\u2022 Generating meal suggestions based on remaining macros\n\u2022 Parsing recipe URLs into ingredient lists\n\u2022 Reading nutrition labels from product photos\n\u2022 Scanning receipts for expense categorization\n\nPhotos and text sent to Gemini are processed in real-time and are not stored by Cheese or Google after processing. AI-generated nutrition values are estimates and may not be exact \u2014 all AI results are clearly marked with a disclaimer.",
    },
    {
      title: "Financial Data (Plaid)",
      body: "If you choose to link a bank or brokerage account via Plaid:\n\n\u2022 You authenticate directly with your financial institution through Plaid's secure interface\n\u2022 Cheese receives transaction data and/or investment holdings as authorized\n\u2022 Access tokens are stored locally in your device's Keychain\n\u2022 You can disconnect at any time, which revokes the access token\n\u2022 Cheese does not store your bank credentials",
    },
    {
      title: "What We Don't Do",
      body: "\u2022 We do not sell your data\n\u2022 We do not serve advertisements\n\u2022 We do not use analytics or tracking SDKs\n\u2022 We do not share your data with third parties for marketing\n\u2022 We do not store your bank or brokerage credentials\n\u2022 We do not retain photos sent for AI analysis",
    },
    {
      title: "Data Deletion",
      body: "You can delete your account at any time from Me \u2192 My Account \u2192 Delete Account. This permanently removes all cloud-synced data from Firebase, including all health, financial, and preference data.\n\nLinked Plaid accounts are disconnected and access tokens are revoked.\n\nLocal data on your device can be removed by deleting Cheese.",
    },
    {
      title: "Children's Privacy",
      body: "Cheese is not intended for use by children under the age of 13. We do not knowingly collect personal information from children.",
    },
    {
      title: "Contact",
      body: "If you have questions about this privacy policy, please contact us at info@proctoradvisory.com.",
    },
  ];

  return (
    <div className="max-w-3xl mx-auto px-4 py-16">
      <h1 className="text-4xl font-extrabold mb-2">
        <span className="gradient-text">Privacy Policy</span>
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
