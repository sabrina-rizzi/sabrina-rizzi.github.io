import { ReactNode } from "react";
import Button from "@/components/Button/Button";
import styles from "./LegalPage.module.scss";

// Impaginato comune delle pagine "legali" (Privacy e Cookie policy).
// Server Component: solo testo, nessuna interazione.
//
// Il testo arriva come children: ogni pagina scrive il suo contenuto con
// i normali tag (h2, p, ul, table) e qui il CSS li impagina tutti allo
// stesso modo, senza dover mettere una classe su ogni paragrafo.

interface LegalPageProps {
  title: string; // "Privacy policy"
  updated: string; // data dell'ultimo aggiornamento
  children: ReactNode;
}

export default function LegalPage({ title, updated, children }: LegalPageProps) {
  return (
    <main className={styles.page}>
      <article>
        <header>
          <p className={styles.meta}>
            <span>Informativa</span>
            <span>
              Aggiornata il <time>{updated}</time>
            </span>
          </p>
          <h1 className={styles.title}>{title}</h1>
        </header>

        <div className={styles.prose}>{children}</div>

        <div className={styles.back}>
          <Button variant="inline" href="/">
            Torna alla home
          </Button>
        </div>
      </article>
    </main>
  );
}

// Riquadro per le tabelle: su schermi stretti la tabella scorre qui
// dentro invece di allargare la pagina.
export function TableScroll({ children }: { children: ReactNode }) {
  return <div className={styles.tableWrap}>{children}</div>;
}

// Link verso un altro sito, con le stesse regole del resto del sito:
// nuova scheda e rel di sicurezza. Esportato perché lo usano entrambe
// le pagine.
export function External({ href, children }: { href: string; children: ReactNode }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer">
      {children}
    </a>
  );
}
