import {
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
  DialogContent,
  Grid,
  TextField,
  Stack,
  FormLabel,
  Select,
  MenuItem,
  FormControl,
  FormHelperText,
  Checkbox,
  FormControlLabel,
} from "@mui/material";
import { Dispatch, SetStateAction, useState } from "react";
import { Controller, UseFormHandleSubmit } from "react-hook-form";
import { DialogType } from "../Step4Experiences";
import { Education } from "../../../types/interview";

interface AddEducationDialogProps {
  openDialog: string | null;
  setOpenDialog: Dispatch<SetStateAction<DialogType>>;
  handleSubmitEducation: UseFormHandleSubmit<
    Omit<Education, "id">,
    Omit<Education, "id">
  >;
  onSubmitEducation: (data: Omit<Education, "id">) => void;
  errorsEducation: any;
  controlEducation: any;
}

const DEGREE_OPTIONS = [
  "Diploma di Scuola Superiore",
  "Laurea Triennale",
  "Laurea Magistrale",
  "Master di I Livello",
  "Master di II Livello",
  "Dottorato di Ricerca",
  "Altro",
];

const AddEducationDialog: React.FC<AddEducationDialogProps> = ({
  openDialog,
  setOpenDialog,
  handleSubmitEducation,
  onSubmitEducation,
  errorsEducation,
  controlEducation,
}) => {
  const [isOngoing, setIsOngoing] = useState(false);

  return (
    <Dialog
      open={openDialog === "education"}
      onClose={() => {
        setOpenDialog(null);
        setIsOngoing(false);
      }}
      maxWidth="md"
      fullWidth
    >
      <DialogTitle>Aggiungi Percorso Formativo</DialogTitle>
      <form onSubmit={handleSubmitEducation(onSubmitEducation)}>
        <DialogContent>
          <Grid container spacing={2}>
            <Grid size={{ xs: 12 }}>
              <Controller
                name="institution"
                control={controlEducation}
                render={({ field }) => (
                  <Stack spacing={1}>
                    <FormLabel>Istituzione *</FormLabel>
                    <TextField
                      {...field}
                      fullWidth
                      placeholder="es. Università di Bologna"
                      error={!!errorsEducation.institution}
                      helperText={errorsEducation.institution?.message}
                    />
                  </Stack>
                )}
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <Controller
                name="degree"
                control={controlEducation}
                render={({ field }) => (
                  <FormControl
                    fullWidth
                    error={!!errorsEducation.degree}
                    sx={{ gap: 1, display: "flex", flexDirection: "column" }}
                  >
                    <FormLabel>Titolo di Studio *</FormLabel>
                    <Select {...field} displayEmpty>
                      <MenuItem value="" disabled>
                        Seleziona titolo di studio
                      </MenuItem>
                      {DEGREE_OPTIONS.map((degree) => (
                        <MenuItem key={degree} value={degree}>
                          {degree}
                        </MenuItem>
                      ))}
                    </Select>
                    {errorsEducation.degree && (
                      <FormHelperText>
                        {errorsEducation.degree?.message}
                      </FormHelperText>
                    )}
                  </FormControl>
                )}
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <Controller
                name="fieldOfStudy"
                control={controlEducation}
                render={({ field }) => (
                  <Stack spacing={1}>
                    <FormLabel>Corso di Studi *</FormLabel>
                    <TextField
                      {...field}
                      fullWidth
                      placeholder="es. Ingegneria Informatica"
                      error={!!errorsEducation.fieldOfStudy}
                      helperText={errorsEducation.fieldOfStudy?.message}
                    />
                  </Stack>
                )}
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <Controller
                name="startYear"
                control={controlEducation}
                render={({ field }) => (
                  <Stack spacing={1}>
                    <FormLabel>Anno di Inizio *</FormLabel>
                    <TextField
                      {...field}
                      fullWidth
                      type="number"
                      error={!!errorsEducation.startYear}
                      helperText={errorsEducation.startYear?.message}
                    />
                  </Stack>
                )}
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <Stack spacing={1}>
                <FormLabel>Anno di Fine</FormLabel>
                {!isOngoing && (
                  <Controller
                    name="endYear"
                    control={controlEducation}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        fullWidth
                        type="number"
                        error={!!errorsEducation.endYear}
                        helperText={errorsEducation.endYear?.message}
                      />
                    )}
                  />
                )}
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={isOngoing}
                      onChange={(e) => setIsOngoing(e.target.checked)}
                    />
                  }
                  label="In corso"
                />
              </Stack>
            </Grid>
            <Grid size={{ xs: 12 }}>
              <Controller
                name="grade"
                control={controlEducation}
                render={({ field }) => (
                  <Stack spacing={1}>
                    <FormLabel>Voto (opzionale)</FormLabel>
                    <TextField
                      {...field}
                      fullWidth
                      placeholder="es. 110/110 e lode, 100/100"
                      error={!!errorsEducation.grade}
                      helperText={errorsEducation.grade?.message}
                    />
                  </Stack>
                )}
              />
            </Grid>
            <Grid size={{ xs: 12 }}>
              <Controller
                name="description"
                control={controlEducation}
                render={({ field }) => (
                  <Stack spacing={1}>
                    <FormLabel>Descrizione (opzionale)</FormLabel>
                    <TextField
                      {...field}
                      fullWidth
                      multiline
                      rows={3}
                      placeholder="es. Tesi su Machine Learning applicato alla Computer Vision"
                      error={!!errorsEducation.description}
                      helperText={errorsEducation.description?.message}
                    />
                  </Stack>
                )}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              setOpenDialog(null);
              setIsOngoing(false);
            }}
          >
            Annulla
          </Button>
          <Button type="submit" variant="contained" color="primary">
            Aggiungi
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default AddEducationDialog;
