// ============= EXPERIENCES =============

export interface Project {
  id?: string;
  title: string;
  description: string;
  type: "university" | "personal";
  technologies?: string[];
  githubUrl?: string;
  startDate?: string;
  endDate?: string;
}

export interface Experience {
  id?: string;
  title: string;
  company: string;
  type: "internship" | "part-time" | "full-time" | "freelance";
  description: string;
  startDate: string;
  endDate?: string; // Undefined se ancora in corso
  location?: string;
}
