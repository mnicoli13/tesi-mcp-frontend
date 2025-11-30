# Career Coach MCP - Frontend

> Applicazione web per career coaching personalizzato dedicata a studenti e neolaureati STEM, basata su Model Context Protocol (MCP).

## 📚 Progetto Tesi Universitaria

Questo è il frontend di una tesi universitaria che sviluppa un sistema completo di career coaching. Il backend (server MCP) è in un repository separato.

**Obiettivo**: Fornire un'interfaccia moderna e professionale per raccogliere dati degli studenti e offrire supporto alla carriera tramite AI e tools MCP personalizzati.

## 🛠 Stack Tecnologico

### Core
- **React 18** - UI Framework
- **TypeScript** - Type safety
- **Vite** - Build tool e dev server
- **Material UI (MUI)** - Component library

### AI Integration
- **Vercel AI SDK** - Chat AI integration
- **OpenRouter** - LLM provider (Claude, GPT-4)
- **MCP Protocol** - Model Context Protocol integration

### State Management & Forms
- **React Context** - Global state
- **React Hook Form** - Form management

### Backend Integration
- **Axios** - HTTP client
- **REST API** - Backend communication

## 🚀 Quick Start

### Prerequisites

- Node.js ≥ 18.x
- npm ≥ 9.x

### Installation

```bash
# Clone repository
git clone <repository-url>
cd mcp-rekog-fe

# Install dependencies
npm install

# Copy environment variables
cp .env.example .env.local

# Edit .env.local with your credentials
# VITE_API_BASE_URL=http://localhost:3000
# VITE_OPENROUTER_API_KEY=your_key_here
```

### Development

```bash
# Start dev server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Lint code
npm run lint

# Type check
npm run type-check
```

## 📂 Struttura Progetto

```
mcp-rekog-fe/
├── .agent/
│   └── rules.md                    # Regole Antigravity
├── docs/
│   ├── abstract.txt                # Abstract tesi
│   ├── intervista.txt              # Flusso intervista
│   ├── requisiti.tex               # Requisiti e architettura
│   └── design-system.md            # Design system
├── src/
│   ├── components/
│   │   ├── common/                 # Componenti riusabili
│   │   ├── interview/              # Componenti step 1-5
│   │   └── chat/                   # Componenti chatbot
│   ├── context/                    # React Context providers
│   ├── hooks/                      # Custom hooks
│   ├── services/                   # API calls
│   ├── types/                      # TypeScript types
│   ├── constants/                  # Costanti app
│   ├── theme/                      # MUI theme
│   ├── utils/                      # Utility functions
│   ├── App.tsx                     # Main app component
│   └── main.tsx                    # Entry point
├── public/                         # Static assets
├── .env.example                    # Environment variables template
└── package.json
```

## 🎯 Architettura Applicazione

### Fasi dell'Applicazione

#### Fase 1: Intervista (5 Step)

Raccolta dati utente attraverso form guidati:

1. **Anagrafica** - Dati personali e accademici
2. **Esami e Voti** - Import ESSE3 o inserimento manuale
3. **Interessi Professionali** - Preferenze carriera
4. **Esperienze Pratiche** - Progetti e tirocini
5. **Competenze** - Skills tecniche e linguistiche

#### Fase 2: Chatbot

Interfaccia chat AI per invocare tools MCP:

- `extract_skills_from_profile` - Analisi skills da esami
- `suggest_career_job_families` - Suggerimenti ruoli
- `generate_cv_europass` - Generazione CV
- `find_jobs` - Ricerca offerte lavoro

## 🎨 Design System

Il progetto segue un design system professionale ma moderno, documentato in [`docs/design-system.md`](./docs/design-system.md).

### Principi Chiave

✅ **Professionale ma Accattivante** - Adatto a contesto universitario  
✅ **Coerenza** - Component library unificata  
✅ **Accessibilità** - WCAG 2.1 AA compliance  
✅ **Responsive** - Mobile-first approach  

### Palette Colori

