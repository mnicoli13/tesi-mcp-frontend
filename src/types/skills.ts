// ============= SKILLS =============

export interface Skill {
  id?: string;
  name: string;
  category: "programming" | "framework" | "database" | "devops" | "other";
  proficiency?: "beginner" | "intermediate" | "advanced" | "expert";
}

export interface Language {
  name: string;
  level: "A1" | "A2" | "B1" | "B2" | "C1" | "C2" | "native";
}

export interface SkillsProfile {
  hardSkills: Skill[];
  softSkills: string[]; // Es: ["Problem solving", "Teamwork"]
  languages: Language[];
}
