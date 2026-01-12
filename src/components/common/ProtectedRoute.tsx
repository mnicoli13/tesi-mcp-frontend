import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { Box, CircularProgress } from "@mui/material";
import { useAuth } from "../../context/AuthContext";

/**
 * Props per ProtectedRoute
 */
interface ProtectedRouteProps {
  children: React.ReactNode;
}

/**
 * Componente wrapper per proteggere route che richiedono autenticazione
 *
 * Comportamento:
 * - Se utente autenticato: mostra children
 * - Se non autenticato: redirect a /login
 * - Durante verifica auth: mostra loading spinner
 *
 * @example
 * <ProtectedRoute>
 *   <ChatPage />
 * </ProtectedRoute>
 */
export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { isAuthenticated, loading } = useAuth();
  const location = useLocation();

  // Durante il check di autenticazione, mostra loading
  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh",
          backgroundColor: "background.default",
        }}
      >
        <CircularProgress size={48} />
      </Box>
    );
  }

  // Se non autenticato, redirect a login con location state per redirect dopo login
  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Utente autenticato - mostra contenuto protetto
  return <>{children}</>;
}
