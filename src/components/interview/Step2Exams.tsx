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
  Checkbox,
  FormControlLabel,
  IconButton,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Tabs,
  Tab,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import SchoolIcon from '@mui/icons-material/School';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { ExamData, Exam } from '../../types/interview';
import { examSchema } from '../../schemas/interviewSchemas';
import { v4 as uuidv4 } from 'uuid';

interface Step2ExamsProps {
  initialData: ExamData | null;
  onSave: (data: ExamData) => void;
}

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

const TabPanel: React.FC<TabPanelProps> = ({ children, value, index }) => {
  return (
    <div hidden={value !== index} style={{ paddingTop: 16 }}>
      {value === index && children}
    </div>
  );
};

const Step2Exams: React.FC<Step2ExamsProps> = ({ initialData, onSave }) => {
  const [tabValue, setTabValue] = useState(0);
  const [openAddDialog, setOpenAddDialog] = useState(false);
  const [exams, setExams] = useState<Exam[]>(initialData?.exams || []);
  const [preferredExams, setPreferredExams] = useState<string[]>(
    initialData?.preferredExams || []
  );
  const [motivation, setMotivation] = useState(initialData?.motivation || '');
  const [importedFromEsse3, setImportedFromEsse3] = useState(
    initialData?.importedFromEsse3 || false
  );

  // Form per dialog aggiunta esami
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Omit<Exam, 'id'>>({
    resolver: yupResolver(examSchema) as any,
    mode: 'onChange',
    defaultValues: {
      name: '',
      grade: 18,
      ects: 6,
    },
  });

  const saveData = (
    currentExams: Exam[],
    currentPreferred: string[],
    currentMotivation: string,
    fromEsse3: boolean
  ) => {
    const data: ExamData = {
      exams: currentExams,
      preferredExams: currentPreferred,
      motivation: currentMotivation,
      importedFromEsse3: fromEsse3,
    };
    onSave(data);
  };

  const onSubmitExam = (values: Omit<Exam, 'id'>) => {
    const newExam: Exam = {
      id: uuidv4(),
      ...values,
    };
    const updatedExams = [...exams, newExam];
    setExams(updatedExams);
    saveData(updatedExams, preferredExams, motivation, false);
    reset();
    setOpenAddDialog(false);
  };

  const handleDeleteExam = (examId: string) => {
    const updatedExams = exams.filter((e) => e.id !== examId);
    const updatedPreferred = preferredExams.filter((id) => id !== examId);
    setExams(updatedExams);
    setPreferredExams(updatedPreferred);
    saveData(updatedExams, updatedPreferred, motivation, importedFromEsse3);
  };

  const handleTogglePreferred = (examId: string) => {
    const updatedPreferred = preferredExams.includes(examId)
      ? preferredExams.filter((id) => id !== examId)
      : [...preferredExams, examId];
    setPreferredExams(updatedPreferred);
    saveData(exams, updatedPreferred, motivation, importedFromEsse3);
  };

  const handleMotivationChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newMotivation = event.target.value;
    setMotivation(newMotivation);
    saveData(exams, preferredExams, newMotivation, importedFromEsse3);
  };

  const handleImportFromEsse3 = () => {
    // TODO: Implementare il modal di login ESSE3
    alert('Funzionalità ESSE3 in arrivo! Per ora usa l\'inserimento manuale.');
  };

  return (
    <Box>
      <Typography variant="h5" gutterBottom fontWeight={600}>
        Esami e Voti
      </Typography>
      <Typography variant="body2" color="text.secondary" mb={3}>
        Inserisci i tuoi esami sostenuti con i rispettivi voti e CFU. Potrai selezionare gli esami
        che hai preferito e che riflettono meglio le tue competenze.
      </Typography>

      {exams.length === 0 && (
        <Alert severity="info" sx={{ mb: 3 }}>
          <strong>Suggerimento:</strong> Puoi importare automaticamente i tuoi esami da ESSE3 o
          inserirli manualmente.
        </Alert>
      )}

      <Tabs value={tabValue} onChange={(_, newValue) => setTabValue(newValue)} sx={{ mb: 2 }}>
        <Tab label="Importa da ESSE3" icon={<CloudUploadIcon />} iconPosition="start" />
        <Tab label="Inserimento Manuale" icon={<AddIcon />} iconPosition="start" />
      </Tabs>

      <TabPanel value={tabValue} index={0}>
        <Card elevation={1} sx={{ bgcolor: 'grey.50' }}>
          <CardContent sx={{ textAlign: 'center', py: 4 }}>
            <CloudUploadIcon sx={{ fontSize: 64, color: 'primary.main', mb: 2 }} />
            <Typography variant="h6" gutterBottom>
              Importa da ESSE3
            </Typography>
            <Typography variant="body2" color="text.secondary" mb={3}>
              Accedi con le tue credenziali ESSE3 per importare automaticamente tutti i tuoi esami
              e voti.
            </Typography>
            <Button
              variant="contained"
              color="primary"
              size="large"
              onClick={handleImportFromEsse3}
              startIcon={<CloudUploadIcon />}
            >
              Accedi a ESSE3
            </Button>
          </CardContent>
        </Card>
      </TabPanel>

      <TabPanel value={tabValue} index={1}>
        <Box>
          <Button
            variant="contained"
            color="primary"
            startIcon={<AddIcon />}
            onClick={() => setOpenAddDialog(true)}
            sx={{ mb: 2 }}
          >
            Aggiungi Esame
          </Button>
        </Box>
      </TabPanel>

      {/* Lista Esami */}
      {exams.length > 0 && (
        <Box mt={4}>
          <Typography variant="h6" gutterBottom>
            I tuoi esami ({exams.length})
          </Typography>

          <List>
            {exams.map((exam) => (
              <Card key={exam.id} elevation={1} sx={{ mb: 2 }}>
                <ListItem>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={preferredExams.includes(exam.id!)}
                        onChange={() => handleTogglePreferred(exam.id!)}
                        color="primary"
                      />
                    }
                    label=""
                  />
                  <ListItemText
                    primary={
                      <Box display="flex" alignItems="center" gap={1}>
                        <SchoolIcon fontSize="small" color="action" />
                        <Typography variant="body1" fontWeight={500}>
                          {exam.name}
                        </Typography>
                        {preferredExams.includes(exam.id!) && (
                          <Chip label="Preferito" size="small" color="secondary" />
                        )}
                      </Box>
                    }
                    secondary={
                      <Box mt={0.5}>
                        <Chip label={`Voto: ${exam.grade}`} size="small" sx={{ mr: 1 }} />
                        <Chip label={`CFU: ${exam.ects}`} size="small" />
                      </Box>
                    }
                  />
                  <ListItemSecondaryAction>
                    <IconButton
                      edge="end"
                      aria-label="delete"
                      onClick={() => handleDeleteExam(exam.id!)}
                      color="error"
                    >
                      <DeleteIcon />
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>
              </Card>
            ))}
          </List>

          {/* Motivazione Preferenze */}
          {preferredExams.length > 0 && (
            <Box mt={3}>
              <Typography variant="body1" gutterBottom fontWeight={500}>
                Perché hai selezionato questi esami come preferiti? (opzionale)
              </Typography>
              <TextField
                fullWidth
                multiline
                rows={4}
                value={motivation}
                onChange={handleMotivationChange}
                placeholder="Es. Questi esami riflettono le aree in cui mi sono sentito più a mio agio e in cui ho ottenuto i migliori risultati..."
                variant="outlined"
                helperText={`${motivation.length}/500 caratteri`}
                inputProps={{ maxLength: 500 }}
              />
            </Box>
          )}
        </Box>
      )}

      {/* Dialog Aggiungi Esame */}
      <Dialog open={openAddDialog} onClose={() => setOpenAddDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Aggiungi Esame</DialogTitle>
        <form onSubmit={handleSubmit(onSubmitExam)}>
          <DialogContent>
            <Grid container spacing={2}>
              <Grid size={{ xs: 12 }}>
                <TextField
                  {...register('name')}
                  fullWidth
                  label="Nome Esame *"
                  error={!!errors.name}
                  helperText={errors.name?.message}
                  variant="outlined"
                />
              </Grid>
              <Grid size={{ xs: 6 }}>
                <TextField
                  {...register('grade', { valueAsNumber: true })}
                  fullWidth
                  label="Voto *"
                  type="number"
                  error={!!errors.grade}
                  helperText={errors.grade?.message || '18-30 (31 per lode)'}
                  variant="outlined"
                  inputProps={{ min: 18, max: 31 }}
                />
              </Grid>
              <Grid size={{ xs: 6 }}>
                <TextField
                  {...register('ects', { valueAsNumber: true })}
                  fullWidth
                  label="CFU *"
                  type="number"
                  error={!!errors.ects}
                  helperText={errors.ects?.message}
                  variant="outlined"
                  inputProps={{ min: 1, max: 30 }}
                />
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpenAddDialog(false)}>Annulla</Button>
            <Button type="submit" variant="contained" color="primary">
              Aggiungi
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </Box>
  );
};

export default Step2Exams;
