# Sabrina Rizzi — Portfolio

Sito personale di Sabrina Rizzi, Junior AI Developer e Data Analyst.

Online su [sabrina-rizzi.github.io](https://sabrina-rizzi.github.io).

## Tecnologie

- [Next.js](https://nextjs.org) (App Router) con React e TypeScript
- SCSS modules per gli stili
- GSAP per le animazioni
- Esportazione statica, pubblicata su GitHub Pages

## Avvio in locale

Serve Node.js 24 o successivo.

```bash
npm install
npm run dev
```

Il sito si apre su `http://localhost:3000`.

## Pubblicazione

`npm run build` crea il sito statico nella cartella `out/`.

A ogni push sul ramo `main`, il workflow `.github/workflows/deploy.yml` costruisce il sito e lo pubblica su GitHub Pages. Nelle impostazioni del repository (Settings → Pages) la sorgente deve essere "GitHub Actions".

## Struttura

- `src/app/` — le pagine: home, Chi sono, Progetti, Contatti, privacy e cookie policy
- `src/components/` — i componenti, ognuno con il proprio file di stile
- `src/data/` — i testi e i contenuti del sito, separati dal codice
- `src/styles/` — variabili, mixin e stili globali
- `public/` — file serviti così come sono (es. il CV)
