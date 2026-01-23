


// // app/page.js
// import Header from '../components/Header'
// import Hero from '../components/Hero'
// import ProductCard from '../components/ProductCard'
// import Testimonials from '../components/Testimonials'
// import Footer from '../components/Footer'
// import { products } from '../data/products'
// import Link from 'next/link'
// import NotMerch from '../components/NotMerch'
// import CollectionsGate from '../components/CollectionsGate'
// import ValueBanner from '../components/ValueBanner';

// export default function Home() {
//   const featuredProducts = products.slice(0, 4) // Show first 4 products

//   // SEO: Structured Data for Google Rich Snippets
//   const jsonLd = {
//     '@context': 'https://schema.org',
//     '@type': 'ClothingStore',
//     name: 'GenZverse',
//     url: 'https://www.genzverse.shop',
//     logo: 'https://www.genzverse.shop/logo.jpg', // Ensure this file exists
//     description: 'Minimalist anime t-shirts with hidden references for true fans. No loud designs.',
//     address: {
//       '@type': 'PostalAddress',
//       addressCountry: 'IN'
//     },
//     priceRange: '₹₹',
//     offers: {
//       '@type': 'Offer',
//       description: 'Free shipping on all underrated anime prints'
//     },
//     sameAs: [
//       'https://www.instagram.com/anime_tshirt_genzverse/', // Replace with your actual social links
//       'https://www.facebook.com/profile.php?id=61584710725511' 
//     ]
//   }

//   return (
//     <>
//       {/* SEO: Inject JSON-LD Schema */}
//       <script
//         type="application/ld+json"
//         dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
//       />

//       <Header />
//       <main>
//         <Hero />
//         <NotMerch />
// <CollectionsGate />
        
        
//         {/* Featured Products */}
//         <section className="py-10 md:py-16 bg-dark-400">
//           <div className="container-custom">
//             <div className="text-center mb-12">
//               <div className="inline-flex items-center space-x-2 text-accent-purple font-medium mb-4">
//                 <span>✨</span>
//                 <span>LIMITED EDITION DROPS</span>
//                 <span>✨</span>
//               </div>
//               <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">
//                 Featured <span className="text-gradient">Collection</span>
//               </h2>
//               <p className="text-gray-400 max-w-2xl mx-auto">
//                 Handpicked designs that capture the essence of your favorite anime moments. Each piece tells a story.
//               </p>
//             </div>

//             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
//               {featuredProducts.map(product => (
//                 <ProductCard key={product.id} product={product} />
//               ))}
//             </div>

//             <div className="text-center mt-12">
//               <Link href="/products" className="btn-secondary">
//                 View All Collections
//               </Link>
//             </div>
//           </div>
//         </section>

//         {/* Value Proposition */}
       

//          <ValueBanner />

//         <Testimonials />
//       </main>
//       <Footer />
//     </>
//   )
// }









// import Header from '../components/Header'
// import Hero from '../components/Hero'
// import ProductCard from '../components/ProductCard'
// import Testimonials from '../components/Testimonials'
// import Footer from '../components/Footer'
// import { products } from '../data/products'
// import Link from 'next/link'
// import NotMerch from '../components/NotMerch'
// import CollectionsGate from '../components/CollectionsGate'
// import ValueBanner from '../components/ValueBanner';

// export default function Home() {
//   const featuredProducts = products.slice(0, 8) // Show first 8 products

