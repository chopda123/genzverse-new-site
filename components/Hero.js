
// components/Hero.js
'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { FiArrowRight, FiAward } from 'react-icons/fi'
import Image from 'next/image'

// Image arrays paired per slide to eliminate mobile/desktop hydration flash
const heroSlides = [
  {
    desktop: "/products/POSTER/AOT-001.png",
    mobile: "/products/POSTER/AOT-POSTER.png",
    desktopImgClass: "hero-bg-img hero-bg-img--wide",
  },
  {
    desktop: "/products/POSTER/ace-005.png",
    mobile: "/products/POSTER/ACE-POSTER.png",
    desktopImgClass: "hero-bg-img hero-bg-img--wide",
  },
  {
    desktop: "/products/POSTER/106-002.png",
    mobile: "/products/POSTER/106-POSTER.png",
    desktopImgClass: "hero-bg-img hero-bg-img--wide",
  },
  {
    desktop: "/products/POSTER/blue-003.png",
    mobile: "/products/POSTER/BLUEBIRD-POSTER.png",
    desktopImgClass: "hero-bg-img hero-bg-img--wide",
  },
]

export default function Hero() {
  const [currentBackground, setCurrentBackground] = useState(0)

  // Auto-rotate background
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBackground((prev) => (prev + 1) % heroSlides.length)
    }, 2000)
    return () => clearInterval(interval)
  }, [])

  return (
    <>
      <style jsx global>{`
        /* ── Mobile Base Styles (< 1024px) ── */
        /* ── Hero section: mobile shrinks to image height, no black gap below ── */
        .hero-section {
          height: auto;
          aspect-ratio: 9 / 16;
        }

        .hero-badge {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: rgba(255, 255, 255, 0.07);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          border: 1px solid rgba(180, 150, 220, 0.22);
          border-radius: 100px;
          padding: 6px 16px;
          width: fit-content;
          max-width: 92vw;
        }

        .hero-badge-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: linear-gradient(135deg, #c4a0f0, #9d72d6);
          flex-shrink: 0;
        }

        .hero-badge-text {
          font-family: var(--font-inter), 'Inter', sans-serif;
          font-size: clamp(10px, 2.5vw, 12px);
          font-weight: 500;
          letter-spacing: 0.04em;
          color: rgba(220, 205, 240, 0.90);
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .hero-supporting {
          font-family: var(--font-inter), 'Inter', sans-serif;
          font-size: clamp(13px, 3.5vw, 16px);
          font-weight: 400;
          line-height: 1.55;
          color: rgba(220, 215, 230, 0.78);
          letter-spacing: 0.01em;
          text-align: center;
          max-width: 320px;
        }

        .hero-headline {
          font-family: var(--font-bebas), 'Bebas Neue', 'Arial Black', sans-serif;
          font-size: clamp(42px, 12.5vw, 58px);
          font-weight: 400;
          line-height: 0.95;
          letter-spacing: 0.03em;
          text-transform: uppercase;
          text-align: center;
          color: #f5f0ea;
          text-shadow: 0 2px 24px rgba(0,0,0,0.55);
        }

        .hero-headline .felt-accent {
          color: transparent;
          -webkit-text-fill-color: transparent;
          background: linear-gradient(110deg, #c4a0f0 0%, #a87ee0 50%, #c8a5e8 100%);
          -webkit-background-clip: text;
          background-clip: text;
        }

        .hero-quality {
          font-family: var(--font-inter), 'Inter', sans-serif;
          font-size: clamp(10px, 2.8vw, 12px);
          font-weight: 400;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: rgba(190, 180, 210, 0.55);
          text-align: center;
        }

        /* Premium CTA Button — Mobile Default */
        .hero-cta-btn {
          position: relative;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 7px;
          padding: 9px 22px;
          border-radius: 6px;
          background: linear-gradient(135deg, #7c4daa 0%, #9b6fd0 45%, #7a4da8 100%);
          border: 1px solid rgba(200, 165, 235, 0.30);
          box-shadow:
            0 0 18px rgba(140, 90, 200, 0.28),
            inset 0 1px 0 rgba(255,255,255,0.10);
          cursor: pointer;
          transition: box-shadow 0.25s ease, transform 0.18s ease;
          text-decoration: none;
          overflow: hidden;
        }

        .hero-cta-btn::before {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(180deg, rgba(255,255,255,0.09) 0%, transparent 55%);
          border-radius: inherit;
          pointer-events: none;
        }

        .hero-cta-btn:hover {
          box-shadow:
            0 0 28px rgba(150, 100, 210, 0.40),
            inset 0 1px 0 rgba(255,255,255,0.12);
          transform: translateY(-1px);
        }

        .hero-cta-btn:active {
          transform: translateY(0px) scale(0.97);
        }

        .hero-cta-text {
          font-family: 'Inter', sans-serif;
          font-size: clamp(9px, 2.45vw, 10.5px);
          font-weight: 600;
          letter-spacing: 0.06em;
          color: #f0ebf8;
          text-transform: uppercase;
        }

        .hero-cta-arrow {
          color: rgba(220, 200, 245, 0.80);
          flex-shrink: 0;
          transition: transform 0.2s ease;
        }

        .hero-cta-btn:hover .hero-cta-arrow {
          transform: translateX(3px);
        }

        /* Scroll indicator */
        .hero-scroll-ring {
          width: 22px;
          height: 34px;
          border: 1.5px solid rgba(200, 185, 225, 0.35);
          border-radius: 12px;
          display: flex;
          justify-content: center;
          padding-top: 6px;
        }

        .hero-scroll-dot {
          width: 3px;
          height: 7px;
          background: rgba(200, 180, 230, 0.55);
          border-radius: 2px;
          animation: hero-scroll-pulse 1.8s ease-in-out infinite;
        }

        @keyframes hero-scroll-pulse {
          0%, 100% { opacity: 0.4; transform: translateY(0); }
          50% { opacity: 1; transform: translateY(4px); }
        }

        /* ── Background image: mobile default (contain, centered — full poster visible, no cropping) ── */
        .hero-bg-img {
          object-fit: contain;
          object-position: center center;
        }

        /* Dark fill for letterbox areas when poster does not fill viewport */
        .hero-slide-wrapper {
          background-color: #050508;
        }

        /* Cinematic bottom gradient — neutral black only, preserves image tone */
        .hero-overlay-bottom {
          background: linear-gradient(
            to top,
            rgba(0, 0, 0, 0.88) 0%,
            rgba(0, 0, 0, 0.60) 28%,
            rgba(0, 0, 0, 0.20) 50%,
            transparent 68%
          );
        }

        /* Thin top scrim so navbar text stays readable */
        .hero-overlay-top {
          background: linear-gradient(
            to bottom,
            rgba(0, 0, 0, 0.38) 0%,
            transparent 28%
          );
        }

        /* Desktop left-side scrim */
        .hero-overlay-left {
          display: none;
        }

        /* ============================================================
           TABLET BREAKPOINT — 768px to 1023px
        ============================================================ */
        @media (min-width: 768px) and (max-width: 1023px) {
          .hero-headline {
            font-size: clamp(52px, 7vw, 68px) !important;
            line-height: 0.95 !important;
          }
          .hero-supporting {
            font-size: 16px !important;
            max-width: 440px !important;
          }
          .hero-quality {
            font-size: 13px !important;
          }
          .hero-cta-btn {
            padding: 10px 22px !important;
          }
          .hero-cta-text {
            font-size: 10px !important;
          }
        }

        /* ============================================================
           DESKTOP OVERRIDES — min-width: 1024px
           Isolated to desktop only. Zero impact on mobile/tablet.
        ============================================================ */
        @media (min-width: 1024px) {

          /* Restore full-viewport height on desktop — overrides mobile aspect-ratio rule */
          .hero-section {
            height: 100vh !important;
            aspect-ratio: unset !important;
          }

          .hero-bg-img {
            object-fit: contain !important;
            object-position: right center !important;
            transform: scale(0.88) !important;
            transform-origin: right center !important;
          }

          /* ACE poster is 2.39:1 — ultra-wide; fill viewport fully, centred */
          .hero-bg-img--wide {
            object-fit: cover !important;
            object-position: center center !important;
            transform: none !important;
            transform-origin: unset !important;
          }

          .hero-slide-wrapper {
            background-color: #050508;
          }

          .hero-overlay-left {
            display: none !important;
          }

          .hero-overlay-bottom {
            background: none !important;
          }

          .hero-overlay-top {
            background: none !important;
          }

          /* FULL-HEIGHT LAYOUT — badge at top-left, CTA at lower-left */
          .hero-content-desktop {
            position: absolute !important;
            top: 0 !important;
            bottom: 0 !important;
            left: 6vw !important;
            transform: none !important;
            height: auto !important;
            min-height: 0 !important;
            max-height: none !important;
            width: 48vw !important;
            max-width: 720px !important;
            padding-top: 88px !important;
            padding-bottom: 52px !important;
            padding-left: 0 !important;
            padding-right: 0 !important;
            margin: 0 !important;
            display: flex !important;
            flex-direction: column !important;
            align-items: flex-start !important;
            justify-content: flex-start !important;
            gap: 0 !important;
            z-index: 40 !important;
          }

          .hero-content-desktop > div {
            width: 100% !important;
            display: flex !important;
            justify-content: flex-start !important;
            align-items: flex-start !important;
            margin-top: 0 !important;
            margin-bottom: 0 !important;
            margin-left: 0 !important;
            margin-right: 0 !important;
            padding: 0 !important;
            flex-shrink: 0 !important;
            flex-grow: 0 !important;
            height: auto !important;
          }

          /* 1. BADGE WRAPPER — 28px gap below */
          .hero-content-desktop .hero-badge-wrapper {
            margin-bottom: 28px !important;
          }

          .hero-content-desktop .hero-badge {
            padding: 8px 18px !important;
            background: rgba(20, 16, 32, 0.65) !important;
            border: 1px solid rgba(168, 85, 247, 0.40) !important;
            margin-bottom: 0 !important;
          }

          .hero-content-desktop .hero-badge-text {
            font-size: 13px !important;
            font-weight: 500 !important;
            color: rgba(230, 220, 250, 0.95) !important;
          }

          /* 2. SUPPORTING TEXT WRAPPER — 46px gap below, exactly 2 lines */
          .hero-content-desktop .hero-supporting-wrapper {
            margin-bottom: 46px !important;
          }

          .hero-content-desktop .hero-supporting {
            text-align: left !important;
            font-size: 20px !important;
            line-height: 1.45 !important;
            color: rgba(225, 220, 235, 0.85) !important;
            max-width: 480px !important;
            padding: 0 !important;
            margin-bottom: 0 !important;
          }

          /* 3. MAIN HEADLINE WRAPPER — 32px gap below, exactly 2 lines */
          .hero-content-desktop .hero-headline-wrapper {
            margin-bottom: 32px !important;
          }

          .hero-content-desktop .hero-headline {
            font-family: var(--font-archivo), 'Archivo Black', 'Inter', -apple-system, BlinkMacSystemFont, sans-serif !important;
            text-align: left !important;
            font-size: clamp(56px, 4vw, 68px) !important;
            font-weight: 900 !important;
            line-height: 1.0 !important;
            letter-spacing: 0 !important;
            word-spacing: normal !important;
            max-width: 720px !important;
            margin-bottom: 0 !important;
          }

          .hero-content-desktop .hero-headline span.block {
            white-space: nowrap !important;
            display: block !important;
          }

          /* 4. SUBTITLE WRAPPER — 32px gap below to CTA, 1 line */
          .hero-content-desktop .hero-quality-wrapper {
            margin-bottom: 32px !important;
          }

          .hero-content-desktop .hero-quality {
            text-align: left !important;
            font-size: 15px !important;
            letter-spacing: 0.04em !important;
            color: rgba(200, 195, 215, 0.70) !important;
            text-transform: none !important;
            white-space: nowrap !important;
            margin-bottom: 0 !important;
          }

          /* 5. CTA WRAPPER & BUTTON — 320px width, 58px height, pinned to lower-left */
          .hero-content-desktop .hero-cta-wrapper {
            margin-top: auto !important;
            margin-bottom: 0 !important;
            margin-left: 0 !important;
            margin-right: 0 !important;
            display: flex !important;
            justify-content: flex-start !important;
            width: 100% !important;
          }

          .hero-content-desktop .hero-cta-btn {
            display: inline-flex !important;
            visibility: visible !important;
            opacity: 1 !important;
            width: 224px !important;
            height: 41px !important;
            padding: 0 20px !important;
            justify-content: center !important;
            align-items: center !important;
            border-radius: 6px !important;
            background: linear-gradient(135deg, #7c3aed 0%, #a855f7 50%, #c026d3 100%) !important;
            border: none !important;
            transform: skewX(-2deg) !important;
            box-shadow:
              0 0 24px rgba(168, 85, 247, 0.35),
              0 4px 16px rgba(120, 60, 200, 0.25) !important;
            cursor: pointer !important;
            text-decoration: none !important;
            z-index: 50 !important;
          }

          .hero-content-desktop .hero-cta-btn:hover {
            box-shadow:
              0 0 36px rgba(168, 85, 247, 0.50),
              0 6px 24px rgba(120, 60, 200, 0.35) !important;
            transform: skewX(-2deg) translateY(-1px) !important;
          }

          .hero-content-desktop .hero-cta-text {
            font-size: 11px !important;
            font-weight: 700 !important;
            letter-spacing: 0.06em !important;
            text-transform: uppercase !important;
            transform: skewX(2deg) !important;
          }

          .hero-content-desktop .hero-cta-arrow {
            transform: skewX(2deg) !important;
          }

          .hero-content-desktop .hero-cta-btn:hover .hero-cta-arrow {
            transform: skewX(2deg) translateX(3px) !important;
          }

          /* 6. SCROLL INDICATOR — centered under the CTA button with 28px gap */
          .hero-scroll-desktop {
            position: relative !important;
            top: auto !important;
            bottom: auto !important;
            left: auto !important;
            right: auto !important;
            transform: none !important;
            display: flex !important;
            justify-content: center !important;
            align-items: center !important;
            width: 224px !important;
            margin-top: 28px !important;
            margin-bottom: 0 !important;
            margin-left: 0 !important;
            margin-right: 0 !important;
            padding: 0 !important;
            z-index: 30 !important;
          }
        }
      `}</style>

      <section className="hero-section relative h-screen w-full overflow-hidden">

        {/* 1. BACKGROUND SLIDESHOW — Responsive image layers eliminate mobile hydration flash */}
        <div className="absolute inset-0 z-0">
          {heroSlides.map((slide, index) => (
            <div
              key={index}
              className={`hero-slide-wrapper absolute inset-0 transition-opacity duration-1000 ease-in-out ${index === currentBackground ? 'opacity-100' : 'opacity-0'
                }`}
            >
              {/* Mobile Image Layer (Mobile & Tablet < 1024px) */}
              <div className="relative w-full h-full lg:hidden">
                <Image
                  src={slide.mobile}
                  alt=""
                  fill
                  priority={index === 0}
                  sizes="100vw"
                  className="hero-bg-img"
                />
              </div>

              {/* Desktop Image Layer (Desktop >= 1024px) */}
              <div className="relative w-full h-full hidden lg:block">
                <Image
                  src={slide.desktop}
                  alt=""
                  fill
                  priority={index === 0}
                  sizes="100vw"
                  className={slide.desktopImgClass ?? "hero-bg-img"}
                />
              </div>

              {/* Overlay: top scrim for navbar readability */}
              <div className="absolute inset-0 hero-overlay-top" />
              {/* Bottom gradient for mobile text legibility */}
              <div className="absolute inset-0 hero-overlay-bottom" />
              {/* Desktop only: left-side scrim for content panel legibility */}
              <div className="absolute inset-0 hero-overlay-left" />
            </div>
          ))}
        </div>

        {/* 2. MAIN CONTENT LAYOUT */}
        <div className="relative z-10 h-full lg:h-auto flex flex-col px-4 sm:px-6 pt-20 pb-6 sm:pt-24 sm:pb-8 w-full max-w-md sm:max-w-xl mx-auto items-center justify-between lg:justify-start hero-content-desktop">

          {/* ── TOP ZONE: BADGE ── */}
          {/* <div className="flex-none flex justify-center lg:justify-start w-full mt-2 sm:mt-4 lg:mt-0 hero-badge-wrapper">
            <div className="hero-badge">
              <FiAward style={{ width: 12, height: 12, color: '#c4a0f0', flexShrink: 0 }} />
              <span className="hero-badge-text">
                Anime streetwear — This isn&apos;t merch. It&apos;s identity
              </span>
            </div>
          </div> */}

          {/* ── SUPPORTING STATEMENT ── */}
          <div className="flex-none flex justify-center lg:justify-start w-full mt-auto lg:mt-0 hero-supporting-wrapper">
            <p className="hero-supporting px-2 lg:px-0">
              {/* Designed for fans who understand meaning&nbsp;— not merch. */}
            </p>
          </div>

          {/* ── MAIN HEADLINE ── */}
          <div className="flex-none flex justify-center lg:justify-start w-full mt-4 sm:mt-5 lg:mt-0 hero-headline-wrapper">
            <h1 className="hero-headline">
              {/* <span className="block">WEAR WHAT YOU <span className="felt-accent">FELT</span></span>
              <span className="block">NOT WHAT YOU SAW.</span> */}
            </h1>
          </div>

          {/* ── QUALITY TEXT ── */}
          <div className="flex-none flex justify-center lg:justify-start w-full mt-4 sm:mt-5 lg:mt-0 hero-quality-wrapper">
            <p className="hero-quality">
              {/* Heavy 240 GSM. Designed to feel real — not loud. */}
            </p>
          </div>

          {/* ── CTA BUTTON ── */}
          <div className="flex-none flex justify-center lg:justify-start w-full mt-6 sm:mt-7 lg:mt-0 hero-cta-wrapper">
            <Link href="/products" className="hero-cta-btn">
              <span className="hero-cta-text">ENTER GENZVERSE</span>
              <FiArrowRight className="hero-cta-arrow" style={{ width: 15, height: 15 }} />
            </Link>
          </div>

          {/* ── SCROLL INDICATOR ── desktop: abs bottom-left; mobile: inline bottom */}
          <div className="flex-none flex justify-center w-full mt-6 sm:mt-7 hero-scroll-desktop">
            <div className="hero-scroll-ring">
              <div className="hero-scroll-dot" />
            </div>
          </div>

        </div>

      </section>
    </>
  )
}