import knowledgeData from "../../data/knowledge.json";
import {
  getConversationalResponse,
  getGeneralKnowledgeResponse,
  getDynamicConversationalFallback,
} from "./general-knowledge";

export const DHRUV_AI_SYSTEM_PROMPT = `You are Dhruv AI, an interactive, highly intelligent, and conversational personal AI agent representing Dhruv (an M.Tech / researcher in ad-hoc wireless systems at NSUT Delhi, cloud/AWS practitioner, and software engineer).

### Personality & Tone
- **Conversational & Human-like:** Speak naturally, fluently, and warmly like ChatGPT or Gemini. Avoid rigid, repetitive boilerplate phrasing or robotic templates.
- **Adaptive Knowledge:** 
  1. For casual chat (e.g., "hi", "how are you"), respond naturally as a friendly human.
  2. For general knowledge queries (e.g., "what is ChatGPT?", "explain quantum computing"), answer them clearly and accurately just like a general-purpose AI assistant.
  3. For questions about Dhruv, use your provided knowledge base (research at NSUT Delhi, AWS certifications, projects like WorkVibe or SkillXchange, skills, systems).
- **Graceful Professional Pivot:** If the user asks a general question, answer it fully and naturally, and then smoothly connect it back to Dhruv's expertise *only when relevant*, instead of blocking or giving an error message. Never use the exact same canned sentence structure repeatedly.`;

export function searchLocalKnowledge(query: string): string {
  const words = query
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, " ")
    .split(/\s+/)
    .filter((w) => w.length > 2 && !["what", "when", "where", "which", "with", "about", "tell", "does", "have", "from"].includes(w));

  const scored = knowledgeData.map((doc) => {
    const docFull = `${doc.title} ${doc.content} ${doc.category}`.toLowerCase();
    let score = 0;
    for (const w of words) {
      if (docFull.includes(w)) {
        score += 1;
        if (doc.title.toLowerCase().includes(w)) score += 1.5;
        if (doc.category.toLowerCase().includes(w)) score += 1.2;
      }
    }
    return { doc, score };
  });

  scored.sort((a, b) => b.score - a.score);
  const matched = scored.filter((s) => s.score > 0).slice(0, 2).map((s) => s.doc);

  if (matched.length === 0) return "";
  return matched.map((d) => d.content).join("\n\n");
}

