import { Avatar, Box, Paper, Stack, Typography } from "@mui/material";
import EuropassCVCard from "./EuropassCVCard";
import SkillsAnalysisCard from "./SkillsAnalysisCard";
import CareerRolesCard from "./CareerRolesCard";
import JobResultsCard from "./JobResultsCard";
import { ToolResult } from "../../types/message";
import HandymanOutlinedIcon from "@mui/icons-material/HandymanOutlined";

export const ToolResults = ({
  toolResults,
}: {
  toolResults: ToolResult[] | undefined;
}) => {
  if (toolResults) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-start",
          gap: 1.5,
        }}
      >
        <Avatar sx={{ bgcolor: "primary.main", width: 36, height: 36, mt: 3 }}>
          <HandymanOutlinedIcon sx={{ fontSize: 20 }} />
        </Avatar>
        <Stack spacing={1}>
          {toolResults.map((toolResult, j) => {
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
                  return <SkillsAnalysisCard key={j} skills={skillsData} />;
                }
              } catch (error) {
                console.error("Failed to parse skills data:", error);
              }
            }

            // Check if this is a Career Roles result
            if (toolResult.name === "suggest_career_job_roles") {
              try {
                const content = toolResult.result?.content;
                if (Array.isArray(content) && content[0]?.text) {
                  const careerData = JSON.parse(content[0].text);
                  return <CareerRolesCard key={j} careerData={careerData} />;
                }
              } catch (error) {
                console.error("Failed to parse career data:", error);
              }
            }

            // Check if this is a Job Search result
            if (toolResult.name === "find_jobs") {
              try {
                const content = toolResult.result?.content;
                if (Array.isArray(content) && content[0]?.text) {
                  const jobsData = JSON.parse(content[0].text);
                  return <JobResultsCard key={j} jobsData={jobsData} />;
                }
              } catch (error) {
                console.error("Failed to parse job data:", error);
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
      </Box>
    );
  }
};
