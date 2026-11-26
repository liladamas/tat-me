"use client";

import { useState } from "react";
import Link from "next/link";

export default function CustomTattooPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API submission
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
    }, 1500);
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-brand-black py-32 flex items-center justify-center px-4">
        <div className="max-w-md w-full bg-brand-charcoal p-8 rounded-sm border border-brand-burgundy text-center">
          <h2 className="text-3xl font-serif font-bold text-brand-white mb-4">Request Received!</h2>
          <p className="text-brand-gray mb-8">
            Thank you for sharing your vision with TAT-ME. Our artists will review your idea and send you a custom quote within 24-48 hours.
          </p>
          <Link href="/" className="inline-block bg-brand-burgundy text-brand-white px-8 py-3 rounded-sm font-bold uppercase tracking-wider text-sm hover:bg-brand-burgundy/80 transition-colors">
            Return Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-brand-black py-16">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-serif font-bold text-brand-white mb-4">
            Request a <span className="text-brand-burgundy">Custom Tattoo</span>
          </h1>
          <p className="text-brand-gray max-w-xl mx-auto">
            Have a unique idea? Describe your vision below and our artists will review it. You will not be charged until a final design and price are agreed upon.
          </p>
        </div>

        <div className="bg-brand-charcoal p-8 rounded-sm border border-brand-black">
          <form onSubmit={handleSubmit} className="space-y-6">
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm text-brand-gray mb-2">Full Name *</label>
                <input required type="text" className="w-full bg-brand-black border border-brand-gray/30 rounded-sm px-4 py-3 text-brand-white focus:outline-none focus:border-brand-burgundy" />
              </div>
              <div>
                <label className="block text-sm text-brand-gray mb-2">Email Address *</label>
                <input required type="email" className="w-full bg-brand-black border border-brand-gray/30 rounded-sm px-4 py-3 text-brand-white focus:outline-none focus:border-brand-burgundy" />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm text-brand-gray mb-2">Phone Number *</label>
                <input required type="tel" className="w-full bg-brand-black border border-brand-gray/30 rounded-sm px-4 py-3 text-brand-white focus:outline-none focus:border-brand-burgundy" />
              </div>
              <div>
                <label className="block text-sm text-brand-gray mb-2">Preferred Style</label>
                <select className="w-full bg-brand-black border border-brand-gray/30 rounded-sm px-4 py-3 text-brand-white focus:outline-none focus:border-brand-burgundy">
                  <option value="">Not sure yet</option>
                  <option value="black-grey">Black and Grey</option>
                  <option value="realism">Realism</option>
                  <option value="fine-line">Fine Line</option>
                  <option value="color">Color Realism</option>
                  <option value="tribal">Tribal</option>
                  <option value="lettering">Lettering</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm text-brand-gray mb-2">Describe Your Idea *</label>
              <textarea required rows={4} className="w-full bg-brand-black border border-brand-gray/30 rounded-sm px-4 py-3 text-brand-white focus:outline-none focus:border-brand-burgundy" placeholder="Tell us what you want, the size, and the placement on your body..."></textarea>
            </div>

            <div>
              <label className="block text-sm text-brand-gray mb-2">Upload Reference Images</label>
              <div className="border-2 border-dashed border-brand-gray/30 rounded-sm p-8 text-center hover:border-brand-burgundy transition-colors cursor-pointer bg-brand-black">
                <p className="text-brand-gray text-sm">Click to upload or drag and drop</p>
                <p className="text-brand-gray text-xs mt-1">JPG, PNG, WEBP up to 5MB</p>
                <input type="file" className="hidden" multiple accept="image/*" />
              </div>
            </div>

            <div className="pt-4 border-t border-brand-black">
              <p className="text-sm text-brand-gray mb-4">
                How would you like to receive your tattoo?
              </p>
              <div className="flex gap-4">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="radio" name="serviceType" value="studio" defaultChecked className="accent-brand-burgundy" />
                  <span className="text-brand-white">At the Studio</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="radio" name="serviceType" value="home" className="accent-brand-burgundy" />
                  <span className="text-brand-white">At my Home</span>
                </label>
              </div>
            </div>

            <button disabled={isSubmitting} type="submit" className="w-full bg-brand-burgundy text-brand-white font-bold uppercase tracking-wider py-4 rounded-sm hover:bg-brand-burgundy/80 transition-colors disabled:opacity-50 mt-4">
              {isSubmitting ? "Submitting..." : "Submit Custom Request"}
            </button>
            <p className="text-center text-xs text-brand-gray mt-4">
              Note: You will not be charged a deposit until the artist reviews your request and provides a final quote.
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}