import React, { useEffect } from 'react';
import {
  Box,
  TextField,
  Grid,
  Typography,
  Alert,
  FormControl,
  RadioGroup,
  FormControlLabel,
  Radio,
  Chip,
  Stack,
  Autocomplete,
  FormGroup,
  Checkbox,
  Paper,
} from '@mui/material';
import WorkIcon from '@mui/icons-material/Work';
import BusinessIcon from '@mui/icons-material/Business';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import InterestsIcon from '@mui/icons-material/Lightbulb';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { InterestsData, WorkStyle, CompanyType } from '../../types/interview';
import { interestsDataSchema } from '../../schemas/interviewSchemas';
import {
  AREAS_OF_INTEREST,
  ITALIAN_CITIES,
  WORK_STYLE_LABELS,
  COMPANY_TYPE_LABELS,
} from '../../constants/interviewConstants';

interface Step3InterestsProps {
  initialData: InterestsData | null;
  onSave: (data: InterestsData) => void;
}

const Step3Interests: React.FC<Step3InterestsProps> = ({ initialData, onSave }) => {
  const {
    control,
    watch,
    formState: { errors, isValid, isDirty },
  } = useForm<InterestsData>({
    resolver: yupResolver(interestsDataSchema) as any,
    mode: 'onChange',
    defaultValues: initialData || {
      areasOfInterest: [],
      companyType: [],
      workStyle: WorkStyle.HYBRID,
      geographicPreferences: [],
    },
  });

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
        Interessi Professionali
      </Typography>
      <Typography variant="body2" color="text.secondary" mb={3}>
        Aiutaci a capire le tue preferenze lavorative. Queste informazioni ci permetteranno di
        suggerirti opportunità di carriera in linea con i tuoi interessi.
      </Typography>

      <Alert severity="info" sx={{ mb: 4 }} icon={<InterestsIcon />}>
        Questi dati saranno utilizzati dai nostri strumenti di AI per personalizzare i suggerimenti
        di carriera e filtrare le opportunità più rilevanti per te.
      </Alert>

      <Stack spacing={4}>
        {/* Aree di Interesse */}
        <Paper elevation={0} sx={{ p: 3, bgcolor: 'grey.50', borderRadius: 2 }}>
          <Box display="flex" alignItems="center" gap={1} mb={2}>
            <InterestsIcon color="primary" />
            <Typography variant="h6" fontWeight={600}>
              Aree di Interesse
            </Typography>
          </Box>
          <Controller
            name="areasOfInterest"
            control={control}
            render={({ field }) => (
              <Autocomplete
                {...field}
                multiple
                options={AREAS_OF_INTEREST}
                value={field.value}
                onChange={(_, newValue) => field.onChange(newValue)}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    variant="outlined"
                    label="Seleziona le tue aree di interesse *"
                    placeholder="Cerca..."
                    error={!!errors.areasOfInterest}
                    helperText={
                      errors.areasOfInterest?.message ||
                      'Seleziona una o più aree tecniche che ti interessano'
                    }
                  />
                )}
                renderTags={(value, getTagProps) =>
                  value.map((option, index) => (
                    <Chip
                      label={option}
                      {...getTagProps({ index })}
                      color="primary"
                      variant="outlined"
                      key={option}
                    />
                  ))
                }
              />
            )}
          />
        </Paper>

        {/* Tipo di Azienda */}
        <Paper elevation={0} sx={{ p: 3, bgcolor: 'grey.50', borderRadius: 2 }}>
          <Box display="flex" alignItems="center" gap={1} mb={2}>
            <BusinessIcon color="primary" />
            <Typography variant="h6" fontWeight={600}>
              Tipo di Azienda Preferita
            </Typography>
          </Box>
          <Typography variant="body2" color="text.secondary" mb={2}>
            Seleziona uno o più tipi di azienda in cui ti piacerebbe lavorare
          </Typography>
          <Controller
            name="companyType"
            control={control}
            render={({ field }) => (
              <FormGroup>
                <Grid container spacing={2}>
                  {Object.entries(COMPANY_TYPE_LABELS).map(([value, label]) => (
                    <Grid size={{ xs: 12, sm: 6 }} key={value}>
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={field.value.includes(value as CompanyType)}
                            onChange={(e) => {
                              const newValue = e.target.checked
                                ? [...field.value, value as CompanyType]
                                : field.value.filter((t) => t !== value);
                              field.onChange(newValue);
                            }}
                            color="primary"
                          />
                        }
                        label={label}
                      />
                    </Grid>
                  ))}
                </Grid>
              </FormGroup>
            )}
          />
          {errors.companyType && (
            <Typography variant="caption" color="error" sx={{ mt: 1, display: 'block' }}>
              {errors.companyType.message}
            </Typography>
          )}
        </Paper>

        {/* Stile di Lavoro */}
        <Paper elevation={0} sx={{ p: 3, bgcolor: 'grey.50', borderRadius: 2 }}>
          <Box display="flex" alignItems="center" gap={1} mb={2}>
            <WorkIcon color="primary" />
            <Typography variant="h6" fontWeight={600}>
              Stile di Lavoro Preferito
            </Typography>
          </Box>
          <Controller
            name="workStyle"
            control={control}
            render={({ field }) => (
              <FormControl component="fieldset" error={!!errors.workStyle}>
                <RadioGroup {...field} value={field.value}>
                  <Grid container spacing={2}>
                    {Object.entries(WORK_STYLE_LABELS).map(([value, label]) => (
                      <Grid size={{ xs: 12, sm: 4 }} key={value}>
                        <Paper
                          elevation={field.value === value ? 3 : 1}
                          sx={{
                            p: 2,
                            cursor: 'pointer',
                            border: 2,
                            borderColor:
                              field.value === value ? 'primary.main' : 'transparent',
                            transition: 'all 0.2s',
                            '&:hover': {
                              elevation: 3,
                            },
                          }}
                        >
                          <FormControlLabel
                            value={value}
                            control={<Radio color="primary" />}
                            label={label}
                            sx={{ width: '100%' }}
                          />
                        </Paper>
                      </Grid>
                    ))}
                  </Grid>
                </RadioGroup>
                {errors.workStyle && (
                  <Typography variant="caption" color="error" sx={{ mt: 1 }}>
                    {errors.workStyle.message}
                  </Typography>
                )}
              </FormControl>
            )}
          />
        </Paper>

        {/* Preferenze Geografiche */}
        <Paper elevation={0} sx={{ p: 3, bgcolor: 'grey.50', borderRadius: 2 }}>
          <Box display="flex" alignItems="center" gap={1} mb={2}>
            <LocationOnIcon color="primary" />
            <Typography variant="h6" fontWeight={600}>
              Preferenze Geografiche
            </Typography>
          </Box>
          <Controller
            name="geographicPreferences"
            control={control}
            render={({ field }) => (
              <Autocomplete
                {...field}
                multiple
                options={ITALIAN_CITIES}
                value={field.value}
                onChange={(_, newValue) => field.onChange(newValue)}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    variant="outlined"
                    label="Dove vorresti lavorare? *"
                    placeholder="Aggiungi città..."
                    error={!!errors.geographicPreferences}
                    helperText={
                      errors.geographicPreferences?.message ||
                      'Seleziona una o più città, "Estero", o "Ovunque"'
                    }
                  />
                )}
                renderTags={(value, getTagProps) =>
                  value.map((option, index) => (
                    <Chip
                      label={option}
                      {...getTagProps({ index })}
                      color="secondary"
                      variant="outlined"
                      icon={<LocationOnIcon />}
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
  );
};

export default Step3Interests;
