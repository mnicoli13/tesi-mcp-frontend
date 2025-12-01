// Types per i dati dell'intervista in 5 step

export type DegreeType = "bachelor" | "master" | "unselected";

export enum WorkStyle {
  REMOTE = "remote",
  HYBRID = "hybrid",
  ONSITE = "onsite",
}

export enum CompanyType {
  STARTUP = "startup",
  CORPORATE = "corporate",
  CONSULTING = "consulting",
  SME = "sme",
}

export enum EnglishLevel {
  A1 = "A1",
  A2 = "A2",
  B1 = "B1",
  B2 = "B2",
  C1 = "C1",
  C2 = "C2",
  NATIVE = "native",
}

export enum SkillLevel {
  BASIC = "basic",
  INTERMEDIATE = "intermediate",
  ADVANCED = "advanced",
}

// Step 1 - Dati Anagrafici
export interface PersonalData {
  firstName: string;
  lastName: string;
  age: number;
  university: string;
  degreeType: DegreeType;
  courseOfStudy: string;
  graduationYear: number;
}

// Step 2 - Esami e Voti
export interface Exam {
  id?: string;
  name: string;
  grade: number;
  ects: number;
  preferred?: boolean;
}

export interface ExamData {
  exams: Exam[];
  importedFromEsse3: boolean;
}

// Step 3 - Interessi Professionali
export interface InterestsData {
  areasOfInterest: string[]; // AI, Data Science, Cybersecurity, Web, Cloud, etc.
  companyType: CompanyType[];
  workStyle: WorkStyle;
  geographicPreferences: string[]; // Città o "Estero" o "Ovunque"
}

// Step 4 - Esperienze Pratiche
export interface Project {
  id?: string;
  name: string;
  description: string;
  technologies: string[];
  githubLink?: string;
  type: "university" | "personal";
}

export interface Internship {
  id?: string;
  company: string;
  role: string;
  startDate: string;
  endDate: string;
  description: string;
  technologies: string[];
}

export interface ExperiencesData {
  universityProjects: Project[];
  personalProjects: Project[];
  internships: Internship[];
}

// Step 5 - Skills Tecniche e Linguistiche
export interface ProgrammingLanguageSkill {
  name: string;
  level: SkillLevel;
}

export interface SkillsData {
  programmingLanguages: ProgrammingLanguageSkill[];
  frameworks: string[];
  databases: string[];
  devOps: string[];
  englishLevel: EnglishLevel;
  inferredFromProfile: boolean; // Se le skill sono state inferite dal tool
}

// Dati completi dell'intervista
export interface InterviewData {
  completedSteps: number[];
  isCompleted: boolean;
  personal?: PersonalData;
  exams?: ExamData;
  interests?: InterestsData;
  experiences?: ExperiencesData;
  skills?: SkillsData;
}

// Step dell'intervista
export enum InterviewStep {
  PERSONAL = 0,
  EXAMS = 1,
  INTERESTS = 2,
  EXPERIENCES = 3,
  SKILLS = 4,
}

export const INTERVIEW_STEP_LABELS = [
  "Anagrafica",
  "Esami e Voti",
  "Interessi Professionali",
  "Esperienze Pratiche",
  "Skills Tecniche",
];

// Stato iniziale dell'intervista
export const INITIAL_INTERVIEW_DATA: InterviewData = {
  personal: undefined,
  exams: undefined,
  interests: undefined,
  experiences: undefined,
  skills: undefined,
  completedSteps: [],
  isCompleted: false,
};
