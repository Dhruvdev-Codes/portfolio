/**
 * Omniroute & LLM Agent Pipeline for Dhruv AI
 * Hybrid Guardrail Pattern: Intent Routing & Contextual Bridging
 */

import { searchLocalKnowledge, generateLocalRAGResponse, DHRUV_AI_SYSTEM_PROMPT } from "./rag-helper";

export { DHRUV_AI_SYSTEM_PROMPT };

export type QueryIntent = "greeting_casual" | "general_knowledge" | "portfolio_rag" | "dynamic_conversational";

export function checkIfGreeting(userMessage: string): boolean {
  const q = userMessage.trim().toLowerCase();
  return (
    /^(hi|hello|hey|hey there|greetings|howdy|good morning|good afternoon|good evening|yo|sup|hiya)\b/i.test(q) ||
    /^(how are you|how r u|how are you doing|how's it going|wassup|what's up)\b/i.test(q) ||
    /^(who are you|what are you|what is your name|who made you|who created you)\b/i.test(q) ||
    /^(thanks|thank you|thx|cheers|appreciate it|much appreciated)\b/i.test(q) ||
    /^(bye|goodbye|see you|cya|take care|have a good day)\b/i.test(q) ||
    /^(tell me a joke|make me laugh|got any jokes)\b/i.test(q) ||
    q.includes("which ai model") ||
    q.includes("what ai model") ||
    q.includes("what model do you use") ||
    q.includes("which model do you use") ||
    q.includes("what model are you") ||
    q.includes("which model are you") ||
    q.includes("what llm") ||
    q.includes("which llm")
  );
}

export function checkIfPortfolioQuery(userMessage: string): boolean {
  const q = userMessage.trim().toLowerCase();
  const portfolioPattern = /\b(dhruv|dhruv's|upadhyay|nsut|aitr|workvibe|skillxchange|travel world|let formula|link predict|rssi|kalman|aead|dissertation|thesis|research|certifications?|credentials?|google cybersecurity|resume|cv|portfolio)\b/i;
  return portfolioPattern.test(q) || q.includes("contact") || q.includes("github") || q.includes("email") || q.includes("hire dhruv");
}

export function checkIfGeneralInquiry(userMessage: string): boolean {
  const q = userMessage.trim().toLowerCase();
  if (checkIfPortfolioQuery(userMessage)) return false;

  const generalPattern = /^(what is|what are|explain|how does|how do|why is|difference between|compare|which|write|code|solve|calculate|what)\b/i;
  return generalPattern.test(q) || q.includes("transformer") || q.includes("chatgpt") || q.includes("llm") || q.includes("binary search") || q.includes("quicksort") || q.includes("docker") || q.includes("react");
}

export function routeUserQuery(userMessage: string, context?: string): {
  intent: QueryIntent;
  bypassVectorSearch: boolean;
  response: string;
} {
  const isGreeting = checkIfGreeting(userMessage);
  const isPortfolio = checkIfPortfolioQuery(userMessage);
  const isGeneral = checkIfGeneralInquiry(userMessage);

  if (isGreeting) {
    return {
      intent: "greeting_casual",
      bypassVectorSearch: true,
      response: generateLocalRAGResponse(userMessage, ""),
    };
  }

  if (isPortfolio) {
    const retrievalContext = context || searchLocalKnowledge(userMessage);
    return {
      intent: "portfolio_rag",
      bypassVectorSearch: false,
      response: generateLocalRAGResponse(userMessage, retrievalContext),
    };
  }

  if (isGeneral) {
    return {
      intent: "general_knowledge",
      bypassVectorSearch: true,
      response: generateLocalRAGResponse(userMessage, ""),
    };
  }

  return {
    intent: "dynamic_conversational",
    bypassVectorSearch: true,
    response: generateLocalRAGResponse(userMessage, ""),
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
