

// components/ProductDetails.js
'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { useCart } from '../context/CartContext';
import { useRouter } from 'next/navigation';
import { FiShoppingCart, FiCheck, FiArrowLeft, FiStar, FiTruck, FiShield, FiRotateCcw, FiHeart, FiChevronLeft, FiChevronRight, FiX } from 'react-icons/fi';
import { trackEvent } from '../utils/analytics'; // ✅ Import added
import SocialShare from './SocialShare';
import Image from 'next/image';

export default function ProductDetails({ product }) {
  const [selectedSize, setSelectedSize] = useState(product?.sizes?.[0] || 'M');
  const [selectedColor, setSelectedColor] = useState(product?.colors?.[0] || 'Black');
  const [currentImage, setCurrentImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [isLiked, setIsLiked] = useState(false);
  const [isSticky, setIsSticky] = useState(false);
  const [showSizeGuide, setShowSizeGuide] = useState(false);
  const [showGallery, setShowGallery] = useState(false);

  // Pinch-to-zoom state for fullscreen gallery
  const [scale, setScale] = useState(1);
  const [panX, setPanX] = useState(0);
  const [panY, setPanY] = useState(0);
  const pinchRef = useRef({ dist: 0, startScale: 1, startPanX: 0, startPanY: 0, mx: 0, my: 0, touching: false });
  const galleryImgRef = useRef(null);

  // Touch swipe state for fullscreen gallery
  const swipeRef = useRef({ startX: 0, startY: 0 });

  const resetZoom = useCallback(() => {
    setScale(1);
    setPanX(0);
    setPanY(0);
  }, []);
  const { addToCart } = useCart();
  const router = useRouter();

  // Mobile image swipe functionality
  const handleSwipe = (direction) => {
    if (direction === 'left') {
      setCurrentImage(prev => (prev + 1) % product.images.length);
    } else {
      setCurrentImage(prev => (prev - 1 + product.images.length) % product.images.length);
    }
  };

  // Sticky header on scroll for mobile
  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY > 100);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const formattedPrice = (price) =>
    new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(price);

  const handleAddToCart = () => {
    const cartItem = {
      ...product,
      size: selectedSize,
      color: selectedColor,
      quantity: quantity
    };

    addToCart(cartItem);

    // ✅ STEP 4 — TRACK ADD TO CART
  trackEvent('add_to_cart', {
  currency: 'INR',
  value: product.price * quantity,
  items: [{
    item_id: product.id,
    item_name: product.name,
    item_category: product.categories?.join(', '),
    price: product.price,
    quantity: quantity,
  }]
})
  };

  const handleBuyNow = () => {
    const cartItem = {
      ...product,
      size: selectedSize,
      color: selectedColor,
      quantity: quantity
    };

    addToCart(cartItem);

    // ✅ STEP 5 — TRACK BUY NOW
    trackEvent('buy_now_click', {
        currency: 'INR',
  value: product.price * quantity,
  items: [
    {
      item_id: product.id,
      item_name: product.name,
      item_category: product.categories?.join(', '),
      price: product.price,
      quantity: quantity,
    }
  ]
    });

    router.push('/checkout');
  };

  if (!product) {
    return (
      <div className="min-h-screen bg-dark-500 text-white pt-20">
        <div className="container-custom text-center py-20">
          <h1 className="text-2xl font-bold text-white mb-4">Product not found</h1>
          <button 
            onClick={() => router.back()}
            className="btn-primary mt-4"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-dark-500 text-white">
      {/* Sticky Mobile Header */}
      <div className={`lg:hidden fixed top-0 left-0 right-0 bg-dark-500/95 backdrop-blur-md z-40 transition-all duration-300 ${isSticky ? 'py-3 shadow-lg' : 'py-4'} border-b border-dark-300`}>
        <div className="container-custom">
          <div className="flex items-center justify-between">
            <button 
              onClick={() => router.back()} 
              className="p-2 hover:text-accent-purple transition-colors"
            >
              <FiArrowLeft className="w-5 h-5" />
            </button>
            
            <h1 className="text-sm font-medium text-white truncate max-w-[200px]">
              {product.name}
            </h1>
            
            <button
              onClick={() => setIsLiked(!isLiked)}
              className="p-2 hover:text-accent-pink transition-colors"
            >
              <FiHeart className={`w-5 h-5 ${isLiked ? 'fill-accent-pink text-accent-pink' : 'text-gray-400'}`} />
            </button>
          </div>
        </div>
      </div>

      <div className="pt-16 lg:pt-32 pb-20 lg:pb-20">
        <div className="container-custom">
          {/* Desktop Breadcrumb - Hidden on mobile */}
          <nav className="hidden lg:flex items-center space-x-2 text-sm text-gray-400 mb-8">
            <button 
              onClick={() => router.back()} 
              className="flex items-center space-x-1 hover:text-accent-purple transition-colors duration-200"
            >
              <FiArrowLeft className="w-4 h-4" />
              <span>Back to Collection</span>
            </button>
            <span>•</span>
            <span className="text-accent-purple">{product.name}</span>
          </nav>

          <div className="flex flex-col lg:grid lg:grid-cols-2 lg:gap-16">
            {/* Product Images - Mobile First */}
            <div className="lg:space-y-6 mb-6 lg:mb-0">
              {/* Main Image with Swipe Controls — tap opens fullscreen */}
              <div
                className="relative bg-dark-400 rounded-2xl overflow-hidden border border-dark-300 aspect-[3/4] mb-4 lg:mb-0 cursor-zoom-in"
                onClick={() => { setShowGallery(true); resetZoom(); }}
              >
               

                <Image 
  src={product.images?.[currentImage] || '/placeholder.png'} 
  alt={product.name}
  fill
  priority // ✅ Loads this image immediately (Critical for LCP score)
  sizes="(max-width: 1024px) 100vw, 50vw" 
  className="object-cover"
/>
                
                {/* Mobile Swipe Arrows */}
                <div className="lg:hidden absolute inset-0 flex items-center justify-between px-2">
                  <button
                    onClick={(e) => { e.stopPropagation(); handleSwipe('right'); }}
                    className="w-10 h-10 bg-dark-400/80 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-accent-purple transition-colors"
                  >
                    <FiChevronLeft className="w-5 h-5" />
                  </button>
                  <button
                    onClick={(e) => { e.stopPropagation(); handleSwipe('left'); }}
                    className="w-10 h-10 bg-dark-400/80 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-accent-purple transition-colors"
                  >
                    <FiChevronRight className="w-5 h-5" />
                  </button>
                </div>

                {/* Dot Indicators — Mobile */}
                <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-1.5 lg:hidden">
                  {product.images?.map((_, i) => (
                    <button
                      key={i}
                      onClick={(e) => { e.stopPropagation(); setCurrentImage(i); }}
                      className={`transition-all duration-300 rounded-full ${
                        i === currentImage
                          ? 'w-5 h-2 bg-white'
                          : 'w-2 h-2 bg-white/40'
                      }`}
                    />
                  ))}
                </div>

                {/* Badges - Mobile */}
                <div className="absolute top-4 left-4 flex flex-col space-y-2 lg:hidden">
                  {product.isNew && (
                    <span className="bg-accent-cyan text-dark-500 text-xs font-bold px-2 py-1 rounded-full">
                      NEW
                    </span>
                  )}
                  {product.isLimited && (
                    <span className="bg-accent-pink text-white text-xs font-bold px-2 py-1 rounded-full">
                      LIMITED
                    </span>
                  )}
                  {product.showDiscount && product.originalPrice && product.originalPrice > product.price && (
                    <span className="bg-emerald-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                      {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
                    </span>
                  )}
                </div>

                {/* Desktop Like Button */}
                <button
                  onClick={() => setIsLiked(!isLiked)}
                  className="hidden lg:block absolute top-4 right-4 p-3 bg-dark-400/80 backdrop-blur-sm rounded-full hover:bg-accent-pink/20 transition-colors duration-200 z-10"
                >
                  <FiHeart 
                    className={`w-5 h-5 ${isLiked ? 'fill-accent-pink text-accent-pink' : 'text-gray-400'}`} 
                  />
                </button>
              </div>

              {/* Image Thumbnails (Mobile + Desktop) */}
              <div className="image-thumbnails justify-center lg:justify-start">
               
              {product.images?.map((image, index) => (
  <button
    key={index}
    onClick={() => {
      setCurrentImage(index);
      trackEvent('product_image_click', {
        item_id: product.id,
        item_name: product.name,
        item_category: product.categories?.join(', '),
        image_index: index,
      });
    }}
    // Added 'relative' and 'overflow-hidden' to ensure Image fill works correctly
    className={`thumb relative overflow-hidden ${currentImage === index ? 'active' : ''}`}
  >
    <Image
      src={image}
      alt={`${product.name} preview ${index + 1}`}
      fill
      sizes="100px" // Thumbnails are small, we don't need full resolution
      className="object-cover"
    />
  </button>
))}  



              </div>
            </div>

            {/* Product Info - Mobile Optimized */}
            <div className="space-y-6 lg:space-y-8 px-4 lg:px-0">
              {/* Header with Badges - Desktop only */}
              <div className="hidden lg:block space-y-4">
                <div className="flex items-center space-x-3">
                  {product.isLimited && (
                    <span className="bg-accent-pink text-white text-sm font-bold px-3 py-1 rounded-full uppercase tracking-wide">
                      Limited Edition
                    </span>
                  )}
                  {product.isNew && (
                    <span className="bg-accent-cyan text-dark-500 text-sm font-bold px-3 py-1 rounded-full">
                      New Arrival
                    </span>
                  )}
                </div>

                <h1 className="text-3xl lg:text-5xl font-heading font-bold text-white leading-tight">
                  {product.name}
                </h1>

                {/* Rating */}
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-1">
                    {[...Array(5)].map((_, i) => (
                      <FiStar 
                        key={i}
                        className={`w-4 h-4 ${
                          i < Math.floor(product.rating) 
                            ? 'text-yellow-400 fill-current' 
                            : 'text-gray-600'
                        }`}
                      />
                    ))}
                    <span className="text-sm text-gray-400 ml-2">({product.rating})</span>
                  </div>
                  <span className="text-gray-600">•</span>
                  <span className="text-accent-cyan text-sm">{product.stock} pieces left</span>
                </div>
              </div>

              {/* Mobile Product Title */}
              <div className="lg:hidden space-y-3">
                <h1 className="text-2xl font-heading font-bold text-white leading-tight">
                  {product.name}
                </h1>
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-1">
                    {[...Array(5)].map((_, i) => (
                      <FiStar 
                        key={i}
                        className={`w-4 h-4 ${
                          i < Math.floor(product.rating) 
                            ? 'text-yellow-400 fill-current' 
                            : 'text-gray-600'
                        }`}
                      />
                    ))}
                    <span className="text-sm text-gray-400 ml-2">({product.rating})</span>
                  </div>
                  <span className="text-accent-cyan text-sm">{product.stock} left</span>
                </div>
              </div>

              {/* Price */}
              <div className="flex items-center space-x-4">
                <span className="text-2xl lg:text-3xl font-bold text-accent-purple">{formattedPrice(product.price)}</span>
                {product.originalPrice && (
                  <>
                    <span className="text-lg lg:text-xl text-gray-500 line-through">{formattedPrice(product.originalPrice)}</span>
                    <span className="bg-accent-pink text-white text-xs font-bold px-2 lg:px-3 py-1 rounded-full">
                      Save {formattedPrice(product.originalPrice - product.price)}
                    </span>
                    {product.showDiscount && (
                      <span className="bg-emerald-500 text-white text-xs font-bold px-2 lg:px-3 py-1 rounded-full">
                        {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
                      </span>
                    )}
                  </>
                )}
              </div>

              {/* Description */}
              <div>
                <h3 className="text-lg font-heading font-bold text-white mb-3">Description</h3>
                {Array.isArray(product.description) ? (
                  <div className="space-y-4">
                    {product.description.map((para, i) => (
                      <p key={i} className="text-gray-300 leading-relaxed text-base lg:text-lg">
                        {para}
                      </p>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-300 leading-relaxed text-base lg:text-lg">
                    {product.description}
                  </p>
                )}
                {/* <SocialShare product={product} /> */}
              </div>

              {/* Features */}
              {product.features && (
                <div>
                  <h3 className="text-lg font-heading font-bold text-white mb-3">Features</h3>
                  <ul className="grid grid-cols-1 gap-2">
                    {product.features.map((feature, index) => (
                      <li key={index} className="flex items-center space-x-2 text-gray-300">
                        <div className="w-1.5 h-1.5 bg-accent-purple rounded-full flex-shrink-0"></div>
                        <span className="text-sm lg:text-base">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Size Selection */}
              <div>
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-heading font-bold text-white">Select Size</h3>
                  <button 
                    onClick={() => setShowSizeGuide(true)}
                    className="text-sm text-gray-400 hover:text-accent-cyan transition-colors"
                  >
                    Size Guide
                  </button>
                </div>
                <div className="grid grid-cols-4 sm:grid-cols-5 gap-2 lg:gap-3">
                  {product.sizes?.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`py-3 lg:py-4 text-sm font-bold border-2 rounded-xl transition-all duration-200 ${
                        selectedSize === size
                          ? 'bg-accent-purple text-white border-accent-purple shadow-lg shadow-accent-purple/25'
                          : 'bg-dark-400 text-gray-400 border-dark-300 hover:border-accent-purple hover:text-white'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Color Selection */}
              {product.colors && (
                <div>
                  <h3 className="text-lg font-heading font-bold text-white mb-4">Select Color</h3>
                  <div className="flex flex-wrap gap-2 lg:gap-3">
                    {product.colors.map((color) => (
                      <button
                        key={color}
                        onClick={() => setSelectedColor(color)}
                        className={`px-4 lg:px-6 py-2 lg:py-3 text-sm font-medium border-2 rounded-xl transition-all duration-200 ${
                          selectedColor === color
                            ? 'bg-accent-purple/20 text-white border-accent-purple'
                            : 'bg-dark-400 text-gray-400 border-dark-300 hover:border-accent-purple hover:text-white'
                        }`}
                      >
                        {color}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Quantity */}
              <div>
                <h3 className="text-lg font-heading font-bold text-white mb-4">Quantity</h3>
                <div className="flex items-center space-x-4 lg:space-x-6">
                  <div className="flex items-center space-x-3 bg-dark-400 border border-dark-300 rounded-xl px-4 py-3">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="text-gray-400 hover:text-white text-lg font-bold w-8 h-8 flex items-center justify-center transition-colors"
                    >
                      -
                    </button>
                    <span className="text-white font-medium text-lg w-8 text-center">{quantity}</span>
                    <button
                      onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                      className="text-gray-400 hover:text-white text-lg font-bold w-8 h-8 flex items-center justify-center transition-colors"
                    >
                      +
                    </button>
                  </div>
                  <span className="text-gray-400 text-sm">
                    Only {product.stock} items left
                  </span>
                </div>
              </div>

              {/* Action Buttons - Sticky on Mobile */}
              <div className="lg:space-y-4">
                {/* Mobile Sticky Buttons */}



                <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-dark-500 border-t border-dark-300 p-4 z-50">
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      onClick={handleBuyNow}
                      className="btn-primary text-sm py-3 font-heading font-semibold flex items-center justify-center gap-2"
                    >
                      <FiCheck className="w-4 h-4" />
                      <span>Shop Now</span>
                    </button>
                    
                    <button
                      onClick={handleAddToCart}
                     className="btn-secondary text-sm py-3 font-heading font-semibold flex items-center justify-center gap-2"
                    >
                      <FiShoppingCart className="w-4 h-4" />
                      <span>Add to Cart</span>
                    </button>
                  </div>
                </div>






                {/* Desktop Buttons */}
                <div className="hidden lg:flex flex-col space-y-4">
                  <button
                    onClick={handleBuyNow}
                    className="w-full btn-primary text-lg py-4 font-heading font-bold flex items-center justify-center space-x-3"
                  >
                    <FiCheck className="w-5 h-5" />
                    <span>Shop Now - {formattedPrice(product.price * quantity)}</span>
                  </button>
                  
                  <button
                    onClick={handleAddToCart}
                    className="w-full btn-secondary text-lg py-4 font-heading font-bold flex items-center justify-center space-x-3"
                  >
                    <FiShoppingCart className="w-5 h-5" />
                    <span>Add to Cart</span>
                  </button>
                </div>
              </div>

              {/* Trust Features */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-6 pt-6 lg:pt-8 border-t border-dark-300">
                <div className="flex items-center space-x-3 lg:space-x-4">
                  <div className="w-10 h-10 lg:w-12 lg:h-12 bg-accent-purple/20 rounded-xl flex items-center justify-center flex-shrink-0">
                    <FiTruck className="w-5 h-5 lg:w-6 lg:h-6 text-accent-cyan" />
                  </div>
                  <div>
                    <div className="font-medium text-white text-sm lg:text-base">Free Shipping</div>
                    <div className="text-xs lg:text-sm text-gray-400">Across India</div>
                  </div>
                </div>
                <div className="flex items-center space-x-3 lg:space-x-4">
                  <div className="w-10 h-10 lg:w-12 lg:h-12 bg-accent-purple/20 rounded-xl flex items-center justify-center flex-shrink-0">
                    <FiShield className="w-5 h-5 lg:w-6 lg:h-6 text-accent-cyan" />
                  </div>
                  <div>
                    <div className="font-medium text-white text-sm lg:text-base">Premium Quality</div>
                    <div className="text-xs lg:text-sm text-gray-400">Craftsmanship</div>
                  </div>
                </div>
                <div className="flex items-center space-x-3 lg:space-x-4">
                  <div className="w-10 h-10 lg:w-12 lg:h-12 bg-accent-purple/20 rounded-xl flex items-center justify-center flex-shrink-0">
                    <FiRotateCcw className="w-5 h-5 lg:w-6 lg:h-6 text-accent-cyan" />
                  </div>
                  <div>
                    <div className="font-medium text-white text-sm lg:text-base">Easy Returns</div>
                    <div className="text-xs lg:text-sm text-gray-400">7 Days Return</div>
                  </div>
                </div>
              </div>

              {/* COD Available */}
              <p className="text-sm text-gray-400 pt-2">
                <span className="text-green-400 font-medium">✓ COD Available</span> — Cash on Delivery across India
              </p>

              <SocialShare product={product} />
            </div>
          </div>
          
        </div>
        
      </div>

      {/* Mobile Bottom Spacing for Sticky Buttons */}
      <div className="lg:hidden h-24"></div>

      {/* ══════════════════════════════════════
           FULLSCREEN GALLERY MODAL
          ══════════════════════════════════════ */}
      {showGallery && (
        <div
          className="fixed inset-0 z-[70] bg-black flex flex-col select-none"
          onTouchStart={(e) => {
            const t = e.touches;
            if (t.length === 1) {
              swipeRef.current.startX = t[0].clientX;
              swipeRef.current.startY = t[0].clientY;
              pinchRef.current.touching = false;
            }
            if (t.length === 2) {
              pinchRef.current.touching = true;
              const dx = t[0].clientX - t[1].clientX;
              const dy = t[0].clientY - t[1].clientY;
              pinchRef.current.dist = Math.hypot(dx, dy);
              pinchRef.current.startScale = scale;
              pinchRef.current.mx = (t[0].clientX + t[1].clientX) / 2;
              pinchRef.current.my = (t[0].clientY + t[1].clientY) / 2;
              pinchRef.current.startPanX = panX;
              pinchRef.current.startPanY = panY;
            }
          }}
          onTouchMove={(e) => {
            const t = e.touches;
            if (t.length === 2) {
              e.preventDefault();
              const dx = t[0].clientX - t[1].clientX;
              const dy = t[0].clientY - t[1].clientY;
              const newDist = Math.hypot(dx, dy);
              const newScale = Math.min(5, Math.max(1, pinchRef.current.startScale * (newDist / pinchRef.current.dist)));
              setScale(newScale);
              if (newScale > 1) {
                const mx = (t[0].clientX + t[1].clientX) / 2;
                const my = (t[0].clientY + t[1].clientY) / 2;
                setPanX(pinchRef.current.startPanX + (mx - pinchRef.current.mx) / newScale);
                setPanY(pinchRef.current.startPanY + (my - pinchRef.current.my) / newScale);
              }
            }
          }}
          onTouchEnd={(e) => {
            if (e.changedTouches.length === 1 && !pinchRef.current.touching) {
              const dx = e.changedTouches[0].clientX - swipeRef.current.startX;
              const dy = e.changedTouches[0].clientY - swipeRef.current.startY;
              if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 40 && scale <= 1) {
                if (dx < 0) {
                  setCurrentImage(prev => (prev + 1) % product.images.length);
                } else {
                  setCurrentImage(prev => (prev - 1 + product.images.length) % product.images.length);
                }
                resetZoom();
              }
            }
            if (e.touches.length < 2) {
              pinchRef.current.touching = false;
            }
          }}
          style={{ touchAction: 'none' }}
        >
          {/* Top Bar */}
          <div className="flex items-center justify-between px-4 py-3 flex-shrink-0 z-10">
            <span className="text-white/60 text-sm">{currentImage + 1} / {product.images?.length}</span>
            <button
              onClick={() => { setShowGallery(false); resetZoom(); }}
              className="w-10 h-10 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition-colors"
            >
              <FiX className="w-5 h-5 text-white" />
            </button>
          </div>

          {/* Image */}
          <div className="flex-1 flex items-center justify-center overflow-hidden">
            <div
              ref={galleryImgRef}
              style={{
                transform: `scale(${scale}) translate(${panX}px, ${panY}px)`,
                transition: scale === 1 ? 'transform 0.3s ease' : 'none',
                transformOrigin: 'center center',
                width: '100%',
                height: '100%',
                position: 'relative',
              }}
            >
              <Image
                src={product.images?.[currentImage] || '/placeholder.png'}
                alt={product.name}
                fill
                sizes="100vw"
                className="object-contain"
                priority
              />
            </div>
          </div>

          {/* Arrow buttons — hidden when zoomed in */}
          {scale <= 1 && product.images?.length > 1 && (
            <>
              <button
                onClick={() => { setCurrentImage(p => (p - 1 + product.images.length) % product.images.length); resetZoom(); }}
                className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-colors"
              >
                <FiChevronLeft className="w-5 h-5 text-white" />
              </button>
              <button
                onClick={() => { setCurrentImage(p => (p + 1) % product.images.length); resetZoom(); }}
                className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-colors"
              >
                <FiChevronRight className="w-5 h-5 text-white" />
              </button>
            </>
          )}

          {/* Dot Indicators */}
          <div className="flex justify-center gap-2 py-4 flex-shrink-0">
            {product.images?.map((_, i) => (
              <button
                key={i}
                onClick={() => { setCurrentImage(i); resetZoom(); }}
                className={`transition-all duration-300 rounded-full ${
                  i === currentImage
                    ? 'w-5 h-2 bg-white'
                    : 'w-2 h-2 bg-white/30 hover:bg-white/60'
                }`}
              />
            ))}
          </div>

          {/* Reset zoom hint */}
          {scale > 1 && (
            <button
              onClick={resetZoom}
              className="absolute bottom-16 left-1/2 -translate-x-1/2 bg-white/10 text-white/70 text-xs px-3 py-1.5 rounded-full"
            >
              Tap to reset zoom
            </button>
          )}
        </div>
      )}

      {/* Size Guide Modal */}
      {showSizeGuide && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4" onClick={() => setShowSizeGuide(false)}>
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm"></div>
          <div 
            className="relative bg-dark-400 border border-dark-300 rounded-2xl p-6 w-full max-w-md z-10"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-heading font-bold text-white">Size Guide</h3>
              <button 
                onClick={() => setShowSizeGuide(false)} 
                className="p-2 hover:text-accent-pink transition-colors rounded-lg hover:bg-dark-300"
              >
                <FiX className="w-5 h-5" />
              </button>
            </div>
            <p className="text-sm text-gray-400 mb-4">All measurements are in inches</p>
            <div className="overflow-hidden rounded-xl border border-dark-300">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-accent-purple/20">
                    <th className="px-4 py-3 text-left font-semibold text-white">Size</th>
                    <th className="px-4 py-3 text-center font-semibold text-white">Chest</th>
                    <th className="px-4 py-3 text-center font-semibold text-white">Length</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { size: 'S', chest: '42\"', length: '27.5\"' },
                    { size: 'M', chest: '44\"', length: '28\"' },
                    { size: 'L', chest: '46\"', length: '28.5\"' },
                    { size: 'XL', chest: '48\"', length: '29\"' },
                    { size: 'XXL', chest: '50\"', length: '29.5\"' },
                  ].map((row, i) => (
                    <tr key={row.size} className={`border-t border-dark-300 ${i % 2 === 1 ? 'bg-dark-300/30' : ''}`}>
                      <td className="px-4 py-3 font-medium text-white">{row.size}</td>
                      <td className="px-4 py-3 text-center text-gray-300">{row.chest}</td>
                      <td className="px-4 py-3 text-center text-gray-300">{row.length}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

