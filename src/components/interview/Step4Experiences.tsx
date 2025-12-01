import React, { useState } from "react";
import {
  Box,
  Button,
  Typography,
  Alert,
  Stack,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import SchoolIcon from "@mui/icons-material/School";
import CodeIcon from "@mui/icons-material/Code";
import WorkIcon from "@mui/icons-material/Work";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { ExperiencesData, Project, Internship } from "../../types/interview";
import {
  projectSchema,
  internshipSchema,
} from "../../schemas/interviewSchemas";
import {
  FRAMEWORKS_AND_TOOLS,
  PROGRAMMING_LANGUAGES,
} from "../../constants/interviewConstants";
import { v4 as uuidv4 } from "uuid";
import AddProjectDialog from "./dialog/AddProjectDialog";
import AddStageDialog from "./dialog/AddStageDialog";
import ProjectCard from "./card/ProjectCard";
import StageCard from "./card/StageCard";

interface Step4ExperiencesProps {
  initialData?: ExperiencesData;
  onSave: (data: ExperiencesData) => void;
}

export type DialogType = "university" | "personal" | "internship" | null;

const Step4Experiences: React.FC<Step4ExperiencesProps> = ({
  initialData,
  onSave,
}) => {
  const [experiencesData, setExperiencesData] = useState<ExperiencesData>(
    initialData || {
      universityProjects: [],
      personalProjects: [],
      internships: [],
    }
  );

  const [openDialog, setOpenDialog] = useState<DialogType>(null);

  const allTechnologies = [
    ...new Set([...PROGRAMMING_LANGUAGES, ...FRAMEWORKS_AND_TOOLS]),
  ];

  // Project form
  const {
    handleSubmit: handleSubmitProject,
    reset: resetProject,
    control: controlProject,
    formState: { errors: errorsProject },
  } = useForm<Omit<Project, "id">>({
    resolver: yupResolver(projectSchema) as any,
    mode: "onChange",
    defaultValues: {
      name: "",
      description: "",
      technologies: [],
      githubLink: "",
      type: "university",
    },
  });

  // Internship form
  const {
    handleSubmit: handleSubmitInternship,
    reset: resetInternship,
    control: controlInternship,
    formState: { errors: errorsInternship },
  } = useForm<Omit<Internship, "id">>({
    resolver: yupResolver(internshipSchema) as any,
    mode: "onChange",
    defaultValues: {
      company: "",
      role: "",
      startDate: "",
      endDate: "",
      description: "",
      technologies: [],
    },
  });

  const onSubmitProject = (values: Omit<Project, "id">) => {
    const newProject: Project = {
      id: uuidv4(),
      ...values,
      type: openDialog === "university" ? "university" : "personal",
    };

    const updatedData =
      openDialog === "university"
        ? {
            ...experiencesData,
            universityProjects: [
              ...experiencesData.universityProjects,
              newProject,
            ],
          }
        : {
            ...experiencesData,
            personalProjects: [...experiencesData.personalProjects, newProject],
          };

    setExperiencesData(updatedData);
    onSave(updatedData);
    resetProject();
    setOpenDialog(null);
  };

  const onSubmitInternship = (values: Omit<Internship, "id">) => {
    const newInternship: Internship = {
      id: uuidv4(),
      ...values,
    };

    const updatedData = {
      ...experiencesData,
      internships: [...experiencesData.internships, newInternship],
    };

    setExperiencesData(updatedData);
    onSave(updatedData);
    resetInternship();
    setOpenDialog(null);
  };

  const handleDeleteProject = (id: string, type: "university" | "personal") => {
    const updatedData =
      type === "university"
        ? {
            ...experiencesData,
            universityProjects: experiencesData.universityProjects.filter(
              (p) => p.id !== id
            ),
          }
        : {
            ...experiencesData,
            personalProjects: experiencesData.personalProjects.filter(
              (p) => p.id !== id
            ),
          };

    setExperiencesData(updatedData);
    onSave(updatedData);
  };

  const handleDeleteInternship = (id: string) => {
    const updatedData = {
      ...experiencesData,
      internships: experiencesData.internships.filter((i) => i.id !== id),
    };

    setExperiencesData(updatedData);
    onSave(updatedData);
  };

  return (
    <Box>
      <Typography variant="h5" gutterBottom fontWeight={600}>
        Esperienze Pratiche
      </Typography>
      <Typography variant="body2" color="text.secondary" mb={3}>
        Condividi i tuoi progetti e le tue esperienze lavorative. Queste
        informazioni arricchiscono il tuo profilo e ci aiutano a valutare meglio
        le tue competenze pratiche.
      </Typography>

      <Alert severity="info" sx={{ mb: 3 }}>
        <strong>Nota:</strong> Anche esperienze brevi o progetti personali sono
        importanti! Ci aiutano a capire le tue soft skill e le tecnologie che
        hai utilizzato.
      </Alert>

      <Stack spacing={2}>
        {/* Progetti Universitari */}
        <Accordion defaultExpanded elevation={2}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Box display="flex" alignItems="center" gap={1}>
              <SchoolIcon color="primary" />
              <Typography variant="h6">
                Progetti Universitari (
                {experiencesData.universityProjects.length})
              </Typography>
            </Box>
          </AccordionSummary>
          <AccordionDetails>
            <Box>
              {experiencesData.universityProjects.map((project) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  type="university"
                  handleDeleteProject={handleDeleteProject}
                />
              ))}
              <Button
                variant="outlined"
                color="primary"
                startIcon={<AddIcon />}
                onClick={() => setOpenDialog("university")}
                fullWidth
              >
                Aggiungi Progetto Universitario
              </Button>
            </Box>
          </AccordionDetails>
        </Accordion>

        {/* Progetti Personali */}
        <Accordion elevation={2}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Box display="flex" alignItems="center" gap={1}>
              <CodeIcon color="primary" />
              <Typography variant="h6">
                Progetti Personali ({experiencesData.personalProjects.length})
              </Typography>
            </Box>
          </AccordionSummary>
          <AccordionDetails>
            <Box>
              {experiencesData.personalProjects.map((project) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  type="personal"
                  handleDeleteProject={handleDeleteProject}
                />
              ))}
              <Button
                variant="outlined"
                color="primary"
                startIcon={<AddIcon />}
                onClick={() => setOpenDialog("personal")}
                fullWidth
              >
                Aggiungi Progetto Personale
              </Button>
            </Box>
          </AccordionDetails>
        </Accordion>

        {/* Tirocini/Stage */}
        <Accordion elevation={2}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Box display="flex" alignItems="center" gap={1}>
              <WorkIcon color="primary" />
              <Typography variant="h6">
                Tirocini e Stage ({experiencesData.internships.length})
              </Typography>
            </Box>
          </AccordionSummary>
          <AccordionDetails>
            <Box>
              {experiencesData.internships.map((internship) => (
                <StageCard
                  key={internship.id}
                  internship={internship}
                  handleDeleteInternship={handleDeleteInternship}
                />
              ))}
              <Button
                variant="outlined"
                color="primary"
                startIcon={<AddIcon />}
                onClick={() => setOpenDialog("internship")}
                fullWidth
              >
                Aggiungi Tirocinio
              </Button>
            </Box>
          </AccordionDetails>
        </Accordion>
      </Stack>

      {/* Dialog Aggiungi Progetto */}
      <AddProjectDialog
        openDialog={openDialog}
        setOpenDialog={setOpenDialog}
        handleSubmitProject={handleSubmitProject}
        onSubmitProject={onSubmitProject}
        errorsProject={errorsProject}
        controlProject={controlProject}
        allTechnologies={allTechnologies}
      />
      {/* Dialog Aggiungi Tirocinio */}
      <AddStageDialog
        openDialog={openDialog}
        setOpenDialog={setOpenDialog}
        handleSubmitInternship={handleSubmitInternship}
        onSubmitInternship={onSubmitInternship}
        errorsInternship={errorsInternship}
        controlInternship={controlInternship}
        allTechnologies={allTechnologies}
      />
    </Box>
  );
};

export default Step4Experiences;
