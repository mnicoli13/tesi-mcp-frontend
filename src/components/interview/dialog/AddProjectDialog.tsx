import {
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
  DialogContent,
  Grid,
  TextField,
  FormLabel,
  Stack,
} from "@mui/material";
import { Dispatch, SetStateAction } from "react";
import { Controller, UseFormHandleSubmit } from "react-hook-form";
import { DialogType } from "../Step4Experiences";
import { Project } from "../../../types/interview";

interface AddProjectDialogProps {
  openDialog: string | null;
  setOpenDialog: Dispatch<SetStateAction<DialogType>>;
  handleSubmitProject: UseFormHandleSubmit<
    Omit<Project, "id">,
    Omit<Project, "id">
  >;
  onSubmitProject: (data: Omit<Project, "id">) => void;
  errorsProject: any;
  controlProject: any;
}

const AddProjectDialog: React.FC<AddProjectDialogProps> = ({
  openDialog,
  setOpenDialog,
  handleSubmitProject,
  onSubmitProject,
  errorsProject,
  controlProject,
}) => {
  return (
    <Dialog
      open={openDialog === "university" || openDialog === "personal"}
      onClose={() => setOpenDialog(null)}
      maxWidth="md"
      fullWidth
    >
      <DialogTitle>
        {openDialog === "university"
          ? "Aggiungi Progetto Universitario"
          : "Aggiungi Progetto Personale"}
      </DialogTitle>
      <form onSubmit={handleSubmitProject(onSubmitProject)}>
        <DialogContent>
          <Grid container spacing={2}>
            <Grid size={{ xs: 12 }}>
              <Controller
                name="name"
                control={controlProject}
                render={({ field }) => (
                  <Stack spacing={1}>
                    <FormLabel>Nome Progetto *</FormLabel>
                    <TextField
                      {...field}
                      fullWidth
                      error={!!errorsProject.name}
                      helperText={errorsProject.name?.message}
                    />
                  </Stack>
                )}
              />
            </Grid>
            <Grid size={{ xs: 12 }}>
              <Controller
                name="description"
                control={controlProject}
                render={({ field }) => (
                  <Stack spacing={1}>
                    <FormLabel>Descrizione *</FormLabel>
                    <TextField
                      {...field}
                      fullWidth
                      multiline
                      rows={3}
                      error={!!errorsProject.description}
                      helperText={errorsProject.description?.message}
                    />
                  </Stack>
                )}
              />
            </Grid>
            {openDialog === "personal" && (
              <Grid size={{ xs: 12 }}>
                <Controller
                  name="githubLink"
                  control={controlProject}
                  render={({ field }) => (
                    <Stack spacing={1}>
                      <FormLabel>Link GitHub (opzionale)</FormLabel>
                      <TextField
                        {...field}
                        fullWidth
                        error={!!errorsProject.githubLink}
                        helperText={errorsProject.githubLink?.message}
                        placeholder="https://github.com/username/repo"
                      />
                    </Stack>
                  )}
                />
              </Grid>
            )}
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

export default AddProjectDialog;
