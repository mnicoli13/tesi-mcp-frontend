// ============= MCP TOOLS =============

import { Exam } from "./exams";
import { Experience, Project } from "./experiences";
import { SkillsProfile } from "./skills";

// Tool: extract_skills_from_profile
export interface ExtractSkillsInput {
  exams: Exam[];
}

export interface ExtractSkillsOutput {
  hardSkills: string[];
  softSkills: string[];
}

// Tool: suggest_career_job_roles
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
  source: "adzuna" | "jooble" | "jsearch";
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
