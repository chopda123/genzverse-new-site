
'use client'

import { useEffect, useRef } from 'react'
import { usePathname } from 'next/navigation'

export default function AnalyticsTracker() {
  const pathname = usePathname()
  const lastPathname = useRef(null)

  useEffect(() => {
    if (typeof window !== 'undefined' && window.gtag) {
      if (pathname !== lastPathname.current) {
        window.gtag('event', 'page_view', {
          page_path: pathname,
        })
        lastPathname.current = pathname
      }
    }
  }, [pathname])

  return null
}