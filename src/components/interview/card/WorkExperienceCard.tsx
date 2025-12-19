import {
  Chip,
  Stack,
  IconButton,
  Card,
  CardContent,
  Box,
  Typography,
} from "@mui/material";
import { WorkExperience } from "../../../types/interview";
import DeleteIcon from "@mui/icons-material/Delete";

interface WorkExperienceCardProps {
  workExperience: WorkExperience;
  handleDeleteWorkExperience?: (id: string) => void;
  readOnly?: boolean;
}

const CONTRACT_TYPE_LABELS = {
  permanent: "Tempo Indeterminato",
  "fixed-term": "Tempo Determinato",
  freelance: "Freelance",
};

const WorkExperienceCard: React.FC<WorkExperienceCardProps> = ({
  workExperience,
  handleDeleteWorkExperience,
  readOnly = false,
}) => {
  const formatDate = (dateStr: string) => {
    if (dateStr === "present") return "Presente";
    return new Date(dateStr).toLocaleDateString("it-IT");
  };

  return (
    <Card key={workExperience.id} elevation={2} sx={{ mb: 2 }}>
      <CardContent>
        <Box display="flex" justifyContent="space-between" alignItems="start">
          <Box flex={1}>
            <Box display="flex" alignItems="center" gap={1} mb={1}>
              <Typography variant="h6">{workExperience.role}</Typography>
              <Chip
                label={CONTRACT_TYPE_LABELS[workExperience.contractType]}
                size="small"
                color="primary"
                variant="outlined"
              />
            </Box>
            <Typography variant="subtitle2" color="text.secondary" gutterBottom>
              {workExperience.company}
            </Typography>
            <Typography
              variant="caption"
              color="text.secondary"
              display="block"
              mb={1}
            >
              {formatDate(workExperience.startDate)} -{" "}
              {formatDate(workExperience.endDate)}
            </Typography>
            {workExperience.description && (
              <Typography variant="body2" color="text.secondary" paragraph>
                {workExperience.description}
              </Typography>
            )}
            {workExperience.technologies &&
              workExperience.technologies.length > 0 && (
                <Stack direction="row" spacing={0.5} flexWrap="wrap" mt={1}>
                  {workExperience.technologies.map((tech) => (
                    <Chip
                      key={tech}
                      label={tech}
                      size="small"
                      variant="outlined"
                      color="secondary"
                    />
                  ))}
                </Stack>
              )}
          </Box>
          {!readOnly && handleDeleteWorkExperience && (
            <IconButton
              aria-label="delete"
              onClick={() => handleDeleteWorkExperience(workExperience.id!)}
              color="error"
            >
              <DeleteIcon />
            </IconButton>
          )}
        </Box>
      </CardContent>
    </Card>
  );
};

export default WorkExperienceCard;
