


'use client'

import { useRef, useEffect, useState } from 'react'
import Image from 'next/image'

// 1. DATA CONFIGURATION
const ORIGINAL_IMAGES = [
  { id: 1, src: "products/not-merch/notmerch-1.png", alt: "Detail 1" },
  { id: 2, src: "/underrated.png", alt: "Detail 2" },
  { id: 3, src: "/street.png", alt: "Detail 3" },
  // { id: 4, src: "products/not-merch/notmerch-4.png", alt: "Detail 4" },
  // { id: 5, src: "products/not-merch/notmerch-5.png", alt: "Detail 5" },
  // { id: 6, src: "products/not-merch/notmerch-6.png", alt: "Detail 6" },
  // { id: 7, src: "products/not-merch/notmerch-7.png", alt: "Detail 7" },
  // { id: 8, src: "products/not-merch/notmerch-8.png", alt: "Detail 8" },
]

// Double the array to create the "Infinite Loop" illusion
const IMAGES = [...ORIGINAL_IMAGES, ...ORIGINAL_IMAGES]

export default function NotMerch() {
  const scrollRef = useRef(null)
  const [isPaused, setIsPaused] = useState(false)

  useEffect(() => {
    const container = scrollRef.current
    let animationFrameId

    const scroll = () => {
      // If user is touching/hovering, stop moving
      if (isPaused || !container) {
        animationFrameId = requestAnimationFrame(scroll)
        return
      }

      // 2. THE "SLOWLY SLOWLY" LOGIC
      // We move 1 pixel per frame (approx 60px per second)
      // This creates a smooth, continuous river effect
      container.scrollLeft += 1

      // 3. THE INFINITE RESET
      // If we have scrolled past half the width (the end of the first set of images),
      // we instantly jump back to 0. Since the images are identical, it looks seamless.
      if (container.scrollLeft >= container.scrollWidth / 2) {
        container.scrollLeft = 0
      }

      // Keep the loop running
      animationFrameId = requestAnimationFrame(scroll)
    }

    // Start the loop
    animationFrameId = requestAnimationFrame(scroll)

    // Cleanup when component unmounts
    return () => cancelAnimationFrame(animationFrameId)
  }, [isPaused])

  return (
    <section
      id="not-merch"
      className="relative bg-dark-500 py-8 md:py-12 overflow-hidden"
    >
      <style jsx>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>

      <div className="container-custom mx-auto px-4">
        <div className="text-center mb-10 md:mb-16">
          <p className="text-xs tracking-widest uppercase text-gray-500 mb-4">
            Design Philosophy
          </p>
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-white">
            This Is <span className="text-gray-400">Not</span> Merch
          </h2>
        </div>
      </div>

      {/* SCROLL CONTAINER */}
      <div 
        ref={scrollRef}
        // Interaction Logic: Pause when user touches/hovers
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        onTouchStart={() => setIsPaused(true)}
        onTouchEnd={() => setIsPaused(false)}
        className="w-full overflow-x-hidden whitespace-nowrap pb-8 no-scrollbar cursor-grab active:cursor-grabbing"
      >
        {/* flex-nowrap puts them in a line */}
        <div className="inline-flex gap-4 md:gap-6 px-4">
          
          {IMAGES.map((img, index) => (
            <div 
              // Using index in key because we duplicated IDs
              key={`${img.id}-${index}`} 
              className="relative shrink-0 rounded-2xl overflow-hidden shadow-lg border border-white/5 bg-gray-900"
            >
              <img
                src={img.src}
                alt={img.alt}
                onError={(e) => {e.target.src = "https://placehold.co/400x500/1a1a1a/FFF?text=GenZverse"}}
                // Same height for all, auto width
                className="h-96 md:h-[500px] w-auto object-cover block"
              />


              
            </div>
          ))}

        </div>
      </div>

      <div className="container-custom mx-auto px-4">
        <div className="max-w-2xl mx-auto text-center text-gray-400 text-sm md:text-base leading-relaxed mt-4">
          <p>
            We don’t design for trends or loud visuals.
            <br className="hidden md:block" />
            We design for those who notice what others miss.
          </p>
        </div>
      </div>
    </section>
  )
}





