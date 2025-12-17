import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useAuth } from "../../context/AuthContext";
import { loginSchema } from "../../schemas";
import type { LoginCredentials } from "../../types";
import { interviewService } from "../../services/interviewService";

/**
 * Hook personalizzato per gestire la logica di business del login
 *
 * Responsabilità:
 * - Gestione form con validazione
 * - Submit e autenticazione
 * - Redirect post-login
 * - Gestione stati di caricamento ed errori
 *
 * @returns {Object} Oggetto contenente stati e handler per il form di login
 */
export function useLogin() {
  const navigate = useNavigate();
  const { login, error, clearError } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);

  // React Hook Form con validazione Yup
  const form = useForm<LoginCredentials>({
    resolver: yupResolver(loginSchema),
    mode: "onChange",
    defaultValues: {
      email: "",
      password: "",
    },
  });

  /**
   * Note: Il redirect post-login è gestito manualmente in onSubmit
   * per verificare prima lo stato dell'intervista
   */

  /**
   * Pulisce errori al mount
   */
  useEffect(() => {
    clearError();
  }, [clearError]);

  /**
   * Handler submit form
   */
  const onSubmit = async (data: LoginCredentials) => {
    setIsSubmitting(true);
    clearError();

    try {
      const success = await login(data);

      if (success) {
        // Dopo login riuscito, verifica se intervista è completata
        const userStr = localStorage.getItem("auth_user");
        if (userStr) {
          try {
            const user = JSON.parse(userStr);
            const userId = user.id || user._id || user.userId;

            if (userId) {
              try {
                const isInterviewCompleted =
                  await interviewService.checkInterviewCompletion();

                if (isInterviewCompleted) {
                  // Intervista completata -> vai alla chat
                  navigate("/chat", { replace: true });
                } else {
                  // Intervista non completata -> vai all'intervista
                  navigate("/interview", { replace: true });
                }
              } catch (error) {
                // Se c'è un errore nel controllo, reindirizza comunque all'intervista per sicurezza
                console.error(
                  "Errore nel verificare completamento intervista:",
                  error
                );
                navigate("/interview", { replace: true });
              }
            } else {
              // Se non si riesce a ottenere userId, vai all'intervista
              navigate("/interview", { replace: true });
            }
          } catch (error) {
            // Errore nel parsing user data, vai all'intervista
            console.error("Errore nel parsing dati utente:", error);
            navigate("/interview", { replace: true });
          }
        } else {
          // Nessun dato utente trovato, vai all'intervista
          navigate("/interview", { replace: true });
        }
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    form,
    isSubmitting,
    error,
    clearError,
    onSubmit: form.handleSubmit(onSubmit),
  };
}
