import { NextRequest, NextResponse } from "next/server";
import { handleChatRequest, DHRUV_AI_SYSTEM_PROMPT } from "@/lib/omniroute-agent";

async function queryExternalLLM(
  userMessage: string,
  history: Array<{ role: string; content: string }> = []
): Promise<string | null> {
  const geminiKey =
    process.env.GEMINI_API_KEY ||
    process.env.GOOGLE_API_KEY ||
    process.env.GOOGLE_GENERATIVE_AI_API_KEY;

  const groqKey = process.env.GROQ_API_KEY;
  const openaiKey = process.env.OPENAI_API_KEY;
  const openrouterKey = process.env.OPENROUTER_API_KEY;

  // 1. Google Gemini API
  if (geminiKey) {
    try {
      const contents = history.map((m) => ({
        role: m.role === "assistant" ? "model" : "user",
        parts: [{ text: m.content }],
      }));
      contents.push({ role: "user", parts: [{ text: userMessage }] });

      const res = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${geminiKey}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            system_instruction: { parts: [{ text: DHRUV_AI_SYSTEM_PROMPT }] },
            contents,
            generationConfig: { temperature: 0.7, maxOutputTokens: 1024 },
          }),
        }
      );

      if (res.ok) {
        const data = await res.json();
        const text = data?.candidates?.[0]?.content?.parts?.[0]?.text;
        if (text && text.trim()) return text.trim();
      }
    } catch (e) {
      console.warn("Gemini API call failed, falling back:", e);
    }
  }

  // 2. Groq API (LLaMA-3.3 70B)
  if (groqKey) {
    try {
      const res = await fetch("https://api.groq.com/openai/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${groqKey}`,
        },
        body: JSON.stringify({
          model: "llama-3.3-70b-versatile",
          messages: [
            { role: "system", content: DHRUV_AI_SYSTEM_PROMPT },
            ...history.map((m) => ({ role: m.role, content: m.content })),
            { role: "user", content: userMessage },
          ],
          temperature: 0.7,
        }),
      });

      if (res.ok) {
        const data = await res.json();
        const text = data?.choices?.[0]?.message?.content;
        if (text && text.trim()) return text.trim();
      }
    } catch (e) {
      console.warn("Groq API call failed, falling back:", e);
    }
  }

  // 3. OpenAI API (GPT-4o-mini)
  if (openaiKey) {
    try {
      const res = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${openaiKey}`,
        },
        body: JSON.stringify({
          model: "gpt-4o-mini",
          messages: [
            { role: "system", content: DHRUV_AI_SYSTEM_PROMPT },
            ...history.map((m) => ({ role: m.role, content: m.content })),
            { role: "user", content: userMessage },
          ],
          temperature: 0.7,
        }),
      });

      if (res.ok) {
        const data = await res.json();
        const text = data?.choices?.[0]?.message?.content;
        if (text && text.trim()) return text.trim();
      }
    } catch (e) {
      console.warn("OpenAI API call failed, falling back:", e);
    }
  }

  // 4. OpenRouter API
  if (openrouterKey) {
    try {
      const res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${openrouterKey}`,
        },
        body: JSON.stringify({
          model: "google/gemini-2.0-flash-exp:free",
          messages: [
            { role: "system", content: DHRUV_AI_SYSTEM_PROMPT },
            ...history.map((m) => ({ role: m.role, content: m.content })),
            { role: "user", content: userMessage },
          ],
        }),
      });

      if (res.ok) {
        const data = await res.json();
        const text = data?.choices?.[0]?.message?.content;
        if (text && text.trim()) return text.trim();
      }
    } catch (e) {
      console.warn("OpenRouter API call failed, falling back:", e);
    }
  }

  return null;
}



export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const userMessage =
      body.message ||
      (Array.isArray(body.messages) && body.messages.length > 0
        ? body.messages[body.messages.length - 1].content
        : body.prompt) ||
      "";

    if (!userMessage || typeof userMessage !== "string" || !userMessage.trim()) {
      return NextResponse.json(
        { error: "A valid message string is required." },
        { status: 400 }
      );
    }

    const history = Array.isArray(body.messages)
      ? body.messages.slice(0, -1).map((m: { role?: string; content?: string }) => ({
          role: m.role === "assistant" ? "assistant" : "user",
          content: m.content || "",
        }))
      : [];

    // Attempt live LLM completion
    let text = await queryExternalLLM(userMessage.trim(), history);
    let intent = "llm_generative";

    // Fallback to Omniroute Intelligence Engine
    if (!text) {
      const result = await handleChatRequest(userMessage.trim());
      text = result.text;
      intent = result.intent;
    }

    // Stream text response with natural pacing
    const encoder = new TextEncoder();
    const customReadable = new ReadableStream({
      async start(controller) {
        const chunks = text.split(/(\s+)/);
        for (const chunk of chunks) {
          controller.enqueue(encoder.encode(chunk));
          if (chunk.trim().length > 0) {
            await new Promise((r) => setTimeout(r, 12));
          }
        }
        controller.close();
      },
    });

    return new Response(customReadable, {
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "X-Intent-Route": intent,
      },
    });
  } catch (error) {
    console.error("API /api/chat error:", error);
    return NextResponse.json(
      {
        error: "Internal Server Error",
        text: "I am Dhruv AI — ready to assist with tech discussions, AI and cloud systems, or Dhruv's research at NSUT.",
      },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({
    status: "ok",
    agent: "Dhruv AI Agent",
    version: "3.0.0",
    description: "Multi-Model LLM & RAG Agent",
    providersSupported: ["Google Gemini", "Groq LLaMA", "OpenAI GPT", "OpenRouter", "Local Autonomous Engine"],
  });
}
