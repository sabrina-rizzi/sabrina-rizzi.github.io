import type { AboutPoint } from "@/data/about";
import styles from "./About.module.scss";

interface AboutProps {
  statement: string;
  paragraphs: string[];
  points?: AboutPoint[]; // nell'assaggio in home si omettono
}

// Contenuto della sezione About: frase guida a sinistra, testo a destra,
// sotto i "punti fermi". Server Component: è solo testo, niente JavaScript.
export default function About({ statement, paragraphs, points }: AboutProps) {
  return (
    <div className={styles.about}>
      <p className={styles.statement}>{statement}</p>

      <div className={styles.text}>
        {paragraphs.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </div>

      {/* <dl> = lista di coppie termine/descrizione (dt + dd):
          il tag giusto per "etichetta: spiegazione". */}
      {points && (
        <dl className={styles.points}>
          {points.map((point) => (
            <div key={point.term} className={styles.point}>
              <dt className={styles.term}>{point.term}</dt>
              <dd className={styles.detail}>{point.detail}</dd>
            </div>
          ))}
        </dl>
      )}
    </div>
  );
}
