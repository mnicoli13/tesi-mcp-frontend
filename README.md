# Career Coach MCP - Frontend

> Applicazione web per career coaching personalizzato dedicata a studenti e neolaureati STEM, basata su Model Context Protocol (MCP).

## 📚 Progetto Tesi Universitaria

Questo è il frontend di una tesi universitaria che sviluppa un sistema completo di career coaching. Il backend (server MCP) è in un repository separato.

**Obiettivo**: Fornire un'interfaccia moderna e professionale per raccogliere dati degli studenti e offrire supporto alla carriera tramite AI e tools MCP personalizzati.

## 🚀 Quick Start

### Prerequisites

- Node.js ≥ 18.x
- npm ≥ 9.x

### Installation

```bash
# Clone repository
git clone git@github.com:mnicoli13/tesi-mcp-frontend.git

# Navigate to project directory
cd tesi-mcp-frontend

# Install dependencies
npm install
```

### Development

```bash
# Start dev server
npm run dev
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
