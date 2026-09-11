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

  const { messages, input, handleInputChange, handleSubmit, isLoading, setInput, setMessages } = useChatStream({
    api: "/api/chat",
  });

  const promptSuggestions = [
    "What is Dhruv's research topic and mathematical formulation?",
    "Explain the architecture of WorkVibe and SkillXchange.",
    "What are Dhruv's AWS and security credentials?",
    "How does Dhruv reduce route repair latency in MANETs?",
  ];

  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 animate-in fade-in duration-200">
      <div className="w-[92vw] sm:w-[460px] h-[540px] bg-[#12161f]/95 backdrop-blur-xl border border-[#222e44] rounded-xl flex flex-col shadow-2xl overflow-hidden font-mono">
        {/* Terminal Header */}
        <div className="flex items-center justify-between px-4 py-3 bg-[#161d2b] border-b border-[#222e44]">
          <div className="flex items-center gap-2 text-xs text-slate-300">
            <Terminal className="w-4 h-4 text-cyan-400" />
            <span className="font-semibold text-slate-200">terminal@dhruv-mtech:~$</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setMessages([])}
              className="p-1 rounded text-slate-400 hover:text-slate-100 hover:bg-[#1f2a3e] cursor-pointer"
              title="Reset session"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={onClose}
              className="p-1 rounded text-slate-400 hover:text-slate-100 hover:bg-[#1f2a3e] cursor-pointer"
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
              <div className="p-3 rounded-lg bg-[#161d2b] border border-[#222e44] text-slate-300 space-y-1.5">
                <div className="flex items-center gap-2 text-cyan-400 font-semibold text-[11px]">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Dhruv Upadhyay AI Research Assistant</span>
                </div>
                <p className="text-slate-400 text-[11px] leading-relaxed">
                  Query M.Tech dissertation papers, systems architecture, or AWS credentials at NSUT Delhi.
                </p>
              </div>

              <div>
                <p className="text-slate-400 text-[10px] uppercase font-bold mb-2">Suggested Queries:</p>
                <div className="space-y-1.5">
                  {promptSuggestions.map((prompt, idx) => (
                    <button
                      key={idx}
                      onClick={() => setInput(prompt)}
                      className="w-full text-left p-2 rounded bg-[#161d2b] hover:bg-[#1d2738] text-slate-300 hover:text-cyan-300 border border-[#222e44] text-[11px] cursor-pointer transition-colors"
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
                  ? "bg-[#182131] text-slate-100 ml-6 border border-cyan-500/40"
                  : "bg-[#141a26] border border-[#222e44] text-slate-200 mr-4"
              }`}
            >
              <div className="text-[10px] text-slate-400 mb-1 flex items-center gap-1.5 font-bold">
                {m.role === "user" ? <User className="w-3 h-3 text-cyan-400" /> : <Bot className="w-3 h-3 text-teal-400" />}
                <span>{m.role === "user" ? "You" : "Dhruv AI Agent"}</span>
              </div>
              <div className="whitespace-pre-wrap leading-relaxed text-[11.5px] font-sans">{m.content}</div>
            </div>
          ))}

          {isLoading && (
            <div className="flex items-center gap-2 text-cyan-400 animate-pulse text-xs py-1">
              <span className="w-2 h-2 rounded-full bg-cyan-400" />
              <span>Synthesizing response stream...</span>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Form */}
        <form onSubmit={handleSubmit} className="p-3 bg-[#161d2b] border-t border-[#222e44] flex gap-2">
          <input
            value={input}
            onChange={handleInputChange}
            placeholder="Ask about research, systems, or AWS..."
            className="flex-1 bg-[#111722] border border-[#222e44] rounded-lg px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-cyan-400"
          />
          <button
            type="submit"
            disabled={isLoading || !input.trim()}
            className="bg-gradient-to-r from-cyan-500 to-teal-500 hover:from-cyan-400 hover:to-teal-400 disabled:opacity-50 text-slate-950 font-bold px-3.5 py-2 rounded-lg text-xs flex items-center justify-center transition-colors cursor-pointer"
          >
            <Send className="w-3.5 h-3.5" />
          </button>
        </form>
      </div>
    </div>
  );
}

