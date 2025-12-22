import React from "react";
import {
  Card,
  CardContent,
  CardActions,
  Typography,
  Button,
  Box,
  Chip,
  Stack,
  Grid,
} from "@mui/material";
import { InterestsData } from "../../types/interview";
import EditIcon from "@mui/icons-material/Edit";
import { useNavigate } from "react-router-dom";
import {
  WORK_STYLE_LABELS,
  COMPANY_TYPE_LABELS,
} from "../../constants/interviewConstants";

interface InterestsDisplayCardProps {
  data?: InterestsData;
}

const InterestsDisplayCard: React.FC<InterestsDisplayCardProps> = ({
  data,
}) => {
  const navigate = useNavigate();

  const handleEdit = () => {
    navigate("/interview?step=2", { state: { from: "/profile" } });
  };

  if (!data) {
    return (
      <Card elevation={2}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Interessi Professionali
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Non hai ancora specificato i tuoi interessi.
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
            Interessi Professionali
          </Typography>
          <Chip
            label="Step 3"
            color="primary"
            variant="outlined"
            sx={{ px: 2 }}
          />
        </Box>

        <Grid container spacing={3}>
          <Grid size={12}>
            <Typography
              variant="caption"
              color="text.secondary"
              display="block"
              mb={1}
            >
              Aree di Interesse
            </Typography>
            <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
              {data.areasOfInterest.map((area) => (
                <Chip
                  key={area}
                  label={area}
                  color="secondary"
                  variant="outlined"
                />
              ))}
            </Stack>
          </Grid>

          <Grid size={{ xs: 12, sm: 6 }}>
            <Typography
              variant="caption"
              color="text.secondary"
              display="block"
              mb={1}
            >
              Tipo di Aziende
            </Typography>
            <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
              {data.companyType.map((type) => (
                <Chip
                  key={type}
                  label={COMPANY_TYPE_LABELS[type]}
                  color="primary"
                  variant="outlined"
                  size="small"
                />
              ))}
            </Stack>
          </Grid>

          <Grid size={{ xs: 12, sm: 6 }}>
            <Typography
              variant="caption"
              color="text.secondary"
              display="block"
              mb={1}
            >
              Modalità di Lavoro
            </Typography>
            <Chip
              label={WORK_STYLE_LABELS[data.workStyle]}
              color="success"
              variant="filled"
            />
          </Grid>

          <Grid size={{ xs: 12 }}>
            <Typography
              variant="caption"
              color="text.secondary"
              display="block"
              mb={1}
            >
              Preferenze Geografiche
            </Typography>
            <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
              {data.geographicPreferences.map((location) => (
                <Chip
                  key={location}
                  label={location}
                  color="info"
                  variant="outlined"
                  size="small"
                />
              ))}
            </Stack>
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

export default InterestsDisplayCard;
