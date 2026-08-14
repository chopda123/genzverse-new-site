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
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [showFilters, setShowFilters] = useState(false)
  const [maxPrice, setMaxPrice] = useState(2999)
  const [limitedEditionOnly, setLimitedEditionOnly] = useState(false)
  const [sortBy, setSortBy] = useState('newest')

  // Read ?category=slug from URL to support deep-linking from homepage cards
  useEffect(() => {
    const categoryParam = searchParams.get('category')
    if (categoryParam) {
      const validSlugs = categories.map(c => c.slug)
      if (validSlugs.includes(categoryParam)) {
        setSelectedCategory(categoryParam)
      }
    }
  }, [searchParams])

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
    <section className="section-padding bg-dark-400">
      <div className="container-custom">
        {/* Mobile Controls */}
        <div className="flex items-center justify-between mb-6 md:hidden">
          <button 
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center space-x-2 bg-dark-300 px-4 py-3 rounded-lg text-sm"
          >
            <FiFilter className="w-4 h-4" />
            <span>Filters</span>
          </button>
          
          <div className="flex items-center space-x-1 bg-dark-300 p-1 rounded-lg">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded-md ${viewMode === 'grid' ? 'bg-accent-purple text-white' : 'text-gray-400'}`}
            >
              <FiGrid className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 rounded-md ${viewMode === 'list' ? 'bg-accent-purple text-white' : 'text-gray-400'}`}
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
                className={`flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 whitespace-nowrap ${
                  selectedCategory === category.slug
                    ? 'bg-accent-purple text-white shadow-lg shadow-accent-purple/25'
                    : 'bg-dark-300 text-gray-400'
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-6 md:gap-8">
          {/* Sidebar Filters */}
          <div className={`${showFilters ? 'fixed inset-0 z-50 bg-dark-500' : 'hidden'} md:block md:w-1/4`}>
            <div className={`bg-dark-300 rounded-2xl p-6 h-full md:h-auto md:sticky md:top-32 ${showFilters ? 'absolute inset-4 overflow-y-auto' : ''}`}>
              
              {/* Mobile Filter Header */}
              {showFilters && (
                <div className="flex items-center justify-between mb-6 md:hidden">
                  <h2 className="text-xl font-heading font-bold">Filters</h2>
                  <button 
                    onClick={() => setShowFilters(false)}
                    className="p-2 hover:bg-dark-400 rounded-lg"
                  >
                    <FiX className="w-5 h-5" />
                  </button>
                </div>
              )}

              <div className="space-y-6">
                {/* Categories */}
                <div>
                  <h3 className="font-heading font-bold text-lg mb-4">Categories</h3>
                  <div className="space-y-2">
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
                        className={`block w-full text-left px-3 py-3 rounded-lg transition-colors ${
                          selectedCategory === category.slug 
                            ? 'bg-accent-purple text-white' 
                            : 'text-gray-400 hover:text-white hover:bg-dark-400'
                        }`}
                      >
                        {category.name}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Price Filter */}
                <div className="pt-4 border-t border-dark-200">
                  <h3 className="font-heading font-bold text-lg mb-4">Price Range</h3>
                  <div className="space-y-4">
                    <div className="flex justify-between text-sm text-gray-400">
                      <span>₹499</span>
                      <span className="text-accent-purple font-semibold">₹{maxPrice}</span>
                      <span>₹2999</span>
                    </div>
                    <input 
                      type="range" 
                      min="499" 
                      max="2999" 
                      value={maxPrice}
                      onChange={(e) => setMaxPrice(Number(e.target.value))}
                      className="w-full h-2 bg-dark-400 rounded-lg appearance-none cursor-pointer accent-accent-purple"
                    />
                  </div>
                </div>

                {/* Limited Edition Filter - Kept as is (Commented out in original) */}
                {/* <div className="pt-4 border-t border-dark-200">
                  <label className="flex items-center space-x-3 cursor-pointer">
                    <input 
                      type="checkbox" 
                      checked={limitedEditionOnly}
                      onChange={(e) => setLimitedEditionOnly(e.target.checked)}
                      className="rounded bg-dark-400 border-dark-200 text-accent-purple focus:ring-accent-purple w-5 h-5" 
                    />
                    <span className="text-gray-400">Limited Edition Only</span>
                  </label>
                </div> */}

                {/* Mobile Apply Button */}
                {showFilters && (
                  <div className="pt-6 border-t border-dark-200 md:hidden">
                    <button
                      onClick={() => setShowFilters(false)}
                      className="w-full bg-accent-purple text-white py-3 rounded-lg font-semibold"
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
              <p className="text-gray-400">
                Showing {filteredProducts.length} products
              </p>
              <div className="flex items-center space-x-4">
                <select 
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="bg-dark-300 border-dark-200 rounded-lg px-3 py-2 text-white"
                >
                  <option value="newest">Sort by: Newest</option>
                  <option value="price-low">Sort by: Price Low to High</option>
                  <option value="price-high">Sort by: Price High to Low</option>
                </select>
                
                <div className="flex items-center space-x-1 bg-dark-300 p-1 rounded-lg">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`p-2 rounded-md ${viewMode === 'grid' ? 'bg-accent-purple text-white' : 'text-gray-400'}`}
                  >
                    <FiGrid className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={`p-2 rounded-md ${viewMode === 'list' ? 'bg-accent-purple text-white' : 'text-gray-400'}`}
                  >
                    <FiList className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Products Count - Mobile */}
            <div className="md:hidden mb-4">
              <p className="text-gray-400 text-sm">
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