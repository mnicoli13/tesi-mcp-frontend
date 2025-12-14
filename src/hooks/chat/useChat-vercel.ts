// src/hooks/useChat.ts
import { useState } from "react";
import type { Message, RoleType } from "../../types/message";
import { useMcpClient } from "./useMcpClient";
import { streamText } from "ai";
// import { anthropic } from "@ai-sdk/anthropic";
import { v4 as uuidv4 } from "uuid";
import { createOpenRouter } from "@openrouter/ai-sdk-provider";
import { validateAndEnsureToken } from "../../utils/authValidation";
import { SYSTEM_WELCOME_MESSAGE } from "../../utils/systemPrompt";

export function useChat() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: uuidv4(),
      role: "assistant" as RoleType,
      content: SYSTEM_WELCOME_MESSAGE,
    },
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingText, setIsLoadingText] = useState(false);
  const [isToolsRunning, setIsToolsRunning] = useState(false);
  const [isReasoningRunning, setIsReasoningRunning] = useState(false);
  const { getTools } = useMcpClient();

  // const lmStudio = createOpenAI({
  //   baseURL: "/v1",
  //   apiKey: "lm-studio",
  // });

  const openrouter = createOpenRouter({
    apiKey: import.meta.env.VITE_OPENROUTER_API_KEY,
  });

  async function sendMessage(input: string) {
    setIsLoading(true);

    // STEP 1: VALIDAZIONE AUTENTICAZIONE E RECUPERO TOKEN
    const validationResult = await validateAndEnsureToken(5);

    if (!validationResult.success) {
      const errorMessage = {
        id: uuidv4(),
        role: "assistant" as RoleType,
        content: validationResult.errorMessage || "Errore di autenticazione.",
      };
      setMessages((prev) => [...prev, errorMessage]);

      // Redirect al login se necessario
      if (validationResult.shouldRedirect) {
        setTimeout(() => {
          window.location.href = "/login";
        }, validationResult.redirectDelay || 2000);
      }

      return {
        error: validationResult.errorMessage || "Authentication failed",
      };
    }

    const token = validationResult.token!;

    // STEP 2: AGGIUNTA MESSAGGIO DELL'UTENTE NELLA CHAT
    const newMessage = {
      id: uuidv4(),
      role: "user" as RoleType,
      content: input,
    };

    const updatedMessages = [...messages, newMessage];
    setMessages(updatedMessages);

    // STEP 3: PREPARAZIONE MESSAGGI PER IL MODELLO
    // Rimuovo messaggi vuoti e errori
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

    try {
      let liveText = "";
      let reasoningText = "";

      const aiMessage = {
        id: uuidv4(),
        role: "assistant" as RoleType,
        content: "",
        reasoning: "",
      };
      setMessages((prev) => [...prev, aiMessage]);
      // STEP 4: CHIAMATA AL MODELLO
      const result = streamText({
        model: openrouter.chat(import.meta.env.VITE_OPENROUTER_MODEL),
        messages: messagesWithSystem,
        tools,
        onChunk({ chunk }) {
          switch (chunk.type) {
            case "reasoning-delta": {
              setIsReasoningRunning(true);

              reasoningText += chunk.text ?? "";

              setMessages((prev) =>
                prev.map((msg) =>
                  msg.id === aiMessage.id
                    ? { ...msg, reasoning: reasoningText }
                    : msg
                )
              );
              break;
            }
            case "text-delta": {
              setIsReasoningRunning(false);
              setIsLoadingText(true);
              break;
            }
            case "tool-input-start": {
              setIsLoadingText(false);
              setIsToolsRunning(true);
              break;
            }
            case "tool-result": {
              setIsToolsRunning(false);
              break;
            }
          }
        },
      });

      const { textStream } = result;

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

      // STEP 5: GESTIONE RISULTATI TOOLS
      let toolResultsData: any[] = [];
      try {
        console.log("⏳ Waiting for tool results...");
        const resolvedToolResults = await result.toolResults;

        // Process tool results if any
        if (resolvedToolResults?.length) {
          console.log(
            `✅ Tool results received: ${resolvedToolResults.length} tools executed`
          );

          toolResultsData = resolvedToolResults.map((t) => ({
            name: t.toolName,
            result: t.output,
          }));

          // Inserisco i tool results nel messaggio
          setMessages((prev) =>
            prev.map((msg) =>
              msg.id === aiMessage.id
                ? { ...msg, toolResults: toolResultsData }
                : msg
            )
          );

          console.log("✅ Tools processing completed");
        } else {
          console.log("ℹ️ No tool results to process");
        }
      } catch (mcpError) {
        console.error("❌ Errore MCP:", mcpError);

        toolResultsData.push({
          name: "MCP error",
          error:
            mcpError instanceof Error ? mcpError.message : "Errore tool MCP",
        });

        // Inserisco l'errore nel messaggio
        setMessages((prev) =>
          prev.map((msg) =>
            msg.id === aiMessage.id
              ? { ...msg, toolResults: toolResultsData }
              : msg
          )
        );

        await new Promise((resolve) => setTimeout(resolve, 100));
      }

      return liveText;
    } catch (error) {
      console.log("Error in genAIResponse:");
      console.error("Error in genAIResponse:", error);

      if (error instanceof Error && error.message.includes("rate limit")) {
        return { error: "Rate limit exceeded. Please try again in a moment." };
      }
      return {
        error:
          error instanceof Error ? error.message : "Failed to get AI response",
      };
    } finally {
      console.log("finally");
      setIsLoading(false);
      setIsLoadingText(false);
      setIsToolsRunning(false);
      setIsReasoningRunning(false);
    }
  }

  return {
    messages,
    sendMessage,
    isLoading,
    isLoadingText,
    isToolsRunning,
    isReasoningRunning,
  };
}
