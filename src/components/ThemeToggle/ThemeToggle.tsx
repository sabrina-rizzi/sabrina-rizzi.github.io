"use client"; // interattivo: vive nel browser, non sul server

import { useSyncExternalStore } from "react";
import styles from "./ThemeToggle.module.scss";

type Theme = "light" | "dark";

// --- Piccolo "store" esterno a React ---
// Il tema vive nel DOM (data-theme) e in localStorage, non nello stato di
// React. useSyncExternalStore è lo strumento giusto per LEGGERE uno stato
// esterno in modo sicuro anche con il rendering sul server.

const listeners = new Set<() => void>();

// Avvisa React quando il tema cambia (click sull'interruttore).
function emit() {
  listeners.forEach((l) => l());
}

// React si "iscrive" ai cambiamenti; ritorna la funzione per annullare.
function subscribe(onChange: () => void) {
  listeners.add(onChange);
  return () => {
    listeners.delete(onChange);
  };
}

// Tema attuale nel browser: chiaro solo se scelto, altrimenti scuro
// (il predefinito del sito, vedi globals.scss).
function getSnapshot(): Theme {
  return document.documentElement.dataset.theme === "light" ? "light" : "dark";
}

// Valore usato durante il rendering sul server (niente browser lì).
function getServerSnapshot(): Theme {
  return "dark";
}

function setTheme(next: Theme) {
  document.documentElement.dataset.theme = next; // applica subito
  try {
    localStorage.setItem("theme", next); // ricorda la scelta
  } catch {
    // storage bloccato (es. finestra privata): pazienza, niente crash
  }
  emit(); // avvisa React di ri-disegnare
}

export default function ThemeToggle() {
  const theme = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const label =
    theme === "dark" ? "Passa al tema chiaro" : "Passa al tema scuro";

  return (
    <button
      type="button"
      className={styles.toggle}
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      aria-label={label}
      title={label}
    >
      <span aria-hidden="true">{theme === "dark" ? "☀" : "☾"}</span>
    </button>
  );
}
