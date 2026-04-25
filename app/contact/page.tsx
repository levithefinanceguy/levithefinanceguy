import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with Levi The Finance Guy. Questions, feedback, collaboration inquiries, and business opportunities.",
  openGraph: {
    title: "Contact | Levi The Finance Guy",
    description:
      "Reach out to Levi for questions, feedback, or collaboration opportunities.",
  },
};

export default function ContactPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-16">
      <h1 className="text-4xl font-bold text-white mb-4">Get in Touch</h1>
      <p className="text-gray-400 mb-12 text-lg">
        Have a question, suggestion, or want to work together? I read every message.
      </p>

      <div className="space-y-10">
        <div className="bg-gray-900/50 border border-gray-800 rounded-2xl p-8">
          <h2 className="text-xl font-bold text-white mb-3">General Questions</h2>
          <p className="text-gray-400 mb-4">
            Questions about personal finance, the Cheese app, the blog, or anything else.
          </p>
          <a
            href="mailto:levi@proctoradvisory.com"
            className="text-accent-green font-semibold hover:underline"
          >
            levi@proctoradvisory.com
          </a>
        </div>

        <div className="bg-gray-900/50 border border-gray-800 rounded-2xl p-8">
          <h2 className="text-xl font-bold text-white mb-3">App Support</h2>
          <p className="text-gray-400 mb-4">
            Bug reports, feature requests, or issues with the Cheese app.
          </p>
          <a
            href="mailto:info@proctoradvisory.com"
            className="text-accent-green font-semibold hover:underline"
          >
            info@proctoradvisory.com
          </a>
        </div>

        <div className="bg-gray-900/50 border border-gray-800 rounded-2xl p-8">
          <h2 className="text-xl font-bold text-white mb-3">Business & Collaborations</h2>
          <p className="text-gray-400 mb-4">
            Sponsorships, partnerships, affiliate opportunities, or press inquiries.
          </p>
          <a
            href="mailto:levi@proctoradvisory.com"
            className="text-accent-green font-semibold hover:underline"
          >
            levi@proctoradvisory.com
          </a>
        </div>

        <div className="bg-gray-900/50 border border-gray-800 rounded-2xl p-8">
          <h2 className="text-xl font-bold text-white mb-3">Social Media</h2>
          <p className="text-gray-400 mb-6">
            Follow along or send a DM on any platform.
          </p>
          <div className="flex flex-wrap gap-4">
            {[
              { name: "TikTok", href: "https://www.tiktok.com/@levithefinanceguy" },
              { name: "YouTube", href: "https://www.youtube.com/@levithefinanceguy/shorts" },
              { name: "Instagram", href: "https://instagram.com/levithefinanceguy" },
              { name: "Facebook", href: "https://www.facebook.com/share/18H1hiqGQQ/?mibextid=wwXIfr" },
            ].map((social) => (
              <a
                key={social.name}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 rounded-lg bg-gray-800 text-gray-300 hover:text-white hover:bg-gray-700 transition-colors text-sm font-medium"
              >
                {social.name}
              </a>
            ))}
          </div>
        </div>
      </div>

      <p className="text-gray-500 text-sm mt-12 text-center">
        I typically respond within 24 to 48 hours. If it is urgent, DM me on social media.
      </p>
    </div>
  );
}
