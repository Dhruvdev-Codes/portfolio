/**
 * dev-mtech-router: Multi-Tier Cascading Fallback LLM Router Engine
 * Primary: Google Gemini 2.0 Flash | Tier 2: Groq LLaMA 3.3 70B | Tier 3: OpenAI GPT-4o-mini
 * Tier 4: Autonomous Omniroute RAG Engine | Token Compression Enabled
 */

import { DHRUV_AI_SYSTEM_PROMPT, handleChatRequest } from "./omniroute-agent";
import { compressPromptContext, CompressionStats } from "./token-compression";

export interface RouterExecutionResult {
  text: string;
  tier:
    | "tier-1-gemini-2.0-flash"
    | "tier-2-groq-llama-3.3-70b"
    | "tier-3-openai-gpt-4o-mini"
    | "tier-openrouter"
    | "tier-4-autonomous-engine";
  provider: string;
  model: string;
  routerName: "dev-mtech-router";
  compressionStats: CompressionStats;
}

async function callGemini(
  sys: string,
  user: string,
  hist: Array<{ role: string; content: string }>
): Promise<string | null> {
  const k =
    process.env.GEMINI_API_KEY ||
    process.env.GOOGLE_API_KEY ||
    process.env.GOOGLE_GENERATIVE_AI_API_KEY;
  if (!k) return null;

  for (const m of ["gemini-2.0-flash", "gemini-2.0-flash-exp", "gemini-1.5-flash"]) {
    try {
      const contents = hist.map((item) => ({
        role: item.role === "assistant" ? "model" : "user",
        parts: [{ text: item.content }],
      }));
      contents.push({ role: "user", parts: [{ text: user }] });

      const ctrl = new AbortController();
      const t = setTimeout(() => ctrl.abort(), 8000);

      const res = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/${m}:generateContent?key=${k}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            system_instruction: { parts: [{ text: sys }] },
            contents,
            generationConfig: { temperature: 0.7, maxOutputTokens: 1536 },
          }),
          signal: ctrl.signal,
        }
      );
      clearTimeout(t);

      if (res.ok) {
        const d = await res.json();
        const txt = d?.candidates?.[0]?.content?.parts?.[0]?.text;
        if (txt?.trim()) return txt.trim();
      }
    } catch (e) {
      console.warn(`Gemini (${m}) failed, cascading:`, (e as Error).message);
    }
  }
  return null;
}

async function callGroq(
  sys: string,
  user: string,
  hist: Array<{ role: string; content: string }>
): Promise<string | null> {
  const k = process.env.GROQ_API_KEY;
  if (!k) return null;

  try {
    const ctrl = new AbortController();
    const t = setTimeout(() => ctrl.abort(), 7000);

    const res = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${k}`,
      },
      body: JSON.stringify({
        model: "llama-3.3-70b-versatile",
        messages: [
          { role: "system", content: sys },
          ...hist.map((h) => ({ role: h.role, content: h.content })),
          { role: "user", content: user },
        ],
        temperature: 0.7,
        max_tokens: 1536,
      }),
      signal: ctrl.signal,
    });
    clearTimeout(t);

    if (res.ok) {
      const d = await res.json();
      const txt = d?.choices?.[0]?.message?.content;
      if (txt?.trim()) return txt.trim();
    }
  } catch (e) {
    console.warn("Groq API failed, cascading:", (e as Error).message);
  }
  return null;
}

async function callOpenAI(
  sys: string,
  user: string,
  hist: Array<{ role: string; content: string }>
): Promise<string | null> {
  const k = process.env.OPENAI_API_KEY;
  if (!k) return null;

  try {
    const ctrl = new AbortController();
    const t = setTimeout(() => ctrl.abort(), 8000);

    const res = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${k}`,
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          { role: "system", content: sys },
          ...hist.map((h) => ({ role: h.role, content: h.content })),
          { role: "user", content: user },
        ],
        temperature: 0.7,
        max_tokens: 1536,
      }),
      signal: ctrl.signal,
    });
    clearTimeout(t);

    if (res.ok) {
      const d = await res.json();
      const txt = d?.choices?.[0]?.message?.content;
      if (txt?.trim()) return txt.trim();
    }
  } catch (e) {
    console.warn("OpenAI API failed, cascading:", (e as Error).message);
  }
  return null;
}

