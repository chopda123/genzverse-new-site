// components/OurStory.js
'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'

// ─── Quick fade-up reveal ───────────────────────────────────────────
function useReveal(threshold = 0.15) {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const node = ref.current
    if (!node) return
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.unobserve(node) } },
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
        transform: visible ? 'translateY(0)' : 'translateY(18px)',
        transition: `opacity 0.45s ease ${delay}s, transform 0.45s ease ${delay}s`,
      }}
    >
      {children}
    </div>
  )
}

// ═════════════════════════════════════════════════════════════════════
export default function OurStory() {
  return (
    <div className="bg-dark-500 text-white">

      {/* Narrow centered column */}
      <div className="max-w-xl mx-auto px-6 pt-24 md:pt-32 pb-12 md:pb-20">

        {/* ── HERO ─────────────────────────────────────────── */}
        <Reveal>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-heading font-black leading-[1.15] tracking-tight text-center">
            We Didn&apos;t Start GenZverse to Sell Anime T-Shirts.
          </h1>
        </Reveal>

        <Reveal delay={0.1}>
          <p className="text-sm sm:text-base md:text-lg text-gray-400 text-center mt-4 leading-relaxed">
            We started it because we couldn&apos;t find one we actually wanted to wear.
          </p>
        </Reveal>

        {/* thin divider */}
        <div className="h-px bg-gradient-to-r from-transparent via-accent-purple/20 to-transparent my-10 md:my-14" />

        {/* ── THE PROBLEM ──────────────────────────────────── */}
        <Reveal>
          <div className="text-center space-y-3">
            <p className="text-sm md:text-base text-gray-400 leading-relaxed">
              Most anime clothing follows the same formula.
            </p>
            <p className="text-sm md:text-base text-gray-500">
              Big characters. Huge logos. Loud graphics.
            </p>
            <p className="text-sm md:text-base text-gray-300 font-medium mt-2">
              We love anime.<br />
              We just don&apos;t want to wear a poster.
            </p>
          </div>
        </Reveal>

        {/* thin divider */}
        <div className="h-px bg-gradient-to-r from-transparent via-accent-purple/20 to-transparent my-7 md:my-10" />

        {/* ── THE DIFFERENCE ───────────────────────────────── */}
        <Reveal>
          <div className="text-center space-y-3">
            <p className="text-sm md:text-base text-gray-300 font-medium leading-relaxed">
              Anime isn&apos;t just about the character.
            </p>
            <p className="text-sm md:text-base text-gray-400">
              It&apos;s about what they stood for.
            </p>

            {/* Values — compact inline group */}
            <p className="text-sm md:text-base text-gray-400 italic">
              The determination. The sacrifice. The freedom. The discipline.
            </p>

            <p className="text-sm md:text-base text-gray-400 leading-relaxed">
              Those stories stay with us long after the episode ends.
            </p>
            <p className="text-xs md:text-sm text-gray-500 italic leading-relaxed">
              So why should our clothing only show faces...<br />
              instead of the values that changed us?
            </p>
          </div>
        </Reveal>

        {/* thin divider */}
        <div className="h-px bg-gradient-to-r from-transparent via-accent-purple/20 to-transparent my-7 md:my-10" />

        {/* ── WHAT WE CREATE ───────────────────────────────── */}
        <Reveal>
          <div className="text-center space-y-3">
            <p className="text-sm md:text-base text-gray-300 font-medium leading-relaxed">
              GenZverse creates premium streetwear inspired by anime—not merchandise.
            </p>
            <p className="text-sm md:text-base text-gray-400">
              Minimal. Meaningful. Timeless.
            </p>
            <p className="text-sm md:text-base text-gray-400">
              Designed for everyday life.
            </p>
            <p className="text-xs md:text-sm text-gray-500 italic">
              Not to grab attention...<br />
              but to create connection.
            </p>
          </div>
        </Reveal>

        {/* thin divider */}
        <div className="h-px bg-gradient-to-r from-transparent via-accent-purple/20 to-transparent my-7 md:my-10" />

        {/* ── FOR PEOPLE WHO KNOW ──────────────────────────── */}
        <Reveal>
          <div className="text-center space-y-3">
            <p className="text-sm md:text-base text-gray-400">
              Maybe someone notices a symbol.<br />
              A quote. A reference.
            </p>
            <p className="text-sm md:text-base text-gray-300 font-medium">
              They smile.<br />
              You smile back.
            </p>
            <p className="text-sm md:text-base text-gray-400">
              No explanation needed.
            </p>
            <p className="text-sm md:text-base text-gray-300 font-medium italic">
              That&apos;s the feeling we design for.
            </p>
          </div>
        </Reveal>

        {/* thin divider */}
        <div className="h-px bg-gradient-to-r from-transparent via-accent-purple/20 to-transparent my-7 md:my-10" />

        {/* ── OUR MISSION ──────────────────────────────────── */}
        <Reveal>
          <div className="text-center space-y-3">
            <p className="text-sm md:text-base text-gray-300 font-medium leading-relaxed">
              To change how anime is worn in India.
            </p>
            <p className="text-sm md:text-base text-gray-400">
              Not louder. Smarter. More meaningful.
            </p>
            <p className="text-xs md:text-sm text-gray-500 italic">
              Because...
            </p>

            {/* Core philosophy line — slightly larger than surrounding body */}
            <blockquote className="relative py-5 px-4 rounded-xl bg-accent-purple/[0.06] border border-accent-purple/15 mt-4 hover:border-accent-purple/30 transition-colors duration-400">
              <p className="text-base md:text-lg font-heading font-bold text-white leading-snug">
                We don&apos;t wear characters.
              </p>
              <p className="text-base md:text-lg font-heading font-bold leading-snug text-transparent bg-clip-text bg-gradient-to-r from-accent-purple to-accent-pink">
                We wear stories.
              </p>
            </blockquote>
          </div>
        </Reveal>

        {/* spacer — a beat of extra space before closing, but not excessive */}
        <div className="my-8 md:my-12" />

        {/* ── CLOSING ──────────────────────────────────────── */}
        <Reveal>
          <div className="text-center">
            <p className="text-sm md:text-base text-gray-500 italic leading-relaxed mb-6">
              If you&apos;ve ever wanted to wear anime...<br />
              without feeling like you&apos;re wearing a costume...
            </p>

            <h2 className="text-xl sm:text-2xl md:text-3xl font-heading font-black tracking-tight mb-4">
              Welcome to{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-purple to-accent-pink">
                GenZverse.
              </span>
            </h2>

            <div className="space-y-1 mt-6">
              <p className="text-base md:text-lg text-gray-300 font-heading font-bold tracking-wide">
                You know.
              </p>
              <p className="text-base md:text-lg text-transparent bg-clip-text bg-gradient-to-r from-accent-purple to-accent-pink font-heading font-bold tracking-wide">
                If you know.
              </p>
            </div>

            {/* Subtle secondary link */}
            <div className="mt-10">
              <Link
                href="/products"
                className="inline-flex items-center gap-1.5 text-xs text-gray-600 hover:text-accent-purple transition-colors duration-300 group"
              >
                <span>Browse the collection</span>
                <svg className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>
          </div>
        </Reveal>

      </div>
    </div>
  )
}
