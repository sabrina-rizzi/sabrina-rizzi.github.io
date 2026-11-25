import Tag from "@/components/Tag/Tag";
import styles from "./IndexList.module.scss";

// "Righe-indice": lista editoriale numerata (Percorso; riusabile per
// "Cosa faccio"). Server Component: l'hover è tutto in CSS.
//
// Il componente NON conosce le esperienze: riceve righe generiche.
// Così lo stesso componente può mostrare dati diversi.

export interface IndexItem {
  id: string;
  title: string;
  subtitle?: string;
  meta?: string; // es. il periodo
  description?: string;
  tags?: string[];
}

interface IndexListProps {
  items: IndexItem[];
  heading?: string; // titolo del blocco (es. "Esperienza"), facoltativo
}

export default function IndexList({ items, heading }: IndexListProps) {
  // Gerarchia dei titoli: se il blocco ha un suo titolo (h3), le righe
  // scendono di un livello (h4). Un tag può stare in una variabile,
  // purché il nome inizi con la maiuscola.
  const RowTitle = heading ? "h4" : "h3";

  return (
    <div className={styles.group}>
      {heading && <h3 className={styles.heading}>{heading}</h3>}
      {/* <ol>: lista ORDINATA, perché l'ordine ha un significato */}
      <ol className={styles.list}>
      {items.map((item, i) => (
        <li key={item.id} className={styles.row}>
          {/* Il numero nasce dalla posizione: 0 -> "01", 1 -> "02"... */}
          <span className={styles.number} aria-hidden="true">
            {String(i + 1).padStart(2, "0")}
          </span>

          <div className={styles.head}>
            <RowTitle className={styles.title}>{item.title}</RowTitle>
            {item.subtitle && <p className={styles.subtitle}>{item.subtitle}</p>}
            {item.meta && <p className={styles.meta}>{item.meta}</p>}
          </div>

          <div className={styles.body}>
            {item.description && <p>{item.description}</p>}
            {item.tags && (
              <ul className={styles.tags}>
                {item.tags.map((tag) => (
                  <li key={tag}>
                    <Tag>{tag}</Tag>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </li>
      ))}
      </ol>
    </div>
  );
}
