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
import { WorkExperience } from "../../../types/interview";

interface AddWorkExperienceDialogProps {
  openDialog: string | null;
  setOpenDialog: Dispatch<SetStateAction<DialogType>>;
  handleSubmitWorkExperience: UseFormHandleSubmit<
    Omit<WorkExperience, "id">,
    Omit<WorkExperience, "id">
  >;
  onSubmitWorkExperience: (data: Omit<WorkExperience, "id">) => void;
  errorsWorkExperience: any;
  controlWorkExperience: any;
}

const AddWorkExperienceDialog: React.FC<AddWorkExperienceDialogProps> = ({
  openDialog,
  setOpenDialog,
  handleSubmitWorkExperience,
  onSubmitWorkExperience,
  errorsWorkExperience,
  controlWorkExperience,
}) => {
  const [isCurrentJob, setIsCurrentJob] = useState(false);

  return (
    <Dialog
      open={openDialog === "workExperience"}
      onClose={() => {
        setOpenDialog(null);
        setIsCurrentJob(false);
      }}
      maxWidth="md"
      fullWidth
    >
      <DialogTitle>Aggiungi Esperienza Professionale</DialogTitle>
      <form onSubmit={handleSubmitWorkExperience(onSubmitWorkExperience)}>
        <DialogContent>
          <Grid container spacing={2}>
            <Grid size={{ xs: 12, md: 6 }}>
              <Controller
                name="company"
                control={controlWorkExperience}
                render={({ field }) => (
                  <Stack spacing={1}>
                    <FormLabel>Azienda *</FormLabel>
                    <TextField
                      {...field}
                      fullWidth
                      error={!!errorsWorkExperience.company}
                      helperText={errorsWorkExperience.company?.message}
                    />
                  </Stack>
                )}
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <Controller
                name="role"
                control={controlWorkExperience}
                render={({ field }) => (
                  <Stack spacing={1}>
                    <FormLabel>Ruolo *</FormLabel>
                    <TextField
                      {...field}
                      fullWidth
                      error={!!errorsWorkExperience.role}
                      helperText={errorsWorkExperience.role?.message}
                    />
                  </Stack>
                )}
              />
            </Grid>
            <Grid size={{ xs: 12 }}>
              <Controller
                name="contractType"
                control={controlWorkExperience}
                render={({ field }) => (
                  <FormControl
                    fullWidth
                    error={!!errorsWorkExperience.contractType}
                  >
                    <Stack spacing={1}>
                      <FormLabel>Tipo di Contratto *</FormLabel>
                      <Select {...field} displayEmpty>
                        <MenuItem value="" disabled>
                          Seleziona tipo di contratto
                        </MenuItem>
                        <MenuItem value="permanent">
                          Tempo Indeterminato
                        </MenuItem>
                        <MenuItem value="fixed-term">
                          Tempo Determinato
                        </MenuItem>
                        <MenuItem value="freelance">Freelance</MenuItem>
                      </Select>
                      {errorsWorkExperience.contractType && (
                        <FormHelperText>
                          {errorsWorkExperience.contractType?.message}
                        </FormHelperText>
                      )}
                    </Stack>
                  </FormControl>
                )}
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <Controller
                name="startDate"
                control={controlWorkExperience}
                render={({ field }) => (
                  <Stack spacing={1}>
                    <FormLabel>Data Inizio *</FormLabel>
                    <TextField
                      {...field}
                      fullWidth
                      type="date"
                      error={!!errorsWorkExperience.startDate}
                      helperText={errorsWorkExperience.startDate?.message}
                      InputLabelProps={{ shrink: true }}
                    />
                  </Stack>
                )}
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <Stack spacing={1}>
                <FormLabel>Data Fine *</FormLabel>
                {!isCurrentJob && (
                  <Controller
                    name="endDate"
                    control={controlWorkExperience}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        fullWidth
                        type="date"
                        error={!!errorsWorkExperience.endDate}
                        helperText={errorsWorkExperience.endDate?.message}
                        InputLabelProps={{ shrink: true }}
                      />
                    )}
                  />
                )}
                {isCurrentJob && (
                  <Controller
                    name="endDate"
                    control={controlWorkExperience}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        value="present"
                        fullWidth
                        disabled
                        InputLabelProps={{ shrink: true }}
                      />
                    )}
                  />
                )}
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={isCurrentJob}
                      onChange={(e) => setIsCurrentJob(e.target.checked)}
                    />
                  }
                  label="Lavoro attuale"
                />
              </Stack>
            </Grid>
            <Grid size={{ xs: 12 }}>
              <Controller
                name="description"
                control={controlWorkExperience}
                render={({ field }) => (
                  <Stack spacing={1}>
                    <FormLabel>Descrizione Attività (opzionale)</FormLabel>
                    <TextField
                      {...field}
                      fullWidth
                      multiline
                      rows={3}
                      error={!!errorsWorkExperience.description}
                      helperText={errorsWorkExperience.description?.message}
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
              setIsCurrentJob(false);
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

export default AddWorkExperienceDialog;
