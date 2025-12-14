import {
  Box,
  Card,
  CardContent,
  Typography,
  Stack,
  Chip,
  Paper,
  Link,
} from "@mui/material";
import {
  WorkOutline,
  LocationOn,
  Business,
  AttachMoney,
  CalendarToday,
  Launch,
} from "@mui/icons-material";

type Job = {
  title: string;
  company: string;
  location: string;
  remote: boolean;
  url: string;
  description: string;
  salary_range?: string;
  posted_date: string;
  source: string;
};

type JobResultsCardProps = {
  jobsData: { jobs: Job[]; total_found: number };
};

const gradients = [
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

export default function JobResultsCard({ jobsData }: JobResultsCardProps) {
  const { jobs, total_found } = jobsData;

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("it-IT", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

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
        <Stack direction="row" spacing={1.5} alignItems="center" mb={1}>
          <WorkOutline sx={{ fontSize: 28 }} />
          <Typography variant="h6" fontWeight="bold">
            Offerte di Lavoro
          </Typography>
        </Stack>
        <Typography variant="body2" sx={{ mb: 3, opacity: 0.9 }}>
          Trovate {total_found} {total_found === 1 ? "offerta" : "offerte"}
        </Typography>

        {/* Jobs */}
        <Box>
          <Stack spacing={2}>
            {jobs.map((job, index) => (
              <Paper
                key={index}
                elevation={2}
                sx={{
                  p: 2.5,
                  borderRadius: 2,
                  background: gradients[index % gradients.length],
                  color: "white",
                  transition: "transform 0.2s ease-in-out, box-shadow 0.2s",
                  "&:hover": {
                    transform: "translateY(-4px)",
                    boxShadow: 6,
                  },
                }}
              >
                {/* Job Title and Company */}
                <Stack spacing={1} mb={2}>
                  <Typography variant="h6" fontWeight="bold">
                    {job.title}
                  </Typography>
                  <Stack direction="row" spacing={1} alignItems="center">
                    <Business sx={{ fontSize: 18 }} />
                    <Typography variant="body2" fontWeight="medium">
                      {job.company}
                    </Typography>
                  </Stack>
                </Stack>

                {/* Job Details */}
                <Stack spacing={1} mb={2}>
                  <Stack direction="row" spacing={1} alignItems="center">
                    <LocationOn sx={{ fontSize: 18 }} />
                    <Typography variant="body2">{job.location}</Typography>
                    {job.remote && (
                      <Chip
                        label="Remoto"
                        size="small"
                        sx={{
                          bgcolor: "rgba(255, 255, 255, 0.3)",
                          color: "white",
                          fontWeight: "bold",
                          fontSize: "0.7rem",
                        }}
                      />
                    )}
                  </Stack>

                  {job.salary_range && (
                    <Stack direction="row" spacing={1} alignItems="center">
                      <AttachMoney sx={{ fontSize: 18 }} />
                      <Typography variant="body2">
                        €{job.salary_range.replace("-", " - €")}
                      </Typography>
                    </Stack>
                  )}

                  <Stack direction="row" spacing={1} alignItems="center">
                    <CalendarToday sx={{ fontSize: 18 }} />
                    <Typography variant="body2">
                      Pubblicato il {formatDate(job.posted_date)}
                    </Typography>
                  </Stack>
                </Stack>

                {/* Description */}
                <Typography
                  variant="body2"
                  sx={{
                    mb: 2,
                    lineHeight: 1.6,
                    opacity: 0.95,
                    display: "-webkit-box",
                    WebkitLineClamp: 3,
                    WebkitBoxOrient: "vertical",
                    overflow: "hidden",
                  }}
                >
                  {job.description}
                </Typography>

                {/* Link to job */}
                <Link
                  href={job.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  sx={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 0.5,
                    color: "white",
                    fontWeight: "bold",
                    textDecoration: "none",
                    "&:hover": {
                      textDecoration: "underline",
                    },
                  }}
                >
                  Vedi offerta <Launch sx={{ fontSize: 16 }} />
                </Link>
              </Paper>
            ))}
          </Stack>
        </Box>
      </CardContent>
    </Card>
  );
}
