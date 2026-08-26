// app/contact/page.js
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import Image from 'next/image'
import { FiMail, FiPhone, FiMapPin, FiCheckCircle } from 'react-icons/fi'
import ContactForm from './ContactForm'

export const metadata = {
  title: 'Contact Us',
  description: 'Get in touch with GenZverse. Questions about anime t-shirts, sizing, orders, or collaborations? We respond within 24 hours.',
  alternates: {
    canonical: 'https://www.genzverse.shop/contact',
  },
  openGraph: {
    title: 'Contact Us | GenZverse',
    description: 'Have questions about our limited edition anime collections? We\'d love to hear from you!',
    type: 'website',
  },
}

export default function Contact() {
  return (
    <>
      <Header />
      <main className="bg-[#0F172A] text-white min-h-screen">
        {/* Hero Section with public/contact1.webp Background */}
        <section className="relative pt-32 pb-14 sm:pt-36 sm:pb-16 md:pt-40 md:pb-20 overflow-hidden border-b border-dark-300 bg-[#0F172A]">
          {/* Background Image: public/contact1.webp */}
          <div className="absolute inset-0 z-0">
            <Image
              src="/contact1.webp"
              alt="GenZverse Contact"
              fill
              priority
              sizes="100vw"
              className="object-cover object-center"
            />
            {/* Subtle dark overlay to ensure text readability while keeping artwork visible */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/75 via-black/55 to-[#0F172A]/90" />
          </div>
          
          <div className="container-custom max-w-4xl mx-auto text-center px-4 relative z-10">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.06] border border-white/10 mb-5 backdrop-blur-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-accent-purple animate-pulse" />
              <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-300">
                Get In Touch
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-heading font-extrabold mb-4 md:mb-6 tracking-tight text-white leading-tight drop-shadow-md">
              Let&apos;s Start a <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-purple via-purple-300 to-accent-pink">Conversation</span>
            </h1>
            
            <p className="text-base sm:text-lg md:text-xl text-slate-300 max-w-2xl mx-auto mb-3 font-light leading-relaxed drop-shadow-sm">
              Questions, ideas, collaborations, or just want to talk about anime? We&apos;d love to hear from you.
            </p>
            
            <p className="text-xs sm:text-sm text-slate-400 font-medium drop-shadow-sm">
              Every message is read by a real person, and we usually reply within 24 hours.
            </p>
          </div>
        </section>

        {/* Content Section on Warm Off-White (#F5F2EC) Background */}
        <section className="bg-[#F5F2EC] py-12 sm:py-16 md:py-20 px-4">
          <div className="container-custom max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
              
              {/* PRIMARY LEFT COLUMN: Message Form (Dark Card floating on Cream Background) */}
              <div className="lg:col-span-7 w-full order-1">
                <ContactForm />
              </div>

              {/* SECONDARY RIGHT COLUMN: Contact Methods & Trust Information (Dark Cards floating on Cream Background) */}
              <div className="lg:col-span-5 w-full order-2 space-y-6">
                
                {/* Contact Header Card */}
                <div className="bg-[#141F36] border border-[#22314E] text-white rounded-3xl p-6 sm:p-8 shadow-2xl">
                  <h2 className="text-2xl sm:text-3xl font-heading font-bold text-white mb-6">
                    Let&apos;s Create <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-purple to-accent-pink">Magic</span>
                  </h2>

                  <div className="space-y-4 sm:space-y-5">
                    {/* Email Card */}
                    <div className="flex items-start gap-4 p-4 rounded-2xl bg-[#0F172A]/70 border border-[#22314E] hover:border-accent-purple/40 transition-colors duration-200">
                      <div className="w-11 h-11 bg-gradient-to-br from-accent-purple to-accent-pink rounded-xl flex items-center justify-center flex-shrink-0 shadow-md shadow-purple-500/20">
                        <FiMail className="w-5 h-5 text-white" />
                      </div>
                      <div className="min-w-0">
                        <h3 className="font-heading font-bold text-white text-sm sm:text-base mb-0.5">Email Us</h3>
                        <p className="text-purple-300 font-medium text-xs sm:text-sm truncate">genzverse.store@gmail.com</p>
                        <p className="text-slate-400 text-xs mt-1 leading-relaxed">For orders, collaborations, custom requests, or anything else.</p>
                        <p className="text-slate-400 text-xs mt-0.5 font-medium text-accent-cyan/90">Response within 24 hours.</p>
                      </div>
                    </div>

                    {/* Phone / WhatsApp Card */}
                    <div className="flex items-start gap-4 p-4 rounded-2xl bg-[#0F172A]/70 border border-[#22314E] hover:border-accent-purple/40 transition-colors duration-200">
                      <div className="w-11 h-11 bg-gradient-to-br from-accent-cyan to-accent-purple rounded-xl flex items-center justify-center flex-shrink-0 shadow-md shadow-cyan-500/20">
                        <FiPhone className="w-5 h-5 text-white" />
                      </div>
                      <div className="min-w-0">
                        <h3 className="font-heading font-bold text-white text-sm sm:text-base mb-0.5">Call / WhatsApp</h3>
                        <p className="text-slate-200 font-semibold text-xs sm:text-sm">+91 86689 08299</p>
                        <p className="text-slate-400 text-xs mt-1">Monday – Saturday</p>
                        <p className="text-slate-400 text-xs">10:00 AM – 7:00 PM (IST)</p>
                      </div>
                    </div>

                    {/* Location Card */}
                    <div className="flex items-start gap-4 p-4 rounded-2xl bg-[#0F172A]/70 border border-[#22314E] hover:border-accent-purple/40 transition-colors duration-200">
                      <div className="w-11 h-11 bg-gradient-to-br from-accent-pink to-accent-purple rounded-xl flex items-center justify-center flex-shrink-0 shadow-md shadow-pink-500/20">
                        <FiMapPin className="w-5 h-5 text-white" />
                      </div>
                      <div className="min-w-0">
                        <h3 className="font-heading font-bold text-white text-sm sm:text-base mb-0.5">Based In</h3>
                        <p className="text-slate-200 font-semibold text-xs sm:text-sm">Akola, Maharashtra, India</p>
                        <p className="text-slate-400 text-xs mt-1">Designed in India.</p>
                        <p className="text-slate-400 text-xs">Shipping Nationwide.</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Trust Indicators: Why GenZverse */}
                <div className="bg-[#141F36] border border-[#22314E] text-white rounded-3xl p-6 sm:p-7 shadow-2xl">
                  <h4 className="font-heading font-bold text-white text-base sm:text-lg mb-4 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-accent-purple" />
                    Why GenZverse?
                  </h4>
                  <ul className="space-y-3 text-xs sm:text-sm text-slate-300">
                    <li className="flex items-center space-x-2.5">
                      <FiCheckCircle className="w-4 h-4 text-accent-cyan flex-shrink-0" />
                      <span>Premium Heavyweight Streetwear</span>
                    </li>
                    <li className="flex items-center space-x-2.5">
                      <FiCheckCircle className="w-4 h-4 text-accent-cyan flex-shrink-0" />
                      <span>Limited Edition Drops</span>
                    </li>
                    <li className="flex items-center space-x-2.5">
                      <FiCheckCircle className="w-4 h-4 text-accent-cyan flex-shrink-0" />
                      <span>Designed for Real Anime Fans</span>
                    </li>
                    <li className="flex items-center space-x-2.5">
                      <FiCheckCircle className="w-4 h-4 text-accent-cyan flex-shrink-0" />
                      <span>Made to Wear Every Day, Not Just Events</span>
                    </li>
                  </ul>
                </div>

              </div>

            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}