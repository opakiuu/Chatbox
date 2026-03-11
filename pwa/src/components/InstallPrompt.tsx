'use client'

import { useState, useEffect } from 'react'

export function InstallPrompt() {
  const [isIOS, setIsIOS] = useState(false)
  const [isStandalone, setIsStandalone] = useState(false)

  useEffect(() => {
    const ua = navigator.userAgent
    setIsIOS(/iPad|iPhone|iPod/.test(ua) && !(window as unknown as { MSStream?: boolean }).MSStream)
    setIsStandalone(
      window.matchMedia('(display-mode: standalone)').matches ||
      (navigator as Navigator & { standalone?: boolean }).standalone === true
    )
  }, [])
  
  return (
    <div className="bg-white rounded-xl shadow-lg p-6 max-w-sm w-full border border-gray-200">
      <h2 className="text-lg font-semibold mb-3">Sponsor</h2>
      <p className="text-sm text-gray-600">
        Thanks for Apple and Google Gemini support
      </p>
    </div>
  )
}
