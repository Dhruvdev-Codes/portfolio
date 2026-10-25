import { NextRequest, NextResponse } from "next/server";
import { executeDevMtechRouter } from "@/lib/dev-mtech-router";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const prompt = body.prompt || body.message || body.query || "";
    
    if (!prompt || typeof prompt !== "string" || !prompt.trim()) {
      return NextResponse.json({ error: "Prompt is required" }, { status: 400 });
    }

    // Execute dev-mtech-router multi-tier cascading fallback
    const result = await executeDevMtechRouter(prompt.trim(), []);
    
    return NextResponse.json({ 
      answer: result.text,
      metadata: {
        router: result.routerName,
        tier: result.tier,
        provider: result.provider,
        model: result.model
      }
    });
  } catch (error) {
    console.error("API /api/agent error:", error);
    return NextResponse.json(
      { 
        answer: "I'm sorry, I'm having trouble processing your request through the OmniRoute gateway. Please try again in a moment.",
        error: "Internal Server Error"
      }, 
      { status: 500 }
    );
  }
}
