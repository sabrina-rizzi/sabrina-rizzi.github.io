import type { Metadata } from "next";
import Section from "@/components/Section/Section";
import About from "@/components/About/About";
import IndexList from "@/components/IndexList/IndexList";
import TraitList from "@/components/TraitList/TraitList";
import ContactCta from "@/components/ContactCta/ContactCta";
import { about } from "@/data/about";
import { experiences, type ExperienceKind } from "@/data/experience";
import { traits, traitsSection } from "@/data/traits";

// Pagina /chi-sono: About, Percorso, Tratti distintivi, poi l'invito al
// contatto. Il contatore delle sezioni ("01 / 03") conta solo QUESTA pagina.

export const metadata: Metadata = {
  title: "Chi sono — Sabrina Rizzi",
  description:
    "Chi è Sabrina Rizzi: percorso, esperienze, formazione e tratti distintivi.",
};

const TOTAL = "03";

// I due blocchi del Percorso, nell'ordine in cui compaiono.
const experienceGroups: { kind: ExperienceKind; heading: string }[] = [
  { kind: "work", heading: "Esperienza" },
  { kind: "education", heading: "Formazione" },
];

export default function ChiSonoPage() {
  return (
    <main>
      {/* La prima sezione apre la pagina: il suo titolo è l'h1 */}
      <Section
        id="about"
        level={1}
        number="01"
        total={TOTAL}
        label={about.label}
        title={about.title}
      >
        <About
          statement={about.statement}
          paragraphs={about.paragraphs}
          points={about.points}
        />
      </Section>

      <Section
        id="percorso"
        number="02"
        total={TOTAL}
        label="Esperienza e formazione"
        title="Percorso"
      >
        {/* Un blocco per tipo: stesso componente, dati filtrati */}
        {experienceGroups.map((group) => (
          <IndexList
            key={group.kind}
            heading={group.heading}
            items={experiences
              .filter((e) => e.kind === group.kind)
              .map((e) => ({
                id: e.id,
                title: e.title,
                subtitle: e.role,
                meta: e.period,
                description: e.description,
                tags: e.tags,
              }))}
          />
        ))}
      </Section>

      <Section
        id="tratti"
        number="03"
        total={TOTAL}
        label={traitsSection.label}
        title={traitsSection.title}
      >
        <TraitList items={traits} name="tratti" />
      </Section>

      <ContactCta />
    </main>
  );
}
