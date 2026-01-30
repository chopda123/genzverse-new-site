

// // app/products/page.js
// 'use client'
// import { useState, useMemo } from 'react'
// import Header from '../../components/Header'
// import ProductCard from '../../components/ProductCard'
// import Footer from '../../components/Footer'
// import { FiGrid, FiList, FiFilter, FiX } from 'react-icons/fi'
// import { products, categories } from '../../data/products'
// import { trackEvent } from '../../utils/analytics'

// export default function Products() {
//   const [viewMode, setViewMode] = useState('grid')
//   const [selectedCategory, setSelectedCategory] = useState('All')
//   const [showFilters, setShowFilters] = useState(false)
//   const [maxPrice, setMaxPrice] = useState(2999)
//   const [limitedEditionOnly, setLimitedEditionOnly] = useState(false)

//   const filteredProducts = useMemo(() => {
//     let filtered = products.filter(product => 
//       (selectedCategory === 'All' || product.category === selectedCategory) &&
//       product.price <= maxPrice &&
//       (!limitedEditionOnly || product.limitedEdition)
//     )
//     return filtered
//   }, [selectedCategory, maxPrice, limitedEditionOnly])

//   return (
//     <>
//       <Header />
//       <main className="min-h-screen">
//         {/* Hero Section - Mobile Optimized */}
//         <section className="pt-24 pb-16 md:pt-32 md:pb-20 bg-gradient-to-br from-dark-500 via-dark-400 to-dark-300">
//           <div className="container-custom text-center px-4">
//             <h1 className="text-3xl md:text-5xl font-heading font-bold mb-4 md:mb-6">
//               Anime <span className="text-gradient">Collection</span>
//             </h1>
//             <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto">
//              Anime streetwear — This isn't merch. It's identity
//             </p>
//           </div>
//         </section>

//         {/* Filters and Controls */}
//         <section className="section-padding bg-dark-400">
//           <div className="container-custom">
//             {/* Mobile Controls */}
//             <div className="flex items-center justify-between mb-6 md:hidden">
//               <button 
//                 onClick={() => setShowFilters(!showFilters)}
//                 className="flex items-center space-x-2 bg-dark-300 px-4 py-3 rounded-lg text-sm"
//               >
//                 <FiFilter className="w-4 h-4" />
//                 <span>Filters</span>
//               </button>
              
//               <div className="flex items-center space-x-1 bg-dark-300 p-1 rounded-lg">
//                 <button
//                   onClick={() => setViewMode('grid')}
//                   className={`p-2 rounded-md ${viewMode === 'grid' ? 'bg-accent-purple text-white' : 'text-gray-400'}`}
//                 >
//                   <FiGrid className="w-4 h-4" />
//                 </button>
//                 <button
//                   onClick={() => setViewMode('list')}
//                   className={`p-2 rounded-md ${viewMode === 'list' ? 'bg-accent-purple text-white' : 'text-gray-400'}`}
//                 >
//                   <FiList className="w-4 h-4" />
//                 </button>
//               </div>
//             </div>

//             <div className="flex flex-col md:flex-row gap-6 md:gap-8">
//               {/* Sidebar Filters */}
//               <div className={`${showFilters ? 'fixed inset-0 z-50 bg-dark-500' : 'hidden'} md:block md:w-1/4`}>
//                 <div className={`bg-dark-300 rounded-2xl p-6 h-full md:h-auto md:sticky md:top-32 ${showFilters ? 'absolute inset-4 overflow-y-auto' : ''}`}>
                  
//                   {/* Mobile Filter Header */}
//                   {showFilters && (
//                     <div className="flex items-center justify-between mb-6 md:hidden">
//                       <h2 className="text-xl font-heading font-bold">Filters</h2>
//                       <button 
//                         onClick={() => setShowFilters(false)}
//                         className="p-2 hover:bg-dark-400 rounded-lg"
//                       >
//                         <FiX className="w-5 h-5" />
//                       </button>
//                     </div>
//                   )}

//                   <div className="space-y-6">
//                     {/* Categories */}
//                     <div>
//                       <h3 className="font-heading font-bold text-lg mb-4">Categories</h3>
//                       <div className="space-y-2">
//                         {categories.map(category => (
//                           <button
//                             key={category}

//                            onClick={() => {
//   setSelectedCategory(category)
//   trackEvent('category_click', {
//     category_name: category,
//   })
//   if (window.innerWidth < 768) setShowFilters(false)
// }}

//                             className={`block w-full text-left px-3 py-3 rounded-lg transition-colors ${
//                               selectedCategory === category 
//                                 ? 'bg-accent-purple text-white' 
//                                 : 'text-gray-400 hover:text-white hover:bg-dark-400'
//                             }`}
//                           >
//                             {category}
//                           </button>
//                         ))}
//                       </div>
//                     </div>

