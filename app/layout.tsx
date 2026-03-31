import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Geist_Mono } from "next/font/google";
import "./globals.css";
import Navigation from "./components/Navigation";
import Footer from "./components/Footer";
import AdBanner from "./components/AdBanner";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Levi The Finance Guy | Transparent Personal Finance & Investing",
    template: "%s | Levi The Finance Guy",
  },
  description:
    "Follow Levi's transparent investing journey. View his real portfolio, use free financial calculators, and learn about building wealth through smart money decisions.",
  keywords: [
    "personal finance",
    "investing",
    "portfolio tracker",
    "financial calculators",
    "compound interest",
    "FIRE",
    "retirement planning",
    "transparent investing",
    "The Levi Five",
    "financial independence",
  ],
  authors: [{ name: "Levi The Finance Guy" }],
  icons: {
    icon: "/favicon.png",
    apple: "/apple-touch-icon.png",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://levithefinanceguy.com",
    siteName: "Levi The Finance Guy",
    title: "Levi The Finance Guy | Transparent Personal Finance & Investing",
    description:
      "Follow Levi's transparent investing journey. View his real portfolio, use free financial calculators, and learn about building wealth.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Levi The Finance Guy",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Levi The Finance Guy",
    description:
      "Transparent investing, real portfolio, free financial calculators.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${inter.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        <meta name="google-site-verification" content="2RAOm4rvwb300RM-h6gi5qiWF0vhqHRWJWOZSno16Dc" />
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2105872295580232"
          crossOrigin="anonymous"
        />
      </head>
      <body suppressHydrationWarning className="min-h-full flex flex-col bg-background text-foreground">
        <Navigation />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
