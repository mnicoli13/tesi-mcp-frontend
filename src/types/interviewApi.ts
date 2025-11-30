/**
 * Tipi e interfacce per le risposte API del servizio Interview
 */

import {
  PersonalData,
  ExamData,
  InterestsData,
  ExperiencesData,
  SkillsData,
} from './interview';

/**
 * Risposta standard per il progresso dell'intervista
 */
export interface InterviewProgressResponse {
  completedSteps: number[];
  isCompleted: boolean;
  currentStep: number;
  personal?: PersonalData;
  exams?: ExamData;
  interests?: InterestsData;
  experiences?: ExperiencesData;
  skills?: SkillsData;
}

/**
 * Risposta standard per operazioni di salvataggio step
 */
export interface SaveStepResponse {
  success: boolean;
  message: string;
  step: number;
}

/**
 * Risposta per l'estrazione delle skill tramite MCP tool
 */
export interface ExtractSkillsResponse {
  hardSkills: string[];
  softSkills: string[];
}

/**
 * Ruolo suggerito con match score
 */
export interface SuggestedRole {
  title: string;
  matchScore: number;
  description: string;
}

/**
 * Risposta per i suggerimenti di carriera tramite MCP tool
 */
export interface SuggestCareersResponse {
  jobFamilies: string[];
  suggestedRoles: SuggestedRole[];
}

/**
 * Risposta per la generazione del CV Europass tramite MCP tool
 */
export interface GenerateCVResponse {
  cvUrl: string;
  cvData: any;
}

/**
 * Offerta di lavoro
 */
export interface JobListing {
  title: string;
  company: string;
  location: string;
  description: string;
  url: string;
  salary?: string;
}

/**
 * Parametri per la ricerca job
 */
export interface FindJobsParams {
  keywords?: string;
  location?: string;
  limit?: number;
}

/**
 * Risposta per la ricerca job tramite MCP tool
 */
export interface FindJobsResponse {
  jobs: JobListing[];
}
