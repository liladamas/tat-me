import Image from "next/image";
import Link from "next/link";
import { TATTOOS } from "@/data/tattoos";

export default function FeaturedTattoos() {
  const featured = TATTOOS.slice(0, 4);

  return (
    <section className="py-24 bg-brand-white dark:bg-brand-black transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-end mb-12">
          <div>
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-brand-black dark:text-brand-white mb-4 transition-colors">
              Featured <span className="text-brand-burgundy">Work</span>
            </h2>
            <p className="text-gray-600 dark:text-brand-gray max-w-xl transition-colors">
              A glimpse into the art we create. Browse our full gallery to find your next piece.
            </p>
          </div>
          <Link href="/gallery" className="hidden md:inline-block text-brand-burgundy font-semibold hover:text-brand-black dark:hover:text-brand-white transition-colors">
            View All &rarr;
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featured.map((tattoo) => (
            <Link href={`/gallery/${tattoo.slug}`} key={tattoo.slug} className="group relative overflow-hidden bg-gray-100 dark:bg-brand-charcoal aspect-[4/5] rounded-sm transition-colors">
              <Image
                src={tattoo.imagePath}
                alt={tattoo.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                <h3 className="text-white font-serif text-xl">{tattoo.title}</h3>
                <p className="text-gray-300 text-sm">{tattoo.category}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}