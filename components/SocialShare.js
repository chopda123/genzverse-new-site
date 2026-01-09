'use client'
import { FiShare2, FiLink, FiCheck } from 'react-icons/fi'
import { useState } from 'react'

export default function SocialShare({ product }) {
  const [copied, setCopied] = useState(false)
  
  // Safety check to ensure we are on the client side
  const shareUrl = typeof window !== 'undefined' 
    ? window.location.href 
    : `https://www.genzverse.shop/products/${product.slug}`
    
  const shareText = `Check out "${product.name}" on GenZverse!`

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: product.name,
          text: shareText,
          url: shareUrl,
        })
      } catch (err) {
        console.log('Error sharing:', err)
      }
    } else {
      // Fallback for desktops that don't support native share
      copyLink()
    }
  }

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy', err)
    }
  }

  return (
    <div className="mt-6 pt-6 border-t border-dark-300">
      <div className="flex items-center space-x-3">
        
        {/* Native Share Button (Text + Icon) */}
        <button 
          onClick={handleNativeShare}
          className="flex items-center space-x-2 px-4 py-2 bg-dark-400 rounded-lg text-gray-300 hover:text-white hover:bg-dark-300 transition-all duration-200"
        >
          <FiShare2 className="w-4 h-4" />
          <span className="text-sm font-medium">Share Product</span>
        </button>

        {/* Copy Link Button (Icon Only) */}
        <button 
          onClick={copyLink}
          className="p-2 bg-dark-400 rounded-lg text-gray-300 hover:text-accent-purple hover:bg-dark-300 transition-all duration-200 relative"
          title="Copy Link"
        >
          {copied ? <FiCheck className="w-5 h-5 text-green-400" /> : <FiLink className="w-5 h-5" />}
        </button>

      </div>
    </div>
  )
}