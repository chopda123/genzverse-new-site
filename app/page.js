import Header from '../components/Header'
import Hero from '../components/Hero'
import ProductCard from '../components/ProductCard'
import Testimonials from '../components/Testimonials'
import Footer from '../components/Footer'
import { products } from '../data/products'
import Link from 'next/link'
import NotMerch from '../components/NotMerch'
import CollectionsGate from '../components/CollectionsGate'
import ValueBanner from '../components/ValueBanner';

export default function Home() {
  const featuredProducts = products.slice(0, 8)

  // Hybrid SEO + AEO Schema
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'OnlineStore',
    '@id': 'https://www.genzverse.shop/#store',
    name: 'GenZverse',
    url: 'https://www.genzverse.shop',
    logo: 'https://www.genzverse.shop/logo_tras.png',
    description: 'Premium anime t shirts for men in India with hidden anime references and minimalist streetwear design.',
    areaServed: {
      '@type': 'Country',
      name: 'India'
    },
    priceRange: '₹₹',
    knowsAbout: [
      "Anime T-shirts",
      "Anime streetwear",
      "Oversized t-shirts",
      "240 GSM cotton",
      "Anime fashion India"
    ],
    brand: {
      '@type': 'Brand',
      name: 'GenZverse',
      slogan: 'Wear what you felt, not what you saw'
    },
    sameAs: [
      'https://www.instagram.com/anime_tshirt_genzverse/',
      'https://www.facebook.com/profile.php?id=61584710725511'
    ]
  }

  return (
    <>
      {/* SEO: Inject JSON-LD Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <Header />
      <main>
        <Hero />
        <NotMerch />
        <CollectionsGate />

        {/* Featured Products */}
        <section className="py-10 md:py-16 bg-dark-400">
          <div className="container-custom">
            <div className="text-center mb-12">
              <div className="inline-flex items-center space-x-2 text-accent-purple font-medium mb-4">
                <span>✨</span>
                {/* <span>LIMITED EDITION DROPS</span> */}
                <span>✨</span>
              </div>
              <h2 className="text-2xl md:text-3xl font-heading font-bold mb-4">
                Featured <span className="text-gradient">Collection</span>
              </h2>
              <p className="text-gray-400 max-w-2xl mx-auto">
                Handpicked designs that capture the essence of your favorite anime moments. Each piece tells a story.
              </p>
              <div className="mt-4 inline-flex items-center gap-2 bg-accent-cyan/10 border border-accent-cyan/30 text-accent-cyan text-xs font-semibold px-4 py-1.5 rounded-full">
                🚚 <span>Free Delivery</span> <span className="text-white/50 font-normal">on all orders · Across India</span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {featuredProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>

            <div className="text-center mt-12">
              <Link href="/products" className="btn-secondary">
                View All Collections
              </Link>
            </div>
          </div>
        </section>

        {/* Value Proposition */}
        <ValueBanner />

        <Testimonials />
      </main>

      <Footer />
    </>
  )
}