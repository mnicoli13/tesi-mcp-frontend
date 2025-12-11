import { AxiosError } from "axios";
import api from "../config/api";
import type {
  LoginCredentials,
  RegisterData,
  AuthUser,
  ApiResponse,
  RefreshTokenResponse,
} from "../types";

/**
 * Servizio di autenticazione - metodi per login, registrazione, logout
 */
export const authService = {
  /**
   * Login con email e password
   * @param credentials - Email e password dell'utente
   * @returns Dati utente e token JWT
   */
  async login(credentials: LoginCredentials): Promise<ApiResponse<AuthUser>> {
    try {
      const response = await api.post<ApiResponse<AuthUser>>(
        "/auth/login",
        credentials
      );

      // Salva token e dati utente in localStorage
      if (response.data.success && response.data.data) {
        const { token, refreshToken, ...userData } = response.data.data;

        localStorage.setItem("auth_token", token);
        if (refreshToken) {
          localStorage.setItem("auth_refresh_token", refreshToken);
        }
        localStorage.setItem("auth_user", JSON.stringify(userData));
      }

      return response.data;
    } catch (error) {
      return handleAuthError(error as AxiosError, "Login fallito");
    }
  },

  /**
   * Registrazione nuovo utente
   * @param data - Dati di registrazione (nome, cognome, email, password)
   * @returns Conferma registrazione
   */
  async register(
    data: RegisterData
  ): Promise<ApiResponse<{ message: string }>> {
    try {
      const response = await api.post<ApiResponse<{ message: string }>>(
        "/auth/register",
        data
      );

      return response.data;
    } catch (error) {
      return handleAuthError(error as AxiosError, "Registrazione fallita");
    }
  },

  /**
   * Logout - pulisce localStorage e invalida token
   */
  logout(): void {
    localStorage.removeItem("auth_token");
    localStorage.removeItem("auth_refresh_token");
    localStorage.removeItem("auth_user");

    // Opzionale: chiamata API per invalidare token lato server
    // authApi.post('/auth/logout').catch(() => {});
  },

  /**
   * Refresh token JWT
   * @returns Nuovi token (access e refresh)
   */
  async refreshToken(): Promise<ApiResponse<RefreshTokenResponse>> {
    try {
      const refreshToken = localStorage.getItem("auth_refresh_token");

      if (!refreshToken) {
        throw new Error("No refresh token available");
      }

      const response = await api.post<ApiResponse<RefreshTokenResponse>>(
        "/auth/refresh",
        { refreshToken }
      );

      // Salva ENTRAMBI i nuovi token (token rotation)
      if (response.data.success && response.data.data) {
        localStorage.setItem("auth_token", response.data.data.token);
        localStorage.setItem(
          "auth_refresh_token",
          response.data.data.refreshToken
        );
      }

      return response.data;
    } catch (error) {
      return handleAuthError(error as AxiosError, "Refresh token fallito");
    }
  },

  /**
   * Controlla se utente è autenticato
   * @returns True se token presente e valido
   */
  isAuthenticated(): boolean {
    const token = localStorage.getItem("auth_token");
    const user = localStorage.getItem("auth_user");

    return !!(token && user);
  },

  /**
   * Recupera dati utente corrente da localStorage
   * @returns Dati utente o null
   */
  getCurrentUser(): Omit<AuthUser, "token" | "refreshToken"> | null {
    const userStr = localStorage.getItem("auth_user");

    if (!userStr) return null;

    try {
      return JSON.parse(userStr);
    } catch {
      return null;
    }
  },

  /**
   * Recupera token JWT corrente
   * @returns Token JWT o null
   */
  getToken(): string | null {
    return localStorage.getItem("auth_token");
  },
};

/**
 * Helper per gestire errori API in modo consistente
 * @param error - Errore axios
 * @param defaultMessage - Messaggio di fallback
 * @returns ApiResponse con errore
 */
function handleAuthError(
  error: AxiosError,
  defaultMessage: string
): ApiResponse<never> {
  if (error.response?.data) {
    const data = error.response.data as ApiResponse<never>;
    return {
      success: false,
      error: data.error || { message: defaultMessage },
    };
  }

  // Errore di rete o timeout
  if (error.code === "ECONNABORTED") {
    return {
      success: false,
      error: {
        message: "Richiesta scaduta. Riprova.",
        code: "TIMEOUT",
      },
    };
  }

  if (error.message === "Network Error") {
    return {
      success: false,
      error: {
        message: "Errore di connessione. Verifica la tua connessione internet.",
        code: "NETWORK_ERROR",
      },
    };
  }

  // Errore generico
  return {
    success: false,
    error: {
      message: defaultMessage,
      code: "UNKNOWN_ERROR",
    },
  };
}

export default authService;
