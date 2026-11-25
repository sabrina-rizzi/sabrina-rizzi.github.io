import type { Metadata } from "next";
import Section from "@/components/Section/Section";
import ContactForm from "@/components/ContactForm/ContactForm";
import Button from "@/components/Button/Button";
import { contact } from "@/data/contact";
import { socialLinks } from "@/data/navigation";
import styles from "./contatti.module.scss";

// Pagina /contatti: modulo a destra, profili a sinistra (da md).
// Il titolo della sezione è l'h1 della pagina (level={1}).

export const metadata: Metadata = {
  title: "Contatti — Sabrina Rizzi",
  description:
    "Scrivi a Sabrina Rizzi per una collaborazione o un'opportunità professionale.",
};

export default function ContattiPage() {
  return (
    <main>
      <Section
        level={1}
        label="Contatti"
        title={contact.title}
        intro={contact.intro}
      >
        <div className={styles.contact}>
          <div className={styles.profiles}>
            <p className={styles.label}>Profili</p>
            <div className={styles.links}>
              {socialLinks.map((link) => (
                <Button key={link.href} variant="inline" href={link.href} external>
                  {link.label}
                </Button>
              ))}
            </div>
          </div>
          <ContactForm action={contact.formAction} />
        </div>
      </Section>
    </main>
  );
}
