import Link from "next/link";

export default function ServicesPage() {
  return (
    <div className="min-h-screen bg-brand-black py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-brand-white mb-4">
            Our <span className="text-brand-burgundy">Services</span>
          </h1>
          <p className="text-brand-gray max-w-2xl mx-auto">
            Whether you visit our studio or we come to you, we deliver premium artistry.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Studio */}
          <div className="bg-brand-charcoal p-8 border border-brand-black text-center flex flex-col items-center">
            <div className="w-16 h-16 bg-brand-black rounded-full flex items-center justify-center mb-6 border border-brand-burgundy">
              <svg className="w-8 h-8 text-brand-burgundy" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>
            </div>
            <h3 className="text-2xl font-serif text-brand-white mb-4">Studio Appointment</h3>
            <p className="text-brand-gray mb-8 flex-grow">Visit our private studio for a comfortable, professional tattoo experience.</p>
            <Link href="/book/studio" className="w-full bg-brand-burgundy text-brand-white py-3 rounded-sm font-bold uppercase tracking-wider text-sm hover:bg-brand-burgundy/80 transition-colors">Book Studio</Link>
          </div>

          {/* Home */}
          <div className="bg-brand-charcoal p-8 border border-brand-black text-center flex flex-col items-center">
            <div className="w-16 h-16 bg-brand-black rounded-full flex items-center justify-center mb-6 border border-brand-burgundy">
              <svg className="w-8 h-8 text-brand-burgundy" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>
            </div>
            <h3 className="text-2xl font-serif text-brand-white mb-4">Home Service</h3>
            <p className="text-brand-gray mb-8 flex-grow">We bring the full tattoo experience to the comfort of your own home.</p>
            <Link href="/book/home" className="w-full bg-brand-burgundy text-brand-white py-3 rounded-sm font-bold uppercase tracking-wider text-sm hover:bg-brand-burgundy/80 transition-colors">Book at Home</Link>
          </div>

          {/* Custom */}
          <div className="bg-brand-charcoal p-8 border border-brand-black text-center flex flex-col items-center">
            <div className="w-16 h-16 bg-brand-black rounded-full flex items-center justify-center mb-6 border border-brand-burgundy">
              <svg className="w-8 h-8 text-brand-burgundy" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" /></svg>
            </div>
            <h3 className="text-2xl font-serif text-brand-white mb-4">Custom Tattoo</h3>
            <p className="text-brand-gray mb-8 flex-grow">Have a unique idea? Submit a custom request and our artists will design it for you.</p>
            <Link href="/book/custom" className="w-full border-2 border-brand-burgundy text-brand-burgundy py-3 rounded-sm font-bold uppercase tracking-wider text-sm hover:bg-brand-burgundy hover:text-brand-white transition-colors">Request Custom</Link>
          </div>

        </div>
      </div>
    </div>
  );
}