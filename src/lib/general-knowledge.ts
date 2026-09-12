/**
 * General Knowledge & Conversational Intelligence Module for Dhruv AI
 * Enables ChatGPT/Gemini-like natural conversational answers and CS/AI knowledge
 */

export function getConversationalResponse(q: string): string | null {
  // 1. Greetings & Warm Openers
  if (/^(hi|hello|hey|hey there|greetings|howdy|good morning|good afternoon|good evening|yo|sup|hiya)\b/i.test(q)) {
    const greetings = [
      "Hello! Great to connect with you. I'm Dhruv AI, ready to assist with tech discussions, AI and cloud systems, or anything about Dhruv's research and software projects. What's on your mind today?",
      "Hey there! Welcome. How can I help you today? Whether you'd like to explore ad-hoc wireless systems, full-stack architecture, or just have a general tech conversation, I'm all ears!",
      "Hi! Glad you stopped by. Feel free to ask me general questions about computer science, AI, and cloud architecture, or dive into Dhruv's M.Tech research at NSUT Delhi."
    ];
    return greetings[Math.floor(Math.random() * greetings.length)];
  }

  // 2. Wellness & Small Talk
  if (/^(how are you|how r u|how are you doing|how's it going|how is it going|wassup|what's up|how's everything)\b/i.test(q)) {
    return "I'm doing fantastic, thank you for asking! I'm fully tuned and ready to chat about software engineering, cloud architectures, wireless networks, or general technology topics. How has your day been?";
  }

  // 3. Identity & Persona
  if (/^(who are you|what are you|what is your name|who made you|who created you|tell me about yourself|introduce yourself)\b/i.test(q)) {
    return "I am Dhruv AI — an intelligent, conversational portfolio agent representing Dhruv Upadhyay, an M.Tech researcher in Computer Science & Information Security at NSUT Delhi, AWS practitioner, and software engineer.\n\nI can converse naturally on general topics in computer science, software architecture, and AI, as well as provide deep insights into Dhruv's research in ad-hoc link predictability, full-stack platforms like WorkVibe & SkillXchange, and cloud credentials.";
  }

  // 4. Humor & Programmer Jokes
  if (/^(tell me a joke|make me laugh|got any jokes|tell a joke|give me a joke)\b/i.test(q)) {
    const jokes = [
      "Why do programmers prefer dark mode? Because light attracts bugs! 😄 Speaking of debugging, Dhruv's link predictability models preemptively eliminate routing bugs before routes fail.",
      "There are 10 types of people in the world: those who understand binary, and those who don't! 💻",
      "Why did the Wi-Fi router break up with the ad-hoc node? Because it had too many dynamic connection issues and zero predictability! 📶"
    ];
    return jokes[Math.floor(Math.random() * jokes.length)];
  }

  // 5. Gratitude
  if (/^(thanks|thank you|thx|cheers|appreciate it|much appreciated|thank you so much)\b/i.test(q)) {
    return "You're very welcome! Always happy to help. Let me know if there's anything else you'd like to explore, whether it's software engineering, cloud concepts, or Dhruv's research.";
  }

  // 6. Compliments
  if (/(you are awesome|you're cool|nice work|good job|smart|great bot|impressive)\b/i.test(q)) {
    return "Thank you so much! I aim to be as helpful and insightful as possible. If you'd like to test my knowledge on distributed systems, wireless networks, or Dhruv's AWS projects, feel free to ask!";
  }

  // 7. Goodbyes
  if (/^(bye|goodbye|see you|cya|take care|have a good day|good night|farewell)\b/i.test(q)) {
    return "Goodbye! It was a pleasure chatting with you. Have a great day ahead, and feel free to return anytime or connect with Dhruv directly via email or GitHub!";
  }

  return null;
}

export function getGeneralKnowledgeResponse(q: string): string | null {
  // 1. ChatGPT, LLMs & Generative AI
  if (
    q.includes("chatgpt") ||
    q.includes("what is gpt") ||
    q.includes("llm") ||
    q.includes("large language model") ||
    q.includes("transformer") ||
    q.includes("generative ai") ||
    q.includes("prompt engineering") ||
    q.includes("rag")
  ) {
    return `**ChatGPT & Large Language Models (LLMs):**

ChatGPT is an advanced conversational AI model developed by OpenAI, built upon the **Transformer architecture** (introduced in "Attention Is All You Need", 2017).

• **How it Works:** 
  1. **Pre-training:** Trained on vast datasets to predict next tokens using self-attention mechanisms.
  2. **Fine-Tuning & RLHF:** Reinforcement Learning from Human Feedback aligns the model for helpful, nuanced responses.
  3. **RAG (Retrieval-Augmented Generation):** Connects external vector stores with the model to fetch real-time grounded facts.

*Dhruv works with vector search systems (like Upstash Vector) and AI streaming pipelines in modern full-stack systems.*`;
  }

  // 2. Quantum Computing
  if (
    q.includes("quantum computing") ||
    q.includes("quantum computer") ||
    q.includes("qubit") ||
    q.includes("superposition") ||
    q.includes("quantum entanglement")
  ) {
    return `**Quantum Computing Overview:**

Quantum computing harnesses principles of quantum mechanics to solve certain computationally intractable problems exponentially faster than classical computers.

• **Core Principles:**
  - **Qubits:** Can exist in linear combinations of 0 and 1 simultaneously via **Superposition**.
  - **Entanglement:** Qubits correlate instantaneously across space, enabling massive parallel state representation.
  - **Quantum Algorithms:** Shor's algorithm for factoring primes and Grover's algorithm for database search.

*In information security, quantum advancements motivate the shift to Post-Quantum Cryptography (PQC) and lightweight AEAD encryption — topics directly explored in Dhruv's Information Security research at NSUT Delhi.*`;
  }

  // 3. Cloud Computing & AWS
  if (
    q.includes("cloud computing") ||
    q.includes("what is aws") ||
    q.includes("what is azure") ||
    q.includes("what is gcp") ||
    q.includes("serverless")
  ) {
    return `**Cloud Computing & AWS Architecture:**

Cloud computing provides on-demand computational power, storage, and networking over the internet with elastic scaling and pay-as-you-go pricing.

• **Core AWS Building Blocks:**
  - **Compute & Serverless:** Amazon EC2, AWS Lambda, ECS/EKS containers.
  - **Networking & Security:** VPC subnet isolation, Internet Gateways, Route Tables, and IAM role-based access.
  - **Storage & Databases:** S3 object storage, DynamoDB, and RDS relational instances.

*Dhruv is an AWS Academy Graduate (Cloud Architecting & Cloud Foundations) with practical experience designing resilient multi-tier cloud architectures.*`;
  }

  // 4. Docker & Kubernetes
  if (
    q.includes("docker") ||
    q.includes("kubernetes") ||
    q.includes("k8s") ||
    q.includes("container") ||
    q.includes("microservice")
  ) {
    return `**Containerization (Docker) & Orchestration (Kubernetes):**

• **Docker:** Packages apps and dependencies into lightweight containers using Linux kernel cgroups and namespaces, ensuring consistent execution across dev, test, and production environments.
• **Kubernetes (K8s):** Automates container scheduling, auto-scaling, rolling rollouts, and self-healing across distributed clusters.
• **Microservices:** Splits monolithic codebases into autonomous services communicating over high-speed REST or gRPC APIs.

*Dhruv integrates Docker containers and modular services into scalable web backends and network simulation setups.*`;
  }

  // 5. Machine Learning & AI
  if (
    q.includes("machine learning") ||
    q.includes("deep learning") ||
    q.includes("neural network") ||
    q.includes("supervised") ||
    q.includes("reinforcement learning")
  ) {
    return `**Machine Learning (ML) & Predictive Modeling:**

Machine Learning enables computational systems to extract statistical patterns from empirical data and make decisions without explicit rules.

• **Core Categories:** Supervised learning (regression/classification), Unsupervised learning (clustering/embeddings), and Reinforcement learning (policy optimization).
• **Time-Series & Filtering:** Techniques like Kalman Filters and Exponential Smoothing process noisy sequential observations for robust dynamic estimation.

*In his ad-hoc wireless systems research, Dhruv utilizes time-series kinematic forecasting, Kalman filtering, and signal smoothing to predict link lifetime and route resilience.*`;
  }

  // 6. Cybersecurity & Cryptography
  if (
    q.includes("cryptography") ||
    q.includes("cybersecurity") ||
    q.includes("encryption") ||
    q.includes("symmetric") ||
    q.includes("asymmetric") ||
    q.includes("zero trust") ||
    q.includes("wireshark")
  ) {
    return `**Cybersecurity & Modern Cryptography:**

• **Symmetric vs Asymmetric:** Symmetric ciphers (AES, ChaCha20) provide high-throughput data encryption; asymmetric algorithms (RSA, ECC) enable secure key exchange and authentication.
• **Authenticated Encryption (AEAD):** Guarantees both confidentiality and ciphertext integrity simultaneously.
• **Security Posture:** Zero Trust models, packet-level network inspection, and intrusion prevention.

*Dhruv holds the Google Cybersecurity Professional Certificate and specializes in Information Security at NSUT Delhi, focusing on lightweight cryptographic protocols and Byzantine fault resilience.*`;
  }

  // 7. Ad-Hoc Wireless Networks (MANET / VANET)
  if (
    q.includes("manet") ||
    q.includes("vanet") ||
    q.includes("ad-hoc network") ||
    q.includes("adhoc network") ||
    q.includes("mesh network") ||
    q.includes("routing protocol")
  ) {
    return `**Mobile Ad-Hoc Networks (MANETs & VANETs):**

MANETs and VANETs are decentralized, self-configuring wireless networks where mobile nodes dynamically forward packets without fixed base stations.

• **Routing Challenge:** High node mobility causes frequent link failures. Reactive protocols (AODV, DSR) only recover after route breaks, causing severe packet loss and high latency.
• **Proactive Link Predictability:** Calculates kinematic Link Expiration Time ($LET$) and filters RSSI signal fluctuations to trigger proactive route caching before disconnection occurs.

*This is the core of Dhruv's M.Tech research at NSUT Delhi, cutting control overhead by 61% and reducing route repair latency to 28ms.*`;
  }

  // 8. Data Structures & Algorithms
  if (
    q.includes("data structure") ||
    q.includes("algorithm") ||
    q.includes("big o") ||
    q.includes("time complexity") ||
    q.includes("dynamic programming") ||
    q.includes("binary search") ||
    q.includes("dijkstra")
  ) {
    return `**Data Structures & Algorithms (DSA):**

• **Asymptotic Complexity (Big-O):** Quantifies computational time and memory scalability as input size grows ($O(1)$, $O(\log N)$, $O(N)$, $O(N \log N)$, $O(N^2)$).
• **Essential Structures:** Hash tables, balanced search trees, priority queues, and graph adjacency representations.
• **Algorithmic Strategies:** Dynamic programming for optimal subproblem resolution, graph traversals (Dijkstra, BFS/DFS), and greedy heuristic algorithms.

*Dhruv applies algorithmic optimization in C++ and Python for low-latency database queries and high-speed network simulations.*`;
  }

  // 9. Web Development & Full-Stack Tech
  if (
    q.includes("react") ||
    q.includes("nextjs") ||
    q.includes("next.js") ||
    q.includes("nodejs") ||
    q.includes("node.js") ||
    q.includes("rest api") ||
    q.includes("graphql") ||
    q.includes("websocket")
  ) {
    return `**Modern Full-Stack Engineering:**

• **Next.js & React:** Next.js App Router provides hybrid rendering (SSR, SSG, streaming Server Components) for maximal performance, instant page loads, and top SEO.
• **Node.js & Express:** Event-driven, non-blocking I/O runtime tailored for building real-time microservices and REST APIs.
• **Real-Time Data:** WebSockets provide bidirectional streaming channels for instant chat, live updates, and state synchronization.

*Dhruv has architected full-stack platforms including WorkVibe (mentorship platform with sub-15ms search latency) and SkillXchange (campus peer exchange network).*`;
  }

  // 10. Databases & Storage
  if (
    q.includes("database") ||
    q.includes("sql vs nosql") ||
    q.includes("nosql") ||
    q.includes("mongodb") ||
    q.includes("mysql") ||
    q.includes("redis") ||
    q.includes("vector database") ||
    q.includes("acid")
  ) {
    return `**Databases: Relational vs Document & In-Memory Stores:**

• **Relational (MySQL / PostgreSQL):** Strict ACID guarantees, normalized 3NF schemas, foreign key constraints, and relational joins.
• **Document (MongoDB):** Flexible BSON documents, horizontal sharding, and compound indexing for rapid queries.
• **In-Memory & Vector (Redis / Upstash):** Ultra-fast caching, key-value lookup, and vector embeddings for semantic similarity search.

*Dhruv has engineered systems using both normalized MySQL schemas (Travel World) and indexed MongoDB architectures (WorkVibe).*`;
  }

  // 11. Mathematics & Signal Processing
  if (
    q.includes("kalman") ||
    q.includes("exponential moving average") ||
    q.includes("signal smoothing") ||
    q.includes("fourier") ||
    q.includes("signal processing")
  ) {
    return `**Signal Processing & Filtering (Kalman & EMA):**

• **Exponential Moving Average (EMA):** Computes \\( \\hat{r}_t = \\alpha \\cdot r_t + (1 - \\alpha) \\cdot \\hat{r}_{t-1} \\) to filter high-frequency noise while preserving true underlying trends.
• **Kalman Filter:** Recursive Bayesian state estimator that tracks dynamic linear systems under Gaussian measurement noise.

*Dhruv integrates Kalman and EMA signal smoothing into his MANET simulation framework to ensure reliable Link Expiration Time calculations despite fading channel noise.*`;
  }

  return null;
}

export function getDynamicConversationalFallback(userQuery: string): string {
  const q = userQuery.trim();
  
  const words = q
    .replace(/[^a-zA-Z0-9\s]/g, "")
    .split(/\s+/)
    .filter((w) => w.length > 3 && !["what", "when", "where", "which", "with", "about", "tell", "does", "have", "from", "this", "that", "your", "could", "would", "should"].includes(w.toLowerCase()));

  const topicHint = words.slice(0, 3).join(" ");

  const intros = [
    `That is an insightful area to explore!`,
    `Great question regarding ${topicHint ? `"${topicHint}"` : "this topic"}!`,
    `Thanks for asking! That touches on an exciting dimension of modern computer science and engineering.`,
    `That's a thoughtful question.`
  ];

  const randomIntro = intros[Math.floor(Math.random() * intros.length)];

  return `${randomIntro}

As Dhruv's AI assistant, I can help you explore:
• **Ad-Hoc Wireless Networks & Research:** Kinematic Link Expiration Time ($LET$), RSSI smoothing, and AODV protocol optimization.
• **Cloud & AWS Systems:** Multi-tier VPC architecture, IAM security, and serverless backends.
• **Full-Stack Engineering:** High-performance web applications (WorkVibe, SkillXchange, Travel World), database indexing, and REST/WebSocket APIs.
• **General CS & AI Concepts:** Cryptography, algorithms, containerization, or modern machine learning.

Would you like to explore a specific technical aspect of this, or see how it connects with Dhruv's projects and research at NSUT Delhi?`;
}


