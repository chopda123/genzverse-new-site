

'use client'

// 1. Standard Event Tracker
export const trackEvent = (eventName, params = {}) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', eventName, params)
    
    // Only log to console in development mode to keep production clean
    if (process.env.NODE_ENV === 'development') {
      console.log('GA EVENT:', eventName, params)
    }
  }
}

// 2. Funnel Tracker (NEW: Helps you see user journey)
export const trackFunnelStage = (stage, productData = null) => {
  trackEvent('funnel_progress', {
    stage_name: stage, // e.g., 'view_product', 'add_to_cart', 'checkout_start'
    product_id: productData?.id,
    product_name: productData?.name,
    value: productData?.price,
    currency: 'INR'
  })
}