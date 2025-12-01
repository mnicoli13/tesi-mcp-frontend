import {
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
  DialogContent,
  Grid,
  TextField,
  Autocomplete,
  Chip,
  Stack,
  FormLabel,
} from "@mui/material";
import { Dispatch, SetStateAction } from "react";
import { Controller, UseFormHandleSubmit } from "react-hook-form";
import { DialogType } from "../Step4Experiences";
import { Internship } from "../../../types/interview";

interface AddStageDialogProps {
  openDialog: string | null;
  setOpenDialog: Dispatch<SetStateAction<DialogType>>;
  handleSubmitInternship: UseFormHandleSubmit<
    Omit<Internship, "id">,
    Omit<Internship, "id">
  >;
  onSubmitInternship: (data: Omit<Internship, "id">) => void;
  errorsInternship: any;
  controlInternship: any;
  allTechnologies: string[];
}

const AddStageDialog: React.FC<AddStageDialogProps> = ({
  openDialog,
  setOpenDialog,
  handleSubmitInternship,
  onSubmitInternship,
  errorsInternship,
  controlInternship,
  allTechnologies,
}) => {
  return (
    <Dialog
      open={openDialog === "internship"}
      onClose={() => setOpenDialog(null)}
      maxWidth="md"
      fullWidth
    >
      <DialogTitle>Aggiungi Tirocinio/Stage</DialogTitle>
      <form onSubmit={handleSubmitInternship(onSubmitInternship)}>
        <DialogContent>
          <Grid container spacing={2}>
            <Grid size={{ xs: 12, md: 6 }}>
              <Controller
                name="company"
                control={controlInternship}
                render={({ field }) => (
                  <Stack spacing={1}>
                    <FormLabel>Azienda *</FormLabel>
                    <TextField
                      {...field}
                      fullWidth
                      error={!!errorsInternship.company}
                      helperText={errorsInternship.company?.message}
                    />
                  </Stack>
                )}
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <Controller
                name="role"
                control={controlInternship}
                render={({ field }) => (
                  <Stack spacing={1}>
                    <FormLabel>Ruolo *</FormLabel>
                    <TextField
                      {...field}
                      fullWidth
                      error={!!errorsInternship.role}
                      helperText={errorsInternship.role?.message}
                    />
                  </Stack>
                )}
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <Controller
                name="startDate"
                control={controlInternship}
                render={({ field }) => (
                  <Stack spacing={1}>
                    <FormLabel>Data Inizio *</FormLabel>
                    <TextField
                      {...field}
                      fullWidth
                      type="date"
                      error={!!errorsInternship.startDate}
                      helperText={errorsInternship.startDate?.message}
                      InputLabelProps={{ shrink: true }}
                    />
                  </Stack>
                )}
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <Controller
                name="endDate"
                control={controlInternship}
                render={({ field }) => (
                  <Stack spacing={1}>
                    <FormLabel>Data Fine *</FormLabel>
                    <TextField
                      {...field}
                      fullWidth
                      type="date"
                      error={!!errorsInternship.endDate}
                      helperText={errorsInternship.endDate?.message}
                      InputLabelProps={{ shrink: true }}
                    />
                  </Stack>
                )}
              />
            </Grid>
            <Grid size={{ xs: 12 }}>
              <Controller
                name="description"
                control={controlInternship}
                render={() => (
                  <Stack spacing={1}>
                    <FormLabel>Descrizione Attività *</FormLabel>
                    <TextField
                      fullWidth
                      multiline
                      rows={3}
                      error={!!errorsInternship.description}
                      helperText={errorsInternship.description?.message}
                    />
                  </Stack>
                )}
              />
            </Grid>
            <Grid size={{ xs: 12 }}>
              <Controller
                name="technologies"
                control={controlInternship}
                render={({ field }) => (
                  <Stack spacing={1}>
                    <FormLabel>Tecnologie Utilizzate *</FormLabel>
                    <Autocomplete
                      {...field}
                      multiple
                      options={allTechnologies}
                      value={field.value}
                      onChange={(_, newValue) => field.onChange(newValue)}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label="Tecnologie Utilizzate *"
                          error={!!errorsInternship.technologies}
                          helperText={errorsInternship.technologies?.message}
                        />
                      )}
                      renderTags={(value, getTagProps) =>
                        value.map((option, index) => (
                          <Chip
                            label={option}
                            {...getTagProps({ index })}
                            size="small"
                            key={option}
                          />
                        ))
                      }
                      freeSolo
                    />
                  </Stack>
                )}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(null)}>Annulla</Button>
          <Button type="submit" variant="contained" color="primary">
            Aggiungi
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default AddStageDialog;
