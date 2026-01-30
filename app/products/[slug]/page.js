import { getProductBySlug } from '@/data/products';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
// import ProductDetails from '@/components/ProductDetails';
import ProductView from './ProductView';

// 1. GENERATE DYNAMIC METADATA
export async function generateMetadata({ params }) {
  const { slug } = await params; // Next.js 15+ requirement
  const product = getProductBySlug(slug);

  if (!product) {
    return {
      title: 'Product Not Found | GenZverse',
    };
  }

  return {
    title: product.name, // The layout.js automatically adds " | GenZverse"
    description: product.description,
    openGraph: {
      title: product.name,
      description: product.description,
      images: product.images?.[0] ? [`https://www.genzverse.shop${product.images[0]}`] : [],
      type: 'website',
    },
    alternates: {
      canonical: `https://www.genzverse.shop/products/${product.slug}`,
    },
  };
}

// 2. SERVER PAGE COMPONENT
export default async function ProductPage({ params }) {
  const { slug } = await params;
  const decodedSlug = decodeURIComponent(slug);
  const product = getProductBySlug(decodedSlug);

  // Handle "Product Not Found" Case
  if (!product) {
    return (
      <div className="min-h-screen bg-dark-500 text-white">
        <Header />
        <div className="pt-32 flex justify-center items-center min-h-[60vh]">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-white mb-4">Product Not Found</h1>
            <p className="text-gray-400">
              We could not find the product with ID: <span className="text-red-400">{decodedSlug}</span>
            </p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  // SCHEME 1: PRODUCT DATA (Rich Snippets)
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    image: product.images.map(img => img.startsWith('http') ? img : `https://www.genzverse.shop${img}`),
    description: product.description,
    sku: product.sku || product.slug,
    brand: {
      '@type': 'Brand',
      name: 'GenZverse'
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: product.rating,
      reviewCount: product.reviewCount || 10,
      bestRating: "5",
      worstRating: "1"
    },
    offers: {
      '@type': 'Offer',
      url: `https://www.genzverse.shop/products/${product.slug}`,
      priceCurrency: 'INR',
      price: product.price,
      itemCondition: 'https://schema.org/NewCondition',
      availability: product.stock > 0 ? 'https://schema.org/InStock' : 'https://schema.org/OutOfStock',
      seller: {
        '@type': 'Organization',
        name: 'GenZverse'
      }
    }
  };

  // ✅ FIX: Determine Primary Category (Safe for Array or String)
  // If product.category is ["Hidden References", "One Piece"], we use "Hidden References"
  const primaryCategory = Array.isArray(product.category) 
    ? product.category[0] 
    : product.category;

  // SCHEME 2: BREADCRUMBS (Site Hierarchy)
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://www.genzverse.shop"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Products",
        "item": "https://www.genzverse.shop/products"
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": primaryCategory, // 🟢 Updated to use safe variable
        "item": `https://www.genzverse.shop/products?category=${encodeURIComponent(primaryCategory)}` // 🟢 Updated URL encoding
      },
      {
        "@type": "ListItem",
        "position": 4,
        "name": product.name
      }
    ]
  };

  return (
    <>
      {/* Inject Product Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {/* Inject Breadcrumb Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      
      <div className="min-h-screen bg-dark-500 text-white">
        <Header />
        {/* <ProductDetails product={product} />
         */}
         <ProductView product={product} />
        <Footer />
      </div>
    </>
  );
}