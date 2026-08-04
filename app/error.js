'use client'

import Link from 'next/link'
import { FiAlertTriangle, FiRefreshCw, FiHome } from 'react-icons/fi'
import { useEffect } from 'react'

export default function Error({ error, reset }) {
  useEffect(() => {
    // Log error to console in dev — in production you'd send to Sentry etc.
    if (process.env.NODE_ENV === 'development') {
      console.error('Page Error:', error)
    }
  }, [error])

  return (
    <div className="min-h-screen bg-dark-500 text-white flex items-center justify-center p-6">
      <div className="max-w-md w-full text-center">
        {/* Icon */}
        <div className="w-20 h-20 bg-accent-pink/10 rounded-2xl flex items-center justify-center mx-auto mb-6 border border-accent-pink/20">
          <FiAlertTriangle className="w-10 h-10 text-accent-pink" />
        </div>

        <h1 className="text-3xl font-heading font-bold text-white mb-3">
          Something went <span className="text-gradient">wrong</span>
        </h1>
        <p className="text-gray-400 mb-8 leading-relaxed">
          An unexpected error occurred. Your cart is safe — try refreshing the page or go back to the collection.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button
            onClick={reset}
            className="btn-primary flex items-center justify-center space-x-2"
          >
            <FiRefreshCw className="w-4 h-4" />
            <span>Try Again</span>
          </button>
          <Link
            href="/"
            className="btn-secondary flex items-center justify-center space-x-2"
          >
            <FiHome className="w-4 h-4" />
            <span>Go Home</span>
          </Link>
        </div>
      </div>
    </div>
  )
}
