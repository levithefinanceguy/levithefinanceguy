import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navigation from "./components/Navigation";
import Footer from "./components/Footer";
import AdBanner from "./components/AdBanner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
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
  ],
  authors: [{ name: "Levi The Finance Guy" }],
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
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      {/*
        Google AdSense — Add your script tag here:
        <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-XXXXXXXXXXXXXXXX" crossOrigin="anonymous"></script>
      */}
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <Navigation />
        <AdBanner slot="top" size="responsive" />
        <main className="flex-1">{children}</main>
        <AdBanner slot="bottom" size="responsive" />
        <Footer />
      </body>
    </html>
  );
}
