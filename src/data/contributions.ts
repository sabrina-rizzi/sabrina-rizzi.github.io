// CONTENUTI COME DATI: "Visione & Contributi" (PROGETTO.md §7, sezione 08).
// I testi sono quelli del vecchio sito, senza emoji e hashtag.
// L'ordine è quello della lista: dal più recente al meno recente.

import type { StaticImageData } from "next/image";
import jobOrienta from "@/assets/contributi/job-orienta-2025.jpg";
import digitaleEuropeo from "@/assets/contributi/digitale-europeo.png";
import itsCyberGame from "@/assets/contributi/itscybergame-2026.jpg";

export interface ContributionPoint {
  term: string; // la parola chiave, in evidenza
  text: string;
}

export interface Contribution {
  id: string; // chiave per React e ancora del link (/progetti#id)
  date: string;
  title: string;
  subtitle: string;
  paragraphs: string[];
  points?: ContributionPoint[]; // facoltativo: non tutti hanno un elenco
  link: { label: string; href: string };
  image: StaticImageData; // immagine importata: Next ne conosce le misure
  imageAlt: string;
  note: string; // didascalia sotto l'immagine
}

export const contributionsSection = {
  label: "Visione & Contributi",
  title: "Produrre pensiero critico",
};

export const contributions: Contribution[] = [
  {
    id: "itscybergame-2026",
    date: "26-28 Marzo 2026",
    title: "ITSCyberGame 2026: Hack the Challenge, Secure the Future",
    subtitle:
      "Diamo forma alla futura architettura della cybersicurezza italiana",
    paragraphs: [
      "Questo marzo ho avuto l'opportunità di partecipare alle finali degli ITSCyberGame 2026, che si sono tenute a Padova, insieme al mio team dell'ITS Digital Academy “Mario Volpato” di Verona, in qualità di staff organizzativo. La competizione, organizzata dal CINI Cybersecurity National Lab con il supporto di ACN e il patrocinio di ITSItaly, ha visto la partecipazione di squadre di ITS Academy presenti in undici regioni italiane.",
      "Sono infinitamente grata per questa esperienza — umanamente intensa e professionalmente stimolante: è stato prezioso prendere parte al lavoro dietro le quinte e confrontarsi con studenti provenienti da tanti ITS Academy d'Italia.",
      "Un ringraziamento speciale a ITS Digital Academy “Mario Volpato”, agli sponsor e agli organizzatori per aver reso possibile tutto questo.",
    ],
    link: {
      label: "Scopri di più su LinkedIn",
      href: "https://www.linkedin.com/posts/itscybergame_itscybergame-cybersecurity-itsacademy-activity-7447948645326528512-WOao",
    },
    image: itsCyberGame,
    imageAlt: "Foto di gruppo alle finali degli ITSCyberGame 2026",
    note: "Momento tratto dall'edizione 2026 dell'evento ITSCyberGame, a Padova. Per i dettagli si rimanda al post originale su LinkedIn.",
  },
  {
    id: "digitale-europeo",
    date: "10 Febbraio 2026",
    title:
      "Il digitale non è un settore, ma un organo vitale a sostegno della comunità",
    subtitle:
      "Progettare il futuro, non solo aspettarlo: la mia riflessione sulla nuova via tecnologica europea",
    paragraphs: [
      "Partendo dalle analisi di FBK e ISPI, rifletto su un'Europa che non aspetta il futuro, ma lo progetta partendo dalle proprie radici e dai propri valori. Credo che la nostra svolta digitale richieda un cambio di prospettiva:",
    ],
    points: [
      {
        term: "Integrazione Circolare",
        text: "Vedo la tecnologia come parte del tessuto urbano, dove i Data Center diventano risorse energetiche per la comunità (come i modelli di Brescia e della Finlandia).",
      },
      {
        term: "Libertà e Open Source",
        text: "Credo nel software aperto come pilastro per una reale autonomia democratica e per riscrivere le nostre regole tecnologiche.",
      },
      {
        term: "Talento e Territorio",
        text: "Immagino un'Europa capace di attrarre e far fiorire le grandi menti creative e matematiche, offrendo loro lo spazio per costruire il domani qui.",
      },
    ],
    link: {
      label: "Leggi il post su LinkedIn",
      href: "https://www.linkedin.com/posts/sabrina-rizzi14_open-source-innovazione-activity-7427013420291383296-X_cl",
    },
    image: digitaleEuropeo,
    imageAlt: "Illustrazione di una rete digitale che si dirama da un nodo centrale",
    note: "Infrastrutture resilienti, energia e codice aperto: la mia riflessione su un'Europa che sceglie di progettare il proprio presente, partendo dai propri valori.",
  },
  {
    id: "job-orienta-2025",
    date: "Dicembre 2025",
    title: "Job&Orienta 2025: L'Artigiano Tecnologico",
    subtitle: "Speaker @ Fiera di Verona con Fondazione Edulife",
    paragraphs: [
      "Sul palco di Job&Orienta ho condiviso la mia visione sul dialogo tra Intelligenza Umana e Artificiale. Partendo dal mio background nel management dell'hospitality e del vino, ho analizzato come l'AI possa diventare il “nuovo scalpello” per le PMI italiane.",
    ],
    points: [
      {
        term: "Sostituzione vs Trasformazione",
        text: "Da esecutori a progettisti del valore.",
      },
      {
        term: "L'unicità del su misura",
        text: "Perché l'economia del futuro premierà ciò che non è standardizzabile.",
      },
      {
        term: "Capability Ecosystem",
        text: "Costruire comunità di competenze.",
      },
    ],
    link: {
      label: "Leggi il post su LinkedIn",
      href: "https://www.linkedin.com/posts/sabrina-rizzi14_intelligenzaartificiale-intelligenzaumana-activity-7401549443109560320-Tb_M",
    },
    image: jobOrienta,
    imageAlt: "Sabrina Rizzi sul palco di Job&Orienta 2025",
    note: "Momento tratto dall'edizione 2025 dell'evento Job&Orienta, a Verona. Per i dettagli si rimanda al post originale su LinkedIn.",
  },
];
