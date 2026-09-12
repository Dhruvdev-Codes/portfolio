import { NextRequest, NextResponse } from "next/server";
import { executeDevMtechRouter } from "@/lib/dev-mtech-router";

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

    // Execute dev-mtech-router multi-tier cascading fallback
    const result = await executeDevMtechRouter(userMessage.trim(), history);

    // Stream text response with natural pacing
    const encoder = new TextEncoder();
    const customReadable = new ReadableStream({
      async start(controller) {
        const chunks = result.text.split(/(\s+)/);
        for (const chunk of chunks) {
          controller.enqueue(encoder.encode(chunk));
          if (chunk.trim().length > 0) {
            await new Promise((r) => setTimeout(r, 10));
          }
        }
        controller.close();
      },
    });

    return new Response(customReadable, {
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "X-Router-Combo": result.routerName,
        "X-Active-Tier": result.tier,
        "X-Active-Provider": result.provider,
        "X-Active-Model": result.model,
        "X-Token-Compression": "enabled",
        "X-Compression-Saved": `${result.compressionStats.savingsPercent}%`,
      },
    });
  } catch (error) {
    console.error("API /api/chat error:", error);
    return NextResponse.json(
      {
        error: "Internal Server Error",
        text: "I am Dhruv AI — powered by dev-mtech-router. Ready to assist with tech discussions, AI and cloud systems, or Dhruv's research at NSUT Delhi.",
      },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({
    status: "ok",
    routerCombo: "dev-mtech-router",
    version: "3.2.0",
    tokenCompression: {
      status: "enabled",
      description: "Reduces redundant prompt overhead and normalizes conversational history prior to provider dispatch",
    },
    strategy: "automated-fallback-cascade",
    tiers: [
      {
        tier: 1,
        role: "Primary Tier",
        provider: "Google Gemini",
        model: "gemini-2.0-flash",
        purpose: "Fast general queries, reasoning, and code generation",
      },
      {
        tier: 2,
        role: "High-Throughput Backup Tier",
        provider: "Groq",
        model: "llama-3.3-70b-versatile",
        purpose: "High-throughput backup when Gemini hits rate limits (429) or failures",
      },
      {
        tier: 3,
        role: "Final Reliability Fallback Tier",
        provider: "OpenAI",
        model: "gpt-4o-mini",
        purpose: "Final reliability fallback",
      },
      {
        tier: 4,
        role: "Autonomous Offline Knowledge Tier",
        provider: "Autonomous Omniroute Engine",
        model: "omniroute-semantic-rag",
        purpose: "Offline deterministic CS/AI knowledge & Dhruv NSUT research RAG",
      },
    ],
  });
}

