import type { Metadata, Viewport } from 'next'
import { SWProvider } from './providers'
import './globals.css'

export const metadata: Metadata = {
  title: 'Chatbox PWA',
  description: 'Progressive Web App for iPhone Safari',
  manifest: '/manifest.webmanifest',
  // Safari / iPhone 專用 meta
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'Chatbox',
  },
  formatDetection: {
    telephone: false,
    email: false,
  },
}

export const viewport: Viewport = {
  themeColor: '#000000',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="zh-TW">
      <head>
        {/* iOS 15.4 以前需用 apple-touch-icon，否則會覆蓋 manifest */}
        <link rel="apple-touch-icon" href="/icon-192.png" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
      </head>
      <body className="antialiased">
        <SWProvider>{children}</SWProvider>
      </body>
    </html>
  )
}
