import { getProductBySlug, products } from '@/data/products';

// Helper: safely convert description (string or array) to a plain string
function descriptionToString(description) {
  if (Array.isArray(description)) return description.join(' ');
  return description || '';
}
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ProductView from './ProductView';

// Pre-render all product pages at build time (Static Site Generation)
// This gives ~10ms TTFB instead of ~200ms server-rendered
export function generateStaticParams() {
  return products.map((product) => ({
    slug: product.slug,
  }));
}

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
    title: product.seoTitle || product.name, // Rich SEO title with anime reference
    description: descriptionToString(product.description),
    openGraph: {
      title: product.seoTitle || product.name,
      description: descriptionToString(product.description),
      images: product.images?.[0] ? [`https://www.genzverse.shop${product.images[0]}`] : [],
    },
    other: {
      'og:type': 'product',
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
    description: descriptionToString(product.description),
    sku: product.sku || product.slug,
    brand: {
      '@type': 'Brand',
      name: 'GenZverse'
    },
    // AggregateRating: Omitted because GenZverse currently has NO genuine reviews.
    // When genuine reviews are introduced in the future, restore this block.
    /*
    ...(product.reviewCount > 0 ? {
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: product.rating,
        reviewCount: product.reviewCount,
        bestRating: "5",
        worstRating: "1"
      }
    } : {}),
    */
    offers: {
      '@type': 'Offer',
      url: `https://www.genzverse.shop/products/${product.slug}`,
      priceCurrency: 'INR',
      price: String(product.price),
      itemCondition: 'https://schema.org/NewCondition',
      availability: product.stock > 0 ? 'https://schema.org/InStock' : 'https://schema.org/OutOfStock',
      seller: {
        '@type': 'Organization',
        name: 'GenZverse'
      },
      // Source: Free shipping across India stated on homepage, product pages, checkout, and category descriptions.
      shippingDetails: {
        '@type': 'OfferShippingDetails',
        shippingRate: {
          '@type': 'MonetaryAmount',
          value: '0',
          currency: 'INR'
        },
        shippingDestination: {
          '@type': 'DefinedRegion',
          addressCountry: 'IN'
        }
      },
      // Source: /policies/refund-policy — 7-day return & exchange window.
      // Accepted for BOTH defective and non-defective products (new and slightly used).
      // Refund processed within up to 7 days after return is received and reviewed.
      // returnFees: FreeReturn — GenZverse covers return shipping; no restocking fee.
      // Return method: by mail; prepaid return label provided at no cost to customer.
      // Aligned with Google Merchant Center return policy configuration (Country: IN).
      hasMerchantReturnPolicy: {
        '@type': 'MerchantReturnPolicy',
        applicableCountry: 'IN',
        returnPolicyCategory: 'https://schema.org/MerchantReturnFiniteReturnWindow',
        merchantReturnDays: 7,
        returnMethod: 'https://schema.org/ReturnByMail',
        returnFees: 'https://schema.org/FreeReturn',
        refundType: 'https://schema.org/FullRefund'
      }
    }
  };

  // ✅ FIX: Determine Primary Category (Safe for Array or String)
  // If product.categories is ["Hidden References", "One Piece"], we use "Hidden References"
  const primaryCategory = Array.isArray(product.categories) 
    ? product.categories[0] 
    : product.categories;

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
        <Header variant="dark" />
        {/* <ProductDetails product={product} />
         */}
         <ProductView product={product} />
        <Footer />
      </div>
    </>
  );
}