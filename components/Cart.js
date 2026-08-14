// components/Cart.js
'use client'
import { useEffect } from 'react'
import { useCart } from '../context/CartContext'
import { FiShoppingBag, FiX, FiPlus, FiMinus, FiTrash2 } from 'react-icons/fi'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { trackViewCart, trackBeginCheckout } from '../utils/analytics'

export default function Cart() {
  const { 
    cart, 
    isOpen, 
    setIsOpen, 
    removeFromCart, 
    updateQuantity, 
    getTotalPrice,
    getTotalItems 
  } = useCart()
  const router = useRouter()

  // Fire view_cart event each time cart is opened
  useEffect(() => {
    if (isOpen && cart.length > 0) {
      trackViewCart(cart, getTotalPrice())
    }
  }, [isOpen]) // eslint-disable-line react-hooks/exhaustive-deps

  const formattedPrice = (price) =>
    new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(price)

  const handleCheckout = () => {
    // Fire GA4 begin_checkout before navigating
    trackBeginCheckout(cart, getTotalPrice())
    setIsOpen(false)
    router.push('/checkout')
  }

  const handleContinueShopping = () => {
    setIsOpen(false)
    router.push('/products')
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={() => setIsOpen(false)}
      />
      
      {/* Cart Panel */}
      <div className="absolute right-0 top-0 h-full w-full max-w-md bg-dark-500 shadow-xl">
        <div className="flex h-full flex-col">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-dark-300 px-6 py-4">
            <div className="flex items-center space-x-2">
              <FiShoppingBag className="w-5 h-5 text-accent-purple" />
              <h2 className="text-lg font-heading font-bold text-white">
                Your Cart ({getTotalItems()})
              </h2>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-2 hover:text-accent-pink transition-colors"
            >
              <FiX className="w-5 h-5" />
            </button>
          </div>

          {/* Cart Items */}
          <div className="flex-1 overflow-y-auto p-6">
            {cart.length === 0 ? (
              <div className="text-center py-12">
                <FiShoppingBag className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-white mb-2">Your cart is empty</h3>
                <p className="text-gray-400 mb-6">Add some anime treasures to your collection!</p>
                <button
                  onClick={handleContinueShopping}
                  className="btn-primary"
                >
                  Explore Collection
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                {cart.map((item) => (
                  <div
                    key={item.cartId}
                    className="flex gap-4 p-4 bg-dark-400 rounded-xl border border-dark-300"
                  >
                    <div className="w-20 h-24 bg-dark-300 rounded-lg flex-shrink-0 overflow-hidden relative">
                   <Image
                        src={item.images?.[0] || 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=200&h=300&fit=crop'}
                        alt={item.name}
                        fill
                        sizes="80px" // Tells browser this is a small thumbnail
                        className="object-cover"
                      />
                    </div>

                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium text-white text-sm leading-tight mb-1 line-clamp-2">
                        {item.name}
                      </h3>
                      <p className="text-xs text-gray-400 mb-2">
                        Size: <span className="text-gray-300">{item.size}</span>
                        {item.color && (
                          <> • Color: <span className="text-gray-300">{item.color}</span></>
                        )}
                      </p>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-1">
                          <button
                            onClick={() => updateQuantity(item.cartId, item.quantity - 1)}
                            className="w-11 h-11 bg-dark-300 rounded-lg flex items-center justify-center hover:bg-dark-200 transition-colors flex-shrink-0"
                          >
                            <FiMinus className="w-3 h-3" />
                          </button>
                          <span className="text-sm font-medium text-white w-8 text-center">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.cartId, item.quantity + 1)}
                            className="w-11 h-11 bg-dark-300 rounded-lg flex items-center justify-center hover:bg-dark-200 transition-colors flex-shrink-0"
                          >
                            <FiPlus className="w-3 h-3" />
                          </button>
                        </div>
                        
                        <div className="flex items-center space-x-2">
                          <span className="text-sm font-bold text-accent-purple">
                            {formattedPrice(item.price * item.quantity)}
                          </span>
                          <button
                            onClick={() => removeFromCart(item.cartId)}
                            className="p-1 hover:text-accent-pink transition-colors"
                          >
                            <FiTrash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Footer */}
          {cart.length > 0 && (
            <div className="border-t border-dark-300 p-6 space-y-4">
              <div className="flex justify-between items-center text-lg font-bold">
                <span className="text-white">Total</span>
                <span className="text-gradient">{formattedPrice(getTotalPrice())}</span>
              </div>
              
              <div className="space-y-2">
                <button
                  onClick={handleCheckout}
                  className="w-full btn-primary py-3 font-heading font-bold"
                >
                  Proceed to Checkout
                </button>
                <button
                  onClick={handleContinueShopping}
                  className="w-full btn-secondary py-3 font-heading font-bold"
                >
                  Continue Shopping
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}