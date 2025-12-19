import React, { useState } from "react";
import {
  Box,
  TextField,
  Grid,
  Button,
  Typography,
  MenuItem,
  Chip,
  Stack,
  Autocomplete,
  Paper,
  IconButton,
  Divider,
  CardContent,
  CardActions,
  CircularProgress,
  Card,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { SkillsData, EnglishLevel } from "../../types/interview";
import { skillsDataSchema } from "../../schemas/interviewSchemas";
import {
  SPOKEN_LANGUAGES,
  DRIVER_LICENSES,
  LANGUAGE_LEVEL_LABELS,
} from "../../constants/interviewConstants";

interface Step5SkillsProps {
  initialData?: SkillsData;
  isLoading: boolean;
  onSave: (data: SkillsData) => void;
  handleNext: () => void;
  handleBack: () => void;
}

const Step5Skills: React.FC<Step5SkillsProps> = ({
  initialData,
  isLoading,
  onSave,
  handleNext,
  handleBack,
}) => {
  const [newSpokenLanguage, setNewSpokenLanguage] = useState("");
  const [newSpokenLanguageLevel, setNewSpokenLanguageLevel] =
    useState<EnglishLevel>(EnglishLevel.B2);

  const { control, watch, setValue } = useForm<SkillsData>({
    resolver: yupResolver(skillsDataSchema) as any,
    mode: "onChange",
    defaultValues: initialData || {
      languages: [],
      driverLicenses: [],
      inferredFromProfile: false,
    },
  });

  const formValues = watch();

  const handleAddSpokenLanguage = () => {
    if (newSpokenLanguage.trim()) {
      const exists = (formValues.languages || []).some(
        (lang) => lang.name.toLowerCase() === newSpokenLanguage.toLowerCase()
      );

      if (!exists) {
        const updated = [
          ...(formValues.languages || []),
          { name: newSpokenLanguage, level: newSpokenLanguageLevel },
        ];
        setValue("languages", updated);
        setNewSpokenLanguage("");
        setNewSpokenLanguageLevel(EnglishLevel.B2);
      }
    }
  };

  const handleDeleteSpokenLanguage = (name: string) => {
    const updated = (formValues.languages || []).filter(
      (lang) => lang.name !== name
    );
    setValue("languages", updated);
  };

  const handleUpdateSpokenLanguageLevel = (
    name: string,
    level: EnglishLevel
  ) => {
    const updated = (formValues.languages || []).map((lang) =>
      lang.name === name ? { ...lang, level } : lang
    );
    setValue("languages", updated);
  };

  const handleNextStep = () => {
    onSave(formValues);
    handleNext();
  };

  return (
    <Card elevation={3} sx={{ borderRadius: 3 }}>
      <CardContent sx={{ p: { xs: 2, md: 4 }, minHeight: 400 }}>
        <Box>
          <Typography variant="h5" gutterBottom fontWeight={600}>
            Lingue e Patenti
          </Typography>
          <Typography variant="body2" color="text.secondary" mb={3}>
            Inserisci le lingue che conosci e le patenti di guida che possiedi.
          </Typography>

          <Stack spacing={4}>
            {/* Lingue Parlate */}
            <Paper
              elevation={0}
              sx={{ p: 3, bgcolor: "grey.50", borderRadius: 2 }}
            >
              <Typography variant="h6" fontWeight={600} gutterBottom>
                Lingue Parlate
              </Typography>

              <Grid container spacing={2} alignItems="center" mb={2}>
                <Grid size={{ xs: 12, md: 6 }}>
                  <Autocomplete
                    freeSolo
                    options={SPOKEN_LANGUAGES}
                    value={newSpokenLanguage}
                    onInputChange={(_, newValue) =>
                      setNewSpokenLanguage(newValue)
                    }
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Aggiungi lingua"
                        variant="outlined"
                      />
                    )}
                  />
                </Grid>
                <Grid size={{ xs: 12, md: 4 }}>
                  <TextField
                    select
                    fullWidth
                    label="Livello"
                    value={newSpokenLanguageLevel}
                    onChange={(e) =>
                      setNewSpokenLanguageLevel(e.target.value as EnglishLevel)
                    }
                    variant="outlined"
                  >
                    {Object.entries(LANGUAGE_LEVEL_LABELS).map(
                      ([value, label]) => (
                        <MenuItem key={value} value={value}>
                          {label}
                        </MenuItem>
                      )
                    )}
                  </TextField>
                </Grid>
                <Grid size={{ xs: 12, md: 2 }}>
                  <Button
                    fullWidth
                    variant="contained"
                    color="primary"
                    onClick={handleAddSpokenLanguage}
                    startIcon={<AddIcon />}
                  >
                    Aggiungi
                  </Button>
                </Grid>
              </Grid>

              <Stack spacing={1}>
                {(formValues.languages || []).map((lang) => (
                  <Paper key={lang.name} elevation={1} sx={{ p: 2 }}>
                    <Grid container alignItems="center" spacing={2}>
                      <Grid size={{ xs: 12, md: 6 }}>
                        <Typography variant="body1" fontWeight={500}>
                          {lang.name}
                        </Typography>
                      </Grid>
                      <Grid size={{ xs: 10, md: 5 }}>
                        <TextField
                          select
                          fullWidth
                          size="small"
                          value={lang.level}
                          onChange={(e) =>
                            handleUpdateSpokenLanguageLevel(
                              lang.name,
                              e.target.value as EnglishLevel
                            )
                          }
                          variant="outlined"
                        >
                          {Object.entries(LANGUAGE_LEVEL_LABELS).map(
                            ([value, label]) => (
                              <MenuItem key={value} value={value}>
                                {label}
                              </MenuItem>
                            )
                          )}
                        </TextField>
                      </Grid>
                      <Grid size={{ xs: 2, md: 1 }}>
                        <IconButton
                          size="small"
                          color="error"
                          onClick={() => handleDeleteSpokenLanguage(lang.name)}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </Grid>
                    </Grid>
                  </Paper>
                ))}
              </Stack>

              {(!formValues.languages || formValues.languages.length === 0) && (
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ mt: 2, fontStyle: "italic" }}
                >
                  Nessuna lingua aggiunta. Aggiungi le lingue che conosci per
                  migliorare il tuo profilo.
                </Typography>
              )}
            </Paper>

            <Divider />

            {/* Patenti */}
            <Paper
              elevation={0}
              sx={{ p: 3, bgcolor: "grey.50", borderRadius: 2 }}
            >
              <Typography variant="h6" fontWeight={600} gutterBottom>
                Patenti di Guida
              </Typography>
              <Controller
                name="driverLicenses"
                control={control}
                render={({ field }) => (
                  <Autocomplete
                    {...field}
                    multiple
                    freeSolo
                    options={DRIVER_LICENSES}
                    value={field.value || []}
                    onChange={(_, newValue) => field.onChange(newValue)}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        variant="outlined"
                        placeholder="Es. B (Autoveicoli), A (Motocicli)..."
                      />
                    )}
                    renderTags={(value, getTagProps) =>
                      (value || []).map((option, index) => (
                        <Chip
                          label={option}
                          {...getTagProps({ index })}
                          color="success"
                          size="small"
                          key={option}
                        />
                      ))
                    }
                  />
                )}
              />
            </Paper>
          </Stack>
        </Box>
      </CardContent>

      <CardActions sx={{ p: { xs: 2, md: 3 }, bgcolor: "grey.50" }}>
        <Box display="flex" justifyContent="space-between" width="100%" gap={2}>
          {/* Back Button */}
          <Button
            variant="outlined"
            onClick={handleBack}
            startIcon={<ArrowBackIcon />}
            size="large"
          >
            Indietro
          </Button>

          <Box display="flex" gap={2}>
            {/* Next/Complete Button */}
            <Button
              variant="contained"
              onClick={handleNextStep}
              disabled={isLoading}
              endIcon={
                isLoading ? (
                  <CircularProgress size={20} color="inherit" />
                ) : (
                  <CheckCircleIcon />
                )
              }
              size="large"
            >
              {isLoading ? "Salvataggio..." : "Completa"}
            </Button>
          </Box>
        </Box>
      </CardActions>
    </Card>
  );
};

export default Step5Skills;
