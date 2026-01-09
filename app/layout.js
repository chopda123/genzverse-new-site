


import { CartProvider } from '../context/CartContext'
import Script from 'next/script'
import './globals.css'
import AnalyticsTracker from '../components/AnalyticsTracker' // Your custom client tracker

// 1. SEO METADATA (Server Side)
export const metadata = {
  metadataBase: new URL('https://www.genzverse.shop'),
  title: {
    default: 'GenZverse | Underrated Anime T-Shirts & Hidden References',
    template: '%s | GenZverse'
  },
  description: 'Shop exclusive anime t-shirts with hidden references. No loud designs—just subtle, premium cotton streetwear for true fans.',
  keywords: ['anime t-shirts', 'streetwear india', 'minimalist anime', 'genzverse', 'cotton anime tees'],
  authors: [{ name: 'GenZverse' }],
  
  // Verification for Search Console
  verification: {
    google: 'p2OA3WLExFij8lvaUr2qEoRwe-KnUh6sKTe7TQK48FE', // Replace this!
    other: {
      'msvalidate.01': '1D46532736F55B91D3C8D196B908209E', // Replace this!
    },
  },

  // Robots for Google Discover
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },

  openGraph: {
    title: 'GenZverse | Subtle & Underrated Anime Streetwear',
    description: 'Hidden anime references on premium cotton.',
    url: 'https://www.genzverse.shop',
    siteName: 'GenZverse',
    locale: 'en_IN',
    type: 'website',
    images: [{ url: '/opengraph-image.png', width: 1200, height: 630, alt: 'GenZverse Brand' }],
  },
}

export default function RootLayout({ children }) {
  // 2. ORGANIZATION SCHEMA (Your Brand Identity)
  const organizationJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'GenZverse',
    url: 'https://www.genzverse.shop',
    logo: 'https://www.genzverse.shop/logo.jpg', // Ensure this file exists in your /public folder!
    sameAs: [
      'https://www.instagram.com/anime_tshirt_genzverse/',
      'https://www.facebook.com/profile.php?id=61584710725511'
    ]
  }

  return (
    <html lang="en">
      <body className="bg-dark-500 text-white">
        {/* Speed Optimization */}
        <link rel="preconnect" href="https://www.googletagmanager.com" />
        
        {/* Inject Organization Schema safely */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        
        {/* Google Analytics Scripts */}
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
               
                page_path: window.location.pathname,
                debug_mode: false
              });
            `,
          }}
        />

        {/* Client Side Trackers & State */}
        <AnalyticsTracker />
        <CartProvider>{children}</CartProvider>
      </body>
    </html>
  )
}