import Link from "next/link";

export default function AboutServices() {
  return (
    <section className="py-24 bg-gray-50 dark:bg-brand-charcoal transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-16">
          <div className="flex justify-center mb-4">
            <svg className="w-8 h-8 text-brand-burgundy" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2L15 9H22L16.5 13.5L18.5 21L12 16.5L5.5 21L7.5 13.5L2 9H9L12 2Z" /></svg>
          </div>
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-brand-black dark:text-brand-white mb-4">
            About Our <span className="text-brand-burgundy">Services</span>
          </h2>
          <p className="text-gray-600 dark:text-brand-gray max-w-2xl mx-auto">
            We provide exceptional tattoo services tailored to your needs. Choose from our studio appointments, home services, or custom designs.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Card 1: Studio */}
          <div className="bg-brand-white dark:bg-brand-black p-8 border border-gray-200 dark:border-brand-charcoal text-center flex flex-col items-center hover:border-brand-burgundy transition-colors">
            <div className="mb-6">
              <svg className="w-12 h-12 text-brand-burgundy" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>
            </div>
            <h3 className="text-xl font-serif font-bold text-brand-black dark:text-brand-white mb-2">Studio Tattoo</h3>
            <p className="text-gray-600 dark:text-brand-gray text-sm mb-6 flex-grow">
              Visit our premium studio for a comfortable, private, and professional tattoo experience.
            </p>
            <p className="text-brand-burgundy font-bold mb-6">Starting at $150</p>
            <Link href="/book/studio" className="w-full py-3 border border-brand-black dark:border-brand-white text-brand-black dark:text-brand-white text-sm font-bold uppercase tracking-wider hover:bg-brand-black hover:text-brand-white dark:hover:bg-brand-white dark:hover:text-brand-black transition-colors">
              Book Studio
            </Link>
          </div>

          {/* Card 2: Home Service */}
          <div className="bg-brand-white dark:bg-brand-black p-8 border border-gray-200 dark:border-brand-charcoal text-center flex flex-col items-center hover:border-brand-burgundy transition-colors">
            <div className="mb-6">
              <svg className="w-12 h-12 text-brand-burgundy" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>
            </div>
            <h3 className="text-xl font-serif font-bold text-brand-black dark:text-brand-white mb-2">Home Service</h3>
            <p className="text-gray-600 dark:text-brand-gray text-sm mb-6 flex-grow">
              We bring the full tattoo setup to your home for maximum comfort and privacy.
            </p>
            <p className="text-brand-burgundy font-bold mb-6">Starting at $200</p>
            <Link href="/book/home" className="w-full py-3 border border-brand-black dark:border-brand-white text-brand-black dark:text-brand-white text-sm font-bold uppercase tracking-wider hover:bg-brand-black hover:text-brand-white dark:hover:bg-brand-white dark:hover:text-brand-black transition-colors">
              Book Home
            </Link>
          </div>

          {/* Card 3: Custom */}
          <div className="bg-brand-white dark:bg-brand-black p-8 border border-gray-200 dark:border-brand-charcoal text-center flex flex-col items-center hover:border-brand-burgundy transition-colors">
            <div className="mb-6">
              <svg className="w-12 h-12 text-brand-burgundy" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" /></svg>
            </div>
            <h3 className="text-xl font-serif font-bold text-brand-black dark:text-brand-white mb-2">Custom Design</h3>
            <p className="text-gray-600 dark:text-brand-gray text-sm mb-6 flex-grow">
              Have a unique idea? Our artists will design a custom piece just for you.
            </p>
            <p className="text-brand-burgundy font-bold mb-6">Quote Required</p>
            <Link href="/book/custom" className="w-full py-3 border border-brand-black dark:border-brand-white text-brand-black dark:text-brand-white text-sm font-bold uppercase tracking-wider hover:bg-brand-black hover:text-brand-white dark:hover:bg-brand-white dark:hover:text-brand-black transition-colors">
              Request Custom
            </Link>
          </div>

        </div>
      </div>
    </section>
  );
}