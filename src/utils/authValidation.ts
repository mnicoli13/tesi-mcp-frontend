import { authService } from "../services/authService";
import { isTokenExpiringSoon } from "./tokenValidation";

/**
 * Risultato della validazione dell'autenticazione
 */
export interface AuthValidationResult {
  success: boolean;
  token?: string;
  errorMessage?: string;
  shouldRedirect?: boolean;
  redirectDelay?: number;
}

/**
 * Verifica che l'utente sia autenticato e che esista un token valido
 * @returns Risultato della validazione con token o messaggio d'errore
 */
export async function validateAuthentication(): Promise<AuthValidationResult> {
  const token = localStorage.getItem("auth_token");

  if (!authService.isAuthenticated() || !token) {
    console.error("User not authenticated");
    return {
      success: false,
      errorMessage:
        "Devi effettuare il login per utilizzare questa funzionalità.",
    };
  }

  return {
    success: true,
    token,
  };
}

/**
 * Assicura che il token sia valido, eseguendo un refresh proattivo se necessario
 * @param token - Token JWT da validare
 * @param bufferMinutes - Minuti prima della scadenza per eseguire il refresh (default: 5)
 * @returns Risultato della validazione con token aggiornato o messaggio d'errore
 */
export async function ensureValidToken(
  token: string,
  bufferMinutes: number = 5
): Promise<AuthValidationResult> {
  // Se il token non sta per scadere, è tutto OK
  if (!isTokenExpiringSoon(token, bufferMinutes)) {
    return {
      success: true,
      token,
    };
  }

  console.log("Token expiring soon, refreshing proactively...");

  try {
    const refreshResponse = await authService.refreshToken();

    if (refreshResponse.success && refreshResponse.data) {
      // Il token è stato aggiornato in localStorage da authService.refreshToken()
      const newToken = refreshResponse.data.token;
      console.log("Token refreshed successfully");

      return {
        success: true,
        token: newToken,
      };
    } else {
      // Refresh fallito
      console.error("Token refresh failed");

      return {
        success: false,
        errorMessage: "Sessione scaduta. Effettua nuovamente il login.",
        shouldRedirect: true,
        redirectDelay: 2000,
      };
    }
  } catch (error) {
    console.error("Error during token refresh:", error);

    return {
      success: false,
      errorMessage:
        "Errore durante il refresh del token. Riprova o effettua il login.",
    };
  }
}

/**
 * Funzione completa che valida l'autenticazione e assicura che il token sia valido
 * Combina validateAuthentication e ensureValidToken
 * @param bufferMinutes - Minuti prima della scadenza per eseguire il refresh (default: 5)
 * @returns Risultato della validazione con token valido o messaggio d'errore
 */
export async function validateAndEnsureToken(
  bufferMinutes: number = 5
): Promise<AuthValidationResult> {
  // Prima verifica che l'utente sia autenticato
  const authResult = await validateAuthentication();
  if (!authResult.success || !authResult.token) {
    return authResult;
  }

  // Poi assicura che il token sia valido (refresh se necessario)
  return ensureValidToken(authResult.token, bufferMinutes);
}
