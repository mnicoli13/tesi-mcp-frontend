import React, { useState, useRef, useEffect } from "react";
import { Box, Paper, IconButton, alpha } from "@mui/material";
import { Fullscreen, FullscreenExit } from "@mui/icons-material";
// import ChatHeader from "../components/chat/ChatHeader";
import ChatMessages from "../components/chat/ChatMessages";
import ChatInput from "../components/chat/ChatInput";
import QuickActions from "../components/chat/QuickActions";
import { useChat } from "../hooks/chat/useChat-vercel";

export default function Chat() {
  const { messages, sendMessage, isLoadingText, isToolsRunning, isLoading } =
    useChat();
  const [input, setInput] = useState("");
  const [isFullscreen, setIsFullscreen] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener("fullscreenchange", handleFullscreenChange);
    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
    };
  }, []);

  const toggleFullscreen = async () => {
    try {
      if (!document.fullscreenElement) {
        await document.documentElement.requestFullscreen();
      } else {
        await document.exitFullscreen();
      }
    } catch (error) {
      console.error("Error toggling fullscreen:", error);
    }
  };

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
    "What tools are available?",
    "Generate cv based on my profile",
    "Extract skills from my exams",
    "Suggest career job roles based on my exams",
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
          position: "relative",
        }}
      >
        <IconButton
          onClick={toggleFullscreen}
          sx={{
            position: "absolute",
            top: 16,
            left: 16,
            zIndex: 10,
            bgcolor: (theme) => alpha(theme.palette.primary.main, 0.1),
            color: "primary.main",
            "&:hover": {
              bgcolor: (theme) => alpha(theme.palette.primary.main, 0.2),
            },
          }}
          aria-label={isFullscreen ? "Exit fullscreen" : "Enter fullscreen"}
        >
          {isFullscreen ? <FullscreenExit /> : <Fullscreen />}
        </IconButton>
        <ChatMessages
          messages={messages}
          isLoadingText={isLoadingText}
          isToolsRunning={isToolsRunning}
          isLoading={isLoading}
          messagesEndRef={messagesEndRef}
        />
        <QuickActions actions={quickActions} setInput={setInput} />
        <ChatInput
          input={input}
          setInput={setInput}
          handleSend={handleSend}
          handleKeyPress={handleKeyPress}
          loading={isLoadingText}
        />
      </Paper>
    </Box>
  );
}
