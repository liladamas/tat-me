import Image from "next/image";
import Link from "next/link";
import { TATTOOS } from "@/data/tattoos";
import { notFound } from "next/navigation";

// THIS IS THE FIX: Allows the route to block on dynamic params
export const instant = false;

export default async function TattooDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  
  const tattoo = TATTOOS.find((t) => t.slug === resolvedParams.slug);

  if (!tattoo) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-brand-black py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="mb-8 text-sm text-brand-gray">
          <Link href="/gallery" className="hover:text-brand-white transition-colors">
            &larr; Back to Gallery
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          
          <div className="relative aspect-[4/5] bg-brand-charcoal border border-brand-burgundy/20">
            <Image
              src={tattoo.imagePath}
              alt={tattoo.title}
              fill
              className="object-contain"
              priority
            />
          </div>

          <div className="flex flex-col justify-center">
            <span className="text-brand-burgundy font-semibold tracking-widest uppercase text-sm mb-2">
              {tattoo.category || "Tattoo Design"}
            </span>
            
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-brand-white mb-4">
              {tattoo.title}
            </h1>
            
            <p className="text-brand-gray text-lg mb-8 leading-relaxed">
              {tattoo.description || "A premium custom design crafted by the TAT-ME artists. Every piece is tailored to fit your vision and placement perfectly."}
            </p>

            <div className="bg-brand-charcoal p-6 rounded-sm mb-8 border border-brand-black">
              <div className="flex justify-between items-center mb-2">
                <span className="text-brand-gray">Starting Price</span>
                <span className="text-2xl font-bold text-brand-white">
                  {tattoo.currency || "$"}{tattoo.basePrice || "150"}
                </span>
              </div>
              <p className="text-xs text-brand-gray mb-4">
                * Price may vary based on size, placement, and complexity. Final quote provided at booking.
              </p>
              
              <hr className="border-brand-black mb-4" />
              
              <div className="flex justify-between items-center text-sm">
                <span className="text-brand-gray">Deposit (60%)</span>
                <span className="text-brand-white font-semibold">
                  {tattoo.currency || "$"}{Math.round((tattoo.basePrice || 150) * 0.6)}
                </span>
              </div>
              <div className="flex justify-between items-center text-sm mt-1">
                <span className="text-brand-gray">Remaining Balance</span>
                <span className="text-brand-white font-semibold">
                  {tattoo.currency || "$"}{Math.round((tattoo.basePrice || 150) * 0.4)}
                </span>
              </div>
            </div>

            <div className="space-y-4">
              <Link 
                href={`/book/studio?tattoo=${tattoo.slug}`}
                className="block w-full bg-brand-burgundy text-brand-white text-center px-8 py-4 rounded-sm font-bold uppercase tracking-wider hover:bg-brand-burgundy/80 transition-colors"
              >
                Book This Tattoo at the Studio
              </Link>
              
              <Link 
                href={`/book/home?tattoo=${tattoo.slug}`}
                className="block w-full border-2 border-brand-burgundy text-brand-burgundy text-center px-8 py-4 rounded-sm font-bold uppercase tracking-wider hover:bg-brand-burgundy hover:text-brand-white transition-colors"
              >
                Book This Tattoo at Home
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}