import knowledgeData from "../../data/knowledge.json";

export function searchLocalKnowledge(query: string): string {
  const words = query.toLowerCase().split(/\s+/).filter((w) => w.length > 2);

  const scored = knowledgeData.map((doc) => {
    const docFull = `${doc.title} ${doc.content} ${doc.category}`.toLowerCase();
    let score = 0;
    for (const w of words) {
      if (docFull.includes(w)) score += 1;
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

  // Greetings
  if (/^(how are you|how r u|how are you doing|wassup|what's up|sup)\b/i.test(q)) {
    return "I am fine, how are you?";
  }
  if (/^(hi|hello|hey|hey there|greetings|good morning|good afternoon|good evening)\b/i.test(q)) {
    return "Hello! How can I help you today?";
  }
  if (/^(who are you|what are you|what is your name)\b/i.test(q)) {
    return "I am Dhruv's portfolio AI assistant.";
  }
  if (/^(thanks|thank you|thx|appreciate it)\b/i.test(q)) {
    return "You're welcome!";
  }
  if (/^(bye|goodbye|see you|cya|take care)\b/i.test(q)) {
    return "Goodbye! Have a great day!";
  }

  // Contact
  if (q.includes("email") || q.includes("mail")) {
    return "Dhruv's email:\n\u2022 Personal: dhruvupadhyay708937@gmail.com\n\u2022 Academic: dhruv.upadhyay.pg26@nsut.ac.in";
  }
  if (q.includes("phone") || q.includes("number") || q.includes("call") || q.includes("mobile")) {
    return "Dhruv's phone: +91 7489221051";
  }
  if (q.includes("github") || q.includes("repo")) {
    return "Dhruv's GitHub: https://github.com/Dhruvdev-Codes";
  }
  if (q.includes("contact") || q.includes("reach") || q.includes("hire")) {
    return "Contact Dhruv:\n\u2022 Email: dhruvupadhyay708937@gmail.com\n\u2022 Phone: +91 7489221051\n\u2022 GitHub: https://github.com/Dhruvdev-Codes";
  }

  // Projects
  if (q.includes("workvibe")) {
    return "WorkVibe is a mentor-mentee platform built with Node.js, Express, and MongoDB with sub-15ms search latency.";
  }
  if (q.includes("skillxchange")) {
    return "SkillXchange is a campus peer skill-sharing platform for tech discussions and hackathon teaming.";
  }
  if (q.includes("travel world") || q.includes("travelworld")) {
    return "Travel World is a travel portal with a 3NF normalized MySQL schema and 99/100 Lighthouse score.";
  }
  if (q.includes("project")) {
    return "Dhruv's projects:\n1. MANET/VANET Link Predictor (Python)\n2. WorkVibe (Node.js/MongoDB)\n3. SkillXchange (Peer skill exchange)\n4. Travel World (MySQL travel portal)";
  }

  // Research
  if (q.includes("research") || q.includes("thesis") || q.includes("paper") || q.includes("adhoc") || q.includes("manet") || q.includes("link predict")) {
    return "Dhruv's M.Tech research at NSUT focuses on 'Link Predictability in Ad-Hoc Networks', achieving 61% lower routing overhead and 28ms route repair latency.";
  }
  if (q.includes("rssi") || q.includes("signal smooth") || q.includes("ema")) {
    return "Dhruv uses Exponential Moving Average (EMA) RSSI smoothing with Kalman filtering to eliminate signal noise.";
  }

  // Certifications
  if (q.includes("cert") || q.includes("aws") || q.includes("google") || q.includes("credential")) {
    return "Dhruv's certifications:\n\u2022 AWS Academy Graduate - Cloud Architecting\n\u2022 AWS Academy Graduate - Cloud Foundations\n\u2022 Google Cybersecurity Professional Certificate\n\u2022 Google Cloud Digital Training";
  }

  // Skills
  if (q.includes("skill") || q.includes("stack") || q.includes("languages") || q.includes("technologies")) {
    return "Dhruv's stack:\n\u2022 Languages: C++, Python, JavaScript, TypeScript, Java, SQL, Bash\n\u2022 Web: Next.js, React, Node.js, Express, Tailwind\n\u2022 Cloud: AWS, Docker\n\u2022 DBs: MongoDB, MySQL, Redis";
  }

  // Education
  if (q.includes("education") || q.includes("college") || q.includes("university") || q.includes("nsut") || q.includes("aitr")) {
    return "Dhruv's education:\n\u2022 M.Tech CSE (Information Security) - NSUT Delhi (2026)\n\u2022 B.Tech CSE - AITR Indore (2021-2025)";
  }

  // About Dhruv
  if (q.includes("dhruv") || q.includes("who is he") || q.includes("bio") || q.includes("profile")) {
    return "Dhruv Upadhyay is an M.Tech CSE scholar at NSUT Delhi, specializing in Information Security, Ad-Hoc Networks, and Cloud Systems.";
  }

  // Context match from knowledge.json
  if (context && context.trim().length > 0) {
    return context.trim();
  }

  // Default fallback
  return `I don't have detailed info on "${trimmed}" in the knowledge base. Ask about Dhruv's research, projects, certifications, or skills!`;
}