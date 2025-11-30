/**
 * Constants and Configuration for Career Coach MCP Frontend
 */

// ============= API CONFIGURATION =============

export const API_CONFIG = {
  BASE_URL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000',
  TIMEOUT: 30000, // 30 seconds
  ENDPOINTS: {
    // Auth
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
    LOGOUT: '/auth/logout',
    REFRESH_TOKEN: '/auth/refresh',
    
    // User Profile
    USER_PROFILE: '/users/:id',
    UPDATE_PROFILE: '/users/:id',
    CREATE_PROFILE: '/users/:id/profile',
    
    // Exams
    IMPORT_ESSE3: '/exams/import-esse3',
    USER_EXAMS: '/exams/user/:userId',
    ADD_EXAM: '/exams',
    UPDATE_EXAM: '/exams/:id',
    DELETE_EXAM: '/exams/:id',
    
    // Chat
    CHAT_MESSAGE: '/chat/message',
    CHAT_HISTORY: '/chat/history/:userId',
    
    // Tools (optional direct calls)
    EXTRACT_SKILLS: '/tools/extract-skills',
    SUGGEST_CAREERS: '/tools/suggest-careers',
    GENERATE_CV: '/tools/generate-cv',
    FIND_JOBS: '/tools/find-jobs',
  },
} as const;

// ============= OPENROUTER CONFIGURATION =============

export const OPENROUTER_CONFIG = {
  API_KEY: import.meta.env.VITE_OPENROUTER_API_KEY || '',
  BASE_URL: 'https://openrouter.ai/api/v1',
  DEFAULT_MODEL: 'anthropic/claude-3.5-sonnet', // Modello di default
  MODELS: {
    CLAUDE_SONNET: 'anthropic/claude-3.5-sonnet',
    CLAUDE_HAIKU: 'anthropic/claude-3-haiku',
    GPT4: 'openai/gpt-4-turbo-preview',
    GPT35: 'openai/gpt-3.5-turbo',
  },
} as const;

// ============= INTERVIEW STEPS =============

export const INTERVIEW_STEPS = {
  PERSONAL: 1,
  EXAMS: 2,
  INTERESTS: 3,
  EXPERIENCES: 4,
  SKILLS: 5,
} as const;

export const INTERVIEW_STEP_TITLES = {
  [INTERVIEW_STEPS.PERSONAL]: 'Dati Anagrafici',
  [INTERVIEW_STEPS.EXAMS]: 'Esami e Voti',
  [INTERVIEW_STEPS.INTERESTS]: 'Interessi Professionali',
  [INTERVIEW_STEPS.EXPERIENCES]: 'Esperienze Pratiche',
  [INTERVIEW_STEPS.SKILLS]: 'Competenze Tecniche',
} as const;

export const INTERVIEW_STEP_DESCRIPTIONS = {
  [INTERVIEW_STEPS.PERSONAL]: 'Inserisci i tuoi dati personali e accademici',
  [INTERVIEW_STEPS.EXAMS]: 'Connetti ESSE3 o inserisci manualmente gli esami sostenuti',
  [INTERVIEW_STEPS.INTERESTS]: 'Indica le tue preferenze professionali e di carriera',
  [INTERVIEW_STEPS.EXPERIENCES]: 'Aggiungi progetti e esperienze lavorative',
  [INTERVIEW_STEPS.SKILLS]: 'Specifica le tue competenze tecniche e linguistiche',
} as const;

// ============= CAREER OPTIONS =============

export const WORK_STYLES = [
  { value: 'remote', label: 'Remoto' },
  { value: 'hybrid', label: 'Ibrido' },
  { value: 'onsite', label: 'In sede' },
] as const;

export const COMPANY_TYPES = [
  { value: 'startup', label: 'Startup' },
  { value: 'scaleup', label: 'Scaleup' },
  { value: 'corporate', label: 'Corporate' },
  { value: 'consulting', label: 'Consulenza' },
  { value: 'agency', label: 'Agenzia' },
] as const;

export const TECH_AREAS = [
  'Artificial Intelligence',
  'Machine Learning',
  'Data Science',
  'Data Engineering',
  'Web Development',
  'Mobile Development',
  'Cloud Computing',
  'DevOps',
  'Cybersecurity',
  'Blockchain',
  'IoT',
  'Game Development',
  'AR/VR',
  'Big Data',
  'Full Stack Development',
  'Frontend Development',
  'Backend Development',
  'QA/Testing',
  'Product Management',
  'UI/UX Design',
] as const;

export const ITALIAN_CITIES = [
  'Milano',
  'Roma',
  'Torino',
  'Bologna',
  'Firenze',
  'Napoli',
  'Genova',
  'Venezia',
  'Verona',
  'Padova',
  'Trieste',
  'Bergamo',
  'Brescia',
  'Remoto',
  'Estero',
] as const;

// ============= SKILLS =============

export const PROGRAMMING_LANGUAGES = [
  'Python',
  'Java',
  'JavaScript',
  'TypeScript',
  'C',
  'C++',
  'C#',
  'Go',
  'Rust',
  'Swift',
  'Kotlin',
  'PHP',
  'Ruby',
  'R',
  'MATLAB',
  'SQL',
  'Scala',
  'Shell/Bash',
] as const;

export const FRAMEWORKS_TOOLS = [
  'React',
  'Angular',
  'Vue.js',
  'Next.js',
  'Node.js',
  'Express',
  'NestJS',
  'Django',
  'Flask',
  'FastAPI',
  'Spring Boot',
  'Laravel',
  '.NET',
  'TensorFlow',
  'PyTorch',
  'Keras',
  'Scikit-learn',
  'Pandas',
  'NumPy',
] as const;

