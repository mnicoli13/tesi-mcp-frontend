/**
 * TypeScript Types and Interfaces for Career Coach MCP Frontend
 */

// ============= USER PROFILE =============

export interface UserProfile {
  id: string;
  firstName: string;
  lastName: string;
  age: number;
  university: string;
  degree: 'bachelor' | 'master';
  courseOfStudy: string;
  graduationYear: number;
  email?: string;
  phone?: string;
}

// ============= EXAMS =============

export interface Exam {
  id?: string;
  name: string;
  code?: string;
  grade: number; // Voto (18-30)
  ects: number; // CFU
  description?: string;
  preferred?: boolean; // Marcato come preferito dall'utente
  reasoning?: string; // Perché è stato marcato come preferito
}

export interface StudentExam extends Exam {
  userId: string;
  semester?: string;
  academicYear?: string;
}

// ============= CAREER INTERESTS =============

export type WorkStyle = 'remote' | 'hybrid' | 'onsite';
export type CompanyType = 'startup' | 'corporate' | 'consulting' | 'scaleup' | 'agency';

export interface CareerInterests {
  areas: string[]; // Es: ["AI", "Data Science", "Cybersecurity"]
  preferredCompanyTypes: CompanyType[];
  workStyle: WorkStyle;
  locations: string[]; // Es: ["Milano", "Remoto", "Estero"]
  salaryExpectations?: {
    min?: number;
    max?: number;
  };
}

// ============= EXPERIENCES =============

export interface Project {
  id?: string;
  title: string;
  description: string;
  type: 'university' | 'personal';
  technologies?: string[];
  githubUrl?: string;
  startDate?: string;
  endDate?: string;
}

export interface Experience {
  id?: string;
  title: string;
  company: string;
  type: 'internship' | 'part-time' | 'full-time' | 'freelance';
  description: string;
  startDate: string;
  endDate?: string; // Undefined se ancora in corso
  location?: string;
}

// ============= SKILLS =============

export interface Skill {
  id?: string;
  name: string;
  category: 'programming' | 'framework' | 'database' | 'devops' | 'other';
  proficiency?: 'beginner' | 'intermediate' | 'advanced' | 'expert';
}

export interface Language {
  name: string;
  level: 'A1' | 'A2' | 'B1' | 'B2' | 'C1' | 'C2' | 'native';
}

export interface SkillsProfile {
  hardSkills: Skill[];
  softSkills: string[]; // Es: ["Problem solving", "Teamwork"]
  languages: Language[];
}

// ============= MCP TOOLS =============

// Tool: extract_skills_from_profile
export interface ExtractSkillsInput {
  exams: Exam[];
}

export interface ExtractSkillsOutput {
  hardSkills: string[];
  softSkills: string[];
}

// Tool: suggest_career_job_families
export interface SuggestCareerInput {
  exams: Exam[];
}

export interface CareerRole {
  name: string;
  reason: string;
  matchScore: number; // 0-100
}

export interface SuggestCareerOutput {
  jobFamilies: string[];
  roles: CareerRole[];
}

// Tool: generate_cv_europass
export interface GenerateCVInput {
  profileSummary: string;
  education: any[];
  skills: SkillsProfile;
  projects: Project[];
  experience: Experience[];
}

export interface GenerateCVOutput {
  sections: Record<string, string>; // Key: section name, Value: section content
}

// Tool: find_jobs
export interface FindJobsInput {
  query: string;
  location: string;
  remote?: boolean;
  maxResults?: number;
}

export interface JobOffer {
  title: string;
  company: string;
  location: string;
  source: 'adzuna' | 'jooble' | 'jsearch';
  url: string;
  descriptionSnippet: string;
  salary?: string;
  postedDate?: string;
}

export interface FindJobsOutput {
  jobs: JobOffer[];
}

// Generic MCP Tool Response
export interface MCPToolResponse<T> {
  success: boolean;
  data: T;
  error?: string;
  metadata?: {
    executionTime?: number;
    toolName?: string;
  };
}

// ============= CHAT =============

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: Date;
  toolCalls?: ToolCall[];
}

export interface ToolCall {
  toolName: string;
  input: any;
  output: any;
  status: 'pending' | 'success' | 'error';
}

// ============= INTERVIEW STEPS =============

export type InterviewStep = 1 | 2 | 3 | 4 | 5;

export interface InterviewProgress {
  currentStep: InterviewStep;
  completedSteps: InterviewStep[];
  canProceed: boolean;
}

export interface InterviewData {
  step1?: UserProfile;
  step2?: {
    exams: Exam[];
    esse3Connected: boolean;
  };
  step3?: CareerInterests;
  step4?: {
    projects: Project[];
    experiences: Experience[];
  };
  step5?: SkillsProfile;
}

// ============= API RESPONSES =============

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: {
    message: string;
    code?: string;
  };
  timestamp?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
  hasMore: boolean;
}

// ============= AUTH =============

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData extends LoginCredentials {
  firstName: string;
  lastName: string;
  confirmPassword: string;
}

export interface AuthUser {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  token: string;
  refreshToken?: string;
}

// ============= FORM VALIDATION =============

export interface FormErrors {
  [key: string]: string | undefined;
}

export interface ValidationResult {
  isValid: boolean;
  errors: FormErrors;
}