//   // 🧠 AEO MASTER SCHEMA (The "Brain" for Google/Gemini)
//   const brandSchema = {
//     "@context": "https://schema.org",
//     "@type": ["Brand", "Organization"], // Dual authority
//     "@id": "https://www.genzverse.shop/#brand", // Persistent Entity ID
//     "name": "GenZverse",
//     "url": "https://www.genzverse.shop",
//     "logo": "https://www.genzverse.shop/logo.jpg",
//     "description": "Premium anime clothing brand in India creating 240 GSM oversized t-shirts for men with subtle, meaningful designs.",
//     "slogan": "Anime T Shirts for Men – Subtle & Premium",
//     "address": {
//       "@type": "PostalAddress",
//       "addressCountry": "IN"
//     },
//     "knowsAbout": [ // 🚀 AI Knowledge Graph Keywords
//       "Anime T-shirts",
//       "Anime streetwear",
//       "Oversized t-shirts",
//       "240 GSM cotton",
//       "Anime fashion India"
//     ],
//     "sameAs": [
//       "https://www.instagram.com/anime_tshirt_genzverse/",
//       "https://www.facebook.com/profile.php?id=61584710725511"
//     ],
//     "mainEntityOfPage": {
//       "@type": "WebPage",
//       "@id": "https://www.genzverse.shop/"
//     }
//   };

//   return (
//     <>
//       {/* SEO: Inject JSON-LD Schema */}
//       <script
//         type="application/ld+json"
//         dangerouslySetInnerHTML={{ __html: JSON.stringify(brandSchema) }}
//       />

//       <Header />
//       <main>
//         <Hero />
//         <NotMerch />
//         <CollectionsGate />
        
//         {/* Featured Products */}
//         <section className="py-10 md:py-16 bg-dark-400">
//           <div className="container-custom">
//             <div className="text-center mb-12">
//               <div className="inline-flex items-center space-x-2 text-accent-purple font-medium mb-4">
//                 <span>✨</span>
//                 <span>LIMITED EDITION DROPS</span>
//                 <span>✨</span>
//               </div>
//               <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">
//                 Featured <span className="text-gradient">Collection</span>
//               </h2>
//               <p className="text-gray-400 max-w-2xl mx-auto">
//                 Handpicked designs that capture the essence of your favorite anime moments. Each piece tells a story.
//               </p>
//             </div>

//             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
//               {featuredProducts.map(product => (
//                 <ProductCard key={product.id} product={product} />
//               ))}
//             </div>

//             <div className="text-center mt-12">
//               <Link href="/products" className="btn-secondary">
//                 View All Collections
//               </Link>
//             </div>
//           </div>
//         </section>

//         {/* Value Proposition */}
//         <ValueBanner />

//         {/* 🚀 AEO CONTENT SECTION */}
//         {/* This feeds the AI answers with clear definitions */}
        
  

//         <Testimonials />
//       </main>
      
//       <Footer />
//     </>
//   )
// }








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
  // showing 8 products as per your code snippet
  const featuredProducts = products.slice(0, 8) 

  // 🧠 GOOGLE SHOPPING + AEO SCHEMA
  // Switched to 'ClothingStore' to unlock shopping rich snippets
// 🧠 HYBRID SUPER-SCHEMA (AEO + SEO Combined)
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ClothingStore', // 🛒 SEO: Triggers Google Shopping features
    '@id': 'https://www.genzverse.shop/#store', // 🧠 AEO: Persistent Entity ID
    name: 'GenZverse',
    url: 'https://www.genzverse.shop',
    logo: 'https://www.genzverse.shop/logo.jpg',
    description: 'Premium anime t shirts for men in India with hidden anime references and minimalist streetwear design.',
    
    // 📍 SEO: Local & Regional Signals
    areaServed: {
      '@type': 'Country',
      name: 'India'
    },
    priceRange: '₹₹', // 🛒 SEO: Mid-range pricing tier
    
    // 🚀 AEO: The "Brain" Keywords (The part you didn't want to lose!)
    knowsAbout: [
      "Anime T-shirts",
      "Anime streetwear",
      "Oversized t-shirts",
      "240 GSM cotton",
      "Anime fashion India"
    ],

    // 🔗 Connection to Brand Identity
    brand: {
      '@type': 'Brand',
      name: 'GenZverse',
      slogan: 'Wear what you felt, not what you saw'
    },

    // 📱 Social Proof
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

            {/* Changed grid gap for better mobile spacing if needed */}
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

        {/* Note: The visual AEO text section was moved to Footer.js as per previous steps */}

        <Testimonials />
      </main>
      
      <Footer />
    </>
  )
}