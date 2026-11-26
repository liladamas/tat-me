import Link from "next/link";

const PRICING = [
  { name: "Half Sleeve", price: "$200", note: "Arm or Leg" },
  { name: "Full Sleeve", price: "$500", note: "Arm or Leg" },
  { name: "Full Sleeve Wrap", price: "$1000", note: "Arm or Leg" },
  { name: "Hand / Foot", price: "$130 - $150", note: "Full hand/foot available" },
  { name: "Chest", price: "$200 - $500", note: "Half or Full" },
  { name: "Back", price: "$500 - $1000", note: "Half or Full" },
  { name: "Neck", price: "$130 - $300", note: "Half or Full" },
  { name: "Spine", price: "$130", note: "" },
];

export default function ServicesPricing() {
  return (
    <section className="py-24 bg-gray-50 dark:bg-brand-charcoal transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-brand-black dark:text-brand-white mb-4 transition-colors">
            Our <span className="text-brand-burgundy">Pricing</span>
          </h2>
          <p className="text-gray-600 dark:text-brand-gray max-w-2xl mx-auto transition-colors">
            Transparent pricing for premium artwork. We offer both Studio Appointments and Home Services.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {PRICING.map((item) => (
            <div key={item.name} className="bg-brand-white dark:bg-brand-black border border-gray-200 dark:border-brand-burgundy/20 p-6 flex flex-col items-center text-center hover:border-brand-burgundy transition-colors rounded-sm">
              <h3 className="text-xl font-serif text-brand-black dark:text-brand-white mb-2">{item.name}</h3>
              <span className="text-2xl font-bold text-brand-burgundy mb-2">{item.price}</span>
              {item.note && <p className="text-gray-500 dark:text-brand-gray text-sm">{item.note}</p>}
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <p className="text-gray-600 dark:text-brand-gray mb-6 transition-colors">
            * A 60% deposit is required to secure your booking. The remaining 40% is paid after completion.
          </p>
          <Link 
            href="/book" 
            className="inline-block bg-brand-burgundy text-brand-white px-10 py-4 rounded-sm font-semibold hover:bg-brand-burgundy/80 transition-colors uppercase tracking-wider text-sm"
          >
            Start Your Booking
          </Link>
        </div>
      </div>
    </section>
  );
}