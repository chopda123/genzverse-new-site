
'use client'

import { useEffect, useRef } from 'react' // ✅ Import useRef
import { usePathname } from 'next/navigation'

export default function AnalyticsTracker() {
  const pathname = usePathname()
  // 1. Remember the last URL we tracked
  const lastPathname = useRef(null)

  useEffect(() => {
    // 2. Only fire if GA exists AND the path is DIFFERENT from the last one
    // if (typeof window !== 'undefined' && window.gtag) {
    //   if (pathname !== lastPathname.current) {
    //     window.gtag('event', 'page_view', {
    //       page_path: pathname,
    //     })
    //     // 3. Update our reference so we don't fire again for this URL
    //     lastPathname.current = pathname
    //   }
    // }
  }, [pathname])

  return null
}