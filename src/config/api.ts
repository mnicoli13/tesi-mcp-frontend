import axios, { AxiosError } from "axios";
import type { ApiResponse, RefreshTokenResponse } from "../types";

/**
 * Base URL per le API - configurata tramite variabili d'ambiente
 */
const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:8080";

/**
 * Istanza axios configurata per le chiamate API dell'intervista
 */
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 30000,
});

/**
 * Variabili per gestire il refresh e la coda di richieste
 */
let isRefreshing = false;
let failedQueue: Array<{
  resolve: (token: string) => void;
  reject: (error: any) => void;
}> = [];

/**
 * Processa la coda di richieste in attesa dopo il refresh
 */
const processQueue = (error: any, token: string | null = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token!);
    }
  });

  failedQueue = [];
};

/**
 * Interceptor per aggiungere automaticamente il token JWT alle richieste
 */
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("auth_token");
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

/**
 * Interceptor per gestire risposte e errori con refresh automatico del token
 */
api.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest: any = error.config;

    // Gestione errori HTTP
    if (error.response) {
      const status = error.response.status;

      if (status === 401 && !originalRequest._retry) {
        // Token scaduto - prova a refreshare
        if (isRefreshing) {
          // Se è già in corso un refresh, metti in coda questa richiesta
          return new Promise((resolve, reject) => {
            failedQueue.push({ resolve, reject });
          })
            .then((token) => {
              originalRequest.headers.Authorization = `Bearer ${token}`;
              return api(originalRequest);
            })
            .catch((err) => {
              return Promise.reject(err);
            });
        }

        originalRequest._retry = true;
        isRefreshing = true;

        const refreshToken = localStorage.getItem("auth_refresh_token");

        if (!refreshToken) {
          // Nessun refresh token disponibile - logout
          localStorage.removeItem("auth_token");
          localStorage.removeItem("auth_refresh_token");
          localStorage.removeItem("auth_user");
          window.location.href = "/login";
          return Promise.reject(error);
        }

        try {
          // Chiamata a /auth/refresh
          const response = await axios.post<ApiResponse<RefreshTokenResponse>>(
            `${API_BASE_URL}/auth/refresh`,
            { refreshToken },
            {
              headers: { "Content-Type": "application/json" },
            }
          );

          if (response.data.success && response.data.data) {
            const { token: newAccessToken, refreshToken: newRefreshToken } =
              response.data.data;

            // IMPORTANTE: Salva ENTRAMBI i token (token rotation)
            localStorage.setItem("auth_token", newAccessToken);
            localStorage.setItem("auth_refresh_token", newRefreshToken);

            // Aggiorna l'header della richiesta originale
            originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

            // Processa tutte le richieste in coda
            processQueue(null, newAccessToken);

            // Ripeti la richiesta originale
            return api(originalRequest);
          } else {
            throw new Error("Refresh token failed");
          }
        } catch (refreshError) {
          // Refresh fallito - logout forzato
          processQueue(refreshError, null);
          localStorage.removeItem("auth_token");
          localStorage.removeItem("auth_refresh_token");
          localStorage.removeItem("auth_user");
          window.location.href = "/login";
          return Promise.reject(refreshError);
        } finally {
          isRefreshing = false;
        }
      }
    }

    return Promise.reject(error);
  }
);

/**
 * Istanza axios per chiamate di autenticazione
 * (usa la stessa configurazione dell'istanza principale)
 */
export const authApi = api;

export default api;
