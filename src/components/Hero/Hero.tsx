import type { CSSProperties } from "react";
import Image from "next/image";
import Reveal from "@/components/Reveal/Reveal";
import Button from "@/components/Button/Button";
import { hero } from "@/data/hero";
// Import "statico" di un'immagine: Next legge larghezza e altezza dal file
// e prepara da solo le versioni ridotte e l'anteprima sfocata.
import portrait from "@/assets/sabrina-rizzi-hero.jpg";
import styles from "./Hero.module.scss";

// Blocco d'apertura della home (sezione 01). Server Component: l'unica
// parte "viva" è <Reveal>, che anima gli elementi marcati data-reveal.
// onLoad = l'animazione parte al caricamento, non allo scorrimento.
//
// I cinque pezzi (riga tecnica, nome, ruolo, testo+pulsanti, foto) sono
// figli diretti della griglia: è il CSS a decidere dove va ciascuno.
// Qui l'ordine è quello di LETTURA (prima il nome, la foto per ultima),
// che è anche l'ordine seguito da tastiera e screen reader.

// Griglia del mosaico sopra la foto: colonne x righe. I due numeri
// arrivano al CSS come variabili (--cols, --rows) tramite style.
const TILE_COLS = 6;
const TILE_ROWS = 8;

// total: quante sezioni ha la home, per il contatore "01 / 04".
export default function Hero({ total }: { total: string }) {
  return (
    <section className={styles.hero} aria-labelledby="hero-title">
      <Reveal className={styles.inner} onLoad replayOn="#top">
        <p className={styles.meta} data-reveal="fade">
          <span>
            <span className={styles.number}>{hero.number}</span>
            {` / ${total}`}
          </span>
          <span>{hero.label}</span>
        </p>

        {/* Ogni parola del nome: lo span esterno ritaglia (maschera),
            quello interno è ciò che sale. */}
        <h1 id="hero-title" className={styles.title}>
          {hero.nameLines.map((line) => (
            <span key={line} className={styles.line}>
              <span className={styles.lineInner} data-reveal="mask">
                {line}
              </span>{" "}
            </span>
          ))}
        </h1>

        <p className={styles.role} data-reveal="fade">
          {hero.role}
        </p>

        <div className={styles.side}>
          <p className={styles.lead} data-reveal="fade">
            {hero.lead}
          </p>
          <div className={styles.actions} data-reveal="fade">
            <Button href={hero.actions.primary.href}>
              {hero.actions.primary.label}
            </Button>
            <Button
              variant="secondary"
              href={hero.actions.secondary.href}
              external
            >
              {hero.actions.secondary.label}
            </Button>
          </div>
        </div>

        {/* dl = "lista di descrizioni": coppie etichetta (dt) / valore (dd).
            È il tag giusto per dati del tipo "Ora: ...". */}
        <dl className={styles.facts}>
          {hero.facts.map((fact) => (
            <div key={fact.term} className={styles.fact} data-reveal="fade">
              <dt className={styles.factTerm}>{fact.term}</dt>
              <dd className={styles.factDetail}>{fact.detail}</dd>
            </div>
          ))}
        </dl>

        <figure className={styles.figure}>
          {/* sizes: quanto è larga la foto sullo schermo, così il browser
              scarica la versione giusta. preload: è l'immagine principale
              della pagina, va caricata subito. */}
          <div className={styles.zoom} data-reveal="zoom">
            <Image
              className={styles.photo}
              src={portrait}
              alt={hero.photoAlt}
              sizes="(min-width: 768px) 42vw, 100vw"
              placeholder="blur"
              preload
            />
          </div>

          {/* MOSAICO: una griglia di tessere del colore dello sfondo copre
              la foto; Reveal le fa sparire una alla volta e la foto
              "si compone". Dopo l'ingresso restano lì, trasparenti: si
              riaccendono al passaggio del mouse (vedi il CSS).
              aria-hidden: è solo decorazione. */}
          <div
            className={styles.tiles}
            data-reveal="tiles"
            data-cols={TILE_COLS}
            aria-hidden="true"
            style={
              { "--cols": TILE_COLS, "--rows": TILE_ROWS } as CSSProperties
            }
          >
            {Array.from({ length: TILE_COLS * TILE_ROWS }, (_, i) => (
              <span key={i} className={styles.tile} />
            ))}
          </div>
        </figure>
      </Reveal>
    </section>
  );
}
