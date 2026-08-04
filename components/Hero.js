


// components/Hero.js
'use client'
import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { FiArrowRight, FiAward } from 'react-icons/fi'
import Image from 'next/image'

// Image arrays defined outside component to avoid re-creation on every render
const desktopImages = [
  "/products/post-4-descktop.webp",
  "/products/post-2-descktop.webp",
  "/products/post-5-descktop.webp",
]

const mobileImages = [
  "/products/post-1-mobile.webp",
  "/products/post-2-mobile.webp",
  "/products/post-3-mobile.webp",
]

export default function Hero() {
  const [currentBackground, setCurrentBackground] = useState(0)
  const [backgroundImages, setBackgroundImages] = useState(desktopImages)
  const resizeTimer = useRef(null)

  useEffect(() => {
    const updateImages = () => {
      if (window.innerWidth < 768) {
        setBackgroundImages(mobileImages)
      } else {
        setBackgroundImages(desktopImages)
      }
    }

    const debouncedUpdate = () => {
      clearTimeout(resizeTimer.current)
      resizeTimer.current = setTimeout(updateImages, 150)
    }

    updateImages()
    window.addEventListener("resize", debouncedUpdate)
    return () => {
      window.removeEventListener("resize", debouncedUpdate)
      clearTimeout(resizeTimer.current)
    }
  }, [])

  // Auto-rotate background
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBackground((prev) => (prev + 1) % backgroundImages.length)
    }, 3000)
    return () => clearInterval(interval)
  }, [backgroundImages.length])

  return (
    <section className="relative h-screen w-full overflow-hidden font-sans">
      
      {/* 1. BACKGROUND SLIDESHOW */}
      <div className="absolute inset-0 z-0">
        {backgroundImages.map((image, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              index === currentBackground ? 'opacity-100' : 'opacity-0'
            }`}
          >
            {/* 🟢 CHANGED: Replaced <img> with <Image /> */}
            <Image
              src={image}
              alt={`Anime Landscape ${index + 1}`}
              fill // Replaces width/height, makes it cover the parent div
              priority={index === 0} // ⚡️ Loads the first image instantly (Boosts SEO)
              sizes="100vw" // Tells browser this image takes up full screen
              className="object-cover"
            />
            
            {/* Dark overlay for text readability */}
            <div className="absolute inset-0 bg-black/60"></div>
          </div>
        ))}
      </div>

      {/* 2. MAIN CONTENT LAYOUT */}
      <div className="relative z-10 container mx-auto px-4 h-full flex flex-col pt-28 pb-6">
        
        {/* === TOP ZONE: BADGE === */}
        <div className="flex-none flex justify-center">
          <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-5 py-2 shadow-lg">
            <FiAward className="w-4 h-4 text-cyan-400" />
            <span 
              className="text-xs sm:text-sm text-white tracking-wide"
              style={{ fontFamily: '"Comic Sans MS", "Comic Sans", cursive' }}
            >
              Anime streetwear — This isn't merch. It's identity
            </span>
          </div>
        </div>

        {/* === MIDDLE ZONE: SUBTITLE === */}
        <div className="flex-1 flex items-center justify-center">
          <p 
            className="text-xl sm:text-2xl lg:text-3xl text-gray-200 text-center drop-shadow-md px-2"
            style={{ 
              fontFamily: '"Comic Sans MS", "Comic Sans", cursive',
            }}
          >
             <span className="lg:whitespace-nowrap">Designed for fans who understand</span>{' '}
             <span className="lg:whitespace-nowrap">meaning — not merch.</span>
          </p>
        </div>

        {/* === BOTTOM ZONE: HEADING & BUTTON === */}
        <div className="flex-none flex flex-col items-center justify-end pb-10 lg:pb-14 text-center">
          
          {/* Main Heading - ONLY FONT CHANGED TO BOLD SANS-SERIF */}
          <h1 
            className="text-3xl sm:text-5xl lg:text-6xl font-black text-white mb-8 sm:mb-12 leading-tight drop-shadow-xl tracking-tight"
            style={{ 
              fontFamily: '"Montserrat", "Arial Black", "Arial", "Helvetica", "sans-serif"',
              fontWeight: '900',
              textTransform: 'uppercase',
              letterSpacing: '-0.5px'
            }}
          >
            <span className="whitespace-nowrap block">
              WEAR WHAT YOU{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500">
                FELT
              </span>
            </span>
            <span className="whitespace-nowrap block">NOT WHAT YOU SAW.</span>
          </h1>

          {/* Subtitle line - UPDATED: Gray color, small size, normal font */}
          <p 
            className="text-sm sm:text-base text-gray-300 mb-8 sm:mb-10 drop-shadow-md text-center"
          >
            Heavy 240 GSM. Designed to feel real — not loud.
          </p>

          {/* === BUTTON === */}
          <Link href="/products">
            <div className="group relative inline-block cursor-pointer transition-transform duration-200 active:scale-95 hover:scale-105">
              
              <div className="relative h-12 w-48 sm:h-16 sm:w-72 transform -skew-x-12 bg-gradient-to-b from-[#a855f7] to-[#6b21a8] border-[3px] border-[#d8b4fe] shadow-[0_0_20px_rgba(168,85,247,0.6)] flex items-center justify-center overflow-hidden">
                
                <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-white/30 to-transparent pointer-events-none"></div>
                <div className="absolute inset-0 bg-purple-500/0 group-hover:bg-purple-500/20 transition-colors duration-300"></div>

                <span 
                  className="transform skew-x-12 text-lg sm:text-2xl font-bold text-white drop-shadow-md tracking-wide"
                  style={{ fontFamily: '"Comic Sans MS", "Comic Sans", cursive' }}
                >
                  Enter GenZverse
                </span>
              </div>
              
            </div>
          </Link>

        </div>

      </div>

      {/* 3. SCROLL DOWN INDICATOR */}
      <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 animate-bounce z-20 opacity-70">
        <div className="w-5 h-8 border-2 border-white/40 rounded-full flex justify-center">
          <div className="w-1 h-2 bg-white rounded-full mt-2"></div>
        </div>
      </div>

    </section>
  )
}