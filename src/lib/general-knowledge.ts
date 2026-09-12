/**
 * Comprehensive General Knowledge, AI & Conversational Intelligence Engine for Dhruv AI
 */

import { CS_AI_TOPICS, WORLD_CAPITALS } from "./knowledge-topics";

export function getConversationalResponse(q: string): string | null {
  const query = q.trim().toLowerCase();

  // 1. AI Model & Architecture Inquiries
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
    query.includes("are you chatgpt") ||
    query.includes("are you gemini") ||
    query.includes("are you gpt") ||
    query.includes("how do you work") ||
    query.includes("how were you built") ||
    query.includes("what is your architecture")
  ) {
    return `I am **Dhruv AI** — an interactive agent engineered with a hybrid LLM & RAG architecture.

### My Core Architecture:
1. **Multi-Model Intelligence Engine:**
   - Powered by state-of-the-art LLM backends (supporting **Google Gemini 1.5/2.0 Flash**, **OpenAI GPT-4o-mini**, and **Groq LLaMA 3.3 70B**).
   - Real-time token streaming and conversational reasoning.

2. **Domain-Specific RAG Knowledge Base:**
   - Grounded in Dhruv Upadhyay's research at **NSUT Delhi** (Ad-Hoc Wireless Link Predictability, Kinematic LET models, and RSSI smoothing).
   - Real-time access to Dhruv's full-stack applications (**WorkVibe**, **SkillXchange**, **Travel World**), cloud credentials (**AWS Cloud Architecting**), and engineering competencies.

3. **Omniroute Semantic Agent:**
   - Real-time intent classification to handle casual small talk, CS/AI engineering concepts, live coding questions, or specific portfolio inquiries.

Feel free to ask me anything about computer science, AI, systems architecture, or dive into Dhruv's research and projects!`;
  }

  // 2. Greetings & Warm Openers
  if (/^(hi|hello|hey|hey there|greetings|howdy|good morning|good afternoon|good evening|yo|sup|hiya)\b/i.test(query)) {
    const greetings = [
      "Hello! Great to connect with you. I am Dhruv AI, ready to assist with tech discussions, AI and cloud systems, coding questions, or anything about Dhruv's research and software projects. What's on your mind today?",
      "Hey there! Welcome. How can I help you today? Whether you'd like to explore ad-hoc wireless systems, solve a coding problem, or just have a general conversation, I'm all ears!",
      "Hi! Glad you stopped by. Feel free to ask me general questions about computer science, AI, cloud architecture, and math, or dive into Dhruv's M.Tech research at NSUT Delhi."
    ];
    return greetings[Math.floor(Math.random() * greetings.length)];
  }

  // 3. Wellness & Small Talk
  if (/^(how are you|how r u|how are you doing|how's it going|how is it going|wassup|what's up|how's everything)\b/i.test(query)) {
    return "I'm doing fantastic, thank you for asking! I'm fully tuned and ready to chat about software engineering, cloud architectures, wireless networks, coding, or general technology topics. How has your day been?";
  }

  // 4. Identity & Persona
  if (/^(who are you|what are you|what is your name|who made you|who created you|tell me about yourself|introduce yourself)\b/i.test(query)) {
    return `I am **Dhruv AI** — an intelligent, conversational portfolio agent representing **Dhruv Upadhyay**, an M.Tech researcher in Computer Science & Engineering (Information Security) at **Netaji Subhas University of Technology (NSUT), New Delhi**, AWS practitioner, and software engineer.

I can converse naturally on general topics in computer science, software architecture, programming, and AI, as well as provide deep insights into Dhruv's research in ad-hoc link predictability, full-stack platforms like WorkVibe & SkillXchange, and cloud credentials.`;
  }

  // 5. Humor & Programmer Jokes
  if (/^(tell me a joke|make me laugh|got any jokes|tell a joke|give me a joke)\b/i.test(query)) {
    const jokes = [
      "Why do programmers prefer dark mode? Because light attracts bugs! 😄 Speaking of debugging, Dhruv's link predictability models preemptively eliminate routing bugs before routes fail.",
      "There are 10 types of people in the world: those who understand binary, and those who don't! 💻",
      "Why did the Wi-Fi router break up with the ad-hoc node? Because it had too many dynamic connection issues and zero predictability! 📶",
      "A SQL query walks into a bar, walks up to two tables and asks: 'Can I join you?' 🍺",
      "Why do Java developers wear glasses? Because they don't C#! 👓"
    ];
    return jokes[Math.floor(Math.random() * jokes.length)];
  }

  // 6. Gratitude
  if (/^(thanks|thank you|thx|cheers|appreciate it|much appreciated|thank you so much)\b/i.test(query)) {
    return "You're very welcome! Always happy to help. Let me know if there's anything else you'd like to explore, whether it's software engineering, cloud concepts, coding, or Dhruv's research.";
  }

  // 7. Compliments
  if (/(you are awesome|you're cool|nice work|good job|smart|great bot|impressive|well done)\b/i.test(query)) {
    return "Thank you so much! I aim to be as helpful, accurate, and insightful as possible. If you'd like to test my knowledge on distributed systems, wireless networks, algorithms, or Dhruv's AWS projects, feel free to ask!";
  }

  // 8. Goodbyes
  if (/^(bye|goodbye|see you|cya|take care|have a good day|good night|farewell)\b/i.test(query)) {
    return "Goodbye! It was a pleasure chatting with you. Have a great day ahead, and feel free to return anytime or connect with Dhruv directly via email or GitHub!";
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

  return `### **Insights on ${topicHint ? `"${topicHint}"` : "your question"}:**

${q.endsWith("?") ? `Regarding **"${q}"**:` : `Regarding **${q}**:`}

• **Core Principle:** In modern computer science and engineering, breaking down complex systems into modular, well-defined components is essential for scalability, performance, and maintainability.
• **System Perspective:** From distributed architectures to optimized algorithms, considering trade-offs between latency, throughput, and consistency is key.

---
*I am **Dhruv AI**, equipped to assist with general technical explanations, code implementations, or specific inquiries into Dhruv Upadhyay's research at NSUT Delhi.* How can I assist you further on this?`;
}

