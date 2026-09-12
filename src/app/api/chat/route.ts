import { NextRequest, NextResponse } from "next/server";
import { handleChatRequest, DHRUV_AI_SYSTEM_PROMPT } from "@/lib/omniroute-agent";

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

    const { text, intent } = await handleChatRequest(userMessage.trim());

    // Stream text response
    const encoder = new TextEncoder();
    const customReadable = new ReadableStream({
      async start(controller) {
        const chunks = text.split(/(\s+)/);
        for (const chunk of chunks) {
          controller.enqueue(encoder.encode(chunk));
          if (chunk.trim().length > 0) {
            await new Promise((r) => setTimeout(r, 14));
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
    agent: "Dhruv AI Omniroute Agent",
    version: "2.0.0",
    description: "Hybrid Guardrail RAG & General CS/AI Agent",
    promptPreview: DHRUV_AI_SYSTEM_PROMPT.slice(0, 120) + "...",
  });
}
