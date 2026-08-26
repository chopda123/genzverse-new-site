// components/Footer.js
'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { FiInstagram, FiFacebook, FiMail, FiHeart } from 'react-icons/fi'
import SizeGuideModal from './SizeGuideModal'

export default function Footer() {
  const [showSizeGuide, setShowSizeGuide] = useState(false)

  return (
    <>
      <footer className="w-full bg-dark-400 border-t border-dark-300 text-white">
        <div className="container-custom px-6 sm:px-6 md:px-8 py-12 md:py-16">
          {/* Main Footer Content Grid */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-10 lg:gap-12">
            
            {/* COLUMN 1 — BRAND (Wider column) */}
            <div className="md:col-span-6 lg:col-span-6 space-y-4">
              {/* Brand Logo & Name */}
              <Link href="/" className="inline-flex items-center gap-3 group">
                <div className="w-9 h-9 rounded-lg overflow-hidden flex-shrink-0 transition-transform duration-300 group-hover:scale-105 active:scale-95 relative">
                  <Image
                    src="/logo_tras.png"
                    alt="GenZverse Logo"
                    fill
                    className="object-contain"
                    sizes="36px"
                  />
                </div>
                <span className="font-heading font-extrabold text-xl tracking-wider bg-gradient-to-r from-accent-purple via-accent-cyan to-accent-pink bg-clip-text text-transparent drop-shadow-[0_0_6px_rgba(168,85,247,0.35)] transition-all duration-300 group-hover:drop-shadow-[0_0_12px_rgba(56,189,248,0.55)]">
                  GenZverse
                </span>
              </Link>

              {/* Tagline */}
              <p className="text-slate-400 text-sm leading-relaxed max-w-sm">
                Designed for fans who understand meaning — not merch.
              </p>

              {/* Social Icons */}
              <div className="flex items-center space-x-3 pt-1">
                <a
                  href="https://www.instagram.com/anime_tshirt_genzverse/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GenZverse Instagram"
                  className="w-9 h-9 bg-dark-300/70 hover:bg-dark-300 border border-white/5 hover:border-white/15 rounded-xl flex items-center justify-center text-slate-300 hover:text-white transition-all duration-200"
                >
                  <FiInstagram className="w-4 h-4" />
                </a>

                <a
                  href="https://www.facebook.com/profile.php?id=61584710725511"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GenZverse Facebook"
                  className="w-9 h-9 bg-dark-300/70 hover:bg-dark-300 border border-white/5 hover:border-white/15 rounded-xl flex items-center justify-center text-slate-300 hover:text-white transition-all duration-200"
                >
                  <FiFacebook className="w-4 h-4" />
                </a>

                <a
                  href="mailto:genzverse.store@gmail.com"
                  aria-label="Email GenZverse"
                  className="w-9 h-9 bg-dark-300/70 hover:bg-dark-300 border border-white/5 hover:border-white/15 rounded-xl flex items-center justify-center text-slate-300 hover:text-white transition-all duration-200"
                >
                  <FiMail className="w-4 h-4" />
                </a>
              </div>

              {/* Trust Microtext */}
              <p className="text-[10px] md:text-xs text-slate-500 uppercase tracking-widest font-medium pt-1">
                🇮🇳 Crafted in India • Shipping Nationwide
              </p>
            </div>

            {/* COLUMN 2 — QUICK LINKS */}
            <div className="md:col-span-3 lg:col-span-3">
              <h3 className="font-heading font-bold text-xs uppercase tracking-widest text-slate-200 mb-4">
                Quick Links
              </h3>
              <ul className="space-y-2.5">
                <li>
                  <Link href="/" className="block text-sm text-slate-400 hover:text-white transition-colors duration-200 py-0.5">
                    Home
                  </Link>
                </li>
                <li>
                  <Link href="/products" className="block text-sm text-slate-400 hover:text-white transition-colors duration-200 py-0.5">
                    Collection
                  </Link>
                </li>
                <li>
                  <Link href="/about" className="block text-sm text-slate-400 hover:text-white transition-colors duration-200 py-0.5">
                    Our Story
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="block text-sm text-slate-400 hover:text-white transition-colors duration-200 py-0.5">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>

            {/* COLUMN 3 — SUPPORT */}
            <div className="md:col-span-3 lg:col-span-3">
              <h3 className="font-heading font-bold text-xs uppercase tracking-widest text-slate-200 mb-4">
                Support
              </h3>
              <ul className="space-y-2.5">
                <li>
                  <Link href="/contact" className="block text-sm text-slate-400 hover:text-white transition-colors duration-200 py-0.5">
                    Shipping Info
                  </Link>
                </li>
                <li>
                  <Link href="/policies/refund-policy" className="block text-sm text-slate-400 hover:text-white transition-colors duration-200 py-0.5">
                    Returns & Exchanges
                  </Link>
                </li>
                <li>
                  <button 
                    onClick={() => setShowSizeGuide(true)}
                    className="block text-sm text-slate-400 hover:text-white transition-colors duration-200 py-0.5 text-left cursor-pointer w-full"
                  >
                    Size Guide
                  </button>
                </li>
                <li>
                  <Link href="/contact" className="block text-sm text-slate-400 hover:text-white transition-colors duration-200 py-0.5">
                    FAQ
                  </Link>
                </li>
              </ul>
            </div>

          </div>

          {/* Understated Divider */}
          <div className="border-t border-white/[0.08] mt-10 md:mt-12 pt-8 pb-20 md:pb-0 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
            <p className="text-xs text-slate-500">
              © 2026 GenZverse. Crafted with <FiHeart className="inline w-3 h-3 text-accent-pink" /> in Akola
            </p>
            <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs text-slate-500">
              <Link href="/policies/privacy-policy" className="hover:text-slate-300 transition-colors duration-200">
                Privacy Policy
              </Link>
              <Link href="/policies/terms-of-service" className="hover:text-slate-300 transition-colors duration-200">
                Terms of Service
              </Link>
              <Link href="/policies/refund-policy" className="hover:text-slate-300 transition-colors duration-200">
                Refund Policy
              </Link>
            </div>
          </div>
        </div>
      </footer>

      {/* Reusable Size Guide Modal */}
      <SizeGuideModal isOpen={showSizeGuide} onClose={() => setShowSizeGuide(false)} />
    </>
  )
}




