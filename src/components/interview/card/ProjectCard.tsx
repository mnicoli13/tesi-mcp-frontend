import {
  Chip,
  Stack,
  IconButton,
  Card,
  CardContent,
  Box,
  Typography,
} from "@mui/material";
import { Project } from "../../../types/interview";
import GitHubIcon from "@mui/icons-material/GitHub";
import DeleteIcon from "@mui/icons-material/Delete";

interface ProjectCardProps {
  project: Project;
  type: "university" | "personal";
  handleDeleteProject?: (id: string, type: "university" | "personal") => void;
  readOnly?: boolean;
}

const ProjectCard: React.FC<ProjectCardProps> = ({
  project,
  type,
  handleDeleteProject,
  readOnly = false,
}) => {
  return (
    <Card key={project.id} elevation={2} sx={{ mb: 2 }}>
      <CardContent>
        <Box display="flex" justifyContent="space-between" alignItems="start">
          <Box flex={1}>
            <Typography variant="h6" gutterBottom>
              {project.name}
            </Typography>
            <Typography variant="body2" color="text.secondary" paragraph>
              {project.description}
            </Typography>
            {project.githubLink && (
              <Box display="flex" alignItems="center" gap={0.5} mb={1}>
                <GitHubIcon fontSize="small" />
                <Typography
                  variant="caption"
                  component="a"
                  href={project.githubLink}
                  target="_blank"
                  sx={{ textDecoration: "none", color: "primary.main" }}
                >
                  {project.githubLink}
                </Typography>
              </Box>
            )}
            {project.technologies && project.technologies.length > 0 && (
              <Stack direction="row" spacing={0.5} flexWrap="wrap" mt={1}>
                {project.technologies.map((tech) => (
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
          {!readOnly && handleDeleteProject && (
            <IconButton
              aria-label="delete"
              onClick={() => handleDeleteProject(project.id!, type)}
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

export default ProjectCard;
