import { useState, useCallback, useEffect } from 'react';
import { interviewService } from '../services/interviewService';
import { InterviewProgressResponse } from '../types/interviewApi';
import {
  PersonalData,
  ExamData,
  InterestsData,
  ExperiencesData,
  SkillsData,
} from '../types/interview';

/**
 * Hook personalizzato per gestire l'intervista
 * Fornisce metodi per salvare/aggiornare ogni step e tracciare il progresso
 */
export const useInterview = () => {
  const [progress, setProgress] = useState<InterviewProgressResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  /**
   * Carica il progresso dell'intervista all'avvio
   */
  useEffect(() => {
    loadProgress();
  }, []);

  /**
   * Carica il progresso dell'intervista
   */
  const loadProgress = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await interviewService.getProgress();
      setProgress(data);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Errore nel caricamento del progresso');
      console.error('Error loading progress:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  /**
   * Salva lo Step 1 - Anagrafica
   */
  const saveStep1 = useCallback(async (data: PersonalData, isUpdate = false) => {
    try {
      setLoading(true);
      setError(null);
      const response = isUpdate 
        ? await interviewService.updateStep1(data)
        : await interviewService.saveStep1(data);
      
      // Ricarica il progresso dopo il salvataggio
      await loadProgress();
      return response;
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || 'Errore nel salvataggio dello Step 1';
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  }, [loadProgress]);

  /**
   * Salva lo Step 2 - Esami
   */
  const saveStep2 = useCallback(async (data: ExamData, isUpdate = false) => {
    try {
      setLoading(true);
      setError(null);
      const response = isUpdate 
        ? await interviewService.updateStep2(data)
        : await interviewService.saveStep2(data);
      
      await loadProgress();
      return response;
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || 'Errore nel salvataggio dello Step 2';
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  }, [loadProgress]);

  /**
   * Salva lo Step 3 - Interessi Professionali
   */
  const saveStep3 = useCallback(async (data: InterestsData, isUpdate = false) => {
    try {
      setLoading(true);
      setError(null);
      const response = isUpdate 
        ? await interviewService.updateStep3(data)
        : await interviewService.saveStep3(data);
      
      await loadProgress();
      return response;
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || 'Errore nel salvataggio dello Step 3';
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  }, [loadProgress]);

  /**
   * Salva lo Step 4 - Esperienze Pratiche
   */
  const saveStep4 = useCallback(async (data: ExperiencesData, isUpdate = false) => {
    try {
      setLoading(true);
      setError(null);
      const response = isUpdate 
        ? await interviewService.updateStep4(data)
        : await interviewService.saveStep4(data);
      
      await loadProgress();
      return response;
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || 'Errore nel salvataggio dello Step 4';
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  }, [loadProgress]);

  /**
   * Salva lo Step 5 - Skills Tecniche
   */
  const saveStep5 = useCallback(async (data: SkillsData, isUpdate = false) => {
    try {
      setLoading(true);
      setError(null);
      const response = isUpdate 
        ? await interviewService.updateStep5(data)
        : await interviewService.saveStep5(data);
      
      await loadProgress();
      return response;
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || 'Errore nel salvataggio dello Step 5';
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  }, [loadProgress]);

  /**
   * Completa l'intervista
   */
  const completeInterview = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await interviewService.completeInterview();
      await loadProgress();
      return response;
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || 'Errore nel completamento dell\'intervista';
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  }, [loadProgress]);

  /**
   * Verifica quale step è completato
   */
  const isStepCompleted = useCallback((step: number): boolean => {
    return progress?.completedSteps?.includes(step) || false;
  }, [progress]);

  return {
    // Stato
    progress,
    loading,
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
  };
};
