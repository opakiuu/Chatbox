# Chatbox PWA

Next.js PWA，針對 **Safari / iPhone** 優化，可加入主畫面像 App 一樣使用。

## 必要條件

- [Node.js](https://nodejs.org/) 18+
- npm 或 pnpm

## 安裝與執行

```bash
cd pwa
npm install
npm run dev
```

在瀏覽器開啟 http://localhost:3000

## iPhone 安裝步驟

1. 用 **Safari** 開啟你的網站（需 HTTPS）
2. 點底部的「分享」按鈕
3. 選擇「加入主畫面」
4. 點「加入」完成

安裝後會以全螢幕模式開啟，體驗接近原生 App。

## 已設定的 Safari/iPhone 支援

- `manifest.ts`：Web App Manifest（`display: standalone`）
- `apple-mobile-web-app-capable`：全螢幕模式
- `apple-touch-icon`：主畫面圖示（含 iOS 15.4 以前）
- `InstallPrompt`：偵測 iOS 並顯示安裝說明
- Service Worker：離線快取

## 自訂圖示

替換 `public/icon-192.png` 與 `public/icon-512.png`，或執行：

```bash
cd scripts
python generate-icons.py
```

也可使用 [RealFaviconGenerator](https://realfavicongenerator.net/) 產生完整圖示組。

## 部署

部署到 Vercel、Netlify 等支援 HTTPS 的平台。PWA 需在 **HTTPS** 環境下才能安裝。
