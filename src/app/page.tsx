import Section from "@/components/Section/Section";
import IndexList from "@/components/IndexList/IndexList";
import Button from "@/components/Button/Button";
import About from "@/components/About/About";
import Hero from "@/components/Hero/Hero";
import ContactCta from "@/components/ContactCta/ContactCta";
import { about } from "@/data/about";
import { projects } from "@/data/projects";
import { contributions } from "@/data/contributions";
import styles from "./page.module.scss";

// Home: la PANORAMICA del sito. Ogni blocco è un assaggio e finisce con un
// pulsante verso la pagina completa, così si capisce che c'è altro da
// vedere: Chi sono -> /chi-sono, Progetti -> /progetti, Contatti -> /contatti.

// Sezioni della home: hero, Chi sono, Progetti, Contatti.
const TOTAL = "04";

export default function Home() {
  return (
    <main>
      <Hero total={TOTAL} />

      {process.env.NODE_ENV !== "production" && (
        <p className={styles.devNote}>
          <a className={styles.link} href="/styleguide">
            → Design System (solo sviluppo)
          </a>
        </p>
      )}

      {/* Assaggio di Chi sono: frase guida e primo paragrafo, senza i
          punti fermi. Il resto (percorso, tratti) sta su /chi-sono. */}
      <Section
        id="about"
        number="02"
        total={TOTAL}
        label={about.label}
        title={about.title}
      >
        <About statement={about.statement} paragraphs={about.paragraphs.slice(0, 1)} />
        <div className={styles.more}>
          <Button variant="secondary" href="/chi-sono">
            Scopri il mio percorso
          </Button>
        </div>
      </Section>

      {/* Anteprima di progetti e contributi: titoli e una riga ciascuno.
          Riusiamo IndexList con dati "ridotti" (map). */}
      <Section
        id="progetti"
        number="03"
        total={TOTAL}
        label="Selezione"
        title="Progetti & Contributi"
      >
        <IndexList
          heading="Progetti"
          items={projects.map((p) => ({
            id: p.id,
            title: p.title,
            meta: p.year,
            description: p.type,
          }))}
        />
        <IndexList
          heading="Visione & Contributi"
          items={contributions.map((c) => ({
            id: c.id,
            title: c.title,
            meta: c.date,
            description: c.subtitle,
          }))}
        />
        <div className={styles.more}>
          <Button variant="secondary" href="/progetti">
            Vedi progetti e contributi
          </Button>
        </div>
      </Section>

      <ContactCta number="04" total={TOTAL} />
    </main>
  );
}
