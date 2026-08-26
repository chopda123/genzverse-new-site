// components/OurStory.js
'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { FiArrowRight } from 'react-icons/fi'

// ─── Smooth Intersection Reveal ──────────────────────────────────────
function useReveal(threshold = 0.12) {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const node = ref.current
    if (!node) return
    const obs = new IntersectionObserver(
      ([e]) => { 
        if (e.isIntersecting) { 
          setVisible(true)
          obs.unobserve(node) 
        } 
      },
      { threshold }
    )
    obs.observe(node)
    return () => obs.disconnect()
  }, [threshold])

  return [ref, visible]
}

function Reveal({ children, delay = 0, className = '' }) {
  const [ref, visible] = useReveal(0.1)
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(24px)',
        transition: `opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1) ${delay}s, transform 0.6s cubic-bezier(0.16, 1, 0.3, 1) ${delay}s`,
      }}
    >
      {children}
    </div>
  )
}

// ═════════════════════════════════════════════════════════════════════
export default function OurStory() {
  return (
    <div className="antialiased selection:bg-purple-500/20 selection:text-purple-300">

      {/* ─────────────────────────────────────────────────────────────
          SECTION 1: CINEMATIC HERO OPENING WITH OUR STORY IMAGE
         ───────────────────────────────────────────────────────────── */}
      <section className="relative bg-[#0F172A] text-white pt-32 sm:pt-36 md:pt-44 pb-20 md:pb-28 overflow-hidden border-b border-dark-300">
        {/* Background Image: public/ourstory.webp */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/ourstory.webp"
            alt="GenZverse Our Story"
            fill
            priority
            sizes="100vw"
            className="object-cover object-center"
          />
          {/* Subtle dark overlay to ensure text readability while keeping artwork visible */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/75 via-black/55 to-[#0F172A]/90" />
        </div>

        <div className="container-custom max-w-4xl mx-auto px-6 relative z-10 text-center">
          <Reveal>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.06] border border-white/10 mb-6 backdrop-blur-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-accent-purple animate-pulse" />
              <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-300">
                Our Story
              </span>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-heading font-extrabold leading-[1.12] tracking-tight text-white max-w-3xl mx-auto drop-shadow-md">
              We Didn&apos;t Start GenZverse to Sell Anime T-Shirts.
            </h1>
          </Reveal>

          <Reveal delay={0.2}>
            <p className="text-base sm:text-lg md:text-xl text-slate-300 font-light max-w-2xl mx-auto mt-6 leading-relaxed drop-shadow-sm">
              We started it because we couldn&apos;t find one we actually wanted to wear.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          SECTION 2: THE PROBLEM (Warm Off-White #F5F2EC)
         ───────────────────────────────────────────────────────────── */}
      <section className="bg-[#F5F2EC] text-slate-900 py-16 sm:py-20 md:py-24 border-b border-[#ded7c8]">
        <div className="container-custom max-w-3xl mx-auto px-6">
          <div className="bg-white border border-[#ded7c8] rounded-3xl p-8 sm:p-12 md:p-14 shadow-sm text-center">
            
            <Reveal>
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-purple-700 block mb-4">
                The Reality
              </span>
            </Reveal>

            <Reveal delay={0.1}>
              <p className="text-lg sm:text-xl md:text-2xl font-heading font-semibold text-slate-800 leading-snug">
                Most anime clothing follows the same formula.
              </p>
            </Reveal>

            <Reveal delay={0.15}>
              <p className="text-base sm:text-lg text-slate-500 font-medium mt-3">
                Big characters. Huge logos. Loud graphics.
              </p>
            </Reveal>

            {/* Accent divider */}
            <div className="w-12 h-[2px] bg-gradient-to-r from-accent-purple to-accent-pink mx-auto my-6 rounded-full" />

            <Reveal delay={0.2}>
              <div className="bg-[#F5F2EC] border border-[#ded7c8] rounded-2xl py-4 px-6 inline-block max-w-md mx-auto">
                <p className="text-base sm:text-lg font-heading font-bold text-slate-900 leading-relaxed">
                  We love anime.<br />
                  <span className="text-purple-700">We just don&apos;t want to wear a poster.</span>
                </p>
              </div>
            </Reveal>

          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          SECTION 3: THE DIFFERENCE & VALUES (Dark Brand Surface #0F172A)
         ───────────────────────────────────────────────────────────── */}
      <section className="bg-[#0F172A] text-white py-16 sm:py-20 md:py-24 border-b border-dark-300 relative overflow-hidden">
        {/* Subtle accent glow */}
        <div className="absolute -bottom-20 right-0 w-96 h-96 bg-accent-pink/10 rounded-full blur-[100px] pointer-events-none" />

        <div className="container-custom max-w-3xl mx-auto px-6 relative z-10 text-center space-y-6 sm:space-y-8">
          
          <Reveal>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-heading font-bold text-white leading-tight">
              Anime isn&apos;t just about the character.
            </h2>
            <p className="text-base sm:text-lg text-slate-400 mt-2 font-medium">
              It&apos;s about what they stood for.
            </p>
          </Reveal>

          {/* Values — Elevated Editorial Badge Row */}
          <Reveal delay={0.15}>
            <div className="py-5 px-6 rounded-2xl bg-white/[0.04] border border-white/10 max-w-2xl mx-auto shadow-inner">
              <p className="text-sm sm:text-base md:text-lg text-slate-200 font-serif italic tracking-wide">
                The determination. The sacrifice. The freedom. The discipline.
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.2}>
            <div className="space-y-3 max-w-xl mx-auto">
              <p className="text-sm sm:text-base md:text-lg text-slate-300 leading-relaxed">
                Those stories stay with us long after the episode ends.
              </p>
              <p className="text-xs sm:text-sm md:text-base text-slate-400 italic leading-relaxed pt-1">
                So why should our clothing only show faces...<br />
                instead of the values that changed us?
              </p>
            </div>
          </Reveal>

        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          SECTION 4: WHAT WE CREATE (Warm Off-White #F5F2EC)
         ───────────────────────────────────────────────────────────── */}
      <section className="bg-[#F5F2EC] text-slate-900 py-16 sm:py-20 md:py-24 border-b border-[#ded7c8]">
        <div className="container-custom max-w-4xl mx-auto px-6">
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10">
            
            {/* Card 1: What We Create */}
            <Reveal>
              <div className="bg-white border border-[#ded7c8] rounded-3xl p-8 sm:p-10 shadow-sm h-full flex flex-col justify-between">
                <div>
                  <span className="text-[11px] font-extrabold uppercase tracking-[0.2em] text-purple-700 block mb-3">
                    Design Approach
                  </span>
                  <p className="text-base sm:text-lg md:text-xl font-heading font-bold text-slate-900 leading-snug mb-4">
                    GenZverse creates premium streetwear inspired by anime—not merchandise.
                  </p>
                  <p className="text-sm sm:text-base text-slate-600 font-medium mb-2">
                    Minimal. Meaningful. Timeless.
                  </p>
                  <p className="text-sm sm:text-base text-slate-600">
                    Designed for everyday life.
                  </p>
                </div>
                <div className="pt-6 mt-6 border-t border-[#ded7c8]">
                  <p className="text-xs sm:text-sm text-slate-500 italic">
                    Not to grab attention...<br />
                    but to create connection.
                  </p>
                </div>
              </div>
            </Reveal>

            {/* Card 2: For People Who Know */}
            <Reveal delay={0.15}>
              <div className="bg-white border border-[#ded7c8] rounded-3xl p-8 sm:p-10 shadow-sm h-full flex flex-col justify-between">
                <div>
                  <span className="text-[11px] font-extrabold uppercase tracking-[0.2em] text-purple-700 block mb-3">
                    The Connection
                  </span>
                  <p className="text-sm sm:text-base text-slate-600 leading-relaxed mb-4">
                    Maybe someone notices a symbol.<br />
                    A quote. A reference.
                  </p>
                  <p className="text-base sm:text-lg font-heading font-bold text-slate-900 leading-snug mb-2">
                    They smile.<br />
                    You smile back.
                  </p>
                  <p className="text-sm sm:text-base text-slate-600">
                    No explanation needed.
                  </p>
                </div>
                <div className="pt-6 mt-6 border-t border-[#ded7c8]">
                  <p className="text-xs sm:text-sm font-semibold text-purple-700 italic">
                    That&apos;s the feeling we design for.
                  </p>
                </div>
              </div>
            </Reveal>

          </div>

        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          SECTION 5: OUR MISSION & STATEMENT (Dark Navy #0F172A)
         ───────────────────────────────────────────────────────────── */}
      <section className="bg-[#0F172A] text-white py-16 sm:py-20 md:py-24 border-b border-dark-300 relative">
        <div className="container-custom max-w-3xl mx-auto px-6 text-center">
          
          <Reveal>
            <span className="text-[11px] font-extrabold uppercase tracking-[0.2em] text-accent-purple block mb-3">
              Our Mission
            </span>
            <p className="text-xl sm:text-2xl md:text-3xl font-heading font-bold text-white leading-tight">
              To change how anime is worn in India.
            </p>
            <p className="text-base sm:text-lg text-slate-300 mt-2 font-medium">
              Not louder. Smarter. More meaningful.
            </p>
            <p className="text-xs sm:text-sm text-slate-400 italic mt-3">
              Because...
            </p>
          </Reveal>

          {/* Core Brand Statement Block */}
          <Reveal delay={0.15}>
            <blockquote className="relative py-8 px-6 sm:px-10 rounded-2xl bg-gradient-to-b from-white/[0.07] to-white/[0.02] border border-accent-purple/30 mt-8 shadow-xl">
              <p className="text-xl sm:text-2xl md:text-3xl font-heading font-extrabold text-white leading-snug">
                We don&apos;t wear characters.
              </p>
              <p className="text-xl sm:text-2xl md:text-3xl font-heading font-extrabold leading-snug text-transparent bg-clip-text bg-gradient-to-r from-accent-purple via-purple-300 to-accent-pink mt-1">
                We wear stories.
              </p>
            </blockquote>
          </Reveal>

        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          SECTION 6: CLOSING & INVITATION (Warm Off-White #F5F2EC)
         ───────────────────────────────────────────────────────────── */}
      <section className="bg-[#F5F2EC] text-slate-900 py-16 sm:py-20 md:py-24">
        <div className="container-custom max-w-2xl mx-auto px-6 text-center">
          
          <Reveal>
            <p className="text-sm sm:text-base md:text-lg text-slate-600 italic leading-relaxed mb-6 font-serif">
              If you&apos;ve ever wanted to wear anime...<br />
              without feeling like you&apos;re wearing a costume...
            </p>
          </Reveal>

          <Reveal delay={0.1}>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-heading font-black tracking-tight mb-4 text-slate-900">
              Welcome to{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-purple to-accent-pink">
                GenZverse.
              </span>
            </h2>
          </Reveal>

          <Reveal delay={0.15}>
            <div className="space-y-1 my-6">
              <p className="text-lg sm:text-xl font-heading font-bold tracking-wide text-slate-800">
                You know.
              </p>
              <p className="text-lg sm:text-xl text-transparent bg-clip-text bg-gradient-to-r from-accent-purple to-accent-pink font-heading font-bold tracking-wide">
                If you know.
              </p>
            </div>
          </Reveal>

          {/* Editorial Collection CTA */}
          <Reveal delay={0.2}>
            <div className="mt-8">
              <Link
                href="/products"
                className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-xl bg-[#0F172A] hover:bg-dark-400 text-white text-xs sm:text-sm font-heading font-bold tracking-wider uppercase border border-accent-purple/40 hover:border-accent-purple shadow-md transition-all duration-300 hover:scale-[1.02] group"
              >
                <span>Browse the collection</span>
                <FiArrowRight className="w-4 h-4 text-accent-purple group-hover:translate-x-1 transition-transform duration-300" />
              </Link>
            </div>
          </Reveal>

        </div>
      </section>

    </div>
  )
}
