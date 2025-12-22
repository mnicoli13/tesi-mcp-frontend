import { Box, Paper, Typography, Divider, Stack, Chip } from "@mui/material";
import {
  Person,
  School,
  Code,
  Language,
  EmojiObjects,
  AccountBox,
  Work,
  Build,
  DriveEta,
  Phone,
  Home,
} from "@mui/icons-material";

interface PersonalInfo {
  first_name: string;
  last_name: string;
  email: string;
  age?: number;
  phone?: string;
  address?: string;
  city?: string;
  postal_code?: string;
  driver_licenses?: string[];
}

interface Education {
  degree: string;
  field_of_study?: string;
  institution: string;
  city?: string;
  country?: string;
  start_year: number;
  end_year: number;
  grade?: string;
  subjects?: string[];
}

interface WorkExperience {
  role: string;
  company: string;
  contract_type?: string;
  city?: string;
  country?: string;
  start_date: string;
  end_date?: string;
  description: string;
  ai_generated_description?: string;
  achievements?: string[];
}

interface Project {
  title: string;
  description: string;
  technologies?: string;
  link?: string;
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
    work_experience?: WorkExperience[];
    technical_skills?: string[];
    soft_skills?: string[];
    projects?: Project[];
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
    work_experience,
    technical_skills,
    soft_skills,
    projects,
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
        {personal_info.age && (
          <Typography variant="body2">Età: {personal_info.age} anni</Typography>
        )}
        {personal_info.phone && (
          <Stack direction="row" spacing={1} alignItems="center" mt={0.5}>
            <Phone fontSize="small" />
            <Typography variant="body2">{personal_info.phone}</Typography>
          </Stack>
        )}
        {(personal_info.address ||
          personal_info.city ||
          personal_info.postal_code) && (
          <Stack direction="row" spacing={1} alignItems="center" mt={0.5}>
            <Home fontSize="small" />
            <Typography variant="body2">
              {[
                personal_info.address,
                personal_info.postal_code,
                personal_info.city,
              ]
                .filter(Boolean)
                .join(", ")}
            </Typography>
          </Stack>
        )}
        {personal_info.driver_licenses &&
          personal_info.driver_licenses.length > 0 && (
            <Stack direction="row" spacing={1} alignItems="center" mt={1}>
              <DriveEta fontSize="small" />
              <Typography variant="body2" mr={1}>
                Patenti:
              </Typography>
              <Stack direction="row" spacing={0.5}>
                {personal_info.driver_licenses.map((license, idx) => (
                  <Chip
                    key={idx}
                    label={license}
                    size="small"
                    sx={{
                      bgcolor: "white",
                      color: "primary.main",
                      fontWeight: "bold",
                    }}
                  />
                ))}
              </Stack>
            </Stack>
          )}
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
                {edu.field_of_study && (
                  <Typography
                    variant="body2"
                    color="primary.main"
                    fontWeight="medium"
                  >
                    {edu.field_of_study}
                  </Typography>
                )}
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  {edu.institution}
                  {edu.city && ` • ${edu.city}`}
                  {edu.country && ` • ${edu.country}`}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  {edu.start_year} - {edu.end_year}
                  {edu.grade && ` • Voto: ${edu.grade}`}
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

        {/* Work Experience */}
        {work_experience && work_experience.length > 0 && (
          <>
            <SectionTitle
              icon={<Work color="primary" />}
              title="Esperienze Lavorative"
            />
            {work_experience.map((exp, idx) => (
              <Box key={idx} mb={3}>
                <Typography variant="subtitle1" fontWeight="bold">
                  {exp.role}
                </Typography>
                <Typography
                  variant="body2"
                  color="primary.main"
                  fontWeight="medium"
                >
                  {exp.company}
                  {exp.contract_type && ` • ${exp.contract_type}`}
                </Typography>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  {exp.city && `${exp.city}`}
                  {exp.city && exp.country && `, `}
                  {exp.country && `${exp.country}`}
                </Typography>
                <Typography
                  variant="caption"
                  color="text.secondary"
                  display="block"
                  mb={1}
                >
                  {new Date(exp.start_date).toLocaleDateString("it-IT", {
                    month: "long",
                    year: "numeric",
                  })}
                  {" - "}
                  {exp.end_date
                    ? new Date(exp.end_date).toLocaleDateString("it-IT", {
                        month: "long",
                        year: "numeric",
                      })
                    : "Presente"}
                </Typography>

                {/* AI Generated Description (if available) */}
                {exp.ai_generated_description && (
                  <Paper
                    variant="outlined"
                    sx={{
                      p: 2,
                      mb: 1,
                      bgcolor: "primary.50",
                      borderColor: "primary.main",
                      borderLeft: "4px solid",
                    }}
                  >
                    <Typography variant="body2" sx={{ textAlign: "justify" }}>
                      {exp.ai_generated_description}
                    </Typography>
                  </Paper>
                )}

                {/* Original Description */}
                {exp.description && !exp.ai_generated_description && (
                  <Typography
                    variant="body2"
                    paragraph
                    sx={{ textAlign: "justify" }}
                  >
                    {exp.description}
                  </Typography>
                )}

                {/* Achievements */}
                {exp.achievements && exp.achievements.length > 0 && (
                  <Box mt={1}>
                    <Typography
                      variant="caption"
                      color="text.secondary"
                      fontWeight="bold"
                      display="block"
                      mb={0.5}
                    >
                      Risultati principali:
                    </Typography>
                    <Box component="ul" sx={{ mt: 0, pl: 2 }}>
                      {exp.achievements.map((achievement, i) => (
                        <Typography
                          key={i}
                          component="li"
                          variant="body2"
                          color="text.secondary"
                          sx={{ mb: 0.5 }}
                        >
                          {achievement}
                        </Typography>
                      ))}
                    </Box>
                  </Box>
                )}
              </Box>
            ))}
            <Divider sx={{ my: 3 }} />
          </>
        )}

        {/* Projects */}
        {projects && projects.length > 0 && (
          <>
            <SectionTitle icon={<Build color="primary" />} title="Progetti" />
            {projects.map((project, idx) => (
              <Box key={idx} mb={3}>
                <Typography variant="subtitle1" fontWeight="bold">
                  {project.title}
                </Typography>
                <Typography
                  variant="body2"
                  paragraph
                  sx={{ textAlign: "justify", mt: 1 }}
                >
                  {project.description}
                </Typography>
                {project.technologies && (
                  <Typography
                    variant="caption"
                    color="text.secondary"
                    display="block"
                    mb={0.5}
                  >
                    <strong>Tecnologie:</strong> {project.technologies}
                  </Typography>
                )}
                {project.link && (
                  <Typography variant="caption" color="primary.main">
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ textDecoration: "none", color: "inherit" }}
                    >
                      🔗 {project.link}
                    </a>
                  </Typography>
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
