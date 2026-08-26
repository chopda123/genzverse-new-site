import Header from '../components/Header'
import Hero from '../components/Hero'
import ProductCard from '../components/ProductCard'
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
        <section className="pt-4 pb-10 md:pt-8 md:pb-12 lg:pt-10 lg:pb-14 bg-[#FAF9F6]">
          <div className="container-custom">
            <div className="text-center mb-5 md:mb-6 lg:mb-8">
              <div className="inline-flex items-center space-x-1.5 md:space-x-2 text-accent-purple text-xs md:text-sm font-semibold mb-1 md:mb-2">
                <span>✨</span>
                {/* <span>LIMITED EDITION DROPS</span> */}
                <span>✨</span>
              </div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-heading font-bold text-gray-900 mb-1.5 md:mb-2.5 tracking-tight">
                Featured <span className="text-gradient">Collection</span>
              </h2>
              <p className="text-xs sm:text-sm md:text-base text-gray-700 max-w-xl md:max-w-2xl mx-auto leading-relaxed px-2 md:px-0 mb-2.5 md:mb-0 font-medium">
                Handpicked designs that capture the essence of your favorite anime moments. Each piece tells a story.
              </p>
              <div className="md:mt-3 inline-flex items-center gap-1.5 md:gap-2 bg-accent-purple/10 border border-accent-purple/30 text-accent-purple text-[11px] md:text-xs font-bold px-3 md:px-4 py-1 md:py-1.5 rounded-full shadow-sm">
                🚚 <span>Free Delivery</span> <span className="text-gray-700 font-medium">on all orders · Across India</span>
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
      </main>

      <Footer />
    </>
  )
}