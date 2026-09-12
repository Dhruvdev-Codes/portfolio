import { searchLocalKnowledge, generateLocalRAGResponse } from "../src/lib/rag-helper";
import { handleChatRequest, checkIfGreeting, checkIfGeneralInquiry, checkIfPortfolioQuery } from "../src/lib/omniroute-agent";

async function runInteractiveTests() {
  const testCases = [
    {
      category: "1. AI Model Architecture Inquiry (User screenshot issue)",
      query: "which ai model do you use",
    },
    {
      category: "2. Casual Chat & Small Talk",
      query: "Hi, how are you doing today?",
    },
    {
      category: "3. Identity / Persona",
      query: "Who are you and what can you help me with?",
    },
    {
      category: "4. Programmer Humor",
      query: "Tell me a joke!",
    },
    {
      category: "5. General Knowledge: ChatGPT & LLMs",
      query: "What is ChatGPT and how do LLMs work?",
    },
    {
      category: "6. Coding Request: Binary Search",
      query: "Explain and write binary search in python",
    },
    {
      category: "7. Coding Request: Palindrome",
      query: "Write a python function to check if a string is a palindrome",
    },
    {
      category: "8. Mathematical Problem Solving",
      query: "Solve 2x + 5 = 15",
    },
    {
      category: "9. General Science: Photosynthesis",
      query: "How does photosynthesis work in plants?",
    },
    {
      category: "10. World Knowledge: Capitals",
      query: "What is the capital of France?",
    },
    {
      category: "11. Dhruv Portfolio: M.Tech Research",
      query: "What is Dhruv's research topic and mathematical formulation at NSUT?",
    },
    {
      category: "12. Dhruv Portfolio: AWS Certifications",
      query: "What AWS and cloud certifications does Dhruv hold?",
    },
    {
      category: "13. Dhruv Portfolio: Projects (WorkVibe)",
      query: "Explain the architecture of WorkVibe and how Dhruv optimized database latency.",
    },
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

