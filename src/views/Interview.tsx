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
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { useNavigate } from "react-router-dom";
import { useInterview as useInterview2 } from "../hooks/interview/useInterview";
import { InterviewStep, INTERVIEW_STEP_LABELS } from "../types/interview";
import Step1Personal from "../components/interview/Step1Personal";
import Step2Exams from "../components/interview/Step2Exams";
import Step3Interests from "../components/interview/Step3Interests";
import Step4Experiences from "../components/interview/Step4Experiences";
import Step5Skills from "../components/interview/Step5Skills";
import {
  personalDataSchema,
  examDataSchema,
  interestsDataSchema,
  skillsDataSchema,
} from "../schemas/interviewSchemas";
import { interviewService } from "../services/interviewService";

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
  const [validationError, setValidationError] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  const validateCurrentStep = async () => {
    try {
      switch (currentStep) {
        case InterviewStep.PERSONAL:
          if (interviewData.personal) {
            await personalDataSchema.validate(interviewData.personal);
            setValidationError(null);
            return true;
          } else {
            console.log("setCanProceed false");
            return false;
          }

        case InterviewStep.EXAMS:
          if (interviewData.exams) {
            await examDataSchema.validate(interviewData.exams);
            setValidationError(null);
            return true;
          } else {
            console.log("setCanProceed false 2");
            return false;
          }

        case InterviewStep.INTERESTS:
          if (interviewData.interests) {
            await interestsDataSchema.validate(interviewData.interests);
            setValidationError(null);
            return true;
          } else {
            console.log("setCanProceed false 3");
            return false;
          }

        case InterviewStep.EXPERIENCES:
          // always valid
          setValidationError(null);
          return true;

        case InterviewStep.SKILLS:
          if (interviewData.skills) {
            await skillsDataSchema.validate(interviewData.skills);
            setValidationError(null);
            return true;
          } else {
            console.log("setCanProceed false 4");
            return false;
          }

        default:
          console.log("setCanProceed false 5");
          return false;
      }
    } catch (error: any) {
      console.log("setCanProceed false 6");
      setValidationError(error.message);
      return false;
    }
  };

  const handleNext = async () => {
    const canProceed = await validateCurrentStep();
    if (!canProceed || isSaving) {
      return;
    }

    try {
      setValidationError(null);
      setIsSaving(true);

      // Determina se è un update (step già completato) o un create (prima volta)
      const isUpdate = isStepCompleted(currentStep);

      // Salva i dati dello step corrente al backend usando l'endpoint appropriato
      switch (currentStep) {
        case InterviewStep.PERSONAL:
          if (interviewData.personal) {
            await (isUpdate
              ? interviewService.updateStep1(interviewData.personal)
              : interviewService.saveStep1(interviewData.personal));
          }
          break;

        case InterviewStep.EXAMS:
          if (interviewData.exams) {
            await (isUpdate
              ? interviewService.updateStep2(interviewData.exams)
              : interviewService.saveStep2(interviewData.exams));
          }
          break;

        case InterviewStep.INTERESTS:
          if (interviewData.interests) {
            await (isUpdate
              ? interviewService.updateStep3(interviewData.interests)
              : interviewService.saveStep3(interviewData.interests));
          }
          break;

        case InterviewStep.EXPERIENCES:
          if (interviewData.experiences) {
            await (isUpdate
              ? interviewService.updateStep4(interviewData.experiences)
              : interviewService.saveStep4(interviewData.experiences));
          }
          break;

        case InterviewStep.SKILLS:
          if (interviewData.skills) {
            await (isUpdate
              ? interviewService.updateStep5(interviewData.skills)
              : interviewService.saveStep5(interviewData.skills));
          }
          break;
      }

      if (currentStep === InterviewStep.SKILLS) {
        // Last step - show completion dialog
        setShowCompletionDialog(true);
      } else {
        goToNextStep();
      }
    } catch (error: any) {
      console.error("Error saving interview data:", error);
      setValidationError(
        error.response?.data?.message ||
          "Errore nel salvataggio dei dati. Riprova."
      );
    } finally {
      setIsSaving(false);
    }
  };

  const handleBack = () => {
    goToPreviousStep();
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
          />
        );
      case InterviewStep.EXAMS:
        return (
          <Step2Exams initialData={interviewData.exams} onSave={saveStep2} />
        );
      case InterviewStep.INTERESTS:
        return (
          <Step3Interests
            initialData={interviewData.interests}
            onSave={saveStep3}
          />
        );
      case InterviewStep.EXPERIENCES:
        return (
          <Step4Experiences
            initialData={interviewData.experiences}
            onSave={saveStep4}
          />
        );
      case InterviewStep.SKILLS:
        return (
          <Step5Skills initialData={interviewData.skills} onSave={saveStep5} />
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

        {/* Validation Error */}
        {validationError && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {validationError}
          </Alert>
        )}

        {/* Step Content Card */}
        <Card elevation={3} sx={{ borderRadius: 3 }}>
          <CardContent sx={{ p: { xs: 2, md: 4 }, minHeight: 400 }}>
            {renderStepContent()}
          </CardContent>

          <CardActions sx={{ p: { xs: 2, md: 3 }, bgcolor: "grey.50" }}>
            <Box
              display="flex"
              justifyContent="space-between"
              width="100%"
              gap={2}
            >
              {/* Back Button */}
              <Button
                variant="outlined"
                onClick={handleBack}
                disabled={currentStep === InterviewStep.PERSONAL}
                startIcon={<ArrowBackIcon />}
                size="large"
              >
                Indietro
              </Button>

              <Box display="flex" gap={2}>
                {/* Skip Button (only for experiences step) */}
                {currentStep === InterviewStep.EXPERIENCES && (
                  <Button variant="text" onClick={handleNext} size="large">
                    Salta
                  </Button>
                )}

                {/* Next/Complete Button */}
                <Button
                  variant="contained"
                  onClick={handleNext}
                  disabled={isLoading || isSaving}
                  endIcon={
                    isSaving ? (
                      <CircularProgress size={20} color="inherit" />
                    ) : currentStep === InterviewStep.SKILLS ? (
                      <CheckCircleIcon />
                    ) : (
                      <ArrowForwardIcon />
                    )
                  }
                  size="large"
                >
                  {isSaving
                    ? "Salvataggio..."
                    : currentStep === InterviewStep.SKILLS
                    ? "Completa"
                    : "Avanti"}
                </Button>
              </Box>
            </Box>
          </CardActions>
        </Card>

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
