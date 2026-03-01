'use client'

import { useState } from 'react'
import { InstallPrompt } from '@/components/InstallPrompt'

type Message = {
  id: number
  role: 'user' | 'assistant'
  content: string
}

export default function Home() {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function sendMessage(e: React.FormEvent) {
    e.preventDefault()
    const content = input.trim()
    if (!content || loading) return

    const myMsg: Message = {
      id: Date.now(),
      role: 'user',
      content,
    }
    const history = [...messages, myMsg]
    setMessages(history)
    setInput('')
    setLoading(true)
    setError(null)

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: history.map((m) => ({
            role: m.role,
            content: m.content,
          })),
        }),
      })

      const data = await res.json()
      if (!res.ok) {
        const base = data?.error || 'Gemini API error'
        const detail = data?.detail ? `: ${data.detail}` : ''
        throw new Error(base + detail || '呼叫 AI 失敗')
      }

      const reply: Message = {
        id: Date.now() + 1,
        role: 'assistant',
        content: data.reply ?? '(沒有回應內容)',
      }
      setMessages((prev) => [...prev, reply])
    } catch (err) {
      setError(err instanceof Error ? err.message : String(err))
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="min-h-screen flex flex-col items-center justify-between p-4 bg-gray-50">
      <div className="w-full max-w-md flex flex-col gap-4">
        <header className="text-center">
          <h1 className="text-2xl font-bold mb-1">AI Chatbox</h1>
          <p className="text-gray-600 text-sm">
            使用 Gemini，支援 iPhone Safari PWA
          </p>
        </header>

        <section className="flex-1 min-h-[320px] max-h-[480px] overflow-y-auto rounded-2xl border border-gray-200 bg-white p-3 space-y-2">
          {messages.length === 0 && (
            <p className="text-gray-400 text-sm text-center mt-12">
              開始輸入訊息，與 AI 對話…
            </p>
          )}
          {messages.map((m) => (
            <div
              key={m.id}
              className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`rounded-2xl px-3 py-2 text-sm max-w-[80%] whitespace-pre-wrap ${
                  m.role === 'user'
                    ? 'bg-blue-600 text-white rounded-br-sm'
                    : 'bg-gray-100 text-gray-900 rounded-bl-sm'
                }`}
              >
                {m.content}
              </div>
            </div>
          ))}
          {loading && (
            <p className="text-gray-400 text-xs text-center mt-2">
              AI 思考中…
            </p>
          )}
        </section>

        {error && (
          <p className="text-red-500 text-xs text-center break-words">
            {error}
          </p>
        )}

        <form
          onSubmit={sendMessage}
          className="flex items-center gap-2 rounded-2xl border border-gray-200 bg-white px-3 py-2"
        >
          <input
            className="flex-1 border-none outline-none text-sm bg-transparent"
            placeholder="輸入訊息…"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <button
            type="submit"
            disabled={loading || !input.trim()}
            className="text-sm px-3 py-1.5 rounded-xl bg-blue-600 text-white disabled:opacity-40"
          >
            發送
          </button>
        </form>

        <InstallPrompt />
      </div>
    </main>
  )
}

