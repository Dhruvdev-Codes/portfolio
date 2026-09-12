import { searchLocalKnowledge, generateLocalRAGResponse } from "../src/lib/rag-helper";
import { handleChatRequest, checkIfGreeting, checkIfGeneralInquiry, checkIfPortfolioQuery } from "../src/lib/omniroute-agent";
import { executeDevMtechRouter } from "../src/lib/dev-mtech-router";
import { compressPromptContext } from "../src/lib/token-compression";

async function runInteractiveTests() {
  console.log("================================================================================");
  console.log("         DHRUV AI AGENT & DEV-MTECH-ROUTER TEST SUITE                           ");
  console.log("================================================================================\n");

  // 1. Test Token Compression Engine
  console.log("[TEST 0] Token Compression Engine Validation:");
  const sampleSystemPrompt = `You are Dhruv AI, an interactive personal AI assistant.\n\n\n\n### Personality\n- Warm\n- Conversational\n\n`;
  const sampleHistory = [
    { role: "user", content: "Hello   there!   How are you?   \n\n\n" },
    { role: "assistant", content: "I am doing   great! How can I help?  " },
  ];
  const sampleQuery = "  What   models does dev-mtech-router use?   ";

  const compressionResult = compressPromptContext(sampleSystemPrompt, sampleHistory, sampleQuery);
  console.log(`  • Original Chars: ${compressionResult.stats.originalChars}`);
  console.log(`  • Compressed Chars: ${compressionResult.stats.compressedChars}`);
  console.log(`  • Savings: ${compressionResult.stats.savingsPercent}%`);
  console.log(`  • Est. Tokens Before: ${compressionResult.stats.originalTokensEst} -> After: ${compressionResult.stats.compressedTokensEst}`);

  const testCases = [
    {
      category: "1. Router Combo Inquiry (dev-mtech-router)",
      query: "which ai model do you use and what is your routing strategy?",
    },
    {
      category: "2. User Screenshot Case: Exact query 'which ai model do you use'",
      query: "which ai model do you use",
    },
    {
      category: "3. Router Strategy & Fallback Cascade",
      query: "Configure a routing combo named dev-mtech-router with an automated fallback strategy.",
    },
    {
      category: "4. Casual Chat & Small Talk",
      query: "Hi, how are you doing today?",
    },
    {
      category: "5. Identity / Persona",
      query: "Who are you and what can you help me with?",
    },
    {
      category: "6. Coding Request: Binary Search",
      query: "Explain and write binary search in python",
    },
    {
      category: "7. Coding Request: Palindrome Checker",
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

  for (let i = 0; i < testCases.length; i++) {
    const { category, query } = testCases[i];
    console.log(`\n--------------------------------------------------------------------------------`);
    console.log(`[TEST #${i + 1}] Category: ${category}`);
    console.log(`User Query: "${query}"`);
    console.log(`Classification Flags:`);
    console.log(`  • isGreeting:   ${checkIfGreeting(query)}`);
    console.log(`  • isGeneral:    ${checkIfGeneralInquiry(query)}`);
    console.log(`  • isPortfolio:  ${checkIfPortfolioQuery(query)}`);

    const routerExecution = await executeDevMtechRouter(query);
    console.log(`Router Combo: ${routerExecution.routerName}`);
    console.log(`Active Tier:  ${routerExecution.tier} (${routerExecution.provider} - ${routerExecution.model})`);
    console.log(`Token Saved:  ${routerExecution.compressionStats.savingsPercent}%`);
    console.log(`Agent Output:\n`);
    console.log(routerExecution.text);
    console.log(`--------------------------------------------------------------------------------`);
  }

  console.log("\n================================================================================");
  console.log("            ALL DEV-MTECH-ROUTER TESTS COMPLETED SUCCESSFULLY                   ");
  console.log("================================================================================\n");
}

runInteractiveTests();

