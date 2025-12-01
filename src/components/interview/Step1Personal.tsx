import React, { useEffect } from "react";
import {
  Box,
  TextField,
  Grid,
  MenuItem,
  Autocomplete,
  Typography,
  Alert,
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
  initialData: PersonalData | null;
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
    formState: { errors, isValid, isDirty },
  } = useForm<PersonalData>({
    resolver: yupResolver(personalDataSchema),
    mode: "onChange",
    defaultValues: {
      firstName: initialData?.firstName || "",
      lastName: initialData?.lastName || "",
      age: initialData?.age || 18,
      university: initialData?.university || "",
      degreeType: initialData?.degreeType || null,
      courseOfStudy: initialData?.courseOfStudy || "",
      graduationYear: initialData?.graduationYear || currentYear,
    },
  });

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
              <TextField
                {...field}
                fullWidth
                label="Nome *"
                error={!!errors.firstName}
                helperText={errors.firstName?.message}
                variant="outlined"
              />
            )}
          />
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <Controller
            name="lastName"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                fullWidth
                label="Cognome *"
                error={!!errors.lastName}
                helperText={errors.lastName?.message}
                variant="outlined"
              />
            )}
          />
        </Grid>

        {/* Età */}
        <Grid size={{ xs: 12, md: 6 }}>
          <Controller
            name="age"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                fullWidth
                label="Età *"
                type="number"
                error={!!errors.age}
                helperText={errors.age?.message}
                variant="outlined"
                inputProps={{ min: 18, max: 100 }}
              />
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
              <Autocomplete
                {...field}
                options={ITALIAN_UNIVERSITIES}
                value={field.value || null}
                onChange={(_, newValue) => field.onChange(newValue || "")}
                freeSolo
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Università *"
                    error={!!errors.university}
                    helperText={errors.university?.message}
                    variant="outlined"
                  />
                )}
              />
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
              <TextField
                {...field}
                fullWidth
                select
                label="Tipo di Laurea *"
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
            )}
          />
        </Grid>

        {/* Corso di Studi */}
        <Grid size={{ xs: 12, md: 6 }}>
          <Controller
            name="courseOfStudy"
            defaultValue={formValues.courseOfStudy}
            control={control}
            render={({ field }) => (
              <TextField
                name="courseOfStudy"
                defaultValue={formValues.courseOfStudy}
                fullWidth
                label="Corso di Studi *"
                error={!!errors.courseOfStudy}
                helperText={
                  errors.courseOfStudy?.message ||
                  "Es. Ingegneria Informatica, Computer Science"
                }
                variant="outlined"
              />
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
              <TextField
                name="courseOfStudy"
                defaultValue={formValues.courseOfStudy}
                fullWidth
                label="Corso di Studi *"
                error={!!errors.courseOfStudy}
                helperText={
                  errors.courseOfStudy?.message ||
                  "Es. Ingegneria Informatica, Computer Science"
                }
                variant="outlined"
              />
            )}
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default Step1Personal;
