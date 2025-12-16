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
  Card,
  CardContent,
  CardActions,
  CircularProgress,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import SchoolIcon from "@mui/icons-material/School";
import CodeIcon from "@mui/icons-material/Code";
import WorkIcon from "@mui/icons-material/Work";
import BusinessCenterIcon from "@mui/icons-material/BusinessCenter";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  ExperiencesData,
  Project,
  Internship,
  WorkExperience,
  Education,
} from "../../types/interview";
import {
  projectSchema,
  internshipSchema,
  workExperienceSchema,
  educationSchema,
} from "../../schemas/interviewSchemas";
import { v4 as uuidv4 } from "uuid";
import AddProjectDialog from "./dialog/AddProjectDialog";
import AddStageDialog from "./dialog/AddStageDialog";
import AddWorkExperienceDialog from "./dialog/AddWorkExperienceDialog";
import AddEducationDialog from "./dialog/AddEducationDialog";
import ProjectCard from "./card/ProjectCard";
import StageCard from "./card/StageCard";
import WorkExperienceCard from "./card/WorkExperienceCard";
import EducationCard from "./card/EducationCard";

interface Step4ExperiencesProps {
  initialData?: ExperiencesData;
  onSave: (data: ExperiencesData) => void;
  handleNext: () => void;
  handleBack: () => void;
  isLoading: boolean;
}

export type DialogType =
  | "university"
  | "personal"
  | "internship"
  | "workExperience"
  | "education"
  | null;

