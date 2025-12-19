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
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import { SkillsData } from "../../types/interview";
import EditIcon from "@mui/icons-material/Edit";
import { useNavigate } from "react-router-dom";
import { LANGUAGE_LEVEL_LABELS } from "../../constants/interviewConstants";

interface SkillsDisplayCardProps {
  data?: SkillsData;
}

const SkillsDisplayCard: React.FC<SkillsDisplayCardProps> = ({ data }) => {
  const navigate = useNavigate();

  const handleEdit = () => {
    navigate("/interview?step=4", { state: { from: "/profile" } });
  };

  if (!data) {
    return (
      <Card elevation={2}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Lingue e Patenti
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

  const hasLanguages = data.languages && data.languages.length > 0;
  const hasDriverLicenses =
    data.driverLicenses && data.driverLicenses.length > 0;

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
            Lingue e Patenti
          </Typography>
          <Chip
            label="Step 5"
            color="primary"
            variant="outlined"
            sx={{ px: 2 }}
          />
        </Box>

        <Grid container spacing={3}>
          {/* Spoken Languages */}
          <Grid size={{ xs: 12 }}>
            <Typography
              variant="subtitle1"
              fontWeight={600}
              gutterBottom
              color="text.secondary"
            >
              Lingue Parlate
            </Typography>
            {hasLanguages ? (
              <TableContainer component={Paper} variant="outlined">
                <Table size="small">
                  <TableHead>
                    <TableRow>
                      <TableCell>Lingua</TableCell>
                      <TableCell align="right">Livello</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {data.languages.map((lang) => (
                      <TableRow key={lang.name}>
                        <TableCell>{lang.name}</TableCell>
                        <TableCell align="right">
                          <Chip
                            label={LANGUAGE_LEVEL_LABELS[lang.level]}
                            color="primary"
                            size="small"
                            variant="outlined"
                          />
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            ) : (
              <Typography variant="body2" color="text.secondary">
                Nessuna lingua specificata
              </Typography>
            )}
          </Grid>

          {/* Driver Licenses */}
          <Grid size={{ xs: 12 }}>
            <Typography
              variant="subtitle1"
              fontWeight={600}
              gutterBottom
              color="text.secondary"
            >
              Patenti
            </Typography>
            {hasDriverLicenses ? (
              <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
                {data.driverLicenses.map((license) => (
                  <Chip
                    key={license}
                    label={license}
                    color="success"
                    variant="outlined"
                  />
                ))}
              </Stack>
            ) : (
              <Typography variant="body2" color="text.secondary">
                Nessuna patente specificata
              </Typography>
            )}
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

export default SkillsDisplayCard;
