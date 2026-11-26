"use client";

import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import Link from "next/link";
import Image from "next/image";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => setMounted(true), []);

  const links = [
    { name: "Home", href: "/" },
    { name: "Gallery", href: "/gallery" },
    { name: "Services", href: "/services" },
    { name: "How It Works", href: "/how-it-works" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <header className="sticky top-0 z-50 bg-brand-white/95 dark:bg-brand-black/95 backdrop-blur-md border-b border-gray-200 dark:border-brand-charcoal transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-24">
          
          <Link href="/" className="flex items-center gap-4">
            <div className="relative w-14 h-14 drop-shadow-md">
              <Image src="/logo.png" alt="TAT-ME Logo" fill sizes="56px" className="object-contain" priority />
            </div>
            <span className="text-3xl font-serif font-bold tracking-widest text-brand-black dark:text-brand-white">
              TAT<span className="text-brand-burgundy">-</span>ME
            </span>
          </Link>

          <nav className="hidden md:flex items-center space-x-8">
            {links.map((link) => (
              <Link 
                key={link.name} 
                href={link.href}
                className="text-sm font-medium text-gray-600 dark:text-brand-gray hover:text-brand-black dark:hover:text-brand-white transition-colors tracking-wide uppercase"
              >
                {link.name}
              </Link>
            ))}
            
            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="p-2 rounded-full text-gray-600 dark:text-brand-gray hover:bg-gray-100 dark:hover:bg-brand-charcoal transition-colors"
              aria-label="Toggle Dark Mode"
            >
              {mounted && (
                theme === "dark" ? (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
                ) : (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" /></svg>
                )
              )}
            </button>

            <Link 
              href="/book" 
              className="bg-brand-burgundy text-brand-white px-8 py-3 rounded-sm text-sm font-bold uppercase tracking-wider hover:bg-brand-burgundy/80 transition-colors"
            >
              Book Now
            </Link>
          </nav>

          <button 
            className="md:hidden text-brand-black dark:text-brand-white p-2"
            onClick={() => setIsOpen(!isOpen)}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden bg-brand-white dark:bg-brand-charcoal border-b border-gray-200 dark:border-brand-burgundy transition-colors">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {links.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="block px-3 py-3 text-base font-medium text-brand-black dark:text-brand-white hover:text-brand-burgundy"
                onClick={() => setIsOpen(false)}
              >
                {link.name}
              </Link>
            ))}
            <button
              onClick={() => { setTheme(theme === "dark" ? "light" : "dark"); setIsOpen(false); }}
              className="block w-full text-left px-3 py-3 text-base font-medium text-brand-black dark:text-brand-white"
            >
              Toggle Theme
            </button>
            <Link
              href="/book"
              className="block px-3 py-3 text-base font-bold text-brand-white bg-brand-burgundy mt-4 text-center rounded-sm"
              onClick={() => setIsOpen(false)}
            >
              Book Now
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}