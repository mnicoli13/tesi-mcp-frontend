import { Routes, Route, Navigate } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import Home from "../views/Home";
import Chat from "../views/Chat";
import About from "../views/About";
import Esse3 from "../views/Esse3-login";
import Login from "../views/Login";
import Register from "../views/Register";
import Interview from "../views/Interview";
import ProtectedRoute from "../components/common/ProtectedRoute";
import { useAuth } from "../context/AuthContext";

export default function AppRoutes() {
  const { isAuthenticated, loading } = useAuth();

  // Durante il loading iniziale, mostra una pagina vuota
  if (loading) {
    return null;
  }

  return (
    <Routes>
      {/* Route pubbliche - Autenticazione */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* Layout comune per route protette */}
      <Route element={<MainLayout />}>
        {/* Home - redirect basato su autenticazione */}
        <Route 
          path="/" 
          element={
            isAuthenticated ? (
              <Navigate to="/chat" replace />
            ) : (
              <Navigate to="/login" replace />
            )
          } 
        />

        {/* Route protette */}
        <Route
          path="/chat"
          element={
            <ProtectedRoute>
              <Chat />
            </ProtectedRoute>
          }
        />
        <Route
          path="/about"
          element={
            <ProtectedRoute>
              <About />
            </ProtectedRoute>
          }
        />
        <Route
          path="/esse3"
          element={
            <ProtectedRoute>
              <Esse3 />
            </ProtectedRoute>
          }
        />
        <Route
          path="/interview"
          element={
            <ProtectedRoute>
              <Interview />
            </ProtectedRoute>
          }
        />
        <Route
          path="/home"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
      </Route>

      {/* Catch-all */}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}
