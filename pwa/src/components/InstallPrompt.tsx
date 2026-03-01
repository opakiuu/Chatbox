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

  if (isStandalone) return null

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 max-w-sm w-full border border-gray-200">
      <h2 className="text-lg font-semibold mb-3">加入主畫面</h2>
      {isIOS ? (
        <div className="space-y-3 text-sm text-gray-600">
          <p>在 iPhone 上安裝此 App：</p>
          <ol className="list-decimal list-inside space-y-2">
            <li>點 Safari 底部的「分享」按鈕</li>
            <li>向下捲動，選擇「加入主畫面」</li>
            <li>點「加入」完成</li>
          </ol>
          <p className="text-xs text-gray-500 pt-2">
            安裝後會以全螢幕模式開啟，體驗更接近原生 App
          </p>
        </div>
      ) : (
        <p className="text-sm text-gray-600">
          使用瀏覽器選單的「安裝應用程式」或「加入主畫面」即可
        </p>
      )}
    </div>
  )
}
