// components/Footer.js
import Link from 'next/link'
import { FiInstagram, FiFacebook, FiTwitter, FiMail, FiHeart } from 'react-icons/fi'

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
    "
  >
    <img
      src="/logo_tras.png"
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




