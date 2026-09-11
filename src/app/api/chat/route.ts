import { openai } from "@ai-sdk/openai";
import { streamText } from "ai";
import { Index } from "@upstash/vector";
import { searchLocalKnowledge, generateLocalRAGResponse } from "@/lib/rag-helper";

export const runtime = "edge";

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();
    const latestUserMessage = messages[messages.length - 1]?.content || "";

    // 1. Vector Search for Relevant Context
    let contextText = "";
    if (process.env.UPSTASH_VECTOR_REST_URL && process.env.UPSTASH_VECTOR_REST_TOKEN) {
      try {
        const index = new Index({
          url: process.env.UPSTASH_VECTOR_REST_URL,
          token: process.env.UPSTASH_VECTOR_REST_TOKEN,
        });

        const searchResults = await index.query({
          data: latestUserMessage,
          topK: 3,
          includeMetadata: true,
        });

        contextText = searchResults
          .map((res) => `[Source: ${res.metadata?.title || "Document"}]: ${res.data}`)
          .join("\n\n");
      } catch (vectorErr) {
        console.warn("Vector query fallback to local index:", vectorErr);
        contextText = searchLocalKnowledge(latestUserMessage);
      }
    } else {
      contextText = searchLocalKnowledge(latestUserMessage);
    }

    // 2. Stream with OpenAI if OPENAI_API_KEY is configured
    if (process.env.OPENAI_API_KEY) {
      const systemPrompt = `You are the AI Research & Systems Assistant for Dhruv Upadhyay, an M.Tech CSE scholar at Netaji Subhas University of Technology (NSUT), New Delhi.
Answer technical questions regarding his M.Tech research on Link Predictability in Ad-Hoc Networks, system architecture, full-stack projects (WorkVibe, SkillXchange, Travel World), AWS Cloud Architecting certifications, and technical skills.
Always remain accurate and adhere strictly to the provided context. If unsure, invite the user to inspect his GitHub or email him directly.

[CONTEXT DATA]:
${contextText}
`;

      const result = await streamText({
        model: openai("gpt-4o-mini"),
        system: systemPrompt,
        messages,
      });

      return result.toTextStreamResponse();
    }

    // 3. High-Performance Local RAG Stream Fallback (Zero Config Mode)
    const localAnswer = generateLocalRAGResponse(latestUserMessage, contextText);
    const encoder = new TextEncoder();

    const customStream = new ReadableStream({
      async start(controller) {
        const words = localAnswer.split(" ");
        for (let i = 0; i < words.length; i++) {
          const chunk = (i === 0 ? "" : " ") + words[i];
          controller.enqueue(encoder.encode(chunk));
          await new Promise((resolve) => setTimeout(resolve, 15));
        }
        controller.close();
      },
    });

    return new Response(customStream, {
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
      },
    });
  } catch (error) {
    console.error("Chat API error:", error);
    return new Response(
      JSON.stringify({ error: "Failed to process chat request" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}

