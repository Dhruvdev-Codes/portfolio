"use client";

import { useState, useCallback } from "react";
import { handleChatRequest } from "@/lib/omniroute-agent";

export interface ChatMessage {
  id: string;
  role: "user" | "assistant" | "system";
  content: string;
}

export function useChatStream({ api = "/api/chat" }: { api?: string } = {}) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const simulateLocalStream = async (userText: string, assistantId: string) => {
    try {
      const { text } = await handleChatRequest(userText);
      const chunks = text.split(/(\s+)/);
      let accumulated = "";

      for (let i = 0; i < chunks.length; i++) {
        accumulated += chunks[i];
        setMessages((prev) =>
          prev.map((msg) =>
            msg.id === assistantId ? { ...msg, content: accumulated } : msg
          )
        );
        if (chunks[i].trim().length > 0) {
          await new Promise((r) => setTimeout(r, 14));
        }
      }
    } catch {
      setMessages((prev) =>
        prev.map((msg) =>
          msg.id === assistantId
            ? {
                ...msg,
                content:
                  "I am Dhruv AI — ready to assist with tech discussions, AI and cloud systems, or anything about Dhruv's research and software projects. What's on your mind today?",
              }
            : msg
        )
      );
    }
  };

  const sendMessage = useCallback(
    async (userText: string) => {
      const trimmed = userText.trim();
      if (!trimmed || isLoading) return;

      const userMsg: ChatMessage = {
        id: "msg-" + Date.now(),
        role: "user",
        content: trimmed,
      };

      const assistantId = "msg-" + (Date.now() + 1);
      const initialAssistantMsg: ChatMessage = {
        id: assistantId,
        role: "assistant",
        content: "",
      };

      setMessages((prev) => [...prev, userMsg, initialAssistantMsg]);
      setInput("");
      setIsLoading(true);

      try {
        if (!api) {
          await simulateLocalStream(trimmed, assistantId);
          return;
        }

        const response = await fetch(api, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            message: trimmed,
            messages: [...messages, userMsg].map((m) => ({
              role: m.role,
              content: m.content,
            })),
          }),
        });

        if (!response.ok) {
          await simulateLocalStream(trimmed, assistantId);
          return;
        }

        const reader = response.body?.getReader();
        const decoder = new TextDecoder();

        if (!reader) {
          await simulateLocalStream(trimmed, assistantId);
          return;
        }

        let accumulated = "";
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          const chunk = decoder.decode(value, { stream: true });
          accumulated += chunk;

          setMessages((prev) =>
            prev.map((msg) =>
              msg.id === assistantId ? { ...msg, content: accumulated } : msg
            )
          );
        }
      } catch {
        await simulateLocalStream(trimmed, assistantId);
      } finally {
        setIsLoading(false);
      }
    },
    [api, isLoading, messages]
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      sendMessage(input);
    }
  };

  return {
    messages,
    input,
    setInput,
    handleInputChange,
    handleSubmit,
    isLoading,
    setMessages,
    sendMessage,
  };
}


