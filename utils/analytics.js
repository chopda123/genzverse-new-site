// utils/analytics.js
// NOTE: No 'use client' here — utility functions work anywhere

// ─────────────────────────────────────────────
// 1. Core Event Tracker
// ─────────────────────────────────────────────
export const trackEvent = (eventName, params = {}) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', eventName, params)

    // Only log to console in development mode
    if (process.env.NODE_ENV === 'development') {
      console.log('🔥 GA EVENT:', eventName, params)
    }
  }
}

// ─────────────────────────────────────────────
// 2. Funnel Stage Tracker (custom funnel)
// ─────────────────────────────────────────────
export const trackFunnelStage = (stage, productData = null) => {
  trackEvent('funnel_progress', {
    stage_name: stage, // e.g. 'view_product', 'add_to_cart', 'checkout_start'
    product_id: productData?.id,
    product_name: productData?.name,
    value: productData?.price,
    currency: 'INR',
  })
}

// ─────────────────────────────────────────────
// 3. GA4 Standard Ecommerce — view_item
//    Fire on: Product detail page load
// ─────────────────────────────────────────────
export const trackViewItem = (product) => {
  if (!product) return
  trackEvent('view_item', {
    currency: 'INR',
    value: product.price,
    items: [
      {
        item_id: String(product.id),
        item_name: product.name,
        item_category: Array.isArray(product.category)
          ? product.category[0]
          : product.category,
        price: product.price,
        quantity: 1,
      },
    ],
  })
}

// ─────────────────────────────────────────────
// 4. GA4 Standard Ecommerce — view_cart
//    Fire on: Cart sidebar opens
// ─────────────────────────────────────────────
export const trackViewCart = (cartItems, totalValue) => {
  if (!cartItems || cartItems.length === 0) return
  trackEvent('view_cart', {
    currency: 'INR',
    value: totalValue,
    items: cartItems.map((item) => ({
      item_id: String(item.id),
      item_name: item.name,
      item_category: Array.isArray(item.category)
        ? item.category[0]
        : item.category,
      price: item.price,
      quantity: item.quantity,
    })),
  })
}

// ─────────────────────────────────────────────
// 5. GA4 Standard Ecommerce — begin_checkout
//    Fire on: "Proceed to Checkout" click
// ─────────────────────────────────────────────
export const trackBeginCheckout = (cartItems, totalValue) => {
  if (!cartItems || cartItems.length === 0) return
  trackEvent('begin_checkout', {
    currency: 'INR',
    value: totalValue,
    items: cartItems.map((item) => ({
      item_id: String(item.id),
      item_name: item.name,
      item_category: Array.isArray(item.category)
        ? item.category[0]
        : item.category,
      price: item.price,
      quantity: item.quantity,
    })),
  })
}

// ─────────────────────────────────────────────
// 6. GA4 Standard Ecommerce — purchase
//    Fire on: Successful order submission
// ─────────────────────────────────────────────
export const trackPurchase = (cartItems, totalValue, transactionId) => {
  if (!cartItems || cartItems.length === 0) return
  trackEvent('purchase', {
    transaction_id: transactionId,
    currency: 'INR',
    value: totalValue,
    shipping: 0,     // Free shipping
    tax: 0,          // Inclusive pricing
    items: cartItems.map((item) => ({
      item_id: String(item.id),
      item_name: item.name,
      item_category: Array.isArray(item.category)
        ? item.category[0]
        : item.category,
      price: item.price,
      quantity: item.quantity,
    })),
  })
}