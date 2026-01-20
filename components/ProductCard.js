

// components/ProductCard.js
'use client'
import { useState, useRef, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { FiStar, FiShoppingCart } from 'react-icons/fi'
import { trackEvent } from '../utils/analytics' // ✅ Import added

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
  category: product.category,
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
    return () => {
      if (touchTimerRef.current) {
        clearTimeout(touchTimerRef.current)
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
        <img
          src={product.images?.[0] || 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500&h=600&fit=crop'}
          alt={product.name}
          className={`w-full h-full object-cover transition-opacity duration-500 ${
            (isHovering || isTouching) && product.images?.length > 1 ? 'opacity-0' : 'opacity-100'
          }`}
        />
        
        {/* Second Image - Shows on hover/touch */}
        {product.images?.length > 1 && (
          <img
            src={product.images[1]}
            alt={`${product.name} - Alternate view`}
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${
              (isHovering || isTouching) ? 'opacity-100' : 'opacity-0'
            }`}
          />
        )}
        
        {/* Badges */}
        <div className="absolute top-2 left-2 flex flex-col space-y-1">
          {product.isNew && (
            <span className="bg-accent-cyan text-dark-500 text-[9px] md:text-xs font-bold px-1 md:px-2 py-0.5 md:py-1 rounded-full">
              NEW
            </span>
          )}
          {product.isLimited && (
            <span className="bg-accent-pink text-white text-[9px] md:text-xs font-bold px-1 md:px-2 py-0.5 md:py-1 rounded-full">
              LIMITED
            </span>
          )}
        </div>

        {/* Touch/Hover Indicator */}
        {product.images?.length > 1 && (
          <div className={`absolute bottom-2 left-2 bg-dark-400/80 backdrop-blur-sm rounded-full px-1.5 py-0.5 text-[9px] md:text-xs text-gray-300 transition-opacity duration-300 ${
            (isHovering || isTouching) ? 'opacity-100' : 'opacity-0'
          }`}>
            {typeof window !== 'undefined' && 'ontouchstart' in window ? 'Tap & hold to view' : 'Hover to view'}
          </div>
        )}
      </div>

      {/* Product Info */}
      <div className="p-4">
        <div className="flex items-start justify-between mb-2">
          <h3 className="font-medium text-white group-hover:text-accent-purple transition-colors duration-200 line-clamp-1 text-sm md:text-base">
            {product.name}
          </h3>
          <div className="flex items-center space-x-1">
            <FiStar className="w-3 h-3 text-yellow-400 fill-current" />
            <span className="text-xs text-gray-400">{product.rating}</span>
          </div>
        </div>
        
        {/* Description */}
        <p className="text-gray-400 text-xs md:text-sm mb-3 line-clamp-2 leading-relaxed">
          {product.description}
        </p>

        <div className="flex items-center justify-between">
          {/* Price Section */}
          <div className="flex flex-col">
            <span className="text-base md:text-lg font-bold text-white">₹{product.price}</span>
            {product.originalPrice && (
              <span className="text-xs md:text-sm text-gray-500 line-through mt-1">₹{product.originalPrice}</span>
            )}
          </div>
          





          <button
  onClick={handleBuyClick}
  className="
    bg-accent-purple hover:bg-accent-purple/85 text-white
    rounded-md
    h-8 md:h-9
    px-2.5 md:px-3.5
    flex items-center justify-center gap-1.5
    text-xs md:text-sm font-medium
    transition-colors duration-200
    shrink-0
  "
>
  <FiShoppingCart className="w-3.5 h-3.5 md:w-4 md:h-4" />

  {/* Text auto-adjust */}
  <span className="hidden xs:inline">Shop Now</span>
  <span className="xs:hidden">Shop</span>
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