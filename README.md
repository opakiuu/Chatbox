# Gemini 對話 Bot

使用 Google Gemini API 的簡易多輪對話 Bot。

## 1. 取得 Gemini API Key

1. 開啟 [Google AI Studio](https://aistudio.google.com/apikey)
2. 登入 Google 帳號後，點「Create API key」
3. 複製產生的 API Key（請勿分享給他人）

## 2. 安裝依賴

```bash
pip install -r requirements.txt
```

## 3. 設定 API Key

**Windows PowerShell（目前工作階段）：**
```powershell
$env:GEMINI_API_KEY = "你的API金鑰"
```

**Windows 命令提示字元：**
```cmd
set GEMINI_API_KEY=你的API金鑰
```

**或使用 .env 檔（需先安裝 python-dotenv）：**  
在專案目錄建立 `.env`，內容：
```
GEMINI_API_KEY=你的API金鑰
```
並在 `chatbox.py` 開頭加上：
```python
from dotenv import load_dotenv
load_dotenv()
```

## 4. 執行 Bot

```bash
python chatbox.py
```

輸入訊息後按 Enter 與 Bot 對話，輸入 `quit`、`exit` 或 `q` 結束。

## 更換模型

在 `chatbox.py` 中可修改 `DEFAULT_MODEL`，例如：
- `gemini-2.0-flash`（預設，速度快）
- `gemini-2.0-pro`（較強推理）
- `gemini-1.5-flash`、`gemini-1.5-pro`

## 參考

- [Gemini API 說明](https://ai.google.dev/gemini-api/docs)
- [Google AI Studio](https://aistudio.google.com/)
