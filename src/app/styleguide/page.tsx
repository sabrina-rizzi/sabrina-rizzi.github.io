import { notFound } from "next/navigation";
import type { Metadata } from "next";
import ThemeToggle from "@/components/ThemeToggle/ThemeToggle";
import Button from "@/components/Button/Button";
import NavLink from "@/components/NavLink/NavLink";
import Tag from "@/components/Tag/Tag";
import Card from "@/components/Card/Card";
import Section from "@/components/Section/Section";
import Field from "@/components/Field/Field";
import styles from "./styleguide.module.scss";

// Pagina SOLO in sviluppo: sul sito pubblicato restituisce 404.
// process.env.NODE_ENV viene sostituito al momento della build.
const isProd = process.env.NODE_ENV === "production";

export const metadata: Metadata = {
  title: "Design System — Sabrina Rizzi",
  robots: { index: false, follow: false }, // in ogni caso: non indicizzare
};

const semantic = [
  { name: "--bg", color: "var(--bg)" },
  { name: "--surface", color: "var(--surface)" },
  { name: "--surface-2", color: "var(--surface-2)" },
  { name: "--text", color: "var(--text)" },
  { name: "--text-muted", color: "var(--text-muted)" },
  { name: "--primary", color: "var(--primary)" },
  { name: "--accent", color: "var(--accent)" },
  { name: "--border-strong", color: "var(--border-strong)" },
  { name: "--focus", color: "var(--focus)" },
  { name: "--success", color: "var(--success)" },
  { name: "--danger", color: "var(--danger)" },
  { name: "--lane-sage", color: "var(--lane-sage)" },
  { name: "--lane-ochre", color: "var(--lane-ochre)" },
  { name: "--lane-burgundy", color: "var(--lane-burgundy)" },
];

const primitives = [
  { name: "cream", color: "var(--color-cream)" },
  { name: "sage", color: "var(--color-sage)" },
  { name: "terracotta", color: "var(--color-terracotta)" },
  { name: "burgundy", color: "var(--color-burgundy)" },
  { name: "ochre", color: "var(--color-ochre)" },
];

const typeScale = [
  { label: "display-lg", cls: styles.serif, size: "var(--display-lg)" },
  { label: "display-md / h1", cls: styles.serif, size: "var(--display-md)" },
  { label: "display-sm / h2", cls: styles.serif, size: "var(--display-sm)" },
  { label: "text-2xl", cls: styles.serif, size: "var(--text-2xl)" },
  { label: "text-xl / h3", cls: styles.serif, size: "var(--text-xl)" },
  { label: "text-lg", cls: styles.sans, size: "var(--text-lg)" },
  { label: "text-base (corpo)", cls: styles.sans, size: "var(--text-base)" },
  { label: "text-sm", cls: styles.sans, size: "var(--text-sm)" },
  { label: "text-xs", cls: styles.sans, size: "var(--text-xs)" },
  { label: "mono · text-xs", cls: styles.mono, size: "var(--text-xs)" },
];

const spaces = [
  { name: "3xs · 4px", w: styles["w-3xs"] },
  { name: "2xs · 8px", w: styles["w-2xs"] },
  { name: "xs · 12px", w: styles["w-xs"] },
  { name: "sm · 16px", w: styles["w-sm"] },
  { name: "md · 24px", w: styles["w-md"] },
  { name: "lg · 40px", w: styles["w-lg"] },
  { name: "xl · 64px", w: styles["w-xl"] },
  { name: "2xl · 96px", w: styles["w-2xl"] },
  { name: "3xl · 144px", w: styles["w-3xl"] },
];

const radii = [
  { name: "sm · 8px", cls: styles["r-sm"] },
  { name: "md · 16px", cls: styles["r-md"] },
  { name: "lg · 24px", cls: styles["r-lg"] },
  { name: "pill", cls: styles["r-pill"] },
];

