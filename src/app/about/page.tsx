import Image from "next/image";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-brand-black py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          
          <div>
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-brand-white mb-6">
              The Story of <br/><span className="text-brand-burgundy">TAT-ME</span>
            </h1>
            <p className="text-brand-gray text-lg mb-6 leading-relaxed">
              At TAT-ME, we believe that a tattoo is more than just ink on skin. It is a story, a memory, and a piece of art that lives with you forever.
            </p>
            <p className="text-brand-gray text-lg mb-6 leading-relaxed">
              We connect clients with exceptional tattoo artists across supported locations. Whether you are looking for a custom masterpiece, a fine-line tribute, or a bold realism piece, our network is dedicated to bringing your vision to life.
            </p>
            <div className="grid grid-cols-2 gap-6 mt-8">
              <div className="border-l-2 border-brand-burgundy pl-4">
                <h3 className="text-3xl font-serif font-bold text-brand-white mb-1">59+</h3>
                <p className="text-brand-gray text-sm uppercase tracking-wider">Premium Designs</p>
              </div>
              <div className="border-l-2 border-brand-burgundy pl-4">
                <h3 className="text-3xl font-serif font-bold text-brand-white mb-1">100%</h3>
                <p className="text-brand-gray text-sm uppercase tracking-wider">Custom Artistry</p>
              </div>
            </div>
          </div>

          <div className="relative h-[600px] w-full border border-brand-burgundy/20">
            <Image 
              src="/studio.jpg" 
              alt="TAT-ME Studio"
              fill
              className="object-cover"
            />
          </div>

        </div>
      </div>
    </div>
  );
}