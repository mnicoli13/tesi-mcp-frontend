// ============= USER PROFILE =============

export interface UserProfile {
  id: string;
  firstName: string;
  lastName: string;
  age: number;
  university: string;
  degree: "bachelor" | "master";
  courseOfStudy: string;
  graduationYear: number;
  email?: string;
  phone?: string;
}
