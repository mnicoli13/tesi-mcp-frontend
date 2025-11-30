import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import {
  InterviewData,
  InterviewStep,
  PersonalData,
  ExamData,
  InterestsData,
  ExperiencesData,
  SkillsData,
  INITIAL_INTERVIEW_DATA,
} from '../types/interview';

interface InterviewContextType {
  interviewData: InterviewData;
  currentStep: InterviewStep;
  setCurrentStep: (step: InterviewStep) => void;
  savePersonalData: (data: PersonalData) => void;
  saveExamData: (data: ExamData) => void;
  saveInterestsData: (data: InterestsData) => void;
  saveExperiencesData: (data: ExperiencesData) => void;
  saveSkillsData: (data: SkillsData) => void;
  markStepCompleted: (step: InterviewStep) => void;
  isStepCompleted: (step: InterviewStep) => boolean;
  canNavigateToStep: (step: InterviewStep) => boolean;
  goToNextStep: () => void;
  goToPreviousStep: () => void;
  completeInterview: () => Promise<void>;
  resetInterview: () => void;
  isLoading: boolean;
}

const InterviewContext = createContext<InterviewContextType | undefined>(undefined);

const STORAGE_KEY = 'careercoach_interview_data';

interface InterviewProviderProps {
  children: ReactNode;
}

export const InterviewProvider: React.FC<InterviewProviderProps> = ({ children }) => {
  const [interviewData, setInterviewData] = useState<InterviewData>(INITIAL_INTERVIEW_DATA);
  const [currentStep, setCurrentStep] = useState<InterviewStep>(InterviewStep.PERSONAL);
  const [isLoading, setIsLoading] = useState(false);

  // Carica dati da localStorage al mount
  useEffect(() => {
    const savedData = localStorage.getItem(STORAGE_KEY);
    if (savedData) {
      try {
        const parsed = JSON.parse(savedData);
        setInterviewData(parsed);
        
        // Trova l'ultimo step completato
        if (parsed.completedSteps.length > 0) {
          const lastCompletedStep = Math.max(...parsed.completedSteps);
          setCurrentStep(Math.min(lastCompletedStep + 1, InterviewStep.SKILLS));
        }
      } catch (error) {
        console.error('Errore nel caricamento dei dati dell\'intervista:', error);
      }
    }
  }, []);

  // Salva in localStorage ogni volta che i dati cambiano
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(interviewData));
  }, [interviewData]);

  const savePersonalData = (data: PersonalData) => {
    setInterviewData((prev) => ({ ...prev, personal: data }));
  };

  const saveExamData = (data: ExamData) => {
    setInterviewData((prev) => ({ ...prev, exams: data }));
  };

  const saveInterestsData = (data: InterestsData) => {
    setInterviewData((prev) => ({ ...prev, interests: data }));
  };

  const saveExperiencesData = (data: ExperiencesData) => {
    setInterviewData((prev) => ({ ...prev, experiences: data }));
  };

  const saveSkillsData = (data: SkillsData) => {
    setInterviewData((prev) => ({ ...prev, skills: data }));
  };

  const markStepCompleted = (step: InterviewStep) => {
    setInterviewData((prev) => {
      const completedSteps = prev.completedSteps.includes(step)
        ? prev.completedSteps
        : [...prev.completedSteps, step];
      return { ...prev, completedSteps };
    });
  };

  const isStepCompleted = (step: InterviewStep): boolean => {
    return interviewData.completedSteps.includes(step);
  };

  const canNavigateToStep = (step: InterviewStep): boolean => {
    // Può navigare se lo step è completato o se è il successivo all'ultimo completato
    if (step === InterviewStep.PERSONAL) return true;
    
    const previousStep = step - 1;
    return isStepCompleted(previousStep);
  };

  const goToNextStep = () => {
    if (currentStep < InterviewStep.SKILLS) {
      setCurrentStep(currentStep + 1);
    }
  };

  const goToPreviousStep = () => {
    if (currentStep > InterviewStep.PERSONAL) {
      setCurrentStep(currentStep - 1);
    }
  };

  const completeInterview = async (): Promise<void> => {
    setIsLoading(true);
    try {
      // Invia richiesta di completamento al backend
      const { interviewService } = await import('../services/interviewService');
      await interviewService.completeInterview();
      
      setInterviewData((prev) => ({ ...prev, isCompleted: true }));
      
      // Mantieni i dati in localStorage per permettere revisione
      // Se vuoi pulirli dopo il completamento, decommenta la riga seguente:
      // localStorage.removeItem(STORAGE_KEY);
    } catch (error) {
      console.error('Errore nel completamento dell\'intervista:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const resetInterview = () => {
    setInterviewData(INITIAL_INTERVIEW_DATA);
    setCurrentStep(InterviewStep.PERSONAL);
    localStorage.removeItem(STORAGE_KEY);
  };

  return (
    <InterviewContext.Provider
      value={{
        interviewData,
        currentStep,
        setCurrentStep,
        savePersonalData,
        saveExamData,
        saveInterestsData,
        saveExperiencesData,
        saveSkillsData,
        markStepCompleted,
        isStepCompleted,
        canNavigateToStep,
        goToNextStep,
        goToPreviousStep,
        completeInterview,
        resetInterview,
        isLoading,
      }}
    >
      {children}
    </InterviewContext.Provider>
  );
};

export const useInterview = (): InterviewContextType => {
  const context = useContext(InterviewContext);
  if (!context) {
    throw new Error('useInterview deve essere usato all\'interno di InterviewProvider');
  }
  return context;
};
