import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useSnackbar } from "notistack";
import {
  esse3ImportExams,
  esse3Login,
  Esse3Career,
} from "../../api/esse3/esse3";
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
  const [currentStep, setCurrentStep] = useState<"login" | "selectCareer">(
    "login"
  );
  const [careers, setCareers] = useState<Esse3Career[]>([]);
  const [selectedCareer, setSelectedCareer] = useState<number | null>(null);
  const [credentials, setCredentials] = useState<{
    username: string;
    password: string;
  } | null>(null);
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

  // Step 1: Login and fetch careers
  const onLogin = async (values: Esse3ImportFormValues) => {
    try {
      // Cripta la password prima di inviarla al backend
      const encryptedPassword = encryptPassword(values.password);

      const response = await esse3Login({
        username: values.username,
        password: encryptedPassword,
      });

      if (!response.careers || response.careers.length === 0) {
        enqueueSnackbar("Nessuna carriera trovata per questo utente.", {
          variant: "error",
        });
        return;
      }

      // Salva le credenziali e le carriere, passa allo step 2
      setCredentials({
        username: values.username,
        password: encryptedPassword,
      });
      setCareers(response.careers);
      setCurrentStep("selectCareer");

      enqueueSnackbar(
        `${response.careers.length} carriera/e trovata/e. Seleziona quella da importare.`,
        {
          variant: "success",
        }
      );
    } catch (error: any) {
      console.error("Errore durante il login ESSE3:", error);

      const backendMessage = error.response?.data?.message;

      if (error.response?.status === 400) {
        enqueueSnackbar(
          backendMessage || "Richiesta non valida. Verifica i dati inseriti.",
          {
            variant: "error",
          }
        );
      } else if (error.response?.status === 401) {
        enqueueSnackbar(
          backendMessage ||
            "Credenziali ESSE3 non valide. Verifica username e password.",
          {
            variant: "error",
          }
        );
      } else if (error.response?.status === 403) {
        enqueueSnackbar(
          backendMessage ||
            "Accesso negato. Token scaduto o permessi insufficienti.",
          {
            variant: "error",
          }
        );
      } else if (error.response?.status === 404) {
        enqueueSnackbar(
          backendMessage ||
            "Nessuna carriera trovata. Verifica la configurazione dell'università.",
          {
            variant: "error",
          }
        );
      } else if (error.response?.status === 500) {
        enqueueSnackbar(
          backendMessage ||
            "Il server ESSE3 ha riscontrato un errore interno. Riprova più tardi.",
          {
            variant: "error",
          }
        );
      } else if (error.response?.status === 503) {
        enqueueSnackbar(
          backendMessage ||
            "Il servizio ESSE3 non è al momento raggiungibile. Riprova più tardi.",
          {
            variant: "error",
          }
        );
      } else if (error.code === "ERR_NETWORK") {
        enqueueSnackbar(
          "Impossibile connettersi al server. Verifica la tua connessione internet.",
          {
            variant: "error",
          }
        );
      } else {
        enqueueSnackbar(backendMessage || "Errore durante il login. Riprova.", {
          variant: "error",
        });
      }
    }
  };

  // Go back to login step
  const handleBack = () => {
    setCurrentStep("login");
    setCareers([]);
    setSelectedCareer(null);
    setCredentials(null);
  };

  // Step 2: Import exams with selected career
  const onSubmit = async () => {
    if (!selectedCareer) {
      enqueueSnackbar("Seleziona una carriera prima di procedere.", {
        variant: "warning",
      });
      return;
    }

    if (!credentials) {
      enqueueSnackbar("Errore: credenziali mancanti. Riprova dal login.", {
        variant: "error",
      });
      handleBack();
      return;
    }

    try {
      const response = await esse3ImportExams({
        username: credentials.username,
        password: credentials.password,
        matId: selectedCareer,
      });

      if (!response.exams || response.exams.length === 0) {
        enqueueSnackbar("Nessun esame trovato nel tuo libretto ESSE3.", {
          variant: "error",
        });
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

      // Reset and close
      handleBack();
      onClose();
    } catch (error: any) {
      console.error("Errore durante l'importazione da ESSE3:", error);

      // Estrai il messaggio dal backend (se disponibile)
      const backendMessage = error.response?.data?.message;

      // Gestisci errori specifici in base allo status HTTP
      if (error.response?.status === 400) {
        // Esse3BadRequestException - Richiesta malformata o dati invalidi
        enqueueSnackbar(
          backendMessage || "Richiesta non valida. Verifica i dati inseriti.",
          {
            variant: "error",
          }
        );
      } else if (error.response?.status === 401) {
        // Esse3UnauthorizedException - Credenziali ESSE3 non valide
        enqueueSnackbar(
          backendMessage ||
            "Credenziali ESSE3 non valide. Verifica username e password.",
          {
            variant: "error",
          }
        );
      } else if (error.response?.status === 403) {
        // Esse3ForbiddenException - Permessi insufficienti o JWT scaduto
        enqueueSnackbar(
          backendMessage ||
            "Accesso negato. Token scaduto o permessi insufficienti.",
          {
            variant: "error",
          }
        );
      } else if (error.response?.status === 404) {
        // Esse3NotFoundException - Università, matricola o libretto non trovati
        enqueueSnackbar(
          backendMessage ||
            "Risorsa non trovata. Verifica la configurazione dell'università.",
          {
            variant: "error",
          }
        );
      } else if (error.response?.status === 500) {
        // Esse3InternalServerException - Errori interni del server ESSE3
        enqueueSnackbar(
          backendMessage ||
            "Il server ESSE3 ha riscontrato un errore interno. Riprova più tardi.",
          {
            variant: "error",
          }
        );
      } else if (error.response?.status === 503) {
        // Esse3ServiceUnavailableException - Server ESSE3 non raggiungibile
        enqueueSnackbar(
          backendMessage ||
            "Il servizio ESSE3 non è al momento raggiungibile. Riprova più tardi.",
          {
            variant: "error",
          }
        );
      } else if (error.code === "ERR_NETWORK") {
        // Errore di rete (client-side)
        enqueueSnackbar(
          "Impossibile connettersi al server. Verifica la tua connessione internet.",
          {
            variant: "error",
          }
        );
      } else {
        // Errore generico o imprevisto
        enqueueSnackbar(
          backendMessage || "Errore durante l'importazione. Riprova.",
          {
            variant: "error",
          }
        );
      }
    }
  };

  return {
    ...form,
    showPassword,
    togglePassword,
    currentStep,
    careers,
    selectedCareer,
    setSelectedCareer,
    onLogin,
    onSubmit,
    handleBack,
  };
}
