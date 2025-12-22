import React, { useEffect } from "react";
import {
  Container,
  Box,
  Typography,
  CircularProgress,
  Alert,
  Stack,
} from "@mui/material";
import { useInterview } from "../hooks/interview/useInterview";
import PersonalInfoCard from "../components/profile/PersonalInfoCard";
import ExamsDisplayCard from "../components/profile/ExamsDisplayCard";
import InterestsDisplayCard from "../components/profile/InterestsDisplayCard";
import ExperiencesDisplayCard from "../components/profile/ExperiencesDisplayCard";
import SkillsDisplayCard from "../components/profile/SkillsDisplayCard";

const UserProfile: React.FC = () => {
  const { interviewData, isLoading, error, loadProgress } = useInterview();

  useEffect(() => {
    loadProgress();
  }, []);

  if (isLoading) {
    return (
      <Container maxWidth="lg">
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          minHeight="60vh"
        >
          <CircularProgress />
        </Box>
      </Container>
    );
  }

  if (error) {
    return (
      <Container maxWidth="lg">
        <Box py={4}>
          <Alert severity="error">{error}</Alert>
        </Box>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg">
      <Box py={4}>
        {/* Header */}
        <Box mb={2}>
          <Typography variant="h4" gutterBottom fontWeight={700}>
            Il Tuo Profilo
          </Typography>
          <Typography variant="body1" color="text.secondary" paragraph>
            Visualizza e modifica le informazioni del tuo profilo professionale.
          </Typography>
        </Box>

        {/* Profile Cards */}
        <Stack spacing={3}>
          {/* Step 1 - Personal Data */}
          <Box>
            <PersonalInfoCard data={interviewData.personal} />
          </Box>

          {/* Step 2 - Exams */}
          <Box>
            <ExamsDisplayCard data={interviewData.exams} />
          </Box>

          {/* Step 3 - Interests */}
          <Box>
            <InterestsDisplayCard data={interviewData.interests} />
          </Box>

          {/* Step 4 - Experiences (Full Width) */}
          <Box>
            <ExperiencesDisplayCard data={interviewData.experiences} />
          </Box>

          {/* Step 5 - Skills */}
          <Box>
            <SkillsDisplayCard data={interviewData.skills} />
          </Box>
        </Stack>
      </Box>
    </Container>
  );
};

export default UserProfile;
