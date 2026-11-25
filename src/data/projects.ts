// CONTENUTI COME DATI: i Progetti (PROGETTO.md §7, sezione 06).
// Per aggiungere un progetto basta aggiungere un oggetto a questa lista:
// la pagina si aggiorna da sola. L'ordine è quello della lista
// (dal più recente).

import type { StaticImageData } from "next/image";
import fareShare from "@/assets/progetti/fare-share.jpg";
import aiReadiness from "@/assets/progetti/ai-readiness.png";

export interface ProjectLink {
  label: string; // es. "Demo", "Repository"
  href: string;
}

export interface Project {
  id: string; // chiave stabile per React
  title: string;
  year: string;
  description: string;
  type: string; // che cos'è (riga "Tipo")
  stack: string[]; // con cosa è fatto (riga "Stack")
  links: ProjectLink[];
  image: StaticImageData; // schermata della demo (per la rotonda)
}

export const projectsSection = {
  label: "Selezione",
  title: "Progetti",
};

export const projects: Project[] = [
  {
    id: "fare-share",
    title: "Fare Share",
    year: "2026",
    description:
      "Calcola il costo di un tragitto in auto — carburante, traffico, spese accessorie — e lo divide in modo equo tra chi lo condivide. Funziona offline, senza account e senza backend: i dati restano sul dispositivo.",
    type: "Web app installabile (PWA)",
    stack: [
      "HTML",
      "CSS",
      "JavaScript",
      "Leaflet",
      "Service Worker",
      "GitHub Actions",
    ],
    links: [
      { label: "Demo", href: "https://sabrina-rizzi.github.io/fare-share/" },
      {
        label: "Repository",
        href: "https://github.com/sabrina-rizzi/fare-share",
      },
    ],
    image: fareShare,
  },
  {
    id: "ai-readiness",
    title: "AI Readiness Assessment Pro",
    year: "2026",
    description:
      "Valuta quanto un'organizzazione è pronta ad adottare l'intelligenza artificiale, su sei aree: strategia, dati, processi, competenze, infrastruttura, etica e conformità. Allineato all'EU AI Act, con confronto sui benchmark di settore, simulatore “what-if” e report in PDF ed Excel.",
    type: "Strumento di analisi",
    stack: ["Python", "Streamlit"],
    links: [
      { label: "Demo", href: "https://ai-readiness-pro.streamlit.app/" },
      {
        label: "Repository",
        href: "https://github.com/sabrina-rizzi/ai-readiness-assessment-pro",
      },
    ],
    image: aiReadiness,
  },
];
