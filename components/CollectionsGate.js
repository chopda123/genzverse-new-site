'use client'
import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'

export default function CollectionsGate() {
  const collections = [
    {
      title: "You Know, If You Know",
      subtitle: "For True Fans",
      desc: "Numbers, symbols, and moments only real fans recognize.",
      image: "/hidden-reference.webp",
      href: "/products?category=you-know-if-you-know"
    },
    {
      title: "Cult Classic",
      subtitle: "Words That Stayed",
      desc: "Iconic silhouettes and poses, executed with restraint.",
      image: "/underrated-classic-2.webp",
      href: "/products?category=cult-classics"
    },
    {
      title: "Shonen Icon",
      subtitle: "Iconic Silhouettes",
      desc: "Famous anime lines turned into wearable statements.",
      image: "/character.webp",
      href: "/products?category=shonen-icons"
    },
  ]

  // Mobile Carousel state and interaction refs
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isDragging, setIsDragging] = useState(false)
  const [dragOffset, setDragOffset] = useState(0)
  const touchStartX = useRef(0)
  const touchStartY = useRef(0)
  const isHorizontalSwipe = useRef(null)
  const autoplayTimer = useRef(null)
  const isInteracting = useRef(false)

  // Autoplay ~2.5s per slide on mobile
  useEffect(() => {
    const startAutoplay = () => {
      if (autoplayTimer.current) clearInterval(autoplayTimer.current)
      autoplayTimer.current = setInterval(() => {
        if (!isInteracting.current) {
          setCurrentSlide(prev => (prev + 1) % collections.length)
        }
      }, 2600)
    }

    startAutoplay()
    return () => {
      if (autoplayTimer.current) clearInterval(autoplayTimer.current)
    }
  }, [collections.length])

  // Touch and Drag handlers
  const handleTouchStart = (e) => {
    isInteracting.current = true
    const touch = e.touches ? e.touches[0] : e
    touchStartX.current = touch.clientX
    touchStartY.current = touch.clientY
    isHorizontalSwipe.current = null
    setIsDragging(true)
    setDragOffset(0)
  }

  const handleTouchMove = (e) => {
    if (!isDragging) return
    const touch = e.touches ? e.touches[0] : e
    const deltaX = touch.clientX - touchStartX.current
    const deltaY = touch.clientY - touchStartY.current

    if (isHorizontalSwipe.current === null) {
      if (Math.abs(deltaX) > 8 || Math.abs(deltaY) > 8) {
        isHorizontalSwipe.current = Math.abs(deltaX) > Math.abs(deltaY)
      }
    }

    if (isHorizontalSwipe.current) {
      if (e.cancelable && e.touches) {
        e.preventDefault()
      }
      setDragOffset(deltaX)
    }
  }

  const handleTouchEnd = () => {
    if (!isDragging) return
    setIsDragging(false)
    const threshold = 40
    if (isHorizontalSwipe.current && Math.abs(dragOffset) > threshold) {
      if (dragOffset < -threshold) {
        setCurrentSlide(prev => (prev + 1) % collections.length)
      } else if (dragOffset > threshold) {
        setCurrentSlide(prev => (prev - 1 + collections.length) % collections.length)
      }
    }
    setDragOffset(0)
    isHorizontalSwipe.current = null

    // Resume autoplay after interaction
    setTimeout(() => {
      isInteracting.current = false
    }, 1500)
  }

  return (
    <section className="py-8 md:py-10 lg:py-12 bg-dark-500 relative overflow-hidden">
      {/* Optional: Background Ambience - adds depth behind the cards */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-purple-600/10 blur-[100px] rounded-full pointer-events-none"></div>

      <div className="container-custom relative z-10">

        {/* Section Header */}
        <div className="text-center mb-8 md:mb-8 lg:mb-10">
          <h2 className="text-3xl md:text-5xl font-heading font-black mb-3 md:mb-3.5 tracking-tight">
            EXPLORE THE <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">GENZVERSE</span>
          </h2>
          <div className="h-1 w-20 md:w-24 bg-gradient-to-r from-purple-500 to-transparent mx-auto rounded-full"></div>
        </div>

        {/* 1. MOBILE CAROUSEL (< 1024px) */}
        <div className="lg:hidden relative w-full overflow-hidden px-4">
          <div
            className="w-full touch-pan-y select-none cursor-grab active:cursor-grabbing"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            onMouseDown={handleTouchStart}
            onMouseMove={handleTouchMove}
            onMouseUp={handleTouchEnd}
            onMouseLeave={handleTouchEnd}
          >
            <div
              className="flex"
              style={{
                transform: `translateX(calc(-${currentSlide * 100}% + ${isDragging ? dragOffset : 0}px))`,
                transition: isDragging ? 'none' : 'transform 450ms cubic-bezier(0.25, 1, 0.5, 1)'
              }}
            >
              {collections.map((c, i) => (
                <div key={i} className="w-full flex-shrink-0 px-2 flex justify-center">
                  <Link
                    href={c.href}
                    className="group relative w-full max-w-[360px] h-[450px] rounded-3xl overflow-hidden border border-white/5 bg-dark-400 block"
                    onClick={(e) => {
                      if (Math.abs(dragOffset) > 10) e.preventDefault()
                    }}
                  >
                    {/* 1. IMAGE LAYER */}
                    <div className="absolute inset-0 overflow-hidden">
                      <Image
                        src={c.image}
                        alt={c.title}
                        fill
                        sizes="100vw"
                        className="object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80"></div>
                    </div>

                    {/* 2. HOVER BORDER GLOW */}
                    <div className="absolute inset-0 border-2 border-transparent group-hover:border-purple-500/50 rounded-3xl transition-colors duration-500 z-20 pointer-events-none"></div>

                    {/* 3. CONTENT LAYER - Glassmorphism Panel */}
                    <div className="absolute inset-0 flex flex-col justify-end p-4">
                      <div className="relative overflow-hidden rounded-2xl bg-black/40 backdrop-blur-md border border-white/10 p-5">
                        <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-bl from-purple-500/20 to-transparent -mr-8 -mt-8 rounded-full blur-xl"></div>

                        <p className="text-xs font-bold tracking-[0.2em] text-purple-400 uppercase mb-2">
                          {c.subtitle}
                        </p>

                        <h3 className="text-2xl font-black text-white uppercase leading-none mb-2 drop-shadow-lg">
                          {c.title}
                        </h3>

                        <p className="text-xs text-gray-300 font-medium leading-relaxed pt-2 border-t border-white/10">
                          {c.desc}
                        </p>
                      </div>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          </div>

          {/* Carousel Indicator Dots */}
          <div className="flex justify-center items-center gap-2 mt-5">
            {collections.map((_, i) => (
              <button
                key={i}
                type="button"
                aria-label={`Go to slide ${i + 1}`}
                onClick={() => {
                  setCurrentSlide(i)
                  isInteracting.current = true
                  setTimeout(() => { isInteracting.current = false }, 2000)
                }}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  i === currentSlide
                    ? 'w-6 bg-gradient-to-r from-purple-500 to-pink-500'
                    : 'w-2 bg-white/25'
                }`}
              />
            ))}
          </div>
        </div>

        {/* 2. DESKTOP GRID (>= 1024px) — EXACT ORIGINAL UNCHANGED */}
        <div className="hidden lg:grid lg:grid-cols-3 gap-8 max-w-[1200px] mx-auto px-4">
          {collections.map((c, i) => (
            <Link
              key={i}
              href={c.href}
              className="group relative h-[450px] rounded-3xl overflow-hidden border border-white/5 bg-dark-400"
            >
              
              {/* 1. IMAGE LAYER with Scale & Rotate Effect */}
              <div className="absolute inset-0 overflow-hidden">
                <Image
                  src={c.image}
                  alt={c.title}
                  fill // Fits the card container
                  sizes="33vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-110 group-hover:rotate-1"
                />
              
                {/* Dark Gradient from bottom to top */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80 group-hover:opacity-60 transition-opacity duration-500"></div>
              </div>

              {/* 2. HOVER BORDER GLOW */}
              <div className="absolute inset-0 border-2 border-transparent group-hover:border-purple-500/50 rounded-3xl transition-colors duration-500 z-20 pointer-events-none"></div>
              
              {/* 3. CONTENT LAYER - Glassmorphism Panel */}
              <div className="absolute inset-0 flex flex-col justify-end p-4">
                
                {/* Glass Box */}
                <div className="relative overflow-hidden rounded-2xl bg-black/1 backdrop-blur-md border border-white/10 p-6 transition-all duration-500 group-hover:bg-black/60 group-hover:border-purple-500/30 transform translate-y-4 group-hover:translate-y-0">
                  
                  {/* Decorative corner flash */}
                  <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-bl from-purple-500/20 to-transparent -mr-8 -mt-8 rounded-full blur-xl group-hover:from-purple-500/40 transition-all"></div>

                  <p className="text-xs font-bold tracking-[0.2em] text-purple-400 uppercase mb-2">
                    {c.subtitle}
                  </p>
                  
                  <h3 className="text-2xl md:text-3xl font-black text-white uppercase leading-none mb-3 drop-shadow-lg">
                    {c.title}
                  </h3>

                  {/* Description - Slides in/Opacifies on hover */}
                  <div className="h-0 opacity-0 group-hover:h-auto group-hover:opacity-100 transition-all duration-500 ease-in-out delay-75">
                    <p className="text-sm text-gray-300 font-medium leading-relaxed pt-2 border-t border-white/10">
                      {c.desc}
                    </p>
                  </div>

                  {/* CTA Arrow */}
                  <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                     <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
                  </div>
                </div>
              </div>

            </Link>
          ))}
        </div>

      </div>
    </section>
  )
}