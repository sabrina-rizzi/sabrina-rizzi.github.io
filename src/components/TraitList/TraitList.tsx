import type { Trait } from "@/data/traits";
import styles from "./TraitList.module.scss";

// SCHEDE ESPANDIBILI ("fisarmonica"): ogni tratto è un titolo grande;
// cliccandolo si apre la spiegazione.
//
// Usiamo <details> e <summary>, due tag HTML fatti apposta: il browser
// gestisce da solo apertura, chiusura, tastiera (Invio / Spazio) e screen
// reader. Non serve JavaScript: per questo resta un Server Component.
//
// name="...": i <details> con lo stesso name formano un gruppo, e il
// browser ne tiene aperto uno solo alla volta.

interface TraitListProps {
  items: Trait[];
  name: string; // nome del gruppo (uguale per tutte le schede)
}

export default function TraitList({ items, name }: TraitListProps) {
  return (
    <ul className={styles.list}>
      {items.map((item, i) => (
        <li key={item.id}>
          {/* open: la prima scheda parte aperta, così si capisce subito
              che le altre si possono aprire. */}
          <details className={styles.item} name={name} open={i === 0}>
            <summary className={styles.summary}>
              <span className={styles.number} aria-hidden="true">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className={styles.title}>{item.title}</h3>
              {/* Il segno "+": due lineette disegnate in CSS. */}
              <span className={styles.sign} aria-hidden="true" />
            </summary>
            <p className={styles.text}>{item.text}</p>
          </details>
        </li>
      ))}
    </ul>
  );
}
