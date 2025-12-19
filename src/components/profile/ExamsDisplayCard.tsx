import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardActions,
  Typography,
  Button,
  Box,
  Chip,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Stack,
} from "@mui/material";
import { ExamData } from "../../types/interview";
import EditIcon from "@mui/icons-material/Edit";
import StarIcon from "@mui/icons-material/Star";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import { useNavigate } from "react-router-dom";

interface ExamsDisplayCardProps {
  data?: ExamData;
}

const INITIAL_EXAMS_TO_SHOW = 5;

const ExamsDisplayCard: React.FC<ExamsDisplayCardProps> = ({ data }) => {
  const navigate = useNavigate();
  const [isExpanded, setIsExpanded] = useState(false);

  const handleEdit = () => {
    navigate("/interview?step=1", { state: { from: "/profile" } });
  };

  if (!data || !data.exams || data.exams.length === 0) {
    return (
      <Card elevation={2}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Esami e Voti
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Non hai ancora aggiunto esami.
          </Typography>
        </CardContent>
        <CardActions sx={{ justifyContent: "flex-end", px: 2, pb: 2 }}>
          <Button
            size="small"
            startIcon={<EditIcon />}
            onClick={handleEdit}
            variant="outlined"
          >
            Aggiungi Esami
          </Button>
        </CardActions>
      </Card>
    );
  }

  const averageGrade =
    data.exams.reduce((acc, exam) => acc + exam.grade, 0) / data.exams.length;
  const totalCredits = data.exams.reduce((acc, exam) => acc + exam.ects, 0);

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
            Esami e Voti
          </Typography>
          <Chip
            label="Step 2"
            color="primary"
            variant="outlined"
            sx={{ px: 2 }}
          />
        </Box>

        {data.importedFromEsse3 && (
          <Chip
            label="Importati da ESSE3"
            color="success"
            variant="outlined"
            size="small"
            sx={{ mb: 2 }}
          />
        )}

        <Stack direction="row" spacing={2} mb={2}>
          <Box>
            <Typography
              variant="caption"
              color="text.secondary"
              display="block"
            >
              Media Voti
            </Typography>
            <Typography variant="h6" color="primary.main">
              {averageGrade.toFixed(2)}
            </Typography>
          </Box>
          <Box>
            <Typography
              variant="caption"
              color="text.secondary"
              display="block"
            >
              Totale CFU
            </Typography>
            <Typography variant="h6" color="primary.main">
              {totalCredits}
            </Typography>
          </Box>
          <Box>
            <Typography
              variant="caption"
              color="text.secondary"
              display="block"
            >
              Esami
            </Typography>
            <Typography variant="h6" color="primary.main">
              {data.exams.length}
            </Typography>
          </Box>
        </Stack>

        <Box sx={{ position: "relative" }}>
          <TableContainer
            component={Paper}
            variant="outlined"
            sx={{
              position: "relative",
              "&::before":
                !isExpanded && data.exams.length > INITIAL_EXAMS_TO_SHOW
                  ? {
                      content: '""',
                      position: "absolute",
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 0,
                      background:
                        "linear-gradient(180deg, rgba(255, 255, 255, 0) -3.29%, #FFFFFF 93.05%)",
                      pointerEvents: "none",
                      borderRadius: 1,
                      transition: "opacity 0.3s ease",
                      zIndex: 1,
                    }
                  : {},
            }}
          >
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell sx={{ fontWeight: 600 }}>Esame</TableCell>
                  <TableCell align="right" sx={{ fontWeight: 600 }}>
                    Voto
                  </TableCell>
                  <TableCell align="right" sx={{ fontWeight: 600 }}>
                    CFU
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {(isExpanded
                  ? data.exams
                  : data.exams.slice(0, INITIAL_EXAMS_TO_SHOW)
                ).map((exam) => (
                  <TableRow key={exam.id}>
                    <TableCell>
                      <Box display="flex" alignItems="center" gap={0.5}>
                        {exam.preferred && (
                          <StarIcon fontSize="small" color="warning" />
                        )}
                        {exam.name}
                      </Box>
                    </TableCell>
                    <TableCell align="right">
                      <Typography
                        fontWeight={exam.grade >= 28 ? 600 : 400}
                        color={
                          exam.grade >= 28 ? "success.main" : "text.primary"
                        }
                      >
                        {exam.grade}
                      </Typography>
                    </TableCell>
                    <TableCell align="right">{exam.ects}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          {/* Expand/Collapse Button */}
          {data.exams.length > INITIAL_EXAMS_TO_SHOW && (
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                mt: isExpanded ? 2 : 0,
              }}
            >
              <Button
                color="primary"
                onClick={() => setIsExpanded(!isExpanded)}
                endIcon={isExpanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                sx={{
                  textTransform: "none",
                  px: 3,
                  py: 1,
                }}
              >
                {isExpanded ? "Mostra meno" : "Mostra tutti gli esami"}
              </Button>
            </Box>
          )}
        </Box>
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

export default ExamsDisplayCard;
