

// components/Header.js - UPDATED WITH MOBILE PADDING FIX
'use client'
import { useState } from 'react'
import { useCart } from '../context/CartContext'
import { FiShoppingBag, FiMenu, FiX } from 'react-icons/fi'
import Cart from './Cart'
import Link from 'next/link'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { getTotalItems, setIsOpen } = useCart()

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-40 bg-dark-500/95 backdrop-blur-md border-b border-dark-300">
        {/*
          Applied 'px-4 lg:px-0' to the container-custom div.
          This gives a consistent 1rem padding on mobile (px-4).
          The 'lg:px-0' (or lg:p-0) will let the container-custom class handle
          desktop padding, or you can adjust this to 'lg:px-8' if
          container-custom is just a max-width container without padding.
          I'm keeping container-custom for max-width purposes and adding px-4 for mobile padding.
        */}
        <div className="container-custom px-4 lg:px-0">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Logo - Removed the problematic pl-2 and -ml-2 */}



 <Link href="/" className="flex items-center gap-3 group">
  {/* LOGO */}
  <div
    className="
      w-9 h-9 rounded-lg overflow-hidden flex-shrink-0
      transition-transform duration-300
      group-hover:scale-110
      active:scale-95
    "
  >
    <img
      src="/yk_logo.jpg"
      alt="GenZverse Logo"
      className="w-full h-full object-contain"
    />
  </div>

  {/* BRAND NAME */}
  <span
    className="
      font-heading font-extrabold text-xl tracking-wider
      bg-gradient-to-r from-accent-purple via-accent-cyan to-accent-pink
      bg-clip-text text-transparent

      drop-shadow-[0_0_6px_rgba(168,85,247,0.35)]
      transition-all duration-300

      group-hover:drop-shadow-[0_0_12px_rgba(56,189,248,0.55)]
      group-hover:underline underline-offset-4
      decoration-accent-purple/40
    "
  >
    GenZverse
  </span>
</Link>















            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-8">
              <Link href="/" className="text-gray-300 hover:text-white transition-colors duration-200 font-medium">
                Home
              </Link>
              <Link href="/products" className="text-gray-300 hover:text-white transition-colors duration-200 font-medium">
                Collection
              </Link>
              <Link href="/about" className="text-gray-300 hover:text-white transition-colors duration-200 font-medium">
                Our Story
              </Link>
              <Link href="/contact" className="text-gray-300 hover:text-white transition-colors duration-200 font-medium">
                Contact
              </Link>
            </nav>

            {/* Cart & Mobile Menu */}
            <div className="flex items-center space-x-2 lg:space-x-4">
              {/* Cart Icon */}
              <button 
                onClick={() => setIsOpen(true)}
                // Removed the mr-2 on mobile as padding is now on the container.
                className="relative p-2 lg:p-2 text-gray-300 hover:text-white transition-colors duration-200 hover:bg-white/5 rounded-lg"
              >
                <FiShoppingBag className="w-5 h-5" />
                {getTotalItems() > 0 && (
                  <span className="absolute -top-1 -right-1 bg-accent-pink text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
                    {getTotalItems()}
                  </span>
                )}
              </button>

              {/* Mobile Menu Button - Removed the problematic -mr-2 */}
              <button 
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="lg:hidden p-2 text-gray-300 hover:text-white transition-colors duration-200 hover:bg-white/5 rounded-lg"
              >
                {isMenuOpen ? <FiX className="w-5 h-5" /> : <FiMenu className="w-5 h-5" />}
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="lg:hidden border-t border-dark-300 py-4 -mx-4"> {/* -mx-4 to counteract the px-4 padding for full-width look */}
              <nav className="flex flex-col space-y-2 px-4">
                <Link 
                  href="/" 
                  className="text-gray-300 hover:text-white transition-colors duration-200 py-3 px-4 rounded-lg hover:bg-white/5"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Home
                </Link>
                <Link 
                  href="/products" 
                  className="text-gray-300 hover:text-white transition-colors duration-200 py-3 px-4 rounded-lg hover:bg-white/5"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Collection
                </Link>
                <Link 
                  href="/about" 
                  className="text-gray-300 hover:text-white transition-colors duration-200 py-3 px-4 rounded-lg hover:bg-white/5"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Our Story
                </Link>
                <Link 
                  href="/contact" 
                  className="text-gray-300 hover:text-white transition-colors duration-200 py-3 px-4 rounded-lg hover:bg-white/5"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Contact
                </Link>
              </nav>
            </div>
          )}
        </div>
      </header>

      {/* Cart Component */}
      <Cart />
    </>
  )
}