import axios from "axios";
import {
  PersonalData,
  ExamData,
  InterestsData,
  ExperiencesData,
  SkillsData,
  InterviewData,
} from "../types/interview";
import {
  InterviewProgressResponse,
  SaveStepResponse,
  ExtractSkillsResponse,
  SuggestCareersResponse,
  GenerateCVResponse,
  FindJobsParams,
  FindJobsResponse,
} from "../types/interviewApi";

/**
 * Base URL per le API - configurata tramite variabili d'ambiente
 */
const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:8080";

/**
 * Istanza axios configurata per le chiamate API dell'intervista
 */
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000,
});

/**
 * Interceptor per aggiungere automaticamente il token JWT alle richieste
 */
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("auth_token");
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

/**
 * Interview Service - Gestisce tutte le chiamate API relative all'intervista
 * Allineato con il backend NestJS InterviewController
 */
export const interviewService = {
  // ==================== PROGRESS ====================

  /**
   * GET /interview/progress
   * Recupera lo stato di avanzamento dell'intervista dell'utente autenticato
   */
  async getProgress(): Promise<InterviewData> {
    const response = await api.get("/interview/progress");
    return response.data;
  },

  // ==================== STEP 1 - ANAGRAFICA ====================

  /**
   * POST /interview/step/1
   * Salva i dati del Step 1 - Anagrafica (prima volta)
   */
  async saveStep1(data: PersonalData): Promise<SaveStepResponse> {
    const response = await api.post("/interview/step/1", data);
    return response.data;
  },

  /**
   * PUT /interview/step/1
   * Modifica i dati del Step 1 - Anagrafica (aggiornamento)
   */
  async updateStep1(data: PersonalData): Promise<SaveStepResponse> {
    const response = await api.put("/interview/step/1", data);
    return response.data;
  },

  // ==================== STEP 2 - ESAMI ====================

  /**
   * POST /interview/step/2
   * Salva i dati del Step 2 - Esami (prima volta)
   */
  async saveStep2(data: ExamData): Promise<SaveStepResponse> {
    const response = await api.post("/interview/step/2", data);
    return response.data;
  },

  /**
   * PUT /interview/step/2
   * Modifica i dati del Step 2 - Esami (aggiornamento)
   */
  async updateStep2(data: ExamData): Promise<SaveStepResponse> {
    const response = await api.put("/interview/step/2", data);
    return response.data;
  },

  // ==================== STEP 3 - INTERESSI PROFESSIONALI ====================

  /**
   * POST /interview/step/3
   * Salva i dati del Step 3 - Interessi Professionali (prima volta)
   */
  async saveStep3(data: InterestsData): Promise<SaveStepResponse> {
    const response = await api.post("/interview/step/3", data);
    return response.data;
  },

  /**
   * PUT /interview/step/3
   * Modifica i dati del Step 3 - Interessi Professionali (aggiornamento)
   */
  async updateStep3(data: InterestsData): Promise<SaveStepResponse> {
    const response = await api.put("/interview/step/3", data);
    return response.data;
  },

  // ==================== STEP 4 - ESPERIENZE PRATICHE ====================

  /**
   * POST /interview/step/4
   * Salva i dati del Step 4 - Esperienze Pratiche (prima volta)
   */
  async saveStep4(data: ExperiencesData): Promise<SaveStepResponse> {
    const response = await api.post("/interview/step/4", data);
    return response.data;
  },

  /**
   * PUT /interview/step/4
   * Modifica i dati del Step 4 - Esperienze Pratiche (aggiornamento)
   */
  async updateStep4(data: ExperiencesData): Promise<SaveStepResponse> {
    const response = await api.put("/interview/step/4", data);
    return response.data;
  },

  // ==================== STEP 5 - SKILLS TECNICHE ====================

  /**
   * POST /interview/step/5
   * Salva i dati del Step 5 - Skills Tecniche (prima volta)
   */
  async saveStep5(data: SkillsData): Promise<SaveStepResponse> {
    const response = await api.post("/interview/step/5", data);
    return response.data;
  },

  /**
   * PUT /interview/step/5
   * Modifica i dati del Step 5 - Skills Tecniche (aggiornamento)
   */
  async updateStep5(data: SkillsData): Promise<SaveStepResponse> {
    const response = await api.put("/interview/step/5", data);
    return response.data;
  },

  // ==================== COMPLETION ====================

  /**
   * POST /interview/complete
   * Completa l'intervista (tutti gli step devono essere completati)
   */
  async completeInterview(): Promise<{ success: boolean; message: string }> {
    const response = await api.post("/interview/complete");
    return response.data;
  },

  // ==================== HELPER METHODS ====================

  /**
   * Salva genericamente uno step (determina automaticamente se usare POST o PUT)
   * @param step Numero dello step (1-5)
   * @param data Dati dello step
   * @param isUpdate Se true usa PUT, altrimenti POST
   */
  async saveStep(
    step: number,
    data:
      | PersonalData
      | ExamData
      | InterestsData
      | ExperiencesData
      | SkillsData,
    isUpdate: boolean = false
  ): Promise<SaveStepResponse> {
    const method = isUpdate ? "put" : "post";
    const response = await api[method](`/interview/step/${step}`, data);
    return response.data;
  },

  /**
   * Verifica se l'intervista è stata completata
   */
  async checkInterviewCompletion(): Promise<boolean> {
    try {
      const progress = await this.getProgress();
      return progress.isCompleted;
    } catch (error) {
      return false;
    }
  },

  // ==================== MCP TOOLS ====================

  /**
   * POST /tools/extract-skills
   * Estrae le skill dal profilo utilizzando il tool MCP extract_skills_from_profile
   */
  async extractSkillsFromProfile(): Promise<ExtractSkillsResponse> {
    const response = await api.post("/tools/extract-skills");
    return response.data;
  },

  /**
   * POST /tools/suggest-careers
   * Suggerisce ruoli e job families basati su esami e voti
   */
  async suggestCareers(): Promise<SuggestCareersResponse> {
    const response = await api.post("/tools/suggest-careers");
    return response.data;
  },

  /**
   * POST /tools/generate-cv
   * Genera CV Europass strutturato dal profilo
   */
  async generateCV(): Promise<GenerateCVResponse> {
    const response = await api.post("/tools/generate-cv");
    return response.data;
  },

  /**
   * POST /tools/find-jobs
   * Cerca offerte lavoro reali (Adzuna, Jooble, JSearch)
   */
  async findJobs(params: FindJobsParams): Promise<FindJobsResponse> {
    const response = await api.post("/tools/find-jobs", params);
    return response.data;
  },
};
