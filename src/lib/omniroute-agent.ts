/**
 * Omniroute & LLM Agent Pipeline for Dhruv AI
 * Hybrid Guardrail Pattern: Intent Routing & Contextual Bridging
 */

import { searchLocalKnowledge, generateLocalRAGResponse } from "./rag-helper";

export const DHRUV_AI_SYSTEM_PROMPT = `You are Dhruv AI, an interactive, highly intelligent, and conversational personal AI agent representing Dhruv (an M.Tech / researcher in ad-hoc wireless systems at NSUT Delhi, cloud/AWS practitioner, and software engineer).

### Personality & Tone
- **Conversational & Human-like:** Speak naturally, fluently, and warmly like ChatGPT or Gemini. Avoid rigid, repetitive boilerplate phrasing or robotic templates.
- **Adaptive Knowledge:** 
  1. For casual chat (e.g., "hi", "how are you"), respond naturally as a friendly human.
  2. For general knowledge queries (e.g., "what is ChatGPT?", "explain quantum computing"), answer them clearly and accurately just like a general-purpose AI assistant.
  3. For questions about Dhruv, use your provided knowledge base (research at NSUT Delhi, AWS certifications, projects like WorkVibe or SkillXchange, skills, systems).
- **Graceful Professional Pivot:** If the user asks a general question, answer it fully and naturally, and then smoothly connect it back to Dhruv's expertise *only when relevant*, instead of blocking or giving an error message. Never use the exact same canned sentence structure repeatedly.`;

export type QueryIntent = "greeting_casual" | "general_knowledge" | "portfolio_rag" | "dynamic_conversational";

export function checkIfGreeting(userMessage: string): boolean {
  const q = userMessage.trim().toLowerCase();
  return (
    /^(hi|hello|hey|hey there|greetings|howdy|good morning|good afternoon|good evening|yo|sup|hiya)\b/i.test(q) ||
    /^(how are you|how r u|how are you doing|how's it going|wassup|what's up)\b/i.test(q) ||
    /^(who are you|what are you|what is your name|who made you|who created you)\b/i.test(q) ||
    /^(thanks|thank you|thx|cheers|appreciate it|much appreciated)\b/i.test(q) ||
    /^(bye|goodbye|see you|cya|take care|have a good day)\b/i.test(q) ||
    /^(tell me a joke|make me laugh|got any jokes)\b/i.test(q)
  );
}

export function checkIfGeneralInquiry(userMessage: string): boolean {
  const q = userMessage.trim().toLowerCase();
  const keywords = [
    "what is chatgpt", "what is gpt", "what is an llm", "what is llm",
    "what is quantum computing", "qubit", "what is machine learning", "what is deep learning",
    "what is ai", "artificial intelligence", "what is docker", "what is kubernetes",
    "what is cloud computing", "what is aws", "what is azure", "what is gcp",
    "what is cryptography", "what is blockchain", "what is manet", "what is vanet",
    "what is react", "what is nextjs", "what is nodejs", "rest vs graphql",
    "sql vs nosql", "what is mongodb", "what is redis", "kalman filter", "big o"
  ];

  if (keywords.some((kw) => q.includes(kw))) return true;

  if (/^(what is|what are|explain|how does|how do|why is|difference between)\s+/i.test(q)) {
    if (q.includes("dhruv") || q.includes("workvibe") || q.includes("skillxchange") || q.includes("travel world") || q.includes("nsut")) {
      return false;
    }
    return true;
  }
  return false;
}

export function checkIfPortfolioQuery(userMessage: string): boolean {
  const q = userMessage.trim().toLowerCase();
  const portfolioPattern = /\b(dhruv|upadhyay|research|thesis|dissertation|manet|vanet|link predict|let formula|rssi|kalman|workvibe|skillxchange|travel world|nsut|aitr|aws|certifications?|credentials?|google cybersecurity|resume|cv|portfolio)\b/i;
  return portfolioPattern.test(q) || q.includes("contact") || q.includes("github") || q.includes("email");
}

export function routeUserQuery(userMessage: string, context?: string): {
  intent: QueryIntent;
  bypassVectorSearch: boolean;
  response: string;
} {
  const isGreeting = checkIfGreeting(userMessage);
  const isGeneral = checkIfGeneralInquiry(userMessage);
  const isPortfolio = checkIfPortfolioQuery(userMessage);

  if (isGreeting) {
    return {
      intent: "greeting_casual",
      bypassVectorSearch: true,
      response: generateLocalRAGResponse(userMessage, ""),
    };
  }

  if (isGeneral && !isPortfolio) {
    return {
      intent: "general_knowledge",
      bypassVectorSearch: true,
      response: generateLocalRAGResponse(userMessage, ""),
    };
  }

  const retrievalContext = context || searchLocalKnowledge(userMessage);
  return {
    intent: isPortfolio ? "portfolio_rag" : "dynamic_conversational",
    bypassVectorSearch: false,
    response: generateLocalRAGResponse(userMessage, retrievalContext),
  };
}

export async function handleChatRequest(
  userMessage: string
): Promise<{ text: string; intent: QueryIntent }> {
  const routing = routeUserQuery(userMessage);
  return {
    text: routing.response,
    intent: routing.intent,
  };
}
