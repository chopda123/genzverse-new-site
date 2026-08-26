'use client'
import { useEffect } from 'react'
import { FiX } from 'react-icons/fi'

export default function SizeGuideModal({ isOpen, onClose }) {
  // Close on Escape key and handle scroll lock
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose()
    }
    if (isOpen) {
      document.body.style.overflow = 'hidden'
      window.addEventListener('keydown', handleKeyDown)
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [isOpen, onClose])

  if (!isOpen) return null

  return (
    <div 
      className="fixed inset-0 z-[100] flex items-center justify-center p-4" 
      onClick={onClose}
      aria-modal="true"
      role="dialog"
    >
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm transition-opacity"></div>
      <div 
        className="relative bg-dark-500 border border-dark-300 rounded-2xl p-6 w-full max-w-md z-10 text-white shadow-2xl animate-fade-in"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-heading font-bold text-white">Size Guide</h3>
          <button 
            onClick={onClose} 
            className="p-2 hover:text-accent-pink transition-colors rounded-lg hover:bg-dark-400 cursor-pointer"
            aria-label="Close size guide"
          >
            <FiX className="w-5 h-5" />
          </button>
        </div>
        <p className="text-xs text-gray-400 mb-4">All measurements are in inches. Oversized / Drop Shoulder Fit.</p>
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
                { size: 'S', chest: '42"', length: '27.5"' },
                { size: 'M', chest: '44"', length: '28"' },
                { size: 'L', chest: '46"', length: '28.5"' },
                { size: 'XL', chest: '48"', length: '29"' },
                { size: 'XXL', chest: '50"', length: '29.5"' },
              ].map((row, i) => (
                <tr key={row.size} className={`border-t border-dark-300 ${i % 2 === 1 ? 'bg-dark-400/40' : ''}`}>
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
  )
}
