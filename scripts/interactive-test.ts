import { searchLocalKnowledge, generateLocalRAGResponse } from "../src/lib/rag-helper";
import { handleChatRequest, checkIfGreeting, checkIfGeneralInquiry, checkIfPortfolioQuery } from "../src/lib/omniroute-agent";

async function runInteractiveTests() {
  const testCases = [
    {
      category: "1. Casual Chat & Small Talk",
      query: "Hi, how are you doing today?",
    },
    {
      category: "2. Identity / Who are you",
      query: "Who are you and what can you help me with?",
    },
    {
      category: "3. Programmer Humor",
      query: "Tell me a joke!",
    },
    {
      category: "4. General Knowledge: ChatGPT & LLMs",
      query: "What is ChatGPT and how do LLMs work?",
    },
    {
      category: "5. General Knowledge: Quantum Computing",
      query: "Explain quantum computing and its impact on cryptography",
    },
    {
      category: "6. General Knowledge: Docker & Containers",
      query: "What is Docker and how does containerization work?",
    },
    {
      category: "7. Dhruv Portfolio: M.Tech Research",
      query: "What is Dhruv's research topic and mathematical formulation at NSUT?",
    },
    {
      category: "8. Dhruv Portfolio: AWS Certifications",
      query: "What AWS and cloud certifications does Dhruv hold?",
    },
    {
      category: "9. Dhruv Portfolio: Projects (WorkVibe)",
      query: "Explain the architecture of WorkVibe and how Dhruv optimized database latency.",
    },
    {
      category: "10. Dynamic Open-Ended Inquiry (No Rigid Template)",
      query: "How does photosynthesis work in plants?",
    }
  ];

  console.log("================================================================================");
  console.log("            DHRUV AI AGENT — INTERACTIVE TEST SUITE RUNNER                      ");
  console.log("================================================================================\n");

  for (let i = 0; i < testCases.length; i++) {
    const { category, query } = testCases[i];
    console.log(`\n--------------------------------------------------------------------------------`);
    console.log(`[TEST #${i + 1}] Category: ${category}`);
    console.log(`User Query: "${query}"`);
    console.log(`Classification Flags:`);
    console.log(`  • isGreeting: ${checkIfGreeting(query)}`);
    console.log(`  • isGeneral:  ${checkIfGeneralInquiry(query)}`);
    console.log(`  • isPortfolio: ${checkIfPortfolioQuery(query)}`);

    const chatResponse = await handleChatRequest(query);
    console.log(`Routed Intent: ${chatResponse.intent}`);
    console.log(`Agent Output:\n`);
    console.log(chatResponse.text);
    console.log(`--------------------------------------------------------------------------------`);
  }

  console.log("\n================================================================================");
  console.log("            ALL INTERACTIVE TEST CASES COMPLETED SUCCESSFULLY                   ");
  console.log("================================================================================\n");
}

runInteractiveTests();