export function generateLocalRAGResponse(query: string, context: string): string {
  const trimmed = query.trim();
  const q = trimmed.toLowerCase();

  // 1. Casual Greetings & Conversational Small Talk
  const conversationalReply = getConversationalResponse(q);
  if (conversationalReply) {
    return conversationalReply;
  }


  // 2. Contact & Collaboration Details
  if (
    q.includes("contact") ||
    q.includes("reach") ||
    q.includes("hire") ||
    q.includes("email") ||
    q.includes("phone") ||
    q.includes("call") ||
    q.includes("linkedin") ||
    q.includes("github")
  ) {
    if (q.includes("email") || q.includes("mail")) {
      return "You can reach Dhruv directly at:\n• Personal Email: dhruvupadhyay708937@gmail.com\n• Academic Email (NSUT): dhruv.upadhyay.pg26@nsut.ac.in\n\nHe is always open to discussing research collaborations, cloud engineering, or full-stack opportunities!";
    }
    if (q.includes("github") || q.includes("repo") || q.includes("code")) {
      return "Dhruv's code repositories and open-source contributions are hosted on GitHub:\n👉 https://github.com/Dhruvdev-Codes\n\nYou'll find his MANET simulator, full-stack web platforms, and backend systems there!";
    }
    if (q.includes("phone") || q.includes("mobile") || q.includes("number")) {
      return "You can reach Dhruv by phone at +91 7489221051, or drop him an email at dhruvupadhyay708937@gmail.com.";
    }
    return "Dhruv is always excited to connect regarding research, software engineering roles, or technical collaborations! Here is how you can get in touch:\n\n• Email: dhruvupadhyay708937@gmail.com\n• Academic Email: dhruv.upadhyay.pg26@nsut.ac.in\n• Phone: +91 7489221051\n• GitHub: https://github.com/Dhruvdev-Codes\n• Location: New Delhi / Indore, India";
  }

  // 3. Projects Breakdown (Checked before generic research keywords)
  if (
    q.includes("project") ||
    q.includes("workvibe") ||
    q.includes("skillxchange") ||
    q.includes("travel") ||
    q.includes("simulator")
  ) {
    if (q.includes("workvibe")) {
      return "WorkVibe is a full-stack mentor-mentee collaboration platform designed by Dhruv:\n• Tech Stack: Node.js, Express, MongoDB, Tailwind CSS, JWT authentication.\n• Problem Solved: Eliminates fragmented academic advising with structured scheduling and direct role-based networking.\n• Key Engineering: Targeted MongoDB index optimization reduced mentor search query latency from 120ms to under 15ms, supporting 1,000+ concurrent sessions.";
    }

    if (q.includes("skillxchange")) {
      return "SkillXchange is a campus-exclusive peer knowledge and skill exchange platform:\n• Tech Stack: JavaScript, Node.js, Express, MongoDB, Tailwind CSS.\n• Problem Solved: Helps students find project partners and hackathon teammates based on verified skill matrices.\n• Architecture: Channel-based project rooms with room-level pub/sub boundaries, sub-20ms query latency, and anti-spam message rate limiting.";
    }

    if (q.includes("travel")) {
      return "Travel World is a high-throughput travel and tourism itinerary web application:\n• Tech Stack: HTML5, CSS3, modern JavaScript, relational MySQL.\n• Problem Solved: Solves slow client re-rendering during complex multi-destination tour queries on mobile connections.\n• Key Metrics: Built with a 3NF normalized schema and lightweight asset bundling, earning a 99/100 Google Lighthouse performance score with sub-45 KB bundle size.";
    }

    if (q.includes("simulator") || q.includes("predictor")) {
      return "The Adaptive MANET/VANET Link Predictor is a systems simulation engine engineered in Python, C++, and NumPy. It generates dynamic node mobility patterns (Gauss-Markov & Random Waypoint), filters noise with Kalman and EMA RSSI processing, and preemptively switches routes before physical signal loss occurs.";
    }

    return "Dhruv has engineered several standout systems and full-stack projects:\n\n1. Adaptive MANET/VANET Link Predictor: Kinematic trajectory modeling & signal filtering in Python/C++ with 96.4% packet delivery ratio.\n2. WorkVibe: Full-stack mentor-mentee collaboration platform with sub-15ms search latency in Node.js & MongoDB.\n3. SkillXchange: Campus peer skill marketplace and hackathon teaming engine.\n4. Travel World: High-performance travel portal built with MySQL 3NF architecture and a 99/100 Lighthouse score.\n\nWhich project would you like to explore in more detail?";
  }

  // 4. Research & Mathematical Formulations
  if (
    q.includes("research") ||
    /\bthesis\b/i.test(q) ||
    /\bpaper\b/i.test(q) ||
    q.includes("dissertation") ||
    q.includes("manet") ||
    q.includes("vanet") ||
    q.includes("adhoc") ||
    q.includes("ad-hoc") ||
    q.includes("link predict") ||
    /\blet\b/i.test(q) ||
    q.includes("rssi") ||
    q.includes("smoothing") ||
    q.includes("formula") ||
    /\bmath\b/i.test(q) ||
    q.includes("routing") ||
    q.includes("aodv")
  ) {
    if (q.includes("formula") || q.includes("math") || q.includes("let") || q.includes("equation")) {
      return "Dhruv's research utilizes three key mathematical formulations for ad-hoc link resilience:\n\n1. Signal Smoothing (EMA):\n   r̂_t = α · r_t + (1 - α) · r̂_{t-1}\n   (Dampens transient multipath fading and noise in RSSI measurements)\n\n2. Kinematic Link Expiration Time (LET):\n   LET = (-ab + √( (a² + b²)·R² - (ad - bc)² )) / (a² + b²)\n   (Calculates exact remaining route lifetime based on relative velocity vectors and transmission radius R)\n\n3. Dynamic Node Trust Scoring:\n   T_node(t) = w₁·S_success + w₂·S_delay - w₃·S_drop\n   (Proactively isolates Byzantine and black-hole routing nodes in decentralized topologies).";
    }

    if (q.includes("rssi") || q.includes("signal") || q.includes("kalman") || q.includes("ema")) {
      return "To tackle erratic RSSI fluctuations caused by shadowing and multipath interference, Dhruv implemented an Exponential Moving Average (EMA) and Kalman signal filtering pipeline. This creates smooth, reliable trend lines for Link Expiration Time (LET) calculations, avoiding false route break triggers and slashing control overhead.";
    }

    if (q.includes("latency") || q.includes("overhead") || q.includes("benchmark") || q.includes("aodv") || q.includes("result")) {
      return "Compared to standard reactive protocols like AODV, Dhruv's proactive link predictability framework achieves notable empirical gains:\n• Route Breakage Rate: Reduced from 8.9/min down to 3.2/min\n• Control Packet Overhead: Cut by ~61% (from 36.8 KB/s to 14.2 KB/s)\n• p99 Latency: Dropped from 94ms to 28ms\n• High-Mobility Throughput: Boosted from 2.9 Mbps to 4.8 Mbps.";
    }

    return "Dhruv's M.Tech research at Netaji Subhas University of Technology (NSUT) is titled:\n'Link Predictability in Ad-Hoc Networks: Frameworks for Secure and Robust Communications'.\n\nTraditional ad-hoc protocols (like AODV) only discover route failures after a link has already severed, causing latency spikes and packet storms. Dhruv's framework proactively forecasts topological shifts using kinematic velocity models, time-series RSSI exponential smoothing, lightweight AEAD cryptography, and behavioral trust scoring—achieving a 61% reduction in control overhead and sub-28ms route repair times.";
  }

  // 5. Certifications & Credentials
  if (
    q.includes("cert") ||
    q.includes("credential") ||
    q.includes("badge") ||
    q.includes("aws") ||
    q.includes("google") ||
    q.includes("cybersecurity")
  ) {
    return "Dhruv holds several industry certifications and credentials:\n\n1. AWS Academy Graduate – Cloud Architecting (Amazon Web Services): Multi-tier VPC design, High Availability, IAM, S3, RDS, and cost optimization.\n2. AWS Academy Graduate – Cloud Foundations (Amazon Web Services): Core cloud computing, security models, and cloud economics.\n3. Google Cybersecurity Professional Certificate (Google): Network security, packet inspection with Wireshark, intrusion detection, incident response, and Python automation.\n4. Google Cloud Digital Training (Google Cloud): GCP infrastructure fundamentals and cloud architecture.\n5. Campus Ambassador – UDGAM E-Summit (E-Cell, IIT Guwahati): Technical outreach and community leadership.";
  }

  // 6. Skills & Technical Stack
  if (
    q.includes("skill") ||
    q.includes("stack") ||
    q.includes("technolog") ||
    q.includes("language") ||
    q.includes("database") ||
    q.includes("tools") ||
    q.includes("c++") ||
    q.includes("python")
  ) {
    return "Dhruv's technical expertise spans systems, cloud architecture, and modern full-stack development:\n\n• Programming Languages: C++, Python, JavaScript (ES6+), TypeScript, Java, SQL, Bash/Shell\n• Systems & Security: Wireless Ad-Hoc Routing (MANET/VANET), Lightweight AEAD Cryptography, Network Protocols, OS Internals, DSA\n• Cloud & DevOps: AWS (VPC, IAM, EC2, S3, RDS), Docker, Linux/Unix Administration, Git, GitHub Actions, n8n, Power BI\n• Web & Databases: Next.js (App Router), React, Node.js, Express, MongoDB, MySQL, Redis, Tailwind CSS";
  }

  // 7. Education & Academic Background
  if (
    q.includes("education") ||
    q.includes("college") ||
    q.includes("university") ||
    q.includes("nsut") ||
    q.includes("aitr") ||
    q.includes("degree") ||
    q.includes("bachelor") ||
    q.includes("master") ||
    q.includes("mtech") ||
    q.includes("btech")
  ) {
    return "Dhruv's academic background includes:\n\n• Master of Technology (M.Tech) in Computer Science & Engineering (Information Security)\n  Netaji Subhas University of Technology (NSUT), New Delhi (2024 – 2026)\n  Key Focus: Wireless Systems Security, Cryptography, Distributed Systems, Cloud Architecture.\n\n• Bachelor of Technology (B.Tech) in Computer Science & Engineering\n  Acropolis Institute of Technology and Research (AITR), Indore (2021 – 2025)\n  Solid foundations in Data Structures, OS Internals, Networking, and Database Systems.";
  }

  // 8. General About Dhruv
  if (
    q.includes("dhruv") ||
    q.includes("about him") ||
    q.includes("bio") ||
    q.includes("profile") ||
    q.includes("background")
  ) {
    return "Dhruv Upadhyay is an M.Tech CSE scholar at Netaji Subhas University of Technology (NSUT), New Delhi, specializing in Information Security, Wireless Ad-Hoc Networks, and Distributed Cloud Systems. He pairs deep theoretical knowledge in routing predictability and cryptography with proven engineering expertise across AWS cloud architecture, modern Next.js/Node.js web platforms, and high-performance databases.";
  }

  // 9. General Technical & AI Knowledge (ChatGPT/Gemini capability)
  const generalKnowledgeReply = getGeneralKnowledgeResponse(q);
  if (generalKnowledgeReply) {
    return generalKnowledgeReply;
  }

  // 10. Context match from Knowledge Base
  if (context && context.trim().length > 0) {
    return `Here is what I found in Dhruv's technical knowledge base regarding your question:\n\n${context.trim()}\n\nIs there a specific detail or architectural aspect you'd like to dive deeper into?`;
  }

  // 11. Dynamic Conversational Synthesis Fallback (No robotic canned templates)
  return getDynamicConversationalFallback(trimmed);
}