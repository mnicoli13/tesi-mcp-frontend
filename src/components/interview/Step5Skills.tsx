import React, { useState, useEffect } from "react";
import {
  Box,
  TextField,
  Grid,
  Button,
  Typography,
  Alert,
  MenuItem,
  Chip,
  Stack,
  Autocomplete,
  Paper,
  CircularProgress,
  Skeleton,
  IconButton,
  Divider,
} from "@mui/material";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  SkillsData,
  ProgrammingLanguageSkill,
  EnglishLevel,
  SkillLevel,
} from "../../types/interview";
import { skillsDataSchema } from "../../schemas/interviewSchemas";
import {
  PROGRAMMING_LANGUAGES,
  FRAMEWORKS_AND_TOOLS,
  DATABASES,
  DEVOPS_TOOLS,
  ENGLISH_LEVEL_LABELS,
  SKILL_LEVEL_LABELS,
} from "../../constants/interviewConstants";

interface Step5SkillsProps {
  initialData?: SkillsData;
  onSave: (data: SkillsData) => void;
}

const Step5Skills: React.FC<Step5SkillsProps> = ({ initialData, onSave }) => {
  const [isInferring, setIsInferring] = useState(false);
  const [inferenceError, setInferenceError] = useState<string | null>(null);
  const [newLanguage, setNewLanguage] = useState("");
  const [newLanguageLevel, setNewLanguageLevel] = useState<SkillLevel>(
    SkillLevel.INTERMEDIATE
  );

  const {
    control,
    watch,
    setValue,
    formState: { errors, isValid, isDirty },
  } = useForm<SkillsData>({
    resolver: yupResolver(skillsDataSchema) as any,
    mode: "onChange",
    defaultValues: initialData || {
      programmingLanguages: [],
      frameworks: [],
      databases: [],
      devOps: [],
      englishLevel: EnglishLevel.B2,
      inferredFromProfile: false,
    },
  });

  const formValues = watch();

  // Auto-save on valid changes
  useEffect(() => {
    if (isValid && isDirty) {
      onSave(formValues);
    }
  }, [formValues, isValid, isDirty, onSave]);

  // Infer skills on component mount if not already inferred
  useEffect(() => {
    if (
      !formValues.inferredFromProfile &&
      formValues.programmingLanguages.length === 0
    ) {
      handleInferSkills();
    }
  }, []);

  const handleInferSkills = async () => {
    setIsInferring(true);
    setInferenceError(null);

    try {
      // const inferredSkills = await interviewService.inferSkillsFromProfile(
      //   userId
      // );
      const inferredSkills = {
        programmingLanguages: [
          { name: "Python", level: SkillLevel.INTERMEDIATE },
          { name: "JavaScript", level: SkillLevel.ADVANCED },
        ],
        frameworks: ["React", "Node.js"],
        databases: ["MySQL", "MongoDB"],
        devOps: ["Docker", "Kubernetes"],
        englishLevel: EnglishLevel.B2,
      };

      // Map inferred skills to form data
      const programmingLanguages: ProgrammingLanguageSkill[] =
        inferredSkills.programmingLanguages?.map((lang: any) => ({
          name: lang.name,
          level: (lang.level as SkillLevel) || SkillLevel.INTERMEDIATE,
        })) || [];

      setValue("programmingLanguages", programmingLanguages);
      setValue("frameworks", inferredSkills.frameworks || []);
      setValue("databases", inferredSkills.databases || []);
      setValue("devOps", inferredSkills.devOps || []);
      setValue("inferredFromProfile", true);
    } catch (error) {
      console.error("Error inferring skills:", error);
      setInferenceError(
        "Impossibile inferire le skill automaticamente. Puoi comunque inserirle manualmente."
      );
    } finally {
      setIsInferring(false);
    }
  };

  const handleAddLanguage = () => {
    if (newLanguage.trim()) {
      const exists = formValues.programmingLanguages.some(
        (lang) => lang.name.toLowerCase() === newLanguage.toLowerCase()
      );

      if (!exists) {
        const updated = [
          ...formValues.programmingLanguages,
          { name: newLanguage, level: newLanguageLevel },
        ];
        setValue("programmingLanguages", updated);
        setNewLanguage("");
        setNewLanguageLevel(SkillLevel.INTERMEDIATE);
      }
    }
  };

  const handleDeleteLanguage = (name: string) => {
    const updated = formValues.programmingLanguages.filter(
      (lang) => lang.name !== name
    );
    setValue("programmingLanguages", updated);
  };

  const handleUpdateLanguageLevel = (name: string, level: SkillLevel) => {
    const updated = formValues.programmingLanguages.map((lang) =>
      lang.name === name ? { ...lang, level } : lang
    );
    setValue("programmingLanguages", updated);
  };

  if (isInferring) {
    return (
      <Box textAlign="center" py={8}>
        <CircularProgress size={60} sx={{ mb: 3 }} />
        <Typography variant="h6" gutterBottom>
          Sto analizzando il tuo profilo...
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Stiamo inferendo le tue skill da esami ed esperienze
        </Typography>
        <Box mt={4}>
          <Stack spacing={2}>
            <Skeleton variant="rectangular" height={60} />
            <Skeleton variant="rectangular" height={60} />
            <Skeleton variant="rectangular" height={60} />
          </Stack>
        </Box>
      </Box>
    );
  }

  return (
    <Box>
      <Typography variant="h5" gutterBottom fontWeight={600}>
        Skill Tecniche e Linguistiche
      </Typography>
      <Typography variant="body2" color="text.secondary" mb={3}>
        Completa il tuo profilo con le tue competenze tecniche. Abbiamo già
        inferito alcune skill dal tuo profilo, ma puoi modificarle e aggiungerne
        di nuove.
      </Typography>

      {formValues.inferredFromProfile && (
        <Alert severity="success" icon={<AutoAwesomeIcon />} sx={{ mb: 3 }}>
          <strong>Skill inferite automaticamente!</strong> Abbiamo analizzato i
          tuoi esami ed esperienze. Puoi modificare o estendere le informazioni
          qui sotto.
        </Alert>
      )}

      {inferenceError && (
        <Alert severity="warning" sx={{ mb: 3 }}>
          {inferenceError}
        </Alert>
      )}

      <Stack spacing={4}>
        {/* Linguaggi di Programmazione */}
        <Paper elevation={0} sx={{ p: 3, bgcolor: "grey.50", borderRadius: 2 }}>
          <Typography variant="h6" fontWeight={600} gutterBottom>
            Linguaggi di Programmazione *
          </Typography>

          <Grid container spacing={2} alignItems="center" mb={2}>
            <Grid size={{ xs: 12, md: 6 }}>
              <Autocomplete
                freeSolo
                options={PROGRAMMING_LANGUAGES}
                value={newLanguage}
                onInputChange={(_, newValue) => setNewLanguage(newValue)}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Aggiungi linguaggio"
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
                value={newLanguageLevel}
                onChange={(e) =>
                  setNewLanguageLevel(e.target.value as SkillLevel)
                }
                variant="outlined"
              >
                {Object.entries(SKILL_LEVEL_LABELS).map(([value, label]) => (
                  <MenuItem key={value} value={value}>
                    {label}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid size={{ xs: 12, md: 2 }}>
              <Button
                fullWidth
                variant="contained"
                color="primary"
                onClick={handleAddLanguage}
                startIcon={<AddIcon />}
              >
                Aggiungi
              </Button>
            </Grid>
          </Grid>

          <Stack spacing={1}>
            {formValues.programmingLanguages.map((lang) => (
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
                        handleUpdateLanguageLevel(
                          lang.name,
                          e.target.value as SkillLevel
                        )
                      }
                      variant="outlined"
                    >
                      {Object.entries(SKILL_LEVEL_LABELS).map(
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
                      onClick={() => handleDeleteLanguage(lang.name)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Grid>
                </Grid>
              </Paper>
            ))}
          </Stack>

          {errors.programmingLanguages && (
            <Typography
              variant="caption"
              color="error"
              sx={{ mt: 1, display: "block" }}
            >
              {errors.programmingLanguages.message}
            </Typography>
          )}
        </Paper>

        <Divider />

        {/* Framework e Librerie */}
        <Paper elevation={0} sx={{ p: 3, bgcolor: "grey.50", borderRadius: 2 }}>
          <Typography variant="h6" fontWeight={600} gutterBottom>
            Framework e Librerie
          </Typography>
          <Controller
            name="frameworks"
            control={control}
            render={({ field }) => (
              <Autocomplete
                {...field}
                multiple
                freeSolo
                options={FRAMEWORKS_AND_TOOLS}
                value={field.value}
                onChange={(_, newValue) => field.onChange(newValue)}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    variant="outlined"
                    label="Seleziona o scrivi"
                    placeholder="Es. React, Django, TensorFlow..."
                  />
                )}
                renderTags={(value, getTagProps) =>
                  value.map((option, index) => (
                    <Chip
                      label={option}
                      {...getTagProps({ index })}
                      color="primary"
                      size="small"
                      key={option}
                    />
                  ))
                }
              />
            )}
          />
        </Paper>

        {/* Database */}
        <Paper elevation={0} sx={{ p: 3, bgcolor: "grey.50", borderRadius: 2 }}>
          <Typography variant="h6" fontWeight={600} gutterBottom>
            Database
          </Typography>
          <Controller
            name="databases"
            control={control}
            render={({ field }) => (
              <Autocomplete
                {...field}
                multiple
                freeSolo
                options={DATABASES}
                value={field.value}
                onChange={(_, newValue) => field.onChange(newValue)}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    variant="outlined"
                    label="Seleziona o scrivi"
                    placeholder="Es. PostgreSQL, MongoDB..."
                  />
                )}
                renderTags={(value, getTagProps) =>
                  value.map((option, index) => (
                    <Chip
                      label={option}
                      {...getTagProps({ index })}
                      color="secondary"
                      size="small"
                      key={option}
                    />
                  ))
                }
              />
            )}
          />
        </Paper>

        {/* DevOps e Tools */}
        <Paper elevation={0} sx={{ p: 3, bgcolor: "grey.50", borderRadius: 2 }}>
          <Typography variant="h6" fontWeight={600} gutterBottom>
            DevOps e Tools
          </Typography>
          <Controller
            name="devOps"
            control={control}
            render={({ field }) => (
              <Autocomplete
                {...field}
                multiple
                freeSolo
                options={DEVOPS_TOOLS}
                value={field.value}
                onChange={(_, newValue) => field.onChange(newValue)}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    variant="outlined"
                    label="Seleziona o scrivi"
                    placeholder="Es. Docker, Git, AWS..."
                  />
                )}
                renderTags={(value, getTagProps) =>
                  value.map((option, index) => (
                    <Chip
                      label={option}
                      {...getTagProps({ index })}
                      color="info"
                      size="small"
                      key={option}
                    />
                  ))
                }
              />
            )}
          />
        </Paper>

        <Divider />

        {/* Livello Inglese */}
        <Paper elevation={0} sx={{ p: 3, bgcolor: "grey.50", borderRadius: 2 }}>
          <Typography variant="h6" fontWeight={600} gutterBottom>
            Livello di Inglese *
          </Typography>
          <Controller
            name="englishLevel"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                fullWidth
                select
                error={!!errors.englishLevel}
                helperText={
                  errors.englishLevel?.message ||
                  "Indica il tuo livello di conoscenza della lingua inglese"
                }
                variant="outlined"
              >
                {Object.entries(ENGLISH_LEVEL_LABELS).map(([value, label]) => (
                  <MenuItem key={value} value={value}>
                    {label}
                  </MenuItem>
                ))}
              </TextField>
            )}
          />
        </Paper>

        {!formValues.inferredFromProfile &&
          formValues.programmingLanguages.length === 0 && (
            <Box textAlign="center" mt={2}>
              <Button
                variant="outlined"
                color="primary"
                onClick={handleInferSkills}
                startIcon={<AutoAwesomeIcon />}
              >
                Inferisci Skill dal Profilo
              </Button>
            </Box>
          )}
      </Stack>
    </Box>
  );
};

export default Step5Skills;
