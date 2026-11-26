"use client";

import { useState } from "react";
import { BUSINESS } from "@/lib/config/business";

export default function ContactPage() {
  const [formData, setFormData] = useState({ name: "", location: "", text: "" });
  const [rating, setRating] = useState(5);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const res = await fetch("/api/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, rating }),
      });

      if (res.ok) {
        setSubmitted(true);
      } else {
        alert("Failed to send review. Please try again.");
      }
    } catch (error) {
      alert("Network error.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-brand-white dark:bg-brand-black py-24 transition-colors duration-300">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-brand-black dark:text-brand-white mb-4">
            Contact & <span className="text-brand-burgundy">Reviews</span>
          </h1>
          <p className="text-gray-600 dark:text-brand-gray max-w-2xl mx-auto">
            Have a question about a design or your booking? Or want to share your experience with us? We are here to help.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          
          {/* Contact Methods */}
          <div className="space-y-6">
            <div className="bg-gray-50 dark:bg-brand-charcoal p-8 border border-gray-200 dark:border-brand-black text-center flex flex-col items-center">
              <div className="w-16 h-16 bg-[#25D366]/10 rounded-full flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-[#25D366]" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>
              </div>
              <h3 className="text-xl font-serif font-bold text-brand-black dark:text-brand-white mb-2">WhatsApp Chat</h3>
              <p className="text-gray-600 dark:text-brand-gray text-sm mb-6">The fastest way to reach us for bookings and questions.</p>
              <a href={`https://wa.me/${BUSINESS.whatsapp.replace(/\D/g, '')}`} target="_blank" rel="noreferrer" className="w-full bg-[#25D366] text-white py-3 rounded-sm font-bold uppercase tracking-wider text-sm hover:bg-[#128C7E] transition-colors">Chat on WhatsApp</a>
            </div>

            <div className="bg-gray-50 dark:bg-brand-charcoal p-8 border border-gray-200 dark:border-brand-black text-center flex flex-col items-center">
              <div className="w-16 h-16 bg-brand-burgundy/10 rounded-full flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-brand-burgundy" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
              </div>
              <h3 className="text-xl font-serif font-bold text-brand-black dark:text-brand-white mb-2">Email Us</h3>
              <p className="text-gray-600 dark:text-brand-gray text-sm mb-6">For general inquiries and business partnerships.</p>
              <a href={`mailto:${BUSINESS.email}`} className="w-full border-2 border-brand-burgundy text-brand-burgundy py-3 rounded-sm font-bold uppercase tracking-wider text-sm hover:bg-brand-burgundy hover:text-brand-white transition-colors">Send Email</a>
            </div>
          </div>

          {/* Review Form */}
          <div className="bg-gray-50 dark:bg-brand-charcoal p-8 border border-gray-200 dark:border-brand-black">
            <h3 className="text-2xl font-serif font-bold text-brand-black dark:text-brand-white mb-2">Leave a Review</h3>
            <p className="text-gray-600 dark:text-brand-gray text-sm mb-6">Had a tattoo with us? We'd love to hear your thoughts!</p>

            {submitted ? (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                </div>
                {/* I FIXED THE H4 TAG HERE */}
                <h4 className="text-xl font-bold text-brand-black dark:text-brand-white mb-2">Thank You!</h4>
                <p className="text-gray-600 dark:text-brand-gray">Your review has been submitted for approval.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm text-gray-600 dark:text-brand-gray mb-2">Your Name *</label>
                  <input required type="text" className="w-full bg-white dark:bg-brand-black border border-gray-300 dark:border-brand-gray/30 rounded-sm px-4 py-3 text-brand-black dark:text-brand-white focus:outline-none focus:border-brand-burgundy transition-colors" 
                    value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} />
                </div>
                <div>
                  <label className="block text-sm text-gray-600 dark:text-brand-gray mb-2">City / Country</label>
                  <input type="text" className="w-full bg-white dark:bg-brand-black border border-gray-300 dark:border-brand-gray/30 rounded-sm px-4 py-3 text-brand-black dark:text-brand-white focus:outline-none focus:border-brand-burgundy transition-colors" 
                    value={formData.location} onChange={(e) => setFormData({...formData, location: e.target.value})} />
                </div>
                <div>
                  <label className="block text-sm text-gray-600 dark:text-brand-gray mb-2">Rating *</label>
                  <div className="flex gap-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button key={star} type="button" onClick={() => setRating(star)} className="focus:outline-none">
                        <svg className={`w-8 h-8 ${star <= rating ? "text-brand-gold" : "text-gray-300 dark:text-brand-gray/30"}`} fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="block text-sm text-gray-600 dark:text-brand-gray mb-2">Your Review *</label>
                  <textarea required rows={4} className="w-full bg-white dark:bg-brand-black border border-gray-300 dark:border-brand-gray/30 rounded-sm px-4 py-3 text-brand-black dark:text-brand-white focus:outline-none focus:border-brand-burgundy transition-colors"
                    placeholder="Tell us about your experience..."
                    value={formData.text} onChange={(e) => setFormData({...formData, text: e.target.value})}></textarea>
                </div>
                <button disabled={isSubmitting} type="submit" className="w-full bg-brand-burgundy text-brand-white font-bold uppercase tracking-wider py-4 rounded-sm hover:bg-brand-burgundy/80 transition-colors disabled:opacity-50">
                  {isSubmitting ? "Submitting..." : "Submit Review"}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}