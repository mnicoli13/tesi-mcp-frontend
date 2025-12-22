import {
  Chip,
  IconButton,
  Card,
  CardContent,
  Box,
  Typography,
} from "@mui/material";
import { Education } from "../../../types/interview";
import DeleteIcon from "@mui/icons-material/Delete";

interface EducationCardProps {
  education: Education;
  handleDeleteEducation?: (id: string) => void;
  readOnly?: boolean;
}

const EducationCard: React.FC<EducationCardProps> = ({
  education,
  handleDeleteEducation,
  readOnly = false,
}) => {
  const formatYearRange = () => {
    if (!education.endYear) {
      return `${education.startYear} - In corso`;
    }
    return `${education.startYear} - ${education.endYear}`;
  };

  return (
    <Card key={education.id} elevation={2} sx={{ mb: 2 }}>
      <CardContent>
        <Box display="flex" justifyContent="space-between" alignItems="start">
          <Box flex={1}>
            <Typography variant="h6" gutterBottom>
              {education.degree}
            </Typography>
            <Typography variant="subtitle2" color="text.secondary" gutterBottom>
              {education.institution}
            </Typography>
            <Typography variant="body2" color="text.secondary" gutterBottom>
              {education.fieldOfStudy}
            </Typography>
            <Typography
              variant="caption"
              color="text.secondary"
              display="block"
              mb={1}
            >
              {formatYearRange()}
            </Typography>
            {education.grade && (
              <Chip
                label={`Voto: ${education.grade}`}
                size="small"
                color="success"
                variant="outlined"
                sx={{ mb: 1 }}
              />
            )}
            {education.description && (
              <Typography variant="body2" color="text.secondary" mt={1}>
                {education.description}
              </Typography>
            )}
          </Box>
          {!readOnly && handleDeleteEducation && (
            <IconButton
              aria-label="delete"
              onClick={() => handleDeleteEducation(education.id!)}
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

export default EducationCard;
