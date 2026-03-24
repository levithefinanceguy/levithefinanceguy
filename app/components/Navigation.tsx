"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/portfolio", label: "Portfolio" },
  { href: "/freedom-five", label: "Freedom Five" },
  { href: "/calculators", label: "Calculators" },
  { href: "/blog", label: "Blog" },
  { href: "/about", label: "About" },
];

export default function Navigation() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  return (
    <nav className="sticky top-0 z-50 bg-[#0a0a0a]/90 backdrop-blur-lg border-b border-card-border">
      <div className="max-w-6xl mx-auto px-4 flex items-center justify-between h-16">
        <Link href="/" className="text-xl font-bold tracking-tight">
          <span className="gradient-text">Levi</span>
          <span className="text-gray-300">TheFinanceGuy</span>
        </Link>

        {/* Desktop nav */}
        <ul className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className={`text-sm font-medium transition-colors duration-200 hover:text-accent-green relative ${
                  isActive(link.href) ? "text-accent-green" : "text-gray-400"
                }`}
              >
                {link.label}
                {isActive(link.href) && (
                  <span className="absolute -bottom-[21px] left-0 right-0 h-0.5 bg-gradient-to-r from-accent-green to-accent-teal" />
                )}
              </Link>
            </li>
          ))}
        </ul>

        {/* Hamburger button */}
        <button
          className="md:hidden flex flex-col gap-1.5 p-2"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle navigation menu"
        >
          <span
            className={`block w-6 h-0.5 bg-white transition-transform duration-200 ${
              mobileOpen ? "rotate-45 translate-y-2" : ""
            }`}
          />
          <span
            className={`block w-6 h-0.5 bg-white transition-opacity duration-200 ${
              mobileOpen ? "opacity-0" : ""
            }`}
          />
          <span
            className={`block w-6 h-0.5 bg-white transition-transform duration-200 ${
              mobileOpen ? "-rotate-45 -translate-y-2" : ""
            }`}
          />
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden border-t border-card-border bg-[#0a0a0a]/95 backdrop-blur-lg animate-slide-down">
          <ul className="flex flex-col py-4 px-4 gap-4">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className={`block text-base font-medium transition-colors hover:text-accent-green ${
                    isActive(link.href) ? "text-accent-green" : "text-gray-300"
                  }`}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </nav>
  );
}
