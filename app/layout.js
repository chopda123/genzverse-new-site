
import { CartProvider } from '../context/CartContext'
import Script from 'next/script'
import './globals.css'
import AnalyticsTracker from '../components/AnalyticsTracker'
import { Sora } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'

const sora = Sora({
  subsets: ['latin'],
  weight: ['400', '600', '700'], // Only load weights we actually use
  variable: '--font-sora',
  display: 'swap',
})

// ─────────────────────────────────────────────
// Viewport — Required by Next.js 14+ as a separate export
// ─────────────────────────────────────────────
export const viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#a855f7',
}

// ─────────────────────────────────────────────
// Site-wide Metadata
// ─────────────────────────────────────────────
export const metadata = {
  metadataBase: new URL('https://www.genzverse.shop'),

  title: {
    default: 'Anime T-Shirts for Men in India | Premium Anime Streetwear – GenZverse',
    template: '%s | GenZverse Anime Clothing',
  },

  description:
    'Shop premium anime T-shirts and subtle anime streetwear in India. Heavyweight 240 GSM oversized T-shirts inspired by anime stories, moments, symbols and hidden references.',

  // Verification for Search Console & Bing
  verification: {
    google: 'p2OA3WLExFij8lvaUr2qEoRwe-KnUh6sKTe7TQK48FE',
    other: {
      'msvalidate.01': '1D46532736F55B91D3C8D196B908209E',
      'facebook-domain-verification': 'gwi7phx2i4dfpq4ur9a81xisyj9w8t',
    },
  },

  keywords: [
    'anime t shirt for men',
    'anime t shirts india',
    'oversized anime t shirt',
    'anime streetwear india',
    'premium anime clothing brand',
    'minimal anime merch',
    'hidden anime reference t shirt',
    'anime streetwear brand india',
    'buy anime tshirt online india',
  ],

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },

  // Canonical URL for homepage
  alternates: {
    canonical: 'https://www.genzverse.shop',
  },

  // Open Graph
  openGraph: {
    title: 'Anime T-Shirts for Men in India | Premium Anime Streetwear – GenZverse',
    description:
      'Shop premium anime T-shirts and subtle anime streetwear in India. Heavyweight 240 GSM oversized T-shirts inspired by anime stories, moments, symbols and hidden references.',
    url: 'https://www.genzverse.shop',
    siteName: 'GenZverse',
    locale: 'en_IN',
    type: 'website',
    images: [
      {
        url: '/opengraph-image.webp',
        width: 1200,
        height: 630,
        alt: 'GenZverse – Premium Anime T-Shirts and Streetwear India',
      },
    ],
  },

  // Twitter / X Card — previously missing
  twitter: {
    card: 'summary_large_image',
    title: 'Anime T-Shirts for Men in India | Premium Anime Streetwear – GenZverse',
    description:
      'Shop premium anime T-shirts and subtle anime streetwear in India. Heavyweight 240 GSM oversized T-shirts inspired by anime stories, moments, symbols and hidden references.',
    images: ['/opengraph-image.webp'],
    creator: '@genzverse',
  },
}

export default function RootLayout({ children }) {
  // Organization Schema — brand identity for AI crawlers (ChatGPT, Gemini, Perplexity)
  const organizationJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'GenZverse',
    description:
      'Premium anime streetwear brand from India. Minimal designs with hidden references — for fans who feel anime, not just watch it.',
    url: 'https://www.genzverse.shop',
    logo: 'https://www.genzverse.shop/logo_tras.png',
    foundingDate: '2024',
    areaServed: {
      '@type': 'Country',
      name: 'India',
    },
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'customer support',
      availableLanguage: ['English', 'Hindi'],
    },
    sameAs: [
      'https://www.instagram.com/anime_tshirt_genzverse/',
      'https://www.facebook.com/profile.php?id=61584710725511',
    ],
  }

  // Sitelinks SearchBox — lets Google add a search box under your result
  const siteLinksSearchBoxJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    url: 'https://www.genzverse.shop',
    name: 'GenZverse',
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: 'https://www.genzverse.shop/products?q={search_term_string}',
      },
      'query-input': 'required name=search_term_string',
    },
  }

  return (
    <html lang="en" className={sora.variable}>
      <body className="bg-dark-500 text-white font-sans">
        {/* Speed: preconnect to GA servers */}
        <link rel="preconnect" href="https://www.googletagmanager.com" />
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />

        {/* Organization Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />

        {/* Sitelinks SearchBox Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(siteLinksSearchBoxJsonLd) }}
        />

        {/* Google Analytics — send_page_view: false prevents double-fire with AnalyticsTracker */}
        <Script
          strategy="afterInteractive"
          src="https://www.googletagmanager.com/gtag/js?id=G-WHLXZ37NFC"
        />
        <Script
          id="google-analytics"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-WHLXZ37NFC', {
                send_page_view: false,
                debug_mode: false
              });
            `,
          }}
        />

        {/* Client-side page view tracker (single source of truth for page_view events) */}
        <AnalyticsTracker />
        <Analytics />
        <CartProvider>{children}</CartProvider>
      </body>
    </html>
  )
}