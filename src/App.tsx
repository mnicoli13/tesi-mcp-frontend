import { RouterProvider } from "react-router-dom";
import router from "./routes";
import { SnackbarProvider } from "notistack";
import { AuthProvider } from "./context/AuthContext";

export default function App() {
  return (
    <SnackbarProvider autoHideDuration={3000}>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </SnackbarProvider>
  );
}