export default function StyleguidePage() {
  if (isProd) notFound();

  return (
    <main className={styles.page}>
      <header className={styles.header}>
        <div>
          <p className={styles.overline}>Design System · solo sviluppo</p>
          <h1 className={styles.title}>Fondamenta</h1>
          <p className={styles.lead}>
            Vetrina dal vivo dei token. Usa l&apos;interruttore per vedere ogni
            valore nel tema chiaro e in quello scuro.
          </p>
        </div>
        <ThemeToggle />
      </header>

      {/* COLORI SEMANTICI */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Colori — ruoli (semantici)</h2>
        <p className={styles.note}>
          Questi sono i nomi che useremo nei componenti. Cambiano col tema.
        </p>
        <div className={styles.swatchGrid}>
          {semantic.map((t) => (
            <div key={t.name}>
              <div className={styles.chip} style={{ background: t.color }} />
              <p className={styles.swatchName}>{t.name}</p>
            </div>
          ))}
        </div>
      </section>

      {/* COLORI PRIMITIVI */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Colori — marchio (logo)</h2>
        <p className={styles.note}>
          I colori del logo. Non cambiano col tema e non si usano
          nell&apos;interfaccia: lì valgono i ruoli qui sopra.
        </p>
        <div className={styles.swatchGrid}>
          {primitives.map((t) => (
            <div key={t.name}>
              <div className={styles.chip} style={{ background: t.color }} />
              <p className={styles.swatchName}>{t.name}</p>
            </div>
          ))}
        </div>
      </section>

      {/* TIPOGRAFIA */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Tipografia</h2>
        <p className={styles.note}>Fraunces (titoli) + Inter (corpo) + JetBrains Mono (contatori ed
          etichette).</p>
        <div>
          {typeScale.map((t) => (
            <div key={t.label} className={styles.typeRow}>
              <span className={styles.typeLabel}>{t.label}</span>
              <span className={t.cls} style={{ fontSize: t.size }}>
                Ponte tra business e tecnologia
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* SPAZIATURE */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Spaziature</h2>
        <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
          {spaces.map((s) => (
            <div key={s.name} className={styles.spaceRow}>
              <span className={`${styles.spaceBar} ${s.w}`} />
              <span>{s.name}</span>
            </div>
          ))}
        </div>
      </section>

      {/* RAGGI */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Raggi (border-radius)</h2>
        <div className={styles.boxGrid}>
          {radii.map((r) => (
            <div key={r.name} className={`${styles.box} ${r.cls}`}>
              {r.name}
            </div>
          ))}
        </div>
      </section>

      {/* OMBRE */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Ombre</h2>
        <div className={styles.boxGrid}>
          <div className={`${styles.shadowBox} ${styles["sh-sm"]}`}>shadow-sm</div>
          <div className={`${styles.shadowBox} ${styles["sh-md"]}`}>shadow-md</div>
        </div>
      </section>

      {/* COMPONENTI · BOTTONI */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Componenti · Bottoni</h2>
        <p className={styles.note}>
          Passa il mouse sopra: la macchia di colore parte dal punto esatto del
          cursore. Prova anche col tema scuro.
        </p>

        <p className={styles.subLabel}>I 4 tipi</p>
        <div className={styles.componentRow}>
          <Button variant="primary">Scrivimi</Button>
          <Button variant="secondary">Scarica il CV</Button>
          <Button variant="inline" href="#progetto">
            Vedi il progetto
          </Button>
          <Button variant="icon" ariaLabel="Apri il menu">
            &#9776;
          </Button>
        </div>

        <p className={styles.subLabel}>Stato disabilitato</p>
        <div className={styles.componentRow}>
          <Button variant="primary" disabled>
            Non disponibile
          </Button>
          <Button variant="secondary" disabled>
            Non disponibile
          </Button>
        </div>
      </section>

      {/* COMPONENTI · LINK E TAG */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Componenti · Link e Tag</h2>

        <p className={styles.subLabel}>Link di navigazione (corsia all&apos;hover)</p>
        <nav className={styles.componentRow}>
          <NavLink href="#" active>
            Home
          </NavLink>
          <NavLink href="#percorso">Percorso</NavLink>
          <NavLink href="#about">About</NavLink>
          <NavLink href="#contatti">Contatti</NavLink>
        </nav>

        <p className={styles.subLabel}>Tag / skill</p>
        <div className={styles.componentRow}>
          <Tag>Python</Tag>
          <Tag>Data Science</Tag>
          <Tag>Design Thinking</Tag>
          <Tag>AI agents</Tag>
          <Tag>SQL</Tag>
        </div>
      </section>

      {/* COMPONENTI · CAMPI */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Componenti · Campi modulo</h2>
        <p className={styles.note}>
          Etichetta + casella. Prova il focus da tastiera (Tab).
        </p>
        <div className={styles.fieldDemo}>
          <Field label="Nome" name="demo-name" required placeholder="Il tuo nome" />
          <Field label="Azienda" name="demo-company" />
          <Field label="Messaggio" name="demo-message" required multiline />
        </div>
      </section>

      {/* COMPONENTI · CARD */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Componenti · Card</h2>
        <p className={styles.note}>
          L&apos;ultima ha un link: passaci sopra, si solleva.
        </p>
        <div className={styles.cardGrid}>
          <Card
            meta="Giu 2026 – Lug 2027"
            title="Metline — Gruppo Maestrale"
            description="Junior AI Developer & Data Analyst, con formazione dei senior sugli agenti AI."
          >
            <Tag>AI agents</Tag>
            <Tag>Data Science</Tag>
          </Card>
          <Card
            meta="ITS Academy"
            title="Secondo anno da settembre 2026"
            description="Primo anno completato; focus su sviluppo e dati."
          />
          <Card
            href="#progetto"
            meta="Progetto"
            title="Card cliccabile"
            description="Diventa un link quando le passi un href."
          />
        </div>
      </section>

      {/* COMPONENTI · SECTION */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Componenti · Section wrapper</h2>
        <p className={styles.note}>
          Riga tecnica (contatore + etichetta), titolo grande e introduzione.
          Qui nel tono &quot;panel&quot;.
        </p>
        <div className={styles.frame}>
          <Section
            number="03"
            total="09"
            label="Esperienza"
            title="Percorso"
            intro="Il testo introduttivo sta accanto al titolo."
            tone="panel"
          >
            <div className={styles.cardGrid}>
              <Card
                meta="Giu 2026 – Lug 2027"
                title="Metline — Gruppo Maestrale"
                description="Junior AI Developer & Data Analyst."
              />
              <Card
                meta="2024 – 2026"
                title="ITS Academy"
                description="Percorso in sviluppo e data science."
              />
            </div>
          </Section>
        </div>
      </section>
    </main>
  );
}
