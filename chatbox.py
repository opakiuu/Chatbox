"""
Automatic Chat Bot - Using the Google Gemini API
Please set the GEMINI_API_KEY environment variable before running.
"""

import os
from google import genai
from google.genai import types
from dotenv import load_dotenv

load_dotenv()

# Default model. You can change it to gemini-1.5-flash, gemini-2.0-pro, etc.
DEFAULT_MODEL = "gemini-2.5-flash"


def get_client():
    """Create a Gemini client, prioritizing the GEMINI_API_KEY environment variable."""
    api_key = os.environ.get("GEMINI_API_KEY")
    if not api_key:
        raise ValueError(
            "Please set the GEMINI_API_KEY environment variable.\n"
            "Get your API key at: https://aistudio.google.com/apikey\n"
            "Windows PowerShell: $env:GEMINI_API_KEY='your_api_key'\n"
            "Or create a .env file and load it using python-dotenv."
        )
    return genai.Client(api_key=api_key)


def run_chat(model: str = DEFAULT_MODEL):
    """Run a conversation loop: read user input, call the Gemini API, and display the response."""
    client = get_client()
    # using content structure to start many turn history 
    history: list[types.Content] = []

    print("=== Gemini chat Bot ===\n")
    print("press enter after typing message. press quit or exit to end the code. \n")

    while True:
        try:
            user_input = input("You: ").strip()
        except (EOFError, KeyboardInterrupt):
            print("\Bye!")
            break

        if not user_input:
            continue
        if user_input.lower() in ("quit", "exit", "q"):
            print("bye!")
            break

        # push user message to history
        history.append(types.Content(role="user", parts=[types.Part(text=user_input)]))

        try:
            response = client.models.generate_content(
                model=model,
                contents=history,
            )
            text = response.text if hasattr(response, "text") else str(response)
            if not text:
                text = "(no any message reply)"
            #message from assistance push to history
            history.append(types.Content(role="model", parts=[types.Part(text=text)]))
        except Exception as e:
            text = f"[error] {e}"
            history.append(types.Content(role="model", parts=[types.Part(text=text)]))

        print(f"\nBot: {text}\n")


if __name__ == "__main__":
    run_chat()
