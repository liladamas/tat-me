"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

export default function HomeServiceHighlight() {
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [reviews, setReviews] = useState<any[]>([]);

  useEffect(() => {
    // We add a catch block so if the database is asleep, the site doesn't crash
    fetch("/api/admin/content")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch");
        return res.json();
      })
      .then((data) => {
        if (data.videoUrl) setVideoUrl(data.videoUrl);
        if (data.reviewsJson) setReviews(data.reviewsJson);
      })
      .catch((err) => {
        console.log("Using default content because database is waking up:", err.message);
      });
  }, []);

  return (
    <section className="relative py-24 bg-brand-white dark:bg-brand-black overflow-hidden transition-colors duration-300">
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-brand-burgundy/10 dark:bg-brand-burgundy/20 rounded-full blur-3xl -translate-y-1/2 -translate-x-1/2 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          
          {/* LEFT SIDE: Video */}
          <div className="flex flex-col gap-6">
            <div className="relative w-full rounded-sm overflow-hidden border border-gray-200 dark:border-brand-burgundy/30 shadow-2xl">
              {videoUrl ? (
                <video controls muted playsInline className="w-full h-auto object-contain">
                  <source src={videoUrl} type="video/mp4" />
                </video>
              ) : (
                <div className="aspect-[4/5] bg-gray-200 dark:bg-brand-charcoal flex items-center justify-center text-gray-500">
                  No video uploaded yet.
                </div>
              )}
            </div>
          </div>

          {/* RIGHT SIDE: Copy & Reviews */}
          <div className="pt-2 lg:mt-10">
            <span className="text-brand-burgundy font-semibold tracking-widest uppercase text-sm mb-2 block">Exclusive Service</span>
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-brand-black dark:text-brand-white mb-6">
              Premium Tattoos <br />
              <span className="text-brand-burgundy italic">In Your Home.</span>
            </h2>
            <p className="text-gray-600 dark:text-brand-gray text-lg mb-8 leading-relaxed">
              Skip the studio. We bring the entire sterile, professional tattoo setup directly to your living room.
            </p>

            <div className="mb-10">
              <h4 className="text-brand-black dark:text-brand-white font-serif font-bold text-xl mb-4">What Clients Say</h4>
              <div className="space-y-3">
                {reviews.map((review, i) => (
                  <div key={i} className="bg-gray-50 dark:bg-brand-charcoal p-4 rounded-sm border border-gray-200 dark:border-brand-black">
                    <div className="flex gap-1 mb-1">
                      {[...Array(review.rating)].map((_, star) => (
                        <svg key={star} className="w-4 h-4 text-brand-gold" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
                      ))}
                    </div>
                    <p className="text-gray-700 dark:text-brand-gray text-sm italic mb-2">"{review.text}"</p>
                    <p className="text-brand-black dark:text-brand-white font-bold text-xs uppercase tracking-wider">— {review.name}, {review.location}</p>
                  </div>
                ))}
                {reviews.length === 0 && <p className="text-gray-500">No reviews yet.</p>}
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/book/home" className="bg-brand-burgundy text-brand-white text-center px-8 py-3 rounded-sm font-bold uppercase tracking-wider text-sm hover:bg-brand-burgundy/80 transition-colors">
                Book Home Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}