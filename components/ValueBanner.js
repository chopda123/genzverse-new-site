// components/ValueBanner.js
import Image from 'next/image';

export default function ValueBanner() {
  return (
    // Responsive height: Taller on mobile (75vh) for vertical images, shorter on desktop
    <section className="relative w-full h-[75vh] md:h-[60vh] md:min-h-[500px] md:max-h-[800px] overflow-hidden bg-dark-500">

      {/* =============================================
          IMAGE SWITCHING SECTION
      ============================================= */}

      {/* 1. MOBILE IMAGE (Visible by default, hidden on medium screens+) */}
      <div className="absolute inset-0 block md:hidden">
        <Image
          src='/value4.png'
          alt="Premium Design, Fabric, and Execution - Mobile View"
          fill
          // ✅ FIX: Added sizes prop. 
          // Since this is mobile-only, "100vw" tells the browser it fills the width.
          sizes="100vw"
          className="object-cover object-center opacity-80"
          priority
        />
      </div>

      {/* 2. DESKTOP IMAGE (Hidden by default, visible on medium screens+) */}
      <div className="absolute inset-0 hidden md:block">
        <Image
          src='/value.png'
          alt="Premium Design, Fabric, and Execution - Desktop View"
          fill
          // ✅ FIX: Added sizes prop.
          // On desktop, it also fills the full width.
          sizes="100vw"
          className="object-cover object-center opacity-80"
          priority
        />
      </div>

      {/* =============================================
          OVERLAY & TEXT SECTION
      ============================================= */}

      {/* Dark overlay gradient for readability */}
      <div className="absolute inset-0 bg-gradient-to-t from-dark-500 via-dark-500/60 to-transparent z-10"></div>

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