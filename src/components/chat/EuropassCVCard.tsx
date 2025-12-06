import { Box, Paper, Typography, Divider, Stack, Chip } from "@mui/material";
import {
  Person,
  School,
  Code,
  Language,
  EmojiObjects,
  AccountBox,
} from "@mui/icons-material";

interface PersonalInfo {
  first_name: string;
  last_name: string;
  email: string;
  age: number;
}

interface Education {
  degree: string;
  institution: string;
  country: string;
  start_year: number;
  end_year: number;
  subjects?: string[];
}

interface LanguageSkill {
  language: string;
  level: string;
}

interface CVData {
  cv_sections: {
    personal_info: PersonalInfo;
    professional_objective?: string;
    education?: Education[];
    work_experience?: any[];
    technical_skills?: string[];
    soft_skills?: string[];
    projects?: any[];
    languages?: LanguageSkill[];
    other_info?: string;
  };
  format: string;
  generated_at: string;
}

interface EuropassCVCardProps {
  cvData: CVData;
}

export default function EuropassCVCard({ cvData }: EuropassCVCardProps) {
  const { cv_sections } = cvData;
  const {
    personal_info,
    professional_objective,
    education,
    technical_skills,
    soft_skills,
    languages,
    other_info,
  } = cv_sections;

  const SectionTitle = ({
    icon,
    title,
  }: {
    icon: React.ReactNode;
    title: string;
  }) => (
    <Stack direction="row" spacing={1} alignItems="center" mb={2}>
      {icon}
      <Typography variant="h6" fontWeight="bold" color="primary.main">
        {title}
      </Typography>
    </Stack>
  );

  return (
    <Paper
      elevation={3}
      sx={{
        maxWidth: 800,
        mx: "auto",
        mt: 2,
        bgcolor: "white",
        border: "1px solid",
        borderColor: "primary.main",
      }}
    >
      {/* Header Europass Style */}
      <Box
        sx={{
          bgcolor: "primary.main",
          color: "white",
          p: 3,
          borderBottom: "4px solid",
          borderColor: "primary.dark",
        }}
      >
        <Typography variant="h4" fontWeight="bold" gutterBottom>
          {personal_info.first_name} {personal_info.last_name}
        </Typography>
        <Typography variant="subtitle1">{personal_info.email}</Typography>
        <Typography variant="body2">Età: {personal_info.age} anni</Typography>
      </Box>

      {/* Content */}
      <Box sx={{ p: 4 }}>
        {/* Professional Objective */}
        {professional_objective && (
          <>
            <SectionTitle
              icon={<AccountBox color="primary" />}
              title="Obiettivo Professionale"
            />
            <Typography
              variant="body1"
              paragraph
              sx={{ textAlign: "justify", mb: 3 }}
            >
              {professional_objective}
            </Typography>
            <Divider sx={{ my: 3 }} />
          </>
        )}

        {/* Education */}
        {education && education.length > 0 && (
          <>
            <SectionTitle
              icon={<School color="primary" />}
              title="Istruzione"
            />
            {education.map((edu, idx) => (
              <Box key={idx} mb={3}>
                <Typography variant="subtitle1" fontWeight="bold">
                  {edu.degree}
                </Typography>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  {edu.institution} • {edu.country}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  {edu.start_year} - {edu.end_year}
                </Typography>
                {edu.subjects && edu.subjects.length > 0 && (
                  <Box mt={1}>
                    <Typography
                      variant="caption"
                      color="text.secondary"
                      fontWeight="bold"
                      display="block"
                      mb={0.5}
                    >
                      Principali materie di studio:
                    </Typography>
                    <Stack direction="row" flexWrap="wrap" gap={0.5}>
                      {edu.subjects.map((subject, i) => (
                        <Chip
                          key={i}
                          label={subject}
                          size="small"
                          variant="outlined"
                          sx={{ fontSize: "0.7rem" }}
                        />
                      ))}
                    </Stack>
                  </Box>
                )}
              </Box>
            ))}
            <Divider sx={{ my: 3 }} />
          </>
        )}

        {/* Skills Section */}
        <Box sx={{ display: "flex", gap: 3, flexWrap: "wrap" }}>
          {/* Technical Skills */}
          {technical_skills && technical_skills.length > 0 && (
            <Box sx={{ flex: "1 1 45%", minWidth: 250 }}>
              <SectionTitle
                icon={<Code color="primary" />}
                title="Competenze Tecniche"
              />
              <Stack direction="row" flexWrap="wrap" gap={1}>
                {technical_skills.map((skill, idx) => (
                  <Chip
                    key={idx}
                    label={skill}
                    color="primary"
                    variant="outlined"
                    size="small"
                  />
                ))}
              </Stack>
            </Box>
          )}

          {/* Soft Skills */}
          {soft_skills && soft_skills.length > 0 && (
            <Box sx={{ flex: "1 1 45%", minWidth: 250 }}>
              <SectionTitle
                icon={<EmojiObjects color="primary" />}
                title="Competenze Trasversali"
              />
              <Stack direction="row" flexWrap="wrap" gap={1}>
                {soft_skills.map((skill, idx) => (
                  <Chip
                    key={idx}
                    label={skill}
                    color="secondary"
                    variant="outlined"
                    size="small"
                  />
                ))}
              </Stack>
            </Box>
          )}
        </Box>

        {/* Languages */}
        {languages && languages.length > 0 && (
          <>
            <Divider sx={{ my: 3 }} />
            <SectionTitle icon={<Language color="primary" />} title="Lingue" />
            <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
              {languages.map((lang, idx) => (
                <Box key={idx} sx={{ flex: "1 1 30%", minWidth: 150 }}>
                  <Paper
                    variant="outlined"
                    sx={{
                      p: 2,
                      textAlign: "center",
                      bgcolor: "grey.50",
                    }}
                  >
                    <Typography variant="subtitle2" fontWeight="bold">
                      {lang.language}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {lang.level}
                    </Typography>
                  </Paper>
                </Box>
              ))}
            </Box>
          </>
        )}

        {/* Other Info */}
        {other_info && (
          <>
            <Divider sx={{ my: 3 }} />
            <SectionTitle
              icon={<Person color="primary" />}
              title="Note Aggiuntive"
            />
            <Typography variant="body2" sx={{ textAlign: "justify" }}>
              {other_info}
            </Typography>
          </>
        )}
      </Box>

      {/* Footer */}
      <Box
        sx={{
          bgcolor: "grey.100",
          p: 2,
          borderTop: "1px solid",
          borderColor: "grey.300",
        }}
      >
        <Typography
          variant="caption"
          color="text.secondary"
          align="center"
          display="block"
        >
          CV Europass generato il{" "}
          {new Date(cvData.generated_at).toLocaleDateString("it-IT", {
            day: "2-digit",
            month: "long",
            year: "numeric",
          })}
        </Typography>
      </Box>
    </Paper>
  );
}
