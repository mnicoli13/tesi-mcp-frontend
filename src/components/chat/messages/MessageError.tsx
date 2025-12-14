import { Box, Paper, Avatar } from "@mui/material";
import { SmartToy } from "@mui/icons-material";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

type MessageErrorProps = {
  content?: string;
};

export default function MessageError({ content }: MessageErrorProps) {
  if (content) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-start",
          gap: 1.5,
        }}
      >
        <Avatar sx={{ bgcolor: "error.main", width: 36, height: 36, mt: 1 }}>
          <SmartToy sx={{ fontSize: 20 }} />
        </Avatar>

        <Box sx={{ maxWidth: "70%" }}>
          <Paper
            elevation={1}
            sx={{
              px: 2.5,
              py: 0.5,
              bgcolor: "white",
              color: "text.primary",
              borderRadius: 2,
              borderTopLeftRadius: 0,
              borderTopRightRadius: 2,
              borderBottomLeftRadius: 0,
              borderBottomRightRadius: 2,
              backgroundColor: "error.light",
            }}
          >
            <Box
              sx={{
                lineHeight: 1.6,
                wordBreak: "break-word",
                color: "white",
              }}
            >
              <ReactMarkdown remarkPlugins={[remarkGfm]}>
                {content || ""}
              </ReactMarkdown>
            </Box>
          </Paper>
        </Box>
      </Box>
    );
  }
}
