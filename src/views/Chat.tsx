import React, { useState, useRef, useEffect } from "react";
import { Box, Paper } from "@mui/material";
import ChatHeader from "../components/chat/ChatHeader";
import ChatMessage from "../components/chat/ChatMessage";
import ChatInput from "../components/chat/ChatInput";
import QuickActions from "../components/chat/QuickActions";
import { useChat } from "../hooks/chat/useChat-vercel";

export default function Chat() {
  const { messages, sendMessage, loading } = useChat();
  const [input, setInput] = useState("");
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = () => {
    if (input.trim()) {
      sendMessage(input);
      setInput("");
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const quickActions = [
    "Use the greeting-tool to greet Nicoli",
    "Tell me about MCP",
    "What tools are available?",
  ];

  const headerHeight = 64;
  const footerHeight = 52;
  const containerPadding = 24;
  const fixedComponentsHeight =
    headerHeight + footerHeight + 2 * containerPadding;

  return (
    <Box
      sx={{
        minHeight: `calc(100vh - ${fixedComponentsHeight}px)`,
        maxHeight: `calc(100vh - ${fixedComponentsHeight}px)`,
        height: `calc(100vh - ${fixedComponentsHeight}px)`,
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* <ChatHeader /> */}

      <Paper
        elevation={2}
        sx={{
          flex: 1,
          mb: 2,
          display: "flex",
          flexDirection: "column",
          borderRadius: 2,
        }}
      >
        <ChatMessage
          messages={messages}
          loading={loading}
          messagesEndRef={messagesEndRef}
        />
        <QuickActions actions={quickActions} setInput={setInput} />
        <ChatInput
          input={input}
          setInput={setInput}
          handleSend={handleSend}
          handleKeyPress={handleKeyPress}
          loading={loading}
        />
      </Paper>
    </Box>
  );
}
