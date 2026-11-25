import Section from "@/components/Section/Section";
import Button from "@/components/Button/Button";
import { contact } from "@/data/contact";

// Invito al contatto in fondo alle pagine (home, Chi sono, Progetti).
// Non contiene il modulo: porta alla pagina /contatti. È una Section
// come le altre, così ha la stessa intestazione e la stessa comparsa.

interface ContactCtaProps {
  number?: string; // in home è una sezione numerata ("04 / 04")
  total?: string;
}

export default function ContactCta({ number, total }: ContactCtaProps) {
  return (
    <Section
      number={number}
      total={total}
      label="Contatti"
      title={contact.title}
      intro={contact.teaser}
    >
      <Button href="/contatti">{contact.teaserButton}</Button>
    </Section>
  );
}
