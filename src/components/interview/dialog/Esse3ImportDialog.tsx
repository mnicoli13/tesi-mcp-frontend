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
  RadioGroup,
  FormControlLabel,
  Radio,
  Card,
  CardContent,
  Chip,
} from "@mui/material";
import {
  Visibility,
  VisibilityOff,
  CloudUpload,
  ArrowBack,
} from "@mui/icons-material";
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
    currentStep,
    careers,
    selectedCareer,
    setSelectedCareer,
    onLogin,
    onSubmit,
    handleBack,
  } = useEsse3Import({ onSuccess: onImportSuccess, onClose });

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>
        <Box display="flex" alignItems="center" gap={1}>
          <CloudUpload color="primary" />
          <Typography variant="h6">
            {currentStep === "login"
              ? "Importa da ESSE3"
              : "Seleziona Carriera"}
          </Typography>
        </Box>
      </DialogTitle>

      {currentStep === "login" ? (
        // Step 1: Login Form
        <form onSubmit={handleSubmit(onLogin)} noValidate>
          <DialogContent>
            <Typography variant="body2" color="text.secondary" mb={3}>
              Inserisci le tue credenziali ESSE3 per accedere e visualizzare le
              tue carriere disponibili.
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
              <strong>Privacy:</strong> Le tue credenziali saranno utilizzate
              solo per importare i dati e non verranno memorizzate.
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
              {isSubmitting ? "Accesso in corso..." : "Accedi"}
            </Button>
          </DialogActions>
        </form>
      ) : (
        // Step 2: Career Selection
        <>
          <DialogContent>
            <Typography variant="body2" color="text.secondary" mb={3}>
              Seleziona la carriera da cui vuoi importare gli esami:
            </Typography>

            <RadioGroup
              value={selectedCareer?.toString() || ""}
              onChange={(e) => setSelectedCareer(Number(e.target.value))}
            >
              <Stack spacing={2}>
                {careers.map((career) => (
                  <Card
                    key={career.matId}
                    variant="outlined"
                    sx={{
                      cursor: "pointer",
                      border: selectedCareer === career.matId ? 2 : 1,
                      borderColor:
                        selectedCareer === career.matId
                          ? "primary.main"
                          : "divider",
                      "&:hover": {
                        borderColor: "primary.main",
                        boxShadow: 1,
                      },
                    }}
                    onClick={() => setSelectedCareer(career.matId)}
                  >
                    <CardContent>
                      <FormControlLabel
                        value={career.matId.toString()}
                        control={<Radio />}
                        label={
                          <Box>
                            <Typography variant="subtitle1" fontWeight="bold">
                              {career.cdsDes}
                            </Typography>
                            <Typography
                              variant="body2"
                              color="text.secondary"
                              mb={1}
                            >
                              Codice: {career.dettaglioTratto.cdsCod}
                            </Typography>
                            <Box display="flex" gap={1} flexWrap="wrap">
                              <Chip
                                label={
                                  career.dettaglioTratto.tipoCorsoCod === "LM"
                                    ? "Magistrale"
                                    : career.dettaglioTratto.tipoCorsoCod ===
                                        "L2" ||
                                      career.dettaglioTratto.tipoCorsoCod ===
                                        "L"
                                    ? "Triennale"
                                    : career.dettaglioTratto.tipoCorsoCod
                                }
                                size="small"
                                color="primary"
                                variant="outlined"
                              />
                              <Chip
                                label={career.staMatDes}
                                size="small"
                                color={
                                  career.staMatDes === "Attivo"
                                    ? "success"
                                    : "default"
                                }
                              />
                            </Box>
                          </Box>
                        }
                        sx={{ width: "100%", margin: 0 }}
                      />
                    </CardContent>
                  </Card>
                ))}
              </Stack>
            </RadioGroup>
          </DialogContent>

          <DialogActions>
            <Button
              onClick={handleBack}
              disabled={isSubmitting}
              startIcon={<ArrowBack />}
            >
              Indietro
            </Button>
            <Button
              onClick={onSubmit}
              variant="contained"
              disabled={isSubmitting || !selectedCareer}
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
        </>
      )}
    </Dialog>
  );
};

export default Esse3ImportDialog;
