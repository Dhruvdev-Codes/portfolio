/**
 * Comprehensive General Knowledge, AI & Conversational Intelligence Engine for Dhruv AI
 */

import { CS_AI_TOPICS, WORLD_CAPITALS } from "./knowledge-topics";

export function getConversationalResponse(q: string): string | null {
  const query = q.trim().toLowerCase();

  // 1. AI Model, Router & Architecture Inquiries
  if (
    query.includes("which ai model") ||
    query.includes("what ai model") ||
    query.includes("what model do you use") ||
    query.includes("which model do you use") ||
    query.includes("what model are you") ||
    query.includes("which model are you") ||
    query.includes("what model") ||
    query.includes("which model") ||
    query.includes("what llm") ||
    query.includes("which llm") ||
    query.includes("router") ||
    query.includes("dev-mtech-router") ||
    query.includes("fallback") ||
    query.includes("token compression") ||
    query.includes("are you chatgpt") ||
    query.includes("are you gemini") ||
    query.includes("are you gpt") ||
    query.includes("how do you work") ||
    query.includes("how were you built") ||
    query.includes("what is your architecture")
  ) {
    return `I am powered by the **\`dev-mtech-router\`** engine configured with an automated cascading fallback strategy and real-time token compression.

### ⚡ **dev-mtech-router Architecture & Cascade Tiers:**

1. **Tier 1 (Primary — High-Speed Generation):**
   - **Google Gemini 2.0 Flash** (\`gemini-2.0-flash\`) — Low-latency reasoning, general inquiries, and rapid code generation.
2. **Tier 2 (High-Throughput Backup Cascade):**
   - **Groq LLaMA 3.3 70B** (\`llama-3.3-70b-versatile\`) — Cascaded automatically if Gemini encounters rate limits (HTTP 429) or transient provider outages.
3. **Tier 3 (Final Reliability Fallback):**
   - **OpenAI GPT-4o-mini** (\`gpt-4o-mini\`) — High reliability fallback tier for mission-critical continuity.
4. **Tier 4 (Autonomous Omniroute Knowledge & RAG Engine):**
   - Built-in deterministic semantic engine grounded in core CS/AI domain knowledge, algorithms, and verified research with 100% uptime and zero API reliance.

🚀 **Token Compression:** Active (strips redundant prompt whitespace and optimizes multi-turn conversational context before provider dispatch).

I can answer any general question, write code, solve math problems, discuss science, or chat naturally on any topic!`;
  }

  // 2. Greetings & Warm Openers
  if (/^(hi|hello|hey|hey there|greetings|howdy|good morning|good afternoon|good evening|yo|sup|hiya)\b/i.test(query)) {
    const greetings = [
      "Hello! How can I help you today? Whether you have questions about coding, math, science, systems design, or any general topic, feel free to ask.",
      "Hey there! Welcome. How can I assist you today? I'm ready to write code, solve problems, or chat about any global topic.",
      "Hi! Glad you stopped by. Feel free to ask me general questions about computer science, AI, science, mathematics, or anything else you'd like to explore."
    ];
    return greetings[Math.floor(Math.random() * greetings.length)];
  }

  // 3. Wellness & Small Talk
  if (/^(how are you|how r u|how are you doing|how's it going|how is it going|wassup|what's up|how's everything)\b/i.test(query)) {
    return "I'm doing fantastic, thank you for asking! I'm fully ready to help with coding, science, mathematics, software architecture, or general conversations. How can I assist you today?";
  }

  // 4. Identity & Persona
  if (/^(who are you|what are you|what is your name|who made you|who created you|tell me about yourself|introduce yourself)\b/i.test(query)) {
    return `I am a versatile, intelligent AI assistant powered by the **\`dev-mtech-router\`** engine. I can answer any general question, write code, solve math problems, discuss science, and chat naturally about any global topic.

If you are interested in exploring Dhruv Upadhyay's M.Tech research at NSUT Delhi, his software projects (like WorkVibe and SyncScribe), or cloud certifications, I can also provide detailed insights upon request!`;
  }

  // 5. Humor & Programmer Jokes
  if (/^(tell me a joke|make me laugh|got any jokes|tell a joke|give me a joke)\b/i.test(query)) {
    const jokes = [
      "Why do programmers prefer dark mode? Because light attracts bugs! 😄",
      "There are 10 types of people in the world: those who understand binary, and those who don't! 💻",
      "Why do Java developers wear glasses? Because they don't C#! 👓",
      "A SQL query walks into a bar, walks up to two tables and asks: 'Can I join you?' 🍺",
      "Why did the developer go broke? Because they used up all their cache! 💰"
    ];
    return jokes[Math.floor(Math.random() * jokes.length)];
  }

  // 6. Gratitude
  if (/^(thanks|thank you|thx|cheers|appreciate it|much appreciated|thank you so much)\b/i.test(query)) {
    return "You're very welcome! Always happy to help. Let me know if there's anything else you'd like to explore or solve.";
  }

  // 7. Compliments
  if (/(you are awesome|you're cool|nice work|good job|smart|great bot|impressive|well done)\b/i.test(query)) {
    return "Thank you so much! I aim to be as helpful, accurate, and insightful as possible. Let me know what we should work on next!";
  }

  // 8. Goodbyes
  if (/^(bye|goodbye|see you|cya|take care|have a good day|good night|farewell)\b/i.test(query)) {
    return "Goodbye! It was a pleasure chatting with you. Have a wonderful day ahead!";
  }

  return null;
}


export function getGeneralKnowledgeResponse(q: string): string | null {
  const query = q.toLowerCase();

  // Check CS/AI Topics
  if (query.includes("transformer") || query.includes("attention")) return CS_AI_TOPICS.transformer;
  if (query.includes("chatgpt") || query.includes("what is gpt") || query.includes("llm") || query.includes("large language model") || query.includes("how do llms work")) return CS_AI_TOPICS.llm;
  if (query.includes("rag") || query.includes("retrieval augmented") || query.includes("vector search") || query.includes("vector database") || query.includes("embeddings")) return CS_AI_TOPICS.rag;
  if (query.includes("binary search")) return CS_AI_TOPICS.binary_search;
  if (query.includes("quicksort") || query.includes("mergesort") || query.includes("sorting algorithm") || query.includes("quick sort") || query.includes("merge sort")) return CS_AI_TOPICS.sorting;
  if (query.includes("big o") || query.includes("time complexity") || query.includes("space complexity") || query.includes("asymptotic")) return CS_AI_TOPICS.big_o;
  if (query.includes("docker") || query.includes("kubernetes") || query.includes("k8s") || query.includes("container")) return CS_AI_TOPICS.docker_k8s;
  if (query.includes("rest vs graphql") || query.includes("graphql") || query.includes("grpc") || query.includes("websocket")) return CS_AI_TOPICS.apis;
  if (query.includes("sql vs nosql") || query.includes("cap theorem") || query.includes("mongodb") || query.includes("redis") || query.includes("acid")) return CS_AI_TOPICS.databases;
  if (query.includes("quantum computing") || query.includes("qubit") || query.includes("superposition") || query.includes("entanglement")) return CS_AI_TOPICS.quantum;
  if (query.includes("photosynthesis") || query.includes("cellular respiration")) return CS_AI_TOPICS.photosynthesis;
  if (query.includes("airplane") || query.includes("how do airplanes fly") || query.includes("aerodynamics") || query.includes("flight")) return CS_AI_TOPICS.flight;
  if (query.includes("oop") || query.includes("object oriented") || query.includes("encapsulation") || query.includes("polymorphism") || query.includes("inheritance")) return CS_AI_TOPICS.oop;
  if (query.includes("machine learning") || query.includes("what is ml") || query.includes("supervised learning") || query.includes("reinforcement learning")) return CS_AI_TOPICS.machine_learning;
  if (query.includes("tcp") || query.includes("udp") || query.includes("osi model") || query.includes("dns") || query.includes("how does internet work")) return CS_AI_TOPICS.networking;
  if (query.includes("process vs thread") || query.includes("deadlock") || query.includes("virtual memory") || query.includes("paging")) return CS_AI_TOPICS.os_kernel;
  if (query.includes("recursion") || query.includes("recursive") || query.includes("factorial") || query.includes("fibonacci")) return CS_AI_TOPICS.recursion;

  // Check World Capitals
  if (query.includes("capital of") || query.includes("what is the capital")) {
    for (const [country, cap] of Object.entries(WORLD_CAPITALS)) {
      if (query.includes(country)) {
        return `The capital of **${country.charAt(0).toUpperCase() + country.slice(1)}** is **${cap}**.`;
      }
    }
  }

  return null;
}

export function getDynamicConversationalFallback(userQuery: string): string {
  const q = userQuery.trim();
  const lower = q.toLowerCase();

  // 1. Math / Linear Equation solver (e.g., "solve 2x + 5 = 15")
  const linearMatch = lower.match(/(?:solve|what is|calculate)?\s*([0-9]+)\s*x\s*([\+\-])\s*([0-9]+)\s*=\s*([0-9]+)/i);
  if (linearMatch) {
    const a = parseFloat(linearMatch[1]);
    const op = linearMatch[2];
    const b = parseFloat(linearMatch[3]);
    const c = parseFloat(linearMatch[4]);
    const rhs = op === "+" ? c - b : c + b;
    const x = rhs / a;
    return `### **Solution:**

Given equation:
$$${a}x ${op} ${b} = ${c}$$

**Step-by-step derivation:**
1. ${op === "+" ? `Subtract ${b} from both sides` : `Add ${b} to both sides`}:
   $$${a}x = ${c} ${op === "+" ? "-" : "+"} ${b} = ${rhs}$$
2. Divide both sides by ${a}:
   $$x = \\frac{${rhs}}{${a}} = \\mathbf{${x}}$$

**Final Answer:** $x = ${x}$`;
  }

  // 2. Arithmetic expressions (e.g., "what is 25 * 4")
  const arithMatch = lower.match(/(?:what is|calculate|evaluate)\s*([0-9]+(?:\.[0-9]+)?)\s*([\+\-\*\/])\s*([0-9]+(?:\.[0-9]+)?)/i);
  if (arithMatch) {
    const n1 = parseFloat(arithMatch[1]);
    const op = arithMatch[2];
    const n2 = parseFloat(arithMatch[3]);
    let result = 0;
    if (op === "+") result = n1 + n2;
    if (op === "-") result = n1 - n2;
    if (op === "*") result = n1 * n2;
    if (op === "/") result = n2 !== 0 ? n1 / n2 : NaN;
    return `### **Calculation:**
$$${n1} ${op} ${n2} = \\mathbf{${result}}$$`;
  }

  // 3. Coding Request Pattern
  if (
    lower.startsWith("write") ||
    lower.startsWith("code") ||
    lower.startsWith("implement") ||
    lower.includes("function")
  ) {
    if (lower.includes("palindrome")) {
      return `### **Palindrome Checker (Python):**

\`\`\`python
def is_palindrome(s: str) -> bool:
    cleaned = "".join(ch.lower() for ch in s if ch.isalnum())
    return cleaned == cleaned[::-1]

# Examples:
print(is_palindrome("A man, a plan, a canal: Panama"))  # True
print(is_palindrome("race a car"))                      # False
\`\`\`

- **Time Complexity:** $\\mathcal{O}(n)$
- **Space Complexity:** $\\mathcal{O}(n)$`;
    }
  }

  // 4. General Structured Response
  const words = q
    .replace(/[^a-zA-Z0-9\s]/g, "")
    .split(/\s+/)
    .filter((w) => w.length > 3 && !["what", "when", "where", "which", "with", "about", "tell", "does", "have", "from", "this", "that", "your", "could", "would", "should"].includes(w.toLowerCase()));

  const topicHint = words.slice(0, 3).join(" ");

  return `### **Analysis & Insights on ${topicHint ? `"${topicHint}"` : "your question"}:**

${q.endsWith("?") ? `Regarding **"${q}"**:` : `Regarding **${q}**:`}

• **Core Principle:** In modern computing, science, and systems engineering, breaking down problems into structured, modular components enables optimal efficiency, clarity, and performance.
• **Key Considerations:** Evaluating trade-offs between speed, scalability, precision, and simplicity leads to the most robust and elegant solutions.

Let me know if you would like to explore this topic further or dive into specific examples!`;
}

