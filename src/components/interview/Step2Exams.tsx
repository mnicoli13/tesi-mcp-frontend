import React, { useState } from "react";
import {
  Box,
  Button,
  Typography,
  Alert,
  Card,
  CardContent,
  IconButton,
  Chip,
  Tabs,
  Tab,
  List,
  ListItem,
  Stack,
  CardActions,
  CircularProgress,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import SchoolIcon from "@mui/icons-material/School";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { ExamData, Exam } from "../../types/interview";
import { examSchema } from "../../schemas/interviewSchemas";
import { v4 as uuidv4 } from "uuid";
import Esse3ImportDialog from "./dialog/Esse3ImportDialog";
import ImportExamDialog from "./dialog/ImportExamDialog";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

interface Step2ExamsProps {
  initialData?: ExamData;
  saveStep2: (data: ExamData) => void;
  handleNext: () => void;
  isLoading: boolean;
  handleBack: () => void;
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

const Step2Exams: React.FC<Step2ExamsProps> = ({
  initialData,
  saveStep2,
  handleNext,
  isLoading,
  handleBack,
}) => {
  const [tabValue, setTabValue] = useState(0);
  const [openAddDialog, setOpenAddDialog] = useState(false);
  const [openEsse3Dialog, setOpenEsse3Dialog] = useState(false);
  const [exams, setExams] = useState<Exam[]>(initialData?.exams || []);
  const [importedFromEsse3, setImportedFromEsse3] = useState(
    initialData?.importedFromEsse3 || false
  );

  // Form per dialog aggiunta esami
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Omit<Exam, "id">>({
    resolver: yupResolver(examSchema) as any,
    mode: "onChange",
    defaultValues: {
      name: "",
      grade: 18,
      ects: 6,
    },
  });

  const saveData = (currentExams: Exam[], fromEsse3: boolean) => {
    const data: ExamData = {
      exams: currentExams,
      importedFromEsse3: fromEsse3,
    };
    saveStep2(data);
  };

  const onSubmitExam = (values: Omit<Exam, "id">) => {
    const newExam: Exam = {
      id: uuidv4(),
      ...values,
    };
    const updatedExams = [...exams, newExam];
    setExams(updatedExams);
    saveData(updatedExams, false);
    reset();
    setOpenAddDialog(false);
  };

  const handleDeleteExam = (examId: string) => {
    const updatedExams = exams.filter((e) => e.id !== examId);
    setExams(updatedExams);
    saveData(updatedExams, importedFromEsse3);
  };

  const handleImportFromEsse3 = () => {
    setOpenEsse3Dialog(true);
  };

  const handleEsse3ImportSuccess = (importedExams: Exam[]) => {
    // Aggiungi ID univoci agli esami importati se non ce l'hanno già
    const examsWithIds = importedExams.map((exam) => ({
      ...exam,
      id: exam.id || uuidv4(),
    }));

    // Aggiungi agli esami esistenti (merge, non sovrascrivere)
    const updatedExams = [...exams, ...examsWithIds];
    setExams(updatedExams);
    setImportedFromEsse3(true);
    saveData(updatedExams, true);
  };

  return (
    <Card elevation={3} sx={{ borderRadius: 3 }}>
      <CardContent sx={{ p: { xs: 2, md: 4 }, minHeight: 400 }}>
        <Box>
          <Typography variant="h5" gutterBottom fontWeight={600}>
            Esami e Voti
          </Typography>
          <Typography variant="body2" color="text.secondary" mb={3}>
            Inserisci i tuoi esami sostenuti con i rispettivi voti e CFU. Potrai
            selezionare gli esami che hai preferito e che riflettono meglio le
            tue competenze.
          </Typography>

          {exams.length === 0 && (
            <Alert severity="info" sx={{ mb: 3 }}>
              <strong>Suggerimento:</strong> Puoi importare automaticamente i
              tuoi esami da ESSE3 o inserirli manualmente.
            </Alert>
          )}

          <Tabs
            value={tabValue}
            onChange={(_, newValue) => setTabValue(newValue)}
            sx={{ mb: 2 }}
          >
            <Tab
              label="Importa da ESSE3"
              icon={<CloudUploadIcon />}
              iconPosition="start"
            />
            <Tab
              label="Inserimento Manuale"
              icon={<AddIcon />}
              iconPosition="start"
            />
          </Tabs>

          <TabPanel value={tabValue} index={0}>
            <Card elevation={1} sx={{ bgcolor: "grey.50" }}>
              <CardContent sx={{ textAlign: "center", py: 4 }}>
                <CloudUploadIcon
                  sx={{ fontSize: 64, color: "primary.main", mb: 2 }}
                />
                <Typography variant="h6" gutterBottom>
                  Importa da ESSE3
                </Typography>
                <Typography variant="body2" color="text.secondary" mb={3}>
                  Accedi con le tue credenziali ESSE3 per importare
                  automaticamente tutti i tuoi esami e voti.
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
                    <ListItem sx={{ minWidth: "100%" }}>
                      <Box sx={{ minWidth: "100%" }}>
                        <Stack
                          direction={"row"}
                          alignItems={"center"}
                          gap={2}
                          justifyContent={"space-between"}
                        >
                          <Stack direction={"column"} gap={1}>
                            <Box display="flex" alignItems="center" gap={1}>
                              <SchoolIcon fontSize="small" color="action" />
                              <Typography variant="body1" fontWeight={500}>
                                {exam.name}
                              </Typography>
                            </Box>

                            <Box mt={0.5}>
                              <Chip
                                label={`Voto: ${exam.grade}`}
                                size="small"
                                sx={{ mr: 1 }}
                              />
                              <Chip label={`CFU: ${exam.ects}`} size="small" />
                            </Box>
                          </Stack>

                          <Box>
                            <IconButton
                              edge="end"
                              aria-label="delete"
                              onClick={() => handleDeleteExam(exam.id!)}
                              color="error"
                            >
                              <DeleteIcon />
                            </IconButton>
                          </Box>
                        </Stack>
                      </Box>
                    </ListItem>
                  </Card>
                ))}
              </List>
            </Box>
          )}

          {/* Dialog Aggiungi Esame */}
          <ImportExamDialog
            openAddDialog={openAddDialog}
            setOpenAddDialog={setOpenAddDialog}
            onSubmitExam={onSubmitExam}
            control={control}
            errors={errors}
            handleSubmit={handleSubmit}
          />

          {/* Dialog Import ESSE3 */}
          <Esse3ImportDialog
            open={openEsse3Dialog}
            onClose={() => setOpenEsse3Dialog(false)}
            onImportSuccess={handleEsse3ImportSuccess}
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

export default Step2Exams;
