import React from "react";
import {
  Card,
  CardContent,
  CardActions,
  Typography,
  Button,
  Box,
  Chip,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Stack,
} from "@mui/material";
import { ExperiencesData } from "../../types/interview";
import EditIcon from "@mui/icons-material/Edit";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useNavigate } from "react-router-dom";
import ProjectCard from "../interview/card/ProjectCard";
import StageCard from "../interview/card/StageCard";
import WorkExperienceCard from "../interview/card/WorkExperienceCard";
import EducationCard from "../interview/card/EducationCard";

interface ExperiencesDisplayCardProps {
  data?: ExperiencesData;
}

const ExperiencesDisplayCard: React.FC<ExperiencesDisplayCardProps> = ({
  data,
}) => {
  const navigate = useNavigate();

  const handleEdit = () => {
    navigate("/interview?step=3", { state: { from: "/profile" } });
  };

  if (!data) {
    return (
      <Card elevation={2}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Esperienze Pratiche
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Non hai ancora aggiunto esperienze.
          </Typography>
        </CardContent>
        <CardActions sx={{ justifyContent: "flex-end", px: 2, pb: 2 }}>
          <Button
            size="small"
            startIcon={<EditIcon />}
            onClick={handleEdit}
            variant="outlined"
          >
            Aggiungi Esperienze
          </Button>
        </CardActions>
      </Card>
    );
  }

  const hasUniversityProjects = data.universityProjects?.length > 0;
  const hasPersonalProjects = data.personalProjects?.length > 0;
  const hasInternships = data.internships?.length > 0;
  const hasWorkExperiences = data.workExperiences?.length > 0;
  const hasEducation = data.education?.length > 0;

  const hasAnyExperience =
    hasUniversityProjects ||
    hasPersonalProjects ||
    hasInternships ||
    hasWorkExperiences ||
    hasEducation;

  if (!hasAnyExperience) {
    return (
      <Card elevation={2}>
        <CardContent>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="start"
            mb={2}
          >
            <Typography variant="h6" fontWeight={600}>
              Esperienze Pratiche
            </Typography>
            <Chip
              label="Step 4"
              color="primary"
              variant="outlined"
              sx={{ px: 2 }}
            />
          </Box>
          <Typography variant="body2" color="text.secondary">
            Non hai ancora aggiunto esperienze.
          </Typography>
        </CardContent>
        <CardActions sx={{ justifyContent: "flex-end", px: 2, pb: 2 }}>
          <Button
            size="small"
            startIcon={<EditIcon />}
            onClick={handleEdit}
            variant="outlined"
          >
            Aggiungi Esperienze
          </Button>
        </CardActions>
      </Card>
    );
  }

  return (
    <Card elevation={2}>
      <CardContent>
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="start"
          mb={2}
        >
          <Typography variant="h6" fontWeight={600}>
            Esperienze Pratiche
          </Typography>
          <Chip
            label="Step 4"
            color="primary"
            variant="outlined"
            sx={{ px: 2 }}
          />
        </Box>

        <Stack spacing={2}>
          {/* University Projects */}
          {hasUniversityProjects && (
            <Accordion>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography variant="subtitle1" fontWeight={600}>
                  Progetti Universitari ({data.universityProjects.length})
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Stack spacing={2}>
                  {data.universityProjects.map((project) => (
                    <ProjectCard
                      key={project.id}
                      project={project}
                      type="university"
                      readOnly={true}
                    />
                  ))}
                </Stack>
              </AccordionDetails>
            </Accordion>
          )}

          {/* Personal Projects */}
          {hasPersonalProjects && (
            <Accordion>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography variant="subtitle1" fontWeight={600}>
                  Progetti Personali ({data.personalProjects.length})
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Stack spacing={2}>
                  {data.personalProjects.map((project) => (
                    <ProjectCard
                      key={project.id}
                      project={project}
                      type="personal"
                      readOnly={true}
                    />
                  ))}
                </Stack>
              </AccordionDetails>
            </Accordion>
          )}

          {/* Internships */}
          {hasInternships && (
            <Accordion>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography variant="subtitle1" fontWeight={600}>
                  Stage ({data.internships.length})
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Stack spacing={2}>
                  {data.internships.map((internship) => (
                    <StageCard
                      key={internship.id}
                      internship={internship}
                      readOnly={true}
                    />
                  ))}
                </Stack>
              </AccordionDetails>
            </Accordion>
          )}

          {/* Work Experiences */}
          {hasWorkExperiences && (
            <Accordion>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography variant="subtitle1" fontWeight={600}>
                  Esperienze Lavorative ({data.workExperiences.length})
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Stack spacing={2}>
                  {data.workExperiences.map((experience) => (
                    <WorkExperienceCard
                      key={experience.id}
                      workExperience={experience}
                      readOnly={true}
                    />
                  ))}
                </Stack>
              </AccordionDetails>
            </Accordion>
          )}

          {/* Education */}
          {hasEducation && (
            <Accordion>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography variant="subtitle1" fontWeight={600}>
                  Formazione ({data.education.length})
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Stack spacing={2}>
                  {data.education.map((edu) => (
                    <EducationCard
                      key={edu.id}
                      education={edu}
                      readOnly={true}
                    />
                  ))}
                </Stack>
              </AccordionDetails>
            </Accordion>
          )}
        </Stack>
      </CardContent>
      <CardActions sx={{ justifyContent: "flex-end", px: 2, pb: 2 }}>
        <Button
          startIcon={<EditIcon />}
          onClick={handleEdit}
          variant="contained"
        >
          Modifica
        </Button>
      </CardActions>
    </Card>
  );
};

export default ExperiencesDisplayCard;
