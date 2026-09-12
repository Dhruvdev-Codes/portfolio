"use client";

import { useChatStream } from "@/hooks/use-chat-stream";
import { useRef, useEffect } from "react";
import { Terminal, Send, Bot, User, Sparkles, X, RotateCcw } from "lucide-react";

interface AIChatDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AIChatDrawer({ isOpen, onClose }: AIChatDrawerProps) {
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const {
    messages,
    input,
    handleInputChange,
    handleSubmit,
    isLoading,
    setMessages,
    sendMessage,
  } = useChatStream({ api: "/api/chat" });

  const promptSuggestions = [
    "What is Dhruv's research topic and mathematical formulation?",
    "Explain the architecture of WorkVibe and SkillXchange.",
    "What is ChatGPT and how do LLMs work?",
    "What are Dhruv's AWS and security credentials?",
  ];

  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
      inputRef.current?.focus();
    }
  }, [messages, isOpen]);

  if (!isOpen) return null;

  return (
    <>
      {/* Mobile backdrop overlay */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 md:hidden animate-in fade-in duration-200"
        onClick={onClose}
      />

      <div className="fixed bottom-3 left-3 right-3 sm:left-auto sm:right-6 sm:bottom-6 z-50 animate-in fade-in slide-in-from-bottom-4 duration-200">
        <div className="w-full sm:w-[460px] h-[78vh] sm:h-[540px] max-h-[620px] bg-white/98 dark:bg-[#12161f]/98 backdrop-blur-xl border border-slate-200 dark:border-[#222e44] rounded-xl flex flex-col shadow-2xl overflow-hidden font-mono">
          {/* Terminal Header */}
          <div className="flex items-center justify-between px-4 py-3 bg-slate-100 dark:bg-[#161d2b] border-b border-slate-200 dark:border-[#222e44]">
            <div className="flex items-center gap-2 text-xs text-slate-700 dark:text-slate-300">
              <Terminal className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
              <span className="font-semibold text-slate-800 dark:text-slate-200">terminal@dhruv-mtech:~$</span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setMessages([])}
                className="p-1.5 rounded text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100 hover:bg-slate-200 dark:hover:bg-[#1f2a3e] cursor-pointer transition-colors"
                title="Reset session"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={onClose}
                className="p-1.5 rounded text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100 hover:bg-slate-200 dark:hover:bg-[#1f2a3e] cursor-pointer transition-colors"
                title="Close terminal"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>


          {/* Messages */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3 text-xs">
            {messages.length === 0 && (
              <div className="space-y-4 py-2">
                <div className="p-3 rounded-lg bg-slate-50 dark:bg-[#161d2b] border border-slate-200 dark:border-[#222e44] text-slate-700 dark:text-slate-300 space-y-1.5">
                  <div className="flex items-center gap-2 text-cyan-600 dark:text-cyan-400 font-semibold text-[11px]">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Dhruv Upadhyay AI Research Assistant</span>
                  </div>
                  <p className="text-slate-600 dark:text-slate-400 text-[11px] leading-relaxed font-sans">
                    Query M.Tech dissertation papers, systems architecture, or AWS credentials at NSUT Delhi.
                  </p>
                </div>

                <div>
                  <p className="text-slate-500 dark:text-slate-400 text-[10px] uppercase font-bold mb-2">Suggested Queries:</p>
                  <div className="space-y-1.5">
                    {promptSuggestions.map((prompt, idx) => (
                      <button
                        key={idx}
                        onClick={() => sendMessage(prompt)}
                        disabled={isLoading}
                        className="w-full text-left p-2.5 rounded-lg bg-slate-50 hover:bg-slate-100 dark:bg-[#161d2b] dark:hover:bg-[#1d2738] text-slate-700 dark:text-slate-300 hover:text-cyan-700 dark:hover:text-cyan-300 border border-slate-200 dark:border-[#222e44] text-[11px] cursor-pointer transition-colors disabled:opacity-50"
                      >
                        ▸ {prompt}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {messages.map((m) => (
              <div
                key={m.id}
                className={`p-3 rounded-lg ${
                  m.role === "user"
                    ? "bg-cyan-50 dark:bg-[#182131] text-slate-900 dark:text-slate-100 ml-4 sm:ml-6 border border-cyan-300 dark:border-cyan-500/40"
                    : "bg-slate-50 dark:bg-[#141a26] border border-slate-200 dark:border-[#222e44] text-slate-800 dark:text-slate-200 mr-2 sm:mr-4"
                }`}
              >
                <div className="text-[10px] text-slate-500 dark:text-slate-400 mb-1 flex items-center gap-1.5 font-bold">
                  {m.role === "user" ? <User className="w-3 h-3 text-cyan-600 dark:text-cyan-400" /> : <Bot className="w-3 h-3 text-teal-600 dark:text-teal-400" />}
                  <span>{m.role === "user" ? "You" : "Dhruv AI Agent"}</span>
                </div>
                <div className="whitespace-pre-wrap leading-relaxed text-[11.5px] font-sans">{m.content}</div>
              </div>
            ))}

            {isLoading && (
              <div className="flex items-center gap-2 text-cyan-600 dark:text-cyan-400 animate-pulse text-xs py-1 font-mono">
                <span className="w-2 h-2 rounded-full bg-cyan-600 dark:bg-cyan-400" />
                <span>Synthesizing response stream...</span>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Form */}
          <form onSubmit={handleSubmit} className="p-3 bg-slate-100 dark:bg-[#161d2b] border-t border-slate-200 dark:border-[#222e44] flex gap-2">
            <input
              ref={inputRef}
              value={input}
              onChange={handleInputChange}
              placeholder="Ask about AI, systems, AWS, or research..."
              className="flex-1 bg-white dark:bg-[#111722] border border-slate-200 dark:border-[#222e44] rounded-lg px-3 py-2.5 text-xs text-slate-900 dark:text-slate-200 focus:outline-none focus:border-cyan-500 font-sans"
            />
            <button
              type="submit"
              disabled={isLoading || !input.trim()}
              className="bg-gradient-to-r from-cyan-600 to-teal-600 dark:from-cyan-500 dark:to-teal-500 hover:from-cyan-500 hover:to-teal-500 disabled:opacity-50 text-white dark:text-slate-950 font-bold px-3.5 py-2.5 rounded-lg text-xs flex items-center justify-center transition-colors cursor-pointer shadow-sm"
            >
              <Send className="w-3.5 h-3.5" />
            </button>
          </form>
        </div>
      </div>
    </>
  );
}


