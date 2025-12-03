// src/hooks/useChat.ts
import { useState } from "react";
import type { Message, RoleType } from "../../types/message";
import { useMcpClient } from "./useMcpClient";
import { generateText, streamText } from "ai";
// import { anthropic } from "@ai-sdk/anthropic";
import { v4 as uuidv4 } from "uuid";
import { createOpenRouter } from "@openrouter/ai-sdk-provider";

type MCPResult = {
  result?: {
    content?: Array<{ text?: string }>;
  };
};

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
      const result = await generateText({
        // model: lmStudio("qwen/qwen3-vl-4b"),
        model: openrouter.chat("z-ai/glm-4.5-air:free"),
        messages: filteredMessages,
        // system: SYSTEM_PROMPT,
        // maxSteps: 20,
        tools,
      });
      console.log("result: ", result);
      console.log("result.content: ", result.content);
      console.log("result.text: ", result.text);
      console.log("result.toolResults: ", result.toolResults);
      const { text, toolResults } = result;

      let responseText = "";

      if (toolResults?.length) {
        responseText = toolResults
          .map((toolResult) => {
            // Type narrowing: make sure output is an object
            const output = toolResult.output as
              | { content?: Array<{ text?: string }> }
              | undefined;

            const textPart = output?.content?.find((c) => c.text)?.text;
            return textPart || "";
          })
          .filter(Boolean)
          .join("\n");
      }

      console.log("responseText: ", responseText);

      const aiMessage = {
        id: uuidv4(),
        role: "assistant" as RoleType,
        content: responseText,
      };

      setMessages((prev) => [...prev, aiMessage]);

      setLoading(false);
      return responseText;
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
