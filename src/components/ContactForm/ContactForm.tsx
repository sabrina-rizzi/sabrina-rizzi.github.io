"use client"; // gestisce l'invio e mostra l'esito: deve girare nel browser

import Link from "next/link";
import { FormEvent, useState } from "react";
import Button from "@/components/Button/Button";
import Field from "@/components/Field/Field";
import styles from "./ContactForm.module.scss";

// Modulo di contatto. Invia i dati a Formspree SENZA lasciare la pagina.
//
// "Miglioramento progressivo": il <form> ha comunque action e method.
// Se JavaScript non è disponibile, il browser invia il modulo nel modo
// classico (si finisce sulla pagina di conferma di Formspree).

// I quattro momenti del modulo. Uno stato solo, quattro valori possibili:
// più chiaro di tanti true/false separati.
type Status = "idle" | "sending" | "success" | "error";

export default function ContactForm({ action }: { action: string }) {
  const [status, setStatus] = useState<Status>("idle");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault(); // blocca l'invio classico (che cambierebbe pagina)
    const form = e.currentTarget;
    setStatus("sending");

    try {
      // FormData raccoglie tutti i campi del modulo, con i loro "name".
      // "Accept: application/json" chiede a Formspree una risposta in dati
      // invece di un reindirizzamento.
      const response = await fetch(action, {
        method: "POST",
        body: new FormData(form),
        headers: { Accept: "application/json" },
      });

      if (!response.ok) throw new Error("Invio non riuscito");

      form.reset(); // svuota i campi
      setStatus("success");
    } catch {
      // Rete assente o risposta negativa: i campi restano compilati
      setStatus("error");
    }
  }

  return (
    <form
      className={styles.form}
      action={action}
      method="POST"
      onSubmit={handleSubmit}
    >
      <Field label="Nome" name="name" required autoComplete="name" />
      <Field label="Email" name="email" type="email" required autoComplete="email" />
      <Field label="Oggetto" name="subject" required />
      <Field label="Messaggio" name="message" required multiline />

      {/* ANTISPAM ("honeypot", vasetto di miele): un campo che le persone
          non vedono e quindi lasciano vuoto, mentre i bot compilano tutti
          i campi che trovano. Se arriva pieno, Formspree scarta il
          messaggio. "_gotcha" è il nome che Formspree riconosce.
          Nascosto a tutti: alla vista (hidden), al tasto Tab (tabIndex
          -1), agli screen reader (aria-hidden) e al riempimento
          automatico del browser (autoComplete off). */}
      <div className={styles.honeypot} aria-hidden="true">
        <label>
          Non compilare questo campo
          <input type="text" name="_gotcha" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <p className={styles.note}>
        I dati inviati sono usati solo per rispondere al messaggio. Dettagli
        nella{" "}
        <Link className={styles.noteLink} href="/privacy-policy">
          privacy policy
        </Link>
        .
      </p>

      <div className={styles.actions}>
        <Button type="submit" disabled={status === "sending"}>
          {status === "sending" ? "Invio in corso" : "Invia il messaggio"}
        </Button>

        {/* role="status": gli screen reader annunciano l'esito appena compare */}
        <p role="status" className={styles.status}>
          {status === "success" && (
            <span className={styles.success}>
              Messaggio inviato. Ti rispondo al più presto.
            </span>
          )}
          {status === "error" && (
            <span className={styles.error}>
              Invio non riuscito. Riprova tra poco oppure scrivimi su LinkedIn.
            </span>
          )}
        </p>
      </div>
    </form>
  );
}
