import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useSnackbar } from "notistack";
import { esse3ImportExams } from "../../api/esse3/esse3";
import { encryptPassword } from "../../utils/crypto";
import { Exam } from "../../types/interview";

export interface Esse3ImportFormValues {
  username: string;
  password: string;
}

// Schema di validazione
const schema = yup.object({
  username: yup.string().required("Username richiesto."),
  password: yup
    .string()
    .min(6, "La password deve avere almeno 6 caratteri.")
    .required("Password richiesta."),
});

interface UseEsse3ImportProps {
  onSuccess: (exams: Exam[]) => void;
  onClose: () => void;
}

export function useEsse3Import({ onSuccess, onClose }: UseEsse3ImportProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const { enqueueSnackbar } = useSnackbar();

  const form = useForm<Esse3ImportFormValues>({
    resolver: yupResolver(schema),
    mode: "onChange",
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const togglePassword = () => setShowPassword((s) => !s);

  const onSubmit = async (values: Esse3ImportFormValues) => {
    setErrorMessage(null);

    try {
      // Cripta la password prima di inviarla al backend
      const encryptedPassword = encryptPassword(values.password);

      const response = await esse3ImportExams({
        username: values.username,
        password: encryptedPassword,
      });

      if (!response.exams || response.exams.length === 0) {
        setErrorMessage("Nessun esame trovato nel tuo libretto ESSE3.");
        return;
      }

      enqueueSnackbar(
        `${response.exams.length} esami importati con successo!`,
        {
          variant: "success",
        }
      );

      // Chiama il callback con gli esami importati
      onSuccess(response.exams);

      // Chiudi il dialog
      onClose();
    } catch (error: any) {
      console.error("Errore durante l'importazione da ESSE3:", error);

      // Gestisci errori specifici
      if (error.response?.status === 401) {
        setErrorMessage("Credenziali ESSE3 non valide. Riprova.");
      } else if (error.response?.status === 403) {
        setErrorMessage("Accesso negato. Verifica le tue credenziali ESSE3.");
      } else if (error.response?.status === 500) {
        setErrorMessage("Errore del server. Riprova tra qualche minuto.");
      } else if (error.code === "ERR_NETWORK") {
        setErrorMessage(
          "Impossibile connettersi al server. Verifica la tua connessione."
        );
      } else {
        setErrorMessage(
          error.response?.data?.message ||
            "Errore durante l'importazione. Riprova."
        );
      }
    }
  };

  return {
    ...form,
    showPassword,
    togglePassword,
    onSubmit,
    errorMessage,
  };
}
