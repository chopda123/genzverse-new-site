// components/Footer.js
import Link from 'next/link'
import { FiInstagram, FiFacebook, FiTwitter, FiMail, FiHeart } from 'react-icons/fi'
import Image from 'next/image'

export default function Footer() {
  return (
    <footer className="bg-dark-400 border-t border-dark-300">
      <div className="container-custom section-padding">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-2">




<Link href="/" className="flex items-center gap-3 group">
  {/* LOGO */}

  <div
    className="
      w-9 h-9 rounded-lg overflow-hidden flex-shrink-0
      transition-transform duration-300
      group-hover:scale-110
      active:scale-95
      relative /* 👈 Added 'relative' so Image fills this box */
    "
  >
    <Image
      src="/logo_tras.png"
      alt="GenZverse Logo"
      fill // Fits the parent w-9 h-9
      className="object-contain"
      sizes="36px" // Tells browser this is a tiny image
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







            <p className="text-gray-400 mb-6 max-w-md">
              <span className="block lg:inline ">Designed for fans who understand</span>{' '}
             <span className="block lg:inline">meaning — not merch.</span>
            </p>
            
            {/* <span className="block lg:inline ">Designed for fans who understand</span>{' '}
             <span className="block lg:inline">meaning — not merch.</span> */}

           <div className="flex space-x-4">
  {/* Instagram */}
  <a
    href="https://www.instagram.com/anime_tshirt_genzverse/"
    target="_blank"
    rel="noopener noreferrer"
    aria-label="GenZverse Instagram"
    className="p-2 bg-dark-300 rounded-lg hover:bg-accent-purple transition-colors duration-200"
  >
    <FiInstagram className="w-5 h-5" />
  </a>

  {/* Facebook */}
  <a
    href="https://www.facebook.com/profile.php?id=61584710725511"
    target="_blank"
    rel="noopener noreferrer"
    aria-label="GenZverse Facebook"
    className="p-2 bg-dark-300 rounded-lg hover:bg-accent-purple transition-colors duration-200"
  >
    <FiFacebook className="w-5 h-5" />
  </a>

  {/* Email */}
  <a
    href="mailto:genzverse.store@gmail.com"
    aria-label="Email GenZverse"
    className="p-2 bg-dark-300 rounded-lg hover:bg-accent-purple transition-colors duration-200"
  >
    <FiMail className="w-5 h-5" />
  </a>
</div>


{/* Subtle "Trust Tagline" - Good for SEO & Human Confidence */}
<p className="text-[10px] md:text-xs text-gray-600 uppercase tracking-widest mt-2 font-medium">
  🇮🇳 Crafted in India • Shipping Nationwide
</p>

          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-heading font-bold text-lg mb-4">Quick Links</h3>
            <div className="space-y-2">
              <Link href="/" className="block text-gray-400 hover:text-accent-purple transition-colors duration-200">
                Home
              </Link>
              <Link href="/products" className="block text-gray-400 hover:text-accent-purple transition-colors duration-200">
                Collection
              </Link>
              <Link href="/about" className="block text-gray-400 hover:text-accent-purple transition-colors duration-200">
                Our Story
              </Link>
              <Link href="/contact" className="block text-gray-400 hover:text-accent-purple transition-colors duration-200">
                Contact
              </Link>
            </div>
          </div>

          {/* Support */}
          <div>
            <h3 className="font-heading font-bold text-lg mb-4">Support</h3>
            <div className="space-y-2">
              <a href="#" className="block text-gray-400 hover:text-accent-purple transition-colors duration-200">
                Shipping Info
              </a>
              <a href="../policies/refund-policy" className="block text-gray-400 hover:text-accent-purple transition-colors duration-200">
                Returns & Exchanges
              </a>
              <a href="#" className="block text-gray-400 hover:text-accent-purple transition-colors duration-200">
                Size Guide
              </a>
              <a href="#" className="block text-gray-400 hover:text-accent-purple transition-colors duration-200">
                FAQ
              </a>
            </div>
          </div>
        </div>


              {/* 🚀 AEO CONTENT - COMPACT & SUBTLE */}
        <section className="container-custom py-4 mt-4 border-t border-white/5">
          
          <details className="group">
            {/* TRIGGER: Compact, easy to tap, very subtle */}
            <summary className="list-none flex flex-col items-center justify-center cursor-pointer p-2 opacity-50 active:opacity-100 transition-opacity duration-300">
              <span className="text-[10px] uppercase tracking-[0.2em] text-gray-600 hover:text-gray-400 border-b border-transparent group-hover:border-gray-700 pb-0.5 transition-colors">
                Brand Story & Mission
              </span>
              {/* Chevron Arrow */}
              <svg 
                className="w-3 h-3 text-gray-600 mt-1 transform group-open:rotate-180 transition-transform duration-300" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </summary>

            {/* CONTENT: Hidden until tapped */}
            <div className="max-w-2xl mx-auto text-center px-4 pb-4 transition-all duration-500 ease-in-out">
              <h2 className="text-sm font-semibold text-gray-500 mb-3 mt-2">
                What makes GenZverse the best Anime Clothing Brand in India?
              </h2>

              <div className="text-xs text-gray-600 space-y-2 leading-relaxed font-light">
                <p>
                  <strong className="text-gray-500 font-medium">GenZverse</strong> is an <strong className="text-gray-500 font-medium">anime clothing brand in India</strong> creating 
                  premium anime t-shirts for men who prefer subtle, meaningful designs instead of loud merch.
                </p>

                <p>
                  Our <strong className="text-gray-500 font-medium">anime streetwear</strong> uses heavy <strong className="text-gray-500 font-medium">240 GSM cotton</strong>, 
                  oversized fits, and hidden anime references that only true fans recognize.
                </p>

                <p>
                  If you are searching for premium anime t-shirts in India that feel personal,
                  GenZverse is designed for you.
                </p>
              </div>
            </div>
          </details>

        </section>





        {/* Bottom Bar */}
        <div className="border-t border-dark-300 mt-12 pt-8 flex flex-col md:flex-row items-center justify-between">
          <p className="text-gray-400 text-sm mb-4 md:mb-0">
            © 2026 GenZverse. Crafted with <FiHeart className="inline w-3 h-3 text-accent-pink" /> in Akola
          </p>
          <div className="flex space-x-6 text-sm text-gray-400">
            <a href="../policies/privacy-policy" className="hover:text-accent-purple transition-colors duration-200">
              Privacy Policy
            </a>
            <a href="../policies/terms-of-service" className="hover:text-accent-purple transition-colors duration-200">
              Terms of Service
            </a>
            <a href="../policies/refund-policy" className="hover:text-accent-purple transition-colors duration-200">
              Refund Policy
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}