- **Primary**: Blu professionale (#1976d2)
- **Secondary**: Teal (#00897b)
- **Background**: Grigio chiaro (#fafafa)

### Tipografia

- **Font**: Roboto, Inter
- **Gerarchia**: Da H1 (2.5rem) a Body2 (0.875rem)

## 🔌 Backend API

L'applicazione si interfaccia con API REST esposte dal backend MCP.

### Endpoints Principali

```typescript
// Authentication
POST /auth/login
POST /auth/register

// User Profile
GET /users/:id
PUT /users/:id

// Exams
POST /exams/import-esse3
GET /exams/user/:userId

// Chat (MCP)
POST /chat/message
GET /chat/history/:userId
```

Configurare `VITE_API_BASE_URL` in `.env.local`.

## 🧩 Tools MCP Integrati

### 1. Extract Skills from Profile
Analizza esami sostenuti e inferisce hard/soft skills.

### 2. Suggest Career & Job Families
Suggerisce ruoli professionali basati su esami, voti e preferenze.

### 3. Generate CV Europass
Genera curriculum Europass strutturato e personalizzato.

### 4. Find Jobs
Ricerca offerte di lavoro reali via API esterne (Adzuna, Jooble, JSearch).

## 📝 Type Safety

Il progetto è completamente tipizzato con TypeScript. Tutti i types sono definiti in `src/types/index.ts`:

```typescript
interface UserProfile { ... }
interface Exam { ... }
interface MCPToolResponse<T> { ... }
// ... e molti altri
```

## 🎨 Componenti UI Riutilizzabili

### Esempio: Button

```tsx
import { Button } from '@mui/material';

<Button variant="contained" color="primary" size="large">
  Avanti
</Button>
```

### Esempio: Form Field

```tsx
import { TextField } from '@mui/material';

<TextField
  label="Nome"
  variant="outlined"
  fullWidth
  error={!!errors.firstName}
  helperText={errors.firstName}
/>
```

## 🔒 Sicurezza

- ✅ Credenziali in variabili d'ambiente
- ✅ Validazione client-side
- ✅ Token JWT per autenticazione
- ✅ HTTPS only in produzione

## ♿️ Accessibilità

- ✅ Contrasto colori WCAG 2.1 AA
- ✅ Navigazione da tastiera
- ✅ ARIA labels
- ✅ Screen reader friendly

## 📱 Responsive Design

- **Mobile**: 375px - 599px
- **Tablet**: 600px - 959px
- **Desktop**: 960px+

Tutti i componenti sono mobile-first.

## 🧪 Testing (Planned)

```bash
# Unit tests
npm run test

# E2E tests
npm run test:e2e

# Coverage
npm run test:coverage
```

## 📦 Build e Deploy

```bash
# Build production
npm run build

# Output: dist/
```

Deploy su Vercel, Netlify, o static hosting:

```bash
# Vercel
vercel deploy

# Netlify
netlify deploy --prod
```

## 🤝 Contribuire (se applicabile)

1. Fork repository
2. Create feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open Pull Request

## 📄 License

Questo progetto è sviluppato come parte di una tesi universitaria.

## 👤 Autore

**Matteo Nicoli**  
Tesi: "Progettazione e sviluppo di un server MCP integrato in una web app con funzionalità di career coach per studenti universitari"

## 📚 Documentazione Aggiuntiva

- [Regole Antigravity](./.agent/rules.md)
- [Design System](./docs/design-system.md)
- [Abstract Tesi](./docs/abstract.txt)
- [Requisiti e Architettura](./docs/requisiti.tex)

## 🐛 Known Issues

Nessuno al momento.

## 🗺 Roadmap

- [ ] Implementazione Step 1-5 intervista
- [ ] Integrazione ESSE3 API
- [ ] Chat AI interface
- [ ] Tool response rendering
- [ ] CV Europass preview
- [ ] Job search interface
- [ ] Mobile optimization
- [ ] Testing suite
- [ ] Documentation completeness

## ❓ FAQ

### Come mi collego al backend?

Imposta `VITE_API_BASE_URL` in `.env.local` con l'URL del server MCP.

### Quale modello AI usare?

Consigliato: Claude 3.5 Sonnet via OpenRouter. Configurare API key in `.env.local`.

### Come aggiungo un nuovo step all'intervista?

1. Crea componente in `src/components/interview/`
2. Aggiungi step in `src/constants/index.ts`
3. Aggiorna routing e progress indicator

### Posso personalizzare il tema?

Sì, modifica `src/theme/theme.ts` seguendo le linee guida del design system.

---

**Nota**: Questo è un progetto di tesi universitaria. Il focus è su qualità del codice, design professionale e documentazione completa.
