import type { NextConfig } from "next";

// PUBBLICAZIONE SU GITHUB PAGES
// GitHub Pages serve solo file già pronti (HTML, CSS, JS, immagini): non
// c'è un server che esegue Next a ogni visita. Con output: "export",
// "npm run build" crea la cartella out/ con tutto il sito statico.
//
// basePath: il "pezzo" di indirizzo dopo il dominio. Il repository si
// chiama sabrina-rizzi.github.io, quindi il sito sta alla radice
// (https://sabrina-rizzi.github.io/) e basePath è vuoto. Se il sito
// finisse in un repository con un altro nome (es. "Sito"), GitHub lo
// pubblicherebbe su .../Sito/ e servirebbe "/Sito". Il valore lo calcola
// il workflow (.github/workflows/deploy.yml) e lo passa qui con una
// variabile d'ambiente; in locale è vuota.
const basePath = process.env.PAGES_BASE_PATH ?? "";

const nextConfig: NextConfig = {
  output: "export",
  basePath,
  // Le pagine diventano cartelle con index.html (/privacy-policy/index.html):
  // GitHub Pages le trova sia con sia senza "/" finale.
  trailingSlash: true,
  images: {
    // L'ottimizzazione automatica delle immagini richiede un server.
    // Le nostre sono già ridimensionate (max 800-1600px): le serviamo così.
    unoptimized: true,
  },
  // cacheComponents e partialPrefetching NON ci sono: servono a un server
  // che prepara parti di pagina a ogni richiesta, e la build li rifiuta
  // in modalità export ("PPR cannot be enabled in export mode"). Su un
  // sito tutto statico non danno nessun vantaggio.
  // Rende basePath leggibile anche nel codice (per i link a file come il
  // CV, che non passano da <Link>).
  env: {
    NEXT_PUBLIC_BASE_PATH: basePath,
  },
};

export default nextConfig;
