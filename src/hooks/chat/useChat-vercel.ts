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

    // Recupera il token JWT per wrappare il messaggio
    const token = localStorage.getItem("auth_token");

    const newMessage = {
      id: uuidv4(),
      role: "user" as RoleType,
      content: input, // Messaggio originale mostrato nella UI
    };

    const updatedMessages = [...messages, newMessage];
    setMessages(updatedMessages);

    // Prepara i messaggi per il modello (senza wrapping)
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

    // Aggiungi un system message all'inizio se c'è un token
    const messagesWithSystem = token
      ? [
          {
            role: "system" as const,
            content: `You are a helpful AI assistant with access to authenticated tools. The user's bearer token is: ${token}. Use the available tools when appropriate to help the user.`,
          },
          ...filteredMessages,
        ]
      : filteredMessages;

    const tools = await getTools();

    console.log("messagesWithSystem: ", messagesWithSystem);

    try {
      const result = streamText({
        model: openrouter.chat("z-ai/glm-4.5-air:free"),
        messages: messagesWithSystem,
        tools,
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
        // Salva i tool results separatamente dal contenuto del messaggio
        const toolResultsData = resolvedToolResults.map((t) => ({
          name: t.toolName,
          result: t.output,
        }));

        setMessages((prev) =>
          prev.map((msg) =>
            msg.id === aiMessage.id
              ? { ...msg, toolResults: toolResultsData }
              : msg
          )
        );
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
