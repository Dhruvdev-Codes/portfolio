# Dhruv Upadhyay — M.Tech Technical Portfolio & Interactive AI Assistant

A research-oriented, high-performance portfolio and interactive RAG assistant web application designed for **Dhruv Upadhyay** (M.Tech CSE Scholar at Netaji Subhas University of Technology, New Delhi), specializing in **Information Security, Mobile Ad-Hoc Network (MANET) Link Predictability, and Distributed Cloud Architecture**.

---

## 🚀 Key Features

1. **Terminal-Grade Systems UI / UX**:
   - Monospace telemetry headers, empirical benchmark tables, and reactive design.
   - Live research paper section featuring mathematical kinematic formulations ($LET$), protocol state machines, empirical AODV comparison tables, and BibTeX citation exporter.

2. **Interactive Client-Side Simulation Lab (Edge AI)**:
   - Real-time SVG waveform generator for Exponential Moving Average (EMA) RSSI signal smoothing.
   - Dynamic Link Expiration Time (LET) calculation and proactive route-caching trigger detection.

3. **Hybrid RAG Assistant (Zero-Config + Cloud Vector)**:
   - Real-time streaming AI chat powered by Vercel AI SDK.
   - Automatically utilizes OpenAI `gpt-4o-mini` and Upstash Vector when keys are present.
   - Falls back gracefully to an in-memory keyword-matched streaming search engine when running offline or without credentials.

4. **Production Architecture Breakdowns**:
   - Comprehensive system diagrams, throughput metrics, and database scaling strategies for **WorkVibe**, **SkillXchange**, and **Travel World**.

---

## 🛠️ Tech Stack

- **Framework**: [Next.js 14 App Router](https://nextjs.org/) (React 18, TypeScript)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **AI & Streaming**: [Vercel AI SDK (`ai/react`)](https://sdk.vercel.ai/docs), `openai`
- **Vector Database**: [Upstash Vector](https://upstash.com/docs/vector/overall/getstarted)
- **Icons**: [Lucide React](https://lucide.dev/)

---

## 📦 Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Run Development Server
```bash
npm run dev
```
Open (https://dhruvdev-codes.github.io/portfolio/) in your browser.

### 3. (Optional) Configure Vector Search & OpenAI
Create a `.env.local` file:
```env
OPENAI_API_KEY="sk-..."
UPSTASH_VECTOR_REST_URL="https://...-vector.upstash.io"
UPSTASH_VECTOR_REST_TOKEN="..."
```

Index the knowledge base into Upstash:
```bash
npx tsx scripts/index-knowledge.ts
```

---

## 🎓 Academic Trajectory & Credentials

- **M.Tech in Computer Science & Engineering**: Netaji Subhas University of Technology (NSUT), New Delhi (2024 – 2026)
- **B.Tech in Computer Science & Engineering**: Indore Institute of Science and Technology (2020 – 2024) | CGPA: 7.72 / 10
- **AWS Academy Graduate**: Cloud Architecting & Cloud Foundations
- **Google Certified**: Cybersecurity Professional & Cloud Digital Training
- **Campus Ambassador**: UDGAM E-Summit, Entrepreneurship Cell (E-Cell), IIT Guwahati

---

## 📬 Contact

- **Email**: dhruvupadhyay708937@gmail.com
- **Academic Email**: dhruv.upadhyay.pg26@nsut.ac.in
- **GitHub**: [github.com/Dhruvdev-Codes](https://github.com/Dhruvdev-Codes)

