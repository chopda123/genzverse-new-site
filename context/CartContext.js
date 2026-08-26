
// context/CartContext.js - IMPROVED VERSION
'use client'
import { createContext, useContext, useState, useEffect } from 'react'

const CartContext = createContext()

export function CartProvider({ children }) {
  const [cart, setCart] = useState([])
  const [isOpen, setIsOpen] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    // Hydrate cart from localStorage on client mount
    try {
      const savedCart = localStorage.getItem('genzverse-cart')
      if (savedCart) {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setCart(JSON.parse(savedCart))
      }
    } catch (error) {
      console.error('Error parsing cart from localStorage:', error)
      setCart([])
    }
    setMounted(true)
  }, [])

  useEffect(() => {
    if (mounted) {
      localStorage.setItem('genzverse-cart', JSON.stringify(cart))
    }
  }, [cart, mounted])

  const addToCart = (product) => {
    setCart(currentCart => {
      const existingItem = currentCart.find(item => 
        item.id === product.id && item.size === product.size && item.color === product.color
      )
      
      if (existingItem) {
        return currentCart.map(item =>
          item.id === product.id && item.size === product.size && item.color === product.color
            ? { ...item, quantity: item.quantity + product.quantity }
            : item
        )
      } else {
        return [...currentCart, { ...product, cartId: `${product.id}-${product.size}-${product.color}-${Date.now()}` }]
      }
    })
    setIsOpen(true)
  }

  const removeFromCart = (cartId) => {
    setCart(currentCart => currentCart.filter(item => item.cartId !== cartId))
  }

  const updateQuantity = (cartId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(cartId)
      return
    }

    setCart(currentCart => {
      const item = currentCart.find(i => i.cartId === cartId)
      // Clamp quantity to available stock so cart can't exceed stock
      const maxQty = item?.stock ?? Infinity
      const clampedQty = Math.min(quantity, maxQty)
      return currentCart.map(i =>
        i.cartId === cartId ? { ...i, quantity: clampedQty } : i
      )
    })
  }

  const clearCart = () => {
    setCart([])
  }

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0)
  }

  const getTotalItems = () => {
    return cart.reduce((total, item) => total + item.quantity, 0)
  }

  return (
    <CartContext.Provider value={{
      cart,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      getTotalPrice,
      getTotalItems,
      isOpen,
      setIsOpen
    }}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider')
  }
  return context
}