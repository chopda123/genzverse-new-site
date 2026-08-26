

// components/ProductDetails.js
'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { useCart } from '../context/CartContext';
import { useRouter } from 'next/navigation';
import SizeGuideModal from './SizeGuideModal';
import { 
  FiShoppingCart, 
  FiArrowLeft, 
  FiStar, 
  FiTruck, 
  FiShield, 
  FiRotateCcw, 
  FiHeart, 
  FiChevronLeft, 
  FiChevronRight, 
  FiX, 
  FiCheck,
  FiArrowRight 
} from 'react-icons/fi';
import { trackEvent } from '../utils/analytics';
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
    if (!product?.images?.length) return;
    if (direction === 'left') {
      setCurrentImage((prev) => (prev + 1) % product.images.length);
    } else {
      setCurrentImage((prev) => (prev - 1 + product.images.length) % product.images.length);
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
    if (!product) return;
    const cartItem = {
      ...product,
      size: selectedSize,
      color: selectedColor,
      quantity: quantity,
    };

    addToCart(cartItem);

    trackEvent('add_to_cart', {
      currency: 'INR',
      value: product.price * quantity,
      items: [{
        item_id: product.id,
        item_name: product.name,
        item_category: Array.isArray(product.categories)
          ? product.categories[0]
          : product.categories,
        price: product.price,
        quantity: quantity,
      }],
    });
  };

  const handleBuyNow = () => {
    if (!product) return;
    const cartItem = {
      ...product,
      size: selectedSize,
      color: selectedColor,
      quantity: quantity,
    };

    addToCart(cartItem);

    trackEvent('buy_now_click', {
      currency: 'INR',
      value: product.price * quantity,
      items: [
        {
          item_id: product.id,
          item_name: product.name,
          item_category: Array.isArray(product.categories)
            ? product.categories[0]
            : product.categories,
          price: product.price,
          quantity: quantity,
        },
      ],
    });

    router.push('/checkout');
  };

  if (!product) {
    return (
      <div className="min-h-screen bg-[#F5F2EC] text-slate-900 pt-20">
        <div className="container-custom text-center py-20">
          <h1 className="text-2xl font-bold text-slate-900 mb-4">Product not found</h1>
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
    <div className="min-h-screen bg-[#F5F2EC] text-slate-900 antialiased selection:bg-purple-200 selection:text-purple-900">
      
      {/* ══════════════════════════════════════════════════════════
          DARK MOBILE STICKY HEADER (Solid Dark Navy - Mobile Only)
         ══════════════════════════════════════════════════════════ */}
      <div className={`lg:hidden fixed top-0 left-0 right-0 bg-[#0f172a] z-50 transition-all duration-300 ${isSticky ? 'py-3 shadow-lg' : 'py-3.5'} border-b border-dark-300 text-white`}>
        <div className="container-custom px-4">
          <div className="flex items-center justify-between">
            <button 
              onClick={() => router.back()} 
              className="p-2 -ml-2 text-gray-300 hover:text-white transition-colors"
              aria-label="Go back"
            >
              <FiArrowLeft className="w-5 h-5" />
            </button>
            
            <h1 className="text-sm font-medium text-white truncate max-w-[200px] text-center">
              {product.name}
            </h1>
            
            <button
              onClick={() => setIsLiked(!isLiked)}
              className="p-2 -mr-2 text-gray-300 hover:text-accent-pink transition-colors"
              aria-label="Wishlist"
            >
              <FiHeart className={`w-5 h-5 ${isLiked ? 'fill-accent-pink text-accent-pink' : 'text-gray-300'}`} />
            </button>
          </div>
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════════
          MAIN PRODUCT EXPERIENCE (Warm Off-White / Cream #F5F2EC)
         ══════════════════════════════════════════════════════════ */}
      <main className="pt-20 sm:pt-22 lg:pt-24 pb-12 lg:pb-20">
        <div className="container-custom px-4 sm:px-6 lg:px-8">
          
          {/* Desktop Breadcrumb Navigation */}
          <nav className="hidden lg:flex items-center space-x-2 text-xs uppercase tracking-widest text-slate-500 mb-8 font-medium">
            <button 
              onClick={() => router.back()} 
              className="flex items-center space-x-1.5 hover:text-purple-700 transition-colors duration-200"
            >
              <FiArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Collection</span>
            </button>
            <span>/</span>
            <span className="text-purple-700 font-semibold truncate max-w-md">{product.name}</span>
          </nav>

          {/* 
            RESPONSIVE MULTI-COLUMN LAYOUT:
            - Mobile: 1 Column
            - Tablet/Laptop (lg): 2 Columns (Gallery 5 cols, Info & Options 7 cols)
            - Desktop (xl): 3 Columns (Gallery 5 cols, Description & Features 4 cols, Options Panel 3 cols)
          */}
          <div className="grid grid-cols-1 lg:grid-cols-12 lg:gap-8 xl:gap-10">
            
            {/* ──────────────────────────────────────────────────────────
                COLUMN 1: PRODUCT GALLERY (Mobile & Desktop)
               ────────────────────────────────────────────────────────── */}
            <div className="lg:col-span-5 xl:col-span-5 mb-6 lg:mb-0">
              <div className="lg:sticky lg:top-28 space-y-4">
                
                {/* Main Large Image Container — Refined aspect-[4/5] on mobile and comfortable top breathing room */}
                <div
                  className="relative bg-[#eae5db] rounded-2xl overflow-hidden border border-[#ded7c8] aspect-[4/5] lg:aspect-[3/4] cursor-zoom-in group shadow-sm transition-shadow duration-300 hover:shadow-md mt-1 lg:mt-0"
                  onClick={() => { setShowGallery(true); resetZoom(); }}
                  title="Click to view fullscreen"
                >
                  <Image 
                    src={product.images?.[currentImage] || '/placeholder.png'} 
                    alt={product.anime ? `${product.name} – ${product.anime} inspired anime T-shirt by GenZverse` : `${product.name} – anime T-shirt by GenZverse`}
                    fill
                    priority
                    sizes="(max-width: 1024px) 100vw, 42vw" 
                    className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                  />

                  {/* Badges - Desktop & Mobile */}
                  <div className="absolute top-3.5 left-3.5 flex flex-col gap-1.5 z-10">
                    {product.isNew && (
                      <span className="bg-dark-500 text-cyan-400 text-[11px] font-extrabold px-2.5 py-1 rounded-full uppercase tracking-wider shadow-sm border border-cyan-500/30">
                        New
                      </span>
                    )}
                    {product.isLimited && (
                      <span className="bg-accent-pink text-white text-[11px] font-extrabold px-2.5 py-1 rounded-full uppercase tracking-wider shadow-sm">
                        Limited
                      </span>
                    )}
                    {product.showDiscount && product.originalPrice && product.originalPrice > product.price && (
                      <span className="bg-emerald-600 text-white text-[11px] font-extrabold px-2.5 py-1 rounded-full uppercase tracking-wider shadow-sm">
                        {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
                      </span>
                    )}
                  </div>

                  {/* Desktop Wishlist Button */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setIsLiked(!isLiked);
                    }}
                    className="hidden lg:flex absolute top-3.5 right-3.5 w-10 h-10 bg-white/90 backdrop-blur-md rounded-full items-center justify-center border border-[#ded7c8] shadow-sm hover:scale-105 transition-all duration-200 z-10 group/btn"
                    aria-label="Wishlist"
                  >
                    <FiHeart 
                      className={`w-4 h-4 transition-colors ${isLiked ? 'fill-accent-pink text-accent-pink' : 'text-slate-600 group-hover/btn:text-accent-pink'}`} 
                    />
                  </button>

                  {/* Mobile Swipe Navigation Arrows */}
                  <div className="lg:hidden absolute inset-0 flex items-center justify-between px-2 pointer-events-none">
                    <button
                      onClick={(e) => { e.stopPropagation(); handleSwipe('right'); }}
                      className="pointer-events-auto w-9 h-9 bg-dark-500/70 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-accent-purple transition-colors shadow-md"
                      aria-label="Previous image"
                    >
                      <FiChevronLeft className="w-5 h-5" />
                    </button>
                    <button
                      onClick={(e) => { e.stopPropagation(); handleSwipe('left'); }}
                      className="pointer-events-auto w-9 h-9 bg-dark-500/70 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-accent-purple transition-colors shadow-md"
                      aria-label="Next image"
                    >
                      <FiChevronRight className="w-5 h-5" />
                    </button>
                  </div>

                  {/* Dot Indicators — Mobile */}
                  <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-1.5 lg:hidden z-10">
                    {product.images?.map((_, i) => (
                      <button
                        key={i}
                        onClick={(e) => { e.stopPropagation(); setCurrentImage(i); }}
                        className={`transition-all duration-300 rounded-full ${
                          i === currentImage
                            ? 'w-5 h-1.5 bg-white shadow-sm'
                            : 'w-1.5 h-1.5 bg-white/50'
                        }`}
                        aria-label={`Go to slide ${i + 1}`}
                      />
                    ))}
                  </div>
                </div>

                {/* Thumbnails Gallery */}
                {product.images && product.images.length > 1 && (
                  <div className="flex gap-2.5 overflow-x-auto no-scrollbar py-1 justify-start">
                    {product.images.map((image, index) => (
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
                        className={`relative flex-shrink-0 w-16 h-20 sm:w-18 sm:h-22 rounded-xl overflow-hidden border-2 transition-all duration-200 bg-[#eae5db] ${
                          currentImage === index 
                            ? 'border-accent-purple ring-2 ring-purple-400/30 shadow-sm scale-[1.02]' 
                            : 'border-[#ded7c8] hover:border-purple-300 opacity-80 hover:opacity-100'
                        }`}
                        aria-label={`View thumbnail ${index + 1}`}
                      >
                        <Image
                          src={image}
                          alt={`${product.name} preview ${index + 1}`}
                          fill
                          sizes="80px"
                          className="object-cover"
                        />
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* ──────────────────────────────────────────────────────────
                COLUMN 2: PRODUCT INFO, DESCRIPTION & FEATURES
               ────────────────────────────────────────────────────────── */}
            <div className="lg:col-span-7 xl:col-span-4 space-y-6">
              
              {/* Product Header & Title */}
              <div className="space-y-3 pb-5 border-b border-[#ded7c8]">
                {/* Anime / Category Meta */}
                {product.anime && (
                  <div className="text-[11px] font-extrabold uppercase tracking-widest text-purple-700">
                    {product.anime} Edition
                  </div>
                )}

                <h1 className="text-2xl sm:text-3xl xl:text-3xl font-heading font-extrabold text-slate-900 tracking-tight leading-tight">
                  {product.name}
                </h1>

                {/* Rating & Stock Indicator */}
                <div className="flex items-center flex-wrap gap-3 pt-1">
                  <div className="flex items-center space-x-1">
                    {[...Array(5)].map((_, i) => (
                      <FiStar 
                        key={i}
                        className={`w-4 h-4 ${
                          i < Math.floor(product.rating) 
                            ? 'text-amber-400 fill-amber-400' 
                            : 'text-slate-300'
                        }`}
                      />
                    ))}
                    <span className="text-xs font-semibold text-slate-700 ml-1.5">
                      {product.rating}
                    </span>
                    {product.reviewCount && (
                      <span className="text-xs text-slate-400">
                        ({product.reviewCount})
                      </span>
                    )}
                  </div>
                  
                  <span className="text-slate-300">•</span>
                  
                  <span className="text-xs font-semibold text-emerald-800 bg-emerald-100/90 border border-emerald-300/60 px-2.5 py-0.5 rounded-full">
                    {product.stock} items left
                  </span>
                </div>

                {/* Pricing Display */}
                <div className="flex items-baseline flex-wrap gap-2.5 pt-2">
                  <span className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-heading">
                    {formattedPrice(product.price)}
                  </span>
                  
                  {product.originalPrice && product.originalPrice > product.price && (
                    <>
                      <span className="text-base sm:text-lg text-slate-400 line-through">
                        {formattedPrice(product.originalPrice)}
                      </span>
                      <span className="bg-pink-600 text-white text-[11px] font-bold px-2 py-0.5 rounded-full">
                        Save {formattedPrice(product.originalPrice - product.price)}
                      </span>
                      {product.showDiscount && (
                        <span className="bg-emerald-600 text-white text-[11px] font-bold px-2 py-0.5 rounded-full">
                          {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
                        </span>
                      )}
                    </>
                  )}
                </div>
              </div>

              {/* Description Section */}
              <div className="space-y-3 pb-5 border-b border-[#ded7c8]">
                <div className="flex items-center gap-2">
                  <h2 className="text-xs font-heading font-extrabold uppercase tracking-widest text-slate-900">
                    Description
                  </h2>
                  <div className="h-[2px] w-6 bg-gradient-to-r from-accent-purple to-accent-pink rounded-full"></div>
                </div>

                {Array.isArray(product.description) ? (
                  <div className="space-y-2.5 text-slate-700 leading-relaxed text-sm">
                    {product.description.map((para, i) => (
                      <p key={i}>
                        {para}
                      </p>
                    ))}
                  </div>
                ) : (
                  <p className="text-slate-700 leading-relaxed text-sm">
                    {product.description}
                  </p>
                )}
              </div>

              {/* Features Section */}
              {product.features && product.features.length > 0 && (
                <div className="space-y-3 pb-5 border-b border-[#ded7c8]">
                  <div className="flex items-center gap-2">
                    <h2 className="text-xs font-heading font-extrabold uppercase tracking-widest text-slate-900">
                      Product Highlights
                    </h2>
                    <div className="h-[2px] w-6 bg-gradient-to-r from-accent-purple to-accent-pink rounded-full"></div>
                  </div>

                  <ul className="grid grid-cols-1 gap-2 text-sm text-slate-700">
                    {product.features.map((feature, index) => (
                      <li key={index} className="flex items-start space-x-2.5">
                        <span className="w-1.5 h-1.5 mt-1.5 bg-gradient-to-r from-accent-purple to-accent-pink rounded-full flex-shrink-0"></span>
                        <span className="leading-snug">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Mobile / Tablet View of Purchase Options (Rendered inline on lg screen sizes when not in 3rd col) */}
              <div className="xl:hidden space-y-6 pt-2">
                
                {/* Size Selector */}
                <div>
                  <div className="flex justify-between items-center mb-2.5">
                    <span className="text-xs font-heading font-extrabold uppercase tracking-wider text-slate-900">
                      Select Size
                    </span>
                    <button 
                      onClick={() => setShowSizeGuide(true)}
                      className="text-xs font-semibold text-purple-700 hover:text-purple-900 underline underline-offset-2 transition-colors"
                    >
                      Size Guide
                    </button>
                  </div>
                  <div className="grid grid-cols-4 sm:grid-cols-5 gap-2">
                    {product.sizes?.map((size) => (
                      <button
                        key={size}
                        onClick={() => setSelectedSize(size)}
                        className={`py-3 text-xs sm:text-sm font-bold rounded-xl transition-all duration-200 ${
                          selectedSize === size
                            ? 'bg-gradient-to-r from-accent-purple to-accent-pink text-white shadow-md shadow-purple-500/25 scale-[1.02]'
                            : 'bg-white text-slate-800 border-2 border-[#ded7c8] hover:border-purple-300'
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Color Selector */}
                {product.colors && (
                  <div>
                    <span className="block text-xs font-heading font-extrabold uppercase tracking-wider text-slate-900 mb-2.5">
                      Select Color
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {product.colors.map((color) => (
                        <button
                          key={color}
                          onClick={() => setSelectedColor(color)}
                          className={`px-4 py-2 text-xs font-semibold rounded-xl border-2 transition-all duration-200 ${
                            selectedColor === color
                              ? 'bg-purple-100 text-purple-900 border-accent-purple shadow-sm'
                              : 'bg-white text-slate-700 border-[#ded7c8] hover:border-purple-300'
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
                  <span className="block text-xs font-heading font-extrabold uppercase tracking-wider text-slate-900 mb-2.5">
                    Quantity
                  </span>
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-3 bg-white border border-[#ded7c8] rounded-xl px-3 py-2 shadow-sm">
                      <button
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                        className="text-slate-600 hover:text-purple-700 text-base font-bold w-7 h-7 flex items-center justify-center rounded-lg hover:bg-slate-100 transition-colors"
                        aria-label="Decrease quantity"
                      >
                        -
                      </button>
                      <span className="text-slate-900 font-bold text-sm w-6 text-center">{quantity}</span>
                      <button
                        onClick={() => setQuantity(Math.min(product.stock || 10, quantity + 1))}
                        className="text-slate-600 hover:text-purple-700 text-base font-bold w-7 h-7 flex items-center justify-center rounded-lg hover:bg-slate-100 transition-colors"
                        aria-label="Increase quantity"
                      >
                        +
                      </button>
                    </div>
                    <span className="text-xs text-slate-500 font-medium">
                      Only {product.stock} left in stock
                    </span>
                  </div>
                </div>

                {/* Desktop/Tablet CTA buttons when in 2-column mode (Side by Side) */}
                <div className="hidden lg:grid grid-cols-2 gap-3 pt-2">
                  <button
                    onClick={handleBuyNow}
                    className="h-12 bg-gradient-to-r from-accent-purple to-accent-pink hover:from-accent-pink hover:to-accent-purple text-white font-heading font-bold text-sm rounded-xl flex items-center justify-center gap-2 shadow-md shadow-purple-500/25 transition-all duration-300 hover:shadow-lg hover:scale-[1.01]"
                  >
                    <span>Shop Now</span>
                    <FiArrowRight className="w-4 h-4" />
                  </button>
                  
                  <button
                    onClick={handleAddToCart}
                    className="h-12 bg-dark-500 hover:bg-dark-400 text-white font-heading font-bold text-sm border-2 border-accent-purple rounded-xl flex items-center justify-center gap-2 transition-all duration-300 hover:scale-[1.01]"
                  >
                    <FiShoppingCart className="w-4 h-4 text-purple-400" />
                    <span>Add to Cart</span>
                  </button>
                </div>

                {/* Trust Features */}
                <div className="grid grid-cols-3 gap-2.5 pt-4 border-t border-[#ded7c8]">
                  <div className="bg-white/80 border border-[#ded7c8] rounded-xl p-2.5 text-center flex flex-col items-center justify-center">
                    <FiTruck className="w-4 h-4 text-purple-700 mb-1" />
                    <div className="font-bold text-slate-900 text-[11px]">Free Shipping</div>
                    <div className="text-[10px] text-slate-500">Across India</div>
                  </div>
                  <div className="bg-white/80 border border-[#ded7c8] rounded-xl p-2.5 text-center flex flex-col items-center justify-center">
                    <FiShield className="w-4 h-4 text-purple-700 mb-1" />
                    <div className="font-bold text-slate-900 text-[11px]">Premium Quality</div>
                    <div className="text-[10px] text-slate-500">240 GSM Cotton</div>
                  </div>
                  <div className="bg-white/80 border border-[#ded7c8] rounded-xl p-2.5 text-center flex flex-col items-center justify-center">
                    <FiRotateCcw className="w-4 h-4 text-purple-700 mb-1" />
                    <div className="font-bold text-slate-900 text-[11px]">Easy Returns</div>
                    <div className="text-[10px] text-slate-500">7 Days Return</div>
                  </div>
                </div>

                {/* COD Info */}
                <div className="flex items-center gap-2 text-xs text-slate-700 bg-emerald-50 border border-emerald-200/70 px-3.5 py-2 rounded-xl">
                  <FiCheck className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                  <span><strong>Cash on Delivery (COD)</strong> available across India</span>
                </div>

                {/* Share Component */}
                <SocialShare product={product} />
              </div>

            </div>

            {/* ──────────────────────────────────────────────────────────
                COLUMN 3: DEDICATED DESKTOP OPTIONS & PURCHASE PANEL (xl screens)
               ────────────────────────────────────────────────────────── */}
            <div className="hidden xl:block xl:col-span-3">
              <div className="sticky top-28 bg-white border border-[#ded7c8] rounded-2xl p-5 shadow-sm space-y-5">
                
                {/* Size Selector */}
                <div>
                  <div className="flex justify-between items-center mb-2.5">
                    <span className="text-xs font-heading font-extrabold uppercase tracking-wider text-slate-900">
                      Select Size
                    </span>
                    <button 
                      onClick={() => setShowSizeGuide(true)}
                      className="text-xs font-semibold text-purple-700 hover:text-purple-900 underline underline-offset-2 transition-colors"
                    >
                      Size Guide
                    </button>
                  </div>
                  <div className="grid grid-cols-4 gap-1.5">
                    {product.sizes?.map((size) => (
                      <button
                        key={size}
                        onClick={() => setSelectedSize(size)}
                        className={`py-2.5 text-xs font-bold rounded-xl transition-all duration-200 ${
                          selectedSize === size
                            ? 'bg-gradient-to-r from-accent-purple to-accent-pink text-white shadow-md shadow-purple-500/25'
                            : 'bg-[#F5F2EC] text-slate-800 border border-[#ded7c8] hover:border-purple-300'
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Color Selector */}
                {product.colors && (
                  <div>
                    <span className="block text-xs font-heading font-extrabold uppercase tracking-wider text-slate-900 mb-2">
                      Color
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {product.colors.map((color) => (
                        <button
                          key={color}
                          onClick={() => setSelectedColor(color)}
                          className={`px-3 py-1.5 text-xs font-medium rounded-xl border transition-all duration-200 ${
                            selectedColor === color
                              ? 'bg-purple-100 text-purple-900 border-accent-purple font-semibold'
                              : 'bg-[#F5F2EC] text-slate-700 border-[#ded7c8] hover:border-purple-300'
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
                  <span className="block text-xs font-heading font-extrabold uppercase tracking-wider text-slate-900 mb-2">
                    Quantity
                  </span>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2 bg-[#F5F2EC] border border-[#ded7c8] rounded-xl px-2.5 py-1.5">
                      <button
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                        className="text-slate-600 hover:text-purple-700 text-sm font-bold w-6 h-6 flex items-center justify-center rounded hover:bg-white transition-colors"
                        aria-label="Decrease quantity"
                      >
                        -
                      </button>
                      <span className="text-slate-900 font-bold text-xs w-5 text-center">{quantity}</span>
                      <button
                        onClick={() => setQuantity(Math.min(product.stock || 10, quantity + 1))}
                        className="text-slate-600 hover:text-purple-700 text-sm font-bold w-6 h-6 flex items-center justify-center rounded hover:bg-white transition-colors"
                        aria-label="Increase quantity"
                      >
                        +
                      </button>
                    </div>
                    <span className="text-[11px] text-slate-500 font-medium">
                      {product.stock} in stock
                    </span>
                  </div>
                </div>

                {/* SIDE-BY-SIDE CTAs (DESKTOP) */}
                <div className="grid grid-cols-2 gap-2 pt-1">
                  {/* Shop Now (Primary CTA) */}
                  <button
                    onClick={handleBuyNow}
                    className="h-12 bg-gradient-to-r from-accent-purple to-accent-pink hover:from-accent-pink hover:to-accent-purple text-white font-heading font-bold text-xs rounded-xl flex items-center justify-center gap-1.5 shadow-md shadow-purple-500/25 transition-all duration-300 hover:shadow-lg hover:scale-[1.02]"
                  >
                    <span>Shop Now</span>
                    <FiArrowRight className="w-3.5 h-3.5" />
                  </button>
                  
                  {/* Add to Cart (Secondary CTA) */}
                  <button
                    onClick={handleAddToCart}
                    className="h-12 bg-dark-500 hover:bg-dark-400 text-white font-heading font-bold text-xs border-2 border-accent-purple rounded-xl flex items-center justify-center gap-1.5 transition-all duration-300 hover:scale-[1.02]"
                  >
                    <FiShoppingCart className="w-3.5 h-3.5 text-purple-400" />
                    <span>Add to Cart</span>
                  </button>
                </div>

                {/* Trust Services List */}
                <div className="space-y-2 pt-3 border-t border-[#ded7c8] text-xs text-slate-700">
                  <div className="flex items-center gap-2">
                    <FiTruck className="w-3.5 h-3.5 text-purple-700 flex-shrink-0" />
                    <span><strong>Free Shipping</strong> across India</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <FiShield className="w-3.5 h-3.5 text-purple-700 flex-shrink-0" />
                    <span><strong>Premium Quality</strong> — 240 GSM Cotton</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <FiRotateCcw className="w-3.5 h-3.5 text-purple-700 flex-shrink-0" />
                    <span><strong>7 Days</strong> easy return window</span>
                  </div>
                  <div className="flex items-center gap-2 text-emerald-800">
                    <FiCheck className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                    <span><strong>COD Available</strong> across India</span>
                  </div>
                </div>

                {/* Share Product */}
                <SocialShare product={product} />

              </div>
            </div>

          </div>
        </div>
      </main>

      {/* ══════════════════════════════════════════════════════════
          MOBILE STICKY BOTTOM ACTION BAR (APPROVED & SIDE-BY-SIDE)
         ══════════════════════════════════════════════════════════ */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-dark-500/95 backdrop-blur-md border-t border-dark-300 px-4 py-3 z-40 pb-[max(0.75rem,env(safe-area-inset-bottom))] shadow-2xl">
        <div className="grid grid-cols-2 gap-3 max-w-md mx-auto">
          
          {/* Shop Now (Primary CTA — Matching Homepage "ENTER GENZVERSE" Purple) */}
          <button
            onClick={handleBuyNow}
            className="h-12 text-[#f0ebf8] text-xs sm:text-sm font-heading font-bold rounded-xl flex items-center justify-center gap-2 active:scale-[0.98] transition-all"
            style={{
              background: 'linear-gradient(135deg, #7c4daa 0%, #9b6fd0 45%, #7a4da8 100%)',
              border: '1px solid rgba(200, 165, 235, 0.30)',
              boxShadow: '0 0 18px rgba(140, 90, 200, 0.28), inset 0 1px 0 rgba(255, 255, 255, 0.10)',
            }}
          >
            <span>Shop Now</span>
            <FiArrowRight className="w-4 h-4 text-[rgba(220,200,245,0.85)]" />
          </button>
          
          {/* Add to Cart (Secondary CTA) */}
          <button
            onClick={handleAddToCart}
            className="h-12 bg-dark-500 active:bg-dark-400 text-white text-xs sm:text-sm font-heading font-bold border-2 border-accent-purple rounded-xl flex items-center justify-center gap-2 active:scale-[0.98] transition-all"
          >
            <FiShoppingCart className="w-4 h-4 text-purple-400" />
            <span>Add to Cart</span>
          </button>

        </div>
      </div>

      {/* ══════════════════════════════════════════════════════════
          FULLSCREEN GALLERY MODAL (Dark Brand Surface)
         ══════════════════════════════════════════════════════════ */}
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
                  setCurrentImage((prev) => (prev + 1) % product.images.length);
                } else {
                  setCurrentImage((prev) => (prev - 1 + product.images.length) % product.images.length);
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
            <span className="text-white/60 text-sm font-medium">{currentImage + 1} / {product.images?.length}</span>
            <button
              onClick={() => { setShowGallery(false); resetZoom(); }}
              className="w-10 h-10 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition-colors"
              aria-label="Close fullscreen gallery"
            >
              <FiX className="w-5 h-5 text-white" />
            </button>
          </div>

          {/* Image Canvas */}
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
                onClick={() => { setCurrentImage((p) => (p - 1 + product.images.length) % product.images.length); resetZoom(); }}
                className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-colors"
                aria-label="Previous image"
              >
                <FiChevronLeft className="w-5 h-5 text-white" />
              </button>
              <button
                onClick={() => { setCurrentImage((p) => (p + 1) % product.images.length); resetZoom(); }}
                className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-colors"
                aria-label="Next image"
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
                aria-label={`Go to slide ${i + 1}`}
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
      <SizeGuideModal isOpen={showSizeGuide} onClose={() => setShowSizeGuide(false)} />
    </div>
  );
}