async function callOpenRouter(
  sys: string,
  user: string,
  hist: Array<{ role: string; content: string }>
): Promise<string | null> {
  const k = process.env.OPENROUTER_API_KEY;
  if (!k) return null;

  try {
    const ctrl = new AbortController();
    const t = setTimeout(() => ctrl.abort(), 8000);

    const res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${k}`,
      },
      body: JSON.stringify({
        model: "google/gemini-2.0-flash-exp:free",
        messages: [
          { role: "system", content: sys },
          ...hist.map((h) => ({ role: h.role, content: h.content })),
          { role: "user", content: user },
        ],
      }),
      signal: ctrl.signal,
    });
    clearTimeout(t);

    if (res.ok) {
      const d = await res.json();
      const txt = d?.choices?.[0]?.message?.content;
      if (txt?.trim()) return txt.trim();
    }
  } catch (e) {
    console.warn("OpenRouter failed:", (e as Error).message);
  }
  return null;
}

export async function executeDevMtechRouter(
  rawUser: string,
  rawHist: Array<{ role: string; content: string }> = []
): Promise<RouterExecutionResult> {
  // Step 1: Token Compression
  const { compressedSystemPrompt, compressedHistory, compressedUserMessage, stats } =
    compressPromptContext(DHRUV_AI_SYSTEM_PROMPT, rawHist, rawUser);

  // Tier 1: Gemini 2.0 Flash (Primary)
  const geminiRes = await callGemini(
    compressedSystemPrompt,
    compressedUserMessage,
    compressedHistory
  );
  if (geminiRes) {
    return {
      text: geminiRes,
      tier: "tier-1-gemini-2.0-flash",
      provider: "Google Gemini",
      model: "gemini-2.0-flash",
      routerName: "dev-mtech-router",
      compressionStats: stats,
    };
  }

  // Tier 2: Groq LLaMA 3.3 70B (High-Throughput Backup Cascade)
  const groqRes = await callGroq(
    compressedSystemPrompt,
    compressedUserMessage,
    compressedHistory
  );
  if (groqRes) {
    return {
      text: groqRes,
      tier: "tier-2-groq-llama-3.3-70b",
      provider: "Groq",
      model: "llama-3.3-70b-versatile",
      routerName: "dev-mtech-router",
      compressionStats: stats,
    };
  }

  // Tier 3: OpenAI GPT-4o-mini (Final Reliability Fallback)
  const openaiRes = await callOpenAI(
    compressedSystemPrompt,
    compressedUserMessage,
    compressedHistory
  );
  if (openaiRes) {
    return {
      text: openaiRes,
      tier: "tier-3-openai-gpt-4o-mini",
      provider: "OpenAI",
      model: "gpt-4o-mini",
      routerName: "dev-mtech-router",
      compressionStats: stats,
    };
  }

  // OpenRouter Fallback
  const openrouterRes = await callOpenRouter(
    compressedSystemPrompt,
    compressedUserMessage,
    compressedHistory
  );
  if (openrouterRes) {
    return {
      text: openrouterRes,
      tier: "tier-openrouter",
      provider: "OpenRouter",
      model: "gemini-2.0-flash-exp",
      routerName: "dev-mtech-router",
      compressionStats: stats,
    };
  }

  // Tier 4: Autonomous Offline Knowledge & RAG Engine Fallback
  const localResult = await handleChatRequest(compressedUserMessage);
  return {
    text: localResult.text,
    tier: "tier-4-autonomous-engine",
    provider: "Dhruv AI Autonomous Engine",
    model: "omniroute-semantic-rag",
    routerName: "dev-mtech-router",
    compressionStats: stats,
  };
}
