


import { CartProvider } from '../context/CartContext'
import './globals.css'

export const metadata = {
  title: 'GenZverse | Premium Anime T-Shirts',
  description:
    'Discover exclusive limited edition anime t-shirts crafted with passion.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
    <head>
  {/* Google Analytics 4 */}
  <script
    async
    src="https://www.googletagmanager.com/gtag/js?id=G-WHLXZ37NFC"
  />
  <script
    dangerouslySetInnerHTML={{
      __html: `
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', 'G-WHLXZ37NFC', {
          debug_mode: true
        });
      `,
    }}
  />
</head>


      <body className="bg-dark-500 text-white">
        <CartProvider>{children}</CartProvider>
      </body>
    </html>
  )
}
