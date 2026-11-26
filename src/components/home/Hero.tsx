import Image from "next/image";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative h-[90vh] min-h-[600px] flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/studio.jpg" 
          alt="TAT-ME Studio"
          fill
          className="object-cover object-center opacity-50 dark:opacity-40 scale-105 animate-[slowZoom_20s_ease-in-out_infinite]"
          priority
        />
        {/* The gradient overlay: light in light mode, dark in dark mode */}
        <div className="absolute inset-0 bg-gradient-to-t from-white via-white/80 to-transparent dark:from-brand-black dark:via-brand-black/80 dark:to-transparent transition-colors duration-300" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto mt-10">
        <h1 className="text-5xl md:text-7xl font-serif font-bold text-brand-black dark:text-brand-white mb-6 leading-tight animate-[fadeInUp_1s_ease-out_forwards] opacity-0">
          Your Vision. <br />
          <span className="text-brand-burgundy italic">Your Ink.</span> <br />
          Your Story.
        </h1>
        
        <p className="text-gray-800 dark:text-brand-gray text-lg md:text-xl max-w-2xl mx-auto mb-10 animate-[fadeInUp_1s_ease-out_0.3s_forwards] opacity-0">
          Discover exceptional tattoo artistry and book your next tattoo experience with TAT-ME.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center animate-[fadeInUp_1s_ease-out_0.6s_forwards] opacity-0">
          <Link 
            href="/gallery" 
            className="bg-brand-burgundy text-brand-white px-10 py-4 rounded-sm font-bold uppercase tracking-wider text-sm hover:bg-brand-burgundy/80 hover:scale-105 transition-all duration-300 shadow-lg shadow-brand-burgundy/20"
          >
            Explore Tattoo Designs
          </Link>
          <Link 
            href="/book" 
            className="border border-brand-black dark:border-brand-white text-brand-black dark:text-brand-white px-10 py-4 rounded-sm font-bold uppercase tracking-wider text-sm hover:bg-brand-black hover:text-brand-white dark:hover:bg-brand-white dark:hover:text-brand-black hover:scale-105 transition-all duration-300"
          >
            Book Your Tattoo
          </Link>
        </div>
      </div>
    </section>
  );
}