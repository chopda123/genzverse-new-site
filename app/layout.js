


import { CartProvider } from '../context/CartContext'
import Script from 'next/script'
import './globals.css'
import AnalyticsTracker from '../components/AnalyticsTracker' // Your custom client tracker
import { Sora } from 'next/font/google'
// import { GoogleAnalytics } from '@next/third-parties/google'

const sora = Sora({
  subsets: ['latin'],
  variable: '--font-sora', // We will use this variable in Tailwind
  display: 'swap',
})



export const metadata = {
  metadataBase: new URL('https://www.genzverse.shop'),

  title: {
    default: 'Anime T Shirt for Men | Premium Anime Streetwear – GenZverse',
    template: '%s | GenZverse Anime Clothing'
  },

  description:
    'Buy premium anime t shirts for men in India. GenZverse offers oversized 240 GSM anime streetwear with hidden anime references. No loud merch — pure identity.',

    // Verification for Search Console
  verification: {
    google: 'p2OA3WLExFij8lvaUr2qEoRwe-KnUh6sKTe7TQK48FE', // Replace this!
    other: {
      'msvalidate.01': '1D46532736F55B91D3C8D196B908209E', // Replace this!
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
    'hidden anime reference t shirt'
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

  openGraph: {
    title: 'Anime T Shirt for Men | GenZverse – Premium Anime Streetwear',
    description:
      'Minimal anime t-shirts with hidden references. Heavy 240 GSM cotton. Made for true anime fans in India.',
    url: 'https://www.genzverse.shop',
    siteName: 'GenZverse',
    locale: 'en_IN',
    type: 'website',
    images: [
      {
        url: '/opengraph-image.png',
        width: 1200,
        height: 630,
        alt: 'GenZverse Anime T Shirt for Men',
      },
    ],
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
    <html lang="en" className={sora.variable}> 
      <body className="bg-dark-500 text-white font-sans">
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