"""
自動對話 Bot - 使用 Google Gemini API
執行前請設定環境變數 GEMINI_API_KEY
"""

import os
from google import genai
from google.genai import types
from dotenv import load_dotenv

load_dotenv()

# 預設模型，可改成 gemini-1.5-flash、gemini-2.0-pro 等
DEFAULT_MODEL = "gemini-2.5-flash"


def get_client():
    """建立 Gemini 客戶端，優先使用環境變數 GEMINI_API_KEY"""
    api_key = os.environ.get("GEMINI_API_KEY")
    if not api_key:
        raise ValueError(
            "請設定 GEMINI_API_KEY 環境變數。\n"
            "取得 API Key:https://aistudio.google.com/apikey\n"
            'Windows PowerShell: $env:GEMINI_API_KEY="你的金鑰"\n'
            "或建立 .env 檔案並用 python-dotenv 載入"
        )
    return genai.Client(api_key=api_key)


def run_chat(model: str = DEFAULT_MODEL):
    """執行對話迴圈：讀取用戶輸入，呼叫 Gemini,印出回覆"""
    client = get_client()
    # 多輪對話歷史，使用 Content 結構
    history: list[types.Content] = []

    print("=== Gemini 對話 Bot ===\n")
    print("輸入訊息後按 Enter，輸入 quit 或 exit 結束。\n")

    while True:
        try:
            user_input = input("你: ").strip()
        except (EOFError, KeyboardInterrupt):
            print("\n再見!")
            break

        if not user_input:
            continue
        if user_input.lower() in ("quit", "exit", "q"):
            print("再見！")
            break

        # 將使用者訊息加入歷史
        history.append(types.Content(role="user", parts=[types.Part(text=user_input)]))

        try:
            response = client.models.generate_content(
                model=model,
                contents=history,
            )
            text = response.text if hasattr(response, "text") else str(response)
            if not text:
                text = "(無回覆內容)"
            # 將助理回覆加入歷史
            history.append(types.Content(role="model", parts=[types.Part(text=text)]))
        except Exception as e:
            text = f"[錯誤] {e}"
            history.append(types.Content(role="model", parts=[types.Part(text=text)]))

        print(f"\nBot: {text}\n")


if __name__ == "__main__":
    run_chat()
