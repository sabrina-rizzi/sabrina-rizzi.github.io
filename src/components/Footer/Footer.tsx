import Link from "next/link";
import Button from "@/components/Button/Button";
import NavLink from "@/components/NavLink/NavLink";
import { navItems, socialLinks } from "@/data/navigation";
import styles from "./Footer.module.scss";

// Footer del sito: Server Component.
//
// L'anno viene calcolato durante la build (il sito è esportato statico,
// vedi next.config.ts): si aggiorna a ogni nuova pubblicazione.

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.top}>
          <div>
            <p className={styles.name}>Sabrina Rizzi</p>
            <p className={styles.role}>Junior AI Developer &amp; Data Analyst</p>
          </div>

          {/* Torna su: un semplice link all'ancora #top (l'header).
              Lo scorrimento morbido lo fa il CSS, senza JavaScript. */}
          <Button variant="icon" href="#top" ariaLabel="Torna a inizio pagina">
            &uarr;
          </Button>
        </div>

        <div className={styles.links}>
          {/* In fondo a ogni pagina, tutte le pagine: anche la home, che
              nell'header è raggiungibile solo dal marchio. */}
          <nav aria-label="Pagine">
            <ul className={styles.list}>
              <li>
                <NavLink href="/">Home</NavLink>
              </li>
              {navItems.map((item) => (
                <li key={item.href}>
                  <NavLink href={item.href}>{item.label}</NavLink>
                </li>
              ))}
            </ul>
          </nav>

          <ul className={styles.list} aria-label="Profili">
            {socialLinks.map((link) => (
              <li key={link.href}>
                {/* Link esterni: nuova scheda + rel di sicurezza */}
                <a
                  className={styles.external}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className={styles.bottom}>
          <p>&copy; {year} Sabrina Rizzi</p>
          <ul className={styles.list}>
            {/* <Link> e non <a>: aggiunge da solo il basePath (/Sito) */}
            <li>
              <Link className={styles.external} href="/privacy-policy">
                Privacy policy
              </Link>
            </li>
            <li>
              <Link className={styles.external} href="/cookie-policy">
                Cookie policy
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
