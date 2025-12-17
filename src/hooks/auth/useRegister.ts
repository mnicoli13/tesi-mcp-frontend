import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useAuth } from "../../context/AuthContext";
import { registerSchema } from "../../schemas";
import type { RegisterData } from "../../types";

/**
 * Hook personalizzato per gestire la logica di business della registrazione
 *
 * Responsabilità:
 * - Gestione form con validazione
 * - Submit e registrazione utente
 * - Redirect post-registrazione
 * - Gestione stati di caricamento, successo ed errori
 *
 * @returns {Object} Oggetto contenente stati e handler per il form di registrazione
 */
export function useRegister() {
  const navigate = useNavigate();
  const {
    register: registerUser,
    error,
    clearError,
    isAuthenticated,
  } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  // React Hook Form con validazione Yup
  const form = useForm<RegisterData>({
    resolver: yupResolver(registerSchema),
    mode: "onChange",
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  /**
   * Redirect se già autenticato
   */
  useEffect(() => {
    if (isAuthenticated) {
      navigate("/chat", { replace: true });
    }
  }, [isAuthenticated, navigate]);

  /**
   * Pulisce errori al mount
   */
  useEffect(() => {
    clearError();
  }, [clearError]);

  /**
   * Handler submit form
   */
  const onSubmit = async (data: RegisterData) => {
    setIsSubmitting(true);
    clearError();
    setSuccessMessage(null);

    try {
      const success = await registerUser(data);

      if (success) {
        setSuccessMessage(
          "Registrazione completata! Reindirizzamento al login..."
        );

        // Redirect a login dopo 2 secondi
        setTimeout(() => {
          navigate("/login", { replace: true });
        }, 2000);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    form,
    isSubmitting,
    successMessage,
    error,
    clearError,
    onSubmit: form.handleSubmit(onSubmit),
  };
}
