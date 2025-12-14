import { WorkOutline } from "@mui/icons-material";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Grid,
  LinearProgress,
  Stack,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { getGradients } from "../../../utils/gradients";

type Skill = {
  name: string;
  accuracy: number;
  description: string;
};

type SkillsAnalysisCardProps = {
  skills: { skills: Skill[] };
};

export default function SkillsAnalysisCard({
  skills,
}: SkillsAnalysisCardProps) {
  const theme = useTheme();
  const skillList = skills.skills || [];
  const gradients = getGradients(theme);

  return (
    <Card
      elevation={3}
      sx={{
        borderRadius: 3,
        overflow: "hidden",
        background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, transparent 100%)`,
      }}
    >
      <CardContent sx={{ p: 3 }}>
        {/* Header */}
        <Stack direction="row" spacing={1.5} alignItems="center" mb={3}>
          <WorkOutline sx={{ fontSize: 28 }} />
          <Typography variant="h6" fontWeight="bold">
            Skills Analysis
          </Typography>
        </Stack>
        <Box>
          <Grid container spacing={2}>
            {skillList.map((skill, index) => {
              const gradient = gradients[index % gradients.length];

              return (
                <Grid size={{ xs: 12, sm: 6, md: 4 }} key={index}>
                  <Card
                    elevation={3}
                    sx={{
                      height: "100%",
                      background: gradient,
                      transition: "transform 0.2s",
                      "&:hover": {
                        transform: "translateY(-4px)",
                        boxShadow: 6,
                      },
                    }}
                  >
                    <CardContent
                      sx={{
                        height: "100%",
                        display: "flex",
                        flexDirection: "column",
                      }}
                    >
                      <Typography
                        variant="subtitle1"
                        fontWeight="bold"
                        sx={{
                          mb: 1,
                          lineHeight: 1.2,
                        }}
                      >
                        {skill.name}
                      </Typography>

                      <Box
                        sx={{ display: "flex", alignItems: "center", mb: 1.5 }}
                      >
                        <Box sx={{ width: "100%", mr: 1 }}>
                          <LinearProgress
                            variant="determinate"
                            value={skill.accuracy}
                            sx={{
                              height: 8,
                              borderRadius: 5,
                              backgroundColor: "rgba(255,255,255,0.4)",
                              "& .MuiLinearProgress-bar": {
                                backgroundColor: "rgba(0,0,0,0.6)",
                              },
                            }}
                          />
                        </Box>
                        <Box sx={{ minWidth: 35 }}>
                          <Typography
                            variant="body2"
                            color="text.secondary"
                            fontWeight="medium"
                          >
                            {Math.round(skill.accuracy)}%
                          </Typography>
                        </Box>
                      </Box>

                      <Typography
                        variant="body2"
                        sx={{
                          display: "-webkit-box",
                          WebkitLineClamp: 3,
                          WebkitBoxOrient: "vertical",
                          overflow: "hidden",
                          fontSize: "0.8rem",
                          lineHeight: 1.4,
                        }}
                      >
                        {skill.description}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              );
            })}
          </Grid>
        </Box>
      </CardContent>
    </Card>
  );
}
