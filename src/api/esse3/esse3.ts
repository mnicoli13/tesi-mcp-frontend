import { Exam } from "../../types/interview";
import api from "../../config/api";

// Career types for Step 1 (Login)
export interface Esse3Career {
  cdsDes: string;
  cdsId: number;
  matId: number;
  matricola: string;
  staMatDes: string;
  staStuDes: string;
  dettaglioTratto: {
    cdsCod: string;
    tipoCorsoCod: string;
    annoCorso: number;
    durataAnni: number;
    [key: string]: any;
  };
}

export interface Esse3LoginProps {
  username: string;
  password: string;
}

export interface Esse3LoginResponse {
  careers: Esse3Career[];
}

// Import types for Step 2 (Import Exams)
export type Esse3ImportExamsProps = {
  username: string;
  password: string;
  matId: number;
};

export interface Esse3ImportExamsResponse {
  exams: Exam[];
}

/**
 * Step 1: Effettua il login su ESSE3 e recupera le carriere disponibili.
 * Restituisce un array di carriere tra cui l'utente può scegliere.
 */
export const esse3Login = async ({
  username,
  password,
}: Esse3LoginProps): Promise<Esse3LoginResponse> => {
  try {
    const response = await api.post("/esse3/login", {
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
    console.error("ESSE3 login error:", errorData || errorMessage);
    throw error;
  }
};

/**
 * Step 2: Importa gli esami dal libretto ESSE3 dello studente.
 * Richiede username, password e matId della carriera selezionata.
 */
export const esse3ImportExams = async ({
  username,
  password,
  matId,
}: Esse3ImportExamsProps): Promise<Esse3ImportExamsResponse> => {
  try {
    const response = await api.post("/esse3/import-exams", {
      username,
      password,
      matId,
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
