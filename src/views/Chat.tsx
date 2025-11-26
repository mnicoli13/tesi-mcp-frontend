import React, { useState, useRef, useEffect } from "react";
import { Box, Container, Paper } from "@mui/material";
import ChatHeader from "../components/ChatHeader";
import ChatMessage from "../components/ChatMessage";
import ChatInput from "../components/ChatInput";
import QuickActions from "../components/QuickActions";
import { useChat } from "../hooks/useChat-vercel";

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

  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: "grey.50",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* <ChatHeader /> */}
      <Container
        maxWidth="md"
        sx={{ flex: 1, py: 3, display: "flex", flexDirection: "column" }}
      >
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
      </Container>
    </Box>
  );
}
