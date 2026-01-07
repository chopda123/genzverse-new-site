


// components/Hero.js - UPDATED WITH CTA WRAPPER
'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { FiArrowRight, FiStar, FiUsers, FiAward } from 'react-icons/fi'

export default function Hero() {
  const [currentBackground, setCurrentBackground] = useState(0)

  // Anime landscape images for background slideshow
 

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

  updateImages() // run on load
  window.addEventListener("resize", updateImages)

  return () => window.removeEventListener("resize", updateImages)
}, [])


  // Auto-rotate background images
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBackground((prev) => (prev + 1) % backgroundImages.length)
    }, 3000) // Change every 5 seconds

    return () => clearInterval(interval)
  }, [backgroundImages.length])

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Slideshow */}
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
            {/* Dark overlay for better text readability */}
            <div className="absolute inset-0 bg-gradient-to-br from-dark-500/95 via-dark-500/80 to-dark-600/95"></div>
          </div>
        ))}
      </div>

      {/* Animated floating elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-4 h-4 bg-accent-purple/30 rounded-full animate-pulse"></div>
        <div className="absolute top-1/3 right-1/4 w-6 h-6 bg-accent-cyan/20 rounded-full animate-bounce"></div>
        <div className="absolute bottom-1/4 left-1/3 w-3 h-3 bg-accent-pink/40 rounded-full animate-ping"></div>
        <div className="absolute top-1/2 right-1/3 w-5 h-5 bg-accent-purple/25 rounded-full animate-pulse"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 container-custom px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          {/* <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-6 py-3 mb-8">
            <FiAward className="w-4 h-4 text-accent-cyan" />
            <span className="text-sm font-medium text-white">8 Years of Premium Craftsmanship</span>
          </div> */}
          <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2 mb-6 -mt-2">
  <FiAward className="w-3.5 h-3.5 text-accent-cyan" />
  <span className="text-xs font-medium text-white">
    8 Years of Premium Craftsmanship
  </span>
</div>


          {/* Main Heading */}
          <h1 className="text-4xl sm:text-5xl lg:text-7xl font-heading font-bold text-white mb-6 leading-tight">
            Anime Tees That{' '}
            <span className="text-gradient bg-gradient-to-r from-accent-purple via-accent-pink to-accent-cyan bg-clip-text text-transparent">
              Speak Your Soul
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-xl sm:text-2xl lg:text-3xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
            Limited edition prints crafted with passion. Wear your favorite anime characters with premium quality that lasts.
          </p>

          {/* CTA Buttons - IMPORTANT WRAPPER ADDED HERE */}
          <div className="hero-cta flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
            <Link
              href="/products"
              className="group bg-gradient-to-r from-accent-purple to-accent-pink hover:from-accent-pink hover:to-accent-purple text-white font-semibold text-lg px-8 py-4 rounded-2xl transition-all duration-300 transform hover:scale-105 shadow-2xl shadow-accent-purple/25 flex items-center space-x-3"
            >
              <span>Explore Collection</span>
              <FiArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
            </Link>
            <Link
              href="/products?filter=limited"
              className="group border-2 border-white/20 hover:border-accent-cyan bg-white/5 backdrop-blur-sm hover:bg-accent-cyan/10 text-white font-semibold text-lg px-8 py-4 rounded-2xl transition-all duration-300 transform hover:scale-105 flex items-center space-x-3"
            >
              <FiStar className="w-5 h-5 text-accent-cyan" />
              <span>Limited Editions</span>
            </Link>
          </div>

          {/* STATS */}
          <div className="stats-container mt-12">
            <div className="stat-card">
              <span className="stat-icon">👥</span>
              <span className="stat-number">5K+</span>
              <span className="stat-label">Customers</span>
            </div>

            <div className="stat-card">
              <span className="stat-icon">⏳</span>
              <span className="stat-number">2+</span>
              <span className="stat-label">Years</span>
            </div>

            <div className="stat-card">
              <span className="stat-icon">🎨</span>
              <span className="stat-number">15+</span>
              <span className="stat-label">Designs</span>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white/50 rounded-full mt-2"></div>
        </div>
      </div>
    </section>
  )
}