import axios from "axios";

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
  timeout: 10000,
});

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

export default api;
