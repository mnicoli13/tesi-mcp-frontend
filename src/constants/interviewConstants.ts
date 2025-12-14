export interface University {
  label: string;
  value: string;
}

/**
 * Lista completa università italiane con mapping ID Ateneo Cineca
 * Fonte: MIUR - Ministero dell'Università e della Ricerca + API Cineca
 * Ordinamento alfabetico per label
 */
export const ITALIAN_UNIVERSITIES: University[] = [
  { label: "Gran Sasso Science Institute", value: "gssi" },
  {
    label: "Istituto Universitario di Architettura di Venezia (IUAV)",
    value: "iuav",
  },
  { label: "IUSS Pavia", value: "iusspavia" },
  { label: "Politecnico di Bari", value: "poliba" },
  { label: "Politecnico di Milano", value: "polimi" },
  { label: "Politecnico di Torino", value: "polito" },
  { label: "Politecnico delle Marche", value: "univpm" },
  { label: "Scuola IMT Alti Studi Lucca", value: "imtlucca" },
  { label: "Scuola Normale Superiore di Pisa", value: "sns" },
  { label: "Scuola Superiore Sant'Anna di Pisa", value: "santanna" },
  {
    label:
      "SISSA - Scuola Internazionale Superiore di Studi Avanzati di Trieste",
    value: "sissa",
  },
  { label: "Università Ca' Foscari Venezia", value: "unive" },
  { label: "Università degli Studi dell'Aquila", value: "univaq" },
  { label: "Università degli Studi dell'Insubria", value: "uninsubria" },
  { label: "Università degli Studi della Basilicata", value: "unibas" },
  {
    label: 'Università degli Studi della Campania "Luigi Vanvitelli"',
    value: "unicampania",
  },
  { label: "Università degli Studi della Tuscia", value: "unitus" },
  { label: "Università degli Studi del Molise", value: "unimol" },
  { label: "Università degli Studi del Piemonte Orientale", value: "uniupo" },
  { label: "Università degli Studi del Sannio", value: "unisannio" },
  { label: "Università degli Studi del Salento", value: "unisalento" },
  { label: 'Università degli Studi di Bari "Aldo Moro"', value: "uniba" },
  { label: "Università degli Studi di Bergamo", value: "unibg" },
  { label: "Università degli Studi di Bologna", value: "unibo" },
  { label: "Università degli Studi di Brescia", value: "unibs" },
  { label: "Università degli Studi di Cagliari", value: "unica" },
  { label: "Università degli Studi di Camerino", value: "unicam" },
  {
    label: "Università degli Studi di Cassino e del Lazio Meridionale",
    value: "unicas",
  },
  { label: "Università degli Studi di Catania", value: "unict" },
  {
    label: 'Università degli Studi di Catanzaro "Magna Græcia"',
    value: "unicz",
  },
  { label: "Università degli Studi di Ferrara", value: "unife" },
  { label: "Università degli Studi di Firenze", value: "unifi" },
  { label: "Università degli Studi di Foggia", value: "unifg" },
  { label: "Università degli Studi di Genova", value: "unige" },
  { label: "Università degli Studi di Macerata", value: "unimc" },
  { label: "Università degli Studi di Messina", value: "unime" },
  { label: "Università degli Studi di Milano", value: "unimi" },
  { label: "Università degli Studi di Milano-Bicocca", value: "unimib" },
  {
    label: "Università degli Studi di Modena e Reggio Emilia",
    value: "unimore",
  },
  { label: 'Università degli Studi di Napoli "Federico II"', value: "unina" },
  {
    label: 'Università degli Studi di Napoli "L\'Orientale"',
    value: "uniorientale",
  },
  {
    label: 'Università degli Studi di Napoli "Parthenope"',
    value: "uniparthenope",
  },
  { label: "Università degli Studi di Padova", value: "unipd" },
  { label: "Università degli Studi di Palermo", value: "unipa" },
  { label: "Università degli Studi di Parma", value: "unipr" },
  { label: "Università degli Studi di Pavia", value: "unipv" },
  { label: "Università degli Studi di Perugia", value: "unipg" },
  { label: "Università degli Studi di Pisa", value: "unipi" },
  { label: 'Università degli Studi di Roma "La Sapienza"', value: "uniroma1" },
  { label: 'Università degli Studi di Roma "Tor Vergata"', value: "uniroma2" },
  { label: "Università degli Studi di Roma Tre", value: "uniroma3" },
  { label: 'Università degli Studi di Roma "Foro Italico"', value: "uniroma4" },
  { label: "Università degli Studi di Salerno", value: "unisa" },
  { label: "Università degli Studi di Sassari", value: "uniss" },
  { label: "Università degli Studi di Siena", value: "unisi" },
  { label: "Università degli Studi di Teramo", value: "unite" },
  { label: "Università degli Studi di Torino", value: "unito" },
  { label: "Università degli Studi di Trento", value: "unitn" },
  { label: "Università degli Studi di Trieste", value: "units" },
  { label: "Università degli Studi di Udine", value: "uniud" },
  { label: 'Università degli Studi di Urbino "Carlo Bo"', value: "uniurb" },
  { label: "Università degli Studi di Verona", value: "univr" },
  {
    label: 'Università degli Studi "Gabriele d\'Annunzio" Chieti-Pescara',
    value: "unich",
  },
  {
    label: 'Università degli Studi "Mediterranea" di Reggio Calabria',
    value: "unirc",
  },
  { label: "Università della Calabria", value: "unical" },
  { label: "Università per Stranieri di Perugia", value: "unistrapg" },
  { label: "Università per Stranieri di Siena", value: "unistrasi" },
  { label: "Altra università non in elenco", value: "other" },
];

