import { Box, Stack, Fade, Avatar } from "@mui/material";
import MessageBubble from "./messages/MessageBubble";
import { Message } from "../../types/message";
import { ToolResults } from "./messages/ToolResults";
import { LoadingState } from "./messages/LoadingState";
import HandymanOutlinedIcon from "@mui/icons-material/HandymanOutlined";
import { SmartToy } from "@mui/icons-material";
import { useEffect } from "react";
import MessageError from "./messages/MessageError";

type ChatMessagesProps = {
  messages: Message[];
  isLoadingText: boolean;
  isToolsRunning: boolean;
  isLoading: boolean;
  messagesEndRef: any;
};

export default function ChatMessages({
  messages,
  isLoadingText,
  isToolsRunning,
  isLoading,
  messagesEndRef,
}: ChatMessagesProps) {
  useEffect(() => {
    console.log("messages", messages);
  }, [messages]);
  return (
    <Box
      sx={{
        flex: 1,
        p: 3,
        pb: 0.5,
        "&::-webkit-scrollbar": { width: "8px" },
        "&::-webkit-scrollbar-track": { bgcolor: "grey.100" },
        "&::-webkit-scrollbar-thumb": {
          bgcolor: "grey.400",
          borderRadius: "4px",
        },
      }}
    >
      <Stack spacing={2}>
        {messages.map((m, i) => (
          <Fade in key={i} timeout={500}>
            <Stack spacing={2}>
              <MessageBubble
                role={m.role}
                content={m.content}
                reasoning={m.reasoning}
              />

              <ToolResults toolResults={m.toolResults} />

              {m.error && <MessageError content={m.error} />}
            </Stack>
          </Fade>
        ))}

        {isLoading &&
          !messages[messages.length - 1]?.reasoning &&
          !messages[messages.length - 1]?.content && (
            <Box
              sx={{
                display: "flex",
                justifyContent: "flex-start",
                gap: 1.5,
              }}
            >
              <Avatar sx={{ bgcolor: "primary.main", width: 36, height: 36 }}>
                <SmartToy sx={{ fontSize: 20 }} />
              </Avatar>
              <LoadingState />
            </Box>
          )}

        {isLoadingText && !messages[messages.length - 1]?.content && (
          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-start",
              gap: 1.5,
            }}
          >
            <Avatar sx={{ bgcolor: "primary.main", width: 36, height: 36 }}>
              <SmartToy sx={{ fontSize: 20 }} />
            </Avatar>
            <LoadingState />
          </Box>
        )}

        {isToolsRunning && !messages[messages.length - 1]?.toolResults && (
          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-start",
              gap: 1.5,
            }}
          >
            <Avatar sx={{ bgcolor: "primary.main", width: 36, height: 36 }}>
              <HandymanOutlinedIcon sx={{ fontSize: 20 }} />
            </Avatar>
            <LoadingState />
          </Box>
        )}

        <Box ref={messagesEndRef} sx={{ mt: "0 !important" }} />
      </Stack>
    </Box>
  );
}
