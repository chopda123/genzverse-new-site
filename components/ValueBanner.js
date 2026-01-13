


// components/ValueBanner.js
import Image from 'next/image';

// --- PLACEHOLDERS ---
// Replace these with your actual image paths once generated.
// Example: const desktopImage = "/images/banner-desktop.jpg";
const desktopImage = "https://placehold.co/1920x800/1a1a1a/FFFFFF/png?text=Desktop+Wide+Image";
const mobileImage = "https://placehold.co/800x1400/1a1a1a/FFFFFF/png?text=Mobile+Tall+Image";
// --------------------

export default function ValueBanner() {
  return (
    // Changed height settings for better mobile experience:
    // On mobile (default), it's taller (h-[75vh]) to accommodate the vertical image.
    // On medium screens and up (md:), it reverts to the previous height settings.
    <section className="relative w-full h-[75vh] md:h-[60vh] md:min-h-[500px] md:max-h-[800px] overflow-hidden bg-dark-500">

      {/* =============================================
          IMAGE SWITCHING SECTION
      ============================================= */}

      {/* 1. MOBILE IMAGE (Visible by default, hidden on medium screens+) */}
      {/* We use a wrapper div to control visibility with Tailwind classes */}
      <div className="absolute inset-0 block md:hidden">
        <Image
          src='/value4.png'
          alt="Premium Design, Fabric, and Execution - Mobile View"
          fill
          // On mobile, we want the tall image to cover the area completely.
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
          // On desktop, we use the wide image.
          className="object-cover object-center opacity-80"
          priority
        />
      </div>

      {/* =============================================
          OVERLAY & TEXT SECTION (Shared across views)
      ============================================= */}

      {/* Dark overlay gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-dark-500 via-dark-500/60 to-transparent z-10"></div>

      {/* Text Content */}
      {/* Added 'px-4' for better mobile padding and adjusted margins */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4 z-20 mt-10 md:mt-20">
        {/* Accent line */}
        <div className="w-16 h-1 md:w-20 bg-white/30 mb-6 rounded-full"></div>

        {/* Responsive font sizes: smaller on mobile (text-3xl), larger on desktop (md:text-6xl) */}
        <h2 className="text-3xl md:text-6xl font-heading font-bold text-white mb-4 md:mb-6 tracking-tight drop-shadow-lg">
          DESIGN. FABRIC. EXECUTION.
        </h2>

        {/* Responsive paragraph sizes */}
        <p className="text-lg md:text-2xl text-gray-200 max-w-xs md:max-w-3xl font-light leading-relaxed drop-shadow-md">
         Intentional details. 240 GSM heavyweight cotton. Flawless matte finishes.
         <span className="block mt-2 font-medium text-white">No shortcuts.</span>
        </p>
      </div>
    </section>
  );
}