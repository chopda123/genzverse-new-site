



// components/Hero.js
'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { FiArrowRight, FiStar, FiAward } from 'react-icons/fi'

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
    <section className="relative min-h-screen flex flex-col lg:items-center lg:justify-center overflow-hidden">
      
      {/* 1. BACKGROUND SLIDESHOW */}
      <div className="absolute inset-0">
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
            <div className="absolute inset-0 bg-gradient-to-br from-dark-500/95 via-dark-500/80 to-dark-600/95"></div>
          </div>
        ))}
      </div>

      {/* 2. FLOATING ELEMENTS */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-4 h-4 bg-accent-purple/30 rounded-full animate-pulse"></div>
        <div className="absolute top-1/3 right-1/4 w-6 h-6 bg-accent-cyan/20 rounded-full animate-bounce"></div>
      </div>

      {/* 3. MAIN CONTENT CONTAINER 
          - flex-col justify-between: Spreads content Top, Middle, Bottom
      */}
      <div className="relative z-10 container-custom px-4 sm:px-6 lg:px-8 h-screen lg:h-auto pt-24 pb-6 lg:py-0 flex flex-col justify-between lg:block">
        
        {/* === ZONE 1: TOP (Badge + Heading) === */}
        <div className="flex flex-col justify-start lg:block text-center">
          {/* Badge */}
          <div className="flex justify-center lg:block lg:mb-6 mb-4">
            <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2">
              <FiAward className="w-3.5 h-3.5 text-accent-cyan" />
              <span className="text-xs font-medium text-white">
                Anime streetwear — designed with intention
              </span>
            </div>
          </div>

          {/* Main Heading */}
          <h1 className="text-4xl sm:text-5xl lg:text-7xl font-heading font-bold text-white mb-0 lg:mb-6 leading-tight">
            Wear What You{' '}
            <span className="text-gradient bg-gradient-to-r from-accent-purple via-accent-pink to-accent-cyan bg-clip-text text-transparent">
              Felt
            </span>
            . Not What You Saw.
          </h1>
        </div>

        {/* === ZONE 2: CENTER (Subtitle Text) === 
            - flex-1: Makes this occupy all the middle empty space
            - flex items-center: Vertically centers the text in that space
        */}
        <div className="flex-1 flex items-center justify-center lg:block lg:flex-none lg:mb-8">
          <p className="text-lg sm:text-2xl lg:text-3xl text-gray-300 max-w-3xl mx-auto leading-relaxed text-center px-4">
            Designed for fans who understand meaning — not merch.
          </p>
        </div>

        {/* === ZONE 3: BOTTOM (Buttons + Stats) === */}
        <div className="flex flex-col justify-end lg:block text-center">
          
          {/* CTA Buttons */}
          <div className="hero-cta flex flex-col sm:flex-row items-center justify-center gap-3 mb-6 lg:mb-12">
            <Link
              href="/products"
              className="group bg-gradient-to-r from-accent-purple to-accent-pink hover:from-accent-pink hover:to-accent-purple text-white font-semibold text-base md:text-lg px-6 py-3 md:px-8 md:py-4 rounded-2xl transition-all duration-300 transform hover:scale-105 shadow-2xl shadow-accent-purple/25 flex items-center space-x-3 w-auto justify-center"
            >
              <span>Explore Collection</span>
              <FiArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
            </Link>
            
            <Link
              href="/products?filter=limited"
              className="group border-2 border-white/20 hover:border-accent-cyan bg-white/5 backdrop-blur-sm hover:bg-accent-cyan/10 text-white font-semibold text-base md:text-lg px-6 py-3 md:px-8 md:py-4 rounded-2xl transition-all duration-300 transform hover:scale-105 flex items-center space-x-3 w-auto justify-center"
            >
              <FiStar className="w-5 h-5 text-accent-cyan" />
              <span>Limited Editions</span>
            </Link>
          </div>

          {/* Stats */}
          {/* <div className="lg:mt-12">
            <div className="stats-container grid grid-cols-3 gap-4 lg:flex lg:justify-center lg:gap-12 border-t border-white/10 pt-4 lg:border-none lg:pt-0">
              <div className="stat-card">
                <span className="stat-icon block text-2xl mb-1 lg:inline lg:text-base lg:mb-0 lg:mr-2">👥</span>
                <span className="stat-number block font-bold text-xl lg:inline lg:text-base">1K+</span>
                <span className="stat-label block text-xs text-gray-400 lg:inline lg:ml-2">Customers</span>
              </div>

              <div className="stat-card">
                <span className="stat-icon block text-2xl mb-1 lg:inline lg:text-base lg:mb-0 lg:mr-2">⏳</span>
                <span className="stat-number block font-bold text-xl lg:inline lg:text-base">2+</span>
                <span className="stat-label block text-xs text-gray-400 lg:inline lg:ml-2">Years</span>
              </div>

              <div className="stat-card">
                <span className="stat-icon block text-2xl mb-1 lg:inline lg:text-base lg:mb-0 lg:mr-2">🎨</span>
                <span className="stat-number block font-bold text-xl lg:inline lg:text-base">15+</span>
                <span className="stat-label block text-xs text-gray-400 lg:inline lg:ml-2">Designs</span>
              </div>
            </div>
          </div> */}
        </div>

      </div>

      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce hidden lg:block">
        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white/50 rounded-full mt-2"></div>
        </div>
      </div>

    </section>
  )
}