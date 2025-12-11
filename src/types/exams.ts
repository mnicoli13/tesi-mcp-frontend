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