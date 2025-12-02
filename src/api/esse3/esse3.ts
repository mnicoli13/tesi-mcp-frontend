import { Exam } from "../../types/interview";
import api from "../../config/api";

export type Esse3ImportExamsProps = {
  username: string;
  password: string;
};

export interface Esse3ImportExamsResponse {
  exams: Exam[];
}

/**
 * Importa gli esami dal libretto ESSE3 dello studente.
 * Il backend gestisce login, JWT e fetch del libretto internamente.
 */
export const esse3ImportExams = async ({
  username,
  password,
}: Esse3ImportExamsProps): Promise<Esse3ImportExamsResponse> => {
  try {
    const response = await api.post("/esse3/import-exams", {
      username,
      password,
    });

    return response.data;
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    const errorData =
      error instanceof Error && "response" in error
        ? (error as any).response?.data
        : null;
    console.error("ESSE3 import exams error:", errorData || errorMessage);
    throw error;
  }
};
