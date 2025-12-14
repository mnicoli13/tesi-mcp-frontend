import {
  Box,
  Card,
  CardContent,
  Typography,
  Stack,
  LinearProgress,
  Paper,
} from "@mui/material";
import { WorkOutline, TrendingUp } from "@mui/icons-material";
import { SuggestCareerOutput } from "../../../types/mcp";

interface CareerRolesCardProps {
  careerData: SuggestCareerOutput;
}

export default function CareerRolesCard({ careerData }: CareerRolesCardProps) {
  const { roles } = careerData;

  // Define gradient colors for roles
  const gradientColors = [
    "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
    "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
    "linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)",
    "linear-gradient(135deg, #fa709a 0%, #fee140 100%)",
    "linear-gradient(135deg, #30cfd0 0%, #330867 100%)",
    "linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)",
    "linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)",
    "linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)",
    "linear-gradient(135deg, #ff6e7f 0%, #bfe9ff 100%)",
  ];

  return (
    <Card
      elevation={3}
      sx={{
        borderRadius: 3,
        overflow: "hidden",
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        color: "white",
      }}
    >
      <CardContent sx={{ p: 3 }}>
        {/* Header */}
        <Stack direction="row" spacing={1.5} alignItems="center" mb={3}>
          <WorkOutline sx={{ fontSize: 28 }} />
          <Typography variant="h6" fontWeight="bold">
            Percorsi di Carriera Suggeriti
          </Typography>
        </Stack>

        {/* Roles */}
        <Box>
          <Stack spacing={2}>
            {roles.map((role, index) => (
              <Paper
                key={index}
                elevation={0}
                sx={{
                  p: 2.5,
                  borderRadius: 2,
                  background: gradientColors[index % gradientColors.length],
                  color: "white",
                  transition: "transform 0.2s ease-in-out",
                  "&:hover": {
                    transform: "translateX(4px)",
                  },
                }}
              >
                {/* Role Header */}
                <Stack
                  direction="row"
                  justifyContent="space-between"
                  alignItems="center"
                  mb={1.5}
                >
                  <Typography variant="h6" fontWeight="bold">
                    {role.name}
                  </Typography>
                  <Stack direction="row" spacing={0.5} alignItems="center">
                    <TrendingUp sx={{ fontSize: 18 }} />
                    <Typography variant="body2" fontWeight="bold">
                      {role.accuracy.toFixed(2)}%
                    </Typography>
                  </Stack>
                </Stack>

                {/* Match Score Progress Bar */}
                <LinearProgress
                  variant="determinate"
                  value={role.accuracy}
                  sx={{
                    height: 6,
                    borderRadius: 3,
                    mb: 1.5,
                    bgcolor: "rgba(255, 255, 255, 0.3)",
                    "& .MuiLinearProgress-bar": {
                      bgcolor: "rgba(255, 255, 255, 0.9)",
                      borderRadius: 3,
                    },
                  }}
                />

                {/* Reason */}
                <Typography
                  variant="body2"
                  sx={{
                    lineHeight: 1.6,
                    opacity: 0.95,
                  }}
                >
                  {role.description}
                </Typography>
              </Paper>
            ))}
          </Stack>
        </Box>
      </CardContent>
    </Card>
  );
}
