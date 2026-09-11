"use client";

import { useState, useCallback } from "react";
import { searchLocalKnowledge, generateLocalRAGResponse } from "@/lib/rag-helper";

export interface ChatMessage {
  id: string;
  role: "user" | "assistant" | "system";
  content: string;
}

export function useChatStream({ api = "" }: { api?: string } = {}) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const simulateLocalStream = async (userText: string, assistantId: string) => {
    const context = searchLocalKnowledge(userText);
    const fullAnswer = generateLocalRAGResponse(userText, context);
    const words = fullAnswer.split(" ");
    let accumulated = "";

    for (let i = 0; i < words.length; i++) {
      accumulated += (i === 0 ? "" : " ") + words[i];
      setMessages((prev) =>
        prev.map((msg) =>
          msg.id === assistantId ? { ...msg, content: accumulated } : msg
        )
      );
      await new Promise((r) => setTimeout(r, 16));
    }
  };

  const sendMessage = useCallback(
    async (userText: string) => {
      if (!userText.trim() || isLoading) return;

      const userMsg: ChatMessage = {
        id: "msg-" + Date.now(),
        role: "user",
        content: userText.trim(),
      };

      const newMessages = [...messages, userMsg];
      setMessages(newMessages);
      setInput("");
      setIsLoading(true);

      const assistantId = "msg-" + (Date.now() + 1);
      const initialAssistantMsg: ChatMessage = {
        id: assistantId,
        role: "assistant",
        content: "",
      };

      setMessages((prev) => [...prev, initialAssistantMsg]);

      try {
        if (!api) {
          await simulateLocalStream(userText, assistantId);
          return;
        }

        const response = await fetch(api, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ messages: newMessages }),
        });

        if (!response.ok) {
          await simulateLocalStream(userText, assistantId);
          return;
        }

        const reader = response.body?.getReader();
        const decoder = new TextDecoder();

        if (!reader) {
          await simulateLocalStream(userText, assistantId);
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
        await simulateLocalStream(userText, assistantId);
      } finally {
        setIsLoading(false);
      }
    },
    [api, isLoading, messages]
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage(input);
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

