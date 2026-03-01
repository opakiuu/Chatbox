"""產生 PWA 所需的 192x192 與 512x512 圖示"""
try:
    from PIL import Image
except ImportError:
    print("請先安裝: pip install Pillow")
    exit(1)

import os

os.makedirs("../public", exist_ok=True)
for size in (192, 512):
    img = Image.new("RGB", (size, size), color=(30, 58, 138))
    path = f"../public/icon-{size}.png"
    img.save(path)
    print(f"已建立 {path}")
