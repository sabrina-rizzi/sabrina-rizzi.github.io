"use client"; // ha uno stato (aperto/chiuso): deve girare nel browser

import { useEffect, useState } from "react";
import Button from "@/components/Button/Button";
import NavLink from "@/components/NavLink/NavLink";
import type { NavItem } from "@/data/navigation";
import styles from "./MobileMenu.module.scss";

// Menu mobile PROVVISORIO: un pannello semplice sotto l'header.
// Verrà sostituito dal menu a colonne (elemento firma, PROGETTO.md §8).

const PANEL_ID = "mobile-menu";

export default function MobileMenu({ items }: { items: NavItem[] }) {
  const [open, setOpen] = useState(false);

  // Mentre il menu è aperto, il tasto Esc lo chiude.
  // La funzione restituita "pulisce" l'ascoltatore quando il menu si chiude.
  useEffect(() => {
    if (!open) return;

    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open]);

  return (
    <div className={styles.wrap}>
      <Button
        variant="icon"
        onClick={() => setOpen(!open)}
        ariaLabel={open ? "Chiudi il menu" : "Apri il menu"}
        ariaExpanded={open}
        ariaControls={PANEL_ID}
      >
        {open ? "✕" : "☰"}
      </Button>

      {/* "hidden" toglie il pannello anche a tastiera e screen reader */}
      <nav
        id={PANEL_ID}
        className={styles.panel}
        aria-label="Navigazione principale"
        hidden={!open}
      >
        {/* Un solo onClick sulla lista: il click su qualunque link "risale"
            fino a qui (event bubbling) e chiude il menu. */}
        <ul className={styles.list} onClick={() => setOpen(false)}>
          {items.map((item) => (
            <li key={item.href} className={styles.item}>
              <span className={styles.number} aria-hidden="true">
                {item.number}
              </span>
              <NavLink href={item.href}>{item.label}</NavLink>
              <span className={styles.hint}>{item.hint}</span>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}
