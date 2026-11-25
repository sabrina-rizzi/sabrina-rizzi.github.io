import type { Metadata } from "next";
import Section from "@/components/Section/Section";
import ProjectList from "@/components/ProjectList/ProjectList";
import Rotonda, { type RotondaItem } from "@/components/Rotonda/Rotonda";
import ContributionList from "@/components/ContributionList/ContributionList";
import { projects, projectsSection } from "@/data/projects";
import { contributions, contributionsSection } from "@/data/contributions";
import Button from "@/components/Button/Button";
import { socialLinks } from "@/data/navigation";
import ContactCta from "@/components/ContactCta/ContactCta";
import styles from "./progetti.module.scss";

// Pagina dedicata: /progetti. In Next la cartella dà il nome all'indirizzo:
// src/app/progetti/page.tsx -> /progetti. Header e Footer arrivano dal
// layout, qui scriviamo solo il contenuto.

// metadata: titolo e descrizione di QUESTA pagina (scheda del browser,
// risultati di ricerca). Sostituiscono quelli generali del layout.
export const metadata: Metadata = {
  title: "Progetti e contributi — Sabrina Rizzi",
  description:
    "I progetti di Sabrina Rizzi e i suoi contributi: interventi, eventi e riflessioni su intelligenza artificiale e digitale.",
};

// Le schede della rotonda: progetti e contributi "ridotti" alla stessa
// forma (RotondaItem). I tre puntini (...) uniscono le due liste in una.
const rotondaItems: RotondaItem[] = [
  ...projects.map((p) => ({
    id: p.id,
    kind: "Progetto",
    title: p.title,
    meta: p.year,
    detail: p.stack.join(" · "),
    image: p.image,
  })),
  ...contributions.map((c) => ({
    id: c.id,
    kind: "Contributo",
    title: c.title,
    meta: c.date,
    detail: c.subtitle,
    image: c.image,
  })),
];

// Gli indirizzi di GitHub e LinkedIn sono già nei dati (navigation.ts):
// li cerchiamo lì invece di riscriverli. find restituisce la prima voce
// che soddisfa la condizione.
// Sezioni di questa pagina: Progetti, Contributi.
const TOTAL = "02";

const github = socialLinks.find((link) => link.label === "GitHub");
const linkedin = socialLinks.find((link) => link.label === "LinkedIn");

export default function ProgettiPage() {
  return (
    <main>
      {/* Ogni pagina ha UN h1. È nascosto alla vista (lo leggono screen
          reader e motori di ricerca): in alto c'è la rotonda. */}
      <h1 className={styles.srOnly}>Progetti e contributi</h1>

      <Rotonda
        items={rotondaItems}
        label="Progetti e contributi in evidenza"
        scrollTo="progetti"
      />

      <Section
        id="progetti"
        number="01"
        total={TOTAL}
        label={projectsSection.label}
        title={projectsSection.title}
      >
        <ProjectList projects={projects} />

        {github && (
          <div className={styles.more}>
            <p className={styles.moreText}>
              Questi sono solo alcuni progetti: sul mio profilo GitHub puoi
              sfogliarli tutti.
            </p>
            <Button
              variant="secondary"
              href={github.href}
              external
              ariaLabel="Vai al profilo GitHub (si apre in una nuova scheda)"
            >
              Vai al profilo GitHub
            </Button>
          </div>
        )}
      </Section>

      <Section
        id="contributi"
        number="02"
        total={TOTAL}
        label={contributionsSection.label}
        title={contributionsSection.title}
      >
        <ContributionList contributions={contributions} />

        {linkedin && (
          <div className={styles.more}>
            <p className={styles.moreText}>
              Per saperne di più e restare aggiornati, seguimi su LinkedIn.
            </p>
            <Button
              variant="secondary"
              href={linkedin.href}
              external
              ariaLabel="Vai al profilo LinkedIn (si apre in una nuova scheda)"
            >
              Vai al profilo LinkedIn
            </Button>
          </div>
        )}
      </Section>

      <ContactCta />
    </main>
  );
}
