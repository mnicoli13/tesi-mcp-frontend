import {
  Box,
  Stack,
  Fade,
  Avatar,
  Paper,
  CircularProgress,
  Typography,
} from "@mui/material";
import { SmartToy } from "@mui/icons-material";
import MessageBubble from "./MessageBubble";
import { Message } from "../../types/message";
import EuropassCVCard from "./EuropassCVCard";
import SkillsAnalysisCard from "./SkillsAnalysisCard";

type ChatMessagesProps = {
  messages: Message[];
  loading: boolean;
  messagesEndRef: any;
};

export default function ChatMessages({
  messages,
  loading,
  messagesEndRef,
}: ChatMessagesProps) {
  return (
    <Box
      sx={{
        flex: 1,
        overflow: "auto",
        p: 3,
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
            <div>
              <MessageBubble message={m} loading={loading} />
              {m.toolResults && (
                <Stack spacing={1} sx={{ mt: 2, ml: 6 }}>
                  {m.toolResults.map((toolResult, j) => {
                    // Check if this is a CV Europass result
                    if (toolResult.name === "generate_cv_europass") {
                      try {
                        // Parse the nested JSON structure
                        const content = toolResult.result?.content;
                        if (Array.isArray(content) && content[0]?.text) {
                          const cvData = JSON.parse(content[0].text);
                          return <EuropassCVCard key={j} cvData={cvData} />;
                        }
                      } catch (error) {
                        console.error("Failed to parse CV data:", error);
                      }
                    }

                    // Check if this is a Skills Analysis result
                    if (toolResult.name === "extract_skills_from_profile") {
                      try {
                        const content = toolResult.result?.content;
                        if (Array.isArray(content) && content[0]?.text) {
                          const skillsData = JSON.parse(content[0].text);
                          return (
                            <SkillsAnalysisCard key={j} skills={skillsData} />
                          );
                        }
                      } catch (error) {
                        console.error("Failed to parse skills data:", error);
                      }
                    }

                    // Default rendering for other tools
                    return (
                      <Paper
                        key={j}
                        elevation={1}
                        sx={{
                          px: 2.5,
                          py: 1.5,
                          bgcolor: "grey.50",
                          borderRadius: 2,
                          borderTopLeftRadius: 0,
                          borderLeft: 3,
                          borderColor: "primary.main",
                        }}
                      >
                        <Typography
                          variant="caption"
                          fontWeight="bold"
                          color="primary.main"
                          display="block"
                          mb={0.5}
                        >
                          🔧 {toolResult.name}
                        </Typography>
                        <Typography
                          variant="body2"
                          color="text.secondary"
                          sx={{
                            whiteSpace: "pre-wrap",
                            wordBreak: "break-word",
                            fontFamily: "monospace",
                            fontSize: "0.85rem",
                          }}
                        >
                          {typeof toolResult.result === "object"
                            ? JSON.stringify(toolResult.result, null, 2)
                            : toolResult.result}
                        </Typography>
                      </Paper>
                    );
                  })}
                </Stack>
              )}
            </div>
          </Fade>
        ))}

        <div ref={messagesEndRef} />
      </Stack>
    </Box>
  );
}
