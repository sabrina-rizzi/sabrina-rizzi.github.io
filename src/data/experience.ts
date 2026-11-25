// CONTENUTI COME DATI: il Percorso (PROGETTO.md §7, sezione 03).
// Ogni tappa ha un "kind": la home le divide in due blocchi (Esperienza /
// Formazione) filtrando su questo campo. Dentro ogni blocco l'ordine è
// quello di questa lista (cronologico inverso).

export type ExperienceKind = "work" | "education";

export interface Experience {
  kind: ExperienceKind;
  id: string; // chiave stabile per React (non cambia se riordini)
  title: string; // dove
  role: string; // cosa
  period: string; // quando
  description: string;
  tags?: string[];
}

export const experiences: Experience[] = [
  {
    id: "metline",
    kind: "work",
    title: "Metline — Gruppo Maestrale",
    role: "Junior AI Developer & Data Analyst",
    period: "Giu 2026 – Lug 2027",
    description:
      "Refactoring di codice legacy, sviluppo applicativo, automazione, data analysis e consulenza IT. Integrazione dell'AI nei processi: formazione dei colleghi senior sull'uso di agenti e chatbot, automazione di attività prima manuali, documentazione puntuale e uniforme.",
    tags: ["AI integration", "Refactoring", "Automazione", "Data analysis"],
  },
  {
    id: "its",
    kind: "education",
    title: "ITS Digital Academy “Mario Volpato”",
    role: "AI Developer & Data Analyst",
    period: "2025 – 2027",
    description:
      "Primo anno completato; secondo anno da settembre 2026, in Apprendistato Duale.",
    tags: [
      "Python",
      "Machine Learning",
      "Deep Learning",
      "Statistical Learning",
      "SQL",
      "Analisi dati",
      "React",
      "AI Act ed etica dell'AI",
    ],
  },
  {
    id: "alta-formazione",
    kind: "education",
    title: "Alta Formazione Forma.Temp — Umana",
    role: "Percorso di Alta Formazione “AI Developer”",
    period: "Apr 2026 – Giu 2026",
    description:
      "Intensivo di 200 ore presso ITS Digital Academy “Mario Volpato”, progettato con le aziende partner su esigenze reali di mercato e condizione di accesso all'Apprendistato Duale di I livello. Backend con FastAPI, SQLAlchemy e Alembic, PostgreSQL, frontend con Vue.js, architettura REST API, workflow Git.",
    tags: [
      "FastAPI",
      "SQLAlchemy",
      "Alembic",
      "PostgreSQL",
      "Vue.js",
      "Vite",
      "Figma",
      "Canva",
      "Git",
    ],
  },
  {
    id: "collina-dei-ciliegi",
    kind: "work",
    title: "La Collina dei Ciliegi — Grezzana (VR)",
    role: "Hospitality Manager · Account Manager Horeca Corporate",
    period: "Nov 2022 – Apr 2025",
    description:
      "Dalla wine education alla gestione dell'ospitalità di un wine resort di lusso, fino alle relazioni B2B con clienti corporate. In prima linea nella trasformazione digitale del reparto hospitality, dal lato dell'usabilità: dal registro cartaceo delle prenotazioni a software dedicati, poi l'analisi dei flussi di dati tra Hotel in Cloud, Cassa in Cloud ed Essenzia (Var Group) verso l'amministrazione, coordinando fornitori, tecnici, colleghi e direzione.",
    tags: [
      "Change Management",
      "Design Thinking",
      "Service Design",
      "Analisi dei requisiti",
      "Ottimizzazione dei processi",
      "Gestione stakeholder",
      "Team leadership",
    ],
  },
  {
    id: "formazione-settore",
    kind: "education",
    title: "Formazione di settore",
    role: "Vino ed enoturismo",
    period: "2023 – 2024",
    description:
      "WSET Level 2 Award in Wines (Wine & Spirit Education Trust, 2023); Wine Meridian — Divinea Wine Suite (2023); WTH Academy Advanced (2024), percorso di 25 ore sull'enoturismo per hospitality manager.",
    tags: [
      "Strategia digitale",
      "Profilazione avanzata del cliente",
      "Fidelizzazione dei clienti",
    ],
  },
  {
    id: "universita-trento",
    kind: "education",
    title: "Università degli Studi di Trento",
    role: "Viticoltura ed Enologia",
    period: "2016 – 2020",
    description:
      "Percorso non concluso: le basi tecniche del mondo del vino, da cui sono partite le esperienze successive.",
  },
];
