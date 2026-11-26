import Link from "next/link";
import Image from "next/image";
import { BUSINESS } from "@/lib/config/business";

export default function Footer() {
  return (
    <footer className="bg-gray-50 dark:bg-brand-charcoal border-t border-gray-200 dark:border-brand-burgundy/30 pt-16 pb-8 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          
          <div className="col-span-1 md:col-span-2">
            <Link href="/" className="flex items-center gap-3 mb-4">
              <div className="relative w-10 h-10">
                <Image src="/logo.png" alt="TAT-ME Logo" fill sizes="40px" className="object-contain" />
              </div>
              <span className="text-2xl font-serif font-bold tracking-widest text-brand-black dark:text-brand-white">
                TAT<span className="text-brand-burgundy">-</span>ME
              </span>
            </Link>
            <p className="text-gray-600 dark:text-brand-gray max-w-sm mb-6">
              {BUSINESS.tagline}. Professional global tattoo booking and payment services.
            </p>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-brand-black dark:text-brand-white tracking-wider uppercase mb-4">Explore</h3>
            <ul className="space-y-3">
              <li><Link href="/gallery" className="text-gray-600 dark:text-brand-gray hover:text-brand-burgundy dark:hover:text-brand-white transition-colors">Gallery</Link></li>
              <li><Link href="/services" className="text-gray-600 dark:text-brand-gray hover:text-brand-burgundy dark:hover:text-brand-white transition-colors">Services</Link></li>
              <li><Link href="/how-it-works" className="text-gray-600 dark:text-brand-gray hover:text-brand-burgundy dark:hover:text-brand-white transition-colors">How It Works</Link></li>
              <li><Link href="/about" className="text-gray-600 dark:text-brand-gray hover:text-brand-burgundy dark:hover:text-brand-white transition-colors">About Us</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-brand-black dark:text-brand-white tracking-wider uppercase mb-4">Contact</h3>
            <ul className="space-y-3">
              <li>
                <a href={`https://wa.me/${BUSINESS.whatsapp.replace(/\D/g, '')}`} target="_blank" rel="noreferrer" className="text-gray-600 dark:text-brand-gray hover:text-brand-burgundy dark:hover:text-brand-white transition-colors">
                  WhatsApp
                </a>
              </li>
              <li>
                <a href={`mailto:${BUSINESS.email}`} className="text-gray-600 dark:text-brand-gray hover:text-brand-burgundy dark:hover:text-brand-white transition-colors">
                  {BUSINESS.email}
                </a>
              </li>
            </ul>
            <h3 className="text-sm font-semibold text-brand-black dark:text-brand-white tracking-wider uppercase mt-6 mb-4">Legal</h3>
            <ul className="space-y-3">
              <li><Link href="/policies/privacy" className="text-gray-600 dark:text-brand-gray hover:text-brand-burgundy dark:hover:text-brand-white transition-colors">Privacy Policy</Link></li>
              <li><Link href="/policies/terms" className="text-gray-600 dark:text-brand-gray hover:text-brand-burgundy dark:hover:text-brand-white transition-colors">Terms & Conditions</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-300 dark:border-brand-black pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-600 dark:text-brand-gray text-sm">
            © 2026 {BUSINESS.name}. All rights reserved.
          </p>
          <p className="text-gray-600 dark:text-brand-gray text-sm">
            Serving US, Canada, and UK.
          </p>
        </div>
      </div>
    </footer>
  );
}