export const DATABASES = [
  'PostgreSQL',
  'MySQL',
  'MongoDB',
  'Redis',
  'SQLite',
  'Oracle',
  'SQL Server',
  'Cassandra',
  'DynamoDB',
  'Firebase',
  'Elasticsearch',
] as const;

export const DEVOPS_TOOLS = [
  'Docker',
  'Kubernetes',
  'Git',
  'GitHub',
  'GitLab',
  'Jenkins',
  'CI/CD',
  'AWS',
  'Azure',
  'Google Cloud',
  'Terraform',
  'Ansible',
  'Linux',
  'Nginx',
] as const;

export const SOFT_SKILLS = [
  'Problem Solving',
  'Teamwork',
  'Communication',
  'Leadership',
  'Critical Thinking',
  'Time Management',
  'Adaptability',
  'Creativity',
  'Attention to Detail',
  'Project Management',
  'Analytical Thinking',
  'Collaboration',
] as const;

export const LANGUAGE_LEVELS = [
  { value: 'A1', label: 'A1 - Principiante' },
  { value: 'A2', label: 'A2 - Elementare' },
  { value: 'B1', label: 'B1 - Intermedio' },
  { value: 'B2', label: 'B2 - Intermedio Superiore' },
  { value: 'C1', label: 'C1 - Avanzato' },
  { value: 'C2', label: 'C2 - Padronanza' },
  { value: 'native', label: 'Madrelingua' },
] as const;

export const PROFICIENCY_LEVELS = [
  { value: 'beginner', label: 'Principiante' },
  { value: 'intermediate', label: 'Intermedio' },
  { value: 'advanced', label: 'Avanzato' },
  { value: 'expert', label: 'Esperto' },
] as const;

// ============= DEGREES =============

export const DEGREE_TYPES = [
  { value: 'bachelor', label: 'Laurea Triennale' },
  { value: 'master', label: 'Laurea Magistrale' },
] as const;

// ============= VALIDATION =============

export const VALIDATION_RULES = {
  MIN_AGE: 18,
  MAX_AGE: 100,
  MIN_GRADE: 18,
  MAX_GRADE: 31, // 30 e lode = 31
  MIN_ECTS: 1,
  MAX_ECTS: 30,
  PASSWORD_MIN_LENGTH: 8,
  EMAIL_REGEX: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
} as const;

// ============= UI CONSTANTS =============

export const ANIMATION_DURATION = {
  FAST: 200,
  MEDIUM: 300,
  SLOW: 500,
} as const;

export const BREAKPOINTS = {
  XS: 0,
  SM: 600,
  MD: 960,
  LG: 1280,
  XL: 1920,
} as const;

export const Z_INDEX = {
  DRAWER: 1200,
  APP_BAR: 1100,
  MODAL: 1300,
  SNACKBAR: 1400,
  TOOLTIP: 1500,
} as const;

// ============= ERROR MESSAGES =============

export const ERROR_MESSAGES = {
  GENERIC: 'Si è verificato un errore. Riprova più tardi.',
  NETWORK: 'Errore di connessione. Verifica la tua connessione internet.',
  UNAUTHORIZED: 'Sessione scaduta. Effettua nuovamente il login.',
  VALIDATION: 'Alcuni campi non sono validi. Controlla e riprova.',
  NOT_FOUND: 'Risorsa non trovata.',
  SERVER_ERROR: 'Errore del server. Riprova più tardi.',
} as const;

// ============= SUCCESS MESSAGES =============

export const SUCCESS_MESSAGES = {
  PROFILE_SAVED: 'Profilo salvato con successo!',
  EXAM_ADDED: 'Esame aggiunto con successo!',
  ESSE3_CONNECTED: 'Connessione ESSE3 riuscita!',
  CV_GENERATED: 'CV generato con successo!',
  SETTINGS_SAVED: 'Impostazioni salvate!',
} as const;

// ============= MCP TOOL NAMES =============

export const MCP_TOOLS = {
  EXTRACT_SKILLS: 'extract_skills_from_profile',
  SUGGEST_CAREERS: 'suggest_career_job_families',
  GENERATE_CV: 'generate_cv_europass',
  FIND_JOBS: 'find_jobs',
} as const;

export const MCP_TOOL_DESCRIPTIONS = {
  [MCP_TOOLS.EXTRACT_SKILLS]: 'Analizza gli esami e identifica le competenze acquisite',
  [MCP_TOOLS.SUGGEST_CAREERS]: 'Suggerisce ruoli professionali e job families in base al tuo profilo',
  [MCP_TOOLS.GENERATE_CV]: 'Genera un curriculum Europass personalizzato',
  [MCP_TOOLS.FIND_JOBS]: 'Cerca offerte di lavoro reali in base ai tuoi criteri',
} as const;

// ============= LOCAL STORAGE KEYS =============

export const STORAGE_KEYS = {
  AUTH_TOKEN: 'auth_token',
  REFRESH_TOKEN: 'refresh_token',
  USER_DATA: 'user_data',
  INTERVIEW_PROGRESS: 'interview_progress',
  THEME_MODE: 'theme_mode',
} as const;

// ============= ROUTES =============

export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  REGISTER: '/register',
  INTERVIEW: '/interview',
  CHAT: '/chat',
  PROFILE: '/profile',
  SETTINGS: '/settings',
  CV: '/cv',
  JOBS: '/jobs',
} as const;