const Step4Experiences: React.FC<Step4ExperiencesProps> = ({
  initialData,
  onSave,
  handleNext,
  handleBack,
  isLoading,
}) => {
  const [experiencesData, setExperiencesData] = useState<ExperiencesData>(
    initialData || {
      universityProjects: [],
      personalProjects: [],
      internships: [],
      workExperiences: [],
      education: [],
    }
  );

  const [openDialog, setOpenDialog] = useState<DialogType>(null);

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
      technologies: undefined,
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
      description: undefined,
      technologies: undefined,
    },
  });

  // Work Experience form
  const {
    handleSubmit: handleSubmitWorkExperience,
    reset: resetWorkExperience,
    control: controlWorkExperience,
    formState: { errors: errorsWorkExperience },
  } = useForm<Omit<WorkExperience, "id">>({
    resolver: yupResolver(workExperienceSchema) as any,
    mode: "onChange",
    defaultValues: {
      company: "",
      role: "",
      contractType: "permanent" as const,
      startDate: "",
      endDate: "",
      description: undefined,
      technologies: undefined,
    },
  });

  // Education form
  const {
    handleSubmit: handleSubmitEducation,
    reset: resetEducation,
    control: controlEducation,
    formState: { errors: errorsEducation },
  } = useForm<Omit<Education, "id">>({
    resolver: yupResolver(educationSchema) as any,
    mode: "onChange",
    defaultValues: {
      institution: "",
      degree: "",
      fieldOfStudy: "",
      startYear: new Date().getFullYear(),
      endYear: undefined,
      grade: "",
      description: "",
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

  const onSubmitWorkExperience = (values: Omit<WorkExperience, "id">) => {
    const newWorkExperience: WorkExperience = {
      id: uuidv4(),
      ...values,
    };

    const updatedData = {
      ...experiencesData,
      workExperiences: [...experiencesData.workExperiences, newWorkExperience],
    };

    setExperiencesData(updatedData);
    onSave(updatedData);
    resetWorkExperience();
    setOpenDialog(null);
  };

  const handleDeleteWorkExperience = (id: string) => {
    const updatedData = {
      ...experiencesData,
      workExperiences: experiencesData.workExperiences.filter(
        (w) => w.id !== id
      ),
    };

    setExperiencesData(updatedData);
    onSave(updatedData);
  };

  const onSubmitEducation = (values: Omit<Education, "id">) => {
    const newEducation: Education = {
      id: uuidv4(),
      ...values,
    };

    const updatedData = {
      ...experiencesData,
      education: [...experiencesData.education, newEducation],
    };

    setExperiencesData(updatedData);
    onSave(updatedData);
    resetEducation();
    setOpenDialog(null);
  };

  const handleDeleteEducation = (id: string) => {
    const updatedData = {
      ...experiencesData,
      education: experiencesData.education.filter((e) => e.id !== id),
    };

    setExperiencesData(updatedData);
    onSave(updatedData);
  };

  return (
    <Card elevation={3} sx={{ borderRadius: 3 }}>
      <CardContent sx={{ p: { xs: 2, md: 4 }, minHeight: 400 }}>
        <Box>
          <Typography variant="h5" gutterBottom fontWeight={600}>
            Esperienze Pratiche
          </Typography>
          <Typography variant="body2" color="text.secondary" mb={3}>
            Condividi i tuoi progetti e le tue esperienze lavorative. Queste
            informazioni arricchiscono il tuo profilo e ci aiutano a valutare
            meglio le tue competenze pratiche.
          </Typography>

          <Alert severity="info" sx={{ mb: 3 }}>
            <strong>Nota:</strong> Anche esperienze brevi o progetti personali
            sono importanti! Ci aiutano a capire le tue soft skill e le
            tecnologie che hai utilizzato.
          </Alert>

          <Stack spacing={2}>
            {/* Istruzione */}
            <Accordion defaultExpanded elevation={2}>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Box display="flex" alignItems="center" gap={1}>
                  <SchoolIcon color="primary" />
                  <Typography variant="h6">
                    Istruzione ({experiencesData.education.length})
                  </Typography>
                </Box>
              </AccordionSummary>
              <AccordionDetails>
                <Box>
                  {experiencesData.education.map((education) => (
                    <EducationCard
                      key={education.id}
                      education={education}
                      handleDeleteEducation={handleDeleteEducation}
                    />
                  ))}
                  <Button
                    variant="outlined"
                    color="primary"
                    startIcon={<AddIcon />}
                    onClick={() => setOpenDialog("education")}
                    fullWidth
                  >
                    Aggiungi Percorso Formativo
                  </Button>
                </Box>
              </AccordionDetails>
            </Accordion>

            {/* Esperienze Professionali */}
            <Accordion elevation={2}>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Box display="flex" alignItems="center" gap={1}>
                  <BusinessCenterIcon color="primary" />
                  <Typography variant="h6">
                    Esperienze Professionali (
                    {experiencesData.workExperiences.length})
                  </Typography>
                </Box>
              </AccordionSummary>
              <AccordionDetails>
                <Box>
                  {experiencesData.workExperiences.map((workExperience) => (
                    <WorkExperienceCard
                      key={workExperience.id}
                      workExperience={workExperience}
                      handleDeleteWorkExperience={handleDeleteWorkExperience}
                    />
                  ))}
                  <Button
                    variant="outlined"
                    color="primary"
                    startIcon={<AddIcon />}
                    onClick={() => setOpenDialog("workExperience")}
                    fullWidth
                  >
                    Aggiungi Esperienza Professionale
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
            {/* Progetti Universitari */}
            <Accordion elevation={2}>
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
                    Progetti Personali (
                    {experiencesData.personalProjects.length})
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
          </Stack>

          {/* Dialog Aggiungi Progetto */}
          <AddProjectDialog
            openDialog={openDialog}
            setOpenDialog={setOpenDialog}
            handleSubmitProject={handleSubmitProject}
            onSubmitProject={onSubmitProject}
            errorsProject={errorsProject}
            controlProject={controlProject}
          />
          {/* Dialog Aggiungi Tirocinio */}
          <AddStageDialog
            openDialog={openDialog}
            setOpenDialog={setOpenDialog}
            handleSubmitInternship={handleSubmitInternship}
            onSubmitInternship={onSubmitInternship}
            errorsInternship={errorsInternship}
            controlInternship={controlInternship}
          />
          {/* Dialog Aggiungi Esperienza Professionale */}
          <AddWorkExperienceDialog
            openDialog={openDialog}
            setOpenDialog={setOpenDialog}
            handleSubmitWorkExperience={handleSubmitWorkExperience}
            onSubmitWorkExperience={onSubmitWorkExperience}
            errorsWorkExperience={errorsWorkExperience}
            controlWorkExperience={controlWorkExperience}
          />
          {/* Dialog Aggiungi Istruzione */}
          <AddEducationDialog
            openDialog={openDialog}
            setOpenDialog={setOpenDialog}
            handleSubmitEducation={handleSubmitEducation}
            onSubmitEducation={onSubmitEducation}
            errorsEducation={errorsEducation}
            controlEducation={controlEducation}
          />
        </Box>
      </CardContent>

      <CardActions sx={{ p: { xs: 2, md: 3 }, bgcolor: "grey.50" }}>
        <Box display="flex" justifyContent="space-between" width="100%" gap={2}>
          {/* Back Button */}
          <Button
            variant="outlined"
            onClick={handleBack}
            startIcon={<ArrowBackIcon />}
            size="large"
          >
            Indietro
          </Button>

          <Box display="flex" gap={2}>
            {/* Skip Button (only for experiences step) */}

            <Button variant="text" onClick={handleNext} size="large">
              Salta
            </Button>

            {/* Next/Complete Button */}
            <Button
              variant="contained"
              onClick={handleNext}
              disabled={isLoading}
              endIcon={
                isLoading ? (
                  <CircularProgress size={20} color="inherit" />
                ) : (
                  <ArrowForwardIcon />
                )
              }
              size="large"
            >
              {isLoading ? "Salvataggio..." : "Avanti"}
            </Button>
          </Box>
        </Box>
      </CardActions>
    </Card>
  );
};

export default Step4Experiences;
