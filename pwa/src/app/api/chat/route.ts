import { NextResponse } from 'next/server'

const MODEL_NAME = 'gemini-2.5-flash'

type ChatMessage = {
  role: 'user' | 'assistant'
  content: string
}

export async function POST(request: Request) {
  const apiKey = process.env.GEMINI_API_KEY
  if (!apiKey) {
    return NextResponse.json(
      { error: 'Server is missing GEMINI_API_KEY' },
      { status: 500 }
    )
  }

  let body: { messages?: ChatMessage[]; message?: string }
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 })
  }

  const messages = body.messages ?? []
  const last = body.message
  if (!last && messages.length === 0) {
    return NextResponse.json(
      { error: 'messages or message is required' },
      { status: 400 }
    )
  }

  const allMessages: ChatMessage[] =
    last && messages.length === 0
      ? [{ role: 'user', content: last }]
      : messages

  const contents = allMessages.map((m) => ({
    role: m.role === 'user' ? 'user' : 'model',
    parts: [{ text: m.content }],
  }))

  try {
    const res = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/${MODEL_NAME}:generateContent`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-goog-api-key': apiKey,
        },
        body: JSON.stringify({ contents }),
      }
    )

    if (!res.ok) {
      const text = await res.text()
      return NextResponse.json(
        { error: 'Gemini API error', detail: text },
        { status: 500 }
      )
    }

    const data = (await res.json()) as {
      candidates?: { content?: { parts?: { text?: string }[] } }[]
    }

    const text =
      data.candidates?.[0]?.content?.parts?.[0]?.text ?? '(no response text)'

    return NextResponse.json({ reply: text })
  } catch (err) {
    return NextResponse.json(
      { error: 'Failed to call Gemini API', detail: String(err) },
      { status: 500 }
    )
  }
}