//                     {/* Price Filter */}
//                     <div className="pt-4 border-t border-dark-200">
//                       <h3 className="font-heading font-bold text-lg mb-4">Price Range</h3>
//                       <div className="space-y-4">
//                         <div className="flex justify-between text-sm text-gray-400">
//                           <span>₹499</span>
//                           <span className="text-accent-purple font-semibold">₹{maxPrice}</span>
//                           <span>₹2999</span>
//                         </div>
//                         <input 
//                           type="range" 
//                           min="499" 
//                           max="2999" 
//                           value={maxPrice}
//                           onChange={(e) => setMaxPrice(Number(e.target.value))}
//                           className="w-full h-2 bg-dark-400 rounded-lg appearance-none cursor-pointer accent-accent-purple"
//                         />
//                       </div>
//                     </div>

//                     {/* Limited Edition Filter */}
//                     {/* <div className="pt-4 border-t border-dark-200">
//                       <label className="flex items-center space-x-3 cursor-pointer">
//                         <input 
//                           type="checkbox" 
//                           checked={limitedEditionOnly}
//                           onChange={(e) => setLimitedEditionOnly(e.target.checked)}
//                           className="rounded bg-dark-400 border-dark-200 text-accent-purple focus:ring-accent-purple w-5 h-5" 
//                         />
//                         <span className="text-gray-400">Limited Edition Only</span>
//                       </label>
//                     </div> */}

//                     {/* Mobile Apply Button */}
//                     {showFilters && (
//                       <div className="pt-6 border-t border-dark-200 md:hidden">
//                         <button
//                           onClick={() => setShowFilters(false)}
//                           className="w-full bg-accent-purple text-white py-3 rounded-lg font-semibold"
//                         >
//                           Apply Filters
//                         </button>
//                       </div>
//                     )}
//                   </div>
//                 </div>
//               </div>

//               {/* Products Section */}
//               <div className="md:w-3/4">
//                 {/* Desktop Controls */}
//                 <div className="hidden md:flex items-center justify-between mb-6">
//                   <p className="text-gray-400">
//                     Showing {filteredProducts.length} products
//                   </p>
//                   <div className="flex items-center space-x-4">
//                     <select className="bg-dark-300 border-dark-200 rounded-lg px-3 py-2 text-white">
//                       <option>Sort by: Newest</option>
//                       <option>Sort by: Price Low to High</option>
//                       <option>Sort by: Price High to Low</option>
//                     </select>
                    
//                     <div className="flex items-center space-x-1 bg-dark-300 p-1 rounded-lg">
//                       <button
//                         onClick={() => setViewMode('grid')}
//                         className={`p-2 rounded-md ${viewMode === 'grid' ? 'bg-accent-purple text-white' : 'text-gray-400'}`}
//                       >
//                         <FiGrid className="w-4 h-4" />
//                       </button>
//                       <button
//                         onClick={() => setViewMode('list')}
//                         className={`p-2 rounded-md ${viewMode === 'list' ? 'bg-accent-purple text-white' : 'text-gray-400'}`}
//                       >
//                         <FiList className="w-4 h-4" />
//                       </button>
//                     </div>
//                   </div>
//                 </div>

//                 {/* Products Count - Mobile */}
//                 <div className="md:hidden mb-4">
//                   <p className="text-gray-400 text-sm">
//                     {filteredProducts.length} products found
//                   </p>
//                 </div>

//                 {/* Products Grid/List */}
//                 <div className={
//                   viewMode === 'grid' 
//                     ? 'grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6' 
//                     : 'grid grid-cols-1 gap-4 md:gap-6'
//                 }>
//                   {filteredProducts.map(product => (
//                     <ProductCard 
//                       key={product.id} 
//                       product={product}
//                       layout={viewMode}
//                     />
//                   ))}
//                 </div>

//                 {/* No Results */}
//                 {filteredProducts.length === 0 && (
//                   <div className="text-center py-12">
//                     <div className="text-gray-400 text-lg mb-4">No products found</div>
//                     <button 
//                       onClick={() => {
//                         setSelectedCategory('All')
//                         setMaxPrice(2999)
//                         setLimitedEditionOnly(false)
//                       }}
//                       className="btn-primary"
//                     >
//                       Reset Filters
//                     </button>
//                   </div>
//                 )}

//                 {/* Load More */}
//                 {filteredProducts.length > 0 && (
//                   <div className="text-center mt-8 md:mt-12">
//                     <button className="btn-secondary py-3 px-8 text-sm md:text-base">
//                       Load More Products
//                     </button>
//                   </div>
//                 )}
//               </div>
//             </div>
//           </div>
//         </section>
//       </main>
//       <Footer />
//     </>
//   )
// }





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