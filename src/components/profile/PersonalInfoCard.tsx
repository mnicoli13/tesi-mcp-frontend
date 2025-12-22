import React from "react";
import {
  Card,
  CardContent,
  CardActions,
  Typography,
  Grid,
  Button,
  Box,
  Chip,
} from "@mui/material";
import { PersonalData } from "../../types/interview";
import EditIcon from "@mui/icons-material/Edit";
import { useNavigate } from "react-router-dom";
import { DEGREE_TYPE_LABELS } from "../../constants/interviewConstants";

interface PersonalInfoCardProps {
  data?: PersonalData;
}

const PersonalInfoCard: React.FC<PersonalInfoCardProps> = ({ data }) => {
  const navigate = useNavigate();

  const handleEdit = () => {
    navigate("/interview?step=0", { state: { from: "/profile" } });
  };

  if (!data) {
    return (
      <Card elevation={2}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Dati Anagrafici
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Non hai ancora completato questa sezione.
          </Typography>
        </CardContent>
        <CardActions sx={{ justifyContent: "flex-end", px: 2, pb: 2 }}>
          <Button
            size="small"
            startIcon={<EditIcon />}
            onClick={handleEdit}
            variant="outlined"
          >
            Compila
          </Button>
        </CardActions>
      </Card>
    );
  }

  return (
    <Card elevation={2}>
      <CardContent>
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="start"
          mb={2}
        >
          <Typography variant="h6" fontWeight={600}>
            Dati Anagrafici
          </Typography>
          <Chip
            label="Step 1"
            variant="outlined"
            color="primary"
            sx={{ px: 2 }}
          />
        </Box>

        <Grid container spacing={2}>
          <Grid size={{ xs: 12, sm: 6, md: 4 }}>
            <Typography
              variant="caption"
              color="text.secondary"
              display="block"
            >
              Nome
            </Typography>
            <Typography variant="body1" fontWeight={500}>
              {data.firstName}
            </Typography>
          </Grid>
          <Grid size={{ xs: 12, sm: 6, md: 4 }}>
            <Typography
              variant="caption"
              color="text.secondary"
              display="block"
            >
              Cognome
            </Typography>
            <Typography variant="body1" fontWeight={500}>
              {data.lastName}
            </Typography>
          </Grid>
          <Grid size={{ xs: 12, sm: 6, md: 4 }}>
            <Typography
              variant="caption"
              color="text.secondary"
              display="block"
            >
              Età
            </Typography>
            <Typography variant="body1">{data.age} anni</Typography>
          </Grid>
          <Grid size={{ xs: 12, sm: 6, md: 4 }}>
            <Typography
              variant="caption"
              color="text.secondary"
              display="block"
            >
              Università
            </Typography>
            <Typography variant="body1">{data.university}</Typography>
          </Grid>
          <Grid size={{ xs: 12, sm: 6, md: 4 }}>
            <Typography
              variant="caption"
              color="text.secondary"
              display="block"
            >
              Tipo di Laurea
            </Typography>
            <Typography variant="body1">
              {data.degreeType !== "unselected"
                ? DEGREE_TYPE_LABELS[data.degreeType]
                : "Non specificato"}
            </Typography>
          </Grid>
          <Grid size={{ xs: 12, sm: 6, md: 4 }}>
            <Typography
              variant="caption"
              color="text.secondary"
              display="block"
            >
              Corso di Studi
            </Typography>
            <Typography variant="body1">{data.courseOfStudy}</Typography>
          </Grid>
          <Grid size={{ xs: 12, sm: 6, md: 4 }}>
            <Typography
              variant="caption"
              color="text.secondary"
              display="block"
            >
              Anno di Laurea
            </Typography>
            <Typography variant="body1">{data.graduationYear}</Typography>
          </Grid>
        </Grid>
      </CardContent>
      <CardActions sx={{ justifyContent: "flex-end", px: 2, pb: 2 }}>
        <Button
          startIcon={<EditIcon />}
          onClick={handleEdit}
          variant="contained"
        >
          Modifica
        </Button>
      </CardActions>
    </Card>
  );
};

export default PersonalInfoCard;
