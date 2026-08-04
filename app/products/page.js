// app/products/page.js
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import ProductFeed from '../../components/ProductFeed'
import { products } from '../../data/products'

// ✅ SEO Metadata with canonical
export const metadata = {
  title: 'Anime Streetwear Collection | GenZverse',
  description:
    'Shop premium anime t-shirts. 100% Cotton, Heavyweight 240 GSM fabric. Minimal aesthetics inspired by One Piece, Attack on Titan, Naruto and more. Free shipping across India.',
  alternates: {
    canonical: 'https://www.genzverse.shop/products',
  },
  openGraph: {
    title: 'Anime Streetwear Collection | GenZverse',
    description: "Anime streetwear — This isn't merch. It's identity.",
    type: 'website',
    url: 'https://www.genzverse.shop/products',
    images: [
      {
        url: '/opengraph-image.webp',
        width: 1200,
        height: 630,
        alt: 'GenZverse Anime Streetwear Collection',
      },
    ],
  },
}

export default function ProductsPage() {
  // ItemList Schema — helps Google and AI crawlers index ALL products
  // This is what powers "product carousel" rich results in Google Search
  const itemListJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'GenZverse Anime Streetwear Collection',
    description:
      'Premium anime t-shirts with hidden references. Heavyweight 240 GSM cotton. Free shipping across India.',
    url: 'https://www.genzverse.shop/products',
    numberOfItems: products.length,
    itemListElement: products.map((product, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      item: {
        '@type': 'Product',
        name: product.name,
        url: `https://www.genzverse.shop/products/${product.slug}`,
        image: product.images?.[0]
          ? `https://www.genzverse.shop${product.images[0]}`
          : 'https://www.genzverse.shop/logo.jpg',
        description: product.description,
        brand: {
          '@type': 'Brand',
          name: 'GenZverse',
        },
        offers: {
          '@type': 'Offer',
          price: product.price,
          priceCurrency: 'INR',
          availability:
            product.stock > 0
              ? 'https://schema.org/InStock'
              : 'https://schema.org/OutOfStock',
          url: `https://www.genzverse.shop/products/${product.slug}`,
        },
        aggregateRating: {
          '@type': 'AggregateRating',
          ratingValue: product.rating,
          reviewCount: product.reviewCount || 5,
          bestRating: '5',
          worstRating: '1',
        },
      },
    })),
  }

  return (
    <>
      {/* Inject ItemList Schema for Google + AI Search */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListJsonLd) }}
      />

      <Header />
      <main className="min-h-screen">
        {/* Hero Section — Server-rendered for SEO speed */}
        <section className="pt-24 pb-16 md:pt-32 md:pb-20 bg-gradient-to-br from-dark-500 via-dark-400 to-dark-300">
          <div className="container-custom text-center px-4">
            <h1 className="text-3xl md:text-5xl font-heading font-bold mb-4 md:mb-6">
              Anime <span className="text-gradient">Collection</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto">
              Anime streetwear — This isn&apos;t merch. It&apos;s identity
            </p>
          </div>
        </section>

        {/* Client-side Filters + Product Grid */}
        <ProductFeed products={products} />
      </main>
      <Footer />
    </>
  )
}