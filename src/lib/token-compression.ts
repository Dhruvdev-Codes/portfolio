/**
 * Token Compression Engine for dev-mtech-router
 * Reduces redundant prompt overhead, optimizes conversational history,
 * and strips superfluous tokens before dispatching requests to LLM providers.
 */

export interface CompressionStats {
  originalChars: number;
  compressedChars: number;
  originalTokensEst: number;
  compressedTokensEst: number;
  charsSaved: number;
  savingsPercent: number;
}

/**
 * Fast whitespace, newline, and formatting normalization
 */
export function compressSingleText(text: string): string {
  if (!text) return "";
  return text
    // Replace 3 or more consecutive newlines with 2 newlines
    .replace(/\n{3,}/g, "\n\n")
    // Replace 2 or more horizontal spaces/tabs with single space
    .replace(/[ \t]+/g, " ")
    // Trim leading/trailing whitespaces on each line
    .split("\n")
    .map((line) => line.trim())
    .join("\n")
    .trim();
}

/**
 * Strips redundant markdown repetitions and normalizes system prompt
 */
export function compressSystemPrompt(systemPrompt: string): string {
  if (!systemPrompt) return "";
  const compressed = compressSingleText(systemPrompt);
  return compressed;
}

/**
 * Prunes and compresses multi-turn conversational history
 * Keeps the most recent N turns while compacting each turn's text
 */
export function compressHistory(
  history: Array<{ role: string; content: string }>,
  maxTurns: number = 8
): Array<{ role: string; content: string }> {
  if (!Array.isArray(history) || history.length === 0) return [];

  // Keep the most recent maxTurns
  const sliced = history.slice(-maxTurns);

  return sliced.map((item) => ({
    role: item.role === "assistant" || item.role === "model" ? "assistant" : "user",
    content: compressSingleText(item.content || ""),
  }));
}

/**
 * Comprehensive Token Compression Pipeline
 */
export function compressPromptContext(
  systemPrompt: string,
  history: Array<{ role: string; content: string }>,
  userMessage: string,
  maxTurns: number = 8
): {
  compressedSystemPrompt: string;
  compressedHistory: Array<{ role: string; content: string }>;
  compressedUserMessage: string;
  stats: CompressionStats;
} {
  const originalSystemChars = systemPrompt.length;
  const originalHistoryChars = history.reduce((sum, h) => sum + (h.content?.length || 0), 0);
  const originalUserChars = userMessage.length;
  const originalTotalChars = originalSystemChars + originalHistoryChars + originalUserChars;

  const compressedSystemPrompt = compressSystemPrompt(systemPrompt);
  const compressedHistory = compressHistory(history, maxTurns);
  const compressedUserMessage = compressSingleText(userMessage);

  const compressedHistoryChars = compressedHistory.reduce((sum, h) => sum + h.content.length, 0);
  const compressedTotalChars =
    compressedSystemPrompt.length + compressedHistoryChars + compressedUserMessage.length;

  const charsSaved = Math.max(0, originalTotalChars - compressedTotalChars);
  const savingsPercent =
    originalTotalChars > 0 ? Math.round((charsSaved / originalTotalChars) * 1000) / 10 : 0;

  // Approximate 1 token ~= 4 characters for English text
  const originalTokensEst = Math.ceil(originalTotalChars / 4);
  const compressedTokensEst = Math.ceil(compressedTotalChars / 4);

  return {
    compressedSystemPrompt,
    compressedHistory,
    compressedUserMessage,
    stats: {
      originalChars: originalTotalChars,
      compressedChars: compressedTotalChars,
      originalTokensEst,
      compressedTokensEst,
      charsSaved,
      savingsPercent,
    },
  };
}
