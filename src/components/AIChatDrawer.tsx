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
    "Which AI model and routing fallback strategy do you use?",
    "What is Dhruv's research topic and mathematical formulation?",
    "Explain the architecture of WorkVibe and SkillXchange.",
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
        <div className="w-full sm:w-[460px] h-[78vh] sm:h-[540px] max-h-[620px] bg-[#fdfbf7] border border-[#111111]/20 rounded-xl flex flex-col shadow-[10px_10px_0px_rgba(17,17,17,0.15)] overflow-hidden font-mono">
          {/* Terminal Header */}
          <div className="flex items-center justify-between px-4 py-3.5 bg-[#ebebea] border-b border-[#111111]/15">
            <div className="flex items-center gap-2 text-xs text-[#111111]">
              <Terminal className="w-4 h-4 text-[#b98158]" />
              <span className="font-black text-xs uppercase tracking-tight truncate max-w-[240px] sm:max-w-[280px]">terminal@feat: add Gemini 3.x/2.5 flash model cascade support</span>
              <span className="hidden sm:inline-block px-1.5 py-0.5 text-[9px] rounded bg-[#111111] text-[#fdfbf7] font-mono font-bold">
                dev-mtech-router
              </span>
            </div>

            <div className="flex items-center gap-1.5">
              <button
                onClick={() => setMessages([])}
                className="p-1.5 rounded text-[#111111]/60 hover:text-[#111111] hover:bg-[#ebebea] cursor-pointer transition-colors"
                title="Reset session"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={onClose}
                className="p-1.5 rounded text-[#111111]/60 hover:text-[#111111] hover:bg-[#ebebea] cursor-pointer transition-colors"
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
                <div className="p-3.5 rounded-lg bg-[#ebebea] border border-[#111111]/15 text-[#111111] space-y-1.5 shadow-sm">
                  <div className="flex items-center gap-2 text-[#b98158] font-black text-xs uppercase tracking-wide">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Dhruv Upadhyay AI Research Assistant</span>
                  </div>
                  <p className="text-[#555555] text-[11.5px] leading-relaxed font-sans">
                    Query M.Tech dissertation papers, systems architecture, or AWS credentials at NSUT Delhi.
                  </p>
                </div>

                <div>
                  <p className="text-[#555555] text-[10px] uppercase font-black mb-2 tracking-widest">Suggested Queries:</p>
                  <div className="space-y-1.5">
                    {promptSuggestions.map((prompt, idx) => (
                      <button
                        key={idx}
                        onClick={() => sendMessage(prompt)}
                        disabled={isLoading}
                        className="w-full text-left p-2.5 rounded-lg bg-[#ebebea] hover:bg-[#111111] hover:text-[#fdfbf7] text-[#111111] border border-[#111111]/15 text-[11px] font-bold cursor-pointer transition-all disabled:opacity-50 shadow-sm"
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
                className={`p-3.5 rounded-lg shadow-sm ${
                  m.role === "user"
                    ? "bg-[#ebebea] text-[#111111] ml-4 sm:ml-6 border border-[#111111]/20 font-bold"
                    : "bg-[#fdfbf7] border border-[#111111]/15 text-[#111111] mr-2 sm:mr-4 font-sans"
                }`}
              >
                <div className="text-[10px] text-[#555555] mb-1 flex items-center gap-1.5 font-bold uppercase font-mono">
                  {m.role === "user" ? <User className="w-3 h-3 text-[#b98158]" /> : <Bot className="w-3 h-3 text-[#111111]" />}
                  <span>{m.role === "user" ? "You" : "Dhruv AI Agent"}</span>
                </div>
                <div className="whitespace-pre-wrap leading-relaxed text-[12px]">{m.content}</div>
              </div>
            ))}

            {isLoading && (
              <div className="flex items-center gap-2 text-[#b98158] animate-pulse text-xs py-1 font-mono font-bold">
                <span className="w-2 h-2 rounded-full bg-[#b98158]" />
                <span>Synthesizing response stream...</span>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Form */}
          <form onSubmit={handleSubmit} className="p-3 bg-[#ebebea] border-t border-[#111111]/15 flex gap-2">
            <input
              ref={inputRef}
              value={input}
              onChange={handleInputChange}
              placeholder="Ask about AI, systems, AWS, or research..."
              className="flex-1 bg-[#fdfbf7] border border-[#111111]/20 rounded-lg px-3.5 py-2.5 text-xs text-[#111111] focus:outline-none focus:border-[#b98158] font-sans shadow-inner"
            />
            <button
              type="submit"
              disabled={isLoading || !input.trim()}
              className="bg-[#111111] hover:bg-[#b98158] disabled:opacity-50 text-[#fdfbf7] font-bold px-4 py-2.5 rounded-lg text-xs flex items-center justify-center transition-colors cursor-pointer shadow-[2px_2px_0px_rgba(185,129,88,0.4)]"
            >
              <Send className="w-3.5 h-3.5" />
            </button>
          </form>
        </div>
      </div>
    </>
  );
}


