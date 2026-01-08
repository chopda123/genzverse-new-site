



// app/page.js
import Header from '../components/Header'
import Hero from '../components/Hero'
import ProductCard from '../components/ProductCard'
import Testimonials from '../components/Testimonials'
import Footer from '../components/Footer'
import { products } from '../data/products'
import Link from 'next/link'

export default function Home() {
  const featuredProducts = products.slice(0, 4) // Show first 4 products

  return (
    <>
      <Header />
      <main>
        <Hero />
        
        {/* Featured Products */}
        <section className="section-padding bg-dark-400">
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
        <section className="section-padding bg-dark-500">
          <div className="container-custom">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-accent-purple to-accent-pink rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">🎨</span>
                </div>
                <h3 className="text-xl font-heading font-bold mb-2">Premium Prints</h3>
                <p className="text-gray-400">
                  Elevating apparel through expert HD rubber, embroidery, DTF, and professional screen printing
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-accent-cyan to-accent-purple rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">👕</span>
                </div>
                <h3 className="text-xl font-heading font-bold mb-2">Comfort Fit</h3>
                <p className="text-gray-400">
                  100% premium combed and Terry cotton that feels amazing and fits perfectly
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-accent-pink to-accent-cyan rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">🚀</span>
                </div>
                <h3 className="text-xl font-heading font-bold mb-2">Fast Shipping</h3>
                <p className="text-gray-400">
                  Free shipping across India. Delivered in 3-5 business days
                </p>
              </div>
            </div>
          </div>
        </section>

        <Testimonials />
      </main>
      <Footer />
    </>
  )
}