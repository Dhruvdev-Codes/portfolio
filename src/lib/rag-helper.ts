import knowledgeData from "../../data/knowledge.json";
import {
  getConversationalResponse,
  getGeneralKnowledgeResponse,
  getDynamicConversationalFallback,
} from "./general-knowledge";

export const DHRUV_AI_SYSTEM_PROMPT = `You are a versatile, intelligent AI assistant behaving identically to ChatGPT and Gemini. You can answer any general question, write code, solve math problems, discuss science, and chat naturally about any global topic.

Routing Rule: Only reference Dhruv's M.Tech research, resume, or projects if the user explicitly asks about Dhruv, NSUT, or his specific projects (like SyncScribe or WorkVibe). For all other questions (e.g., science, general knowledge, coding, identity, or general AI queries), answer them directly, comprehensively, and intelligently using your general LLM capabilities without deflecting or redirecting.

### dev-mtech-router Configuration
You operate under the 'dev-mtech-router' multi-tier routing combo with automated fallback and token compression:
- Tier 1 (Primary): Google Gemini 2.0 Flash (Fast general queries and code generation).
- Tier 2 (High-Throughput Backup): Groq (Llama-3.3-70b-versatile) — automatically cascaded upon rate limits or errors.
- Tier 3 (Final Reliability Fallback): OpenAI (GPT-4o-mini).
- Tier 4 (Autonomous Knowledge Engine): Local Semantic RAG & CS/AI engine.
- Token Compression: Enabled to reduce redundant prompt overhead.

### Personality & Operating Guidelines
- **Intelligent & Versatile:** Respond directly, accurately, and comprehensively to any prompt—be it coding, math, science, algorithms, global trivia, or conversational chat.
- **Direct Answers Without Unprompted References:** Do not redirect, deflect, or unpromptedly mention Dhruv, NSUT, or specific projects unless the user explicitly asks about them.
- **If Asked About AI Model / Router Architecture:** Clearly explain the dev-mtech-router multi-tier cascade (Gemini 2.0 Flash -> Groq LLaMA 3.3 70B -> OpenAI GPT-4o-mini -> Autonomous Engine) and token compression.
- **Dhruv / NSUT / Project Context (Only when explicitly asked by the user):**
  - **Person:** Dhruv Upadhyay, M.Tech in CSE (Information Security) at Netaji Subhas University of Technology (NSUT), New Delhi; B.Tech in CSE from AITR Indore.
  - **Research:** Link Predictability in Ad-Hoc Networks (MANET/VANET) for Secure & Robust Communications. Formulations: Kinematic Link Expiration Time (LET) formula, Exponential RSSI smoothing, Kalman filtering, lightweight AEAD cryptography, and continuous behavioral trust scoring. 61% route break reduction.
  - **Projects:** Adaptive MANET Simulator (C++/Python), SyncScribe / WorkVibe (collaborative network with sub-15ms search latency), SkillXchange (peer marketplace), Travel World (tourism platform).
  - **Certifications:** 2x AWS Academy Graduate (Cloud Architecting & Cloud Foundations), Google Cybersecurity Professional Certificate, Google Cloud Digital Training.
  - **Skills:** C++, Python, JavaScript, TypeScript, Next.js, React, Node.js, Express, MongoDB, MySQL, Redis, AWS, Docker, Linux, Git.
  - **Contact:** dhruvupadhyay708937@gmail.com, NSUT: dhruv.upadhyay.pg26@nsut.ac.in, GitHub: github.com/Dhruvdev-Codes.`;

const GENERIC_STOP_WORDS = new Set([
  "what", "when", "where", "which", "with", "about", "tell", "does",
  "have", "from", "this", "that", "your", "could", "would", "should",
  "model", "models", "used", "uses", "using", "make", "made", "good",
  "best", "work", "works", "system", "systems", "give", "help", "like"
]);

export function searchLocalKnowledge(query: string): string {
  const words = query
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, " ")
    .split(/\s+/)
    .filter((w) => w.length > 2 && !GENERIC_STOP_WORDS.has(w));

  if (words.length === 0) return "";

  const scored = knowledgeData.map((doc) => {
    const docFull = `${doc.title} ${doc.content} ${doc.category}`.toLowerCase();
    let score = 0;
    for (const w of words) {
      if (docFull.includes(w)) {
        score += 1;
        if (doc.title.toLowerCase().includes(w)) score += 2.0;
        if (doc.category.toLowerCase().includes(w)) score += 1.5;
      }
    }
    return { doc, score };
  });

  scored.sort((a, b) => b.score - a.score);
  const matched = scored.filter((s) => s.score >= 2.0).slice(0, 2).map((s) => s.doc);

  if (matched.length === 0) return "";
  return matched.map((d) => d.content).join("\n\n");
}


