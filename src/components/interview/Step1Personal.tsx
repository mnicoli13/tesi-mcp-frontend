import React, { useEffect } from "react";
import {
  Box,
  TextField,
  Grid,
  MenuItem,
  Autocomplete,
  Typography,
  Alert,
  FormLabel,
  Stack,
} from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { PersonalData } from "../../types/interview";
import { personalDataSchema } from "../../schemas/interviewSchemas";
import {
  ITALIAN_UNIVERSITIES,
  DEGREE_TYPE_LABELS,
} from "../../constants/interviewConstants";

interface Step1PersonalProps {
  initialData?: PersonalData;
  onSave: (data: PersonalData) => void;
}

const Step1Personal: React.FC<Step1PersonalProps> = ({
  initialData,
  onSave,
}) => {
  const currentYear = new Date().getFullYear();

  const {
    control,
    watch,
    reset,
    formState: { errors, isValid, isDirty },
  } = useForm<PersonalData>({
    resolver: yupResolver(personalDataSchema),
    mode: "onChange",
    defaultValues: {
      firstName: "",
      lastName: "",
      age: 18,
      university: "",
      degreeType: "unselected",
      courseOfStudy: "",
      graduationYear: currentYear,
    },
  });

  // Reset form when initialData changes
  useEffect(() => {
    if (initialData) {
      reset({
        firstName: initialData.firstName || "",
        lastName: initialData.lastName || "",
        age: initialData.age || 18,
        university: initialData.university || "",
        degreeType: initialData.degreeType || "unselected",
        courseOfStudy: initialData.courseOfStudy || "",
        graduationYear: initialData.graduationYear || currentYear,
      });
    }
  }, [initialData, reset, currentYear]);

  // Watch all form values
  const formValues = watch();

  // Auto-save on valid changes
  useEffect(() => {
    if (isValid && isDirty) {
      onSave(formValues);
    }
  }, [formValues, isValid, isDirty, onSave]);

  return (
    <Box>
      <Typography variant="h5" gutterBottom fontWeight={600}>
        Dati Anagrafici
      </Typography>
      <Typography variant="body2" color="text.secondary" mb={3}>
        Inserisci i tuoi dati personali e accademici. Questi dati ci aiuteranno
        a creare un profilo completo e a suggerirti opportunità di carriera
        adatte al tuo percorso.
      </Typography>

      <Alert severity="info" sx={{ mb: 3 }}>
        I tuoi dati saranno utilizzati esclusivamente per il Career Coaching e
        non saranno condivisi con terze parti.
      </Alert>

      <Grid container spacing={3}>
        {/* Nome e Cognome */}
        <Grid size={{ xs: 12, md: 6 }}>
          <Controller
            name="firstName"
            control={control}
            render={({ field }) => (
              <Stack spacing={1}>
                <FormLabel>Nome *</FormLabel>
                <TextField
                  {...field}
                  fullWidth
                  error={!!errors.firstName}
                  helperText={errors.firstName?.message}
                  variant="outlined"
                />
              </Stack>
            )}
          />
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <Controller
            name="lastName"
            control={control}
            render={({ field }) => (
              <Stack spacing={1}>
                <FormLabel>Cognome *</FormLabel>
                <TextField
                  {...field}
                  fullWidth
                  error={!!errors.lastName}
                  helperText={errors.lastName?.message}
                  variant="outlined"
                />
              </Stack>
            )}
          />
        </Grid>

        {/* Età */}
        <Grid size={{ xs: 12, md: 6 }}>
          <Controller
            name="age"
            control={control}
            render={({ field }) => (
              <Stack spacing={1}>
                <FormLabel>Età *</FormLabel>
                <TextField
                  {...field}
                  fullWidth
                  type="number"
                  error={!!errors.age}
                  helperText={errors.age?.message}
                  variant="outlined"
                  inputProps={{ min: 18, max: 100 }}
                />
              </Stack>
            )}
          />
        </Grid>

        {/* Università */}
        <Grid size={{ xs: 12, md: 6 }}>
          <Controller
            name="university"
            defaultValue={formValues.university}
            control={control}
            render={({ field }) => (
              <Stack spacing={1}>
                <FormLabel>Università *</FormLabel>
                <Autocomplete
                  options={ITALIAN_UNIVERSITIES}
                  getOptionLabel={(option) => {
                    if (typeof option === "string") return option;
                    return option.label;
                  }}
                  isOptionEqualToValue={(option, value) => {
                    if (
                      typeof option === "string" ||
                      typeof value === "string"
                    ) {
                      return option === value;
                    }
                    return option.value === value.value;
                  }}
                  value={
                    ITALIAN_UNIVERSITIES.find(
                      (uni) => uni.value === field.value
                    ) ||
                    field.value ||
                    null
                  }
                  onChange={(_, newValue) => {
                    // Se newValue è un oggetto, salva il value (ID ateneo)
                    if (newValue && typeof newValue === "object") {
                      field.onChange(newValue.value);
                    } else {
                      // Se è una stringa (freeSolo), salva la stringa
                      field.onChange(newValue || "");
                    }
                  }}
                  freeSolo
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      error={!!errors.university}
                      helperText={errors.university?.message}
                      variant="outlined"
                    />
                  )}
                />
              </Stack>
            )}
          />
        </Grid>

        {/* Tipo Laurea */}
        <Grid size={{ xs: 12, md: 6 }}>
          <Controller
            name="degreeType"
            defaultValue={formValues.degreeType}
            control={control}
            render={({ field }) => (
              <Stack spacing={1}>
                <FormLabel>Tipo di Laurea *</FormLabel>
                <TextField
                  {...field}
                  fullWidth
                  select
                  error={!!errors.degreeType}
                  helperText={errors.degreeType?.message}
                  variant="outlined"
                >
                  <MenuItem value="unselected">
                    <em>Seleziona...</em>
                  </MenuItem>
                  {Object.entries(DEGREE_TYPE_LABELS).map(([value, label]) => (
                    <MenuItem key={value} value={value}>
                      {label}
                    </MenuItem>
                  ))}
                </TextField>
              </Stack>
            )}
          />
        </Grid>

        {/* Corso di Studi */}
        <Grid size={{ xs: 12, md: 6 }}>
          <Controller
            name="courseOfStudy"
            defaultValue={formValues.courseOfStudy}
            control={control}
            render={() => (
              <Stack spacing={1}>
                <FormLabel>Corso di Studi *</FormLabel>
                <TextField
                  name="courseOfStudy"
                  defaultValue={formValues.courseOfStudy}
                  fullWidth
                  error={!!errors.courseOfStudy}
                  helperText={
                    errors.courseOfStudy?.message ||
                    "Es. Ingegneria Informatica, Computer Science"
                  }
                  variant="outlined"
                />
              </Stack>
            )}
          />
        </Grid>

        {/* Anno di Laurea */}
        <Grid size={{ xs: 12, md: 6 }}>
          <Controller
            name="graduationYear"
            defaultValue={formValues.graduationYear}
            control={control}
            render={({}) => (
              <Stack spacing={1}>
                <FormLabel>Anno di Laurea *</FormLabel>
                <TextField
                  name="graduationYear"
                  defaultValue={formValues.graduationYear}
                  fullWidth
                  error={!!errors.graduationYear}
                  variant="outlined"
                />
              </Stack>
            )}
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default Step1Personal;
