import React, { useState } from "react";
import {
  Box,
  Container,
  Card,
  CardContent,
  CardActions,
  Button,
  Typography,
  Stepper,
  Step,
  StepLabel,
  Alert,
  CircularProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  LinearProgress,
} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { useNavigate } from "react-router-dom";
import { useInterview as useInterview2 } from "../hooks/interview/useInterview";
import { InterviewStep, INTERVIEW_STEP_LABELS } from "../types/interview";
import Step1Personal from "../components/interview/Step1Personal";
import Step2Exams from "../components/interview/Step2Exams";
import Step3Interests from "../components/interview/Step3Interests";
import Step4Experiences from "../components/interview/Step4Experiences";
import Step5Skills from "../components/interview/Step5Skills";

const Interview: React.FC = () => {
  const navigate = useNavigate();

  const {
    interviewData,
    currentStep,
    isLoading,
    goToNextStep,
    goToPreviousStep,
    isStepCompleted,
    saveStep1,
    saveStep2,
    saveStep3,
    saveStep4,
    saveStep5,
    completeInterview,
  } = useInterview2();

  const [showCompletionDialog, setShowCompletionDialog] = useState(false);

  const handleBack = () => {
    goToPreviousStep();
  };

  const handleNext = () => {
    goToNextStep();
  };

  const handleComplete = async () => {
    try {
      await completeInterview();
      setShowCompletionDialog(false);
      navigate("/chat");
    } catch (error) {
      console.error("Error completing interview:", error);
      alert("Errore nel completamento dell'intervista. Riprova.");
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case InterviewStep.PERSONAL:
        return (
          <Step1Personal
            initialData={interviewData.personal}
            onSave={saveStep1}
            handleNext={handleNext}
            isLoading={isLoading}
          />
        );
      case InterviewStep.EXAMS:
        return (
          <Step2Exams
            initialData={interviewData.exams}
            saveStep2={saveStep2}
            handleNext={handleNext}
            handleBack={handleBack}
            isLoading={isLoading}
          />
        );
      case InterviewStep.INTERESTS:
        return (
          <Step3Interests
            initialData={interviewData.interests}
            onSave={saveStep3}
            handleNext={handleNext}
            handleBack={handleBack}
            isLoading={isLoading}
          />
        );
      case InterviewStep.EXPERIENCES:
        return (
          <Step4Experiences
            initialData={interviewData.experiences}
            onSave={saveStep4}
            handleNext={handleNext}
            handleBack={handleBack}
            isLoading={isLoading}
          />
        );
      case InterviewStep.SKILLS:
        return (
          <Step5Skills
            initialData={interviewData.skills}
            handleNext={handleNext}
            onSave={saveStep5}
            handleBack={handleBack}
            isLoading={isLoading}
          />
        );
      default:
        return null;
    }
  };

  const progress = ((currentStep + 1) / 5) * 100;

  return (
    <Container maxWidth="lg">
      <Box py={4}>
        {/* Header */}
        <Box mb={4}>
          <Typography variant="h4" gutterBottom fontWeight={700}>
            Crea il tuo Profilo Professionale
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Completa i seguenti step per creare un profilo completo e ricevere
            suggerimenti personalizzati per la tua carriera.
          </Typography>
        </Box>

        {/* Progress Bar */}
        <Box mb={2}>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            mb={1}
          >
            <Typography variant="body2" color="text.secondary">
              Progresso
            </Typography>
            <Typography variant="body2" fontWeight={600} color="primary">
              {Math.round(progress)}%
            </Typography>
          </Box>
          <LinearProgress
            variant="determinate"
            value={progress}
            sx={{ height: 8, borderRadius: 4 }}
          />
        </Box>

        {/* Stepper */}
        <Stepper activeStep={currentStep} alternativeLabel sx={{ mb: 4 }}>
          {INTERVIEW_STEP_LABELS.map((label, index) => (
            <Step key={label} completed={isStepCompleted(index)}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>

        {renderStepContent()}

        {/* Info Box */}
        <Alert severity="info" sx={{ mt: 3 }}>
          <strong>Info:</strong> I tuoi dati vengono salvati automaticamente.
          Puoi tornare indietro e modificare le tue risposte in qualsiasi
          momento.
        </Alert>
      </Box>

      {/* Completion Dialog */}
      <Dialog
        open={showCompletionDialog}
        onClose={() => setShowCompletionDialog(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>
          <Box display="flex" alignItems="center" gap={1}>
            <CheckCircleIcon color="success" fontSize="large" />
            <Typography variant="h6">Completa il tuo Profilo</Typography>
          </Box>
        </DialogTitle>
        <DialogContent>
          <Typography variant="body1" paragraph>
            Hai completato tutti gli step dell'intervista! 🎉
          </Typography>
          <Typography variant="body2" color="text.secondary" paragraph>
            Il tuo profilo verrà salvato e potrai iniziare a utilizzare il
            Career Coach AI per ricevere suggerimenti personalizzati, generare
            il tuo CV Europass e cercare opportunità di lavoro.
          </Typography>
          <Alert severity="success" sx={{ mt: 2 }}>
            Sei pronto per iniziare il tuo percorso di carriera!
          </Alert>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => setShowCompletionDialog(false)}
            disabled={isLoading}
          >
            Rivedi
          </Button>
          <Button
            variant="contained"
            onClick={handleComplete}
            disabled={isLoading}
            startIcon={
              isLoading ? <CircularProgress size={20} /> : <CheckCircleIcon />
            }
          >
            {isLoading ? "Salvataggio..." : "Inizia il Career Coaching"}
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default Interview;
