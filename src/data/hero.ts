// CONTENUTI COME DATI: il blocco d'apertura (sezione 01).
// La foto NON sta qui: è un file importato dal componente, così Next ne
// conosce le dimensioni e la ottimizza.

export const hero = {
  number: "01",
  label: "Portfolio",
  // Il nome su due righe: ogni riga compare da sotto la propria maschera.
  nameLines: ["Sabrina", "Rizzi"],
  role: "Junior AI Developer · Data Analyst",
  lead: "Porto l'intelligenza artificiale dentro i processi aziendali, partendo dalle persone che dovranno usarla.",
  // Tre righe "a colpo d'occhio": riprendono dati già presenti in
  // experience.ts (se cambiano lì, aggiornale anche qui).
  facts: [
    { term: "Ora", detail: "Metline — Gruppo Maestrale" },
    { term: "Formazione", detail: "ITS Digital Academy “Mario Volpato”" },
    { term: "Focus", detail: "Integrazione AI, automazione, data analysis" },
  ],
  photoAlt: "Ritratto di Sabrina Rizzi",
  actions: {
    primary: { label: "Contattami", href: "/contatti" },
    secondary: { label: "Scarica il CV", href: "/cv-sabrina-rizzi.pdf" },
  },
};
