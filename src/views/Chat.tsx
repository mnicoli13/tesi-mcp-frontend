import React, { useState, useRef, useEffect } from "react";
import { Box, Paper } from "@mui/material";
// import ChatHeader from "../components/chat/ChatHeader";
import ChatMessages from "../components/chat/ChatMessages";
import ChatInput from "../components/chat/ChatInput";
import QuickActions from "../components/chat/QuickActions";
import { useChat } from "../hooks/chat/useChat-vercel";
import { quickActions } from "../utils/quickActionsData";

export default function Chat() {
  const { messages, sendMessage, isLoadingText, isToolsRunning, isLoading } =
    useChat();
  const [input, setInput] = useState("");
  const [inputHeight, setInputHeight] = useState(56);
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

  const headerHeight = 48;
  // const footerHeight = 52;
  // const containerPadding = 24;
  // const fixedComponentsHeight = headerHeight;

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* <ChatHeader /> */}

      <Paper
        elevation={2}
        sx={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          borderRadius: 2,
          position: "relative",
        }}
      >
        <Box
          sx={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            minHeight: `calc(100vh - ${headerHeight + inputHeight}px)`,
            maxHeight: `calc(100vh - ${headerHeight + inputHeight}px)`,
            height: `calc(100vh - ${headerHeight + inputHeight}px)`,
            overflowY: "auto",
          }}
        >
          <ChatMessages
            messages={messages}
            isLoadingText={isLoadingText}
            isToolsRunning={isToolsRunning}
            isLoading={isLoading}
            messagesEndRef={messagesEndRef}
          />
          <QuickActions actions={quickActions} setInput={setInput} />
        </Box>
        <ChatInput
          input={input}
          setInput={setInput}
          handleSend={handleSend}
          handleKeyPress={handleKeyPress}
          loading={isLoadingText}
          onHeightChange={setInputHeight}
        />
      </Paper>
    </Box>
  );
}
