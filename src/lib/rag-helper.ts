import knowledgeData from "../../data/knowledge.json";

export function searchLocalKnowledge(query: string): string {
  const words = query.toLowerCase().split(/\s+/).filter((w) => w.length > 2);

  const scored = knowledgeData.map((doc) => {
    const docFull = `${doc.title} ${doc.content} ${doc.category}`.toLowerCase();
    let score = 0;
    for (const w of words) {
      if (docFull.includes(w)) {
        score += 1;
      }
    }
    return { doc, score };
  });

  scored.sort((a, b) => b.score - a.score);
  const matched = scored.filter((s) => s.score > 0).slice(0, 3).map((s) => s.doc);

  if (matched.length === 0) {
    return knowledgeData.slice(0, 3).map((d) => `[Source: ${d.title}]\n${d.content}`).join("\n\n");
  }

  return matched.map((d) => `[Source: ${d.title}]\n${d.content}`).join("\n\n");
}

export function generateLocalRAGResponse(query: string, context: string): string {
  const q = query.toLowerCase();

  if (
    q.includes("research") ||
    q.includes("thesis") ||
    q.includes("paper") ||
    q.includes("adhoc") ||
    q.includes("manet") ||
    q.includes("vanet") ||
    q.includes("link")
  ) {
    return `Dhruv Upadhyay's core M.Tech research at NSUT Delhi focuses on "Link Predictability in Ad-Hoc Networks: Frameworks for Secure and Robust Communications".\n\nKey Novelty & Formulation:\n• Problem: Traditional reactive routing protocols (AODV/DSR) only start route repairs AFTER path failure, causing control storms and latency spikes.\n• RSSI Filtering: Employs exponential signal smoothing [r̂_t = α · r_t + (1-α) · r̂_{t-1}] and Kalman filtering to eliminate transient shadowing.\n• Kinematic Forecasting: Computes Link Expiration Time (LET) from dynamic node velocity vectors and spatial bounds before physical link breakage.\n• Security: Integrates lightweight AEAD authentication and behavioral trust scoring to prevent Byzantine packet drops.\n• Results: Achieved a 61% reduction in control overhead and dropped p99 route repair latency to 28ms.`;
  }

  if (q.includes("workvibe") || q.includes("skillxchange") || q.includes("travel") || q.includes("project")) {
    return `Dhruv has engineered several high-performance systems and full-stack platforms:\n\n1. Adaptive MANET/VANET Link Predictor (Systems/Research):\n   • Python & C++ simulation pipeline for kinematic trajectory forecasting and RSSI smoothing.\n   • 96.4% packet delivery ratio in high-mobility node environments.\n\n2. WorkVibe (Full-Stack):\n   • Mentor-mentee collaboration platform built with JavaScript, Node.js, Express, and MongoDB.\n   • Sub-15ms search latency via composite index optimization.\n\n3. SkillXchange (Full-Stack):\n   • Campus peer skill-sharing platform inspired by Discord & LinkedIn.\n   • Real-time channel discussions and peer skill endorsement graph.\n\n4. Travel World (Web & DB):\n   • Responsive travel platform with 3NF normalized MySQL database schema.\n   • 99/100 Lighthouse performance score.`;
  }

  if (q.includes("aws") || q.includes("cert") || q.includes("google") || q.includes("cloud") || q.includes("security")) {
    return `Dhruv's technical credentials and certifications include:\n\n• AWS Academy Graduate – Cloud Architecting (VPC multi-tier, High Availability, IAM, Cost Optimization)\n• AWS Academy Graduate – Cloud Foundations\n• Google Cybersecurity Professional Certificate (Network Security, Wireshark packet analysis, Python automation, Incident Response)\n• Google Cloud Digital Training\n• Campus Ambassador for UDGAM E-Summit (IIT Guwahati E-Cell).`;
  }

  if (q.includes("skill") || q.includes("stack") || q.includes("language") || q.includes("c++") || q.includes("python")) {
    return `Dhruv Upadhyay's core technical stack includes:\n\n• Languages: C++, Python, JavaScript (ES6+), TypeScript, Java, SQL, Bash\n• Systems & Security: MANET/VANET Routing, Kinematic Modeling, RSSI Signal Filtering, Lightweight AEAD Cryptography, Linux Internals\n• Cloud & DevOps: AWS (VPC, IAM, EC2, S3, RDS), Docker, Git/GitHub Actions, Power BI, n8n\n• Web & DB: Next.js 14, React, Node.js, Express, MongoDB, MySQL, Tailwind CSS`;
  }

  if (q.includes("contact") || q.includes("email") || q.includes("github") || q.includes("reach") || q.includes("hire")) {
    return `You can connect with Dhruv Upadhyay through:\n\n• Email: dhruvupadhyay708937@gmail.com\n• Academic Email: dhruv.upadhyay.pg26@nsut.ac.in\n• GitHub: https://github.com/Dhruvdev-Codes\n• Phone: +91 7489221051\n• Institution: Netaji Subhas University of Technology (NSUT), New Delhi`;
  }

  return `I am Dhruv Upadhyay's AI Research & Engineering Portfolio Agent. Based on the indexed knowledge base:\n\n${context}\n\nFeel free to ask about Dhruv's research on Ad-Hoc Network Link Predictability, system architecture for WorkVibe & SkillXchange, or AWS cloud credentials!`;
}
