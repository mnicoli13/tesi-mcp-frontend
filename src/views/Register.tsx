import { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
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
} from '@mui/material';
import { 
  PersonAddRounded as RegisterIcon,
  Visibility,
  VisibilityOff,
} from '@mui/icons-material';
import { useRegister } from '../hooks';

/**
 * Pagina di Registrazione
 * 
 * Features:
 * - Form completo con validazione
 * - Toggle visibilità password
 * - Conferma password
 * - Gestione errori e loading states
 * - Success redirect a /login
 * - Link a pagina login
 * 
 * La logica di business è gestita dal custom hook useRegister
 */
export default function Register() {
  const {
    form,
    isSubmitting,
    successMessage,
    error,
    clearError,
    onSubmit
  } = useRegister();
  
  const { register, formState: { errors } } = form;
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleTogglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const handleToggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword((prev) => !prev);
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'background.default',
        py: 4,
      }}
    >
      <Container maxWidth="md">
        <Card elevation={2}>
          <CardContent sx={{ p: 4 }}>
            {/* Header */}
            <Box sx={{ textAlign: 'center', mb: 4 }}>
              <RegisterIcon
                sx={{
                  fontSize: 56,
                  color: 'secondary.main',
                  mb: 2,
                }}
              />
              <Typography variant="h4" component="h1" gutterBottom>
                Registrati
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Crea il tuo account per iniziare il career coaching
              </Typography>
            </Box>

            {/* Success Alert */}
            {successMessage && (
              <Alert severity="success" sx={{ mb: 3 }}>
                {successMessage}
              </Alert>
            )}

            {/* Error Alert */}
            {error && (
              <Alert severity="error" sx={{ mb: 3 }} onClose={clearError}>
                {error}
              </Alert>
            )}

            {/* Form */}
            <Box
              component="form"
              onSubmit={onSubmit}
              noValidate
            >
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                {/* Nome e Cognome */}
                <Box
                  sx={{
                    display: 'grid',
                    gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' },
                    gap: 2,
                  }}
                >
                  <TextField
                    {...register('firstName')}
                    label="Nome"
                    fullWidth
                    autoComplete="given-name"
                    autoFocus
                    error={!!errors.firstName}
                    helperText={errors.firstName?.message}
                    disabled={isSubmitting}
                  />
                  <TextField
                    {...register('lastName')}
                    label="Cognome"
                    fullWidth
                    autoComplete="family-name"
                    error={!!errors.lastName}
                    helperText={errors.lastName?.message}
                    disabled={isSubmitting}
                  />
                </Box>

                {/* Email */}
                <TextField
                  {...register('email')}
                  label="Email"
                  type="email"
                  fullWidth
                  autoComplete="email"
                  error={!!errors.email}
                  helperText={errors.email?.message}
                  disabled={isSubmitting}
                />

                {/* Password e Conferma Password */}
                <Box
                  sx={{
                    display: 'grid',
                    gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' },
                    gap: 2,
                  }}
                >
                  <TextField
                    {...register('password')}
                    label="Password"
                    type={showPassword ? 'text' : 'password'}
                    fullWidth
                    autoComplete="new-password"
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
                  />
                  <TextField
                    {...register('confirmPassword')}
                    label="Conferma Password"
                    type={showConfirmPassword ? 'text' : 'password'}
                    fullWidth
                    autoComplete="new-password"
                    error={!!errors.confirmPassword}
                    helperText={errors.confirmPassword?.message}
                    disabled={isSubmitting}
                    slotProps={{
                      input: {
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton
                              aria-label="toggle confirm password visibility"
                              onClick={handleToggleConfirmPasswordVisibility}
                              onMouseDown={(e) => e.preventDefault()}
                              edge="end"
                              disabled={isSubmitting}
                            >
                              {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                            </IconButton>
                          </InputAdornment>
                        ),
                      },
                    }}
                  />
                </Box>
              </Box>

              {/* Submit Button */}
              <Button
                type="submit"
                variant="contained"
                color="secondary"
                fullWidth
                size="large"
                disabled={isSubmitting}
                startIcon={isSubmitting ? <CircularProgress size={20} /> : <RegisterIcon />}
                sx={{ mt: 3 }}
              >
                {isSubmitting ? 'Registrazione in corso...' : 'Registrati'}
              </Button>
            </Box>

            {/* Divider */}
            <Box sx={{ mt: 3, textAlign: 'center' }}>
              <Typography variant="body2" color="text.secondary">
                Hai già un account?{' '}
                <Link
                  component={RouterLink}
                  to="/login"
                  underline="hover"
                  sx={{ fontWeight: 600 }}
                >
                  Accedi
                </Link>
              </Typography>
            </Box>
          </CardContent>
        </Card>

        {/* Footer Info */}
        <Box sx={{ mt: 3, textAlign: 'center' }}>
          <Typography variant="caption" color="text.secondary">
            Sistema di Career Coaching - Tesi Universitaria
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}
