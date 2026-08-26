// components/ProductFeed.js
'use client'

import { useState, useMemo, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import { FiGrid, FiList, FiFilter, FiX } from 'react-icons/fi'
import ProductCard from './ProductCard'
import CategoryComingSoon from './CategoryComingSoon'
import { categories } from '../data/products'
import { trackEvent } from '../utils/analytics'

export default function ProductFeed({ products }) {
  const searchParams = useSearchParams()
  const [viewMode, setViewMode] = useState('grid')
  const categoryParam = searchParams.get('category')
  const [internalCategory, setInternalCategory] = useState(null)
  const selectedCategory = internalCategory ?? (categoryParam && categories.some(c => c.slug === categoryParam) ? categoryParam : 'all')
  const setSelectedCategory = (cat) => setInternalCategory(cat)
  const [showFilters, setShowFilters] = useState(false)
  const [maxPrice, setMaxPrice] = useState(2999)
  const [limitedEditionOnly, setLimitedEditionOnly] = useState(false)
  const [sortBy, setSortBy] = useState('newest')

//   const filteredProducts = useMemo(() => {
//     let filtered = products.filter(product => 
//       (selectedCategory === 'All' || product.category === selectedCategory) &&
//       product.price <= maxPrice &&
//       (!limitedEditionOnly || product.limitedEdition)
//     )
//     return filtered
//   }, [selectedCategory, maxPrice, limitedEditionOnly, products])

// components/ProductFeed.js

const filteredProducts = useMemo(() => {
  let filtered = products.filter(product => {
    const categoryMatch = selectedCategory === 'all' || (product.categories && product.categories.includes(selectedCategory));
    const priceMatch = product.price <= maxPrice;
    const limitedMatch = !limitedEditionOnly || product.isLimited;

    return categoryMatch && priceMatch && limitedMatch;
  });

  // Apply sorting
  if (sortBy === 'price-low') {
    filtered.sort((a, b) => a.price - b.price);
  } else if (sortBy === 'price-high') {
    filtered.sort((a, b) => b.price - a.price);
  }
  // 'newest' keeps the default order from the data file

  return filtered;
}, [selectedCategory, maxPrice, limitedEditionOnly, sortBy, products]);

  return (
    <section className="section-padding bg-[#F5F2EC]">
      <div className="container-custom">
        {/* Mobile Controls */}
        <div className="flex items-center justify-between mb-6 md:hidden">
          <button 
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center space-x-2 bg-white border border-[#ded7c8] px-4 py-3 rounded-xl text-sm font-semibold text-slate-800 shadow-sm hover:border-purple-400"
          >
            <FiFilter className="w-4 h-4 text-purple-600" />
            <span>Filters</span>
          </button>
          
          <div className="flex items-center space-x-1 bg-white border border-[#ded7c8] p-1 rounded-xl shadow-sm">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded-lg transition-colors ${viewMode === 'grid' ? 'bg-accent-purple text-white shadow-sm' : 'text-slate-400 hover:text-slate-700'}`}
              aria-label="Grid view"
            >
              <FiGrid className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 rounded-lg transition-colors ${viewMode === 'list' ? 'bg-accent-purple text-white shadow-sm' : 'text-slate-400 hover:text-slate-700'}`}
              aria-label="List view"
            >
              <FiList className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Mobile Category Strip */}
        <div className="md:hidden mb-4 overflow-x-auto no-scrollbar">
          <div className="flex gap-2 pb-1">
            {categories.map(category => (
              <button
                key={`strip-${category.slug}`}
                onClick={() => {
                  setSelectedCategory(category.slug)
                  trackEvent('category_click', { category_name: category.name })
                }}
                className={`flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 whitespace-nowrap bg-white text-slate-800 shadow-sm ${
                  selectedCategory === category.slug
                    ? 'border-2 border-accent-purple text-slate-900 font-semibold'
                    : 'border border-[#ded7c8] hover:border-purple-300'
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-6 md:gap-8">
          {/* Sidebar Filters */}
          <div className={`${showFilters ? 'fixed inset-0 z-50 bg-black/60 backdrop-blur-sm' : 'hidden'} md:block md:w-1/4`}>
            <div className={`bg-white border border-[#ded7c8] rounded-2xl p-6 shadow-sm h-full md:h-auto md:sticky md:top-28 ${showFilters ? 'absolute inset-4 overflow-y-auto' : ''}`}>
              
              {/* Mobile Filter Header */}
              {showFilters && (
                <div className="flex items-center justify-between mb-6 md:hidden">
                  <h2 className="text-xl font-heading font-bold text-slate-900">Filters</h2>
                  <button 
                    onClick={() => setShowFilters(false)}
                    className="p-2 hover:bg-slate-100 rounded-lg text-slate-700"
                    aria-label="Close filters"
                  >
                    <FiX className="w-5 h-5" />
                  </button>
                </div>
              )}

              <div className="space-y-6">
                {/* Categories */}
                <div>
                  <h3 className="font-heading font-bold text-base uppercase tracking-wider text-slate-900 mb-3">Categories</h3>
                  <div className="space-y-1.5">
                    {categories.map(category => (
                      <button
                        key={category.slug}
                        onClick={() => {
                          setSelectedCategory(category.slug)
                          trackEvent('category_click', {
                            category_name: category.name,
                          })
                          if (window.innerWidth < 768) setShowFilters(false)
                        }}
                        className={`block w-full text-left px-3.5 py-2.5 rounded-xl transition-all duration-200 text-sm ${
                          selectedCategory === category.slug 
                            ? 'bg-accent-purple text-white font-semibold shadow-sm' 
                            : 'text-slate-700 hover:text-purple-700 hover:bg-[#F5F2EC] font-medium'
                        }`}
                      >
                        {category.name}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Price Filter */}
                <div className="pt-4 border-t border-[#ded7c8]">
                  <h3 className="font-heading font-bold text-base uppercase tracking-wider text-slate-900 mb-3">Price Range</h3>
                  <div className="space-y-4">
                    <div className="flex justify-between text-xs font-semibold text-slate-500">
                      <span>₹499</span>
                      <span className="text-purple-700 font-bold text-sm">₹{maxPrice}</span>
                      <span>₹2999</span>
                    </div>
                    <input 
                      type="range" 
                      min="499" 
                      max="2999" 
                      value={maxPrice}
                      onChange={(e) => setMaxPrice(Number(e.target.value))}
                      className="w-full h-2 bg-[#eae5db] rounded-lg appearance-none cursor-pointer accent-accent-purple"
                    />
                  </div>
                </div>

                {/* Mobile Apply Button */}
                {showFilters && (
                  <div className="pt-6 border-t border-[#ded7c8] md:hidden">
                    <button
                      onClick={() => setShowFilters(false)}
                      className="w-full bg-gradient-to-r from-accent-purple to-accent-pink hover:from-accent-pink hover:to-accent-purple text-white py-3 rounded-xl font-heading font-bold shadow-md shadow-purple-500/25"
                    >
                      Apply Filters
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Products Section */}
          <div className="md:w-3/4">
            {/* Desktop Controls */}
            <div className="hidden md:flex items-center justify-between mb-6">
              <p className="text-slate-600 font-medium text-sm">
                Showing {filteredProducts.length} products
              </p>
              <div className="flex items-center space-x-4">
                <select 
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="bg-white border border-[#ded7c8] rounded-xl px-3.5 py-2 text-slate-800 text-sm shadow-sm focus:outline-none focus:border-accent-purple font-medium"
                >
                  <option value="newest">Sort by: Newest</option>
                  <option value="price-low">Sort by: Price Low to High</option>
                  <option value="price-high">Sort by: Price High to Low</option>
                </select>
                
                <div className="flex items-center space-x-1 bg-white border border-[#ded7c8] p-1 rounded-xl shadow-sm">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`p-2 rounded-lg transition-colors ${viewMode === 'grid' ? 'bg-accent-purple text-white shadow-sm' : 'text-slate-400 hover:text-slate-700'}`}
                    aria-label="Grid view"
                  >
                    <FiGrid className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={`p-2 rounded-lg transition-colors ${viewMode === 'list' ? 'bg-accent-purple text-white shadow-sm' : 'text-slate-400 hover:text-slate-700'}`}
                    aria-label="List view"
                  >
                    <FiList className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Products Count - Mobile */}
            <div className="md:hidden mb-4">
              <p className="text-slate-600 text-sm font-medium">
                {filteredProducts.length} products found
              </p>
            </div>

            {/* Products Grid/List */}
            <div className={
              viewMode === 'grid' 
                ? 'grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6' 
                : 'grid grid-cols-1 gap-4 md:gap-6'
            }>
              {filteredProducts.map(product => (
                <ProductCard 
                  key={product.id} 
                  product={product}
                  layout={viewMode}
                />
              ))}
            </div>

            {/* No Results — Coming Soon */}
            {filteredProducts.length === 0 && (
              <CategoryComingSoon slug={selectedCategory} />
            )}


          </div>
        </div>
      </div>
    </section>
  )
}