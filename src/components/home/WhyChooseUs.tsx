import Image from "next/image";

export default function WhyChooseUs() {
  return (
    <section className="py-24 bg-brand-white dark:bg-brand-black transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          
          {/* Left Side: Text */}
          <div>
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-brand-black dark:text-brand-white mb-4">
              Why Choosing <span className="text-brand-burgundy">Us</span>
            </h2>
            <p className="text-gray-600 dark:text-brand-gray mb-8">
              We provide a premium, safe, and highly professional tattoo experience. Whether you come to our studio or we come to your home, our artists ensure your vision is brought to life with precision and care.
            </p>

            <div className="space-y-8">
              {/* Feature 1 */}
              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 rounded-full bg-brand-burgundy/10 flex items-center justify-center">
                    <svg className="w-6 h-6 text-brand-burgundy" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-serif text-brand-black dark:text-brand-white mb-1">Professional Artists</h3>
                  <p className="text-gray-600 dark:text-brand-gray text-sm">Our network consists of highly skilled artists specializing in various styles from fine line to realism.</p>
                </div>
              </div>

              {/* Feature 2 */}
              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 rounded-full bg-brand-burgundy/10 flex items-center justify-center">
                    <svg className="w-6 h-6 text-brand-burgundy" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" /></svg>
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-serif text-brand-black dark:text-brand-white mb-1">Premium Designs</h3>
                  <p className="text-gray-600 dark:text-brand-gray text-sm">Browse through our gallery of over 50 unique designs or request a completely custom piece.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side: Image Collage (Using your real images) */}
          <div className="grid grid-cols-2 gap-4">
            <div className="relative h-80 rounded-sm overflow-hidden">
              <Image src="/images/tatme%20(10).jpg" alt="Tattoo 1" fill className="object-cover" />
            </div>
            <div className="relative h-80 rounded-sm overflow-hidden mt-8">
              <Image src="/images/tatme%20(24).jpg" alt="Tattoo 2" fill className="object-cover" />
            </div>
            <div className="relative h-80 rounded-sm overflow-hidden">
              <Image src="/images/tatme%20(13).jpg" alt="Tattoo 3" fill className="object-cover" />
            </div>
            <div className="relative h-80 rounded-sm overflow-hidden mt-8">
              <Image src="/images/tatme%20(34).jpg" alt="Tattoo 4" fill className="object-cover" />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}