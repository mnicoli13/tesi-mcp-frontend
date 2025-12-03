// src/hooks/useChat.ts
import { useState } from "react";
import type { Message, RoleType } from "../../types/message";
import { useMcpClient } from "./useMcpClient";
import { v4 as uuidv4 } from "uuid";
import OpenAI from "openai";

type MCPResult = {
  result?: {
    content?: Array<{ text?: string }>;
  };
};

console.log("import.meta.env.API_KEY: ", import.meta.env.VITE_API_KEY);

// Configure OpenRouter via OpenAI client
const client = new OpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: import.meta.env.VITE_API_KEY,
  defaultHeaders: {
    "HTTP-Referer": "http://localhost:3000",
    "X-Title": "Progetto Nicoli Chat",
  },
  dangerouslyAllowBrowser: true,
});

export function useChat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);
  const { getTools } = useMcpClient();

  async function sendMessage(input: string) {
    setLoading(true);

    const newMessage = {
      id: uuidv4(),
      role: "user" as RoleType,
      content: input,
    };

    const updatedMessages = [...messages, newMessage];
    setMessages(updatedMessages);

    const filteredMessages = updatedMessages
      .filter(
        (msg) =>
          msg.content.trim() !== "" &&
          !msg.content.startsWith("Sorry, I encountered an error")
      )
      .map((msg) => ({
        role: msg.role,
        content: msg.content.trim(),
      }));

    const tools = await getTools();
    console.log("tools:", tools);

    try {
      // Call OpenRouter model via OpenAI client
      const response = await client.responses.create({
        model: "z-ai/glm-4.5-air:free", // OpenRouter model
        // messages: filteredMessages.map((msg) => ({
        //   role: msg.role,
        //   content: msg.content,
        // })),
        tools: [
          {
            type: "function",
            server_label: "dmcp",
            server_description:
              "A Dungeons and Dragons MCP server to assist with dice rolling.",
            server_url: "https://localhost:8000/sse",
            require_approval: "never",
          },
        ],
        // temperature, max_tokens etc. can be added if needed
      });

      console.log("AI Response:", response);

      const aiMessage = {
        id: uuidv4(),
        role: "assistant" as RoleType,
        content: "",
      };

      setMessages((prev) => [...prev, aiMessage]);
      setLoading(false);

      return "";
    } catch (error) {
      console.error("Error generating response:", error);
      setLoading(false);
      return {
        error:
          error instanceof Error ? error.message : "Failed to get AI response",
      };
    }
  }

  return { messages, sendMessage, loading };
}
