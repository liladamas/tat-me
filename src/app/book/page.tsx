"use client";

import { useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { TATTOOS } from "@/data/tattoos";
import { computeDeposit } from "@/lib/deposit";

function HomeBookingContent() {
  const searchParams = useSearchParams();
  const tattooSlug = searchParams.get("tattoo");
  const tattoo = TATTOOS.find((t) => t.slug === tattooSlug);

  const [formData, setFormData] = useState({
    name: "", email: "", phone: "", address: "", date: "", time: "", notes: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const basePrice = tattoo?.basePrice || 150;
  const travelFee = 50; 
  const { total, deposit, balance } = computeDeposit(basePrice + travelFee);

  const today = new Date().toISOString().split("T")[0];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const res = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          serviceType: "HOME",
          tattooSlug: tattoo?.slug,
          customerName: formData.name,
          email: formData.email,
          phone: formData.phone,
          address: formData.address,
          country: "US",
          city: "New York", 
          appointmentAt: `${formData.date}T${formData.time}:00Z`,
          notes: formData.notes,
        }),
      });

      const data = await res.json();

      if (data.success) {
        const paymentRes = await fetch("/api/payments/initiate", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ bookingReference: data.bookingReference }),
        });

        const paymentData = await paymentRes.json();

        if (paymentData.link) {
          window.location.href = paymentData.link;
        } else {
          alert("Payment initialization failed. Please check your Flutterwave keys in .env");
          setIsSubmitting(false);
        }
      } else {
        alert("Something went wrong saving your booking.");
        setIsSubmitting(false);
      }
    } catch (error) {
      console.error(error);
      alert("Network error.");
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-brand-white dark:bg-brand-black py-16 transition-colors duration-300">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="mb-8">
          <Link href={`/gallery/${tattoo?.slug || ""}`} className="text-gray-600 dark:text-brand-gray hover:text-brand-black dark:hover:text-brand-white transition-colors text-sm">
            &larr; Back to Tattoo Details
          </Link>
          <h1 className="text-4xl font-serif font-bold text-brand-black dark:text-brand-white mt-4 transition-colors">
            Book at <span className="text-brand-burgundy">Home</span>
          </h1>
          <p className="text-gray-600 dark:text-brand-gray mt-2 transition-colors">We come to you. Secure your appointment with a 60% deposit.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          <div className="md:col-span-2 bg-gray-50 dark:bg-brand-charcoal p-8 rounded-sm border border-gray-200 dark:border-brand-black transition-colors">
            <form onSubmit={handleSubmit} className="space-y-6">
              <h2 className="text-xl font-serif text-brand-black dark:text-brand-white mb-4">Your Details</h2>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-gray-600 dark:text-brand-gray mb-2">Full Name *</label>
                  <input required type="text" className="w-full bg-white dark:bg-brand-black border border-gray-300 dark:border-brand-gray/30 rounded-sm px-4 py-3 text-brand-black dark:text-brand-white focus:outline-none focus:border-brand-burgundy transition-colors" 
                    value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} />
                </div>
                <div>
                  <label className="block text-sm text-gray-600 dark:text-brand-gray mb-2">Email Address *</label>
                  <input required type="email" className="w-full bg-white dark:bg-brand-black border border-gray-300 dark:border-brand-gray/30 rounded-sm px-4 py-3 text-brand-black dark:text-brand-white focus:outline-none focus:border-brand-burgundy transition-colors"
                    value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-gray-600 dark:text-brand-gray mb-2">Phone Number *</label>
                  <input required type="tel" className="w-full bg-white dark:bg-brand-black border border-gray-300 dark:border-brand-gray/30 rounded-sm px-4 py-3 text-brand-black dark:text-brand-white focus:outline-none focus:border-brand-burgundy transition-colors"
                    value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})} />
                </div>
                <div>
                  <label className="block text-sm text-gray-600 dark:text-brand-gray mb-2">Home Address *</label>
                  <input required type="text" placeholder="Street, City, ZIP" className="w-full bg-white dark:bg-brand-black border border-gray-300 dark:border-brand-gray/30 rounded-sm px-4 py-3 text-brand-black dark:text-brand-white focus:outline-none focus:border-brand-burgundy transition-colors"
                    value={formData.address} onChange={(e) => setFormData({...formData, address: e.target.value})} />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-gray-600 dark:text-brand-gray mb-2">Preferred Date *</label>
                  <input required type="date" min={today} className="w-full bg-white dark:bg-brand-black border border-gray-300 dark:border-brand-gray/30 rounded-sm px-4 py-3 text-brand-black dark:text-brand-white focus:outline-none focus:border-brand-burgundy transition-colors"
                    value={formData.date} onChange={(e) => setFormData({...formData, date: e.target.value})} />
                </div>
                <div>
                  <label className="block text-sm text-gray-600 dark:text-brand-gray mb-2">Preferred Time *</label>
                  <input required type="time" className="w-full bg-white dark:bg-brand-black border border-gray-300 dark:border-brand-gray/30 rounded-sm px-4 py-3 text-brand-black dark:text-brand-white focus:outline-none focus:border-brand-burgundy transition-colors"
                    value={formData.time} onChange={(e) => setFormData({...formData, time: e.target.value})} />
                </div>
              </div>

              <div>
                <label className="block text-sm text-gray-600 dark:text-brand-gray mb-2">Appointment Notes</label>
                <textarea rows={3} className="w-full bg-white dark:bg-brand-black border border-gray-300 dark:border-brand-gray/30 rounded-sm px-4 py-3 text-brand-black dark:text-brand-white focus:outline-none focus:border-brand-burgundy transition-colors"
                  placeholder="Any specific requests?"
                  value={formData.notes} onChange={(e) => setFormData({...formData, notes: e.target.value})}></textarea>
              </div>

              <button disabled={isSubmitting} type="submit" className="w-full bg-brand-burgundy text-brand-white font-bold uppercase tracking-wider py-4 rounded-sm hover:bg-brand-burgundy/80 transition-colors disabled:opacity-50">
                {isSubmitting ? "Redirecting to Secure Payment..." : `Pay 60% Deposit ($${deposit})`}
              </button>
            </form>
          </div>

          <div className="md:col-span-1">
            <div className="bg-gray-50 dark:bg-brand-charcoal p-6 rounded-sm border border-gray-200 dark:border-brand-black sticky top-24 transition-colors">
              <h3 className="text-lg font-serif text-brand-black dark:text-brand-white mb-4">Booking Summary</h3>
              
              <div className="mb-4 pb-4 border-b border-gray-200 dark:border-brand-black">
                <p className="text-gray-500 dark:text-brand-gray text-xs uppercase tracking-wider mb-1">Selected Design</p>
                <p className="text-brand-black dark:text-brand-white font-semibold">{tattoo ? tattoo.title : "Custom / General Booking"}</p>
              </div>

              <div className="space-y-2 mb-6">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600 dark:text-brand-gray">Base Price</span>
                  <span className="text-brand-black dark:text-brand-white">${basePrice}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600 dark:text-brand-gray">Home Travel Fee</span>
                  <span className="text-brand-black dark:text-brand-white">${travelFee}</span>
                </div>
              </div>

              <div className="border-t border-gray-200 dark:border-brand-black pt-4 mb-6">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-gray-600 dark:text-brand-gray font-semibold">Total</span>
                  <span className="text-brand-black dark:text-brand-white font-bold text-lg">${total}</span>
                </div>
                <div className="flex justify-between items-center text-brand-burgundy">
                  <span className="font-semibold">Deposit Due Now (60%)</span>
                  <span className="font-bold text-lg">${deposit}</span>
                </div>
                <div className="flex justify-between items-center text-gray-500 dark:text-brand-gray text-sm mt-2">
                  <span>Remaining Balance</span>
                  <span>${balance}</span>
                </div>
              </div>

              <p className="text-xs text-gray-500 dark:text-brand-gray">
                Your total includes the tattoo service and the applicable home-visit travel fee.
              </p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

export default function HomeBookingPage() {
  return (
    <Suspense fallback={<div className="text-center py-32 text-brand-black dark:text-brand-white">Loading form...</div>}>
      <HomeBookingContent />
    </Suspense>
  );
}