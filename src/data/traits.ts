// CONTENUTI COME DATI: "I miei tratti distintivi" (PROGETTO.md §7, sezione 07).
// Tono: essenziale e onesto, niente autocelebrazione.
// Testi in bozza, da confermare.

export interface Trait {
  id: string;
  title: string; // il tratto, in grande
  text: string; // la spiegazione, visibile aprendo la scheda
}

export const traitsSection = {
  label: "Perché lavorare con me",
  title: "I miei tratti distintivi",
};

export const traits: Trait[] = [
  {
    id: "ponte",
    title: "Ponte tra business e tecnologia",
    text: "Arrivo dal management e oggi scrivo codice: traduco le esigenze di chi decide in requisiti chiari per chi sviluppa, e viceversa.",
  },
  {
    id: "onesta-metodo",
    title: "Onestà e metodo",
    text: "Distinguo ciò che so fare bene da ciò che sto ancora imparando, e lo dico. Parto dal problema reale, non dallo strumento.",
  },
  {
    id: "comunicazione",
    title: "Cura della comunicazione",
    text: "Anni di relazioni con clienti e interlocutori executive mi hanno insegnato ad ascoltare prima di proporre, e a spiegare le cose tecniche in modo comprensibile.",
  },
  {
    id: "documentazione",
    title: "Documentazione come abitudine",
    text: "Scrivo documentazione puntuale e uniforme, leggibile da tutto il team: quello che costruisco deve poter essere capito e ripreso da altri.",
  },
];
