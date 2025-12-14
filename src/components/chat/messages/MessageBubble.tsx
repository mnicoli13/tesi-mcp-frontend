import { Box, Paper, Avatar, Typography } from "@mui/material";
import { SmartToy, Person } from "@mui/icons-material";
import { RoleType } from "../../../types/message";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

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
            <Box
              sx={{
                lineHeight: 1.6,
                wordBreak: "break-word",
                "& p": { margin: "0.5em 0" },
                "& p:first-of-type": { marginTop: 0 },
                "& p:last-of-type": { marginBottom: 0 },
                "& h1": {
                  fontSize: "1.75em",
                  marginTop: "0.8em",
                  marginBottom: "0.5em",
                  fontWeight: 700,
                  borderBottom: `2px solid ${
                    isUser ? "rgba(255, 255, 255, 0.3)" : "divider"
                  }`,
                  paddingBottom: "0.3em",
                },
                "& h2": {
                  fontSize: "1.5em",
                  marginTop: "0.8em",
                  marginBottom: "0.5em",
                  fontWeight: 600,
                  borderBottom: `1px solid ${
                    isUser ? "rgba(255, 255, 255, 0.2)" : "divider"
                  }`,
                  paddingBottom: "0.3em",
                },
                "& h3": {
                  fontSize: "1.25em",
                  marginTop: "0.8em",
                  marginBottom: "0.5em",
                  fontWeight: 600,
                },
                "& h4, & h5, & h6": {
                  marginTop: "0.8em",
                  marginBottom: "0.5em",
                  fontWeight: 600,
                },
                "& h1:first-of-type, & h2:first-of-type, & h3:first-of-type": {
                  marginTop: 0,
                },
                "& ul, & ol": {
                  marginLeft: "1.5em",
                  marginTop: "0.5em",
                  marginBottom: "0.5em",
                  paddingLeft: "0.5em",
                },
                "& li": {
                  marginBottom: "0.25em",
                  lineHeight: 1.6,
                },
                "& li > p": {
                  margin: "0.25em 0",
                },
                "& code": {
                  backgroundColor: isUser
                    ? "rgba(0, 0, 0, 0.2)"
                    : "rgba(0, 0, 0, 0.05)",
                  padding: "0.2em 0.4em",
                  borderRadius: "3px",
                  fontSize: "0.9em",
                  fontFamily: "monospace",
                  whiteSpace: "pre-wrap",
                  wordBreak: "break-word",
                },
                "& pre": {
                  backgroundColor: isUser
                    ? "rgba(0, 0, 0, 0.2)"
                    : "rgba(0, 0, 0, 0.05)",
                  padding: "1em",
                  borderRadius: "5px",
                  overflow: "auto",
                  marginTop: "0.5em",
                  marginBottom: "0.5em",
                },
                "& pre code": {
                  backgroundColor: "transparent",
                  padding: 0,
                  display: "block",
                  whiteSpace: "pre",
                },
                "& blockquote": {
                  borderLeft: `4px solid ${
                    isUser ? "rgba(255, 255, 255, 0.5)" : "#ddd"
                  }`,
                  paddingLeft: "1em",
                  marginLeft: 0,
                  marginRight: 0,
                  marginTop: "0.5em",
                  marginBottom: "0.5em",
                  fontStyle: "italic",
                  color: isUser
                    ? "rgba(255, 255, 255, 0.85)"
                    : "text.secondary",
                },
                "& a": {
                  color: isUser ? "rgba(255, 255, 255, 0.9)" : "primary.main",
                  textDecoration: "underline",
                  "&:hover": {
                    opacity: 0.8,
                  },
                },
                "& hr": {
                  border: "none",
                  borderTop: `2px solid ${
                    isUser ? "rgba(255, 255, 255, 0.3)" : "divider"
                  }`,
                  margin: "1em 0",
                },
                "& table": {
                  borderCollapse: "collapse",
                  width: "100%",
                  marginTop: "0.5em",
                  marginBottom: "0.5em",
                  fontSize: "0.9em",
                },
                "& th, & td": {
                  border: `1px solid ${
                    isUser ? "rgba(255, 255, 255, 0.3)" : "#ddd"
                  }`,
                  padding: "0.5em 0.75em",
                  textAlign: "left",
                },
                "& th": {
                  backgroundColor: isUser
                    ? "rgba(0, 0, 0, 0.2)"
                    : "rgba(0, 0, 0, 0.05)",
                  fontWeight: 600,
                },
                "& tr:nth-of-type(even)": {
                  backgroundColor: isUser
                    ? "rgba(0, 0, 0, 0.1)"
                    : "rgba(0, 0, 0, 0.02)",
                },
                "& img": {
                  maxWidth: "100%",
                  height: "auto",
                  borderRadius: "4px",
                  marginTop: "0.5em",
                  marginBottom: "0.5em",
                },
                "& strong": {
                  fontWeight: 600,
                },
                "& em": {
                  fontStyle: "italic",
                },
              }}
            >
              <ReactMarkdown remarkPlugins={[remarkGfm]}>
                {content || ""}
              </ReactMarkdown>
            </Box>
          </Paper>
        </Box>

        {isUser && (
          <Avatar
            sx={{ bgcolor: "primary.main", width: 36, height: 36, mt: 1 }}
          >
            <Person sx={{ fontSize: 20 }} />
          </Avatar>
        )}
      </Box>
    );
  }
}
