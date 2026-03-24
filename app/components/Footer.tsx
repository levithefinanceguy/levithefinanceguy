import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-card-border bg-[#0a0a0a] mt-auto">
      <div className="max-w-6xl mx-auto px-4 py-10">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
          <div>
            <h3 className="text-accent-green font-bold text-lg mb-3">LeviTheFinanceGuy</h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              Transparent personal finance education. Real portfolio, real numbers, real talk.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-white mb-3">Pages</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><Link href="/" className="hover:text-accent-green transition-colors">Home</Link></li>
              <li><Link href="/portfolio" className="hover:text-accent-green transition-colors">Portfolio</Link></li>
              <li><Link href="/calculators" className="hover:text-accent-green transition-colors">Calculators</Link></li>
              <li><Link href="/about" className="hover:text-accent-green transition-colors">About</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-white mb-3">Connect</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><a href="https://www.youtube.com/@levithefinanceguy" target="_blank" rel="noopener noreferrer" className="hover:text-accent-green transition-colors">YouTube</a></li>
              <li><a href="https://www.tiktok.com/@levithefinanceguy" target="_blank" rel="noopener noreferrer" className="hover:text-accent-green transition-colors">TikTok</a></li>
              <li><a href="https://instagram.com/levithefinanceguy" target="_blank" rel="noopener noreferrer" className="hover:text-accent-green transition-colors">Instagram</a></li>
              <li><a href="https://www.facebook.com/share/18H1hiqGQQ/?mibextid=wwXIfr" target="_blank" rel="noopener noreferrer" className="hover:text-accent-green transition-colors">Facebook</a></li>
            </ul>
          </div>
        </div>
        <div className="mt-10 pt-6 border-t border-card-border text-center text-xs text-gray-500">
          <p>&copy; {new Date().getFullYear()} LeviTheFinanceGuy. All rights reserved.</p>
          <p className="mt-1">
            Disclaimer: Content is for educational purposes only and not financial advice. Always consult a qualified financial advisor.
          </p>
        </div>
      </div>
    </footer>
  );
}
