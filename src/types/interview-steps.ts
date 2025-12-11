// ============= INTERVIEW STEPS =============

import { CareerInterests } from "./career-intent";
import { Exam } from "./exams";
import { Experience, Project } from "./experiences";
import { SkillsProfile } from "./skills";
import { UserProfile } from "./user-profile";

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