// Aree di interesse professionali
export const AREAS_OF_INTEREST = [
  "Artificial Intelligence",
  "Machine Learning",
  "Data Science",
  "Data Engineering",
  "Cybersecurity",
  "Web Development",
  "Mobile Development",
  "Cloud Computing",
  "DevOps",
  "Backend Development",
  "Frontend Development",
  "Full Stack Development",
  "Software Engineering",
  "Database Management",
  "Networking",
  "IoT (Internet of Things)",
  "Blockchain",
  "Game Development",
  "Computer Vision",
  "Natural Language Processing",
  "Robotics",
  "Embedded Systems",
  "Big Data",
  "Business Intelligence",
  "IT Consulting",
];

// Preferenze geografiche italiane
export const ITALIAN_CITIES = [
  "Milano",
  "Roma",
  "Torino",
  "Bologna",
  "Firenze",
  "Napoli",
  "Genova",
  "Venezia",
  "Verona",
  "Padova",
  "Trieste",
  "Bari",
  "Catania",
  "Palermo",
  "Pisa",
  "Trento",
  "Perugia",
  "Ancona",
  "Cagliari",
  "Brescia",
  "Parma",
  "Modena",
  "Bergamo",
  "Estero",
  "Ovunque",
];

// Linguaggi di programmazione comuni
export const PROGRAMMING_LANGUAGES = [
  "Python",
  "Java",
  "JavaScript",
  "TypeScript",
  "C",
  "C++",
  "C#",
  "Go",
  "Rust",
  "PHP",
  "Ruby",
  "Swift",
  "Kotlin",
  "Scala",
  "R",
  "MATLAB",
  "SQL",
  "HTML/CSS",
  "Shell/Bash",
];

// Framework e tools comuni
export const FRAMEWORKS_AND_TOOLS = [
  "React",
  "Angular",
  "Vue.js",
  "Next.js",
  "Node.js",
  "Express",
  "Django",
  "Flask",
  "FastAPI",
  "Spring Boot",
  "ASP.NET",
  "Laravel",
  "Ruby on Rails",
  "TensorFlow",
  "PyTorch",
  "Keras",
  "Scikit-learn",
  "Pandas",
  "NumPy",
  "React Native",
  "Flutter",
  "Electron",
  "Bootstrap",
  "Tailwind CSS",
  "Material-UI",
];

// Database
export const DATABASES = [
  "MySQL",
  "PostgreSQL",
  "MongoDB",
  "Redis",
  "SQLite",
  "Oracle",
  "Microsoft SQL Server",
  "Cassandra",
  "Elasticsearch",
  "DynamoDB",
  "Firebase",
  "Neo4j",
  "MariaDB",
];

// DevOps e tools
export const DEVOPS_TOOLS = [
  "Git",
  "GitHub",
  "GitLab",
  "Docker",
  "Kubernetes",
  "AWS",
  "Azure",
  "Google Cloud Platform",
  "Jenkins",
  "Travis CI",
  "CircleCI",
  "GitHub Actions",
  "Terraform",
  "Ansible",
  "Nginx",
  "Apache",
  "Linux",
];

// Label per tipo di laurea
export const DEGREE_TYPE_LABELS = {
  bachelor: "Triennale",
  master: "Magistrale",
};

// Label per stile di lavoro
export const WORK_STYLE_LABELS = {
  remote: "Remoto",
  hybrid: "Ibrido",
  onsite: "In sede",
};

// Label per tipo di azienda
export const COMPANY_TYPE_LABELS = {
  startup: "Startup",
  corporate: "Grande azienda",
  consulting: "Consulenza",
  sme: "PMI (Piccola/Media Impresa)",
};

// Label per livello inglese
export const ENGLISH_LEVEL_LABELS = {
  A1: "A1 - Principiante",
  A2: "A2 - Elementare",
  B1: "B1 - Intermedio",
  B2: "B2 - Intermedio superiore",
  C1: "C1 - Avanzato",
  C2: "C2 - Padronanza",
  native: "Madrelingua",
};

// Label per livello skill
export const SKILL_LEVEL_LABELS = {
  basic: "Base",
  intermediate: "Intermedio",
  advanced: "Avanzato",
};
