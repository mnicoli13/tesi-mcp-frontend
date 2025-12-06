import {
  Box,
  Paper,
  Avatar,
  Typography,
  Stack,
  CircularProgress,
  Fade,
} from "@mui/material";
import { SmartToy, Person } from "@mui/icons-material";
import { Message } from "../../types/message";

type MessageBubbleProps = {
  message: Message;
  loading?: boolean;
};

export default function MessageBubble({
  message,
  loading,
}: MessageBubbleProps) {
  const isUser = message.role === "user";

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: isUser ? "flex-end" : "flex-start",
        gap: 1.5,
      }}
    >
      {!isUser && (
        <Avatar sx={{ bgcolor: "primary.main", width: 36, height: 36 }}>
          <SmartToy sx={{ fontSize: 20 }} />
        </Avatar>
      )}
      {/* {loading && !message ? (
        <Fade in>
          <Box sx={{ display: "flex", gap: 1.5 }}>
            <Avatar sx={{ bgcolor: "primary.main", width: 36, height: 36 }}>
              <SmartToy sx={{ fontSize: 20 }} />
            </Avatar>
            <Paper
              elevation={1}
              sx={{
                px: 2.5,
                py: 1.5,
                bgcolor: "white",
                borderRadius: 2,
                borderTopLeftRadius: 0,
              }}
            >
              <Stack direction="row" spacing={1} alignItems="center">
                <CircularProgress size={16} />
                <Typography variant="body2" color="text.secondary">
                  Thinking...
                </Typography>
              </Stack>
            </Paper>
          </Box>
        </Fade>
      ) : ( */}
      <Paper
        elevation={1}
        sx={{
          px: 2.5,
          py: 1.5,
          maxWidth: "70%",
          bgcolor: isUser ? "primary.main" : "white",
          color: isUser ? "white" : "text.primary",
          borderRadius: 2,
          borderTopLeftRadius: isUser ? 2 : 0,
          borderTopRightRadius: isUser ? 0 : 2,
        }}
      >
        <Typography variant="body1" sx={{ lineHeight: 1.6 }}>
          {message.content}
        </Typography>
      </Paper>
      {/* )} */}

      {isUser && (
        <Avatar sx={{ bgcolor: "secondary.main", width: 36, height: 36 }}>
          <Person sx={{ fontSize: 20 }} />
        </Avatar>
      )}
    </Box>
  );
}
