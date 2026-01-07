
// context/CartContext.js - IMPROVED VERSION
'use client'
import { createContext, useContext, useState, useEffect } from 'react'

const CartContext = createContext()

export function CartProvider({ children }) {
  const [cart, setCart] = useState([])
  const [isOpen, setIsOpen] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const savedCart = localStorage.getItem('genzverse-cart')
    if (savedCart) {
      try {
        setCart(JSON.parse(savedCart))
      } catch (error) {
        console.error('Error parsing cart from localStorage:', error)
        setCart([])
      }
    }
  }, [])

  useEffect(() => {
    if (mounted) {
      localStorage.setItem('genzverse-cart', JSON.stringify(cart))
    }
  }, [cart, mounted])

  const addToCart = (product) => {
    console.log('Adding to cart:', product) // Debug log
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
    
    setCart(currentCart =>
      currentCart.map(item =>
        item.cartId === cartId ? { ...item, quantity } : item
      )
    )
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