


// app/page.js
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
  const featuredProducts = products.slice(0, 4) // Show first 4 products

  // SEO: Structured Data for Google Rich Snippets
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ClothingStore',
    name: 'GenZverse',
    url: 'https://www.genzverse.shop',
    logo: 'https://www.genzverse.shop/logo.jpg', // Ensure this file exists
    description: 'Minimalist anime t-shirts with hidden references for true fans. No loud designs.',
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'IN'
    },
    priceRange: '₹₹',
    offers: {
      '@type': 'Offer',
      description: 'Free shipping on all underrated anime prints'
    },
    sameAs: [
      'https://www.instagram.com/anime_tshirt_genzverse/', // Replace with your actual social links
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
                <span>LIMITED EDITION DROPS</span>
                <span>✨</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">
                Featured <span className="text-gradient">Collection</span>
              </h2>
              <p className="text-gray-400 max-w-2xl mx-auto">
                Handpicked designs that capture the essence of your favorite anime moments. Each piece tells a story.
              </p>
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