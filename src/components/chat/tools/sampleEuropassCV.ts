// Sample Europass CV data for testing the enhanced UI

export const sampleEuropassCV = {
  cv_sections: {
    personal_info: {
      first_name: "Marco",
      last_name: "Rossi",
      email: "marco.rossi@email.com",
      age: 26,
      phone: "+39 348 123 4567",
      address: "Via Giuseppe Garibaldi, 45",
      city: "Bergamo",
      postal_code: "24100",
      driver_licenses: ["B"],
    },

    professional_objective:
      "Diplomato in Informatica con esperienza nel sviluppo full-stack e particolare interesse per le tecnologie web moderne. Orientato al problem-solving e alla collaborazione in team, cerco un'opportunità che mi permetta di crescere professionalmente in un ambiente dinamico e innovativo, contribuendo allo sviluppo di soluzioni digitali di qualità.",

    education: [
      {
        degree: "Laurea Triennale in Informatica",
        field_of_study: "Informatica",
        institution: "Università degli Studi di Bergamo",
        city: "Bergamo",
        country: "Italia",
        start_year: 2017,
        end_year: 2020,
        grade: "105/110",
        subjects: [
          "Programmazione orientata agli oggetti",
          "Algoritmi e strutture dati",
          "Basi di dati",
          "Ingegneria del software",
          "Reti di calcolatori",
        ],
      },
      {
        degree: "Diploma di Maturità Scientifica",
        field_of_study: "Scienze",
        institution: "Liceo Scientifico Lorenzo Mascheroni",
        city: "Bergamo",
        country: "Italia",
        start_year: 2012,
        end_year: 2017,
        grade: "92/100",
      },
    ],

    work_experience: [
      {
        role: "Full-Stack Developer",
        company: "TechSolutions S.r.l.",
        contract_type: "Full-time",
        city: "Milano",
        country: "Italia",
        start_date: "2021-03-01",
        end_date: "2025-12-18",
        description:
          "Sviluppo e manutenzione di applicazioni web per clienti del settore bancario e assicurativo",
        ai_generated_description:
          "Nel ruolo di Full-Stack Developer ho contribuito allo sviluppo di soluzioni web scalabili per importanti clienti del settore finanziario. Mi sono occupato dell'implementazione di nuove funzionalità sia lato frontend che backend, collaborando attivamente con il team di design e i product manager per garantire la migliore user experience. Ho partecipato a tutte le fasi del ciclo di sviluppo software, dalla raccolta dei requisiti al deployment in produzione.",
        achievements: [
          "Ridotto i tempi di caricamento del 40% ottimizzando le query al database",
          "Implementato sistema di autenticazione OAuth 2.0 per 3 applicazioni web",
          "Guidato la migrazione da JavaScript a TypeScript di un progetto legacy",
        ],
      },
      {
        role: "Junior Web Developer",
        company: "WebFactory",
        contract_type: "Stage",
        city: "Bergamo",
        country: "Italia",
        start_date: "2020-09-01",
        end_date: "2021-02-28",
        description:
          "Stage curriculare focalizzato sullo sviluppo frontend con React",
        ai_generated_description:
          "Durante lo stage ho avuto l'opportunità di lavorare su progetti reali, sviluppando interfacce utente moderne e responsive utilizzando React e MaterialUI. Ho collaborato con sviluppatori senior che mi hanno mentorizzato nell'apprendimento delle best practices di sviluppo e nell'utilizzo degli strumenti di versioning. L'esperienza mi ha permesso di consolidare le conoscenze teoriche acquisite all'università applicandole in contesti professionali concreti.",
        achievements: [
          "Sviluppato 5 componenti riutilizzabili per la libreria aziendale",
          "Contribuito al redesign del portale clienti con oltre 10.000 utenti attivi",
        ],
      },
    ],

    technical_skills: [
      "JavaScript / TypeScript",
      "React.js",
      "Node.js",
      "NestJS",
      "PostgreSQL",
      "MongoDB",
      "Git / GitHub",
      "Docker",
      "REST API",
      "HTML5 / CSS3",
      "TailwindCSS",
    ],

    soft_skills: [
      "Lavoro in team",
      "Problem solving",
      "Gestione del tempo",
      "Comunicazione efficace",
      "Adattabilità",
      "Apprendimento continuo",
      "Attenzione ai dettagli",
    ],

    projects: [
      {
        title: "Sistema di Gestione Biblioteca Universitaria",
        description:
          "Progetto universitario per la gestione del prestito libri con interfaccia web e sistema di notifiche",
        technologies: "React, Express.js, MongoDB",
        link: "https://github.com/marcorossi/biblioteca-app",
      },
      {
        title: "Task Manager Personale",
        description:
          "Applicazione web per la gestione delle attività quotidiane con funzionalità di calendar e promemoria",
        technologies: "Next.js, PostgreSQL, Prisma ORM",
        link: "https://github.com/marcorossi/task-manager",
      },
      {
        title: "Portfolio Personale",
        description:
          "Sito web personale per mostrare progetti e competenze professionali",
        technologies: "React, TailwindCSS, Framer Motion",
        link: "https://marcorossi.dev",
      },
    ],

    languages: [
      {
        language: "Italiano",
        level: "Madrelingua",
      },
      {
        language: "Inglese",
        level: "B2 - Livello intermedio superiore",
      },
      {
        language: "Spagnolo",
        level: "A2 - Livello elementare",
      },
    ],

    other_info:
      "Appassionato di tecnologia e innovazione, dedico parte del mio tempo libero all'approfondimento di nuove tecnologie attraverso corsi online e partecipazione a meetup locali. Pratico regolarmente sport di squadra (calcetto settimanale) che mi ha insegnato l'importanza della collaborazione e della comunicazione. Nel tempo libero contribuisco a progetti open source su GitHub e scrivo articoli tecnici sul mio blog personale.",
  },

  format: "europass",
  generated_at: new Date().toISOString(),
};
