import Link from "next/link";

const STEPS = [
  { step: "01", title: "Explore the Gallery", desc: "Browse our collection of real tattoo designs." },
  { step: "02", title: "Select or Customize", desc: "Choose a design or request a custom piece." },
  { step: "03", title: "Choose Service Type", desc: "Book at our studio or request a home visit." },
  { step: "04", title: "Pick Date & Time", desc: "Select your location and preferred appointment." },
  { step: "05", title: "Review the Price", desc: "See the complete cost, including any travel fees." },
  { step: "06", title: "Pay 60% Deposit", desc: "Secure your appointment securely online." },
  { step: "07", title: "Receive Receipt", desc: "Get your confirmation and booking reference." },
  { step: "08", title: "Contact via WhatsApp", desc: "Chat with TAT-ME to finalize the details." },
];

export default function HowItWorksPage() {
  return (
    <div className="min-h-screen bg-brand-black py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-brand-white mb-4">
            How It <span className="text-brand-burgundy">Works</span>
          </h1>
          <p className="text-brand-gray max-w-2xl mx-auto">
            Booking your next tattoo with TAT-ME is simple, transparent, and secure.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {STEPS.map((item, index) => (
            <div key={index} className="bg-brand-charcoal p-6 border border-brand-black relative">
              <span className="text-5xl font-serif font-bold text-brand-burgundy/20 absolute top-4 right-4">
                {item.step}
              </span>
              <h3 className="text-xl font-serif text-brand-white mb-2 mt-4 relative z-10">{item.title}</h3>
              <p className="text-brand-gray text-sm relative z-10">{item.desc}</p>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <Link href="/book" className="inline-block bg-brand-burgundy text-brand-white px-10 py-4 rounded-sm font-bold uppercase tracking-wider hover:bg-brand-burgundy/80 transition-colors">
            Start Your Booking
          </Link>
        </div>
      </div>
    </div>
  );
}