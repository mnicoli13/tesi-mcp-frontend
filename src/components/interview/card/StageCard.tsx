import {
  Chip,
  Stack,
  IconButton,
  Card,
  CardContent,
  Box,
  Typography,
} from "@mui/material";
import { Internship } from "../../../types/interview";
import DeleteIcon from "@mui/icons-material/Delete";

interface StageCardProps {
  internship: Internship;
  handleDeleteInternship: (id: string) => void;
}

const StageCard: React.FC<StageCardProps> = ({
  internship,
  handleDeleteInternship,
}) => {
  return (
    <Card key={internship.id} elevation={2} sx={{ mb: 2 }}>
      <CardContent>
        <Box display="flex" justifyContent="space-between" alignItems="start">
          <Box flex={1}>
            <Typography variant="h6" gutterBottom>
              {internship.role}
            </Typography>
            <Typography variant="subtitle2" color="text.secondary" gutterBottom>
              {internship.company}
            </Typography>
            <Typography
              variant="caption"
              color="text.secondary"
              display="block"
              mb={1}
            >
              {new Date(internship.startDate).toLocaleDateString("it-IT")} -{" "}
              {new Date(internship.endDate).toLocaleDateString("it-IT")}
            </Typography>
            {internship.description && (
              <Typography variant="body2" color="text.secondary" paragraph>
                {internship.description}
              </Typography>
            )}
            {internship.technologies && internship.technologies.length > 0 && (
              <Stack direction="row" spacing={0.5} flexWrap="wrap" mt={1}>
                {internship.technologies.map((tech) => (
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
          <IconButton
            aria-label="delete"
            onClick={() => handleDeleteInternship(internship.id!)}
            color="error"
          >
            <DeleteIcon />
          </IconButton>
        </Box>
      </CardContent>
    </Card>
  );
};

export default StageCard;
