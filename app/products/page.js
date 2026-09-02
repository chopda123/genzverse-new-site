import Header from '../../components/Header'
import Footer from '../../components/Footer'
import ProductFeed from '../../components/ProductFeed'
import { products, categories } from '../../data/products'
import Image from 'next/image'

// ✅ Dynamic SEO Metadata — unique per collection filter, canonical always /products
export async function generateMetadata({ searchParams }) {
  const { category } = await searchParams || {};
  const cat = categories.find(c => c.slug === category);

  const defaultMeta = {
    title: 'Anime T-Shirts for Men in India',
    description:
      'Explore premium anime T-shirts and subtle anime streetwear from GenZverse. Heavyweight 240 GSM designs inspired by anime stories, symbols and hidden references.',
    alternates: {
      canonical: 'https://www.genzverse.shop/products',
    },
    openGraph: {
      title: 'Anime T-Shirts for Men in India',
      description:
        'Explore premium anime T-shirts and subtle anime streetwear from GenZverse. Heavyweight 240 GSM designs inspired by anime stories, symbols and hidden references.',
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
  };

  // If a valid non-"all" category is selected, use its SEO metadata
  if (cat && cat.slug !== 'all' && cat.seoTitle) {
    return {
      ...defaultMeta,
      title: cat.seoTitle,
      description: cat.seoDescription,
      openGraph: {
        ...defaultMeta.openGraph,
        title: cat.seoTitle,
        description: cat.seoDescription,
      },
    };
  }

  return defaultMeta;
}

export default function ProductsPage() {
  // ItemList Schema — links to individual product pages for Google carousel rich results.
  // Full Product/Offer structured data (including hasMerchantReturnPolicy, shippingDetails)
  // lives on each individual product page at /products/[slug].
  // We intentionally omit Offer here to avoid incomplete Offer objects that trigger
  // Google Merchant Listings warnings for missing hasMerchantReturnPolicy.
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
      url: `https://www.genzverse.shop/products/${product.slug}`,
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
      <main className="min-h-screen bg-[#F5F2EC]">
        {/* Hero Section — Server-rendered for SEO speed with collection 1 background image */}
        <section className="relative pt-28 pb-16 sm:pt-36 sm:pb-20 md:pt-40 md:pb-24 overflow-hidden flex items-center justify-center min-h-[300px] sm:min-h-[360px] md:min-h-[420px] bg-dark-500">
          {/* Hero Background Image: collection 1 */}
          <div className="absolute inset-0 z-0">
            <Image
              src="/collection1.webp"
              alt="GenZverse Anime Collection"
              fill
              priority
              sizes="100vw"
              className="object-cover object-center"
            />
            {/* Cinematic dark overlay gradient for text & navbar readability */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/45 to-black/80" />
          </div>

          <div className="container-custom text-center px-4 relative z-10">
            <h1 className="text-3xl md:text-5xl font-heading font-bold mb-3 md:mb-4 text-white drop-shadow-md">
              Anime <span className="text-gradient">Collection</span>
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-gray-200 max-w-2xl mx-auto font-medium drop-shadow-sm">
              Anime streetwear — This isn&apos;t merch. It&apos;s identity
            </p>
          </div>
        </section>

        {/* Client-side Filters + Product Grid on Warm Off-White */}
        <ProductFeed products={products} />
      </main>
      <Footer />
    </>
  )
}