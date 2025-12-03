// src/hooks/useChat.ts
import { useState } from "react";
import type { Message, RoleType } from "../../types/message";
import { useMcpClient } from "./useMcpClient";
import { streamText } from "ai";
// import { anthropic } from "@ai-sdk/anthropic";
import { v4 as uuidv4 } from "uuid";
import { createOpenRouter } from "@openrouter/ai-sdk-provider";

export function useChat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);
  const { getTools } = useMcpClient();

  // const lmStudio = createOpenAI({
  //   baseURL: "/v1",
  //   apiKey: "lm-studio",
  // });

  const openrouter = createOpenRouter({
    apiKey:
      "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",
  });

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

    console.log("tools: ", tools);

    try {
      const result = streamText({
        model: openrouter.chat("z-ai/glm-4.5-air:free"),
        messages: filteredMessages,
        tools,
        // opzionale: toolChoice: "auto",
      });

      const { textStream } = result;

      let liveText = "";
      const aiMessage = {
        id: uuidv4(),
        role: "assistant" as RoleType,
        content: "",
      };

      // Inserisco subito il placeholder dell’assistente
      setMessages((prev) => [...prev, aiMessage]);

      // Stream dei token
      for await (const delta of textStream) {
        // i delta possono contenere spazi iniziali, è normale
        liveText += delta;
        setMessages((prev) =>
          prev.map((msg) =>
            msg.id === aiMessage.id ? { ...msg, content: liveText } : msg
          )
        );
      }

      // Ora posso attendere gli esiti degli strumenti (se ci sono)
      const resolvedToolResults = await result.toolResults;

      if (resolvedToolResults?.length) {
        const toolText = resolvedToolResults
          .map((t) => {
            const output = t.output as
              | { content?: Array<{ text?: string }> }
              | undefined;
            return (
              output?.content
                ?.map((c) => c.text)
                .filter(Boolean)
                .join("\n") ?? ""
            );
          })
          .filter(Boolean)
          .join("\n");

        if (toolText) {
          liveText += (liveText ? "\n" : "") + toolText;
          setMessages((prev) =>
            prev.map((msg) =>
              msg.id === aiMessage.id ? { ...msg, content: liveText } : msg
            )
          );
        }
      }

      setLoading(false);
      return liveText;
    } catch (error) {
      console.error("Error in genAIResponse:", error);
      if (error instanceof Error && error.message.includes("rate limit")) {
        return { error: "Rate limit exceeded. Please try again in a moment." };
      }
      return {
        error:
          error instanceof Error ? error.message : "Failed to get AI response",
      };
    } finally {
      setLoading(false);
    }
  }

  return { messages, sendMessage, loading };
}
