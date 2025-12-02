import {
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
  DialogContent,
  Grid,
  TextField,
} from "@mui/material";
import { Dispatch, SetStateAction } from "react";
import { Controller, UseFormHandleSubmit } from "react-hook-form";
import { Exam } from "../../../types/interview";

interface ImportExamDialogProps {
  openAddDialog: boolean;
  setOpenAddDialog: Dispatch<SetStateAction<boolean>>;
  onSubmitExam: (data: Omit<Exam, "id">) => void;
  control: any;
  errors: any;
  handleSubmit: UseFormHandleSubmit<Omit<Exam, "id">, Omit<Exam, "id">>;
}

const ImportExamDialog: React.FC<ImportExamDialogProps> = ({
  openAddDialog,
  setOpenAddDialog,
  onSubmitExam,
  control,
  errors,
  handleSubmit,
}) => {
  return (
    <Dialog
      open={openAddDialog}
      onClose={() => setOpenAddDialog(false)}
      maxWidth="sm"
      fullWidth
    >
      <DialogTitle>Aggiungi Esame</DialogTitle>
      <form onSubmit={handleSubmit(onSubmitExam)}>
        <DialogContent>
          <Grid container spacing={2}>
            <Grid size={{ xs: 12 }}>
              <Controller
                name="name"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    label="Nome Esame *"
                    error={!!errors.name}
                    helperText={errors.name?.message}
                    variant="outlined"
                  />
                )}
              />
            </Grid>
            <Grid size={{ xs: 6 }}>
              <Controller
                name="grade"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    label="Voto *"
                    type="number"
                    error={!!errors.grade}
                    helperText={errors.grade?.message || "18-30 (31 per lode)"}
                    variant="outlined"
                    inputProps={{ min: 18, max: 31 }}
                  />
                )}
              />
            </Grid>
            <Grid size={{ xs: 6 }}>
              <Controller
                name="ects"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    label="CFU *"
                    type="number"
                    error={!!errors.ects}
                    helperText={errors.ects?.message}
                    variant="outlined"
                    inputProps={{ min: 1, max: 30 }}
                  />
                )}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenAddDialog(false)}>Annulla</Button>
          <Button type="submit" variant="contained" color="primary">
            Aggiungi
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default ImportExamDialog;
