

// components/ProductCard.js
'use client'
import { useState, useRef, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { FiStar, FiShoppingCart } from 'react-icons/fi'
import { trackEvent } from '../utils/analytics' // ✅ Import added
import Image from 'next/image' // 👈 1. IMPORT THIS

export default function ProductCard({ product }) {
  const [currentImage, setCurrentImage] = useState(0)
  const [isHovering, setIsHovering] = useState(false)
  const [isTouching, setIsTouching] = useState(false)
  const touchTimerRef = useRef(null)
  const router = useRouter()

  const handleCardClick = () => {
    trackEvent('product_card_click', {
  product_id: product.id,
  product_name: product.name,
  categories: product.categories,
})

    // Don't navigate if we're in the middle of image switching
    if (!isTouching) {
      router.push(`/products/${product.slug}`)
    }
  }

  const handleBuyClick = (e) => {
    e.stopPropagation()
    router.push(`/products/${product.slug}`)
  }

  // Desktop hover handlers
  const handleMouseEnter = () => {
    setIsHovering(true)
    if (product.images?.length > 1) {
      setCurrentImage(1)
    }
  }

  const handleMouseLeave = () => {
    setIsHovering(false)
    setCurrentImage(0)
  }

  // Mobile touch handlers for image area only
  const handleImageTouchStart = (e) => {
    e.stopPropagation() // Prevent card click
    setIsTouching(true)
    
    // Switch to second image
    if (product.images?.length > 1) {
      setCurrentImage(1)
    }
  }

  const handleImageTouchEnd = (e) => {
    e.stopPropagation() // Prevent card click
    setIsTouching(false)
    
    // Switch back to first image after a small delay
    setTimeout(() => {
      if (product.images?.length > 1) {
        setCurrentImage(0)
      }
    }, 500)
  }

  // Handle touch on the rest of the card (non-image area)
  const handleCardTouchStart = () => {
    setIsTouching(false) // Ensure navigation happens
  }

  // Cleanup
  useEffect(() => {
    const timer = touchTimerRef.current
    return () => {
      if (timer) {
        clearTimeout(timer)
      }
    }
  }, [])

  return (
    <div 
      className="group bg-dark-400 rounded-2xl overflow-hidden border border-dark-300 hover:border-accent-purple/50 transition-all duration-300 hover:transform hover:scale-[1.02] cursor-pointer"
      onClick={handleCardClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onTouchStart={handleCardTouchStart}
    >
      {/* Product Image - Separate touch handlers for image only */}
      <div 
        className="relative aspect-[3/4] overflow-hidden bg-dark-300"
        onTouchStart={handleImageTouchStart}
        onTouchEnd={handleImageTouchEnd}
      >
        {/* First Image */}
      {/* Main Image */}
        <Image
          src={product.images?.[0] || '/placeholder.png'} // Ensure you have a local placeholder or use the external link
          alt={product.anime ? `${product.name} – ${product.anime} inspired anime T-shirt by GenZverse` : `${product.name} – anime T-shirt by GenZverse`}
          fill // 👈 Automatically fills the container
          sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw" // 👈 CRITICAL: Tells browser to download small versions on mobile
          className={`object-cover transition-opacity duration-500 ${
            (isHovering || isTouching) && product.images?.length > 1 ? 'opacity-0' : 'opacity-100'
          }`}
          priority={false} // Lazy load
        />
        
        {/* Hover Image (Only render if it exists) */}
        {product.images?.length > 1 && (
          <Image
            src={product.images[1]}
            alt={`${product.name} – back view anime T-shirt`}
            fill
            sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
            className={`object-cover transition-opacity duration-500 ${
              (isHovering || isTouching) ? 'opacity-100' : 'opacity-0'
            }`}
          />
        )}
        
        {/* Badges */}
        <div className="absolute top-1.5 left-1.5 flex flex-col gap-1">
          {product.isNew && (
            <span className="bg-white text-dark-500 text-[9px] md:text-[11px] lg:text-xs font-bold leading-none px-1 py-0.5 rounded">
              NEW
            </span>
          )}
          {product.isLimited && (
            <span className="bg-accent-purple text-white text-[9px] md:text-[11px] lg:text-xs font-bold leading-none px-1 py-0.5 rounded">
              LIMITED
            </span>
          )}
          {product.showDiscount && product.originalPrice && product.originalPrice > product.price && (
            <span className="bg-red-500 text-white text-[9px] md:text-[11px] lg:text-xs font-bold leading-none px-1 py-0.5 rounded">
              {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
            </span>
          )}
        </div>

        {/* Touch/Hover Indicator */}
        {product.images?.length > 1 && (
          <div className={`absolute bottom-2 left-2 bg-dark-400/80 backdrop-blur-sm rounded-full px-1.5 py-0.5 text-[9px] md:text-xs text-gray-300 transition-opacity duration-300 ${
            (isHovering || isTouching) ? 'opacity-100' : 'opacity-0'
          }`}>
            Preview
          </div>
        )}
      </div>

      {/* Product Info */}
      <div className="p-3 sm:p-3.5">
        {/* Title + Rating Row */}
        <div className="flex items-center justify-between gap-2 mb-1.5">
          <h3 className="font-semibold text-white group-hover:text-accent-purple transition-colors duration-200 line-clamp-1 text-xs sm:text-sm md:text-base tracking-tight">
            {product.name}
          </h3>
          <div className="flex items-center space-x-1 flex-shrink-0">
            <FiStar className="w-3 h-3 text-amber-400 fill-amber-400" />
            <span className="text-[11px] sm:text-xs text-gray-400 font-medium">{product.rating}</span>
          </div>
        </div>
        
        {/* Description */}
        <p className="text-gray-400 text-[11px] sm:text-xs mb-2.5 line-clamp-1 leading-normal font-normal">
          {Array.isArray(product.description)
            ? product.description.join(' ')
            : product.description}
        </p>

        {/* Unified Price + CTA Row */}
        <div className="flex items-center justify-between gap-2 pt-0.5">
          {/* Price Section */}
          <div className="flex items-baseline gap-1.5 min-w-0">
            <span className="text-sm sm:text-base md:text-lg font-bold text-white tracking-tight">
              ₹{product.price}
            </span>
            {product.originalPrice && product.originalPrice > product.price && (
              <span className="text-[11px] sm:text-xs text-gray-500 line-through font-normal">
                ₹{product.originalPrice}
              </span>
            )}
          </div>

          {/* Shop Now CTA */}
          <button
            onClick={handleBuyClick}
            className="
              bg-gradient-to-r from-accent-purple to-accent-pink
              hover:from-accent-pink hover:to-accent-purple
              text-white
              rounded-lg
              h-7 sm:h-8 md:h-8.5
              px-2.5 sm:px-3
              flex items-center justify-center gap-1.5
              text-[11px] sm:text-xs font-semibold
              shadow-sm shadow-purple-500/20
              hover:shadow-md hover:shadow-purple-500/30
              transition-all duration-200
              shrink-0
              active:scale-95
            "
          >
            <FiShoppingCart className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
            <span className="hidden sm:inline">Shop Now</span>
            <span className="sm:hidden">Shop</span>
          </button>
        </div>






        {/* Size and Color Info */}
        {/* <div className="flex items-center justify-between mt-3 text-xs text-gray-400">
          <span>{product.sizes?.length || 3} sizes</span>
          <span>{product.colors?.length || 2} colors</span>
        </div> */}

        {/* Stock Indicator */}
        {/* {product.stock < 10 && (
          <div className="mt-3">
            <div className="flex items-center justify-between text-xs text-gray-400 mb-1">
              <span>Almost gone!</span>
              <span>{product.stock} left</span>
            </div>
            <div className="w-full bg-dark-300 rounded-full h-1">
              <div 
                className="bg-accent-pink h-1 rounded-full transition-all duration-500"
                style={{ width: `${(product.stock / 20) * 100}%` }}
              ></div>
            </div>
          </div>
        )} */}


      </div>
    </div>
  )
}