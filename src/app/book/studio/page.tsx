"use client";

import { useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { TATTOOS } from "@/data/tattoos";
import { computeDeposit } from "@/lib/deposit";

// 1. We move the actual form logic into a sub-component to use useSearchParams
function StudioBookingContent() {
  const searchParams = useSearchParams();
  const tattooSlug = searchParams.get("tattoo");

  const tattoo = TATTOOS.find((t) => t.slug === tattooSlug);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    country: "US",
    city: "New York",
    date: "",
    time: "",
    notes: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const basePrice = tattoo?.basePrice || 150;
  const { total, deposit, balance } = computeDeposit(basePrice);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const res = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          serviceType: "STUDIO",
          tattooSlug: tattoo?.slug,
          customerName: formData.name,
          email: formData.email,
          phone: formData.phone,
          country: formData.country,
          city: formData.city,
          appointmentAt: `${formData.date}T${formData.time}:00Z`,
          notes: formData.notes,
        }),
      });

      const data = await res.json();

      if (data.success) {
        alert(`Booking saved to database! Reference: ${data.bookingReference}. Total Deposit: $${data.amountToPay}`);
        // Next step: We will redirect to Flutterwave here!
      } else {
        alert("Something went wrong saving your booking.");
      }
    } catch (error) {
      console.error(error);
      alert("Network error.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-brand-black py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="mb-8">
          <Link href={`/gallery/${tattoo?.slug || ""}`} className="text-brand-gray hover:text-brand-white transition-colors text-sm">
            &larr; Back to Tattoo Details
          </Link>
          <h1 className="text-4xl font-serif font-bold text-brand-white mt-4">
            Book at the <span className="text-brand-burgundy">Studio</span>
          </h1>
          <p className="text-brand-gray mt-2">Secure your appointment with a 60% deposit.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          <div className="md:col-span-2 bg-brand-charcoal p-8 rounded-sm border border-brand-black">
            <form onSubmit={handleSubmit} className="space-y-6">
              
              <h2 className="text-xl font-serif text-brand-white mb-4">Your Details</h2>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-brand-gray mb-2">Full Name *</label>
                  <input required type="text" className="w-full bg-brand-black border border-brand-gray/30 rounded-sm px-4 py-3 text-brand-white focus:outline-none focus:border-brand-burgundy" 
                    value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} />
                </div>
                <div>
                  <label className="block text-sm text-brand-gray mb-2">Email Address *</label>
                  <input required type="email" className="w-full bg-brand-black border border-brand-gray/30 rounded-sm px-4 py-3 text-brand-white focus:outline-none focus:border-brand-burgundy"
                    value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-brand-gray mb-2">Phone Number *</label>
                  <input required type="tel" className="w-full bg-brand-black border border-brand-gray/30 rounded-sm px-4 py-3 text-brand-white focus:outline-none focus:border-brand-burgundy"
                    value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})} />
                </div>
                <div>
                  <label className="block text-sm text-brand-gray mb-2">Preferred Date *</label>
                  <input required type="date" className="w-full bg-brand-black border border-brand-gray/30 rounded-sm px-4 py-3 text-brand-white focus:outline-none focus:border-brand-burgundy"
                    value={formData.date} onChange={(e) => setFormData({...formData, date: e.target.value})} />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-brand-gray mb-2">Preferred Time *</label>
                  <input required type="time" className="w-full bg-brand-black border border-brand-gray/30 rounded-sm px-4 py-3 text-brand-white focus:outline-none focus:border-brand-burgundy"
                    value={formData.time} onChange={(e) => setFormData({...formData, time: e.target.value})} />
                </div>
                <div>
                  <label className="block text-sm text-brand-gray mb-2">Studio Location</label>
                  <select className="w-full bg-brand-black border border-brand-gray/30 rounded-sm px-4 py-3 text-brand-white focus:outline-none focus:border-brand-burgundy">
                    <option value="NY">New York Studio</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm text-brand-gray mb-2">Appointment Notes</label>
                <textarea rows={3} className="w-full bg-brand-black border border-brand-gray/30 rounded-sm px-4 py-3 text-brand-white focus:outline-none focus:border-brand-burgundy"
                  placeholder="Any specific requests or details about the size/placement?"
                  value={formData.notes} onChange={(e) => setFormData({...formData, notes: e.target.value})}></textarea>
              </div>

              <button disabled={isSubmitting} type="submit" className="w-full bg-brand-burgundy text-brand-white font-bold uppercase tracking-wider py-4 rounded-sm hover:bg-brand-burgundy/80 transition-colors disabled:opacity-50">
                {isSubmitting ? "Processing..." : `Pay 60% Deposit ($${deposit})`}
              </button>
            </form>
          </div>

          <div className="md:col-span-1">
            <div className="bg-brand-charcoal p-6 rounded-sm border border-brand-black sticky top-24">
              <h3 className="text-lg font-serif text-brand-white mb-4">Booking Summary</h3>
              
              {tattoo ? (
                <div className="mb-4 pb-4 border-b border-brand-black">
                  <p className="text-brand-gray text-xs uppercase tracking-wider mb-1">Selected Design</p>
                  <p className="text-brand-white font-semibold">{tattoo.title}</p>
                </div>
              ) : (
                <div className="mb-4 pb-4 border-b border-brand-black">
                  <p className="text-brand-gray text-xs uppercase tracking-wider mb-1">Selected Design</p>
                  <p className="text-brand-white font-semibold">Custom / General Booking</p>
                </div>
              )}

              <div className="space-y-2 mb-6">
                <div className="flex justify-between text-sm">
                  <span className="text-brand-gray">Base Price</span>
                  <span className="text-brand-white">${total}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-brand-gray">Travel Fee</span>
                  <span className="text-brand-white">$0</span>
                </div>
              </div>

              <div className="border-t border-brand-black pt-4 mb-6">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-brand-gray font-semibold">Total</span>
                  <span className="text-brand-white font-bold text-lg">${total}</span>
                </div>
                <div className="flex justify-between items-center text-brand-burgundy">
                  <span className="font-semibold">Deposit Due Now (60%)</span>
                  <span className="font-bold text-lg">${deposit}</span>
                </div>
                <div className="flex justify-between items-center text-brand-gray text-sm mt-2">
                  <span>Remaining Balance</span>
                  <span>${balance}</span>
                </div>
              </div>

              <p className="text-xs text-brand-gray">
                The deposit secures your appointment. The remaining balance is paid after the tattoo is completed.
              </p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

// 2. The main export wraps the content in a Suspense boundary
export default function StudioBookingPage() {
  return (
    <Suspense fallback={<div className="text-center py-32 text-brand-white">Loading form...</div>}>
      <StudioBookingContent />
    </Suspense>
  );
}