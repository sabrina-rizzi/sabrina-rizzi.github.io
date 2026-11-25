"use client"; // legge la posizione del mouse: deve girare nel browser

import Link from "next/link";
import { MouseEvent, ReactNode } from "react";
import styles from "./Button.module.scss";

type Variant = "primary" | "secondary" | "inline" | "icon";

interface ButtonProps {
  variant?: Variant;
  children: ReactNode;
  href?: string; // se presente, diventa un link <a>
  external?: boolean; // link verso un altro sito: si apre in una nuova scheda
  onClick?: () => void;
  type?: "button" | "submit";
  disabled?: boolean;
  ariaLabel?: string; // obbligatorio di fatto per variant="icon"
  showArrow?: boolean; // freccia per l'inline (default: sì)
  // Per i bottoni che aprono/chiudono qualcosa (es. il menu mobile):
  ariaExpanded?: boolean; // dice agli screen reader se è aperto
  ariaControls?: string; // id dell'elemento che viene aperto
}

export default function Button({
  variant = "primary",
  children,
  href,
  external,
  onClick,
  type = "button",
  disabled,
  ariaLabel,
  showArrow,
  ariaExpanded,
  ariaControls,
}: ButtonProps) {
  // Salva dove si trova il cursore rispetto al bottone, in due custom
  // properties (--x, --y). Il CSS fa partire da lì la "macchia" di colore.
  function setOrigin(e: MouseEvent<HTMLElement>) {
    const el = e.currentTarget;
    const rect = el.getBoundingClientRect();
    el.style.setProperty("--x", `${e.clientX - rect.left}px`);
    el.style.setProperty("--y", `${e.clientY - rect.top}px`);
  }

  const className = `${styles.btn} ${styles[variant]}`;
  const withArrow = variant === "inline" && showArrow !== false;

  const content = (
    <span className={styles.label}>
      {children}
      {withArrow && (
        <span className={styles.arrow} aria-hidden="true">
          &rarr;
        </span>
      )}
    </span>
  );

  // Stessi gestori del mouse per entrambe le versioni (link o bottone).
  const pointer = {
    onMouseEnter: setOrigin,
    onMouseMove: setOrigin,
    onMouseLeave: setOrigin,
  };

  // Un FILE del sito (es. "/cv-sabrina-rizzi.pdf", riconoscibile
  // dall'estensione) non è una pagina: <Link> proverebbe a "navigarci".
  // Resta un <a> normale, ma il basePath (/Sito su GitHub Pages) va
  // aggiunto a mano: <Link> lo fa da solo, <a> no.
  const isFile = href?.startsWith("/") && /\.[a-z0-9]+$/i.test(href);
  if (href && isFile) {
    return (
      <a
        className={className}
        href={`${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}${href}`}
        aria-label={ariaLabel}
        {...pointer}
      >
        {content}
      </a>
    );
  }

  // Link verso un'altra PAGINA del sito ("/progetti"): <Link> di Next cambia
  // pagina senza ricaricare tutto. Le ancore ("#top") e i link esterni
  // restano <a> normali.
  if (href && href.startsWith("/") && !external) {
    return (
      <Link className={className} href={href} aria-label={ariaLabel} {...pointer}>
        {content}
      </Link>
    );
  }

  if (href) {
    return (
      <a
        className={className}
        href={href}
        aria-label={ariaLabel}
        target={external ? "_blank" : undefined}
        rel={external ? "noopener noreferrer" : undefined}
        {...pointer}
      >
        {content}
      </a>
    );
  }

  return (
    <button
      className={className}
      type={type}
      onClick={onClick}
      disabled={disabled}
      aria-label={ariaLabel}
      aria-expanded={ariaExpanded}
      aria-controls={ariaControls}
      {...pointer}
    >
      {content}
    </button>
  );
}
