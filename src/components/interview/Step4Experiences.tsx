import React, { useState } from 'react';
import {
  Box,
  TextField,
  Grid,
  Button,
  Typography,
  Alert,
  Card,
  CardContent,
  IconButton,
  Chip,
  Stack,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Autocomplete,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import SchoolIcon from '@mui/icons-material/School';
import CodeIcon from '@mui/icons-material/Code';
import WorkIcon from '@mui/icons-material/Work';
import GitHubIcon from '@mui/icons-material/GitHub';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { ExperiencesData, Project, Internship } from '../../types/interview';
import {
  projectSchema,
  internshipSchema,
} from '../../schemas/interviewSchemas';
import { FRAMEWORKS_AND_TOOLS, PROGRAMMING_LANGUAGES } from '../../constants/interviewConstants';
import { v4 as uuidv4 } from 'uuid';

interface Step4ExperiencesProps {
  initialData: ExperiencesData | null;
  onSave: (data: ExperiencesData) => void;
}

type DialogType = 'university' | 'personal' | 'internship' | null;

const Step4Experiences: React.FC<Step4ExperiencesProps> = ({ initialData, onSave }) => {
  const [experiencesData, setExperiencesData] = useState<ExperiencesData>(
    initialData || {
      universityProjects: [],
      personalProjects: [],
      internships: [],
    }
  );

  const [openDialog, setOpenDialog] = useState<DialogType>(null);

  const allTechnologies = [...new Set([...PROGRAMMING_LANGUAGES, ...FRAMEWORKS_AND_TOOLS])];

  // Project form
  const {
    register: registerProject,
    handleSubmit: handleSubmitProject,
    reset: resetProject,
    control: controlProject,
    formState: { errors: errorsProject },
  } = useForm<Omit<Project, 'id'>>({
    resolver: yupResolver(projectSchema) as any,
    mode: 'onChange',
    defaultValues: {
      name: '',
      description: '',
      technologies: [],
      githubLink: '',
      type: 'university',
    },
  });

  // Internship form
  const {
    register: registerInternship,
    handleSubmit: handleSubmitInternship,
    reset: resetInternship,
    control: controlInternship,
    formState: { errors: errorsInternship },
  } = useForm<Omit<Internship, 'id'>>({
    resolver: yupResolver(internshipSchema) as any,
    mode: 'onChange',
    defaultValues: {
      company: '',
      role: '',
      startDate: '',
      endDate: '',
      description: '',
      technologies: [],
    },
  });

  const onSubmitProject = (values: Omit<Project, 'id'>) => {
    const newProject: Project = {
      id: uuidv4(),
      ...values,
      type: openDialog === 'university' ? 'university' : 'personal',
    };

    const updatedData =
      openDialog === 'university'
        ? {
            ...experiencesData,
            universityProjects: [...experiencesData.universityProjects, newProject],
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

  const onSubmitInternship = (values: Omit<Internship, 'id'>) => {
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

  const handleDeleteProject = (id: string, type: 'university' | 'personal') => {
    const updatedData =
      type === 'university'
        ? {
            ...experiencesData,
            universityProjects: experiencesData.universityProjects.filter((p) => p.id !== id),
          }
        : {
            ...experiencesData,
            personalProjects: experiencesData.personalProjects.filter((p) => p.id !== id),
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

  const renderProjectCard = (project: Project, type: 'university' | 'personal') => (
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
                  sx={{ textDecoration: 'none', color: 'primary.main' }}
                >
                  {project.githubLink}
                </Typography>
              </Box>
            )}
            <Stack direction="row" spacing={0.5} flexWrap="wrap" mt={1}>
              {project.technologies.map((tech) => (
                <Chip key={tech} label={tech} size="small" variant="outlined" color="primary" />
              ))}
            </Stack>
          </Box>
          <IconButton
            aria-label="delete"
            onClick={() => handleDeleteProject(project.id!, type)}
            color="error"
          >
            <DeleteIcon />
          </IconButton>
        </Box>
      </CardContent>
    </Card>
  );

  const renderInternshipCard = (internship: Internship) => (
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
            <Typography variant="caption" color="text.secondary" display="block" mb={1}>
              {new Date(internship.startDate).toLocaleDateString('it-IT')} -{' '}
              {new Date(internship.endDate).toLocaleDateString('it-IT')}
            </Typography>
            <Typography variant="body2" color="text.secondary" paragraph>
              {internship.description}
            </Typography>
            <Stack direction="row" spacing={0.5} flexWrap="wrap" mt={1}>
              {internship.technologies.map((tech) => (
                <Chip key={tech} label={tech} size="small" variant="outlined" color="secondary" />
              ))}
            </Stack>
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

  return (
    <Box>
      <Typography variant="h5" gutterBottom fontWeight={600}>
        Esperienze Pratiche
      </Typography>
      <Typography variant="body2" color="text.secondary" mb={3}>
        Condividi i tuoi progetti e le tue esperienze lavorative. Queste informazioni arricchiscono
        il tuo profilo e ci aiutano a valutare meglio le tue competenze pratiche.
      </Typography>

      <Alert severity="info" sx={{ mb: 3 }}>
        <strong>Nota:</strong> Anche esperienze brevi o progetti personali sono importanti! Ci
        aiutano a capire le tue soft skill e le tecnologie che hai utilizzato.
      </Alert>

      <Stack spacing={2}>
        {/* Progetti Universitari */}
        <Accordion defaultExpanded elevation={2}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Box display="flex" alignItems="center" gap={1}>
              <SchoolIcon color="primary" />
              <Typography variant="h6">
                Progetti Universitari ({experiencesData.universityProjects.length})
              </Typography>
            </Box>
          </AccordionSummary>
          <AccordionDetails>
            <Box>
              {experiencesData.universityProjects.map((project) =>
                renderProjectCard(project, 'university')
              )}
              <Button
                variant="outlined"
                color="primary"
                startIcon={<AddIcon />}
                onClick={() => setOpenDialog('university')}
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
              {experiencesData.personalProjects.map((project) =>
                renderProjectCard(project, 'personal')
              )}
              <Button
                variant="outlined"
                color="primary"
                startIcon={<AddIcon />}
                onClick={() => setOpenDialog('personal')}
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
              <Typography variant="h6">Tirocini e Stage ({experiencesData.internships.length})</Typography>
            </Box>
          </AccordionSummary>
          <AccordionDetails>
            <Box>
              {experiencesData.internships.map((internship) => renderInternshipCard(internship))}
              <Button
                variant="outlined"
                color="primary"
                startIcon={<AddIcon />}
                onClick={() => setOpenDialog('internship')}
                fullWidth
              >
                Aggiungi Tirocinio
              </Button>
            </Box>
          </AccordionDetails>
        </Accordion>
      </Stack>

      {/* Dialog Aggiungi Progetto */}
      <Dialog
        open={openDialog === 'university' || openDialog === 'personal'}
        onClose={() => setOpenDialog(null)}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>
          {openDialog === 'university' ? 'Aggiungi Progetto Universitario' : 'Aggiungi Progetto Personale'}
        </DialogTitle>
        <form onSubmit={handleSubmitProject(onSubmitProject)}>
          <DialogContent>
            <Grid container spacing={2}>
              <Grid size={{ xs: 12 }}>
                <TextField
                  {...registerProject('name')}
                  fullWidth
                  label="Nome Progetto *"
                  error={!!errorsProject.name}
                  helperText={errorsProject.name?.message}
                />
              </Grid>
              <Grid size={{ xs: 12 }}>
                <TextField
                  {...registerProject('description')}
                  fullWidth
                  multiline
                  rows={3}
                  label="Descrizione *"
                  error={!!errorsProject.description}
                  helperText={errorsProject.description?.message}
                />
              </Grid>
              <Grid size={{ xs: 12 }}>
                <Controller
                  name="technologies"
                  control={controlProject}
                  render={({ field }) => (
                    <Autocomplete
                      {...field}
                      multiple
                      options={allTechnologies}
                      value={field.value}
                      onChange={(_, newValue) => field.onChange(newValue)}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label="Tecnologie Utilizzate *"
                          error={!!errorsProject.technologies}
                          helperText={errorsProject.technologies?.message}
                        />
                      )}
                      renderTags={(value, getTagProps) =>
                        value.map((option, index) => (
                          <Chip label={option} {...getTagProps({ index })} size="small" key={option} />
                        ))
                      }
                      freeSolo
                    />
                  )}
                />
              </Grid>
              {openDialog === 'personal' && (
                <Grid size={{ xs: 12 }}>
                  <TextField
                    {...registerProject('githubLink')}
                    fullWidth
                    label="Link GitHub (opzionale)"
                    error={!!errorsProject.githubLink}
                    helperText={errorsProject.githubLink?.message}
                    placeholder="https://github.com/username/repo"
                  />
                </Grid>
              )}
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpenDialog(null)}>Annulla</Button>
            <Button type="submit" variant="contained" color="primary">
              Aggiungi
            </Button>
          </DialogActions>
        </form>
      </Dialog>

      {/* Dialog Aggiungi Tirocinio */}
      <Dialog
        open={openDialog === 'internship'}
        onClose={() => setOpenDialog(null)}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>Aggiungi Tirocinio/Stage</DialogTitle>
        <form onSubmit={handleSubmitInternship(onSubmitInternship)}>
          <DialogContent>
            <Grid container spacing={2}>
              <Grid size={{ xs: 12, md: 6 }}>
                <TextField
                  {...registerInternship('company')}
                  fullWidth
                  label="Azienda *"
                  error={!!errorsInternship.company}
                  helperText={errorsInternship.company?.message}
                />
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <TextField
                  {...registerInternship('role')}
                  fullWidth
                  label="Ruolo *"
                  error={!!errorsInternship.role}
                  helperText={errorsInternship.role?.message}
                />
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <TextField
                  {...registerInternship('startDate')}
                  fullWidth
                  type="date"
                  label="Data Inizio *"
                  error={!!errorsInternship.startDate}
                  helperText={errorsInternship.startDate?.message}
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <TextField
                  {...registerInternship('endDate')}
                  fullWidth
                  type="date"
                  label="Data Fine *"
                  error={!!errorsInternship.endDate}
                  helperText={errorsInternship.endDate?.message}
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>
              <Grid size={{ xs: 12 }}>
                <TextField
                  {...registerInternship('description')}
                  fullWidth
                  multiline
                  rows={3}
                  label="Descrizione Attività *"
                  error={!!errorsInternship.description}
                  helperText={errorsInternship.description?.message}
                />
              </Grid>
              <Grid size={{ xs: 12 }}>
                <Controller
                  name="technologies"
                  control={controlInternship}
                  render={({ field }) => (
                    <Autocomplete
                      {...field}
                      multiple
                      options={allTechnologies}
                      value={field.value}
                      onChange={(_, newValue) => field.onChange(newValue)}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label="Tecnologie Utilizzate *"
                          error={!!errorsInternship.technologies}
                          helperText={errorsInternship.technologies?.message}
                        />
                      )}
                      renderTags={(value, getTagProps) =>
                        value.map((option, index) => (
                          <Chip label={option} {...getTagProps({ index })} size="small" key={option} />
                        ))
                      }
                      freeSolo
                    />
                  )}
                />
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpenDialog(null)}>Annulla</Button>
            <Button type="submit" variant="contained" color="primary">
              Aggiungi
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </Box>
  );
};

export default Step4Experiences;
