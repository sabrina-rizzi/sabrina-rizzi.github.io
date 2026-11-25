import { ReactNode } from "react";
import Reveal from "@/components/Reveal/Reveal";
import styles from "./Section.module.scss";

// Contenitore di una sezione del sito. Server Component.
//
// Intestazione "editoriale" su due livelli:
//   1) riga tecnica in monospace: contatore "02 / 09" + etichetta;
//   2) titolo molto grande a sinistra, testo introduttivo a destra.
//
// Gli attributi data-reveal dicono a <Reveal> (componente client) cosa
// animare quando la sezione entra nello schermo. Section resta server.

interface SectionProps {
  id?: string; // ancora per i link di navigazione (es. "percorso")
  number?: string; // es. "02"
  total?: string; // es. "09" -> il contatore diventa "02 / 09"
  label?: string; // etichetta nella riga tecnica
  title: string;
  intro?: string; // testo introduttivo accanto al titolo
  // "panel": la sezione sta dentro un riquadro (--surface) invece che sullo
  // sfondo della pagina. Alternare i due toni dà ritmo allo scorrimento.
  tone?: "plain" | "panel";
  // Livello del titolo. Ogni pagina ha UN h1: quando la sezione apre la
  // pagina (es. "Chi sono" su /chi-sono) il suo titolo è l'h1, le altre h2.
  level?: 1 | 2;
  children: ReactNode;
}

export default function Section({
  id,
  number,
  total,
  label,
  title,
  intro,
  tone = "plain",
  level = 2,
  children,
}: SectionProps) {
  // Un componente può scegliere il TAG da usare: Heading vale "h1" o
  // "h2" e JSX lo usa come qualsiasi altro tag (<Heading>...</Heading>).
  const Heading = level === 1 ? "h1" : "h2";
  const sectionClass =
    tone === "panel" ? `${styles.section} ${styles.panel}` : styles.section;

  return (
    <section id={id} className={sectionClass}>
      <Reveal className={styles.inner}>
        <header className={styles.header}>
          {(number || label) && (
            <p className={styles.meta} data-reveal="fade">
              {number && (
                <span>
                  <span className={styles.number}>{number}</span>
                  {total && ` / ${total}`}
                </span>
              )}
              {label && <span>{label}</span>}
            </p>
          )}
          <div className={styles.heading}>
            {/* il titolo = la maschera (ritaglia); lo span interno sale */}
            <Heading className={styles.title}>
              <span className={styles.titleInner} data-reveal="mask">
                {title}
              </span>
            </Heading>
            {intro && (
              <p className={styles.intro} data-reveal="fade">
                {intro}
              </p>
            )}
          </div>
        </header>
        <div data-reveal="fade">{children}</div>
      </Reveal>
    </section>
  );
}
