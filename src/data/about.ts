// CONTENUTI COME DATI: la sezione About.
// Regole dei testi (PROGETTO.md §7): Design Thinking come METODOLOGIA,
// "Data Science" (non "Data Analysis"), nessuna cifra tipo "3+ anni".

export interface AboutPoint {
  term: string; // l'etichetta: "Background", "Metodo"...
  detail: string; // la riga che la spiega
}

export const about = {
  label: "About",
  title: "Chi sono",
  // La frase guida: l'idea centrale, in grande.
  statement:
    "La trasformazione digitale non è fatta solo di algoritmi, ma di persone da accompagnare nel cambiamento.",
  paragraphs: [
    "Sono Junior AI Developer e Data Analyst, e studio AI Development e Data Science all'ITS Digital Academy \"Mario Volpato\". Vengo dall'ospitalità di lusso, dove ho seguito la digitalizzazione di un wine resort e ho scoperto il piacere di progettare strumenti facili da usare. Con l'arrivo dell'AI ho scelto di cavalcare l'onda del cambiamento, invece di subirla, e di cogliere l'occasione per investire su me stessa.",
    "Oggi lavoro all'integrazione di soluzioni AI nei processi aziendali: traduco le esigenze di business in soluzioni tecniche, perché la tecnologia resti uno strumento pragmatico e sostenibile.",
  ],
  points: [
    {
      term: "Background",
      detail: "Luxury Hospitality Management e relazioni B2B executive.",
    },
    {
      term: "Metodo",
      detail: "Design Thinking: si parte dal problema reale, non dallo strumento.",
    },
    {
      term: "Ruolo",
      detail: "Ponte tra esigenze di business e soluzioni tecniche.",
    },
  ] satisfies AboutPoint[],
};
