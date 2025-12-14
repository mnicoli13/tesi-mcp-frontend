import { Box, Paper, Avatar, Typography } from "@mui/material";
import { SmartToy, Person } from "@mui/icons-material";
import { RoleType } from "../../types/message";

type MessageBubbleProps = {
  content?: string;
  role?: RoleType;
  reasoning?: string;
};

export default function MessageBubble({
  content,
  role,
  reasoning,
}: MessageBubbleProps) {
  const isUser = role === "user";
  if (content || reasoning) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: isUser ? "flex-end" : "flex-start",
          gap: 1.5,
        }}
      >
        {!isUser && (
          <Avatar
            sx={{ bgcolor: "primary.main", width: 36, height: 36, mt: 1 }}
          >
            <SmartToy sx={{ fontSize: 20 }} />
          </Avatar>
        )}
        <Box sx={{ maxWidth: "70%" }}>
          {reasoning && (
            <Paper
              elevation={1}
              sx={{
                px: 2.5,
                py: 1.5,
                bgcolor: isUser ? "primary.dark" : "grey.100",
                color: isUser ? "rgba(255, 255, 255, 0.85)" : "text.secondary",
                borderRadius: 2,
                borderTopLeftRadius: isUser ? 2 : 0,
                borderTopRightRadius: isUser ? 0 : 2,
                borderBottomLeftRadius: 0,
                borderBottomRightRadius: 0,
                borderBottom: 1,
                borderColor: isUser ? "primary.dark" : "grey.300",
                lineBreak: "anywhere",
              }}
            >
              <Typography
                variant="body2"
                sx={{
                  lineHeight: 1.5,
                  fontStyle: "italic",
                  fontSize: "0.875rem",
                }}
              >
                {reasoning}
              </Typography>
            </Paper>
          )}

          <Paper
            elevation={1}
            sx={{
              px: 2.5,
              py: 1.5,
              bgcolor: isUser ? "primary.main" : "white",
              color: isUser ? "white" : "text.primary",
              borderRadius: 2,
              // Se c'è reasoning, rimuoviamo il border radius superiore
              borderTopLeftRadius: reasoning ? 0 : isUser ? 2 : 0,
              borderTopRightRadius: reasoning ? 0 : isUser ? 0 : 2,
              borderBottomLeftRadius: isUser ? 2 : 0,
              borderBottomRightRadius: isUser ? 0 : 2,
            }}
          >
            <Typography variant="body1" sx={{ lineHeight: 1.6 }}>
              {content}
            </Typography>
          </Paper>
        </Box>

        {isUser && (
          <Avatar
            sx={{ bgcolor: "secondary.main", width: 36, height: 36, mt: 1 }}
          >
            <Person sx={{ fontSize: 20 }} />
          </Avatar>
        )}
      </Box>
    );
  }
}
