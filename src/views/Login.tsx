import { useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import {
  Box,
  Card,
  CardContent,
  TextField,
  Button,
  Typography,
  Link,
  Alert,
  CircularProgress,
  Container,
  IconButton,
  InputAdornment,
} from "@mui/material";
import {
  LoginRounded as LoginIcon,
  Visibility,
  VisibilityOff,
} from "@mui/icons-material";
import { useLogin } from "../hooks";

/**
 * Pagina di Login
 *
 * Features:
 * - Form con validazione email/password
 * - Toggle visibilità password
 * - Gestione errori e loading states
 * - Link a pagina registrazione
 * - Redirect dopo login riuscito
 *
 * La logica di business è gestita dal custom hook useLogin
 */
export default function Login() {
  const { form, isSubmitting, error, clearError, onSubmit } = useLogin();
  const {
    register,
    formState: { errors },
  } = form;
  const [showPassword, setShowPassword] = useState(false);

  const handleTogglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "background.default",
        py: 4,
      }}
    >
      <Container maxWidth="sm">
        <Card elevation={2}>
          <CardContent sx={{ p: 4 }}>
            {/* Header */}
            <Box sx={{ textAlign: "center", mb: 4 }}>
              <LoginIcon
                sx={{
                  fontSize: 56,
                  color: "primary.main",
                  mb: 2,
                }}
              />
              <Typography variant="h4" component="h1" gutterBottom>
                Accedi
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Benvenuto in Student Career Coach MCP
              </Typography>
            </Box>

            {/* Error Alert */}
            {error && (
              <Alert severity="error" sx={{ mb: 3 }} onClose={clearError}>
                {error}
              </Alert>
            )}

            {/* Form */}
            <Box component="form" onSubmit={onSubmit} noValidate>
              {/* Email Field */}
              <TextField
                {...register("email")}
                label="Email"
                type="email"
                fullWidth
                autoComplete="email"
                autoFocus
                error={!!errors.email}
                helperText={errors.email?.message}
                disabled={isSubmitting}
                sx={{ mb: 2 }}
              />

              {/* Password Field */}
              <TextField
                {...register("password")}
                label="Password"
                type={showPassword ? "text" : "password"}
                fullWidth
                autoComplete="current-password"
                error={!!errors.password}
                helperText={errors.password?.message}
                disabled={isSubmitting}
                slotProps={{
                  input: {
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleTogglePasswordVisibility}
                          onMouseDown={(e) => e.preventDefault()}
                          edge="end"
                          disabled={isSubmitting}
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  },
                }}
                sx={{ mb: 3 }}
              />

              {/* Submit Button */}
              <Button
                type="submit"
                variant="contained"
                fullWidth
                size="large"
                disabled={isSubmitting}
                startIcon={
                  isSubmitting ? <CircularProgress size={20} /> : <LoginIcon />
                }
              >
                {isSubmitting ? "Accesso in corso..." : "Accedi"}
              </Button>
            </Box>

            {/* Divider */}
            <Box sx={{ mt: 3, textAlign: "center" }}>
              <Typography variant="body2" color="text.secondary">
                Non hai un account?{" "}
                <Link
                  component={RouterLink}
                  to="/register"
                  underline="hover"
                  sx={{ fontWeight: 600 }}
                >
                  Registrati
                </Link>
              </Typography>
            </Box>
          </CardContent>
        </Card>

        {/* Footer Info */}
        <Box sx={{ mt: 3, textAlign: "center" }}>
          <Typography variant="caption" color="text.secondary">
            Sistema di Career Coaching - Tesi Universitaria
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}
