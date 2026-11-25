import Image from "next/image";
import Button from "@/components/Button/Button";
import type { Contribution } from "@/data/contributions";
import styles from "./ContributionList.module.scss";

// Righe di "Visione & Contributi". Server Component.
// Colonna sinistra: data, titolo, sottotitolo, immagine e didascalia.
// Colonna destra: il testo, che parte all'altezza dell'IMMAGINE (non in
// cima alla riga): così i due blocchi stanno uno accanto all'altro.

interface ContributionListProps {
  contributions: Contribution[];
}

export default function ContributionList({
  contributions,
}: ContributionListProps) {
  return (
    <ol className={styles.list}>
      {contributions.map((item, i) => (
        // id: bersaglio dei link dalla home (/progetti#job-orienta-2025)
        <li key={item.id} id={item.id} className={styles.row}>
          <span className={styles.number} aria-hidden="true">
            {String(i + 1).padStart(2, "0")}
          </span>

          <div className={styles.head}>
            <p className={styles.date}>{item.date}</p>
            <h3 className={styles.title}>{item.title}</h3>
            <p className={styles.subtitle}>{item.subtitle}</p>
          </div>

          {/* figure + figcaption: immagine con la sua didascalia.
              sizes: quanto è larga sullo schermo, così il browser scarica
              la versione giusta. */}
          <figure className={styles.figure}>
            <Image
              className={styles.image}
              src={item.image}
              alt={item.imageAlt}
              sizes="(min-width: 768px) 30vw, 85vw"
              placeholder="blur"
            />
            <figcaption className={styles.note}>{item.note}</figcaption>
          </figure>

          <div className={styles.body}>
            {item.paragraphs.map((text) => (
              <p key={text}>{text}</p>
            ))}

            {/* "&&": l'elenco compare solo se il contributo ha dei punti */}
            {item.points && (
              <ul className={styles.points}>
                {item.points.map((point) => (
                  <li key={point.term} className={styles.point}>
                    <strong className={styles.term}>{point.term}</strong>
                    <span>{point.text}</span>
                  </li>
                ))}
              </ul>
            )}

            <div>
              <Button
                variant="inline"
                href={item.link.href}
                external
                ariaLabel={`${item.link.label}: ${item.title} (si apre in una nuova scheda)`}
              >
                {item.link.label}
              </Button>
            </div>
          </div>
        </li>
      ))}
    </ol>
  );
}
