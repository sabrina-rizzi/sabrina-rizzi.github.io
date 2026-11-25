// CONTENUTI COME DATI: le voci di navigazione vivono qui, non dentro i
// componenti. Header, menu mobile e footer leggono tutti da questo file:
// per aggiungere o rinominare una voce si cambia una riga sola.
//
// Il sito è fatto di PAGINE (non di sezioni di un'unica pagina lunga):
// ogni voce porta a un indirizzo diverso. La home è la panoramica e ci si
// arriva dal marchio in alto a sinistra.

export interface NavItem {
  number: string; // ordine della voce nel menu: "01", "02"...
  label: string;
  hint: string; // sottotitolo: dice in due parole cosa c'è nella pagina
  href: string;
}

export const navItems: NavItem[] = [
  { number: "01", label: "Chi sono", hint: "Il mio percorso", href: "/chi-sono" },
  { number: "02", label: "Progetti", hint: "Lavori e contributi", href: "/progetti" },
  { number: "03", label: "Contatti", hint: "Parliamone", href: "/contatti" },
];

export interface SocialLink {
  label: string;
  href: string;
}

export const socialLinks: SocialLink[] = [
  { label: "LinkedIn", href: "https://www.linkedin.com/in/sabrina-rizzi14" },
  { label: "GitHub", href: "https://github.com/sabrina-rizzi" },
];
