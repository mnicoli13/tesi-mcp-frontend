import { useState, useCallback, useEffect } from "react";
import { interviewService } from "../../services/interviewService";
import {
  PersonalData,
  ExamData,
  InterestsData,
  ExperiencesData,
  SkillsData,
  InterviewData,
  INITIAL_INTERVIEW_DATA,
  InterviewStep,
} from "../../types/interview";
import { useNavigate } from "react-router-dom";

/**
 * Hook personalizzato per gestire l'intervista
 * Fornisce metodi per salvare/aggiornare ogni step e tracciare il progresso
 */
export const useInterview = () => {
  const [interviewData, setInterviewData] = useState<InterviewData>(
    INITIAL_INTERVIEW_DATA
  );
  const [currentStep, setCurrentStep] = useState<InterviewStep>(
    InterviewStep.PERSONAL
  );
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  /**
   * Carica il progresso dell'intervista all'avvio
   */
  useEffect(() => {
    loadProgress();
  }, []);

  const goToNextStep = useCallback(() => {
    setCurrentStep((prev) => {
      if (prev < InterviewStep.SKILLS) {
        return prev + 1;
      }
      navigate("/chat");
      return prev;
    });
  }, []);

  const goToPreviousStep = useCallback(() => {
    setCurrentStep((prev) => {
      if (prev > InterviewStep.PERSONAL) {
        return prev - 1;
      }
      return prev;
    });
  }, []);

  /**
   * Carica il progresso dell'intervista
   */
  const loadProgress = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      const data = await interviewService.getProgress();
      setInterviewData(data);
    } catch (err: any) {
      setError(
        err.response?.data?.message || "Errore nel caricamento del progresso"
      );
      console.error("Error isLoading progress:", err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  /**
   * Salva lo Step 1 - Anagrafica
   */
  const saveStep1 = useCallback(
    async (data: PersonalData, isUpdate = false) => {
      try {
        setIsLoading(true);
        setError(null);
        const response = isUpdate
          ? await interviewService.updateStep1(data)
          : await interviewService.saveStep1(data);

        // Ricarica il progresso dopo il salvataggio
        await loadProgress();
        return response;
      } catch (err: any) {
        const errorMessage =
          err.response?.data?.message || "Errore nel salvataggio dello Step 1";
        setError(errorMessage);
        throw new Error(errorMessage);
      } finally {
        setIsLoading(false);
      }
    },
    [loadProgress]
  );

  /**
   * Salva lo Step 2 - Esami
   */
  const saveStep2 = useCallback(
    async (data: ExamData, isUpdate = false) => {
      try {
        setIsLoading(true);
        setError(null);
        const response = isUpdate
          ? await interviewService.updateStep2(data)
          : await interviewService.saveStep2(data);

        await loadProgress();
        return response;
      } catch (err: any) {
        const errorMessage =
          err.response?.data?.message || "Errore nel salvataggio dello Step 2";
        setError(errorMessage);
        throw new Error(errorMessage);
      } finally {
        setIsLoading(false);
      }
    },
    [loadProgress]
  );

  /**
   * Salva lo Step 3 - Interessi Professionali
   */
  const saveStep3 = useCallback(
    async (data: InterestsData, isUpdate = false) => {
      try {
        setIsLoading(true);
        setError(null);
        const response = isUpdate
          ? await interviewService.updateStep3(data)
          : await interviewService.saveStep3(data);

        await loadProgress();
        return response;
      } catch (err: any) {
        const errorMessage =
          err.response?.data?.message || "Errore nel salvataggio dello Step 3";
        setError(errorMessage);
        throw new Error(errorMessage);
      } finally {
        setIsLoading(false);
      }
    },
    [loadProgress]
  );

  /**
   * Salva lo Step 4 - Esperienze Pratiche
   */
  const saveStep4 = useCallback(
    async (data: ExperiencesData, isUpdate = false) => {
      try {
        setIsLoading(true);
        setError(null);
        const response = isUpdate
          ? await interviewService.updateStep4(data)
          : await interviewService.saveStep4(data);

        await loadProgress();
        return response;
      } catch (err: any) {
        const errorMessage =
          err.response?.data?.message || "Errore nel salvataggio dello Step 4";
        setError(errorMessage);
        throw new Error(errorMessage);
      } finally {
        setIsLoading(false);
      }
    },
    [loadProgress]
  );

  /**
   * Salva lo Step 5 - Skills Tecniche
   */
  const saveStep5 = useCallback(
    async (data: SkillsData, isUpdate = false) => {
      try {
        setIsLoading(true);
        setError(null);
        const response = isUpdate
          ? await interviewService.updateStep5(data)
          : await interviewService.saveStep5(data);

        await loadProgress();
        return response;
      } catch (err: any) {
        const errorMessage =
          err.response?.data?.message || "Errore nel salvataggio dello Step 5";
        setError(errorMessage);
        throw new Error(errorMessage);
      } finally {
        setIsLoading(false);
      }
    },
    [loadProgress]
  );

  /**
   * Completa l'intervista
   */
  const completeInterview = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      const response = await interviewService.completeInterview();
      await loadProgress();
      return response;
    } catch (err: any) {
      const errorMessage =
        err.response?.data?.message ||
        "Errore nel completamento dell'intervista";
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  }, [loadProgress]);

  /**
   * Verifica quale step è completato
   */
  const isStepCompleted = useCallback(
    (step: number): boolean => {
      return interviewData?.completedSteps?.includes(step) || false;
    },
    [interviewData]
  );

  return {
    // Stato
    interviewData,
    currentStep,
    isLoading,
    error,

    // Metodi
    loadProgress,
    saveStep1,
    saveStep2,
    saveStep3,
    saveStep4,
    saveStep5,
    completeInterview,
    isStepCompleted,
    goToNextStep,
    goToPreviousStep,
  };
};
