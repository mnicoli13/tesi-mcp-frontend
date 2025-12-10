import {
  Box,
  Card,
  CardContent,
  Typography,
  Grid,
  LinearProgress,
} from "@mui/material";

type Skill = {
  name: string;
  accuracy: number;
  description: string;
};

type SkillsAnalysisCardProps = {
  skills: { skills: Skill[] };
};

const gradients = [
  "linear-gradient(135deg, #FF9A9E 0%, #FECFEF 100%)",
  "linear-gradient(135deg, #a18cd1 0%, #fbc2eb 100%)",
  "linear-gradient(135deg, #fad0c4 0%, #ffd1ff 100%)",
  "linear-gradient(135deg, #ff9a9e 0%, #fecfef 99%, #fecfef 100%)",
  "linear-gradient(135deg, #fbc2eb 0%, #a6c1ee 100%)",
  "linear-gradient(135deg, #84fab0 0%, #8fd3f4 100%)",
  "linear-gradient(135deg, #a1c4fd 0%, #c2e9fb 100%)",
  "linear-gradient(120deg, #e0c3fc 0%, #8ec5fc 100%)",
  "linear-gradient(120deg, #f093fb 0%, #f5576c 100%)",
  "linear-gradient(120deg, #89f7fe 0%, #66a6ff 100%)",
  "linear-gradient(120deg, #abecd6 0%, #fbed96 100%)",
  "linear-gradient(120deg, #f6d365 0%, #fda085 100%)",
  "linear-gradient(120deg, #d4fc79 0%, #96e6a1 100%)",
  "linear-gradient(120deg, #4facfe 0%, #00f2fe 100%)",
  "linear-gradient(120deg, #43e97b 0%, #38f9d7 100%)",
];

export default function SkillsAnalysisCard({
  skills,
}: SkillsAnalysisCardProps) {
  const skillList = skills.skills || [];

  return (
    <Box sx={{ width: "100%", mt: 2 }}>
      <Typography
        variant="h6"
        gutterBottom
        sx={{ fontWeight: 600, color: "text.primary", mb: 3 }}
      >
        Skills Analysis
      </Typography>
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
                    sx={{ color: "rgba(0,0,0,0.8)", mb: 1, lineHeight: 1.2 }}
                  >
                    {skill.name}
                  </Typography>

                  <Box sx={{ display: "flex", alignItems: "center", mb: 1.5 }}>
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
                      color: "rgba(0,0,0,0.7)",
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
  );
}
