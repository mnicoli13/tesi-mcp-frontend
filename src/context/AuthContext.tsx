import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { authService } from "../services/authService";
import type { LoginCredentials, RegisterData, AuthUser } from "../types";

/**
 * Tipo per lo stato del Context di Autenticazione
 */
interface AuthContextType {
  user: Omit<AuthUser, "token" | "refreshToken"> | null;
  loading: boolean;
  error: string | null;
  login: (credentials: LoginCredentials) => Promise<boolean>;
  register: (data: RegisterData) => Promise<boolean>;
  logout: () => void;
  clearError: () => void;
  isAuthenticated: boolean;
}

/**
 * Context di Autenticazione
 */
const AuthContext = createContext<AuthContextType | undefined>(undefined);

/**
 * Props per l'AuthProvider
 */
interface AuthProviderProps {
  children: ReactNode;
}

/**
 * Provider per il Context di Autenticazione
 * Gestisce lo stato globale dell'autenticazione dell'applicazione
 */
export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<Omit<
    AuthUser,
    "token" | "refreshToken"
  > | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  /**
   * Auto-login al mount del componente
   * Controlla se esiste un token valido in localStorage
   */
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const isAuth = authService.isAuthenticated();

        if (isAuth) {
          const currentUser = authService.getCurrentUser();
          setUser(currentUser);
        }
      } catch (err) {
        console.error("Auth check failed:", err);
        // Se c'è un errore, pulisce i dati
        authService.logout();
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  /**
   * Login utente
   * @param credentials - Email e password
   * @returns True se login riuscito
   */
  const login = async (credentials: LoginCredentials): Promise<boolean> => {
    setLoading(true);
    setError(null);

    try {
      const response = await authService.login(credentials);

      if (response.success && response.data) {
        const { token, refreshToken, ...userData } = response.data;
        setUser(userData);
        return true;
      } else {
        setError(response.error?.message || "Login fallito");
        return false;
      }
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Errore imprevisto";
      setError(errorMessage);
      return false;
    } finally {
      setLoading(false);
    }
  };

  /**
   * Registrazione nuovo utente
   * @param data - Dati di registrazione
   * @returns True se registrazione riuscita
   */
  const register = async (data: RegisterData): Promise<boolean> => {
    setLoading(true);
    setError(null);

    try {
      const response = await authService.register(data);

      if (response.success) {
        // Registrazione riuscita - redirect a login sarà gestito dal componente
        return true;
      } else {
        setError(response.error?.message || "Registrazione fallita");
        return false;
      }
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Errore imprevisto";
      setError(errorMessage);
      return false;
    } finally {
      setLoading(false);
    }
  };

  /**
   * Logout utente
   * Pulisce stato locale e localStorage
   */
  const logout = () => {
    authService.logout();
    setUser(null);
    setError(null);
  };

  /**
   * Pulisce l'errore corrente
   */
  const clearError = () => {
    setError(null);
  };

  /**
   * Valore del context
   */
  const value: AuthContextType = {
    user,
    loading,
    error,
    login,
    register,
    logout,
    clearError,
    isAuthenticated: !!user,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

/**
 * Hook personalizzato per accedere al Context di Autenticazione
 * @returns AuthContextType
 * @throws Error se usato fuori da AuthProvider
 */
export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);

  if (context === undefined) {
    throw new Error("useAuth deve essere usato all'interno di un AuthProvider");
  }

  return context;
}

export default AuthContext;
