"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { TATTOOS } from "@/data/tattoos";

export default function GalleryPage() {
  const [activeFilter, setActiveFilter] = useState("All");

  const categories = ["All", ...Array.from(new Set(TATTOOS.map((t) => t.category).filter(Boolean)))];

  const filteredTattoos = activeFilter === "All" 
    ? TATTOOS 
    : TATTOOS.filter((t) => t.category === activeFilter);

  return (
    <div className="min-h-screen bg-brand-white dark:bg-brand-black py-16 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-brand-black dark:text-brand-white mb-4 transition-colors">
            Our Tattoo <span className="text-brand-burgundy">Gallery</span>
          </h1>
          <p className="text-gray-600 dark:text-brand-gray max-w-2xl mx-auto transition-colors">
            Explore our collection of premium tattoo designs. Select a design to book it at home or in our studio.
          </p>
        </div>

        {/* Filter Buttons */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveFilter(cat as string)}
              className={`px-6 py-2 text-sm font-semibold uppercase tracking-wider rounded-sm transition-colors border ${
                activeFilter === cat
                  ? "bg-brand-burgundy border-brand-burgundy text-brand-white"
                  : "bg-transparent border-gray-300 dark:border-brand-gray/30 text-gray-600 dark:text-brand-gray hover:text-brand-black dark:hover:text-brand-white hover:border-brand-burgundy dark:hover:border-brand-white"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredTattoos.map((tattoo) => (
            <div key={tattoo.slug} className="group relative bg-gray-100 dark:bg-brand-charcoal border border-gray-200 dark:border-brand-black overflow-hidden hover:border-brand-burgundy transition-colors duration-300 rounded-sm">
              
              <div className="aspect-[4/5] relative overflow-hidden bg-gray-200 dark:bg-black">
                <Image
                  src={tattoo.imagePath}
                  alt={tattoo.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4 gap-2">
                   <Link 
                     href={`/gallery/${tattoo.slug}`}
                     className="bg-brand-burgundy text-brand-white text-center py-2 text-sm font-semibold hover:bg-brand-burgundy/80 transition-colors w-full"
                   >
                     View Details
                   </Link>
                </div>
              </div>

              <div className="p-4 bg-brand-white dark:bg-brand-charcoal transition-colors">
                <h3 className="text-brand-black dark:text-brand-white font-serif text-lg truncate">{tattoo.title}</h3>
                <div className="flex justify-between items-center mt-1">
                  <p className="text-gray-500 dark:text-brand-gray text-sm">{tattoo.category}</p>
                  {tattoo.basePrice && (
                    <p className="text-brand-burgundy font-bold">${tattoo.basePrice}</p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredTattoos.length === 0 && (
          <div className="text-center py-20 text-gray-500 dark:text-brand-gray">
            No tattoos found in this category yet.
          </div>
        )}
      </div>
    </div>
  );
}