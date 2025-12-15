import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Box,
  Typography,
  Alert,
  CircularProgress,
  InputAdornment,
  IconButton,
  Stack,
  FormLabel,
} from "@mui/material";
import { Visibility, VisibilityOff, CloudUpload } from "@mui/icons-material";
import { Controller } from "react-hook-form";
import { useEsse3Import } from "../../../hooks/esse3/useEsse3Import";
import { Exam } from "../../../types/interview";

interface Esse3ImportDialogProps {
  open: boolean;
  onClose: () => void;
  onImportSuccess: (exams: Exam[]) => void;
}

const Esse3ImportDialog: React.FC<Esse3ImportDialogProps> = ({
  open,
  onClose,
  onImportSuccess,
}) => {
  const {
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
    showPassword,
    togglePassword,
    onSubmit,
  } = useEsse3Import({ onSuccess: onImportSuccess, onClose });

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>
        <Box display="flex" alignItems="center" gap={1}>
          <CloudUpload color="primary" />
          <Typography variant="h6">Importa da ESSE3</Typography>
        </Box>
      </DialogTitle>

      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <DialogContent>
          <Typography variant="body2" color="text.secondary" mb={3}>
            Inserisci le tue credenziali ESSE3 per importare automaticamente i
            tuoi esami e voti. Le credenziali non verranno salvate.
          </Typography>

          {/* Username */}
          <Controller
            name="username"
            control={control}
            render={({ field }) => (
              <Stack spacing={1}>
                <FormLabel>Username ESSE3</FormLabel>
                <TextField
                  {...field}
                  fullWidth
                  error={!!errors.username}
                  helperText={errors.username?.message}
                  required
                  autoComplete="username"
                  disabled={isSubmitting}
                  sx={{ mb: 2 }}
                />
              </Stack>
            )}
          />

          {/* Password */}
          <Controller
            name="password"
            control={control}
            render={({ field }) => (
              <Stack spacing={1}>
                <FormLabel>Password</FormLabel>
                <TextField
                  {...field}
                  fullWidth
                  type={showPassword ? "text" : "password"}
                  error={!!errors.password}
                  helperText={errors.password?.message}
                  required
                  autoComplete="current-password"
                  disabled={isSubmitting}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label={
                            showPassword
                              ? "Nascondi password"
                              : "Mostra password"
                          }
                          onClick={togglePassword}
                          edge="end"
                          disabled={isSubmitting}
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              </Stack>
            )}
          />

          <Alert severity="info" sx={{ mt: 2 }}>
            <strong>Privacy:</strong> Le tue credenziali saranno utilizzate solo
            per importare i dati e non verranno memorizzate.
          </Alert>
        </DialogContent>

        <DialogActions>
          <Button onClick={onClose} disabled={isSubmitting}>
            Annulla
          </Button>
          <Button
            type="submit"
            variant="contained"
            disabled={isSubmitting}
            startIcon={
              isSubmitting ? (
                <CircularProgress size={20} color="inherit" />
              ) : (
                <CloudUpload />
              )
            }
          >
            {isSubmitting ? "Importazione..." : "Importa Esami"}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default Esse3ImportDialog;
