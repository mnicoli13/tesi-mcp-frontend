import * as yup from 'yup';
import {
  WorkStyle,
  CompanyType,
  EnglishLevel,
  SkillLevel,
} from '../types/interview';

// Step 1 - Anagrafica
export const personalDataSchema = yup.object().shape({
  firstName: yup
    .string()
    .required('Il nome è obbligatorio')
    .min(2, 'Il nome deve contenere almeno 2 caratteri')
    .max(50, 'Il nome non può superare 50 caratteri'),
  lastName: yup
    .string()
    .required('Il cognome è obbligatorio')
    .min(2, 'Il cognome deve contenere almeno 2 caratteri')
    .max(50, 'Il cognome non può superare 50 caratteri'),
  age: yup
    .number()
    .required("L'età è obbligatoria")
    .min(18, 'Devi avere almeno 18 anni')
    .max(100, 'Inserisci un\'età valida')
    .integer('L\'età deve essere un numero intero'),
  university: yup
    .string()
    .required("L'università è obbligatoria")
    .min(3, "Il nome dell'università deve contenere almeno 3 caratteri"),
  degreeType: yup
    .string()
    .oneOf(['bachelor', 'master'], 'Seleziona un tipo di laurea valido')
    .required('Il tipo di laurea è obbligatorio')
    .nullable(),
  courseOfStudy: yup
    .string()
    .required('Il corso di studi è obbligatorio')
    .min(3, 'Il corso di studi deve contenere almeno 3 caratteri')
    .max(100, 'Il corso di studi non può superare 100 caratteri'),
  graduationYear: yup
    .number()
    .required("L'anno di laurea è obbligatorio")
    .min(new Date().getFullYear() - 10, 'Inserisci un anno valido')
    .max(new Date().getFullYear() + 10, 'Inserisci un anno valido')
    .integer("L'anno deve essere un numero intero"),
});

// Step 2 - Esami
export const examSchema = yup.object().shape({
  name: yup
    .string()
    .required("Il nome dell'esame è obbligatorio")
    .min(3, "Il nome dell'esame deve contenere almeno 3 caratteri")
    .max(100, "Il nome dell'esame non può superare 100 caratteri"),
  grade: yup
    .number()
    .required('Il voto è obbligatorio')
    .min(18, 'Il voto minimo è 18')
    .max(31, 'Il voto massimo è 30 e lode (31)')
    .integer('Il voto deve essere un numero intero'),
  ects: yup
    .number()
    .required('I CFU sono obbligatori')
    .min(1, 'I CFU devono essere almeno 1')
    .max(30, 'I CFU non possono superare 30')
    .integer('I CFU devono essere un numero intero'),
  preferred: yup.boolean(),
});

export const examDataSchema = yup.object().shape({
  exams: yup
    .array()
    .of(examSchema)
    .min(1, 'Inserisci almeno un esame')
    .required('Devi inserire almeno un esame'),
  preferredExams: yup.array().of(yup.string()),
  motivation: yup.string().max(500, 'La motivazione non può superare 500 caratteri'),
  importedFromEsse3: yup.boolean().required(),
});

// Step 3 - Interessi Professionali
export const interestsDataSchema = yup.object().shape({
  areasOfInterest: yup
    .array()
    .of(yup.string())
    .min(1, 'Seleziona almeno un\'area di interesse')
    .required('Le aree di interesse sono obbligatorie'),
  companyType: yup
    .array()
    .of(yup.mixed<CompanyType>().oneOf(Object.values(CompanyType)))
    .min(1, 'Seleziona almeno un tipo di azienda')
    .required('Il tipo di azienda è obbligatorio'),
  workStyle: yup
    .mixed<WorkStyle>()
    .oneOf(Object.values(WorkStyle), 'Seleziona uno stile di lavoro valido')
    .required('Lo stile di lavoro è obbligatorio'),
  geographicPreferences: yup
    .array()
    .of(yup.string())
    .min(1, 'Seleziona almeno una preferenza geografica')
    .required('Le preferenze geografiche sono obbligatorie'),
});

