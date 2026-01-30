

// app/products/page.js
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import ProductFeed from '../../components/ProductFeed'
import { products } from '../../data/products'

// ✅ 1. Metadata for SEO (Google needs this)
export const metadata = {
  title: 'Anime Streetwear Collection | GenZverse',
  description: 'Shop premium anime t-shirts. 100% Cotton, Heavyweight fabric. Minimal aesthetics inspired by One Piece, Attack on Titan, and more.',
  openGraph: {
    title: 'Anime Streetwear Collection | GenZverse',
    description: 'Anime streetwear — This isn\'t merch. It\'s identity.',
    type: 'website',
  }
}

export default function ProductsPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen">
        {/* Hero Section - Rendered on Server for Speed/SEO */}
        <section className="pt-24 pb-16 md:pt-32 md:pb-20 bg-gradient-to-br from-dark-500 via-dark-400 to-dark-300">
          <div className="container-custom text-center px-4">
            <h1 className="text-3xl md:text-5xl font-heading font-bold mb-4 md:mb-6">
              Anime <span className="text-gradient">Collection</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto">
             Anime streetwear — This isn't merch. It's identity
            </p>
          </div>
        </section>

        {/* Client Side Logic (Filters, Sort, Grid) */}
        {/* We pass the 'products' data here so the component has data immediately */}
        <ProductFeed products={products} />
      </main>
      <Footer />
    </>
  )
}