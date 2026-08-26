// components/ValueBanner.js
import Image from 'next/image';

export default function ValueBanner() {
  return (
    // Responsive height: Taller on mobile (75vh) for vertical images, shorter on desktop
    <section className="relative w-full h-[75vh] md:h-[60vh] md:min-h-[500px] md:max-h-[800px] overflow-hidden bg-dark-500">
      {/* Background Image: public/background.webp */}
      <div className="absolute inset-0">
        <Image
          src="/background.webp"
          alt="Premium Design, Fabric, and Execution"
          fill
          sizes="100vw"
          priority
          className="object-cover object-center"
        />
      </div>

      {/* Dark overlay gradient for readability */}
      <div className="absolute inset-0 bg-gradient-to-t from-dark-500/90 via-dark-500/50 to-dark-500/30 z-10"></div>

      {/* Text Content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4 z-20 mt-10 md:mt-20">
        
        {/* Accent line */}
        <div className="w-16 h-1 md:w-20 bg-white/30 mb-6 rounded-full"></div>

        {/* Heading */}
        <h2 className="text-3xl md:text-6xl font-heading font-bold text-white mb-4 md:mb-6 tracking-tight drop-shadow-lg">
          DESIGN. FABRIC. EXECUTION.
        </h2>

        {/* Description */}
        <p className="text-lg md:text-2xl text-gray-200 max-w-xs md:max-w-3xl font-light leading-relaxed drop-shadow-md">
          Intentional details. 240 GSM heavyweight cotton. Flawless matte finishes.
          <span className="block mt-2 font-medium text-white">No shortcuts.</span>
        </p>
      </div>
    </section>
  );
}