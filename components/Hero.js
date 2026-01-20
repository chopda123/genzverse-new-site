

// components/Hero.js
'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
// ✅ FIX: Added FiAward to the import list
import { FiArrowRight, FiAward } from 'react-icons/fi'

export default function Hero() {
  const [currentBackground, setCurrentBackground] = useState(0)

  // Anime landscape images
  const desktopImages = [
    "/products/post-4-descktop.jpg",
    "/products/post-2-descktop.jpg",
    "/products/post-5-descktop.jpg",
  ]

  const mobileImages = [
    "/products/post-1-mobile.jpg",
    "/products/post-2-mobile.jpg",
    "/products/post-3-mobile.jpg",
  ]

  const [backgroundImages, setBackgroundImages] = useState(desktopImages)

  useEffect(() => {
    const updateImages = () => {
      if (window.innerWidth < 768) {
        setBackgroundImages(mobileImages)
      } else {
        setBackgroundImages(desktopImages)
      }
    }

    updateImages()
    window.addEventListener("resize", updateImages)
    return () => window.removeEventListener("resize", updateImages)
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
            <img
              src={image}
              alt={`Anime Landscape ${index + 1}`}
              className="w-full h-full object-cover"
            />
            {/* Dark overlay for text readability */}
            <div className="absolute inset-0 bg-black/60"></div>
          </div>
        ))}
      </div>

      {/* 2. MAIN CONTENT LAYOUT */}
      <div className="relative z-10 container mx-auto px-4 h-full flex flex-col pt-28 pb-6">
        
        {/* === TOP ZONE: BADGE (ICON RESTORED) === */}
        <div className="flex-none flex justify-center">
          {/* Added space-x-2 for gap between icon and text */}
          <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-5 py-2 shadow-lg">
            {/* The Icon */}
            <FiAward className="w-4 h-4 text-cyan-400" />
            
            <span 
              className="text-xs sm:text-sm text-white tracking-wide"
              style={{ fontFamily: '"Comic Sans MS", "Comic Sans", cursive' }}
            >
              Anime streetwear — designed with intention
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
          
          {/* Main Heading - STRICTLY 2 LINES */}
          <h1 
            className="text-3xl sm:text-5xl lg:text-6xl font-bold text-white mb-8 sm:mb-12 leading-tight drop-shadow-xl"
            style={{ fontFamily: '"Comic Sans MS", "Comic Sans", cursive' }}
          >
            <span className="whitespace-nowrap">
              Wear What You{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500">
                Felt
              </span>
            </span>
            <br />
            <span className="whitespace-nowrap">Not What You Saw.</span>
          </h1>

          {/* === BUTTON === */}
          <Link href="/products">
            <div className="group relative inline-block cursor-pointer transition-transform duration-200 active:scale-95 hover:scale-105">
              
              {/* Button Shape */}
              <div className="relative h-12 w-48 sm:h-16 sm:w-72 transform -skew-x-12 bg-gradient-to-b from-[#a855f7] to-[#6b21a8] border-[3px] border-[#d8b4fe] shadow-[0_0_20px_rgba(168,85,247,0.6)] flex items-center justify-center overflow-hidden">
                
                {/* Gloss & Glow */}
                <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-white/30 to-transparent pointer-events-none"></div>
                <div className="absolute inset-0 bg-purple-500/0 group-hover:bg-purple-500/20 transition-colors duration-300"></div>

                {/* Text (Un-skewed) */}
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