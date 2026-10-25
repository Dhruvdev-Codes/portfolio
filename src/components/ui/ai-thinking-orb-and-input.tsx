"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export interface MorphOrbProps {
  onSubmit?: (text: string) => Promise<string> | string;
}

interface Message {
  id: string;
  sender: "user" | "agent";
  text: string;
}

export default function MorphOrb({ onSubmit }: MorphOrbProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      sender: "agent",
      text: "Hi! Glad you stopped by. Feel free to ask me general questions about computer science, AI, security, or anything else you'd like to explore.",
    },
  ]);
  const [inputVal, setInputVal] = useState("");
  const [isThinking, setIsThinking] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isOpen]);

  const handleSend = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const query = inputVal.trim();
    if (!query || isThinking) return;

    const userMsg: Message = { id: Date.now().toString(), sender: "user", text: query };
    setMessages((prev) => [...prev, userMsg]);
    setInputVal("");
    setIsThinking(true);

    try {
      const handler = onSubmit || (async (q) => `I have processed your request: "${q}".`);
      const responseText = await handler(query);
      const agentMsg: Message = {
        id: (Date.now() + 1).toString(),
        sender: "agent",
        text: responseText,
      };
      setMessages((prev) => [...prev, agentMsg]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          sender: "agent",
          text: "Sorry, I encountered an issue processing your request. Please try again.",
        },
      ]);
    } finally {
      setIsThinking(false);
    }
  };


  return (
    <>
      {!isOpen && (
        <motion.button
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 z-50 flex items-center gap-2 px-4 py-2.5 rounded-full bg-[#111111] text-[#ebebea] shadow-[4px_4px_0px_#b98158] hover:shadow-[6px_6px_0px_#b98158] transition-all cursor-pointer border border-[#111111]/20 font-mono text-xs uppercase tracking-wider"
        >
          <span className="w-2 h-2 rounded-full bg-[#b98158] animate-ping" />
          <svg className="w-4 h-4 text-[#b98158]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
          </svg>
          <span>AI Agent</span>
        </motion.button>
      )}

      <AnimatePresence>
        {isOpen && (
          <motion.div
            drag
            dragConstraints={{ left: -500, right: 500, top: -300, bottom: 400 }}
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-[90vw] max-w-[480px] h-[520px] bg-[#fdfbf7] border border-[#111111]/20 rounded-2xl shadow-[10px_10px_0px_rgba(17,17,17,0.15)] flex flex-col overflow-hidden font-sans cursor-grab active:cursor-grabbing"
          >
            <div className="flex items-center justify-between px-5 py-3.5 border-b border-[#111111]/10 bg-[#ebebea]">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#b98158] animate-pulse" />
                <span className="font-mono text-xs font-bold text-[#111111] uppercase tracking-wider">
                  AI Agent
                </span>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="w-7 h-7 rounded-full bg-[#111111]/5 hover:bg-[#111111] text-[#111111] hover:text-[#ebebea] transition-colors flex items-center justify-center font-bold text-sm cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-3.5 bg-[#fdfbf7]">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[82%] px-4 py-2.5 rounded-2xl text-xs leading-relaxed ${
                      msg.sender === "user"
                        ? "bg-[#111111] text-[#ebebea] rounded-br-none"
                        : "bg-[#ebebea] text-[#111111] border border-[#111111]/10 rounded-bl-none"
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}

              {isThinking && (
                <div className="flex justify-start">
                  <div className="bg-[#ebebea] text-[#111111] border border-[#111111]/10 px-4 py-2.5 rounded-2xl rounded-bl-none text-xs flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#b98158] animate-ping" />
                    <span className="font-mono text-[11px] text-neutral-500">Thinking…</span>
                  </div>
                </div>
              )}
              <div ref={chatEndRef} />
            </div>

            <form onSubmit={handleSend} className="p-3 border-t border-[#111111]/10 bg-[#ebebea] flex items-center gap-2">
              <input
                type="text"
                value={inputVal}
                onChange={(e) => setInputVal(e.target.value)}
                placeholder="Ask anything…"
                disabled={isThinking}
                className="flex-1 bg-[#fdfbf7] border border-[#111111]/20 rounded-xl px-4 py-2.5 text-xs text-[#111111] placeholder:text-neutral-400 outline-none focus:border-[#111111] transition-all disabled:opacity-50"
              />
              <button
                type="submit"
                disabled={!inputVal.trim() || isThinking}
                className="w-9 h-9 rounded-xl bg-[#111111] text-[#ebebea] flex items-center justify-center hover:bg-[#b98158] transition-colors disabled:opacity-40 disabled:hover:bg-[#111111] shrink-0 cursor-pointer"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 10l7-7m0 0l7 7m-7-7v18" />
                </svg>
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}


