

// components/Header.js - UPDATED WITH TRANSPARENT DROPDOWN & HIDE ON SCROLL
'use client'
import { useState, useEffect, useRef } from 'react'
import { useCart } from '../context/CartContext'
import { FiShoppingBag, FiMenu, FiX } from 'react-icons/fi'
import Cart from './Cart'
import Link from 'next/link'
import Image from 'next/image'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isHeaderVisible, setIsHeaderVisible] = useState(true)
  const lastScrollY = useRef(0)
  const { getTotalItems, setIsOpen } = useCart()

  // Handle scroll to hide/show header
  useEffect(() => {
    const controlHeader = () => {
      const currentScrollY = window.scrollY

      if (currentScrollY < 100) {
        setIsHeaderVisible(true)
      } else if (currentScrollY > lastScrollY.current && currentScrollY > 200) {
        setIsHeaderVisible(false)
        setIsMenuOpen(false)
      } else if (currentScrollY < lastScrollY.current) {
        setIsHeaderVisible(true)
      }

      lastScrollY.current = currentScrollY
    }

    window.addEventListener('scroll', controlHeader, { passive: true })
    
    return () => {
      window.removeEventListener('scroll', controlHeader)
    }
  }, []) // ← No dependency on lastScrollY anymore

  return (
    <>
      {/* Header Container with hide/show on scroll */}
      <header 
        className={`fixed top-0 left-0 right-0 z-40 transition-transform duration-300 ${
          isHeaderVisible ? 'translate-y-0' : '-translate-y-full'
        }`}
      >
        {/* Background layer for header */}
        <div className="absolute inset-0 bg-dark-500/5 backdrop-blur-md border-b border-dark-300"></div>
        
        {/* Header Content - Three Column Layout */}
        <div className="container-custom px-4 lg:px-0 relative z-10">
          <div className="flex items-center justify-between h-16 lg:h-20">
            
            {/* LEFT SECTION: Brand Name (GenZverse) */}
            <div className="flex-1 flex items-center">
              <Link href="/" className="group">
                {/* Mobile: Smaller text, Desktop: Normal size */}
                <span
                  className="
                    font-heading font-extrabold text-lg lg:text-xl tracking-wider
                    bg-gradient-to-r from-accent-purple via-accent-cyan to-accent-pink
                    bg-clip-text text-transparent
                    drop-shadow-[0_0_6px_rgba(168,85,247,0.35)]
                    transition-all duration-300
                    group-hover:drop-shadow-[0_0_12px_rgba(56,189,248,0.55)]
                  "
                >
                  GenZverse
                </span>
              </Link>
            </div>

            {/* CENTER SECTION: Logo Position Marker (Empty, logo will be absolutely positioned) */}
            <div className="flex-1 flex justify-center">
              {/* This div is just for centering structure, actual logo is absolute positioned */}
              <div className="w-14 h-14 lg:w-24 lg:h-24"></div>
            </div>

            {/* RIGHT SECTION: Navigation + Cart */}
            <div className="flex-1 flex items-center justify-end space-x-4">
              {/* Desktop Navigation Links - Smaller text to prevent Our Story from breaking */}
              <nav className="hidden lg:flex items-center space-x-8">
                <Link href="/" className="text-gray-300 hover:text-white transition-colors duration-200 font-medium text-sm">
                  Home
                </Link>
                <Link href="/products" className="text-gray-300 hover:text-white transition-colors duration-200 font-medium text-sm">
                  Collection
                </Link>
                <Link href="/about" className="text-gray-300 hover:text-white transition-colors duration-200 font-medium text-sm whitespace-nowrap">
                  Our Story
                </Link>
                <Link href="/contact" className="text-gray-300 hover:text-white transition-colors duration-200 font-medium text-sm">
                  Contact
                </Link>
              </nav>

              {/* Cart Icon */}
              <button 
                onClick={() => setIsOpen(true)}
                className="relative p-2 text-gray-300 hover:text-white transition-colors duration-200 hover:bg-white/5 rounded-lg"
              >
                <FiShoppingBag className="w-5 h-5" />
                {getTotalItems() > 0 && (
                  <span className="absolute -top-1 -right-1 bg-accent-pink text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
                    {getTotalItems()}
                  </span>
                )}
              </button>

              {/* Mobile Menu Button */}
              <button 
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="lg:hidden p-2 text-gray-300 hover:text-white transition-colors duration-200 hover:bg-white/5 rounded-lg"
              >
                {isMenuOpen ? <FiX className="w-5 h-5" /> : <FiMenu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>

        {/* Floating Center Logo - Positioned 60% in header, 40% in hero */}


        <div className="absolute top-full left-1/2 transform -translate-x-1/2 -translate-y-[60%] z-50 pointer-events-none">
          <Link href="/" className="pointer-events-auto group">

         <div
                className="
                  w-16 h-16 lg:w-24 lg:h-24
                  overflow-hidden flex-shrink-0
                  flex items-center justify-center
                  relative  /* 👈 Added 'relative' so Image fills this box */
                "
              >
                {/* 🟢 OPTIMIZED LOGO */}
                <Image
                  src="/logo_tras.png"
                  alt="GenZverse Logo"
                  fill // Fits the container (w-16 or w-24)
                  className="object-contain"
                  priority // ⚡️ Loads immediately (Critical for LCP)
                  sizes="(max-width: 1024px) 64px, 96px" // Tells browser exactly how big it is
                />
              </div>
          </Link>
        </div>


        {/* Mobile Menu Dropdown - Transparent background */}
        {isMenuOpen && (
          <div className="lg:hidden absolute top-full left-0 right-0 bg-black/70 backdrop-blur-lg border-t border-dark-300/30 py-4 z-30">
            <nav className="container-custom px-4 flex flex-col space-y-2">
              <Link 
                href="/" 
                className="text-gray-200 hover:text-white transition-colors duration-200 py-3 px-4 rounded-lg hover:bg-white/10"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link 
                href="/products" 
                className="text-gray-200 hover:text-white transition-colors duration-200 py-3 px-4 rounded-lg hover:bg-white/10"
                onClick={() => setIsMenuOpen(false)}
              >
                Collection
              </Link>
              <Link 
                href="/about" 
                className="text-gray-200 hover:text-white transition-colors duration-200 py-3 px-4 rounded-lg hover:bg-white/10"
                onClick={() => setIsMenuOpen(false)}
              >
                Our Story
              </Link>
              <Link 
                href="/contact" 
                className="text-gray-200 hover:text-white transition-colors duration-200 py-3 px-4 rounded-lg hover:bg-white/10"
                onClick={() => setIsMenuOpen(false)}
              >
                Contact
              </Link>
            </nav>
          </div>
        )}
      </header>

      {/* Cart Component */}
      <Cart />
    </>
  )
}