// Step 4 - Esperienze Pratiche
export const projectSchema = yup.object().shape({
  name: yup
    .string()
    .required('Il nome del progetto è obbligatorio')
    .min(3, 'Il nome del progetto deve contenere almeno 3 caratteri')
    .max(100, 'Il nome del progetto non può superare 100 caratteri'),
  description: yup
    .string()
    .required('La descrizione è obbligatoria')
    .min(10, 'La descrizione deve contenere almeno 10 caratteri')
    .max(500, 'La descrizione non può superare 500 caratteri'),
  technologies: yup
    .array()
    .of(yup.string())
    .min(1, 'Inserisci almeno una tecnologia')
    .required('Le tecnologie sono obbligatorie'),
  githubLink: yup.string().url('Inserisci un URL valido'),
  type: yup.mixed<'university' | 'personal'>().oneOf(['university', 'personal']).required(),
});

export const internshipSchema = yup.object().shape({
  company: yup
    .string()
    .required("Il nome dell'azienda è obbligatorio")
    .min(2, "Il nome dell'azienda deve contenere almeno 2 caratteri")
    .max(100, "Il nome dell'azienda non può superare 100 caratteri"),
  role: yup
    .string()
    .required('Il ruolo è obbligatorio')
    .min(3, 'Il ruolo deve contenere almeno 3 caratteri')
    .max(100, 'Il ruolo non può superare 100 caratteri'),
  startDate: yup
    .string()
    .required('La data di inizio è obbligatoria')
    .matches(/^\d{4}-\d{2}-\d{2}$/, 'Formato data non valido (YYYY-MM-DD)'),
  endDate: yup
    .string()
    .required('La data di fine è obbligatoria')
    .matches(/^\d{4}-\d{2}-\d{2}$/, 'Formato data non valido (YYYY-MM-DD)')
    .test('is-after-start', 'La data di fine deve essere successiva alla data di inizio', function (value) {
      const { startDate } = this.parent;
      if (!startDate || !value) return true;
      return new Date(value) > new Date(startDate);
    }),
  description: yup
    .string()
    .required('La descrizione è obbligatoria')
    .min(10, 'La descrizione deve contenere almeno 10 caratteri')
    .max(500, 'La descrizione non può superare 500 caratteri'),
  technologies: yup
    .array()
    .of(yup.string())
    .min(1, 'Inserisci almeno una tecnologia')
    .required('Le tecnologie sono obbligatorie'),
});

export const experiencesDataSchema = yup.object().shape({
  universityProjects: yup.array().of(projectSchema),
  personalProjects: yup.array().of(projectSchema),
  internships: yup.array().of(internshipSchema),
});

// Step 5 - Skills
export const programmingLanguageSkillSchema = yup.object().shape({
  name: yup.string().required('Il linguaggio è obbligatorio'),
  level: yup
    .mixed<SkillLevel>()
    .oneOf(Object.values(SkillLevel), 'Seleziona un livello valido')
    .required('Il livello è obbligatorio'),
});

export const skillsDataSchema = yup.object().shape({
  programmingLanguages: yup
    .array()
    .of(programmingLanguageSkillSchema)
    .min(1, 'Inserisci almeno un linguaggio di programmazione')
    .required('I linguaggi di programmazione sono obbligatori'),
  frameworks: yup.array().of(yup.string()),
  databases: yup.array().of(yup.string()),
  devOps: yup.array().of(yup.string()),
  englishLevel: yup
    .mixed<EnglishLevel>()
    .oneOf(Object.values(EnglishLevel), 'Seleziona un livello di inglese valido')
    .required('Il livello di inglese è obbligatorio'),
  inferredFromProfile: yup.boolean().required(),
});
