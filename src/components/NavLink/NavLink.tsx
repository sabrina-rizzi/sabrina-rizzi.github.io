"use client"; // legge l'indirizzo corrente (usePathname): gira nel browser

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";
import styles from "./NavLink.module.scss";

// Link di navigazione con la "corsia" accento.
// Si accorge da solo se porta alla pagina in cui ti trovi: in quel caso
// resta evidenziato e lo annuncia agli screen reader (aria-current).

interface NavLinkProps {
  href: string;
  children: ReactNode;
  active?: boolean; // forza lo stato (es. nella styleguide); di solito si omette
}

// "/chi-sono/" e "/chi-sono" sono la stessa pagina (trailingSlash in
// next.config.ts): togliamo la "/" finale prima di confrontare.
function clean(path: string) {
  return path.length > 1 ? path.replace(/\/$/, "") : path;
}

// La voce è attiva se l'indirizzo corrente È la sua pagina o sta DENTRO
// la sua pagina (/progetti/qualcosa). La home ("/") vale solo esatta,
// altrimenti sarebbe attiva ovunque. L'eventuale #ancora non conta.
function matches(pathname: string, href: string) {
  if (!href.startsWith("/")) return false; // ancore e link esterni
  const target = clean(href.split("#")[0]);
  const current = clean(pathname);
  if (target === "/") return current === "/";
  return current === target || current.startsWith(`${target}/`);
}

export default function NavLink({ href, children, active }: NavLinkProps) {
  const pathname = usePathname();
  const isActive = active ?? matches(pathname, href);
  const className = `${styles.link} ${isActive ? styles.active : ""}`;

  return (
    <Link
      href={href}
      className={className}
      aria-current={isActive ? "page" : undefined}
    >
      {children}
    </Link>
  );
}