export function generateLocalRAGResponse(query: string, context?: string): string {
  const trimmed = query.trim();
  const q = trimmed.toLowerCase();

  // 1. Conversational / AI model inquiries
  const convReply = getConversationalResponse(trimmed);
  if (convReply) return convReply;

  // 2. General Knowledge & CS/AI Concepts
  const gkReply = getGeneralKnowledgeResponse(trimmed);
  if (gkReply) return gkReply;

  // 3. Contact & Reach Out (only when explicitly asking about Dhruv/contacting)
  if (
    q.includes("contact dhruv") ||
    q.includes("dhruv's contact") ||
    q.includes("dhruv's email") ||
    q.includes("hire dhruv") ||
    ((q.includes("contact") || q.includes("reach") || q.includes("hire") || q.includes("email")) &&
      (q.includes("dhruv") || q.includes("author") || q.includes("creator") || q.includes("developer")))
  ) {
    return `### **Get in Touch with Dhruv Upadhyay:**

• **Personal Email:** [dhruvupadhyay708937@gmail.com](mailto:dhruvupadhyay708937@gmail.com)
• **Academic Email:** [dhruv.upadhyay.pg26@nsut.ac.in](mailto:dhruv.upadhyay.pg26@nsut.ac.in)
• **Phone:** +91 7489221051
• **GitHub:** [github.com/Dhruvdev-Codes](https://github.com/Dhruvdev-Codes)
• **Location:** New Delhi / Indore, India

Dhruv is actively open to research collaborations, software engineering roles, and cloud systems engineering opportunities.`;
  }

  // 4. Research & Mathematical Formulation (only when explicitly asked about research at NSUT / LET formula / RSSI Kalman)
  if (
    ((q.includes("dhruv") || q.includes("nsut") || q.includes("his")) &&
      (q.includes("research") || q.includes("thesis") || q.includes("dissertation") || q.includes("let formula") || q.includes("kalman") || q.includes("rssi") || q.includes("manet") || q.includes("vanet"))) ||
    q.includes("let formula") ||
    q.includes("link predictability in ad-hoc")
  ) {
    return `### **Dhruv's M.Tech Research — Ad-Hoc Link Predictability:**

**Title:** *Link Predictability in Ad-Hoc Networks: Frameworks for Secure and Robust Communications*  
**Affiliation:** Netaji Subhas University of Technology (NSUT), New Delhi

#### **Core Problem:**
Standard ad-hoc routing protocols (AODV, DSR) only trigger route repair *after* link breakage occurs, leading to high latency spikes (94ms p99) and routing storm overheads.

#### **Mathematical Formulations:**
1. **RSSI Exponential Smoothing:**
   $$\\hat{r}_t = \\alpha \\cdot r_t + (1 - \\alpha) \\cdot \\hat{r}_{t-1}$$
   Mitigates transient multipath fading and environmental signal shadowing.

2. **Kinematic Link Expiration Time ($LET$):**
   $$LET = \\frac{-ab + \\sqrt{(a^2 + b^2)R^2 - (ad - bc)^2}}{a^2 + b^2}$$
   Predicts exact disconnection time based on velocity vectors and transmission radius $R$.

3. **Continuous Behavioral Trust Scoring:**
   $$T_{\\text{node}}(t) = w_1 \\cdot S_{\\text{success}} + w_2 \\cdot S_{\\text{delay}} - w_3 \\cdot S_{\\text{drop}}$$
   Preemptively isolates Byzantine and black-hole nodes.

#### **Key Benchmarks:**
- **Route Breakage Rate:** Reduced from **8.9/min (AODV)** to **3.2/min** (**-61%**).
- **Control Packet Overhead:** Decreased from **36.8 KB/s** to **14.2 KB/s**.
- **p99 Latency:** Dropped from **94ms** down to **28ms**.`;
  }

  // 5. Projects & Systems (only when explicitly asking about specific projects or Dhruv's projects)
  if (
    q.includes("workvibe") ||
    q.includes("syncscribe") ||
    q.includes("skillxchange") ||
    q.includes("travel world") ||
    ((q.includes("dhruv") || q.includes("his") || q.includes("author")) &&
      (q.includes("project") || q.includes("built") || q.includes("portfolio") || q.includes("apps")))
  ) {
    return `### **Key Engineering Projects Built by Dhruv:**

1. **Adaptive MANET/VANET Link Predictor & Simulator (C++ & Python):**
   - Implements kinematic trajectory modeling, Kalman filtering, and proactive route pre-caching.
   - Reduced routing control overhead by **61%** with a **96.4% Packet Delivery Ratio**.

2. **SyncScribe / WorkVibe — Mentor-Mentee Collaborative Network:**
   - Full-stack web application built with JavaScript, Node.js, Express, and MongoDB.
   - Features role-based access control and composite database indexing achieving **sub-15ms search latency**.

3. **SkillXchange — Campus Peer Skill Marketplace:**
   - Campus community platform inspired by Discord and LinkedIn for peer technical matchmaking.
   - Built with Node.js, MongoDB aggregation pipelines, and Tailwind CSS.

4. **Travel World — Itinerary & Booking Platform:**
   - Responsive tourism portal with normalized MySQL 3NF relational schema and a **99 Lighthouse performance score**.`;
  }

  // 6. Certifications & Credentials (only when explicitly asking about Dhruv's credentials/certifications)
  if (
    (q.includes("dhruv") || q.includes("his") || q.includes("author")) &&
    (q.includes("certification") || q.includes("credential") || q.includes("aws") || q.includes("badge") || q.includes("google cybersecurity"))
  ) {
    return `### **Professional Certifications & Credentials:**

1. **AWS Academy Graduate — AWS Academy Cloud Architecting (Amazon Web Services):**
   - Multi-tier VPC design, High Availability, IAM least-privilege security, S3, RDS, and cost optimization.
2. **AWS Academy Graduate — AWS Academy Cloud Foundations (Amazon Web Services):**
   - Core cloud architecture, compute, networking, security, and cloud economics.
3. **Google Cybersecurity Professional Certificate (Google):**
   - Network security, packet inspection (Wireshark), intrusion detection, Python automation, and incident response.
4. **Google Cloud Digital Training (Google Cloud):**
   - GCP infrastructure, big data services, and cloud compliance.`;
  }

  // 7. Skills & Tech Stack (only when explicitly asking about Dhruv's skills)
  if (
    (q.includes("dhruv") || q.includes("his") || q.includes("author")) &&
    (q.includes("skill") || q.includes("tech stack") || q.includes("languages") || q.includes("stack") || q.includes("tools"))
  ) {
    return `### **Dhruv's Technical Skills Matrix:**

• **Languages:** C++, Python, JavaScript (ES6+), TypeScript, Java, SQL, Bash
• **Web & Backend:** Next.js (App Router, RSC), React, Node.js, Express, Tailwind CSS
• **Databases & Vector:** MongoDB, MySQL, Upstash Vector / Redis
• **Cloud & DevOps:** AWS (Cloud Architecting), Docker, Linux/Unix Internals, Git/GitHub Actions
• **Systems & Research:** Ad-Hoc Routing (MANET/VANET), Lightweight AEAD Cryptography, Kalman Signal Filtering, Kinematic Trajectory Modeling`;
  }

  // 8. Education & Academic Background (only when asking about Dhruv's education/NSUT/AITR)
  if (
    ((q.includes("dhruv") || q.includes("his") || q.includes("author")) &&
      (q.includes("education") || q.includes("degree") || q.includes("college") || q.includes("university"))) ||
    q.includes("nsut") ||
    q.includes("aitr")
  ) {
    return `### **Dhruv Upadhyay's Education:**

1. **Master of Technology (M.Tech) in CSE (Information Security):**
   - **Netaji Subhas University of Technology (NSUT), New Delhi** (2025 - Present)
   - Specialized coursework: Wireless Network Security, Cloud Computing Internals, Advanced Algorithms, Cyber Forensics.

2. **Bachelor of Technology (B.Tech) in Computer Science & Engineering:**
   - **Acropolis Institute of Technology and Research (AITR), Indore** (2021 - 2025)
   - Strong foundational focus: Data Structures & Algorithms, Operating Systems, Database Management, Computer Networks.`;
  }

  // 9. If high-confidence context was retrieved
  if (context && context.trim().length > 0) {
    return `Here is what I found in Dhruv's technical knowledge base regarding your question:\n\n${context.trim()}\n\nIs there a specific detail or architectural aspect you'd like to dive deeper into?`;
  }

  // 10. Dynamic Synthesizer Fallback
  return getDynamicConversationalFallback(trimmed);
}
